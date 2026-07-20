// app/work/page.tsx
import Link from "next/link";
import { projects } from "@/lib/projects";
import { isGroupId, WORK_GROUPS } from "@/lib/workGroups";
import WorkIndex, { type IndexGroup } from "@/components/work/WorkIndex";

export const metadata = {
  title: "Work — Armando Aguilar",
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const sp = await searchParams;
  const activeGroup = isGroupId(sp.group ?? null) ? sp.group! : null;

  const groups: IndexGroup[] = WORK_GROUPS.filter(
    (g) => !activeGroup || g.id === activeGroup
  ).map((g) => ({
    id: g.id,
    label: g.label,
    items: projects.filter((p) => p.group === g.id),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      {/* Filters */}
      <div className="lg:col-span-2">
        <h1 className="label">Index</h1>
        <ul className="mt-4 space-y-1">
          <li>
            <Link
              href="/work"
              className={[
                "text-[13px] transition-colors",
                !activeGroup
                  ? "u text-[color:var(--fg)]"
                  : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
              ].join(" ")}
            >
              All
            </Link>
          </li>
          {WORK_GROUPS.map((g) => (
            <li key={g.id}>
              <Link
                href={g.href}
                className={[
                  "text-[13px] transition-colors",
                  activeGroup === g.id
                    ? "u text-[color:var(--fg)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
                ].join(" ")}
              >
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Index */}
      <div className="lg:col-span-8 lg:col-start-4">
        <WorkIndex groups={groups} />
      </div>
    </div>
  );
}
