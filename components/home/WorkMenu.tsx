"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { WORK_GROUPS, GroupId, groupPosterSrc } from "@/lib/workGroups";

export default function WorkMenu() {
  const items = useMemo(() => WORK_GROUPS, []);

  const [active, setActive] = useState(0);

  // Refs to measure positions
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null); // right column (relative)
  const cardRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [y, setY] = useState(0);
  const [parallax, setParallax] = useState(0);

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

  // keep preview aligned to hovered row
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

  // micro parallax (subtle)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const tick = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const t = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(1, Math.max(0, t));

      setParallax((clamped - 0.5) * 12); // px
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeGroup = items[active];
  const poster = groupPosterSrc(activeGroup.id as GroupId, projects);

  return (
    <section
      ref={sectionRef as any}
      className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)] border-t border-[color:var(--page-border)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-10">
          {/* LEFT: list */}
          <div className="col-span-12 lg:col-span-6">
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
                    <div className="flex items-end justify-between gap-6">
                      <h3
                        className={[
                          "font-[var(--font-sans)]",
                          "text-[clamp(44px,5.2vw,88px)] leading-[0.94] tracking-[-0.04em]",
                          isActive
                            ? "text-[color:var(--page-fg)]"
                            : "text-[color:var(--page-muted)]",
                          "transition-colors duration-200",
                          "group-hover:text-[color:var(--page-fg)]",
                        ].join(" ")}
                      >
                        {item.label}
                      </h3>

                      <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)] group-hover:text-[color:var(--page-fg)] transition-colors">
                        Open{" "}
                        <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform">
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
          <div className="relative col-span-12 hidden lg:block lg:col-span-6">
            <div ref={railRef} className="relative h-full">
              <div
                ref={cardRef}
                className={[
                  "absolute",
                  "right-0",
                  "w-[92%]",
                  "max-w-[560px]",
                  "rounded-3xl border border-[color:var(--page-border)]",
                  "bg-[color:var(--page-card)] shadow-[0_50px_140px_rgba(0,0,0,0.18)]",
                  "overflow-hidden",
                  "will-change-transform",
                  "transition-transform duration-260 ease-out",
                ].join(" ")}
                style={{ transform: `translateY(${y}px)` }}
              >
                {/* Poster area */}
                <div className="relative aspect-[16/11]">
                  {/* image */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: `translateY(${parallax}px)` }}
                  >
                    <Image
                      src={poster}
                      alt={`${activeGroup.label} preview`}
                      fill
                      sizes="(max-width: 1024px) 40vw, 28vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>

                  {/* big translucent word */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    <div className="absolute left-6 right-6 bottom-6">
                      <div className="relative">
                        <div
                          className="
                            absolute -top-10 left-0
                            font-[var(--font-sans)]
                            text-[56px]
                            leading-none
                            tracking-[-0.05em]
                            text-white/25
                            select-none
                            whitespace-nowrap
                            blur-[0.2px]
                          "
                        >
                          {activeGroup.label}
                        </div>
                        <div className="h-10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                    Preview
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                    {activeGroup.label}
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
