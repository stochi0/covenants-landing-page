import Image from "next/image";
import Link from "next/link";

export function ManufacturingCapabilities() {
  const highlights = [
    {
      title: "Sourcing",
      description: "Supplier discovery and sourcing support through our network.",
    },
    {
      title: "Procurement Cost Optimization",
      description: "Identify savings opportunities across procurement workflows.",
    },
    {
      title: "Risk Mitigation",
      description: "Reduce supply risks through proactive planning and execution.",
    },
    {
      title: "Digital Transformation",
      description: "Enable better visibility and execution across the supply chain.",
    },
  ];

  return (
    <section id="scm" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            SCM services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            End to End Supply Chain Services—tailored to help you optimize cost, mitigate risk, and
            execute reliably.
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
                <div className="text-sm font-semibold">Additional SCM support</div>
                <div className="text-sm text-muted-foreground">
                  Planning process implementation • ESG • Foreign trade • SCM shared services
                </div>
              </div>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                Let us connect!
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/factory.svg"
                alt="Supply chain services"
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


