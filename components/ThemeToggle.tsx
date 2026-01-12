"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = t;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark"); // default to dark

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) ?? null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      applyTheme(saved);
      return;
    }

    // If no saved theme, follow system preference once
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial: Theme = prefersDark ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        applyTheme(next);
        localStorage.setItem("theme", next);
      }}
      className="
        inline-flex items-center justify-center
        rounded-full border px-3 py-2
        text-[11px] uppercase tracking-[0.32em]
        transition
        border-current/20
        hover:border-current/40
        hover:text-[var(--accent)]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--accent)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
      "
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
