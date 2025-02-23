"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { motion } from "framer-motion";

interface Tweet {
  content: string;
  imageFile?: File;
}

interface ThreadPreviewProps {
  tweets: Tweet[];
}

export function ThreadPreview({ tweets }: ThreadPreviewProps) {
  return (
    <div className="space-y-6">
      {tweets.map((tweet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="group"
        >
          <div className="flex space-x-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
            <Avatar className="w-10 h-10 border-2 border-primary/10">
              <AvatarImage src="/placeholder.svg" className="object-cover" />
              <AvatarFallback className="bg-primary/5 text-primary">UN</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="font-semibold text-gray-900">User Name</div>
                <div className="text-sm text-gray-500">Tweet {index + 1}</div>
              </div>
              <p className="text-gray-600 leading-relaxed">{tweet.content}</p>
              {tweet.imageFile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 group-hover:border-primary/20 transition-all duration-300"
                >
                  <Image
                    src={URL.createObjectURL(tweet.imageFile)}
                    alt="Tweet image"
                    width={400}
                    height={300}
                    className="object-cover w-full max-h-[300px]"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      {tweets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Your thread preview will appear here</p>
        </div>
      )}
    </div>
  );
}