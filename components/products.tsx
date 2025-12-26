export function Products() {
  const categories = [
    {
      name: "Active Pharmaceutical Ingredients",
      description: "High-quality APIs meeting global regulatory standards",
      tag: "APIs"
    },
    {
      name: "Chemical Intermediates",
      description: "Essential building blocks for pharmaceutical synthesis",
      tag: "Intermediates"
    },
    {
      name: "Specialty Chemicals",
      description: "Custom chemicals for specific applications",
      tag: "Specialty"
    },
    {
      name: "Impurities & Standards",
      description: "Reference standards and impurity profiles",
      tag: "Standards"
    }
  ];

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Product Offerings
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access to 3500+ products across multiple categories
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-background border border-border rounded-xl hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-medium mb-4">
                {category.tag}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-border rounded-full hover:bg-accent transition-colors">
            View Full Catalog
          </button>
        </div>
      </div>
    </section>
  );
}

