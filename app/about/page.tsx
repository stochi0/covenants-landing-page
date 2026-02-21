'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import {
  Users,
  Lightbulb,
  Handshake,
  Network,
  Leaf,
  ChevronRight,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />

      <Header currentPage="about" />

      <main className="relative z-10 pt-[73px]">
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                  About Us
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Mission</h3>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                      To become trusted supply chain partner and strive to exceed expectations through innovative & tailored solutions. We create value for all stakeholders by leveraging our network, expertise and technology to drive sustainable growth.
                    </p>
                  </div>
                </div>
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
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-2xl -z-10" />
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2 text-center">Co-Founders</h3>
              <p className="text-center text-lg font-medium text-muted-foreground mb-8">Leverage 5 decades of expertise in End to End Supply Chain Management</p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/50 bg-card">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border/50 shrink-0">
                        <Image
                          src="/alpesh_mehta.jpeg"
                          alt="Alpesh Mehta, Co-founder"
                          fill
                          className="object-cover object-top"
                          sizes="128px"
                        />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground mb-4">Alpesh Mehta, Co-founder</h4>
                    <ul className="space-y-2 text-base font-medium text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Over 20 years in the Pharmaceuticals Industry Supply Chain Management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Expertise in Planning, Procurement, Outsourcing, Logistics, Commercials, and Project Management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Proven track record of leveraging supply chain as a competitive advantage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Extensive experience managing end-to-end supply chains for various Indian and Multinational Pharma companies like Cadila, Mylan, Piramal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Managed critical CDMO and CRO projects for global customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>B.E. Chemical from DDIT, Nadiad and PGDBA from NMIMS, Mumbai</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Certified Project Management Professional</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border/50 shrink-0">
                        <Image
                          src="/vivek_bodade.jpeg"
                          alt="Vivek Bodade, Co-founder"
                          fill
                          className="object-cover object-top"
                          sizes="128px"
                        />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-foreground mb-4">Vivek Bodade, Co-founder</h4>
                    <ul className="space-y-2 text-base font-medium text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Over 20 years of experience in Supply Chain Management, Digital Transformation & driving international projects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Expertise in Global Sourcing, Procurement, Contract Management, Vendor Development, Capex, Opex, and Indirect procurement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Proven track record in driving Global Procurement initiatives and achieving Cost Optimization through E-Procurement, category management etc.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Diverse sector experience: Pharma, Chemical, Biotech, Biosimilar, Healthcare, FMCG, and Hospital</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>Worked with notable companies including Atul, Cadila Pharma, Wockhardt, Glenmark, Laurus Labs, Piramal, and Perfetti van Melle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>B.E. Mechanical from Amravati University and MBA in Materials & Logistics and Marketing from the University of Pune</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">Explore and Seize Opportunities</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
                    Leverage the available capacities, capabilities, and talent within India&apos;s pharmaceutical manufacturing, research & development ecosystem to address latent opportunities, solve complex technical or technological problems, and serve global customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">Value Creation for Stakeholders</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
                    Delivering exceptional value for customers and network partners by providing products and services at competitive prices, with on-time delivery, and unmatched quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <Handshake className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-xl text-foreground">Drive Strategic Growth</h3>
                  </div>
                  <p className="text-base font-medium text-muted-foreground">
                    Initiate and cultivate strategic partnerships that underscore value creation, accelerate growth, and enhance global competitiveness, all while making a significant societal impact through sustainable practices.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Network className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">Network</h3>
                  <p className="text-base font-medium text-muted-foreground">
                    We leverage an extensive network of partners to deliver capacity and capability where you need it.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-accent/10 text-accent w-fit mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">Expertise</h3>
                  <p className="text-base font-medium text-muted-foreground">
                    A team of passionate professionals committed to creating value for all stakeholders.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">Technology</h3>
                  <p className="text-base font-medium text-muted-foreground">
                    Cutting-edge technology to drive efficiency, visibility, and reliable execution.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-2xl bg-accent/10 text-accent w-fit mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2">Sustainable Growth</h3>
                  <p className="text-base font-medium text-muted-foreground">
                    We drive sustainable growth through innovative, tailored solutions across the supply chain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-base font-medium text-muted-foreground">
              © 2026 Covenants PharmaChem LLP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/#contact" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="/#contact" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Let&apos;s Connect!
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
