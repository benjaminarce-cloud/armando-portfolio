import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#0A0A0C] text-[#F3F2EE]">
      {/* Background video */}
      <div className="absolute inset-0">
        {/* Video (push-in + deblur + fade) */}
        <video
          className="hero-video h-full w-full object-cover"
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

        {/* Iris black reveal (starts full black, shrinks from center) */}
        <div className="hero-iris" aria-hidden="true" />

        {/* Your existing gradient for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
          aria-hidden="true"
        />
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

      {/* Cinematic intro CSS */}
      <style jsx>{`
        /* Video: soft fade-in + deblur + slow push-in */
        .hero-video {
          opacity: 0;
          filter: blur(10px) saturate(1.05) contrast(1.05);
          transform: scale(1.12);
          transform-origin: 50% 45%;
          animation: heroVideoIn 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) 120ms
            forwards;
        }

        /* Iris overlay: starts fully covering, shrinks from center */
        .hero-iris {
          position: absolute;
          inset: 0;
          background: #0a0a0c;
          /* Start huge circle (covers everything), shrink to 0 (reveals video from center) */
          clip-path: circle(160% at 50% 50%);
          animation: heroIris 1100ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms forwards;
          pointer-events: none;
        }

        @keyframes heroVideoIn {
          to {
            opacity: 1;
            filter: blur(0px) saturate(1) contrast(1);
            transform: scale(1);
          }
        }

        @keyframes heroIris {
          to {
            clip-path: circle(0% at 50% 50%);
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-video,
          .hero-iris {
            animation: none !important;
          }
          .hero-video {
            opacity: 1;
            filter: none;
            transform: none;
          }
          .hero-iris {
            clip-path: circle(0% at 50% 50%);
          }
        }
      `}</style>
    </section>
  );
}
