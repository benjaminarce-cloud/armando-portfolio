// lib/workGroups.ts

export type GroupId = "basketball" | "freelance" | "other";

export type WorkGroup = {
  id: GroupId;
  label: string;
  href: string; // goes to /work?group=...
};

export const WORK_GROUPS: WorkGroup[] = [
  { id: "basketball", label: "Basketball", href: "/work?group=basketball" },
  { id: "freelance", label: "Freelance", href: "/work?group=freelance" },
  { id: "other", label: "Other", href: "/work?group=other" },
];

export function isGroupId(x: string | null): x is GroupId {
  return x === "basketball" || x === "freelance" || x === "other";
}
