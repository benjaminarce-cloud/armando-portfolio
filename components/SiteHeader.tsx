"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  const [onHero, setOnHero] = useState(true);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
        <div
          className={[
            "grid grid-cols-3 items-center text-[11px] uppercase tracking-[0.32em]",
            onHero ? "text-white/80" : "text-[color:var(--page-muted)]",
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
                onHero ? "text-white" : "text-[color:var(--page-fg)]",
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
    </header>
  );
}
