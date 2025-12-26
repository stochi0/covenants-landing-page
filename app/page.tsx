import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { Intersect } from "@/components/intersect";
import { ResearchAndDevelopment } from "@/components/research-and-development";
import { ManufacturingCapabilities } from "@/components/manufacturing-capabilities";
import { AtomsPlatform } from "@/components/atoms-platform";
import { Industries } from "@/components/industries";
import { Investors } from "@/components/investors";
import { Resources } from "@/components/resources";
import { PartnerWithUs } from "@/components/partner-with-us";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Intersect />
        <ResearchAndDevelopment />
        <ManufacturingCapabilities />
        <AtomsPlatform />
        <Industries />
        <Investors />
        <Resources />
        <PartnerWithUs />
      </main>
      <Footer />
    </div>
  );
}
