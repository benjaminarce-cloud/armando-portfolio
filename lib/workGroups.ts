// lib/workGroups.ts
import type { Project } from "@/lib/projects";

export type GroupId = "sdsu" | "nil" | "freelance" | "other";

export type WorkGroup = {
  id: GroupId;
  label: string;
  href: string; // where menu item goes
  posterSrc?: string; // you’ll set these 4 soon
};

/**
 * You will replace posterSrc values when you send the 4 curated posters.
 * For now, it will fallback to the first project cover inside that group.
 */
export const WORK_GROUPS: WorkGroup[] = [
  { id: "sdsu", label: "SDSU Basketball", href: "/work?group=sdsu" },
  { id: "nil", label: "NIL", href: "/work?group=nil" },
  { id: "freelance", label: "Freelance", href: "/work?group=freelance" },
  { id: "other", label: "Other", href: "/work?group=other" },
];

/**
 * IMPORTANT:
 * This is the ONLY place you decide grouping right now.
 * Update this mapping as your client tells you what belongs where.
 */
export const PROJECT_GROUP_BY_SLUG: Record<string, GroupId> = {
  // ✅ pretty safe
  "nil-campaign": "nil",

  // TODO: update these once you confirm
  "run-club": "sdsu",
  "cam-ward": "sdsu",
  "off-szn": "sdsu",
  "recap": "sdsu",
  "the-madness": "sdsu",
  "basketball": "sdsu",
};

export function getProjectGroup(p: Project): GroupId {
  return PROJECT_GROUP_BY_SLUG[p.slug] ?? "other";
}

export function filterProjectsByGroup(projects: Project[], group?: string) {
  if (!group) return projects;
  const g = group as GroupId;
  return projects.filter((p) => getProjectGroup(p) === g);
}

export function groupPosterSrc(groupId: GroupId, projects: Project[]) {
  const group = WORK_GROUPS.find((g) => g.id === groupId);
  if (group?.posterSrc) return group.posterSrc;

  // fallback: first project cover in this group
  const first = projects.find((p) => getProjectGroup(p) === groupId);
  return first?.coverSrc ?? "/img/hero-poster.jpg";
}
