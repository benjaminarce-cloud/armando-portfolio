"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  const [onHero, setOnHero] = useState(false);
  const [hidden, setHidden] = useState(false);

  // detect whether the hero is in view
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

    const threshold = 14;
    const showAfter = 64;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (y < showAfter) {
          setHidden(false);
        } else if (delta > threshold) {
          setHidden(true);
        } else if (delta < -threshold) {
          setHidden(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textClass = onHero ? "text-white/85" : "text-[color:var(--page-muted)]";
  const strongTextClass = onHero ? "text-white" : "text-[color:var(--page-fg)]";
  const sepClass = onHero ? "bg-white/25" : "bg-[color:var(--page-border)]";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-[110%]" : "translate-y-0",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
        {/* IMPORTANT: only show the backdrop block when NOT on hero */}
        {onHero ? (
          // Hero: no block, just floating text
          <div
            className={[
              "grid grid-cols-3 items-center",
              "text-[11px] uppercase tracking-[0.32em]",
              textClass,
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <span>San Diego</span>
              <span className={["h-px w-6", sepClass].join(" ")} />
              <span>Film Student</span>
            </div>

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

            <div className="flex items-center justify-end gap-4">
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
              <ThemeToggle />
            </div>
          </div>
        ) : (
          // Not hero: add the readable backdrop block
          <div
            className={[
              "rounded-2xl border backdrop-blur-md",
              "px-4 py-3 sm:px-5 sm:py-3.5",
              "bg-[color:var(--page-bg)]/70 border-[color:var(--page-border)]",
            ].join(" ")}
          >
            <div
              className={[
                "grid grid-cols-3 items-center",
                "text-[11px] uppercase tracking-[0.32em]",
                textClass,
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <span>San Diego</span>
                <span className={["h-px w-6", sepClass].join(" ")} />
                <span>Film Student</span>
              </div>

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

              <div className="flex items-center justify-end gap-4">
                <Link
                  href="/contact"
                  className="hover:text-[color:var(--page-fg)]"
                >
                  Contact
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
