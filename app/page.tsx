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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Create Engaging{" "}
              <span className="text-primary">Twitter Threads</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design, write, and schedule your Twitter threads with our powerful thread creator
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/thread">
                  Create Thread
                  <PenTool className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navigationCards.map((card, index) => (
              <Link href={card.href} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
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
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your First Thread?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of content creators who use our platform to share their stories.
          </p>
          <Button asChild size="lg">
            <Link href="/thread">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
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
