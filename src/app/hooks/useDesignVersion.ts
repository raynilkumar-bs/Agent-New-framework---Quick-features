import { useCallback, useState } from "react";
import type { DesignVersion } from "@/config/designVersion";

const STORAGE_KEY = "design_version";

export function useDesignVersion(initial: DesignVersion = "v1") {
  const [version, setVersionState] = useState<DesignVersion>(() => {
    if (typeof window === "undefined") return initial;
    const stored = localStorage.getItem(STORAGE_KEY) as DesignVersion | null;
    if (stored === "v1" || stored === "v2" || stored === "v3" || stored === "v4") return stored;
    return initial;
  });

  const setVersion = useCallback((v: DesignVersion) => {
    localStorage.setItem(STORAGE_KEY, v);
    setVersionState(v);
  }, []);

  /** Reload so dynamically loaded theme CSS matches (see src/main.tsx). */
  const switchVersion = useCallback(
    (v: DesignVersion) => {
      setVersion(v);
      window.location.reload();
    },
    [setVersion]
  );

  return { version, setVersion, switchVersion };
}
