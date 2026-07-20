"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

export type IndexGroup = {
  id: string;
  label: string;
  items: Project[];
};

// 16:9 matches the source footage, so the poster and the video both fill the
// frame — any other ratio letterboxes the poster before playback starts.
const PREVIEW_W = 340;
const PREVIEW_H = 191;

export default function WorkIndex({ groups }: { groups: IndexGroup[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Position the preview directly rather than through state — a state update
  // on every mousemove would re-render the whole index.
  const handleMove = useCallback((event: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;

    const x = Math.min(event.clientX + 32, window.innerWidth - PREVIEW_W - 20);
    const y = Math.min(
      Math.max(event.clientY - PREVIEW_H / 2, 20),
      window.innerHeight - PREVIEW_H - 20
    );

    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  return (
    <div onMouseMove={handleMove} onMouseLeave={() => setActive(null)}>
      {groups.map((group) => (
        <section key={group.id} className="mb-24 last:mb-0">
          <div className="flex items-baseline justify-between border-b border-[color:var(--rule)] pb-4">
            <h2 className="caps">{group.label}</h2>
            <span className="caps tabular-nums text-[color:var(--muted)]">
              {String(group.items.length).padStart(2, "0")}
            </span>
          </div>

          <ul className="index">
            {group.items.map((project, i) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="row grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-[color:var(--rule)] py-6 sm:gap-8"
                  onMouseEnter={() => setActive(project)}
                  onFocus={() => setActive(project)}
                >
                  <span className="caps tabular-nums text-[color:var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="index-title text-[13px] sm:text-[15px]">
                    {project.title}
                  </span>

                  <span className="caps tabular-nums text-[color:var(--muted)]">
                    {project.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div
        ref={previewRef}
        aria-hidden="true"
        className={active ? "preview is-visible" : "preview"}
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        {active ? (
          <video
            key={active.slug}
            className="h-full w-full bg-[color:var(--rule)] object-cover"
            src={active.previewSrc ?? active.videoSrc}
            poster={active.coverSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        ) : null}
      </div>
    </div>
  );
}
