import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import type { JWT } from "next-auth/jwt";

interface ExtendedToken extends JWT {
  accessToken?: string;
  accessSecret?: string;
}

// Ensure required environment variables exist
if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET || !process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing environment variables for Twitter authentication");
}

// ✅ Explicitly enabling OAuth 1.0a by not passing `version: "2.0"`
export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY,
      clientSecret: process.env.TWITTER_API_SECRET,
      version: "1.0a", // ✅ Forces OAuth 1.0a
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
      return token as ExtendedToken;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: (token as ExtendedToken).accessToken,
        accessSecret: (token as ExtendedToken).accessSecret,
      };
    },
  },
};
