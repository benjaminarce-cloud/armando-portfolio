"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getThemeFromDom(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === "light" ? "light" : "dark";
}

function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // read what layout script set (before paint)
    const domTheme = getThemeFromDom();
    setTheme(domTheme);
    applyTheme(domTheme);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => {
        setTheme(next);
        applyTheme(next);
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
      className={[
        "theme-toggle-icon",
        theme === "dark" ? "is-dark" : "is-light",
        className,
      ].join(" ")}
    >
      <span className="dot" aria-hidden="true" />
    </button>
  );
}
