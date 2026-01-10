import HomeHero from "@/components/home/HomeHero";

export default function Page() {
  return (
    <main className="bg-[#0A0A0C] text-[#F3F2EE]">
      <HomeHero />

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
                Selected
              </p>
              <h2 className="mt-3 text-2xl tracking-[-0.02em] sm:text-3xl">
                Frames & Moments
              </h2>
            </div>

            <a
              href="/work"
              className="hidden text-[11px] uppercase tracking-[0.28em] text-white/55 hover:text-white md:block"
            >
              View all work
            </a>
          </div>

          {/* Placeholder strip for now — next step we make it real */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-white/5" />
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-white/5" />
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-white/5" />
          </div>

          {/* Reel */}
          <div
            id="reel"
            className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
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
                <source src="/video/hero-loop.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
