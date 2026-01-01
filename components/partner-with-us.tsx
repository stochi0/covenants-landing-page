"use client";

import { useMemo, useState } from "react";
import { CONTACT } from "@/lib/contact";

export function PartnerWithUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    company: "",
    phone: "",
    lookingFor: "Products",
    message: "",
  });

  const mailtoHref = useMemo(() => {
    const subject = `Partner inquiry: ${form.lookingFor || "General"}`;
    const body = [
      `Name: ${form.name}`,
      `Work Email: ${form.email}`,
      `Country: ${form.country}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      `Looking For: ${form.lookingFor}`,
      "",
      form.message,
    ].join("\n");

    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form]);

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-card text-card-foreground border border-border p-10 sm:p-12 lg:p-16">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Let us connect !
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Share what you’re looking for—services, products, or SCM support—and we’ll connect
                you with the right solution through our network.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Services Through Network Partners",
                    description:
                      "Contract manufacturing, development, scale-up, analytics, impurity synthesis, and FTE support.",
                  },
                  {
                    title: "SCM services",
                    description: "End to End Supply Chain Services tailored to your business needs.",
                  },
                  {
                    title: "Product Offerings",
                    description: "API, Intermediate, Speciality chemicals, and Impurities.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-2xl border border-border bg-background"
                  >
                    <div className="text-sm font-semibold mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
              <div className="text-sm font-semibold mb-6">Partner With Us</div>
              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = mailtoHref;
                }}
              >
                <label className="grid gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Name*</span>
                  <input
                    required
                    name="name"
                    className="h-11 w-full px-4 rounded-xl border border-input bg-background"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Work Email*</span>
                  <input
                    required
                    name="email"
                    type="email"
                    className="h-11 w-full px-4 rounded-xl border border-input bg-background"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Country*</span>
                  <select
                    required
                    name="country"
                    className="h-11 w-full px-4 rounded-xl border border-input bg-background"
                    value={form.country}
                    onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select Country...
                    </option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="EU">Europe</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Company Name*</span>
                  <input
                    required
                    name="company"
                    className="h-11 w-full px-4 rounded-xl border border-input bg-background"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Phone number*</span>
                  <input
                    required
                    name="phone"
                    className="h-11 w-full px-4 rounded-xl border border-input bg-background"
                    placeholder="+91 ..."
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  />
                </label>

                <label className="grid gap-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Looking For</span>
                  <select
                    name="lookingFor"
                    className="h-11 w-full px-4 rounded-xl border border-input bg-background"
                    value={form.lookingFor}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, lookingFor: e.target.value }))
                    }
                  >
                    <option value="Products">Products</option>
                    <option value="Services Through Network Partners">
                      Services Through Network Partners
                    </option>
                    <option value="SCM services">SCM services</option>
                    <option value="General">General</option>
                  </select>
                </label>

                <label className="grid gap-2 sm:col-span-2 min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full p-4 rounded-xl border border-input bg-background resize-none"
                    placeholder="Tell us what you need..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </label>

                <button
                  type="submit"
                  className="sm:col-span-2 h-11 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}


