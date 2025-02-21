import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Ensure environment variables are defined
if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET || !process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing environment variables for Twitter authentication");
}

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY,
      clientSecret: process.env.TWITTER_API_SECRET,
      // Note: No version specified means OAuth 1.0a by default
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.oauth_token;
        token.accessSecret = account.oauth_token_secret;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.accessSecret = token.accessSecret;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };