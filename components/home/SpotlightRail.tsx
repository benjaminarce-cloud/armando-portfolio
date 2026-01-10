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
    // subtle nudge so it doesn't start awkwardly left
    el.scrollLeft = 12;
  }, []);

  return (
    <section className="bg-[#0A0A0C] text-[#F3F2EE] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              Featured
            </p>
            <h2 className="font-display editorial-title mt-4 text-[clamp(34px,4.2vw,56px)]">
              Scroll the reel.
            </h2>
            <p className="mt-4 max-w-xl text-white/60">
              Hover to preview. Tap to open the project.
            </p>
          </div>

          <Link
            href="/work"
            className="hidden text-[11px] uppercase tracking-[0.28em] text-white/55 hover:text-[var(--accent)] md:block"
          >
            View all work
          </Link>
        </div>

        <div className="mt-10">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((p, idx) => (
              <div
                key={p.slug}
                ref={(node) => {
                  cardRefs.current[idx] = node;
                }}
                onMouseEnter={() => setActive(idx)}
                className={[
                  "group relative shrink-0 scroll-mx-6",
                  "snap-center",
                  idx === active ? "z-10" : "z-0",
                ].join(" ")}
                style={{ scrollSnapAlign: "center" }}
              >
                <RailCard p={p} isActive={idx === active} />
              </div>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/55">
            <span className="hidden sm:inline">Swipe / scroll</span>
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-white/15" />
              <Link href="/work" className="hover:text-[var(--accent)]">
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
  const showVideo = isActive && Boolean(p.previewSrc);

  return (
    <Link
      href={`/work/${p.slug}`}
      className={[
        "block rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden",
        "transition duration-700 ease-out",
        isActive ? "scale-[1.02] border-white/20" : "scale-[0.98] opacity-80 hover:opacity-95",
      ].join(" ")}
    >
      {/* Vertical reel frame */}
      <div className="relative w-[240px] sm:w-[260px] md:w-[300px] lg:w-[320px]">
        <div className="relative aspect-[9/16] bg-black">
          {showVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
             src={p.previewSrc}
poster={p.posterSrc ?? p.coverSrc}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
            />
          ) : (
            <Image
              src={p.posterSrc ?? p.coverSrc}
              alt={`${p.title} poster frame`}
              fill
              sizes="320px"
              className="object-cover"
              priority={isActive}
            />
          )}

          {/* overlay gradient + meta */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
              {p.category} • {p.year}
            </p>
            <h3 className="font-display editorial-title mt-2 text-[clamp(22px,2.2vw,30px)]">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-white/60">{p.role}</p>

            <div className="mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/55">
              <span className="h-px w-10 bg-white/15" />
              <span className={isActive ? "text-[var(--accent)]" : "group-hover:text-white"}>
                Watch
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
