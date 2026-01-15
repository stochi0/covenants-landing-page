"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand (top-left) */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Covenants PharmaChem LLP"
          >
            <span className="sr-only">Covenants PharmaChem LLP</span>
            <Image
              src="/covenants-logo.png"
              alt="Covenants logo"
              width={220}
              height={64}
              priority
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About us
              </Link>
              <Link
                href="#services"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                href="#products"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                href="#why"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Why Covenants?
              </Link>
              <Link
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact us
              </Link>
              <Link
                href="#contact"
                className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Let us connect!
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
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="#about"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About us
            </Link>
            <Link
              href="#services"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#products"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="#why"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Why Covenants?
            </Link>
            <Link
              href="#contact"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact us
            </Link>
            <Link
              href="#contact"
              className="block text-sm px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Let us connect!
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

