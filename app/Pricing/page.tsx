import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your content creation needs
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`flex flex-col ${
                  plan.popular ? 'border-primary shadow-lg scale-105' : 'border shadow'
                }`}
              >
                <CardHeader>
                  {plan.popular && (
                    <div className="text-sm font-medium text-primary mb-2">
                      Most Popular
                    </div>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className={!feature.included ? "text-muted-foreground" : ""}>
                          {feature.text}
                        </span>
                      </li>
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6 text-left">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const plans = [
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
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No, all our plans are month-to-month with no long-term commitment required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
  },
];