import HomeHero from "@/components/home/HomeHero";
import SpotlightRail from "@/components/home/SpotlightRail";
import HomeEndCard from "@/components/home/HomeEndCard";

export default function Page() {
  return (
    <main className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <HomeHero />
      <SpotlightRail />
      <HomeEndCard />
    </main>
  );
}
