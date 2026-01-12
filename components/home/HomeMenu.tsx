"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
  previewSrc: string;
};

type Pos = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function HomeMenu() {
  const items: MenuItem[] = useMemo(
    () => [
      { label: "SDSU Basketball", href: "/work?group=sdsu", previewSrc: "/img/previews/sdsu.jpg" },
      { label: "NIL", href: "/work?group=nil", previewSrc: "/img/previews/nil.jpg" },
      { label: "Freelance", href: "/work?group=freelance", previewSrc: "/img/previews/freelance.jpg" },
      { label: "Other", href: "/work?group=other", previewSrc: "/img/previews/other.jpg" },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const { clientX, clientY } = e;
    rafRef.current = requestAnimationFrame(() => {
      // preview box size (keep in sync with styles below)
      const w = 420;
      const h = 260;

      // keep it inside the viewport with margin
      const x = clamp(clientX + 28, 16, window.innerWidth - w - 16);
      const y = clamp(clientY - h / 2, 16, window.innerHeight - h - 16);

      setPos({ x, y });
    });
  };

  return (
    <section className="border-t border-[color:var(--page-border)] bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: big menu */}
          <div className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Work
            </p>

            <ul
              className="mt-8 space-y-2"
              onMouseMove={onMove}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              {items.map((it, idx) => {
                const isActive = idx === active;
                return (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      className={[
                        "group relative block",
                        "py-3",
                        "transition-opacity",
                        isActive ? "opacity-100" : "opacity-55 hover:opacity-85",
                      ].join(" ")}
                    >
                      <span
                        className="
                          font-[var(--font-sans)]
                          font-black
                          tracking-[-0.03em]
                          text-[clamp(44px,6.4vw,92px)]
                          leading-[0.95]
                        "
                      >
                        {it.label}
                      </span>

                      <span className="ml-4 inline-flex translate-y-[-0.55em] items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                        Open
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </span>

                      <span className="mt-4 block h-px w-full bg-[color:var(--page-border)]" />
                    </Link>

                    {/* Mobile inline preview (no floating cursor preview on touch) */}
                    {isActive && (
                      <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--page-border)] bg-[color:var(--page-card)] lg:hidden">
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={items[active].previewSrc}
                            alt={`${items[active].label} preview`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 max-w-md text-sm text-[color:var(--page-muted)]">
              Hover to preview. Click to open the full set.
            </p>
          </div>

          {/* Right column: intentionally empty on desktop now (avoid “template frame”) */}
          <div className="hidden lg:col-span-5 lg:block" />
        </div>
      </div>

      {/* Floating preview (desktop only) */}
      <div
        className={[
          "pointer-events-none fixed z-[60] hidden lg:block",
          show ? "opacity-100" : "opacity-0",
          "transition-opacity duration-150",
        ].join(" ")}
        style={{ left: pos.x, top: pos.y, width: 420 }}
        aria-hidden="true"
      >
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-black/5 shadow-[0_40px_140px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[16/10]">
            <Image
              src={items[active].previewSrc}
              alt=""
              fill
              sizes="420px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/70">Preview</div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/70">
              {items[active].label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
