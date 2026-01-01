export function Investors() {
  const why = [
    {
      title: "Trusted supply chain partner",
      description:
        "Covenants promises to become your trusted supply chain partner—focused on long-term relationships.",
    },
    {
      title: "Innovative, tailored solutions",
      description:
        "We strive to exceed expectations through innovative, tailored solutions for your needs.",
    },
    {
      title: "Value for all stakeholders",
      description:
        "We are committed to creating value for customers, partners, and the broader ecosystem.",
    },
    {
      title: "Network-led execution",
      description:
        "Leverage our network partners for capacity and capability across manufacturing and research.",
    },
    {
      title: "Expertise + technology",
      description:
        "Deep expertise combined with cutting-edge technology to drive reliable outcomes.",
    },
    {
      title: "Sustainable growth",
      description:
        "We drive sustainable growth by improving resilience, transparency, and execution quality.",
    },
  ];

  return (
    <section id="why" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Covenants?</h2>
            <p className="text-lg text-muted-foreground">
              We strive to exceed expectations through innovative, tailored solutions—creating value
              for all our stakeholders by leveraging our network, expertise and technology to drive
              sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {why.map((item) => (
              <div
                key={item.title}
                className="p-5 bg-background border border-border rounded-2xl"
              >
                <div className="text-sm font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


