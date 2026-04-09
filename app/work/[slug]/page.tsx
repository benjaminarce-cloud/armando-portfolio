// app/work/[slug]/page.tsx
"use client";

import { notFound, useSearchParams } from "next/navigation";
import { projects } from "@/lib/projects";
import { useEffect, useRef, use } from "react";

export default function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const autoplay = searchParams.get("autoplay") === "true";
  const videoRef = useRef<HTMLVideoElement>(null);

  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  // Prefer full video, else preview, else nothing
  const src = p.videoSrc ?? p.previewSrc ?? null;

  useEffect(() => {
    if (!autoplay || !videoRef.current) return;

    const video = videoRef.current;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Wait for video to be ready
    const handleLoadedMetadata = async () => {
      try {
        // Always play the video
        await video.play();
        
        // Only request fullscreen on desktop
        if (!isMobile) {
          if (video.requestFullscreen) {
            await video.requestFullscreen();
          } else if ((video as any).webkitRequestFullscreen) {
            // Safari
            await (video as any).webkitRequestFullscreen();
          } else if ((video as any).mozRequestFullScreen) {
            // Firefox
            await (video as any).mozRequestFullScreen();
          } else if ((video as any).msRequestFullscreen) {
            // IE/Edge
            await (video as any).msRequestFullscreen();
          }
        }
      } catch (err) {
        console.log("Autoplay/fullscreen failed:", err);
        // Fallback: just play without fullscreen if it fails
        try {
          await video.play();
        } catch (playErr) {
          console.log("Autoplay failed:", playErr);
        }
      }
    };

    if (video.readyState >= 2) {
      // Metadata already loaded
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, [autoplay]);

  return (
    <main className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--page-fg)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-12">
        {/* Video */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[color:var(--page-border)] bg-[color:var(--page-card)]">
          {src ? (
            <video
              ref={videoRef}
              className="h-full w-full"
              controls
              playsInline
              preload="metadata"
              poster={p.coverSrc}
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="aspect-video grid place-items-center">
              <p className="text-sm text-[color:var(--page-muted)]">
                Video coming soon.
              </p>
            </div>
          )}
        </div>

        {p.fullVideoUrl ? (
          <div className="mt-8 border-t border-[color:var(--page-border)] pt-6">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--page-muted)]">
              Full Version
            </p>
            <a
              href={p.fullVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 inline-flex flex-wrap items-end gap-x-4 gap-y-2"
            >
              <span className="editorial-title text-[clamp(28px,3.8vw,48px)] leading-[0.9] tracking-[-0.03em] text-[color:var(--page-fg)]">
                Watch the full film on YouTube
              </span>
              <span className="mb-1 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[color:var(--page-muted)] transition-colors group-hover:text-[color:var(--page-fg)]">
                <span className="h-px w-10 bg-[color:var(--page-border)] transition-colors group-hover:bg-[color:var(--page-fg)]" />
                <span>Open</span>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </main>
  );
}
