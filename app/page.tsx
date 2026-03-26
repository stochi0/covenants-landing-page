'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
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
  Users,
  Lightbulb,
  Leaf,
  Handshake,
  Network,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Layers,
  TestTubes,
  FileStack,
  BarChart3,
  Linkedin,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

// WhatsApp icon component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
      <div className="text-base font-semibold text-foreground mt-1">{label}</div>
      <div className="text-sm text-muted-foreground">{sublabel}</div>
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
        <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
        <p className="text-base font-medium text-muted-foreground leading-relaxed">{description}</p>
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
        <h4 className="font-bold text-xl text-foreground mb-1">{title}</h4>
        <p className="text-base font-medium text-muted-foreground leading-relaxed">{description}</p>
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
        <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
        <p className="text-base font-medium text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Accreditation badge: uses imageUrl (web) when provided, else local /accreditations/{slug}.png|.svg, else placeholder
// Image URLs from Wikimedia Commons (public domain / CC where noted)
const ACCREDITATION_IMAGES = [
  { label: 'cGMP/Non GMP', slug: 'cgmp', short: 'GMP', imageUrl: null as string | null },
  { label: 'USFDA', slug: 'usfda', short: 'USFDA', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/U.S._Food_and_Drug_Administration.png' },
  { label: 'State FDA', slug: 'state-fda', short: 'FDA', imageUrl: '/state_fda.jpeg' },
  { label: 'EDQM', slug: 'edqm', short: 'EDQM', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/EDQM_logo.png' },
  { label: 'ISO:9001', slug: 'iso9001', short: 'ISO', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Logo-iso9001.png' },
  { label: 'WHO GMP', slug: 'who-gmp', short: 'WHO', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Logo_of_the_World_Health_Organization.jpg/330px-Logo_of_the_World_Health_Organization.jpg' },
] as const

const CHEMICAL_REACTIONS = [
  'Alkylation',
  'Cyclization',
  'Chiral Chemistry',
  'Grignard',
  'Amination',
  'Diazotization',
  'Chlorosulfonation',
  'Hoffman',
  'Nitration',
  'Esterification',
  'Birch Reduction',
  'Cyanation',
  'Oxidation',
  'Fluorination',
  'Iodine Chemistry',
  'Chlorination',
  'Cryogenic',
  'Friedel-Crafts',
  'Lyophilisation',
  'Bromination',
  'Reduction',
  'Sulphonation',
  'Thiophosgenation',
  'Sand Meyer',
  'Column Chromatography',
  'Heterocyclic Synthesis',
  'High Vacuum Distillation',
  'Hydrogenation',
] as const

type DbStats = {
  networkPartners: number
  products: number
  chemistries: number
}

function AccreditationPlaceholder({ short }: { short: string }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-primary/30 bg-primary/5 flex items-center justify-center shrink-0">
      <span className="text-xs font-semibold tracking-wide text-primary/80 uppercase">{short}</span>
    </div>
  )
}

// cGMP certification seal (no standard logo available; use inline SVG so it's always visible)
function CgmpBadge() {
  return (
    <svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-primary"
      aria-hidden
    >
      <circle cx="28" cy="28" r="26" className="stroke-primary/40 fill-primary/10" strokeWidth="2" />
      <circle cx="28" cy="28" r="22" className="stroke-primary/30" strokeWidth="1" fill="none" />
      <text x="28" y="26" textAnchor="middle" className="fill-primary" style={{ fontFamily: 'system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>cGMP</text>
      <text x="28" y="38" textAnchor="middle" className="fill-primary/80" style={{ fontFamily: 'system-ui, sans-serif', fontSize: 7, fontWeight: 600, letterSpacing: '0.02em' }}>QUALITY</text>
    </svg>
  )
}

// Logo-only block; collage variant = soft shadow, no box border, for collage layout
function AccreditationLogo({ label, slug, short, imageUrl, collage = false }: { label: string; slug: string; short: string; imageUrl: string | null; collage?: boolean }) {
  const [remoteFailed, setRemoteFailed] = useState(false)
  const [useSvg, setUseSvg] = useState(false)
  const [localFailed, setLocalFailed] = useState(false)
  const localSrc = useSvg ? `/accreditations/${slug}.svg` : `/accreditations/${slug}.png`
  const handleLocalError = () => {
    if (!useSvg) setUseSvg(true)
    else setLocalFailed(true)
  }
  const useRemote = Boolean(imageUrl) && !remoteFailed
  const showPlaceholder = (imageUrl && remoteFailed) || (!imageUrl && slug !== 'cgmp' && localFailed)
  const showCgmpBadge = !imageUrl && slug === 'cgmp' && !localFailed

  const sizeClass = collage ? 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28' : 'w-16 h-16 md:w-20 md:h-20'
  const imgSize = collage ? 112 : 72
  const styleClass = collage
    ? 'rounded-2xl border border-border/90 bg-card/95 shadow-lg flex items-center justify-center shrink-0 p-2 transition-all duration-200 hover:shadow-xl hover:scale-105 [&>*]:max-w-full [&>*]:max-h-full [&>*]:object-contain'
    : 'rounded-xl border border-border bg-muted/20 flex items-center justify-center shrink-0 p-2 transition-colors duration-200 hover:border-primary/25 hover:bg-muted/40 [&>*]:max-w-full [&>*]:max-h-full [&>*]:object-contain'

  return (
    <div className={`${sizeClass} ${styleClass}`} title={label}>
      {showCgmpBadge ? (
        <span className="flex items-center justify-center w-full h-full [&>svg]:w-14 [&>svg]:h-14 sm:[&>svg]:w-16 sm:[&>svg]:h-16 md:[&>svg]:w-20 md:[&>svg]:h-20">
          <CgmpBadge />
        </span>
      ) : showPlaceholder ? (
        <span className="flex items-center justify-center w-full h-full [&>div]:w-12 [&>div]:h-12 [&>div]:text-xs sm:[&>div]:w-14 sm:[&>div]:h-14 md:[&>div]:w-16 md:[&>div]:h-16 md:[&>div]:text-sm">
          <AccreditationPlaceholder short={short} />
        </span>
      ) : useRemote && imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          width={imgSize}
          height={imgSize}
          className="object-contain w-full h-full"
          onError={() => setRemoteFailed(true)}
          unoptimized
        />
      ) : !imageUrl && slug !== 'cgmp' ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={localSrc}
          alt=""
          width={imgSize}
          height={imgSize}
          className="object-contain w-full h-full"
          onError={handleLocalError}
        />
      ) : null}
    </div>
  )
}

// Name-only card (no image) — accreditations list
function AccreditationNameCard({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-4 px-5 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/20 transition-colors duration-200 min-h-[56px]">
      <p className="text-base font-semibold text-foreground text-center leading-tight">{label}</p>
    </div>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    company: '',
    phone: '',
    lookingFor: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [dbStats, setDbStats] = useState<DbStats | null>(null)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      try {
        const res = await fetch('/api/stats')
        if (!res.ok) return
        const data = (await res.json()) as DbStats
        if (!cancelled) setDbStats(data)
      } catch {
        // Best-effort. Keep fallback UI values if request fails.
      }
    }

    loadStats()
    return () => {
      cancelled = true
    }
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        throw new Error(data.error || 'Failed to submit form')
      }

      // Success
      setSubmitStatus('success')
      setSubmitMessage('Thank you for your interest! We will connect with you soon.')

      // Reset form
      setFormData({
        name: '',
        email: '',
        country: '',
        company: '',
        phone: '',
        lookingFor: '',
        message: '',
      })

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

      <Header currentPage="home" onNavigate={scrollToSection} />

      {/* Main Content */}
      <main className="relative z-10 pt-[73px]">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
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
              {/* Lab Image with Overlay */}
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
                    <StatCard
                      value={dbStats ? `${dbStats.networkPartners}+` : '—'}
                      label="Network Partners"
                      sublabel="Trusted partner network"
                      delay={100}
                    />
                    <StatCard value="7500+" label="KL Capacity" sublabel="Network manufacturing capacity" delay={200} />
                    <StatCard
                      value={dbStats ? `${dbStats.products}+` : '—'}
                      label="Products"
                      sublabel="Across key offerings"
                      delay={300}
                    />
                    <StatCard
                      value={dbStats ? `${dbStats.chemistries}+` : '—'}
                      label="Chemistries"
                      sublabel="Diverse chemistry capabilities"
                      delay={400}
                    />
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-lg font-semibold mb-4">
                <Network className="w-4 h-4" />
                <span>Network partners capacity & capability</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Services Through Network Partners
              </h2>
              <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
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
            <Card className="border-border/50 bg-card overflow-hidden mb-12">
              <CardContent className="p-8">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Offerings</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xl">
                      <Cog className="w-5 h-5" />
                      <span>Manufacturing & Development</span>
                    </div>
                    <ul className="space-y-2 text-base font-medium text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Contract Manufacturing</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Product Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Process Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Scale up & Tech Transfer</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xl">
                      <Layers className="w-5 h-5" />
                      <span>Research & Analytics</span>
                    </div>
                    <ul className="space-y-2 text-base font-medium text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Analytical Method Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Impurity Synthesis</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Stability Studies</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Reference Standards Preparation</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xl">
                      <BarChart3 className="w-5 h-5" />
                      <span>Analytical Capabilities</span>
                    </div>
                    <ul className="space-y-2 text-base font-medium text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />HPLC / GC Analysis</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />LCMS Analysis</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Method Development</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Full Time Equivalent</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold text-xl">
                      <Factory className="w-5 h-5" />
                      <span>Manufacturing Products</span>
                    </div>
                    <ul className="space-y-2 text-base font-medium text-muted-foreground">
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Custom Synthesis Compounds</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Key Starting Materials</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />Intermediates</li>
                      <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-accent" />APIs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Capabilities */}
            <div className="space-y-16">
              {/* Facility Accreditations — images (representation) + name cards separate */}
              <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
                <CardContent className="px-8 pt-4 pb-8 md:px-10 md:pt-5 md:pb-10">
                  <p className="text-base font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-1">
                    Facility Accreditations
                  </p>
                  <h4 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-0.5 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary/80" />
                    Certified excellence
                  </h4>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-4 max-w-xl">
                    Our promise to uphold the highest standards of operational excellence and patient care
                  </p>

                  {/* Vertical split: names left, symmetric logo grid right */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                    <div>
                      <p className="text-sm font-medium tracking-widest text-muted-foreground/90 uppercase mb-4">
                        Our accreditations
                      </p>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {ACCREDITATION_IMAGES.map(({ label, slug }) => (
                          <AccreditationNameCard key={slug} label={label} />
                        ))}
                      </div>
                    </div>
                    {/* Symmetric 2×3 grid of logos matching name cards layout */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 place-items-center w-full max-w-md mx-auto">
                      {ACCREDITATION_IMAGES.map(({ label, slug, short, imageUrl }) => (
                        <div key={slug} className="flex justify-center items-center w-full aspect-square max-w-[130px] md:max-w-[150px]">
                          <AccreditationLogo label={label} slug={slug} short={short} imageUrl={imageUrl} collage />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Chemical Reactions Capabilities — old money elegant */}
              <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm relative">
                <div className="absolute inset-0 bg-mesh-gradient opacity-[0.45] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.05] pointer-events-none" />
                <CardContent className="p-8 md:p-10 relative">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
                    <div>
                      <p className="text-base font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">
                        Chemical Reactions Capabilities
                      </p>
                      <h4 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-1 flex items-center gap-2">
                        <TestTubes className="w-5 h-5 text-primary/80" />
                        Diverse reaction expertise
                      </h4>
                      <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-xl">
                        Custom synthesis and scale-up across a broad range of chemistries
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {CHEMICAL_REACTIONS.map((reaction) => (
                      <span
                        key={reaction}
                        className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/55 px-4 py-2 text-sm font-semibold text-foreground/90 shadow-sm shadow-primary/5 backdrop-blur-sm transition-all duration-200 hover:bg-background/80 hover:border-primary/25 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-70 group-hover:opacity-100" />
                        <span className="truncate">{reaction}</span>
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </div>
        </section>

        {/* SCM Services Section */}
        <section id="scm" className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-lg font-semibold mb-4">
                  <Truck className="w-4 h-4" />
                  <span>Supply chain services</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                  SCM Services
                </h2>
                <p className="text-lg md:text-xl font-medium text-muted-foreground mb-8">
                  Our unparalleled functional expertise in end to end Supply Chain Management—tailored to help you optimize cost, mitigate risk, and execute reliably.
                </p>

                <div className="space-y-6">
                  <FeatureCard
                    icon={<SearchIcon className="w-5 h-5" />}
                    title="Strategic Sourcing & Procurement"
                    description="Risk mitigation, alternate vendor development, cost reduction for Direct, Capex and Indirect Procurement"
                    delay={100}
                  />
                  <FeatureCard
                    icon={<BarChart3 className="w-5 h-5" />}
                    title="Planning & Inventory Management"
                    description="Effective capacity utilization, Optimized inventory, delivery improvement, improved customer satisfaction"
                    delay={200}
                  />
                  <FeatureCard
                    icon={<Zap className="w-5 h-5" />}
                    title="Digital Transformation"
                    description="Transform supply chain with AI & digital tools, improving efficiency, visibility, and control."
                    delay={300}
                  />
                  <FeatureCard
                    icon={<Leaf className="w-5 h-5" />}
                    title="ESG Capabilities (Sustainability)"
                    description="ESG transformation, Sustainable procurement roadmap, Mapping customer expectations, ESG ratings"
                    delay={400}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* SCM Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-48">
                  <Image
                    src="/scm_support.png"
                    alt="SCM support dashboard on tablet"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <FileStack className="w-5 h-5 text-primary mb-1.5" />
                        <p className="text-base font-semibold text-foreground">Planning Process Implementation</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <Leaf className="w-5 h-5 text-accent mb-1.5" />
                        <p className="text-base font-semibold text-foreground">ESG</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <Zap className="w-5 h-5 text-primary mb-1.5" />
                        <p className="text-base font-semibold text-foreground">SCM Digital Transformation</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background border border-border/50">
                        <Users className="w-5 h-5 text-accent mb-1.5" />
                        <p className="text-base font-semibold text-foreground">SCM Shared Services</p>
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
                  src="/equipment.png"
                  alt="Pharmaceutical production"
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
                  src="/drums.png"
                  alt="Chemical compounds"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-lg font-semibold mb-4">
                <Package className="w-4 h-4" />
                <span>Product offerings</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                APIs, Intermediates & Specialty Chemicals
              </h2>
              <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
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


        <section id="why-covenants" className="relative bg-muted/30 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Why Covenants?
              </h2>
              <p className="text-lg font-medium text-muted-foreground max-w-3xl mx-auto">
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
                    <h3 className="font-bold text-xl text-foreground">Trusted Supply Chain Partner</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
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
                    <h3 className="font-bold text-xl text-foreground">Innovative, Tailored Solutions</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
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
                    <h3 className="font-bold text-xl text-foreground">Value for All Stakeholders</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
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
                    <h3 className="font-bold text-xl text-foreground">Network-led Execution</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
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
                    <h3 className="font-bold text-xl text-foreground">Expertise + Technology</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
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
                    <h3 className="font-bold text-xl text-foreground">Sustainable Growth</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
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
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Let&apos;s Connect!
              </h2>
              <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
                Share what you&apos;re looking for—services, products, or SCM support—and we&apos;ll connect you with the right solution through our network.
              </p>
            </div>

            {/* Contact Form */}
            <Card className="border-muted-foreground/20 shadow-sm bg-card max-w-2xl mx-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl font-bold">Partner With Us</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-base font-semibold text-foreground">Name*</label>
                      <Input
                        className="border-muted-foreground/30"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-base font-semibold text-foreground">Work Email*</label>
                      <Input
                        className="border-muted-foreground/30"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-base font-semibold text-foreground">Country*</label>
                      <Input
                        className="border-muted-foreground/30"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                        placeholder="Your country"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-base font-semibold text-foreground">Company Name*</label>
                      <Input
                        className="border-muted-foreground/30"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                        placeholder="Company name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-base font-semibold text-foreground">Phone Number*</label>
                      <Input
                        className="border-muted-foreground/30"
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="+91 00000 00000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lookingFor" className="text-base font-semibold text-foreground">Looking For</label>
                      <select
                        id="lookingFor"
                        name="lookingFor"
                        value={formData.lookingFor}
                        onChange={handleFormChange}
                        className="flex h-10 w-full rounded-md border border-muted-foreground/30 bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select an option</option>
                        <option value="custom-manufacturing">Custom Manufacturing</option>
                        <option value="custom-research">Custom Research</option>
                        <option value="products">Products (API/Intermediates)</option>
                        <option value="scm-services">SCM Services</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-base font-semibold text-foreground">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="flex min-h-[80px] w-full rounded-md border border-muted-foreground/30 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
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
                      <p className="text-base font-semibold">{submitMessage}</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-base font-semibold">{submitMessage}</p>
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
                <h3 className="font-bold text-lg text-foreground">Covenants PharmaChem LLP</h3>
              </div>
              <p className="text-base font-medium text-muted-foreground mb-4">
                Expanding horizons in APIs, intermediates & specialty chemicals—powered by our network, expertise and technology.
              </p>
              <div className="space-y-2.5 text-base font-medium text-muted-foreground">
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
                <h4 className="font-bold text-foreground mb-4">Company</h4>
                <ul className="space-y-2.5 text-base font-medium text-muted-foreground">
                  <li>
                    <a href="/about" className="hover:text-foreground transition-colors text-left">
                      About Us
                    </a>
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
                <h4 className="font-bold text-foreground mb-4">Services</h4>
                <ul className="space-y-2.5 text-base font-medium text-muted-foreground">
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
                <h4 className="font-bold text-foreground mb-4">Products</h4>
                <ul className="space-y-2.5 text-base font-medium text-muted-foreground">
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
            <p className="text-base font-medium text-muted-foreground">
              © 2026 Covenants PharmaChem LLP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => scrollToSection('contact')} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
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
    </div>
  )
}

