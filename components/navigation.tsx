"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Covenants PharmaChem
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#rd"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              R&amp;D
            </Link>
            <Link
              href="#manufacturing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Manufacturing
            </Link>
            <Link
              href="#atoms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ATOMS
            </Link>
            <Link
              href="#industries"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Industries
            </Link>
            <Link
              href="#resources"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="#partner"
              className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="#rd"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              R&amp;D
            </Link>
            <Link
              href="#manufacturing"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Manufacturing
            </Link>
            <Link
              href="#atoms"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ATOMS
            </Link>
            <Link
              href="#industries"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Industries
            </Link>
            <Link
              href="#resources"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="#partner"
              className="block text-sm px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

