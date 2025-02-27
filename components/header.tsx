"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Twitter } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Twitter className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">XThreadCraft</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}