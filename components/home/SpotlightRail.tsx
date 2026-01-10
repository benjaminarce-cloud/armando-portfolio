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

  // On first mount, center the first card a bit (nice starting state)
  useEffect(() => {
    const el = scrollerRef.current;
    const first = cardRefs.current[0];
    if (!el || !first) return;
    el.scrollLeft = 12;
  }, []);

  return (
    <section className="border-t border-black/10 bg-[#F3F2EE] text-[#0A0A0C]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/55">
              Featured
            </p>

            <h2 className="font-display editorial-title mt-4 text-[clamp(38px,5.6vw,72px)] leading-[0.95] tracking-[-0.03em]">
              Selected work.
            </h2>

            <p className="mt-4 max-w-xl text-sm text-black/55">
              Hover to preview. Tap to open.
            </p>
          </div>

          <Link
            href="/work"
            className="hidden text-[11px] uppercase tracking-[0.28em] text-black/55 hover:text-black md:block"
          >
            View all work
          </Link>
        </div>

        <div className="mt-10">
          <div
            ref={scrollerRef}
            className={[
              "flex gap-4",
              "overflow-x-auto overflow-y-visible", // prevents top-edge clipping when scaled
              "py-10 pb-12", // more breathing room = more “poster wall” presence
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
                  {/* A24-ish “paper lift” glow (subtle, warm) */}
                  {isHot && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-6 rounded-[40px] bg-black/10 blur-2xl opacity-40"
                    />
                  )}

                  <RailCard p={p} isActive={isHot} />
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-black/55">
            <span className="hidden sm:inline">Swipe / scroll</span>
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-black/15" />
              <Link href="/work" className="hover:text-black">
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
        "transform-gpu will-change-transform",
        "transition-[transform,opacity,box-shadow] duration-300 ease-out",
        // White section = cards should feel like “glossy prints” on a table
        isActive
          ? "opacity-100 -translate-y-2 scale-[1.06] shadow-[0_36px_120px_rgba(0,0,0,0.22)]"
          : "opacity-80 scale-[0.99] hover:opacity-95 hover:-translate-y-1 hover:scale-[1.02] shadow-[0_18px_60px_rgba(0,0,0,0.14)]",
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

          {/* Softer “print” vignette so text reads without screaming */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* micro-border that reads like a photo edge */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/60">
              {(p as any).category} • {p.year}
            </p>

            <h3 className="font-display editorial-title mt-2 text-[clamp(22px,2.2vw,30px)]">
              {p.title}
            </h3>

            {(p as any).role ? (
              <p className="mt-2 text-sm text-white/65">{(p as any).role}</p>
            ) : null}

            <div className="mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/60">
              <span className="h-px w-10 bg-white/20" />
              <span className="transition-colors group-hover:text-white">
                Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
