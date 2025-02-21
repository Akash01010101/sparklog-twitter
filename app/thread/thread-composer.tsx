"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ReplyIcon, Hash, Scissors, HelpCircle, ImageIcon } from "lucide-react";
import { ThreadPreview } from "./thread-preview";

interface Tweet {
  content: string;
  imageFile?: File;
}

const MAX_TWEET_LENGTH = 160;

export function ThreadComposer() {
  useEffect(() => {
    console.log(session)
  }, [])
  
  const { data: session } = useSession(); // Fetch user session
  const [content, setContent] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const splitTweet = (text: string): string[] => {
    const words = text.split(" ");
    const tweets: string[] = [];
    let currentTweet = "";

    words.forEach((word) => {
      if ((currentTweet + " " + word).trim().length <= MAX_TWEET_LENGTH) {
        currentTweet += (currentTweet ? " " : "") + word;
      } else {
        tweets.push(currentTweet.trim());
        currentTweet = word;
      }
    });

    if (currentTweet) {
      tweets.push(currentTweet.trim());
    }

    return tweets;
  };

  const handleAddTweet = () => {
    if (content.trim() || currentImageFile) {
      const splitContent = splitTweet(content);
      const newTweets: Tweet[] = splitContent.map((tweetContent, index) => ({
        content: tweetContent,
        imageFile: index === 0 && currentImageFile ? currentImageFile : undefined,
      }));
      setTweets([...tweets, ...newTweets]);
      setContent("");
      setCurrentImageFile(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!session) {
      console.error("User not authenticated.");
      console.log(session)
      return;
    }

    const userAccessToken = session?.accessToken;
    const userAccessSecret = session?.accessSecret;

    if (!userAccessToken || !userAccessSecret) {
      console.error("Missing Twitter authentication tokens.");
      return;
    }

    try {
      if (tweets.length === 0) {
        console.error("No tweets to post.");
        setIsPosting(false);
        return;
      }

      setIsPosting(true);
      const formData = new FormData();

      tweets.forEach((tweet, index) => {
        formData.append(`tweets[${index}][content]`, tweet.content);
        if (tweet.imageFile) {
          formData.append(`tweets[${index}][imageFile]`, tweet.imageFile);
        }
      });

      formData.append("userAccessToken", userAccessToken);
      formData.append("userAccessSecret", userAccessSecret);

      const response = await fetch("/api/thread", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", response.status, response.statusText, errorText);
        throw new Error(`Failed to post thread: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Thread posted:", data);
      setTweets([]);
    } catch (error) {
      console.error("Error details:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="flex items-center space-x-4 mb-4 overflow-x-auto">
          <Button variant="ghost" size="sm">
            <ReplyIcon className="h-4 w-4 mr-2" />
            Reply to a tweet
          </Button>
          <Button variant="ghost" size="sm">
            <Hash className="h-4 w-4 mr-2" />
            Numbering
          </Button>
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button variant="ghost" size="sm" asChild>
              <span>
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Image
              </span>
            </Button>
          </label>
          <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <Button variant="ghost" size="sm">
            <Scissors className="h-4 w-4 mr-2" />
            Split
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Tips & tricks
          </Button>
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your tweet..."
          className="min-h-[150px]"
        />
        {currentImageFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Image selected: {currentImageFile.name}</p>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-500">{content.length} characters</div>
          <Button onClick={handleAddTweet}>Add Tweet</Button>
        </div>
      </Card>
      <Card className="p-4">
        <ThreadPreview tweets={tweets} />
        <div className="mt-4">
          <Button className="w-full" onClick={handleSubmit} disabled={tweets.length === 0 || isPosting}>
            {isPosting ? "Posting..." : "Share on Twitter now"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
