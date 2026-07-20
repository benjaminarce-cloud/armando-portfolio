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
  const groupParam = sp.group ?? null;
  const activeGroup = isGroupId(groupParam) ? groupParam : null;

  const groups: IndexGroup[] = WORK_GROUPS.filter(
    (g) => !activeGroup || g.id === activeGroup
  )
    .map((g) => ({
      id: g.id,
      label: g.label,
      items: projects.filter((p) => p.group === g.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {/* Masthead */}
      <div className="text-center">
        <p className="caps text-[color:var(--muted)]">Index</p>
        <h1 className="display mt-6 text-[clamp(30px,4.4vw,54px)]">
          Selected Work
        </h1>
      </div>

      {/* Filters */}
      <div className="mt-12 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
        <Link
          href="/work"
          className={[
            "caps transition-opacity",
            !activeGroup
              ? "border-b border-[color:var(--fg)] pb-1"
              : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
          ].join(" ")}
        >
          All
        </Link>

        {WORK_GROUPS.map((g) => (
          <Link
            key={g.id}
            href={g.href}
            className={[
              "caps transition-opacity",
              activeGroup === g.id
                ? "border-b border-[color:var(--fg)] pb-1"
                : "text-[color:var(--muted)] hover:text-[color:var(--fg)]",
            ].join(" ")}
          >
            {g.label}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-5xl">
        <WorkIndex groups={groups} />
      </div>
    </div>
  );
}
