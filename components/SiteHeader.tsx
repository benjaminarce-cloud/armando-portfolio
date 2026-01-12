"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  const [onHero, setOnHero] = useState(true);
  const [hidden, setHidden] = useState(false);

  // detect whether hero is in view (for color logic)
  useEffect(() => {
    const hero = document.querySelector('[data-hero="true"]');
    if (!hero) {
      setOnHero(false);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting),
      { threshold: 0.35 }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const threshold = 16; // ignore tiny scroll jitter
    const showAfter = 64; // don't start hiding immediately at top

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        // always show near the very top
        if (y < showAfter) {
          setHidden(false);
        } else if (delta > threshold) {
          // scrolling down
          setHidden(true);
        } else if (delta < -threshold) {
          // scrolling up
          setHidden(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Text colors
  const textClass = onHero ? "text-white/85" : "text-[color:var(--page-muted)]";
  const strongTextClass = onHero ? "text-white" : "text-[color:var(--page-fg)]";

  // Backdrop block colors:
  // - On hero: dark translucent so it reads over bright frames
  // - Elsewhere: paper/ink aware translucency using CSS vars
  const shellClass = onHero
    ? "bg-black/35 border-white/10"
    : "bg-[color:var(--page-bg)]/70 border-[color:var(--page-border)]";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-[110%]" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
        {/* Backdrop block */}
        <div
          className={[
            "rounded-2xl border backdrop-blur-md",
            "px-4 py-3 sm:px-5 sm:py-3.5",
            shellClass,
          ].join(" ")}
        >
          <div
            className={[
              "grid grid-cols-3 items-center",
              "text-[11px] uppercase tracking-[0.32em]",
              textClass,
            ].join(" ")}
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <span>San Diego</span>
              <span
                className={[
                  "h-px w-6",
                  onHero ? "bg-white/25" : "bg-[color:var(--page-border)]",
                ].join(" ")}
              />
              <span>Film Student</span>
            </div>

            {/* Center */}
            <div className="flex justify-center">
              <Link
                href="/"
                className={[
                  "font-[var(--font-sans)] font-extrabold tracking-[-0.02em]",
                  "text-[14px] sm:text-[15px] opacity-90 hover:opacity-100",
                  strongTextClass,
                ].join(" ")}
                aria-label="Home"
              >
                mando<span className="align-super text-[10px] opacity-70">®</span>
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end gap-4">
              <Link
                href="/contact"
                className={onHero ? "hover:text-white" : "hover:text-[color:var(--page-fg)]"}
              >
                Contact
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
