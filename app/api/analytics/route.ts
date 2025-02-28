import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOptions";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

interface TwitterData {
  id: string;
  text: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
}

interface CacheEntry {
  data: TwitterData[];
  timestamp: number;
}

const CACHE = new Map<string, CacheEntry>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes


export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.accessToken || !session.accessSecret) {
    console.error("Unauthorized request:", session);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    console.error("Missing userId in request");
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  console.log("Fetching analytics for user:", userId);

  // Check Cache First
  if (CACHE.has(userId)) {
    const { data, timestamp } = CACHE.get(userId)!;
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Returning cached data for user:", userId);
      return NextResponse.json({ data }, { status: 200 });
    }
  }

  try {
    const oauth = new OAuth({
      consumer: {
        key: process.env.TWITTER_API_KEY as string,
        secret: process.env.TWITTER_API_SECRET as string,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto.createHmac("sha1", key).update(base_string).digest("base64");
      },
    });

    const token = {
      key: session.accessToken,
      secret: session.accessSecret,
    };

    const url = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=public_metrics`;
    const authHeader = oauth.toHeader(oauth.authorize({ url, method: "GET" }, token));

    // Retry logic for rate limiting
    const fetchWithRetry = async (retries = 3, delay = 5000): Promise<NextResponse> => {
      for (let i = 0; i < retries; i++) {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            ...authHeader,
            "Content-Type": "application/json",
          },
        });

        // Check rate limit headers
        const limitReset = response.headers.get("x-rate-limit-reset");

        if (response.status === 429) {
          const waitTime = limitReset
            ? Number(limitReset) * 1000 - Date.now()
            : delay * (i + 1);
          console.warn(`Rate limit hit. Retrying after ${waitTime / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Twitter API Error:", response.status, errorText);
          return NextResponse.json({ error: "Failed to fetch tweets" }, { status: response.status });
        }

        const twitterData = await response.json();
        console.log("Twitter API Response:", twitterData);

        // Store in cache
        CACHE.set(userId, { data: twitterData.data, timestamp: Date.now() });

        return NextResponse.json({ data: twitterData.data }, { status: 200 });
      }
      return NextResponse.json({ error: "Too many requests, try again later" }, { status: 429 });
    };

    return await fetchWithRetry();
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
