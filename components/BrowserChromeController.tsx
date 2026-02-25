"use client";

import { useEffect, useRef } from "react";

const LIGHT_THEME_COLOR = "#fafaf9";
const DARK_THEME_COLOR = "#020617";

function upsertMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as
    | HTMLMetaElement
    | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
  meta.removeAttribute("media");
}

export function BrowserChromeController() {
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const apply = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const baseThemeColor = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
      const isScrolled = window.scrollY > 8;
      const chromeColor = isScrolled ? "transparent" : baseThemeColor;

      // Controls Android/Chrome/Edge address bar color.
      const metas = document.querySelectorAll('meta[name="theme-color"]');
      if (metas.length === 0) {
        upsertMeta("theme-color", chromeColor);
      } else {
        metas.forEach((meta) => {
          meta.setAttribute("content", chromeColor);
          meta.removeAttribute("media");
        });
      }

      // Legacy mobile browser chrome tint.
      upsertMeta("msapplication-navbutton-color", chromeColor);

      // Keep platform theme and document surfaces in sync.
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
      document.documentElement.style.backgroundColor = baseThemeColor;
      if (document.body) document.body.style.backgroundColor = baseThemeColor;

      // Safari/PWA status bar behavior.
      upsertMeta(
        "apple-mobile-web-app-status-bar-style",
        isDark ? "black-translucent" : "default",
      );
    };

    const scheduleApply = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        apply();
      });
    };

    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("scroll", scheduleApply, { passive: true });
    window.addEventListener("resize", scheduleApply);
    scheduleApply();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleApply);
      window.removeEventListener("resize", scheduleApply);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return null;
}
