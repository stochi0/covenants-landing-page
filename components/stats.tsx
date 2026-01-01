export function Stats() {
  const stats = [
    {
      value: "100+",
      label: "Network Partners",
      description: "Trusted partner network"
    },
    {
      value: "6000+",
      label: "KL Capacity",
      description: "Network manufacturing capacity"
    },
    {
      value: "3500+",
      label: "Products",
      description: "Across key offerings"
    },
    {
      value: "20+",
      label: "Chemical Reactions",
      description: "Diverse reaction capabilities"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

