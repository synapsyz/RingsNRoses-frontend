import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
let api_url;
const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_APP_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_LOCALHOST
    : process.env.NEXT_PUBLIC_HOST;
};
api_url = getApiUrl()
export default NextAuth({
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
          endpoint = api_url+"/api/v1/vendor/token/";
        } else if (user_type === "customer") {
          endpoint = api_url+"/api/v1/customer/token/";
        } else {
          throw new Error("Invalid user type. Must be customer or vendor.");
        }
      
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      
        const data = await res.json();
      
        if (res.ok && data.access) {
          return {
            id: data.user_id || email,
            name: data.name || email,
            email,
            user_type,
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        }
      
        // Throw error message returned by API
        throw new Error(
          data.detail ||
          data.non_field_errors?.[0] ||
          data.message ||
          "Login failed. Please check your credentials."
        );
              },
      
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user_type = user.user_type;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user_type = token.user_type;
      return session;
    },
  },

  pages: {
    signIn: "/login", // Use a shared login page
  },
});
