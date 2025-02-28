"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {

  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

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

interface AnalyticsDashboardProps {
  tweets: Tweet[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function AnalyticsDashboard({ tweets }: AnalyticsDashboardProps) {
  const [selectedMetric ] = useState<keyof Tweet["public_metrics"]>("like_count");

  const totalEngagement = tweets.reduce(
    (acc, tweet) => ({
      like_count: acc.like_count + tweet.public_metrics.like_count,
      retweet_count: acc.retweet_count + tweet.public_metrics.retweet_count,
      reply_count: acc.reply_count + tweet.public_metrics.reply_count,
      quote_count: acc.quote_count + tweet.public_metrics.quote_count,
    }),
    { like_count: 0, retweet_count: 0, reply_count: 0, quote_count: 0 }
  );

  const engagementData = [
    { name: "Likes", value: totalEngagement.like_count },
    { name: "Retweets", value: totalEngagement.retweet_count },
    { name: "Replies", value: totalEngagement.reply_count },
    { name: "Quotes", value: totalEngagement.quote_count },
  ];

  const topTweets = [...tweets]
    .sort(
      (a, b) =>
        b.public_metrics[selectedMetric] - a.public_metrics[selectedMetric]
    )
    .slice(0, 5);

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <AnimatePresence>
          {Object.entries(totalEngagement).map(([metric, count], index) => (
            <motion.div
              key={metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full md:w-1/4"
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total {metric.replace("_count", "").toUpperCase()}
                  </CardTitle>
                  <CardDescription>
                    {((count / tweets.length) || 0).toFixed(1)} per tweet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Tweet performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tweets}>
                  <XAxis dataKey="id" hide />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={`public_metrics.${selectedMetric}`}
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
            <CardDescription>Breakdown of engagement types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Tweets</CardTitle>
          <CardDescription>Based on {selectedMetric.replace("_count", "")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTweets.map((tweet, index) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <p className="text-sm text-card-foreground mb-2">{tweet.text}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{tweet.public_metrics.like_count} likes</span>
                  <span>{tweet.public_metrics.retweet_count} retweets</span>
                  <span>{tweet.public_metrics.reply_count} replies</span>
                  <span>{tweet.public_metrics.quote_count} quotes</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
