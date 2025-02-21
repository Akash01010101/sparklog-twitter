import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  Settings,
  CreditCard,
  Bell,
  Shield,
  Key,
} from "lucide-react";

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground">
                Manage your account preferences and settings
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Preferences
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Privacy
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Key className="h-4 w-4" /> Security
              </TabsTrigger>
            </TabsList>

            <div className="grid gap-8">
              {sections.map((section, index) => (
                <TabsContent key={index} value={section.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {section.settings.map((setting, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{setting.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {setting.description}
                              </p>
                            </div>
                            <Button variant={ "outline"}>
                              {setting.action.label}
                            </Button>
                          </div>
                          {idx < section.settings.length - 1 && (
                            <div className="h-px bg-border" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

const sections = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Manage your public profile information",
    settings: [
      {
        title: "Profile Information",
        description: "Update your name, bio, and profile picture",
        action: { label: "Edit Profile", variant: "default" },
      },
      {
        title: "Social Links",
        description: "Connect your social media accounts",
        action: { label: "Manage Links" },
      },
      {
        title: "Email Address",
        description: "Change your email address",
        action: { label: "Change Email" },
      },
    ],
  },
  {
    id: "preferences",
    title: "App Preferences",
    description: "Customize your app experience",
    settings: [
      {
        title: "Theme Settings",
        description: "Choose between light and dark mode",
        action: { label: "Change Theme" },
      },
      {
        title: "Language",
        description: "Select your preferred language",
        action: { label: "Change Language" },
      },
    ],
  },
  {
    id: "billing",
    title: "Billing Information",
    description: "Manage your subscription and payment methods",
    settings: [
      {
        title: "Current Plan",
        description: "You are on the Pro plan",
        action: { label: "Upgrade Plan", variant: "default" },
      },
      {
        title: "Payment Method",
        description: "Update your payment information",
        action: { label: "Update" },
      },
      {
        title: "Billing History",
        description: "View your past invoices",
        action: { label: "View History" },
      },
    ],
  },
  {
    id: "notifications",
    title: "Notification Settings",
    description: "Control how you receive notifications",
    settings: [
      {
        title: "Email Notifications",
        description: "Manage email alert preferences",
        action: { label: "Configure" },
      },
      {
        title: "Push Notifications",
        description: "Control in-app notifications",
        action: { label: "Configure" },
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Settings",
    description: "Control your privacy preferences",
    settings: [
      {
        title: "Profile Visibility",
        description: "Manage who can see your profile",
        action: { label: "Adjust" },
      },
      {
        title: "Data Sharing",
        description: "Control how your data is shared",
        action: { label: "Configure" },
      },
    ],
  },
  {
    id: "security",
    title: "Security Settings",
    description: "Manage your account security",
    settings: [
      {
        title: "Password",
        description: "Change your password",
        action: { label: "Change", variant: "default" },
      },
      {
        title: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        action: { label: "Enable" },
      },
      {
        title: "Login History",
        description: "View your recent login activity",
        action: { label: "View" },
      },
    ],
  },
];