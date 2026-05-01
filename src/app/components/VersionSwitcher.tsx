import type { DesignVersion } from "@/config/designVersion";
import { useDesignVersion } from "@/app/hooks/useDesignVersion";

const VERSIONS: DesignVersion[] = ["v1", "v2", "v3", "v4"];

/**
 * Dev / review: pick a persisted design generation and reload.
 * Must match tokens under src/themes/vN/tokens.css and src/config/designVersion.ts at build time for full parity.
 */
export function VersionSwitcher() {
  const { version, switchVersion } = useDesignVersion();

  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-[13px] text-foreground shadow-sm">
      <span className="text-muted-foreground">Design</span>
      <div className="flex gap-1">
        {VERSIONS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => switchVersion(v)}
            className={`rounded px-2 py-0.5 ${version === v ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
