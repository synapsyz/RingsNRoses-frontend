import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const isNgrok = true;

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};

const api_url = getApiUrl();

async function refreshAccessToken(refreshToken, user_type) {
  try {
    const endpoint =
      user_type === "vendor"
        ? `${api_url}/api/v1/vendor/token/refresh/`
        : `${api_url}/api/v1/customer/token/refresh/`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.detail || "Failed to refresh token");

    return {
      accessToken: data.access,
      refreshToken: data.refresh || refreshToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
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
        const { email, password, user_type } = credentials;
        let endpoint = "";

        if (user_type === "vendor") {
          endpoint = `${api_url}/api/v1/vendor/token/`;
        } else if (user_type === "customer") {
          endpoint = `${api_url}/api/v1/customer/token/`;
        } else {
          throw new Error("Invalid user type. Must be customer or vendor.");
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
            throw new Error(
              data.detail ||
              data.non_field_errors?.[0] ||
              data.message ||
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
            accessTokenExpires: Date.now() + 15 * 60 * 1000,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          throw new Error("Login failed. Try again later.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // On first login
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user_type = user.user_type;
        token.user = user.full_user || {};
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // Token expired
      if (Date.now() > token.accessTokenExpires) {
        const refreshed = await refreshAccessToken(token.refreshToken, token.user_type);

        if (refreshed) {
          token.accessToken = refreshed.accessToken;
          token.refreshToken = refreshed.refreshToken;
          token.accessTokenExpires = refreshed.accessTokenExpires;
        } else {
          console.warn("Refresh token failed. Forcing logout.");
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user_type = token.user_type;
      session.user = token.user || {};
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
