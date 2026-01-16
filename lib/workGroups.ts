// lib/workGroups.ts
import type { Project } from "@/lib/projects";

export type GroupId = "basketball" | "freelance" | "other";

export type WorkGroup = {
  id: GroupId;
  label: string;
  href: string;
};

export const WORK_GROUPS: WorkGroup[] = [
  { id: "basketball", label: "Basketball", href: "/work?group=basketball" },
  { id: "freelance", label: "Freelance", href: "/work?group=freelance" },
  { id: "other", label: "Other", href: "/work?group=other" },
];

export function isGroupId(x: string | null): x is GroupId {
  return x === "basketball" || x === "freelance" || x === "other";
}

/**
 * Returns a poster/cover image for the group preview card.
 * Priority:
 * 1) first project in that group that has posterSrc
 * 2) else coverSrc
 * 3) else fallback (you can change this path)
 */
export function groupPosterSrc(group: GroupId, projects: Project[]) {
  const inGroup = projects.filter((p) => p.group === group);

  const withPoster = inGroup.find((p) => (p as any).posterSrc);
  if (withPoster && (withPoster as any).posterSrc) return (withPoster as any).posterSrc as string;

  const withCover = inGroup.find((p) => p.coverSrc);
  if (withCover?.coverSrc) return withCover.coverSrc;

  return "/img/hero-poster.jpg";
}
