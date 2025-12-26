import Image from "next/image";
import Link from "next/link";

export function AtomsPlatform() {
  const features = [
    {
      title: "Seamless collaboration",
      description: "Collaborate efficiently with suppliers through integrated contracts.",
    },
    {
      title: "Real-time tracking",
      description: "Gain end-to-end visibility with real-time order tracking.",
    },
    {
      title: "Automated procurement",
      description: "Streamline processes and eliminate inefficiencies with automation.",
    },
  ];

  return (
    <section id="atoms" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-background border border-border rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Our platform
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Access Top Manufacturers of Specialty Chemicals through ATOMS
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tap into production capabilities via a trusted partner network, with visibility and
              automation across the supply chain.
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
                href="#partner"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Explore more
              </Link>
              <Link
                href="#partner"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors"
              >
                Find your product
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/atoms.svg"
                alt="ATOMS platform illustration"
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


