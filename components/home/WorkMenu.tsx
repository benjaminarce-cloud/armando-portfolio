"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { WORK_GROUPS, GroupId, groupPosterSrc } from "@/lib/workGroups";

export default function WorkMenu() {
  const items = useMemo(() => WORK_GROUPS, []);
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const projRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [y, setY] = useState(0);
  const [parallax, setParallax] = useState(0);
  const [projH, setProjH] = useState<number>(640);

  const recomputeLayout = () => {
    const rail = railRef.current;
    const proj = projRef.current;
    const item = itemRefs.current[active];
    if (!rail || !proj || !item) return;

    // 1) Make the projection "tall ceilings"
    //    - Target: big, but still comfortably inside the section
    const railH = rail.getBoundingClientRect().height;
    const target = Math.round(window.innerHeight * 0.78); // taller than before
    const minH = 560;
    const maxH = Math.max(minH, Math.floor(railH)); // never exceed rail
    const nextH = Math.min(maxH, Math.max(minH, target));
    if (Math.abs(nextH - projH) > 1) setProjH(nextH);

    // 2) Keep the projection aligned to hovered row center
    const itemRect = item.getBoundingClientRect();
    const railRect = rail.getBoundingClientRect();

    const itemCenterY = itemRect.top - railRect.top + itemRect.height / 2;
    const desiredTop = itemCenterY - nextH / 2;

    const maxTop = Math.max(0, railH - nextH);
    const clamped = Math.min(Math.max(desiredTop, 0), maxTop);

    setY(clamped);
  };

  useEffect(() => {
    recomputeLayout();

    const onScroll = () => recomputeLayout();
    const onResize = () => recomputeLayout();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, projH]);

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
      setParallax((clamped - 0.5) * 10);
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

  const inGroup = projects.filter(
    (p) => p.group === (activeGroup.id as GroupId)
  );
  const video = inGroup.find((p) => p.previewSrc)?.previewSrc;
  const poster = groupPosterSrc(activeGroup.id as GroupId, projects);

  return (
    <section
      ref={sectionRef as any}
      className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)] border-t border-[color:var(--page-border)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12 overflow-visible">
        <div className="grid grid-cols-12 gap-10 overflow-visible">
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
                          "text-[clamp(44px,5.2vw,92px)] leading-[0.94] tracking-[-0.045em]",
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

          {/* RIGHT: tall projector bay */}
          <div className="relative col-span-12 hidden lg:block lg:col-span-6 overflow-visible">
            {/* Give the right side a real “bay” height so it can feel tall */}
            <div ref={railRef} className="relative min-h-[720px] h-full overflow-visible">
              {/* Big translucent word (stronger + more cinematic) */}
              <div className="pointer-events-none absolute inset-0 overflow-visible">
                <div
                  className="
                    absolute right-[-8vw] xl:right-[-14vw]
                    top-6
                    font-[var(--font-sans)]
                    text-[clamp(120px,9.5vw,210px)]
                    leading-none tracking-[-0.07em]
                    text-[color:var(--page-fg)]/12
                    select-none whitespace-nowrap
                  "
                >
                  {activeGroup.label}
                </div>
              </div>

              {/* Projection */}
              <div
                ref={projRef}
                className={[
                  "absolute",
                  "right-[-8vw] xl:right-[-14vw]",
                  "w-[calc(100%+8vw)] xl:w-[calc(100%+14vw)]",
                  "rounded-[32px] overflow-hidden",
                  "will-change-transform",
                  "transition-transform duration-300 ease-out",
                ].join(" ")}
                style={{
                  height: projH,
                  transform: `translateY(${y}px)`,
                }}
              >
                {/* Media fills the whole tall frame */}
                <div className="relative h-full w-full">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `translateY(${parallax}px) scale(1.03)`,
                    }}
                  >
                    {video ? (
                      <video
                        key={video}
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={poster}
                        alt={`${activeGroup.label} preview`}
                        fill
                        sizes="(max-width: 1024px) 60vw, 54vw"
                        className="object-cover"
                        priority={false}
                      />
                    )}
                  </div>

                  {/* projector feel: edge falloff + keystone hint + grain */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* subtle “keystone” vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_45%,rgba(255,255,255,0.12),rgba(0,0,0,0.62))]" />
                    {/* stronger bottom fade (film vibe) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {/* grain */}
                    <div
                      className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
                      }}
                    />
                    {/* lens bloom */}
                    <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                    {/* soft highlight rim */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                  </div>

                  {/* label stamp */}
                  <div className="absolute left-7 bottom-6 flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                      Preview
                    </span>
                    <span className="h-px w-12 bg-white/20" />
                    <span className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                      {activeGroup.label}
                    </span>
                  </div>
                </div>
              </div>
              {/* /Projection */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
