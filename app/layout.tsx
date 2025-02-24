import type { Metadata } from "next";
import AuthProvider from "@/components/session-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sparklog - Twitter Thread Management Platform",
    template: "%s | Sparklog"
  },
  description: "Create, manage and schedule your Twitter threads with ease. Sparklog helps content creators optimize their social media presence.",
  keywords: ["Twitter", "thread", "social media", "content management", "scheduling", "automation"],
  authors: [{ name: "Sparklog Team" }],
  creator: "Sparklog",
  publisher: "Sparklog",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sparklog.com",
    title: "Sparklog - Twitter Thread Management Platform",
    description: "Create, manage and schedule your Twitter threads with ease",
    siteName: "Sparklog",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Sparklog Preview"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparklog - Twitter Thread Management Platform",
    description: "Create, manage and schedule your Twitter threads with ease",
    creator: "@sparklog",
    images: ["/og-image.png"]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
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
