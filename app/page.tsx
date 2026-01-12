import HomeHero from "@/components/home/HomeHero";
import SpotlightRail from "@/components/home/SpotlightRail";
import HomeEndCard from "@/components/home/HomeEndCard";

export default function Page() {
  return (
    <main className="bg-[var(--page-bg)] text-[var(--page-fg)]">
      <HomeHero />

      {/* Netflix-style spotlight row (vertical reels + hover/center spotlight) */}
      <SpotlightRail />

      {/* End card (white A24-ish footer) */}
      <HomeEndCard />
    </main>
  );
}
