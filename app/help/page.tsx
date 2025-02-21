import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Book,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              How Can We Help You?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  className="pl-10 py-6"
                  placeholder="Search our help center..."
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.topics.map((topic, idx) => (
                      <li key={idx} className="text-muted-foreground hover:text-primary cursor-pointer">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-muted-foreground">
              Our support team is here to assist you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-lg bg-primary/10 w-fit">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">{method.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of using Chirr App",
    icon: Book,
    topics: [
      "Quick Start Guide",
      "Account Setup",
      "Connecting Social Media",
      "Creating Your First Post",
    ],
  },
  {
    title: "Features & Tools",
    description: "Detailed guides for all features",
    icon: HelpCircle,
    topics: [
      "Content Editor",
      "Auto-split Function",
      "Media Management",
      "Analytics Dashboard",
    ],
  },
  {
    title: "Common Questions",
    description: "Frequently asked questions",
    icon: MessageCircle,
    topics: [
      "Billing & Subscriptions",
      "Account Management",
      "Technical Issues",
      "Platform Integrations",
    ],
  },
];

const contactMethods = [
  {
    title: "Email Support",
    description: "Get a response within 24 hours",
    icon: Mail,
    action: "Send Email",
  },
  {
    title: "Live Chat",
    description: "Chat with our support team",
    icon: MessageCircle,
    action: "Start Chat",
  },
  {
    title: "Phone Support",
    description: "Available for enterprise customers",
    icon: Phone,
    action: "Call Us",
  },
];