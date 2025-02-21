import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

// Extend the session type to include Twitter OAuth 1.0a tokens
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessSecret?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessSecret?: string;
  }
}

// Ensure required environment variables exist
if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET || !process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing environment variables for Twitter authentication");
}

// ✅ OAuth 1.0a for Twitter
export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY!,
      clientSecret: process.env.TWITTER_API_SECRET!,
      version: "1.0a",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account && "oauth_token" in account && "oauth_token_secret" in account) {
        token.accessToken = account.oauth_token as string;
        token.accessSecret = account.oauth_token_secret as string;
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
