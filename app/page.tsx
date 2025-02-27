'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  PenTool,
  Share2,
  Settings,
  CreditCard,
  FileText,
  Scale,
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  BarChart3,
  Users,
  Zap
} from "lucide-react";

import { AnimatedHero } from './components/animated-hero';
import { ThreadPreview } from './components/thread-preview';
import { CustomerReviews } from './components/customer-reviews';
import { FAQSection } from './components/faq-section';
import { motion } from 'framer-motion';
import { SplitFeatures } from './components/split-features';

const navigationCards = [
  {
    title: 'Thread Creator',
    description: 'Create and manage your Twitter threads',
    icon: PenTool,
    href: '/thread',
    features: ['Rich text editor', 'Thread preview', 'Draft saving']
  },
  {
    title: 'Schedule Posts',
    description: 'Plan and schedule your content',
    icon: Share2,
    href: '/schedule',
    features: ['Optimal timing', 'Queue management', 'Analytics']
  },
  {
    title: 'Account Settings',
    description: 'Manage your account preferences',
    icon: Settings,
    href: '/account',
    features: ['Profile settings', 'Notifications', 'Security']
  },
  {
    title: 'Pricing Plans',
    description: 'Choose the right plan for you',
    icon: CreditCard,
    href: '/pricing',
    features: ['Flexible plans', 'Pro features', 'Team options']
  },
  {
    title: 'Documentation',
    description: 'Learn how to use XThreadCraftThread',
    icon: FileText,
    href: '/docs',
    features: ['Guides', 'API docs', 'Examples']
  },
  {
    title: 'Terms & Privacy',
    description: 'Our policies and terms',
    icon: Scale,
    href: '/legal',
    features: ['Terms of service', 'Privacy policy', 'Guidelines']
  }
];

const features = [
  {
    icon: Sparkles,
    title: 'Smart Content Splitting',
    description: 'Automatically split your long-form content into perfectly sized tweets',
    points: ['AI-powered content analysis', 'Optimal tweet length suggestions', 'Hashtag recommendations']
  },
  {
    icon: Clock,
    title: 'Schedule & Automate',
    description: 'Plan your content ahead with advanced scheduling features',
    points: ['Flexible scheduling options', 'Time zone optimization', 'Queue management']
  },
  {
    icon: Share2,
    title: 'Cross-Platform Sharing',
    description: 'Share your threads across multiple social platforms',
    points: ['One-click multi-platform posting', 'Platform-specific formatting', 'Engagement tracking']
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track your thread performance with detailed analytics',
    points: ['Engagement metrics', 'Audience insights', 'Performance reports']
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team seamlessly',
    points: ['Real-time collaboration', 'Role-based permissions', 'Content approval workflow']
  },
  {
    icon: Zap,
    title: 'Lightning Fast Editor',
    description: 'Create and edit threads with our intuitive editor',
    points: ['Rich text formatting', 'Media integration', 'Thread preview']
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedHero />

      {/* Thread Preview Section */}
      <section className="py-24 px-6 md:px-8 lg:px-12 bg-muted/50">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-16"
          >
            Threads Preview
          </motion.h2>
          <ThreadPreview />
        </div>
      </section>
    {/* Navigation Cards Section */}
    <section className="py-24 px-6 md:px-8 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Quick Navigation</h2>
            <p className="text-xl text-muted-foreground">Access all the tools and resources you need</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navigationCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link href={card.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <card.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{card.title}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SplitFeatures />
      {/* Features Grid */}
      <section className="py-24 px-6 md:px-8 lg:px-12 bg-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to create engaging Twitter threads</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CustomerReviews />

      {/* Pricing Section */}
      <motion.section 
        className="py-20 px-4 md:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Free Forever</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All features included, no credit card required
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg"
            >
              <Card className="border-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Everything You Need</CardTitle>
                  <CardDescription>Start creating amazing content today</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/forever</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Unlimited Social Accounts",
                      "Advanced Content Editor",
                      "Unlimited Posts",
                      "Advanced Analytics",
                      "Auto-split Content",
                      "Team Collaboration",
                      "Community Support"
                    ].map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Get Started Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <FAQSection />

      {/* CTA Section */}
      <motion.section 
        className="py-24 px-6 md:px-8 lg:px-12 bg-muted/50 dark:bg-muted/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="container mx-auto max-w-7xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Start Creating?</h2>
          <p className="text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of content creators who trust Sparklog for their Twitter presence
          </p>
          <Link href="/thread">
            <Button size="lg" className="gap-3 text-lg px-8 py-6">
              Create Your First Thread
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.section>
      <Footer/>
    </div>
  );
}
