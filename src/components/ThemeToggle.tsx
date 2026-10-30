"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Pick up the theme the visitor chose last time (applied in layout.tsx).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;

    setDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("thebox-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("thebox-theme", "light");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
      className="inline-flex items-center gap-2 rounded-xl active:scale-95 border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <span key={dark ? "sun" : "moon"} aria-hidden="true" className="tb-spin-in">
        {dark ? "☀️" : "🌙"}
      </span>
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
