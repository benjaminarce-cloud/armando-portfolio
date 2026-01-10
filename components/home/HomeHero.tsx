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

        {/* Lighter cinematic wash (keeps video vibrant) */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
      </div>

      {/* Foreground layout */}
      <div className="relative z-10 flex min-h-[92vh] flex-col">
        {/* Top nav */}
        <header>
          <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between">
              {/* Left: location + descriptor */}
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] uppercase tracking-[0.32em] text-white/55">
                  San Diego
                </span>
                <span className="text-[11px] uppercase tracking-[0.32em] text-white/35">
                  Film Student
                </span>
              </div>

              {/* Right: nav only */}
              <nav className="flex items-center gap-6">
                <Link
                  href="/work"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white"
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] uppercase tracking-[0.32em] text-white/55 hover:text-white"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Bottom-left title (always visible, never off-screen) */}
        <div className="mt-auto">
          <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
            <h1 className="text-[clamp(52px,7vw,92px)] leading-[0.92] tracking-[-0.04em]">
              Armando Aguilar
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
