"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)")?.matches
    ? "light"
    : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="
        group relative grid h-9 w-9 place-items-center
        rounded-full border border-[color:var(--page-border)]
        bg-[color:var(--page-card)]
        transition
        hover:bg-[color:var(--page-hover)]
        focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/40
      "
    >
      {/* ring */}
      <span className="relative block h-4 w-4 rounded-full border border-current/35 text-[color:var(--page-fg)]" />

      {/* orbit dot */}
      <span
        className={[
          "absolute block h-1.5 w-1.5 rounded-full",
          "bg-[color:var(--page-fg)] opacity-80",
          "transition-transform duration-300 ease-out",
          isDark ? "translate-x-[7px]" : "-translate-x-[7px]",
        ].join(" ")}
      />
    </button>
  );
}
