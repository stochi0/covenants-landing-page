'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ProductSearch } from '@/components/product-search'
import {
  ArrowRight,
  Package,
  Truck,
  Search as SearchIcon,
  Cog,
  Globe,
  Users,
  Lightbulb,
  Network,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Search,
  FlaskConical,
  TestTubes,
} from 'lucide-react'

interface HeaderProps {
  currentPage?: string
  onNavigate?: (section: string) => void
}

export function Header({ currentPage = 'home', onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [offeringsOpen, setOfferingsOpen] = useState(false)
  const [mobileOfferingsOpen, setMobileOfferingsOpen] = useState(false)
  const [productSearchOpen, setProductSearchOpen] = useState(false)
  const offeringsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (offeringsRef.current && !offeringsRef.current.contains(event.target as Node)) {
        setOfferingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate(id)
    } else if (currentPage === 'home') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = `/#${id}`
    }
    setMobileMenuOpen(false)
    setOfferingsOpen(false)
    setMobileOfferingsOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.href = '/'
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={handleLogoClick}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              aria-label="Scroll to top"
            >
              <Image
                src="/covenants-logo.png"
                alt="Covenants Logo"
                width={140}
                height={56}
                className="h-14 w-auto object-contain"
              />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              <div ref={offeringsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOfferingsOpen(!offeringsOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${offeringsOpen
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Our Offerings
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${offeringsOpen ? 'rotate-180' : ''}`} />
                </button>

                {offeringsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[580px] bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in-up z-50">
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-border">
                            <div className="p-1.5 rounded-lg bg-accent/10">
                              <Cog className="w-4 h-4 text-accent" />
                            </div>
                            <span className="font-semibold text-foreground">Services</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => scrollToSection('services')}
                            className="group w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Network className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  Services Through Network Partners
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Custom manufacturing, research & development
                                </p>
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => scrollToSection('scm')}
                            className="group w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                                <Truck className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                                  SCM Services
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  End-to-end supply chain solutions
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b border-border">
                            <div className="p-1.5 rounded-lg bg-primary/10">
                              <Package className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-semibold text-foreground">Products</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => scrollToSection('products')}
                            className="group w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <FlaskConical className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  APIs & Intermediates
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Active pharmaceutical ingredients
                                </p>
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => scrollToSection('products')}
                            className="group w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                                <TestTubes className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                                  Specialty Chemicals & Impurities
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Specialty chemicals for diverse applications
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Can&apos;t find what you need?
                        </p>
                        <Button size="sm" onClick={() => scrollToSection('contact')}>
                          Contact Us
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setProductSearchOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
                Products
              </button>

              <a
                href="https://capillia.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/15 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                Capillia
              </a>
              <Link
                href="/about"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                About Us
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection('why-covenants')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Why Covenants?
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => scrollToSection('contact')}
                className="hidden sm:flex"
              >
                Let&apos;s Connect
                <ArrowRight className="w-4 h-4" />
              </Button>

              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 space-y-1 border-t border-border pt-4">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setMobileOfferingsOpen(!mobileOfferingsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${mobileOfferingsOpen
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Our Offerings
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOfferingsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileOfferingsOpen && (
                  <div className="ml-4 pl-4 border-l-2 border-primary/20 space-y-1 animate-fade-in-up">
                    <div className="pt-2 pb-1">
                      <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Services</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection('services')}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Network className="w-4 h-4 text-primary" />
                      Services Through Network Partners
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('scm')}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4 text-accent" />
                      SCM Services
                    </button>

                    <div className="pt-3 pb-1">
                      <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Products</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection('products')}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FlaskConical className="w-4 h-4 text-primary" />
                      APIs & Intermediates
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('products')}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
                    >
                      <TestTubes className="w-4 h-4 text-accent" />
                      Specialty Chemicals & Impurities
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setProductSearchOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Products
              </button>

              <a
                href="https://capillia.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="block w-full text-left px-4 py-2 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/15 rounded-lg transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Capillia
              </a>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${currentPage === 'about'
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Users className="w-4 h-4" />
                About Us
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection('why-covenants')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Why Covenants?
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full mt-2"
              >
                Let&apos;s Connect
                <ArrowRight className="w-4 h-4" />
              </Button>
            </nav>
          )}
        </div>
      </header>

      <ProductSearch open={productSearchOpen} onOpenChange={setProductSearchOpen} />
    </>
  )
}
