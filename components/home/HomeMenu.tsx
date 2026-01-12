"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
  previewSrc: string; // static best frame
  year?: string;
};

export default function HomeMenu() {
  const items: MenuItem[] = useMemo(
    () => [
      {
        label: "SDSU Basketball",
        href: "/work?group=sdsu",
        previewSrc: "/img/previews/sdsu.jpg",
      },
      {
        label: "NIL",
        href: "/work?group=nil",
        previewSrc: "/img/previews/nil.jpg",
      },
      {
        label: "Freelance",
        href: "/work?group=freelance",
        previewSrc: "/img/previews/freelance.jpg",
      },
      {
        label: "Other",
        href: "/work?group=other",
        previewSrc: "/img/previews/other.jpg",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-[color:var(--page-border)] bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: big menu */}
          <div className="lg:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Work
            </p>

            <ul className="mt-8 space-y-2">
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

                      {/* tiny “open” on the right, A24-ish */}
                      <span className="ml-4 inline-flex translate-y-[-0.55em] items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                        Open
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </span>

                      {/* underline hairline */}
                      <span className="mt-4 block h-px w-full bg-[color:var(--page-border)]" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 max-w-md text-sm text-[color:var(--page-muted)]">
              Hover to preview. Click to open the full set.
            </p>
          </div>

          {/* Right: preview */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--page-border)] bg-[color:var(--page-card)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={items[active].previewSrc}
                  alt={`${items[active].label} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>

              <div className="flex items-center justify-between px-6 py-5">
                <div className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                  Preview
                </div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
                  {items[active].label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
