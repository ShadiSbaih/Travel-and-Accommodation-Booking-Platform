import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import type { Theme } from "./types";
import { ThemeContext } from "./ThemeContext";

// Initialize theme from localStorage immediately to avoid flash
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  }
  return "system";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const [prefersDark, setPrefersDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersDark(event.matches);

    // Ensure initial value stays in sync.
    setPrefersDark(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    // Safari < 14
    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  const isDark = useMemo(() => {
    return theme === "dark" || (theme === "system" && prefersDark);
  }, [theme, prefersDark]);

  // Apply class before paint to avoid visible "lag" when toggling.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [isDark, theme]);

  const contextValue = useMemo(
    () => ({ theme, setTheme, isDark }),
    [theme, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
