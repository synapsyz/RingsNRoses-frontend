import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode";

const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === 'development';

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();

async function refreshAccessToken(token) {
  try {
    const endpoint = `${api_url}/api/v1/token/refresh/`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
      },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to refresh token response:", data);
      throw new Error(data?.detail || "Failed to refresh token");
    }

    const decodedAccessToken = jwtDecode(data.access);
    const accessTokenExpires = decodedAccessToken.exp * 1000;

    return {
      ...token,
      accessToken: data.access,
      refreshToken: data.refresh || token.refreshToken,
      accessTokenExpires,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    // MODIFIED: Define two separate Google providers for each user type
    GoogleProvider({
      id: "google-customer", // Unique ID for the customer flow
      name: "Google", // The name displayed on the button can be the same
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GoogleProvider({
      id: "google-vendor", // Unique ID for the vendor flow
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Your existing CredentialsProvider remains unchanged
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
          const decodedAccessToken = jwtDecode(data.access);
          const accessTokenExpires = decodedAccessToken.exp * 1000;
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
    // MODIFIED: The jwt callback now handles all providers dynamically
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Use a switch to handle different authentication providers
        switch (account.provider) {
          // These two cases handle both customer and vendor Google logins
          case 'google-customer':
          case 'google-vendor':
            try {
              // Dynamically determine the user type and endpoint from the provider ID
              const userType = account.provider.split('-')[1]; // 'customer' or 'vendor'
              const endpoint = `${api_url}/api/v1/${userType}/google-login/`;

              const response = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ token: account.id_token })
              });

              const backendData = await response.json();
              if (!response.ok) {
                  throw new Error(backendData.error || `Backend Google login failed for ${userType}`);
              }

              const decodedAccessToken = jwtDecode(backendData.tokens.access);

              // Populate the NextAuth token with data from your Django backend
              return {
                  accessToken: backendData.tokens.access,
                  refreshToken: backendData.tokens.refresh,
                  accessTokenExpires: decodedAccessToken.exp * 1000,
                  user: backendData.user,
                  user_type: backendData.user.user_type || userType,
              };
            } catch (error) {
                console.error("Error exchanging Google token with backend:", error);
                return { ...token, error: "GoogleLoginError" };
            }

          // This case handles your original Credentials provider
          case 'credentials':
            return {
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
              accessTokenExpires: user.accessTokenExpires,
              user: user.full_user,
              user_type: user.user_type,
            };
        }
      }

      // If token has not expired, return it
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // If token has expired, refresh it
      console.log("Access token expired. Attempting to refresh...");
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
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