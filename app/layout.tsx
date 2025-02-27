import type { Metadata } from "next";
import AuthProvider from "@/components/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://sparklog-twitter.vercel.app'),
  title: {
    default: "Sparklog - Twitter Thread Management Platform",
    template: "%s | Sparklog"
  },
  description: "Create, manage and schedule your Twitter threads with ease. Sparklog helps content creators optimize their social media presence with AI-powered tools and analytics.",
  keywords: ["Twitter", "thread", "social media", "content management", "scheduling", "automation", "AI writing", "analytics", "social media optimization"],
  authors: [{ name: "Sparklog Team", url: "https://sparklog-twitter.vercel.app/team" }],
  creator: "Sparklog",
  publisher: "Sparklog",
  applicationName: "Sparklog",
  category: "Social Media Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sparklog-twitter.vercel.app",
    title: "Sparklog - Twitter Thread Management Platform",
    description: "Create, manage and schedule your Twitter threads with ease using AI-powered tools",
    siteName: "Sparklog",
    images: [{
      url: "https://sparklog-twitter.vercel.app/og-image.png",
      width: 1200,
      height: 630,
      alt: "Sparklog Preview"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparklog - Twitter Thread Management Platform",
    description: "Create, manage and schedule your Twitter threads with ease using AI-powered tools",
    creator: "@sparklog",
    site: "@sparklog",
    images: ["https://sparklog-twitter.vercel.app/og-image.png"]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
