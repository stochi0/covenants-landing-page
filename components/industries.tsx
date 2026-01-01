export function Industries() {
  const aboutPoints = [
    {
      title: "Network",
      description:
        "We leverage an extensive network of partners to deliver capacity and capability where you need it.",
    },
    {
      title: "Expertise",
      description:
        "A team of passionate professionals committed to creating value for all stakeholders.",
    },
    {
      title: "Technology",
      description:
        "Cutting-edge technology to drive efficiency, visibility, and reliable execution.",
    },
    {
      title: "Sustainable growth",
      description:
        "We drive sustainable growth through innovative, tailored solutions across the supply chain.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a team of passionate professionals committed to creating value for all
            stakeholders. By leveraging our extensive network, deep expertise, and cutting-edge
            technology, we drive sustainable growth and innovation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutPoints.map((item) => (
            <div
              key={item.title}
              className="p-6 border border-border rounded-2xl bg-background hover:shadow-lg transition-all"
            >
              <div className="text-sm font-semibold mb-2">{item.title}</div>
              <div className="text-sm text-muted-foreground">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


