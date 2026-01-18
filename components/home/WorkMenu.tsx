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

  // Pick preview media: prefer a project's previewSrc mp4 in that group, else poster
  const inGroup = projects.filter((p) => p.group === (activeGroup.id as GroupId));
  const video = inGroup.find((p) => p.previewSrc)?.previewSrc;
  const poster = groupPosterSrc(activeGroup.id as GroupId, projects);

  return (
    <section
      ref={sectionRef as any}
      className="bg-[color:var(--page-bg)] text-[color:var(--page-fg)] border-t border-[color:var(--page-border)]"
    >
      {/* allow bleed */}
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
                          "text-[clamp(44px,5.2vw,88px)] leading-[0.94] tracking-[-0.04em]",
                          // slower, more editorial fade
                          "transition-colors duration-500 ease-out",
                          isActive
                            ? "text-[color:var(--page-fg)]"
                            : "text-[color:var(--page-fg)]/40",
                          "group-hover:text-[color:var(--page-fg)]",
                        ].join(" ")}
                      >
                        {item.label}
                      </h3>

                      <span className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-fg)]/50 group-hover:text-[color:var(--page-fg)] transition-colors duration-500">
                        Open{" "}
                        <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
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

          {/* RIGHT: projection wall (bleeds into viewport) */}
          <div className="relative col-span-12 hidden lg:block lg:col-span-6 overflow-visible">
            <div ref={railRef} className="relative h-full overflow-visible">
              {/* Big translucent word behind everything */}
              <div className="pointer-events-none absolute inset-0 overflow-visible">
                <div
                  className="
                    absolute
                    right-[-10vw] xl:right-[-16vw]
                    top-6
                    font-[var(--font-sans)]
                    text-[clamp(120px,9.2vw,210px)]
                    leading-none tracking-[-0.06em]
                    text-[color:var(--page-fg)]/10
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
                  // bleed outside max-w container:
                  "right-[-10vw] xl:right-[-16vw]",
                  "w-[calc(100%+10vw)] xl:w-[calc(100%+16vw)]",
                  // tall ceilings:
                  "h-[clamp(520px,72vh,860px)]",
                  // feel less “UI card”
                  "rounded-[22px] overflow-hidden",
                  // motion feel:
                  "will-change-transform",
                  // faster snap on the projection, text eases slower:
                  "transition-transform duration-200 ease-out",
                ].join(" ")}
                style={{
                  // Keystone / projector perspective:
                  transform: `translateY(${y}px) perspective(1400px) rotateY(-7deg) rotateZ(-0.8deg) skewY(-0.8deg)`,
                  transformOrigin: "left center",
                }}
              >
                {/* Media layer */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `translateY(${parallax}px) scale(1.03)`,
                      // make it feel less “web video”, more “projected”
                      filter:
                        "contrast(1.08) saturate(0.92) brightness(0.92)",
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
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={poster}
                        alt={`${activeGroup.label} preview`}
                        fill
                        sizes="(max-width: 1024px) 60vw, 50vw"
                        className="object-cover"
                        priority={false}
                      />
                    )}
                  </div>
                </div>

                {/* Projection artifacts (this is the A24 sauce) */}
                <div className="pointer-events-none absolute inset-0">
                  {/* edge softness + vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(120%_110%_at_52%_45%,rgba(255,255,255,0.10),rgba(0,0,0,0.78))]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* projector spill glow (outside feel) */}
                  <div className="absolute -inset-10 opacity-40 blur-3xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.16),transparent)]" />

                  {/* subtle vertical banding */}
                  <div
                    className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.00) 1px, rgba(255,255,255,0.00) 10px)",
                    }}
                  />

                  {/* dust / grain */}
                  <div
                    className="absolute inset-0 opacity-[0.13] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.40%22/></svg>')",
                    }}
                  />

                  {/* subtle inner edge darkening (makes it feel projected) */}
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_70px_rgba(0,0,0,0.55)]" />

                  {/* tiny lens flare */}
                  <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
                </div>

                {/* label stamp (film label, not UI) */}
                <div className="absolute left-6 bottom-5 flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.34em] text-white/68">
                    Preview
                  </span>
                  <span className="h-px w-10 bg-white/20" />
                  <span className="text-[10px] uppercase tracking-[0.34em] text-white/68">
                    {activeGroup.label}
                  </span>
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
