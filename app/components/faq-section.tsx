'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is Sparklog?',
    answer: 'Sparklog is a comprehensive Twitter thread management platform that helps content creators design, write, and schedule their Twitter threads efficiently. It provides tools for content organization, scheduling, and analytics.'
  },
  {
    question: 'How does thread scheduling work?',
    answer: 'With Sparklog, you can create threads in advance and schedule them to be posted at optimal times. Our platform automatically splits your content into perfectly formatted tweets and posts them at your specified times.'
  },
  {
    question: 'Can I manage multiple Twitter accounts?',
    answer: 'Yes! Sparklog supports multiple Twitter account management. You can easily switch between accounts and manage content for different audiences from a single dashboard.'
  },
  {
    question: 'What analytics does Sparklog provide?',
    answer: 'Sparklog offers comprehensive analytics including engagement rates, best posting times, audience growth, and content performance metrics to help you optimize your Twitter strategy.'
  },
  {
    question: 'Is there a free plan available?',
    answer: 'Yes, we offer a free plan that includes basic thread creation and scheduling features. For advanced features like analytics and multiple account management, check out our premium plans.'
  }
];

export function FAQSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Sparklog and its features
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}