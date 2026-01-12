import HomeHero from "@/components/home/HomeHero";
import HomeMenu from "@/components/home/HomeMenu";
import HomeEndCard from "@/components/home/HomeEndCard";

export default function Page() {
  return (
    <main className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <HomeHero />
      <HomeMenu />
      <HomeEndCard />
    </main>
  );
}
