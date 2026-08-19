import Hero from "@/components/Hero";
import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { clipBySlug, clipSources } from "@/lib/clips";
import { heroUrl } from "@/lib/media";
import { indexTiles } from "@/lib/projects";

/**
 * The front page.
 *
 * The reel opens it on a phone and nowhere else. On a small screen there is
 * room for one thing at a time and a moving frame is the better first thing;
 * at desktop width the wall itself is the opener — thirty-odd tiles already
 * playing — and a reel above it only pushed the work below the fold. So the
 * desktop page is the one the site had before the reel: wordmark centred,
 * links flush left, work under them.
 *
 * This is the only page that shows collections: a tile here is a whole shoot,
 * and it opens into the whole of one. /video and /photo deliberately do the
 * opposite and show single pieces, so the two readings never compete. A few
 * single pieces are promoted up here alongside the shoots — see FEATURED.
 *
 * Every loop plays on arrival rather than on hover — the wall is meant to be
 * moving when you reach it. TilePreview keeps that bounded to what is on
 * screen; see the note there.
 */
export default function Page() {
  const intro = clipBySlug("intro-hero");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Phone only. On a desktop the reel is gone and the page opens on the
          wordmark and the wall, the way it did before the reel existed. */}
      <div className="sm:hidden">
        <Hero
          src={heroUrl(intro.filmId)}
          poster={clipSources(intro).poster}
          ratio={intro.ratio}
        />
      </div>

      <SiteMark variant="index" />

      <main className="mt-5 flex-1">
        <Mosaic items={indexTiles()} autoplay />
      </main>

      <SiteFooter />
    </div>
  );
}
