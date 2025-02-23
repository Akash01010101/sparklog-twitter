"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, MessageCircle, Loader2 } from "lucide-react";

interface Thread {
  id: string;
  title: string;
  content: Array<{
    content: string;
    imageFile?: File;
  }>;
  created_at: string;
}

export function SavedThreads() {
  const { data: session } = useSession();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(`/api/thread/saved?userId=${encodeURIComponent(session.user.email)}`);
        if (!response.ok) throw new Error('Failed to fetch threads');
        const data = await response.json();
        setThreads(data.threads);
      } catch (error) {
        console.error('Error fetching threads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, [session]);

  const handleEdit = (thread: Thread) => {
    const parsedContent = typeof thread.content === 'string' ? JSON.parse(thread.content) : thread.content;
    
    localStorage.setItem('draftThread', JSON.stringify({
      id: thread.id,
      title: thread.title,
      content: parsedContent
    }));
    
    window.location.href = '/thread';
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
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {thread.content.length} tweets
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(thread)}
                    className="hover:bg-primary/10 text-gray-600 hover:text-primary transition-colors"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}