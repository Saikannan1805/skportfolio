"use client";

import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function applyTheme(next: "light" | "dark") {
  const root = document.documentElement;
  if (next === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {}
}

export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cross-fade the whole page where supported; instant switch otherwise
    if (!reduceMotion && "startViewTransition" in document) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  // Icons are swapped purely with CSS (`dark:`), so server and client markup always match
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "group relative flex h-8 w-8 items-center justify-center rounded-full bg-surface-elevated text-text-secondary",
        "transition-[background-color,color,transform] duration-[450ms] ease-butter",
        "hover:bg-soft hover:text-text-primary active:scale-95",
        className
      )}
    >
      {/* Moon — shown in light mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-[450ms] ease-butter group-hover:-rotate-12 dark:hidden"
        aria-hidden
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* Sun — shown in dark mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="hidden h-4 w-4 transition-transform duration-[600ms] ease-butter group-hover:rotate-45 dark:block"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
