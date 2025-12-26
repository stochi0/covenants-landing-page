export function Industries() {
  const industries = [
    "Pharmaceutical",
    "Agrochemicals",
    "Industrial Chemicals",
    "Flavors & Fragrances",
    "Beauty & Personal Care",
    "Food & Nutrition",
  ];

  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            High-quality solutions across diverse industries, delivered with a focus on reliability
            and compliance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry}
              className="p-6 border border-border rounded-2xl bg-background hover:shadow-lg transition-all"
            >
              <div className="text-sm font-semibold mb-2">{industry}</div>
              <div className="text-sm text-muted-foreground">
                Tailored support from R&amp;D to manufacturing for your category.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


