import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { pieceTiles } from "@/lib/projects";

export const metadata = {
  title: "Video — Mando",
};

/**
 * Every film, one tile each — not one tile per shoot.
 *
 * The index is where the work is grouped. Here it is unpacked: the eleven golf
 * postcards are eleven tiles, and the run reads as a body of films rather than
 * as a second, shorter list of the same collections. A tile still opens the
 * shoot it belongs to, because that is where the piece lives.
 */
export default function VideoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark />

      <main className="mt-5 flex-1">
        <Mosaic items={pieceTiles("video")} />
      </main>

      <SiteFooter />
    </div>
  );
}
