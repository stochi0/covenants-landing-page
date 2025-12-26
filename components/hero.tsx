import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium bg-muted rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            R&amp;D + Manufacturing, end-to-end
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            R&amp;D-First,{" "}
            <span className="text-muted-foreground">Global Factory</span>{" "}
            for Specialty Chemicals
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Leverage research and manufacturing services that seamlessly integrate R&amp;D with
            commercial manufacturing—so you can navigate complex chemical development with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#partner"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#rd"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors"
            >
              Explore capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

