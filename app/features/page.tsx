'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Edit,
  Split,
  Save,
  Upload,
  Share2,
  Users,
} from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FeaturesPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Powerful Features for Content Creators
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, manage, and share your content effectively
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-20 px-4 md:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="border shadow-sm h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-3 rounded-lg bg-primary/10"
                      >
                        <feature.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.points.map((point, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <div className="rounded-full bg-primary/10 p-1 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          </div>
                          <span className="text-muted-foreground">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-20 px-4 md:px-6 lg:px-8 bg-muted"
      >
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start creating better content today with our powerful tools.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg">Try Chirr App Free</Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

const features = [
  {
    title: "Distraction-free Editor",
    subtitle: "Focus on what matters most - your content",
    icon: Edit,
    points: [
      "Clean and minimal interface design",
      "Rich text formatting options",
      "Real-time preview mode",
      "Keyboard shortcuts for efficiency",
    ],
  },
  {
    title: "Auto-split Content",
    subtitle: "Repurpose blog content effortlessly",
    icon: Split,
    points: [
      "Intelligent content splitting algorithm",
      "Maintains context and readability",
      "Custom thread length options",
      "Preview and edit splits before posting",
    ],
  },
  {
    title: "Drafts & Sharing",
    subtitle: "Never lose your work",
    icon: Save,
    points: [
      "Auto-save functionality",
      "Cloud backup of all drafts",
      "Share drafts with team members",
      "Version history tracking",
    ],
  },
  {
    title: "Media Uploads",
    subtitle: "Enhance your content with rich media",
    icon: Upload,
    points: [
      "Support for images, videos, and GIFs",
      "Drag and drop functionality",
      "Automatic image optimization",
      "Media library management",
    ],
  },
  {
    title: "Cross-posting",
    subtitle: "Reach your audience everywhere",
    icon: Share2,
    points: [
      "Post to LinkedIn and Mastodon",
      "Platform-specific formatting",
      "Scheduled posting",
      "Analytics and engagement tracking",
    ],
  },
  {
    title: "Multiple Accounts",
    subtitle: "Manage all your presence in one place",
    icon: Users,
    points: [
      "Connect unlimited accounts",
      "Quick account switching",
      "Team collaboration features",
      "Role-based permissions",
    ],
  },
];