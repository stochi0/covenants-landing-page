export function Resources() {
  const contacts = [
    { label: "Phone", value: "+91 8452008095" },
    { label: "Phone", value: "+91 8452008093" },
    { label: "Email", value: "info@covenantspc.com" },
    {
      label: "Address",
      value:
        "A-209, Bhaveshwar Arcade, LBS Marg, Ghatkopar (West), Mumbai - 400086, Maharashtra, India",
    },
  ];

  return (
    <section id="resources" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Contact details</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach us anytime—our team will help you with services, products, and SCM requirements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((c, idx) => (
            <div key={`${c.label}-${idx}`} className="p-6 border border-border rounded-2xl bg-background">
              <div className="text-xs font-medium text-muted-foreground mb-2">{c.label}</div>
              <div className="text-sm font-semibold">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


