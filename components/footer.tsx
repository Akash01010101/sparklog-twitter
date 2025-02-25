"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Help", href: "/help" },
    { name: "Blog", href: "/blogs" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Cookie Policy", href: "/legal/cookies" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com/sparklog", icon: Twitter },
    { name: "Facebook", href: "https://facebook.com/sparklog", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/sparklog", icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/company/sparklog", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/sparklog", icon: Github },
  ],
  contact: [
    { icon: Mail, text: "support@sparklog.com", href: "mailto:support@sparklog.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "123 Social Ave, Digital City, DC 12345", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Twitter className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Sparklog</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Create, manage and schedule your Twitter threads with ease. Optimize your social media presence.
            </p>
            <div className="space-y-4">
              {footerLinks.contact.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 2 }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 2 }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 2 }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Sparklog. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}