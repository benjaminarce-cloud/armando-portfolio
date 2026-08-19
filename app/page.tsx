import Hero from "@/components/Hero";
import Mosaic from "@/components/Mosaic";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { clipBySlug, clipSources } from "@/lib/clips";
import { heroUrl } from "@/lib/media";
import { indexTiles } from "@/lib/projects";

/**
 * The front page: the reel full screen, then the index under it.
 *
 * The hero is the only thing above the work, and it is one shot — no mark, no
 * nav, no copy over it. Everything that was already here follows unchanged the
 * moment you scroll.
 *
 * This is the only page that shows collections: a tile here is a whole shoot,
 * and it opens into the whole of one. /video and /photo deliberately do the
 * opposite and show single pieces, so the two readings never compete.
 *
 * Every loop plays on arrival rather than on hover — the wall is meant to be
 * moving when you reach it. TilePreview keeps that bounded to what is on
 * screen; see the note there.
 */
export default function Page() {
  const intro = clipBySlug("intro-hero");

  return (
    <div className="flex min-h-screen flex-col">
      <Hero
        src={heroUrl(intro.filmId)}
        poster={clipSources(intro).poster}
        ratio={intro.ratio}
      />

      {/* The wordmark rides the reel now, so this is the links alone. */}
      <SiteMark mark={false} />

      <main className="mt-5 flex-1">
        <Mosaic items={indexTiles()} autoplay />
      </main>

      <SiteFooter />
    </div>
  );
}
