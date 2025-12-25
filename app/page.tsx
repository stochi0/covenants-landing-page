import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { Products } from "@/components/products";
import { Network } from "@/components/network";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Products />
        <Network />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
