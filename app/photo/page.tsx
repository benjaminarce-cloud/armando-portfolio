import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { pieceTiles } from "@/lib/projects";

export const metadata = {
  title: "Photo — Mando",
};

/** Every frame, one tile each. The counterpart to /video; see the note there. */
export default function PhotoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark />

      <main className="mt-5 flex-1">
        <Mosaic items={pieceTiles("photo")} />
      </main>

      <SiteFooter />
    </div>
  );
}
