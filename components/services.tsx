import { Factory, Beaker, TrendingUp, Package } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Factory,
      title: "Contract Manufacturing",
      description: "End-to-end manufacturing solutions through our extensive network of trusted partners.",
      features: [
        "Product Development",
        "Process Development",
        "Scale up & Tech Transfer",
        "Full Time Equivalent"
      ]
    },
    {
      icon: Beaker,
      title: "Custom Research",
      description: "Advanced R&D capabilities for method development and impurity synthesis.",
      features: [
        "Analytical Method Development",
        "Impurity Synthesis",
        "Custom Synthesis",
        "Process Optimization"
      ]
    },
    {
      icon: TrendingUp,
      title: "Supply Chain Services",
      description: "Comprehensive SCM solutions to optimize your operations and reduce risks.",
      features: [
        "Sourcing & Procurement",
        "Cost Optimization",
        "Risk Mitigation",
        "Digital Transformation"
      ]
    },
    {
      icon: Package,
      title: "Products",
      description: "Wide range of pharmaceutical chemicals and specialty products.",
      features: [
        "Active Pharmaceutical Ingredients",
        "Chemical Intermediates",
        "Specialty Chemicals",
        "Impurities & Standards"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Comprehensive Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From sourcing to delivery, we provide end-to-end services for your pharmaceutical chemical needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-muted-foreground"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

