'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { AnimatedSection, AnimatedList } from "../components/animated-section";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedSection className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Free Forever
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All features included, no credit card required
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
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
      </AnimatedSection>

      <AnimatedSection delay={0.4} className="py-20 px-4 md:px-6 lg:px-8 bg-muted dark:bg-muted/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground dark:text-foreground">Frequently Asked Questions</h2>
          <AnimatedList className="grid gap-6 text-left" staggerDelay={0.1}>
            {[
              {
                question: "Is it really free forever?",
                answer: "Yes! Sparklog is completely free to use with all features included. No hidden fees or credit card required."
              },
              {
                question: "Are there any usage limits?",
                answer: "No, you can use all features without any restrictions. Create as many threads as you want!"
              },
              {
                question: "Do you offer support?",
                answer: "Yes, we provide community support to all users through our help center and community forums."
              },
              {
                question: "How do you sustain a free service?",
                answer: "We believe in building a great product that's accessible to everyone. We're supported by our amazing community and optional donations."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground dark:text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground dark:text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </AnimatedList>
        </div>
      </AnimatedSection>
    </div>
  );
}
