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

          {/* Placeholder strip (next step we’ll make this real data + links) */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-white/5" />
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-white/5" />
            <div className="aspect-[4/5] rounded-2xl border border-white/10 bg-white/5" />
          </div>

          <div id="reel" className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              Reel
            </p>
            <h3 className="mt-3 text-2xl tracking-[-0.02em]">
              2026 Highlight Reel
            </h3>
            <p className="mt-3 max-w-2xl text-white/65">
              Replace this block with your reel embed (YouTube/Vimeo/IG) once you
              send the link.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
