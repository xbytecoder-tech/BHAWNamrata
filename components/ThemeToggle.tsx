"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const applyTheme = (nextTheme: Theme) => {
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;

    // Keep browser UI (mobile address bar/tab tint) aligned with active site theme.
    const themeColor = nextTheme === "dark" ? "#020617" : "#fafaf9";
    document.documentElement.style.backgroundColor = themeColor;
    if (document.body) document.body.style.backgroundColor = themeColor;

    const metas = document.querySelectorAll('meta[name="theme-color"]');
    if (metas.length === 0) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = themeColor;
      document.head.appendChild(meta);
    } else {
      metas.forEach((meta) => {
        meta.setAttribute("content", themeColor);
        meta.removeAttribute("media");
      });
    }

    // Android/Edge legacy address bar tint.
    let msNavColor = document.querySelector(
      'meta[name="msapplication-navbutton-color"]',
    ) as HTMLMetaElement | null;
    if (!msNavColor) {
      msNavColor = document.createElement("meta");
      msNavColor.name = "msapplication-navbutton-color";
      document.head.appendChild(msNavColor);
    }
    msNavColor.content = themeColor;

    // Helps iOS Safari/PWA chrome pick the intended appearance.
    let appleStatusBar = document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]',
    ) as HTMLMetaElement | null;
    if (!appleStatusBar) {
      appleStatusBar = document.createElement("meta");
      appleStatusBar.name = "apple-mobile-web-app-status-bar-style";
      document.head.appendChild(appleStatusBar);
    }
    appleStatusBar.content = nextTheme === "dark" ? "black-translucent" : "default";
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored ?? (prefersDark ? "dark" : "light");
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextTheme: Theme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-white/80 text-stone-700 transition hover:border-stone-500 dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-200 dark:hover:border-slate-400"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a7 7 0 0 0-4 12.7c.7.5 1 1.1 1 1.8v.5h6v-.5c0-.7.3-1.3 1-1.8A7 7 0 0 0 12 3Z" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
