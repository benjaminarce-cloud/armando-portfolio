import Link from "next/link";
import { TABS } from "@/lib/tabs";

/**
 * The opening screen is his name and the four ways in. Nothing else.
 */
export default function Page() {
  return (
    <main className="grid h-screen place-items-center overflow-hidden">
      <div className="-translate-y-[8vh] text-center">
        <h1 className="mark text-[clamp(22px,3vw,34px)]">Armando Aguilar</h1>

        <nav className="mt-10 inline-flex flex-col items-center gap-[22px]">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="lock w-[150px] px-[14px] py-[6px] text-[12px] uppercase tracking-[0.16em] text-white"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
