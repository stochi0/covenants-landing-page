import Image from "next/image";
import Link from "next/link";

export function ManufacturingCapabilities() {
  const highlights = [
    {
      title: "High-precision manufacturing",
      description: "From gram-scale to full-scale commercial production.",
    },
    {
      title: "Diverse chemistry expertise",
      description: "Scale routes reliably with repeatable processes and controls.",
    },
    {
      title: "Quality control excellence",
      description: "Analytical support and documentation aligned to global standards.",
    },
    {
      title: "Global standards compliance",
      description: "Partner network built for audits, quality, and on-time delivery.",
    },
  ];

  return (
    <section id="manufacturing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Manufacturing Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Delivering reliable and scalable chemical manufacturing solutions to accelerate your
            innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 border border-border rounded-2xl bg-background hover:shadow-lg transition-all"
              >
                <div className="text-sm font-semibold mb-2">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
            ))}
            <div className="sm:col-span-2 flex items-center justify-between gap-4 p-6 border border-border rounded-2xl bg-muted/30">
              <div>
                <div className="text-sm font-semibold">Partner manufacturers</div>
                <div className="text-sm text-muted-foreground">250+ trusted partners</div>
              </div>
              <Link
                href="#partner"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Explore more
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/factory.svg"
                alt="Manufacturing illustration"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-44 h-44 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}


