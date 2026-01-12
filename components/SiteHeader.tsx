import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* subtle glass line so it reads on video + paper */}
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8 lg:px-12">
        <div
          className="
            grid grid-cols-3 items-center
            text-[11px] uppercase tracking-[0.32em]
          "
        >
          {/* Left */}
          <div className="flex items-center gap-3 text-[color:var(--page-muted)]">
            <span>San Diego</span>
            <span className="h-px w-6 bg-[color:var(--page-border)]" />
            <span>Film Student</span>
          </div>

          {/* Center logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="
                font-[var(--font-sans)] font-extrabold
                tracking-[-0.02em]
                text-[14px] sm:text-[15px]
                text-[color:var(--page-fg)]
                opacity-90 hover:opacity-100
              "
              aria-label="Home"
            >
              mando<span className="align-super text-[10px] opacity-70">®</span>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-4 text-[color:var(--page-muted)]">
            <Link
              href="/contact"
              className="hover:text-[color:var(--page-fg)]"
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
