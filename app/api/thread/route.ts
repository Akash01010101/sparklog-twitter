import { NextResponse } from "next/server";
import { TwitterApi, SendTweetV2Params } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract tweets dynamically
    const tweets: SendTweetV2Params[] = [];
    let i = 0;

    while (formData.has(`tweets[${i}][content]`)) {
      const tweetText = formData.get(`tweets[${i}][content]`) as string | null;
      if (!tweetText) {
        i++;
        continue;
      }

      const tweet: SendTweetV2Params = { text: tweetText };
      const imageFile = formData.get(`tweets[${i}][imageFile]`) as File | null;

      if (imageFile && imageFile.size > 0) {
        try {
          const buffer = Buffer.from(await imageFile.arrayBuffer());
          const mediaId = await client.v1.uploadMedia(buffer, { mimeType: imageFile.type });
          tweet.media = { media_ids: [mediaId] as [string] };
        } catch (mediaError) {
          console.error(`Error uploading image for tweet ${i}:`, mediaError);
        }
      }
      tweets.push(tweet);
      i++;
    }

    if (tweets.length === 0) {
      return NextResponse.json({ success: false, error: "No tweets to post" }, { status: 400 });
    }

    // Post the thread
    const thread = await client.v2.tweetThread(tweets);
    return NextResponse.json({ success: true, thread });

  } catch (error) {
    console.error("Error posting thread:", error);
    return NextResponse.json({ success: false, error: "Failed to post thread" }, { status: 500 });
  }
}
