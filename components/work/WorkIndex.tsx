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
const PREVIEW_W = 320;
const PREVIEW_H = 180;

export default function WorkIndex({ groups }: { groups: IndexGroup[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Position the preview directly rather than through state — a state update
  // on every mousemove would re-render the whole index.
  const handleMove = useCallback((event: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;

    const x = Math.min(event.clientX + 28, window.innerWidth - PREVIEW_W - 16);
    const y = Math.min(
      Math.max(event.clientY - PREVIEW_H / 2, 16),
      window.innerHeight - PREVIEW_H - 16
    );

    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  return (
    <div onMouseMove={handleMove} onMouseLeave={() => setActive(null)}>
      {groups.map((group) => (
        <section key={group.id} className="mb-20 last:mb-0">
          <h2 className="label">{group.label}</h2>

          <ul className="mt-6 border-t border-[color:var(--rule)]">
            {group.items.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="row flex items-baseline justify-between gap-8 border-b border-[color:var(--rule)] py-3"
                  onMouseEnter={() => setActive(project)}
                  onFocus={() => setActive(project)}
                >
                  <span className="row-title text-[15px] leading-snug sm:text-[17px]">
                    {project.title}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-[color:var(--muted)]">
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
