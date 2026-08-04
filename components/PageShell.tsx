import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Every inner tab: header, a masthead set flush left with its count opposite,
 * content, footer. Left-aligned rather than centred — the centred masthead is
 * part of what made the old build read as a brochure.
 */
export default function PageShell({
  title,
  slate,
  children,
}: {
  title: string;
  /** The line opposite the title, e.g. "22 Films". */
  slate: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-5 py-6 sm:px-8 lg:px-12">
      <PageHeader />

      <main className="flex-1 pt-14 lg:pt-20">
        <div className="flex items-end justify-between gap-6 border-b border-[color:var(--rule)] pb-4">
          <h1 className="display text-[clamp(34px,7vw,92px)]">{title}</h1>
          <p className="caps-xs shrink-0 pb-1 text-[color:var(--muted)]">
            {slate}
          </p>
        </div>

        <div className="mt-12 lg:mt-16">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
