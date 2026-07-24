import Link from "next/link";
import { TABS } from "@/lib/tabs";

/**
 * The opening screen is his name and the four ways in. Nothing else.
 */
export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="-translate-y-[6vh] text-center">
        <p className="caps text-[color:var(--muted)]">
          Photographer &middot; Filmmaker
        </p>

        <h1 className="display mt-7 text-[clamp(34px,6vw,72px)]">
          Armando Aguilar
        </h1>

        <nav className="mt-14">
          <ul className="index inline-flex flex-col items-center gap-5">
            {TABS.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className="row caps-sm text-[color:var(--fg)]"
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
