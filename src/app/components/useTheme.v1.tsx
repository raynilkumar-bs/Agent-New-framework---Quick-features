import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "app_theme";

export type ThemePreference = "light" | "dark" | "auto";
type ResolvedTheme = "light" | "dark";

// Pub/sub so all consumers stay in sync
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSystemPreference(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(pref: ThemePreference): ResolvedTheme {
  return pref === "auto" ? getSystemPreference() : pref;
}

function applyResolved(resolved: ResolvedTheme) {
  if (resolved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function getStoredPreference(): ThemePreference {
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark" || v === "auto") return v;
  return "light"; // Default to light mode
}

function applyPreference(pref: ThemePreference) {
  localStorage.setItem(STORAGE_KEY, pref);
  applyResolved(resolveTheme(pref));
  listeners.forEach((cb) => cb());
}

// ─── Initialize on first import ───
const initialPref = getStoredPreference();
applyResolved(resolveTheme(initialPref));

// Listen for system theme changes (relevant when preference is "auto")
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (getStoredPreference() === "auto") {
    applyResolved(getSystemPreference());
    listeners.forEach((cb) => cb());
  }
});

function getSnapshot(): ResolvedTheme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const resolved = useSyncExternalStore(subscribe, getSnapshot);
  const preference = getStoredPreference();

  const setPreference = useCallback((pref: ThemePreference) => {
    applyPreference(pref);
  }, []);

  const toggleTheme = useCallback(() => {
    // Cycle: light → dark → auto → light
    const current = getStoredPreference();
    const next: ThemePreference =
      current === "light" ? "dark" : current === "dark" ? "auto" : "light";
    applyPreference(next);
  }, []);

  const isDark = resolved === "dark";

  return { theme: resolved, preference, isDark, toggleTheme, setPreference };
}
