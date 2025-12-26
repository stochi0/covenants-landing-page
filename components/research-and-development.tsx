import Image from "next/image";
import Link from "next/link";

export function ResearchAndDevelopment() {
  const chemistries = [
    "Synthetic Chemistry",
    "Computational Chemistry",
    "Medicinal Chemistry",
    "Analytical Chemistry",
  ];

  const capabilities = [
    "Custom Synthesis",
    "New Product Development",
    "Green Chemistry",
    "Gram to Kilo Scale Production",
  ];

  const infrastructure = [
    "HPLC, GCMS, LCMS",
    "High-Vacuum Facilities",
    "NMR with all probes",
    "3 labs, 40+ scientists",
  ];

  return (
    <section id="rd" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Research &amp; Development
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Take ideas from concept to market faster with R&amp;D expertise, cost-efficient synthesis
              routes, and advanced technologies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-background">
                <div className="text-sm font-semibold mb-3">Chemistries</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {chemistries.map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="w-1 h-1 bg-primary rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-background">
                <div className="text-sm font-semibold mb-3">Capabilities</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {capabilities.map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="w-1 h-1 bg-primary rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-background sm:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold mb-3">Infrastructure</div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      {infrastructure.map((item) => (
                        <li key={item} className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="#partner"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors"
                  >
                    Explore more
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/lab.svg"
                alt="Research and development"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}


