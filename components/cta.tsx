import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 lg:p-16">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-lg text-background/80 mb-8">
              Ready to streamline your pharmaceutical chemical supply chain? 
              Get in touch with our team to discuss your requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="mailto:info@covenantspc.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-full hover:bg-background/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="tel:+918452008095"
                className="inline-flex items-center gap-2 px-6 py-3 border border-background/20 rounded-full hover:bg-background/10 transition-colors"
              >
                Schedule a Call
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@covenantspc.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 8452008095
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-background/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-background/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}

