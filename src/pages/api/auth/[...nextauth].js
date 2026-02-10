// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers.
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // From your .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // From your .env
      authorization: {
        params: {   
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline",       // <-- gets a refresh token
          prompt: "consent",            // <-- forces consent screen every time
        },
      },
    }),
  ],
  callbacks: {
    // Include the access token in the JWT token.
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // Make the access token available in the session.
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
