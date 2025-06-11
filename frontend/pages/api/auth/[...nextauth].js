import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// The problematic import has been removed.

// Assuming your Django SIMPLE_JWT settings are:
// "ACCESS_TOKEN_LIFETIME": timedelta(seconds=10),
const ACCESS_TOKEN_LIFETIME_MINUTES = 120;

const isNgrok = true; // Set to true if using ngrok

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

    return {
      accessToken: data.access,
      refreshToken: data.refresh || refreshToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_LIFETIME_MINUTES * 60 * 1000,
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
          
          return {
            id: data.user_id || email,
            name: data.name || email,
            email,
            user_type,
            accessToken: data.access,
            refreshToken: data.refresh,
            full_user: data.user || {},
            accessTokenExpires: Date.now() + ACCESS_TOKEN_LIFETIME_MINUTES* 60 * 1000,
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
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          user: user.full_user || {},
          user_type: user.user_type,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log("Access token expired. Attempting to refresh...");
      const refreshedTokens = await refreshAccessToken(token.refreshToken);

      if (refreshedTokens.error) {
          console.warn("Refresh token failed. User will be logged out.");
          return {
              ...token,
              error: "RefreshAccessTokenError",
          };
      }

      return {
        ...token,
        accessToken: refreshedTokens.accessToken,
        refreshToken: refreshedTokens.refreshToken,
        accessTokenExpires: refreshedTokens.accessTokenExpires,
      };
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user || {};
      session.user_type = token.user_type;
      session.error = token.error;
      
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);