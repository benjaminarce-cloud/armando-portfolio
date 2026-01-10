import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0A0A0C] text-[#F3F2EE]">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/hero-poster.jpg"
        >
          <source
            src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""}
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      </div>

      {/* Foreground layout */}
      <div className="relative z-10 flex min-h-[92vh] flex-col">
        {/* Top nav */}
        <header>
          <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                  San Diego
                </span>
                <span className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                  Film Student
                </span>
              </div>

              <nav className="flex items-center gap-6 font-[var(--font-sans)]">
                <Link
                  href="/work"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/70 hover:text-white"
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/70 hover:text-white"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/70 hover:text-white"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Bottom-left title card */}
        <div className="mt-auto">
          <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
            <div className="relative inline-block">
              {/* ghost layer */}
              <div
                aria-hidden="true"
                className="
                  absolute -top-[0.06em] left-[0.02em]
                  font-[var(--font-serif)]
                  text-[clamp(64px,8.8vw,124px)]
                  leading-[0.82]
                  tracking-[-0.02em]
                  text-white/22
                  blur-[0.2px]
                  select-none
                  pointer-events-none
                  whitespace-nowrap
                "
              >
                Armando Aguilar
              </div>

              {/* main layer */}
              <h1
                className="
                  relative
                  font-[var(--font-serif)]
                  text-[clamp(64px,8.8vw,124px)]
                  leading-[0.82]
                  tracking-[-0.02em]
                  text-white
                  drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]
                  whitespace-nowrap
                  pb-[0.08em]
                "
              >
                Armando Aguilar
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
