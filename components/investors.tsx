export function Investors() {
  const investors = [
    "Accel",
    "UMI",
    "3one4capital",
    "Bertelsmann India Investments (BII)",
    "Omnivore",
    "Beenext",
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Investors</h2>
            <p className="text-lg text-muted-foreground">
              Backed by leading funds supporting scale, quality systems, and global growth.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {investors.map((name) => (
              <div
                key={name}
                className="px-4 py-3 bg-background border border-border rounded-2xl text-sm font-medium text-center"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


