"use client";

import { useEffect, useSyncExternalStore } from "react";

function getStoredTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem("paykar-theme");

  if (storedTheme) {
    return storedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeToThemeUpdates(onStoreChange: () => void) {
  window.addEventListener("paykar-theme-change", onStoreChange);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("paykar-theme-change", onStoreChange);
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribeToThemeUpdates,
    getStoredTheme,
    () => false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextIsDark = !isDark;

    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("paykar-theme", nextIsDark ? "dark" : "light");
    window.dispatchEvent(new Event("paykar-theme-change"));
  }

  return (
    <button
      type="button"
      aria-pressed={isDark}
      onClick={toggleTheme}
      className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#efc4d0] bg-white/70 px-4 text-sm font-bold text-[#242124] shadow-[0_10px_30px_rgba(18,18,18,0.08)] transition hover:-translate-y-0.5 dark:border-white/12 dark:bg-white/8 dark:text-white"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
