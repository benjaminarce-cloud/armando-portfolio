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

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="
        group relative grid h-9 w-9 place-items-center
        rounded-full border border-[color:var(--page-border)]
        bg-[color:var(--page-card)]
        text-[color:var(--page-fg)]
        transition
        hover:bg-[color:var(--page-hover)]
        focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/40
      "
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      {/* Split-disc mark (cleaner than eclipse) */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="opacity-80 transition-opacity group-hover:opacity-95"
        aria-hidden="true"
      >
        {/* outline */}
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.85"
        />
        {/* filled half */}
        <path
          d="M12 3a9 9 0 0 0 0 18V3z"
          fill="currentColor"
          opacity={theme === "dark" ? 0.85 : 0.35}
        />
      </svg>
    </button>
  );
}
