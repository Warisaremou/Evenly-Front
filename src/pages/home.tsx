import { EventListing, HeroSection } from "@/components/sections";

export default function Home() {
  return (
    <div className="space-y-36">
      <HeroSection />
      <EventListing />
    </div>
  );
}
