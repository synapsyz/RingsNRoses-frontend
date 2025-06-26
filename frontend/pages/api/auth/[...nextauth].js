import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Helper function to decode JWT
import { jwtDecode } from "jwt-decode";

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development'; // More robust way to set this

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();

async function refreshAccessToken(refreshToken) {
  try {
    const endpoint = `${api_url}/api/v1/token/refresh/`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to refresh token response:", data);
      throw new Error(data?.detail || "Failed to refresh token");
    }

    const decodedAccessToken = jwtDecode(data.access);
    const accessTokenExpires = decodedAccessToken.exp * 1000;

    return {
      accessToken: data.access,
      refreshToken: data.refresh || refreshToken, // Fallback to the old refresh token if a new one isn't provided
      accessTokenExpires,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return {
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        user_type: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password, user_type } = credentials;
        let endpoint = "";

        if (user_type === "vendor") {
          endpoint = `${api_url}/api/v1/vendor/token/`;
        } else if (user_type === "customer") {
          endpoint = `${api_url}/api/v1/customer/token/`;
        } else {
          console.error("Invalid user type provided.");
          return null;
        }

        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (!res.ok || !data.access) {
            console.error("Login failed:", data);
            throw new Error(
              data.detail ||
              data.non_field_errors?.[0] ||
              "Login failed. Please check your credentials."
            );
          }

          // **BUG FIX 1: Decode the token to get the exact expiration**
          const decodedAccessToken = jwtDecode(data.access);
          const accessTokenExpires = decodedAccessToken.exp * 1000; // exp is in seconds, convert to milliseconds

          return {
            id: data.user?.id || email,
            name: data.user?.name || email,
            email,
            user_type,
            accessToken: data.access,
            refreshToken: data.refresh,
            full_user: data.user || {},
            accessTokenExpires,
          };
        } catch (err) {
          console.error("Authorize error:", err.message);
          throw err;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          user: user.full_user,
          user_type: user.user_type,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      console.log("Access token expired. Attempting to refresh...");
      const refreshedTokens = await refreshAccessToken(token.refreshToken);

      if (refreshedTokens.error) {
        console.warn("Refresh token failed. User will be logged out.");
        return {
          ...token,
          error: "RefreshAccessTokenError", // Propagate error
        };
      }

      // **BUG FIX 2: Persist user details after token refresh**
      return {
        ...token, // Keep the old token properties like 'user' and 'user_type'
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken,
        accessTokenExpires: refreshedTokens.accessTokenExpires,
      };
    },

    async session({ session, token }) {
      // **BUG FIX 3: Ensure all necessary data is passed to the session**
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.user_type = token.user_type;
      session.error = token.error; // Make sure to pass the error to the client

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);