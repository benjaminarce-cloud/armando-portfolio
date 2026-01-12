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
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Work
            </p>

            <div className="mt-10 border-t border-[color:var(--page-border)]">
              {items.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(node) => {
                    itemRefs.current[idx] = node;
                  }}
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className="group relative block border-b border-[color:var(--page-border)] py-10 focus:outline-none"
                >
                  <div className="flex items-end justify-between gap-6">
                    <div className="min-w-0">
                      {/* Title */}
                      <h3
                        className={[
                          "font-[var(--font-sans)]",
                          "text-[clamp(44px,5.2vw,84px)] leading-[0.93] tracking-[-0.035em]",
                          // A24 rhythm: quiet gray -> loud black
                          idx === active
                            ? "text-[color:var(--page-fg)]"
                            : "text-[color:var(--page-muted)]",
                          "transition-colors duration-200",
                          "group-hover:text-[color:var(--page-fg)]",
                        ].join(" ")}
                      >
                        {item.label}
                      </h3>

                      {/* tiny underline accent on active */}
                      <div className="mt-4 h-px w-14 bg-[color:var(--page-border)]">
                        <div
                          className={[
                            "h-px bg-[color:var(--page-fg)] transition-all duration-300",
                            idx === active ? "w-14 opacity-60" : "w-0 opacity-0",
                            "group-hover:w-14 group-hover:opacity-40",
                          ].join(" ")}
                        />
                      </div>
                    </div>

                    {/* Open */}
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)] group-hover:text-[color:var(--page-fg)] transition-colors">
                      Open{" "}
                      <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-sm text-[color:var(--page-muted)]">
              Hover to preview. Click to open the full set.
            </p>
          </div>

          {/* RIGHT: sticky preview zone */}
          <div className="relative col-span-12 hidden lg:block lg:col-span-5">
            <div
              ref={railRef}
              className="
                sticky top-28
                h-[calc(100vh-8rem)]
                overflow-visible
              "
            >
              <div
                ref={cardRef}
                className={[
                  "absolute",
                  // overlap into left column a bit (kills template vibe)
                  "-left-10 right-0",
                  // smaller + more poster-ish
                  "max-w-[420px]",
                  "rounded-[28px] border border-[color:var(--page-border)]",
                  "bg-[color:var(--page-card)]",
                  "shadow-[0_45px_120px_rgba(0,0,0,0.14)]",
                  "overflow-hidden",
                  "will-change-transform",
                ].join(" ")}
                style={{ transform: `translateY(${y}px)` }}
              >
                {/* Placeholder preview */}
                <div className="aspect-[4/5] bg-gradient-to-b from-black/10 to-black/30" />

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                    Preview
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
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
