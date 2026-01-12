"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

export default function WorkMenu() {
  const items: MenuItem[] = useMemo(
    () => [
      { label: "SDSU Basketball", href: "/work?group=sdsu" },
      { label: "NIL", href: "/work?group=nil" },
      { label: "Freelance", href: "/work?group=freelance" },
      { label: "Other", href: "/work?group=other" },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [y, setY] = useState(0);

  const recomputeY = () => {
    const rail = railRef.current;
    const card = cardRef.current;
    const item = itemRefs.current[active];
    if (!rail || !card || !item) return;

    const itemRect = item.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();

    const itemCenterY = itemRect.top - railRect.top + itemRect.height / 2;
    const desiredTop = itemCenterY - card.offsetHeight / 2;

    const maxTop = Math.max(0, rail.offsetHeight - card.offsetHeight);
    const clamped = Math.min(Math.max(desiredTop, 0), maxTop);

    setY(clamped);
  };

  useEffect(() => {
    recomputeY();
    const onScroll = () => recomputeY();
    const onResize = () => recomputeY();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)] border-t border-[color:var(--page-border)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT: list */}
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Work
            </p>

            <div className="mt-10 border-t border-[color:var(--page-border)]">
              {items.map((item, idx) => {
                const isActive = idx === active;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(node) => {
                      itemRefs.current[idx] = node;
                    }}
                    onMouseEnter={() => setActive(idx)}
                    onFocus={() => setActive(idx)}
                    className="group block border-b border-[color:var(--page-border)] py-10 focus:outline-none"
                  >
                    <div className="flex items-end justify-between gap-8">
                      {/* TITLE */}
                      <div className="min-w-0">
                        <h3
                          className={[
                            "font-[var(--font-sans)]",
                            "text-[clamp(44px,5.1vw,84px)] leading-[0.92] tracking-[-0.04em]",
                            // always black-ish in light mode; in dark mode it will be light via --page-fg
                            isActive
                              ? "text-[color:var(--page-fg)]"
                              : "text-[color:var(--page-fg)]/80",
                            "transition-colors duration-200",
                          ].join(" ")}
                        >
                          {item.label}
                        </h3>

                        {/* editorial micro underline (A24-ish) */}
                        <div
                          className={[
                            "mt-4 h-px w-0 bg-[color:var(--page-fg)]/35",
                            "transition-all duration-300 ease-out",
                            isActive ? "w-16" : "group-hover:w-12",
                          ].join(" ")}
                        />
                      </div>

                      {/* OPEN */}
                      <span
                        className={[
                          "shrink-0 text-[11px] uppercase tracking-[0.32em]",
                          "text-[color:var(--page-fg)]/55 group-hover:text-[color:var(--page-fg)]/85",
                          "transition-colors",
                        ].join(" ")}
                      >
                        Open{" "}
                        <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <p className="mt-8 text-sm text-[color:var(--page-muted)]">
              Hover to preview. Click to open the full set.
            </p>
          </div>

          {/* RIGHT: preview zone */}
          <div className="relative col-span-12 hidden lg:block lg:col-span-5">
            <div ref={railRef} className="relative h-full">
              <div
                ref={cardRef}
                className={[
                  "absolute",
                  // Make it smaller and more intentional
                  "right-0 w-[88%]",
                  // Slight overlap into the left column (editorial feel)
                  "-translate-x-6",
                  "rounded-[28px] border border-[color:var(--page-border)]",
                  "bg-[color:var(--page-bg)]",
                  "shadow-[0_55px_160px_rgba(0,0,0,0.16)]",
                  "overflow-hidden",
                  "will-change-transform",
                ].join(" ")}
                style={{ transform: `translateY(${y}px) translateX(-24px)` }}
              >
                {/* Preview surface */}
                <div className="relative aspect-[4/5] bg-black/10">
                  {/* placeholder image block */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/25" />

                  {/* grain overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
                    }}
                  />
                </div>

                {/* Footer meta */}
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-fg)]/55">
                    Preview
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-fg)]/55">
                    {items[active]?.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /preview */}
        </div>
      </div>
    </section>
  );
}
