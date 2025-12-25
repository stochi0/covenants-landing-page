export function Network() {
  const capabilities = [
    "Capacity & Capability Mapping",
    "Quality Assurance",
    "Regulatory Compliance",
    "Technology Transfer",
    "Global Sourcing",
    "ESG Compliance"
  ];

  return (
    <section id="network" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Powered by a Global Network
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We've built relationships with 100+ manufacturing partners worldwide, 
              providing you with unparalleled access to capacity, capability, and expertise.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  </div>
                  <span className="text-sm">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-muted rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">100+</div>
                <div className="text-lg font-medium mb-2">Network Partners</div>
                <div className="text-sm text-muted-foreground">Across Global Markets</div>
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold">6K+</div>
                    <div className="text-xs text-muted-foreground">KL Capacity</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3.5K+</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">20+</div>
                    <div className="text-xs text-muted-foreground">Reactions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

