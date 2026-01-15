import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-7 text-xs font-medium bg-card/70 border border-border rounded-full backdrop-blur">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Capacity • Capability • Sourcing • Products • Services
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Expanding Horizons in{" "}
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                APIs, Intermediates
              </span>{" "}
              &amp; Specialty Chemicals
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Covenants promises to become your trusted supply chain partner. We strive to exceed
              expectations through innovative, tailored solutions—creating value for all our
              stakeholders by leveraging our network, expertise and technology to drive sustainable
              growth.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                Let us connect!
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors bg-card/60 backdrop-blur"
              >
                Explore offerings
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
              {[
                { k: "100+", v: "Partners" },
                { k: "6000+", v: "KL capacity" },
                { k: "3500+", v: "Products" },
              ].map((item) => (
                <div
                  key={item.v}
                  className="rounded-2xl border border-border bg-card/70 backdrop-blur px-4 py-3"
                >
                  <div className="text-lg font-semibold leading-none">{item.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur">
              <Image
                src="/images/lab-glassware.jpg"
                alt="Laboratory glassware"
                width={1200}
                height={900}
                className="h-[320px] sm:h-[380px] w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-background/10" />
            </div>
            <div className="pointer-events-none absolute -z-10 mt-[-60px] ml-[-40px] h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

