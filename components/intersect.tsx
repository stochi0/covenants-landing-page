import Image from "next/image";

export function Intersect() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium bg-muted rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Intersect
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Your Trusted Partner from R&amp;D to Large-Scale Manufacturing
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Leverage research and manufacturing services; seamlessly integrating R&amp;D with
              commercial manufacturing to navigate complex chemical development with ease.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "R&amp;D-first approach",
                  description: "Move from concept to route design to validation faster.",
                },
                {
                  title: "Scale with confidence",
                  description: "From gram-scale to commercial production with quality control.",
                },
                {
                  title: "Integrated transition",
                  description: "Make it easier to move from lab to plant with fewer handoffs.",
                },
                {
                  title: "Global execution",
                  description: "Coordinate partners, documentation, and tracking end-to-end.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 border border-border rounded-2xl bg-background"
                >
                  <div
                    className="text-sm font-semibold mb-1"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
              <Image
                src="/illustrations/lab.svg"
                alt="R&D illustration"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority={false}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}


