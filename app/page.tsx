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
  X,
} from "lucide-react";

import { AnimatedHero } from './components/animated-hero';
import { ThreadPreview } from './components/thread-preview';
import { SocialIntegrations } from './components/social-integrations';
import { CustomerReviews } from './components/customer-reviews';
import { FAQSection } from './components/faq-section';
import { motion } from 'framer-motion';

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
    description: 'Learn how to use Sparklog',
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

      {/* Main Navigation Cards */}
      <section className="py-24 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
                  <Card className="h-full transform transition-all duration-300 hover:shadow-xl hover:bg-accent/5 cursor-pointer group p-6">
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-6">
                        <motion.div 
                          className="p-4 rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20"
                          whileHover={{ rotate: 5 }}
                        >
                          <card.icon className="h-8 w-8 text-primary" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-2xl font-semibold mb-2">{card.title}</CardTitle>
                          <CardDescription className="text-base text-muted-foreground">{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {card.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                          >
                            <motion.div 
                              className="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:bg-primary/80"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-lg text-muted-foreground group-hover:text-primary transition-all duration-300">{feature}</span>
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

      <SocialIntegrations />
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
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your content creation needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                description: "Perfect for getting started",
                price: "0",
                popular: false,
                features: [
                  { text: "1 Social Media Account", included: true },
                  { text: "Basic Content Editor", included: true },
                  { text: "5 Posts per Month", included: true },
                  { text: "Basic Analytics", included: true },
                  { text: "Auto-split Content", included: false },
                  { text: "Team Collaboration", included: false },
                  { text: "Priority Support", included: false },
                ],
              },
              {
                name: "Pro",
                description: "Best for content creators",
                price: "29",
                popular: true,
                features: [
                  { text: "Unlimited Social Accounts", included: true },
                  { text: "Advanced Content Editor", included: true },
                  { text: "Unlimited Posts", included: true },
                  { text: "Advanced Analytics", included: true },
                  { text: "Auto-split Content", included: true },
                  { text: "Team Collaboration", included: true },
                  { text: "Priority Support", included: false },
                ],
              },
              {
                name: "Enterprise",
                description: "For large teams and businesses",
                price: "99",
                popular: false,
                features: [
                  { text: "Unlimited Social Accounts", included: true },
                  { text: "Advanced Content Editor", included: true },
                  { text: "Unlimited Posts", included: true },
                  { text: "Advanced Analytics", included: true },
                  { text: "Auto-split Content", included: true },
                  { text: "Team Collaboration", included: true },
                  { text: "Priority Support", included: true },
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: plan.popular ? 1.02 : 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`flex flex-col p-6 ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border shadow'}`}
                >
                  <CardHeader className="pb-8">
                    {plan.popular && (
                      <div className="text-base font-medium text-primary mb-4">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-3xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-lg">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-8">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-xl text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          {feature.included ? (
                            <Check className="h-5 w-5 text-primary" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className={!feature.included ? "text-muted-foreground" : ""}>
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
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
