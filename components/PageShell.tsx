import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";

/**
 * Every inner tab: header on top, a centred masthead naming the tab, content
 * below, footer at the base. The whole page is a centred column with generous
 * margins.
 */
export default function PageShell({
  title,
  slate,
  children,
}: {
  title: string;
  /** The line under the title, e.g. "33 Films". */
  slate: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-8 sm:px-10 lg:px-14">
      <PageHeader />

      <main className="flex-1 pt-16 lg:pt-24">
        <div className="text-center">
          <h1 className="display text-[clamp(30px,4.4vw,54px)]">{title}</h1>
          <p className="caps mt-5 text-[color:var(--muted)]">{slate}</p>
        </div>

        <div className="mt-16 lg:mt-20">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
