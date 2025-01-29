import { EventListing, HeroSection } from "@/components/sections";

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-36">
      <HeroSection />
      <EventListing
        sectionTitle="Upoming events"
        withCTA
      />
    </div>
  );
}
