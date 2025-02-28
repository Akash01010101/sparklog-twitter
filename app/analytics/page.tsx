"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";

interface Tweet {
  id: string;
  text: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/analytics?userId=${session.user.id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch analytics.");
        }

        setTweets(data.data || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 w-32 bg-muted rounded mb-4 mx-auto"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">Please log in to view analytics.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No tweets found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-6">
        <h1 className="text-3xl font-bold tracking-tight">Tweet Analytics</h1>
      </div>
      <AnalyticsDashboard tweets={tweets} />
    </div>
  );
}