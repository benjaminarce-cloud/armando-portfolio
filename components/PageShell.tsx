import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";

/**
 * Every inner tab: monitor nav on top, a slate line naming the tab, content below.
 * Horizontal padding clears the AF corner brackets.
 */
export default function PageShell({
  title,
  slate,
  children,
}: {
  title: string;
  /** The camera-report line under the title, e.g. "33 frames". */
  slate: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader />

      {/* Extra top padding on phones: the header stacks into two rows there. */}
      <main className="min-h-screen px-6 pb-32 pt-[212px] sm:px-14 sm:pt-[168px]">
        <div className="flex items-baseline justify-between gap-6 border-b border-[color:var(--line)] pb-5">
          <h1 className="mark text-[clamp(28px,4vw,44px)]">{title}</h1>
          <p className="hud text-[color:var(--dim)]">{slate}</p>
        </div>

        <div className="mt-12">{children}</div>
      </main>
    </>
  );
}
