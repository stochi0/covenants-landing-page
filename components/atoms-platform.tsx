import Image from "next/image";
import Link from "next/link";

export function AtomsPlatform() {
  const features = [
    {
      title: "API",
      description: "Active Pharmaceutical Ingredients (API)",
    },
    {
      title: "Intermediate",
      description: "Key synthesis intermediates across multiple routes",
    },
    {
      title: "Speciality chemicals",
      description: "Specialty chemicals for diverse applications",
    },
    {
      title: "Impurities",
      description: "Impurities and related offerings",
    },
  ];

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-background border border-border rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Products Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              APIs, Intermediates &amp; Specialty Chemicals
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our core product offerings across APIs, intermediates, speciality chemicals,
              and impurities.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-background border border-border rounded-2xl"
                >
                  <div className="text-sm font-semibold mb-2">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Request a quote
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors"
              >
                Ask about availability
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/atoms.svg"
                alt="Product offerings"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-44 h-44 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}


