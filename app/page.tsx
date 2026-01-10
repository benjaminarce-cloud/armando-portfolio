import HomeHero from "@/components/home/HomeHero";
import SpotlightRail from "@/components/home/SpotlightRail";

export default function Page() {
  return (
    <main className="bg-[#0A0A0C] text-[#F3F2EE]">
      <HomeHero />

      {/* Netflix-style spotlight row (vertical reels + hover/center spotlight) */}
      <SpotlightRail />

      {/* Reel */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
          <div
            id="reel"
            className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
                  Reel
                </p>
                <h3 className="mt-2 text-xl tracking-[-0.02em] sm:text-2xl">
                  Highlight Reel
                </h3>
              </div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                Tap to play
              </span>
            </div>

            <div className="aspect-video bg-black">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/img/hero-poster.jpg"
              >
                <source
                  src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
