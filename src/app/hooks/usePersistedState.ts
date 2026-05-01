import { useState, useEffect } from "react";

/**
 * Drop-in replacement for useState that persists to sessionStorage.
 * - Pass a string key to enable persistence.
 * - Pass undefined / empty string to behave exactly like useState (no storage).
 * Reads stored value on mount; writes on every change.
 * Silently ignores storage errors (quota, private-browsing).
 */
export function usePersistedState<T>(
  key: string | undefined,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (!key) return defaultValue;
    try {
      const raw = sessionStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (!key) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded or restricted — skip silently
    }
  }, [key, value]);

  return [value, setValue];
}
