"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ReplyIcon, Hash, Scissors, HelpCircle, ImageIcon, SaveIcon, Loader2 } from "lucide-react";
import { ThreadPreview } from "./thread-preview";
import { motion, AnimatePresence } from "framer-motion";
import { access } from "fs";

interface Tweet {
  content: string;
  imageFile?: File;
}

const MAX_TWEET_LENGTH = 160;

export function ThreadComposer() {
  const { data: session } = useSession();
  const [content, setContent] = useState<string>("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showImagePreview, setShowImagePreview] = useState<boolean>(false);
  useEffect(() => {
    const savedThread = localStorage.getItem('draftThread');
    if (savedThread) {
      try {
        const { title: savedTitle, content: savedContent } = JSON.parse(savedThread);
        setTitle(savedTitle);
        setTweets(savedContent);
        localStorage.removeItem('draftThread');
      } catch (error) {
        console.error('Error loading saved thread:', error);
      }
    }
  }, []);

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
      setShowImagePreview(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentImageFile(e.target.files[0]);
      setShowImagePreview(true);
    }
  };

  const handleSave = async () => {
    if (!session?.user?.email) {
      console.error("User not authenticated.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter a title for your thread");
      return;
    }

    if (tweets.length === 0) {
      alert("Please add at least one tweet to your thread");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch("/api/thread/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.email,
          title: title.trim(),
          content: tweets,
          accessToken: session.accessToken,
          accessSecret: session.accessSecret,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save thread");
      }

      const data = await response.json();
      console.log("Thread saved:", data);
      setTitle("");
    } catch (error) {
      console.error("Error saving thread:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!session) {
      console.error("User not authenticated.");
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="space-y-6">
            <Input
              type="text"
              placeholder="Thread title (required)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-lg font-semibold focus:ring-2 focus:ring-primary"
            />
            <div className="flex items-center space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                <ReplyIcon className="h-4 w-4 mr-2" />
                Reply to a tweet
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                <Hash className="h-4 w-4 mr-2" />
                Numbering
              </Button>
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 transition-colors">
                  <span>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload Image
                  </span>
                </Button>
              </label>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                <Scissors className="h-4 w-4 mr-2" />
                Split
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                <HelpCircle className="h-4 w-4 mr-2" />
                Tips & tricks
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your tweet..."
              className="min-h-[150px] focus:ring-2 focus:ring-primary resize-none"
            />
            <AnimatePresence>
              {currentImageFile && showImagePreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-50 rounded-lg"
                >
                  <p className="text-sm text-gray-600 flex items-center">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {currentImageFile.name}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                {content.length} / {MAX_TWEET_LENGTH} characters
              </div>
              <Button 
                onClick={handleAddTweet}
                className="bg-primary hover:bg-primary/90 text-white transition-colors"
                disabled={!content.trim() && !currentImageFile}
              >
                Add Tweet
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="space-y-6">
            <ThreadPreview tweets={tweets} />
            <div className="flex space-x-4">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-white transition-colors"
                onClick={handleSubmit} 
                disabled={tweets.length === 0 || isPosting}
              >
                {isPosting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Share on Twitter now"
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSave} 
                disabled={tweets.length === 0 || isSaving}
                className="hover:bg-primary/10 transition-colors"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
