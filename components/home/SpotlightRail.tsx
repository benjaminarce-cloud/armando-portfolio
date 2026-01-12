"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/projects";

type Item = (typeof projects)[number];

export default function SpotlightRail() {
  const items = useMemo(() => projects.slice(0, 8), []);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Find the item closest to center on scroll (spotlight logic)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        let best = { idx: 0, dist: Number.POSITIVE_INFINITY };

        cardRefs.current.forEach((node, idx) => {
          if (!node) return;
          const r = node.getBoundingClientRect();
          const cardCenter = r.left + r.width / 2;
          const dist = Math.abs(cardCenter - centerX);
          if (dist < best.dist) best = { idx, dist };
        });

        setActive(best.idx);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // On first mount, center the first card a bit
  useEffect(() => {
    const el = scrollerRef.current;
    const first = cardRefs.current[0];
    if (!el || !first) return;
    el.scrollLeft = 12;
  }, []);

  return (
    <section className="border-t border-[color:var(--page-border)] bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Featured
            </p>

            <h2 className="font-display editorial-title mt-4 text-[clamp(38px,5.6vw,72px)] leading-[0.95] tracking-[-0.03em]">
              Selected work.
            </h2>

            <p className="mt-4 max-w-xl text-sm text-[color:var(--page-muted)]">
              Hover to preview. Tap to open.
            </p>
          </div>

          <Link
            href="/work"
            className="hidden text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] hover:text-[color:var(--accent)] md:block"
          >
            View all work
          </Link>
        </div>

        <div className="mt-10">
          <div
            ref={scrollerRef}
            className={[
              "flex gap-4",
              "overflow-x-auto overflow-y-visible",
              "py-8 pb-10",
              "px-1",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            ].join(" ")}
          >
            {items.map((p, idx) => {
              const isHot = idx === active;

              return (
                <div
                  key={p.slug}
                  ref={(node) => {
                    cardRefs.current[idx] = node;
                  }}
                  onMouseEnter={() => setActive(idx)}
                  className={[
                    "group relative shrink-0 scroll-mx-6 snap-center",
                    isHot ? "z-20" : "z-10",
                  ].join(" ")}
                  style={{ scrollSnapAlign: "center" }}
                >
                  {/* OUTER glow (theme-aware) */}
                  {isHot && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[color:var(--page-fg)] blur-2xl opacity-[0.08]"
                    />
                  )}

                  <RailCard p={p} isActive={isHot} />
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)]">
            <span className="hidden sm:inline">Swipe / scroll</span>
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[color:var(--page-border)]" />
              <Link href="/work" className="hover:text-[color:var(--accent)]">
                Explore all
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RailCard({ p, isActive }: { p: Item; isActive: boolean }) {
  // Only load video when spotlighted (perf)
  const showVideo = isActive && Boolean((p as any).previewSrc);

  const previewSrc = (p as any).previewSrc as string | undefined;
  const posterSrc =
    ((p as any).posterSrc as string | undefined) ?? (p as any).coverSrc;

  return (
    <Link
      href={`/work/${p.slug}`}
      className={[
        "relative block rounded-3xl overflow-hidden",
        "border border-[color:var(--page-border)]",
        "bg-[color:var(--page-card)]",
        "transform-gpu will-change-transform",
        "transition-[transform,opacity,border-color,box-shadow] duration-300 ease-out",
        isActive
          ? "opacity-100 -translate-y-2 scale-[1.05] shadow-[0_40px_140px_rgba(0,0,0,0.35)]"
          : "opacity-90 scale-[0.985] hover:opacity-100 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_26px_90px_rgba(0,0,0,0.25)]",
      ].join(" ")}
    >
      {/* Vertical reel frame */}
      <div className="relative w-[240px] sm:w-[260px] md:w-[300px] lg:w-[320px]">
        <div className="relative aspect-[9/16] bg-black">
          {showVideo && previewSrc ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={previewSrc}
              poster={posterSrc}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
            />
          ) : (
            <Image
              src={posterSrc}
              alt={`${p.title} poster frame`}
              fill
              sizes="320px"
              className="object-cover"
              priority={isActive}
            />
          )}

          {/* Keep poster text ALWAYS readable (never theme-flips) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">
              {(p as any).category} • {p.year}
            </p>

            <h3 className="font-display editorial-title mt-2 text-[clamp(22px,2.2vw,30px)] text-white">
              {p.title}
            </h3>

            {(p as any).role ? (
              <p className="mt-2 text-sm text-white/70">{(p as any).role}</p>
            ) : null}

            <div className="mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/65">
              <span className="h-px w-10 bg-white/20" />
              <span
                className={[
                  "transition-colors",
                  isActive ? "text-[var(--accent)]" : "group-hover:text-white",
                ].join(" ")}
              >
                Watch
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
