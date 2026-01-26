'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ProductSearch } from '@/components/product-search'
import {
  FlaskConical,
  ArrowRight,
  Factory,
  Beaker,
  Package,
  Truck,
  Search as SearchIcon,
  ShieldCheck,
  Cog,
  Zap,
  Globe,
  Users,
  Lightbulb,
  Leaf,
  Handshake,
  Network,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Layers,
  TestTubes,
  FileStack,
  BarChart3,
  Menu,
  X,
  Linkedin,
  Sparkles,
  Search,
  Loader2,
  CheckCircle,
  AlertCircle,
  Building2,
  User,
} from 'lucide-react'
import { contactFormSchema } from '@/lib/validation'
import { countries } from '@/lib/countries'

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

interface StatCardProps {
  value: string
  label: string
  sublabel: string
  delay?: number
}

function StatCard({ value, label, sublabel, delay = 0 }: StatCardProps) {
  return (
    <div 
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary font-mono tracking-tight">{value}</div>
      <div className="text-sm font-semibold text-foreground mt-1">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

function ServiceCard({ icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card animate-fade-in-up cursor-pointer relative overflow-hidden"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <CardContent className="p-6 relative">
        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className="flex items-start gap-4 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="p-2.5 rounded-lg bg-accent/10 text-accent shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

interface ProductCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

function ProductCategory({ icon, title, description, delay = 0 }: ProductCategoryProps) {
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card animate-fade-in-up overflow-hidden relative"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 flex flex-col items-center text-center relative">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [offeringsOpen, setOfferingsOpen] = useState(false)
  const [mobileOfferingsOpen, setMobileOfferingsOpen] = useState(false)
  const [productSearchOpen, setProductSearchOpen] = useState(false)
  const offeringsRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    countryCode: '',
    city: '',
    company: '',
    phone: '',
    lookingFor: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  // Close dropdown when clicking outside
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
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
    setOfferingsOpen(false)
    setMobileOfferingsOpen(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find((c) => c.name === e.target.value)
    setFormData((prev) => ({
      ...prev,
      country: e.target.value,
      countryCode: selectedCountry?.code || '',
    }))
    
    // Clear error for country when user selects
    if (formErrors.country) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.country
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData)
    
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          const field = err.path[0] as string
          errors[field] = err.message
        }
      })
      setFormErrors(errors)
      return false
    }
    
    setFormErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus('error')
      setSubmitMessage('Please fix the errors in the form before submitting.')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        // If there are validation errors from server, try to map them to form fields
        if (data.details && typeof data.details === 'string') {
          // Check if it's about missing fields
          if (data.details.includes('required')) {
            const fieldMap: Record<string, string> = {}
            const missingFields = data.details.match(/name|email|company|phone|country|city/g)
            if (missingFields) {
              missingFields.forEach((field: string) => {
                fieldMap[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
              })
              setFormErrors(fieldMap)
            }
          }
        }
        throw new Error(data.error || data.details || 'Failed to submit form')
      }

      // Success
      setSubmitStatus('success')
      setSubmitMessage('Thank you for your interest! We will connect with you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        country: '',
        countryCode: '',
        city: '',
        company: '',
        phone: '',
        lookingFor: '',
        message: '',
      })
      setFormErrors({})

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitMessage('')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again later.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Go to home"
              >
                <Image 
                  src="/covenants-logo.png" 
                  alt="Covenants Logo" 
                  width={140} 
                  height={56} 
                  className="h-14 w-auto object-contain"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Our Offerings Mega Menu */}
              <div ref={offeringsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOfferingsOpen(!offeringsOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    offeringsOpen 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Our Offerings
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${offeringsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mega Menu Dropdown */}
                {offeringsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[580px] bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in-up z-50">
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Services Column */}
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
                        
                        {/* Products Column */}
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
                      
                      {/* Bottom CTA */}
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

              {/* Products Search Button */}
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
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 hover:from-primary/20 hover:via-accent/20 hover:to-primary/20 rounded-lg transition-all duration-200 border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md"
              >
                <Globe className="w-4 h-4" />
                Capillia
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                About Us
              </button>
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
              
              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 space-y-1 border-t border-border pt-4">
              {/* Our Offerings Accordion */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setMobileOfferingsOpen(!mobileOfferingsOpen)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    mobileOfferingsOpen
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
                    {/* Services Section */}
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
                    
                    {/* Products Section */}
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

              {/* Products Search Button - Mobile */}
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
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-primary bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 hover:from-primary/20 hover:via-accent/20 hover:to-primary/20 rounded-lg transition-all duration-200 border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Capillia
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                About Us
              </button>
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

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-6 pb-16 md:pt-8 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <FlaskConical className="w-4 h-4" />
                <span>Covenants PharmaChem LLP</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                Expanding Horizons in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  APIs, Intermediates & Specialty Chemicals
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Covenants promises to become your trusted supply chain partner. We strive to exceed expectations through innovative, tailored solutions—creating value for all our stakeholders by leveraging our network, expertise and technology to drive sustainable growth.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" onClick={() => scrollToSection('contact')}>
                  Let&apos;s Connect
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('products')}>
                  Explore Offerings
                </Button>
              </div>
            </div>

            {/* Hero Image & Stats */}
            <div className="relative">
              {/* Manufacturing Image with Overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80" 
                  alt="Pharmaceutical and chemical manufacturing machinery and equipment" 
                  width={800}
                  height={320}
                  className="w-full h-[320px] object-cover opacity-40"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard value="121+" label="Network Partners" sublabel="Trusted partner network" delay={100} />
                    <StatCard value="7500+" label="KL Capacity" sublabel="Network manufacturing capacity" delay={200} />
                    <StatCard value="3500+" label="Products" sublabel="Across key offerings" delay={300} />
                    <StatCard value="20+" label="Chemical Reactions" sublabel="Diverse reaction capabilities" delay={400} />
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </section>

        {/* Network Partners Section */}
        <section id="services" className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-[0.03]">
            <Image 
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920&q=80" 
              alt="" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Network className="w-4 h-4" />
                <span>Network partners capacity & capability</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Services Through Network Partners
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Access the right capabilities faster through our network—covering custom manufacturing, custom research, and product sourcing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <ServiceCard 
                icon={<Factory className="w-6 h-6" />}
                title="Custom Manufacturing"
                description="Contract manufacturing support through our partner network."
                delay={100}
              />
              <ServiceCard 
                icon={<Beaker className="w-6 h-6" />}
                title="Custom Research"
                description="R&D services including methods and impurity synthesis."
                delay={200}
              />
              <ServiceCard 
                icon={<Package className="w-6 h-6" />}
                title="Products"
                description="APIs, intermediates, specialty chemicals and impurities."
                delay={300}
              />
              <ServiceCard 
                icon={<Truck className="w-6 h-6" />}
                title="SCM Services"
                description="End-to-end supply chain services tailored to your needs."
                delay={400}
              />
            </div>

            {/* Our Offerings Detail */}
            <Card className="border-border/50 bg-card overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Our Offerings</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Cog className="w-5 h-5" />
                      <span>Manufacturing & Development</span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Contract Manufacturing</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Product Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Process Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Scale up & Tech Transfer</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Layers className="w-5 h-5" />
                      <span>Also Includes</span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Analytical Method Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Impurity Synthesis</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Full Time Equivalent</li>
                    </ul>
                  </div>
                  <div className="space-y-4 lg:col-span-2">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <TestTubes className="w-5 h-5" />
                      <span>Focus Areas</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">Custom Manufacturing</span>
                      <span className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">Custom Research</span>
                      <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">Products</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SCM Services Section */}
        <section id="scm" className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Truck className="w-4 h-4" />
                  <span>Supply chain services</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                  SCM Services
                </h2>
                <p className="text-muted-foreground mb-8">
                  End to End Supply Chain Services—tailored to help you optimize cost, mitigate risk, and execute reliably.
                </p>
                
                <div className="space-y-6">
                  <FeatureCard 
                    icon={<SearchIcon className="w-5 h-5" />}
                    title="Sourcing"
                    description="Supplier discovery and sourcing support through our network."
                    delay={100}
                  />
                  <FeatureCard 
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="Procurement Cost Optimization"
                    description="Identify savings opportunities across procurement workflows."
                    delay={200}
                  />
                  <FeatureCard 
                    icon={<ShieldCheck className="w-5 h-5" />}
                    title="Risk Mitigation"
                    description="Reduce supply risks through proactive planning and execution."
                    delay={300}
                  />
                  <FeatureCard 
                    icon={<Zap className="w-5 h-5" />}
                    title="Digital Transformation"
                    description="Enable better visibility and execution across the supply chain."
                    delay={400}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* SCM Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-48">
                  <Image 
                    src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&q=80" 
                    alt="Pharmaceutical manufacturing facility" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                
                <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-4">Additional SCM Support</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <FileStack className="w-5 h-5 text-primary mb-1.5" />
                        <p className="text-xs font-medium text-foreground">Planning Process Implementation</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <Leaf className="w-5 h-5 text-accent mb-1.5" />
                        <p className="text-xs font-medium text-foreground">ESG</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <Globe className="w-5 h-5 text-primary mb-1.5" />
                        <p className="text-xs font-medium text-foreground">Foreign Trade</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <Users className="w-5 h-5 text-accent mb-1.5" />
                        <p className="text-xs font-medium text-foreground">SCM Shared Services</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" onClick={() => scrollToSection('contact')}>
                      Let&apos;s Connect
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="relative bg-muted/30 py-16 md:py-24 overflow-hidden">
          {/* Background Image Pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <Image 
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1920&q=80" 
              alt="" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            {/* Product Images Row */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&q=80" 
                  alt="Chemical compounds" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-accent/20 -mt-4 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&q=80" 
                  alt="Lab equipment" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 relative">
                <Image 
                  src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&q=80" 
                  alt="Pharmaceutical production" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Package className="w-4 h-4" />
                <span>Product offerings</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                APIs, Intermediates & Specialty Chemicals
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our core product offerings across APIs, intermediates, specialty chemicals, and impurities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <ProductCategory 
                icon={<FlaskConical className="w-8 h-8" />}
                title="API"
                description="Active Pharmaceutical Ingredients (API)"
                delay={100}
              />
              <ProductCategory 
                icon={<Beaker className="w-8 h-8" />}
                title="Intermediate"
                description="Key synthesis intermediates across multiple routes"
                delay={200}
              />
              <ProductCategory 
                icon={<TestTubes className="w-8 h-8" />}
                title="Specialty Chemicals"
                description="Specialty chemicals for diverse applications"
                delay={300}
              />
              <ProductCategory 
                icon={<Layers className="w-8 h-8" />}
                title="Impurities"
                description="Impurities and related offerings"
                delay={400}
              />
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={() => scrollToSection('contact')}>
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('contact')}>
                Ask About Availability
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* About Header with Image */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                  About Us
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We are a team of passionate professionals committed to creating value for all stakeholders. By leveraging our extensive network, deep expertise, and cutting-edge technology, we drive sustainable growth and innovation.
                </p>
              </div>
              
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl relative h-64">
                  <Image 
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80" 
                    alt="Scientific research and development" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply" />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-2xl -z-10" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Network className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Network</h3>
                  <p className="text-sm text-muted-foreground">
                    We leverage an extensive network of partners to deliver capacity and capability where you need it.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-accent/10 text-accent w-fit mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Expertise</h3>
                  <p className="text-sm text-muted-foreground">
                    A team of passionate professionals committed to creating value for all stakeholders.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Technology</h3>
                  <p className="text-sm text-muted-foreground">
                    Cutting-edge technology to drive efficiency, visibility, and reliable execution.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-accent/10 text-accent w-fit mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Sustainable Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    We drive sustainable growth through innovative, tailored solutions across the supply chain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Covenants Section */}
        <section id="why-covenants" className="relative bg-muted/30 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Why Covenants?
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                We strive to exceed expectations through innovative, tailored solutions—creating value for all our stakeholders by leveraging our network, expertise and technology to drive sustainable growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Handshake className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Trusted Supply Chain Partner</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Covenants promises to become your trusted supply chain partner—focused on long-term relationships.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Innovative, Tailored Solutions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We strive to exceed expectations through innovative, tailored solutions for your needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Value for All Stakeholders</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We are committed to creating value for customers, partners, and the broader ecosystem.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                      <Network className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Network-led Execution</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leverage our network partners for capacity and capability across manufacturing and research.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Expertise + Technology</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Deep expertise combined with cutting-edge technology to drive reliable outcomes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">Sustainable Growth</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We drive sustainable growth by improving resilience, transparency, and execution quality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920&q=80" 
              alt="" 
              fill
              className="object-cover opacity-[0.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Let&apos;s Connect!
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Share what you&apos;re looking for—services, products, or SCM support—and we&apos;ll connect you with the right solution through our network.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Services Through Network Partners</h3>
                  <p className="text-sm text-muted-foreground">
                    Contract manufacturing, development, scale-up, analytics, impurity synthesis, and FTE support.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mx-auto mb-4">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">SCM Services</h3>
                  <p className="text-sm text-muted-foreground">
                    End to End Supply Chain Services tailored to your business needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mx-auto mb-4">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Product Offerings</h3>
                  <p className="text-sm text-muted-foreground">
                    API, Intermediate, Specialty chemicals, and Impurities.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-border/50 bg-card max-w-2xl mx-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <CardHeader className="relative">
                <CardTitle className="text-xl">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        Full Name*
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        required
                        className={formErrors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        Work Email*
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="you@company.com"
                        required
                        className={formErrors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                        required
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          formErrors.country ? 'border-destructive focus-visible:ring-destructive' : ''
                        }`}
                      >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                          <option key={country.name} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {formErrors.country && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.country}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        City*
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        placeholder="City"
                        required
                        className={formErrors.city ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {formErrors.city && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                        Company Name*
                      </label>
                      <Input 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        placeholder="Company name"
                        required
                        className={formErrors.company ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {formErrors.company && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.company}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        Phone Number*
                      </label>
                      <div className="flex items-center gap-2">
                        {formData.countryCode && (
                          <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted text-sm text-muted-foreground shrink-0">
                            {formData.countryCode}
                          </div>
                        )}
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder={formData.countryCode ? "1234567890" : "Select country first"}
                          required
                          disabled={!formData.countryCode}
                          className={`flex-1 ${formErrors.phone ? 'border-destructive focus-visible:ring-destructive' : ''} ${!formData.countryCode ? 'cursor-not-allowed opacity-60' : ''}`}
                        />
                      </div>
                      {!formData.countryCode && !formErrors.phone && (
                        <p className="text-xs text-muted-foreground">
                          Please select a country above to enter your phone number
                        </p>
                      )}
                      {formErrors.phone && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="lookingFor" className="text-sm font-medium text-foreground">Looking For</label>
                      <select 
                        id="lookingFor"
                        name="lookingFor"
                        value={formData.lookingFor}
                        onChange={handleFormChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select an option</option>
                        <option value="custom-manufacturing">Custom Manufacturing</option>
                        <option value="custom-research">Custom Research</option>
                        <option value="products">Products (eg. API, Intermediates, Specialty Chemicals, Impurities)</option>
                        <option value="scm-services">SCM Services</option>
                        <option value="partnership">Become a Network Partner</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">{submitMessage}</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-medium">{submitMessage}</p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-12 mb-8">
            {/* Company Info - Left Side */}
            <div className="lg:w-[380px] shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-bold text-foreground">Covenants PharmaChem LLP</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expanding horizons in APIs, intermediates & specialty chemicals—powered by our network, expertise and technology.
              </p>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>A-209, Bhaveshwar Arcade, LBS Marg, Ghatkopar (West), Mumbai - 400086, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-primary" />
                  <span>+91 8452008095 / +91 8452008093</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-primary" />
                  <span>info@covenantspc.com</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-4">
                <a 
                  href="https://api.whatsapp.com/send/?phone=918452008095&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/covenants-pharmachem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation Links - Right Side */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Company Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <button type="button" onClick={() => scrollToSection('about')} className="hover:text-foreground transition-colors text-left">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => scrollToSection('why-covenants')} className="hover:text-foreground transition-colors text-left">
                      Why Covenants?
                    </button>
                  </li>
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Services</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <button type="button" onClick={() => scrollToSection('services')} className="hover:text-foreground transition-colors text-left">
                      Services through Network Partners
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => scrollToSection('scm')} className="hover:text-foreground transition-colors text-left">
                      SCM Services
                    </button>
                  </li>
                </ul>
              </div>

              {/* Products Links */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Products</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <button type="button" onClick={() => scrollToSection('products')} className="hover:text-foreground transition-colors text-left">
                      API
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => scrollToSection('products')} className="hover:text-foreground transition-colors text-left">
                      Intermediate
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => scrollToSection('products')} className="hover:text-foreground transition-colors text-left">
                      Specialty Chemicals
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => scrollToSection('products')} className="hover:text-foreground transition-colors text-left">
                      Impurities
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Covenants PharmaChem LLP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Let&apos;s Connect!
              </button>
              <span className="hidden md:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <a 
                  href="https://api.whatsapp.com/send/?phone=918452008095&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/covenants-pharmachem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Search Modal */}
      <ProductSearch open={productSearchOpen} onOpenChange={setProductSearchOpen} />
    </div>
  )
}

