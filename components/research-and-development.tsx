import Image from "next/image";
import Link from "next/link";

export function ResearchAndDevelopment() {
  const servicesThroughNetworkPartners = [
    "Contract Manufacturing",
    "Product Development",
    "Process Development",
    "Scale up & Tech Transfer",
    "Analytical Method Development",
    "Impurity Synthesis",
    "Full Time Equivalent",
  ];

  const focusAreas = ["Customs Manufacturing", "Custom Research", "Products"];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Services Through Network Partners
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Our offerings cover contract manufacturing, development, scale-up, analytics, impurity
              synthesis, and dedicated FTE engagement—delivered through a trusted network.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-background">
                <div className="text-sm font-semibold mb-3">Our offerings</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {servicesThroughNetworkPartners.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="w-1 h-1 bg-primary rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-background">
                <div className="text-sm font-semibold mb-3">Also includes</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {servicesThroughNetworkPartners.slice(4).map((item) => (
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
                    <div className="text-sm font-semibold mb-3">Focus areas</div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      {focusAreas.map((item) => (
                        <li key={item} className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="#contact"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-full hover:bg-accent transition-colors"
                  >
                    Let us connect!
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/lab.svg"
                alt="Services through network partners"
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


