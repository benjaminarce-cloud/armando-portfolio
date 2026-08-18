import Link from "next/link";
import { notFound } from "next/navigation";
import Breakdown from "@/components/Breakdown";
import SiteFooter from "@/components/SiteFooter";
import SiteMark from "@/components/SiteMark";
import { projects, projectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return { title: project ? `${project.title} — Mando` : "Mando" };
}

/**
 * One shoot, whole.
 *
 * The masthead is the only text: what it was, who it was, the year, and what he
 * did on it. Then the work, and a way back. There is no next/previous — the
 * mosaic is the way around this site, and a rail of links at the bottom of a
 * forty-frame gallery would be pretending otherwise.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const counts = project.media.reduce(
    (acc, m) => ({ ...acc, [m.kind]: acc[m.kind] + 1 }),
    { video: 0, photo: 0 }
  );

  const slate = [
    counts.video > 0 ? `${counts.video} ${counts.video === 1 ? "Film" : "Films"}` : null,
    counts.photo > 0 ? `${counts.photo} ${counts.photo === 1 ? "Frame" : "Frames"}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteMark filters={false} />

      <main className="frame mt-14 flex-1 lg:mt-20">
        <div className="border-b border-[color:var(--rule)] pb-5">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              {project.subject ? (
                <p className="caps-xs text-[color:var(--muted)]">
                  {project.subject}
                </p>
              ) : null}
              <h1 className="display mt-2 text-[clamp(28px,5.5vw,68px)]">
                {project.title}
              </h1>
            </div>
            <p className="caps-xs shrink-0 pb-1 tabular-nums text-[color:var(--muted)]">
              {project.year}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <p className="caps-xs text-[color:var(--muted)]">{project.role}</p>
            <p className="caps-xs ml-auto text-[color:var(--muted)]">{slate}</p>
          </div>

          {project.note ? (
            <p className="mt-6 max-w-2xl text-[13px] leading-[1.65]">
              {project.note}
            </p>
          ) : null}
        </div>

        <div className="mt-8 lg:mt-12">
          <Breakdown project={project} />
        </div>

        <div className="mt-14 border-t border-[color:var(--rule)] pt-5">
          <Link
            href="/"
            className="caps text-[color:var(--muted)] transition-colors hover:text-[color:var(--fg)]"
          >
            &larr; Index
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
