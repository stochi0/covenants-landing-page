import Link from "next/link";

export function Resources() {
  const webinars = [
    {
      date: "August 6, 2025",
      title: "Rethinking India’s Role in Chemical Supply Chains",
      meta: "Speakers: Mitesh Gangar, Nirjhar Negi • Host: Salil Srivastava",
    },
    {
      date: "December 24, 2024",
      title: "How to Synergize the Pharmaceutical Ecosystem in India",
      meta: "Speakers: Dr. J.S. Yadav, Dr. Sudhir Kumar Singh, Prof. Malla Reddy, Dr. Srinivas Oruganti, Dr. D.S. Reddy, Dr. Rakeshwar Bandichhor • Host: Sachin Santhosh",
    },
  ];

  const media = [
    { outlet: "Forbes", date: "Mar 12, 2025", title: "Why Scimplify Thinks The World Needs A New Chemicals Supplier" },
    { outlet: "TechCrunch", date: "Mar 12, 2025", title: "Scimplify raises $40M to help manufacturers access specialty chemicals" },
    { outlet: "Chemical Weekly", date: "Mar 18, 2025", title: "Speciality chemicals start-up, Scimplify, gets additional funding support of $40-mn to scale up operations" },
    { outlet: "Indian Chemical News", date: "Mar 15, 2025", title: "Specialty chemicals startup Scimplify raises $40 million" },
  ];

  return (
    <section id="resources" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Webinars, events, and media coverage—curated for leaders in specialty chemicals.
            </p>
          </div>
          <Link
            href="#partner"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm border border-border rounded-full hover:bg-accent transition-colors w-fit"
          >
            View all
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-8 border border-border rounded-3xl bg-background">
            <div className="text-sm font-semibold mb-6">Webinars</div>
            <div className="space-y-5">
              {webinars.map((w) => (
                <div key={w.title} className="p-5 rounded-2xl border border-border bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-2">{w.date}</div>
                  <div className="font-semibold mb-2">{w.title}</div>
                  <div className="text-sm text-muted-foreground">{w.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border border-border rounded-3xl bg-background">
            <div className="text-sm font-semibold mb-6">Media / Events</div>
            <div className="space-y-4">
              {media.map((m) => (
                <div key={`${m.outlet}-${m.title}`} className="p-5 rounded-2xl border border-border">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="text-sm font-semibold">{m.outlet}</div>
                    <div className="text-xs text-muted-foreground">{m.date}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{m.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


