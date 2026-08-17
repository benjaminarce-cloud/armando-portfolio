import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { projectsOfKind } from "@/lib/projects";

export const metadata = {
  title: "Photo — Mando",
};

export default function PhotoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark />

      <main className="mt-5 flex-1">
        <Mosaic projects={projectsOfKind("photo")} />
      </main>

      <SiteFooter />
    </div>
  );
}
