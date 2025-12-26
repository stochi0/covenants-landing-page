export function Stats() {
  const stats = [
    {
      value: "4,995",
      label: "Products",
      description: "Across multiple categories"
    },
    {
      value: "495",
      label: "Factories",
      description: "Partner manufacturing network"
    },
    {
      value: "20",
      label: "Chemistries",
      description: "Diverse reaction expertise"
    },
    {
      value: "20",
      label: "Countries",
      description: "Global presence"
    },
    {
      value: "35",
      label: "Scientists",
      description: "R&D team strength"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
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

