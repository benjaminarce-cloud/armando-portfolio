import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { projectTiles } from "@/lib/projects";

/**
 * The front page is the index. There is nothing above the work but the mark.
 *
 * This is the only page that shows collections: a tile here is a whole shoot,
 * and it opens into the whole of one. /video and /photo deliberately do the
 * opposite and show single pieces, so the two readings never compete.
 *
 * Every loop plays on arrival rather than on hover — the wall is meant to be
 * moving when you land on it. TilePreview keeps that bounded to what is on
 * screen; see the note there.
 */
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark />

      <main className="mt-5 flex-1">
        <Mosaic items={projectTiles()} autoplay />
      </main>

      <SiteFooter />
    </div>
  );
}
