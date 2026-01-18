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
  const projRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [y, setY] = useState(0);
  const [parallax, setParallax] = useState(0);

  const recomputeY = () => {
    const rail = railRef.current;
    const proj = projRef.current;
    const item = itemRefs.current[active];
    if (!rail || !proj || !item) return;

    const itemRect = item.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();

    const itemCenterY = itemRect.top - railRect.top + itemRect.height / 2;
    const desiredTop = itemCenterY - proj.offsetHeight / 2;

    const maxTop = Math.max(0, rail.offsetHeight - proj.offsetHeight);
    const clamped = Math.min(Math.max(desiredTop, 0), maxTop);

    setY(clamped);
  };

  // keep projection aligned to hovered row
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

      setParallax((clamped - 0.5) * 10); // px
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

  // Pick preview media: prefer a project's previewSrc mp4 in that group, else poster
  const inGroup = projects.filter((p) => p.group === (activeGroup.id as GroupId));
  const video = inGroup.find((p) => p.previewSrc)?.previewSrc;
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

          {/* RIGHT: projector spill */}
          <div className="relative col-span-12 hidden lg:block lg:col-span-6">
            <div ref={railRef} className="relative h-full">
              {/* Big translucent word behind everything */}
              <div className="pointer-events-none absolute inset-0 overflow-visible">
                <div
                  className="
                    absolute right-[-2vw] top-8
                    font-[var(--font-sans)]
                    text-[clamp(100px,8.6vw,180px)]
                    leading-none tracking-[-0.06em]
                    text-[color:var(--page-fg)]/10
                    select-none whitespace-nowrap
                  "
                >
                  {activeGroup.label}
                </div>
              </div>

              {/* Projection - now fills the full right column */}
              <div
                ref={projRef}
                className={[
                  "absolute right-0",
                  "w-full", // IMPORTANT: full column width
                  "rounded-[28px] overflow-hidden",
                  "will-change-transform",
                  "transition-transform duration-300 ease-out",
                ].join(" ")}
                style={{
                  transform: `translateY(${y}px)`,
                }}
              >
                {/* Aspect container */}
                <div className="relative aspect-[16/9]">
                  {/* media layer */}
                  <div
                    className="absolute inset-0"
                    style={{ transform: `translateY(${parallax}px) scale(1.03)` }}
                  >
                    {video ? (
                      <video
                        key={video}
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={poster}
                        alt={`${activeGroup.label} preview`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover"
                        priority={false}
                      />
                    )}
                  </div>

                  {/* projector vignette + spill */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* soft edge vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_40%,rgba(255,255,255,0.10),rgba(0,0,0,0.55))]" />
                    {/* bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    {/* subtle grain */}
                    <div
                      className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
                      }}
                    />
                    {/* tiny highlight like lens flare */}
                    <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                  </div>

                  {/* label stamp (minimal) */}
                  <div className="absolute left-6 bottom-5 flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                      Preview
                    </span>
                    <span className="h-px w-10 bg-white/20" />
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                      {activeGroup.label}
                    </span>
                  </div>
                </div>
              </div>
              {/* /Projection */}
            </div>
          </div>
          {/* /right */}
        </div>
      </div>
    </section>
  );
}
