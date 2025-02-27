"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b bg-background dark:bg-background dark:border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold text-primary dark:text-primary">
            XThreadCraft
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Drafts</Button>
            <Button variant="ghost">Schedule</Button>
            <Button variant="ghost">History</Button>
            <Button variant="ghost">Analytics</Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          <Button variant="default">New thread</Button>
        </div>
      </div>
    </header>
  )
}