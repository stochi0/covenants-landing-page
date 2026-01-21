import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
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
  Mail,
  Phone,
  MapPin,
  Layers,
  TestTubes,
  FileStack,
  BarChart3,
  Menu,
  X,
} from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  sublabel: string;
  delay?: number;
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
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function ServiceCard({ icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card animate-fade-in-up cursor-pointer"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <CardContent className="p-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
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
  );
}

interface ProductCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function ProductCategory({ icon, title, description, delay = 0 }: ProductCategoryProps) {
  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    company: '',
    phone: '',
    lookingFor: '',
    message: '',
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will connect with you soon.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse-soft" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">Covenants</h1>
                <p className="text-xs text-muted-foreground">PharmaChem LLP</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('scm')}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                SCM Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('products')}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('why-covenants')}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Why Covenants?
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="hidden sm:flex"
              >
                Let's Connect
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
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('scm')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                SCM Services
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('products')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('why-covenants')}
                className="w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Why Covenants?
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full mt-2"
              >
                Let's Connect
                <ArrowRight className="w-4 h-4" />
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
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
                  Let's Connect
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
                <img 
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80" 
                  alt="Pharmaceutical laboratory with glassware" 
                  className="w-full h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard value="100+" label="Network Partners" sublabel="Trusted partner network" delay={100} />
                    <StatCard value="6000+" label="KL Capacity" sublabel="Network manufacturing capacity" delay={200} />
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
            <img 
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920&q=80" 
              alt="" 
              className="w-full h-full object-cover"
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
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&q=80" 
                    alt="Pharmaceutical manufacturing facility" 
                    className="w-full h-48 object-cover"
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
                      Let's Connect
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
            <img 
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1920&q=80" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            {/* Product Images Row */}
            <div className="flex justify-center gap-4 mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
                <img 
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&q=80" 
                  alt="Chemical compounds" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-accent/20 -mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&q=80" 
                  alt="Lab equipment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
                <img 
                  src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&q=80" 
                  alt="Pharmaceutical production" 
                  className="w-full h-full object-cover"
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
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80" 
                    alt="Scientific research and development" 
                    className="w-full h-64 object-cover"
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
            <img 
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1920&q=80" 
              alt="" 
              className="w-full h-full object-cover opacity-[0.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Let's Connect!
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Share what you're looking for—services, products, or SCM support—and we'll connect you with the right solution through our network.
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
            <Card className="border-border/50 bg-card max-w-2xl mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <CardHeader className="relative">
                <CardTitle className="text-xl">Partner With Us</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">Name*</label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email*</label>
                      <Input 
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
                      <label htmlFor="country" className="text-sm font-medium text-foreground">Country*</label>
                      <Input 
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                        placeholder="Your country"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-foreground">Company Name*</label>
                      <Input 
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
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number*</label>
                      <Input 
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
                      <label htmlFor="lookingFor" className="text-sm font-medium text-foreground">Looking For</label>
                      <select 
                        id="lookingFor"
                        name="lookingFor"
                        value={formData.lookingFor}
                        onChange={handleFormChange}
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring"
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
                    <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                  <FlaskConical className="w-5 h-5 text-white" />
                </div>
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
            <div className="flex items-center gap-6">
              <button type="button" onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Let's Connect!
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

