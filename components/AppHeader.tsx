"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function AppHeader() {
  const pathname = usePathname();
  const [heroInView, setHeroInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Rebind hero observer on route change
  useEffect(() => {
    if (pathname !== "/") {
      setHeroInView(false);
      return;
    }

    const hero = document.querySelector('[data-hero="true"]');
    if (!hero) {
      setHeroInView(false);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.15 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 8) return;

      if (delta > 0 && y > 90) setHidden(true);
      if (delta < 0) setHidden(false);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = pathname === "/" && heroInView;

  // Solid pill should NOT appear on top of the hero video
  const solid = !onHero;

  // Force-white styling when on hero (ignores theme)
  const leftText = onHero ? "text-white/80" : "text-[color:var(--page-muted)]";
  const centerText = onHero ? "text-white" : "text-[color:var(--page-fg)]";
  const rightLinkText = onHero
    ? "text-white/80 hover:text-white"
    : "text-[color:var(--page-muted)] hover:text-[color:var(--page-fg)]";
  const divider = onHero ? "bg-white/25" : "bg-[color:var(--page-border)]";

  return (
    <div
      className={[
        "fixed left-0 right-0 top-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-5 pt-5 sm:px-8 lg:px-12">
        <div
          className={[
            "flex items-center justify-between",
            "rounded-full border",
            solid
              ? "bg-[color:var(--page-bg)]/85 backdrop-blur-xl border-[color:var(--page-border)] shadow-[0_18px_60px_rgba(0,0,0,0.12)]"
              : "bg-transparent border-transparent shadow-none",
            "px-6 py-3",
          ].join(" ")}
        >
          {/* Left */}
          <div
            className={[
              "flex items-center gap-3 text-[11px] uppercase tracking-[0.32em]",
              leftText,
            ].join(" ")}
          >
            <span>San Diego</span>
            <span className={["h-[1px] w-10", divider].join(" ")} />
            <span>Film Student</span>
          </div>

          {/* Center */}
          <Link
            href="/"
            className={["text-[12px] font-semibold tracking-[0.18em]", centerText].join(" ")}
          >
            MANDO°
          </Link>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className={rightLinkText}>
              Contact
            </Link>

            {/* Make sure toggle stays usable on hero (white ring) */}
            <div className={onHero ? "[&_button]:border-white/30 [&_button]:bg-white/10 [&_button]:hover:bg-white/15" : ""}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
