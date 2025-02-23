"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, MessageCircle, Loader2, Clock } from "lucide-react";
import { ScheduleModal } from "./schedule-modal";

interface Thread {
  id: string;
  title: string;
  content: Array<{
    content: string;
    imageFile?: File;
  }>;
  created_at: string;
  scheduled_time?: string; // This field is properly used
}

export function SavedThreads() {
  const { data: session } = useSession();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `/api/thread/saved?userId=${encodeURIComponent(session.user.email)}`
        );
        if (!response.ok) throw new Error("Failed to fetch threads");

        const data = await response.json();
        console.log("Fetched threads:", data.threads);

        // Convert UTC timestamps to IST in 12-hour format
        setThreads(
          data.threads.map((thread: Thread) => ({
            ...thread,
            created_at: new Date(thread.created_at + "Z").toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "medium",
              timeStyle: "short",
              hour12: true,
            }),
            scheduled_time: thread.scheduled_time
              ? new Date(thread.scheduled_time + "Z").toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: true,
                })
              : null,
          }))
        );
      } catch (error) {
        console.error("Error fetching threads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [session]);

  const handleSchedule = async (date: Date) => {
    if (!session?.user?.email) return;

    // Get the title from the selected thread if updating; otherwise, use a default title.
    const selectedThread = threads.find((t) => t.id === selectedThreadId);
    const threadTitle = selectedThread ? selectedThread.title : "New Thread Title";

    try {
      const response = await fetch("/api/thread/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId: selectedThreadId || null,
          title: threadTitle,
          content: selectedThreadId ? undefined : [],
          scheduledAt: date.toISOString(),
          userId: session.user.email,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to schedule thread: ${errorText}`);
      }

      const { thread } = await response.json();
      console.log("Scheduled thread response:", thread);

      // Update the thread in state with the new scheduled_time
      setThreads((prevThreads) =>
        prevThreads.map((t) =>
          t.id === selectedThreadId ? { ...t, scheduled_time: thread.scheduled_time || null } : t
        )
      );

      console.log("Thread scheduled for:", date);
    } catch (error) {
      console.error("Error scheduling thread:", error);
    }

    setIsScheduleModalOpen(false);
  };

  const handleEdit = (thread: Thread) => {
    const parsedContent =
      typeof thread.content === "string" ? JSON.parse(thread.content) : thread.content;

    localStorage.setItem(
      "draftThread",
      JSON.stringify({
        id: thread.id,
        title: thread.title,
        content: parsedContent,
      })
    );

    window.location.href = "/thread";
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 flex items-center justify-center py-12"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-gray-600">Loading saved threads...</span>
      </motion.div>
    );
  }

  if (threads.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center py-12 bg-gray-50/50 rounded-lg border border-dashed border-gray-200"
      >
        <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium">No saved threads yet</p>
        <p className="text-gray-500 text-sm mt-2">Your saved threads will appear here</p>
      </motion.div>
    );
  }

  return (
    <div className="mt-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 text-gray-900"
      >
        Saved Threads
      </motion.h2>
      <AnimatePresence>
        <div className="space-y-4">
          {threads.map((thread, index) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm border-gray-100 hover:border-primary/20">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors">
                      {thread.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm text-gray-500">{thread.created_at}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {thread.content.length} tweets
                      </div>
                      {thread.scheduled_time && (
                        <div className="flex items-center text-sm text-blue-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Scheduled for {thread.scheduled_time}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(thread)}
                      className="hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedThreadId(thread.id);
                        setIsScheduleModalOpen(true);
                      }}
                      className="hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </div>
  );
}
