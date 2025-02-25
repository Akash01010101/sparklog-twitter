'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Johnson',
    handle: '@sarahj_writes',
    avatar: 'SJ',
    content: 'Sparklog has completely transformed how I manage my Twitter presence. The thread creation tool is intuitive and powerful! 🚀',
    rating: 5
  },
  {
    name: 'Mike Chen',
    handle: '@miketech',
    avatar: 'MC',
    content: 'The scheduling features and analytics have helped me grow my audience significantly. Best investment for content creators!',
    rating: 5
  },
  {
    name: 'Emma Davis',
    handle: '@emmawrites',
    avatar: 'ED',
    content: 'Clean interface, great support, and amazing features. Sparklog makes thread creation a breeze! ✨',
    rating: 5
  },
  {
    name: 'Alex Rivera',
    handle: '@alexcreates',
    avatar: 'AR',
    content: 'The auto-split feature saves me hours of work. Love how it maintains the context of my long-form content! 💡',
    rating: 4
  },
  {
    name: 'Priya Patel',
    handle: '@priyatech',
    avatar: 'PP',
    content: 'As a social media manager, the multi-account support and team collaboration features are game-changers. Highly recommend! 🌟',
    rating: 5
  },
  {
    name: 'Tom Wilson',
    handle: '@tomwrites',
    avatar: 'TW',
    content: 'Great for scheduling and analytics. Would love to see more customization options, but overall a solid tool.',
    rating: 4
  }
];

export function CustomerReviews() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of content creators who trust Sparklog for their social media management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.handle}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">{review.avatar}</span>
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.handle}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}