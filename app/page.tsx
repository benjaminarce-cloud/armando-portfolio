import HomeHero from "@/components/home/HomeHero";
import { WorkMenu } from "@/components/home/WorkMenu";
import HomeEndCard from "@/components/home/HomeEndCard";

export default function Page() {
  return (
    <main className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <HomeHero />
      <WorkMenu />
      <HomeEndCard />
    </main>
  );
}
