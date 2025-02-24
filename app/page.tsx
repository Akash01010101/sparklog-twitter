'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  PenTool,
  Share2,
  Settings,
  CreditCard,
  FileText,
  Scale,
  ArrowRight,
  BookOpen
} from "lucide-react";



import { AnimatedHero } from './components/animated-hero';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedHero />

      {/* Main Navigation Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {navigationCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Link href={card.href}>
                  <Card className="h-full transform transition-all duration-300 hover:shadow-xl hover:bg-accent/5 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="p-3 rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20"
                          whileHover={{ rotate: 5 }}
                        >
                          <card.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {card.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                          >
                            <motion.div 
                              className="h-1.5 w-1.5 rounded-full bg-primary transition-all duration-300 group-hover:bg-primary/80"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-muted-foreground group-hover:text-primary transition-all duration-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50 dark:bg-muted/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="container mx-auto max-w-6xl text-center"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4 text-foreground"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Ready to Create Your First Thread?
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join thousands of content creators who use our platform to share their stories.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Button 
              asChild 
              size="lg"
              className="hover:scale-105 transition-all duration-300 hover:shadow-lg hover:bg-primary/90"
            >
              <Link href="/thread">
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

const navigationCards = [
  {
    title: "Thread Creator",
    description: "Design and schedule your Twitter threads",
    icon: PenTool,
    href: "/thread",
    features: [
      "Visual thread designer",
      "Auto-scheduling",
      "Thread preview",
      "Draft saving",
    ],
  },
  {
    title: "Features",
    description: "Explore our powerful features",
    icon: Share2,
    href: "/features",
    features: [
      "Distraction-free editor",
      "Auto-split content",
      "Media uploads",
      "Cross-posting",
    ],
  },
  {
    title: "Account",
    description: "Manage your account settings",
    icon: Settings,
    href: "/account",
    features: [
      "Profile settings",
      "Preferences",
      "Security options",
      "Notifications",
    ],
  },
  {
    title: "Pricing",
    description: "Choose your perfect plan",
    icon: CreditCard,
    href: "/Pricing",
    features: [
      "Flexible plans",
      "Monthly billing",
      "Team accounts",
      "Enterprise options",
    ],
  },
  {
    title: "Legal",
    description: "Privacy and legal information",
    icon: FileText,
    href: "/legal",
    features: [
      "Privacy policy",
      "Data protection",
      "User rights",
      "Cookie policy",
    ],
  },
  {
    title: "Terms",
    description: "Terms of service",
    icon: Scale,
    href: "/terms",
    features: [
      "User agreement",
      "Service terms",
      "Usage guidelines",
      "Dispute resolution",
    ],
  },
  {
    title: "Blogs",
    description: "Read insightful articles and updates",
    icon: BookOpen,  // You can use an appropriate icon from your icon set
    href: "/blogs",
    features: [
      "Latest blog posts",
      "Guides and tutorials",
      "Product updates",
      "Community stories",
    ],
  },
];
