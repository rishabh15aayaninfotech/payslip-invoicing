"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "payslip-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof document !== "undefined") {
      const themeFromDocument = document.documentElement.dataset.theme;
      if (themeFromDocument === "light" || themeFromDocument === "dark") {
        return themeFromDocument;
      }
    }

    if (typeof window !== "undefined") {
      try {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
          return storedTheme;
        }
      } catch {
        // Ignore storage failures and fall back to dark.
      }
    }

    return "dark";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors in private browsing or restricted contexts.
    }
    applyTheme(theme);
  }, [theme]);

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={theme === "dark" ? "Turn dark mode off" : "Turn dark mode on"}
      title={theme === "dark" ? "Dark mode on" : "Dark mode off"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`group relative inline-flex h-8 w-[92px] items-center rounded-full border border-border bg-surface/85 p-1 shadow-sm backdrop-blur-sm transition hover:bg-surface-strong ${className}`}
    >
      <span className="pointer-events-none absolute left-2 z-10 flex h-4 w-4 items-center justify-center">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 12.8A8.5 8.5 0 1111.2 3a7 7 0 109.8 9.8z"
          />
        </svg>
      </span>
      <span
        className={`absolute inset-y-1 left-1 w-[42px] rounded-full bg-accent shadow-[0_2px_10px_rgba(91,124,255,0.35)] transition-transform duration-300 ease-out ${
          theme === "dark" ? "translate-x-0" : "translate-x-[42px]"
        }`}
      />
      <span
        className={`pointer-events-none absolute right-2 z-10 flex h-4 w-4 items-center justify-center transition-colors ${
          theme === "light" ? "text-foreground" : "text-muted"
        }`}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 3v1m0 16v1m8-9h1M3 12h1m13.657-6.657l.707-.707M5.636 18.364l.707-.707m0-11.314l-.707-.707M18.364 18.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      </span>
      <span
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.25)] transition-transform duration-300 ease-out ${
          theme === "dark" ? "translate-x-0" : "translate-x-[60px]"
        }`}
      />
    </button>
  );
}
