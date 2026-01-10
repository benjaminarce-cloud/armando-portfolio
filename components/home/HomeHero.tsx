import Image from "next/image";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0A0A0C]">
      {/* Background media */}
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
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Cinematic matte + light shaping */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/95 via-[#0A0A0C]/45 to-[#0A0A0C]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_50%_28%,rgba(255,255,255,0.08),transparent_55%)]" />

        {/* Optional grain overlay (safe if missing; just remove if you want) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-soft-light">
          <Image
            src="/img/grain.png"
            alt=""
            fill
            priority={false}
            className="object-cover"
          />
        </div>
      </div>

      {/* Top nav */}
      <header className="relative z-10">
        <Container>
          <div className="flex items-center justify-between py-6">
            <a href="/" className="inline-flex items-baseline gap-3">
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                San Diego
              </span>
              <span className="text-lg tracking-[-0.01em] text-[#F3F2EE]">
                Armando Aguilar
              </span>
            </a>

            <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.28em] text-white/55 md:flex">
              <a className="transition-colors hover:text-white" href="/work">
                Work
              </a>
              <a className="transition-colors hover:text-white" href="/about">
                About
              </a>
              <a className="transition-colors hover:text-white" href="/contact">
                Contact
              </a>
              <ButtonLink href="/contact" variant="primary" className="px-4 py-2">
                Work With Me
              </ButtonLink>
            </nav>

            <div className="md:hidden">
              <ButtonLink href="/contact" variant="ghost" className="px-4 py-2">
                Contact
              </ButtonLink>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100svh-84px)] items-end">
        <Container>
          <div className="pb-14 sm:pb-20 lg:pb-24">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              Sports film • Social-first campaigns • Run culture
            </p>

            <h1 className="mt-4 max-w-3xl text-[clamp(44px,6.2vw,92px)] leading-[0.92] tracking-[-0.03em] text-[#F3F2EE]">
              Make it feel like a trailer.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Cinematic sports stories for teams, brands, and athletes — built for
              reels, drops, and game-day energy.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="#reel" variant="primary">
                Watch Reel
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Work With Me
              </ButtonLink>
            </div>

            <div className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
              <span className="h-px w-10 bg-white/10" />
              <span>Selected frames below</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
