import { Construction } from "lucide-react";
import type { AppView } from "../App";

interface UnwiredModuleViewProps {
  currentView: AppView;
}

/**
 * Shown when a route exists in AppView but no view component has been
 * wired up in App.tsx yet. Prevents blank screens during development.
 *
 * This is different from ModuleEmptyState:
 *   • UnwiredModuleView  → the view component doesn't exist at all yet
 *   • ModuleEmptyState   → the view exists but a specific section isn't built
 */
export function UnwiredModuleView({ currentView }: UnwiredModuleViewProps) {
  const viewTitle = currentView
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const viewComponentName = currentView
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("") + "View";

  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-[#1e2229]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35] px-6 py-4">
        <h1 className="text-[20px] font-semibold text-[#111827] dark:text-[#f3f4f6] tracking-[-0.4px]">
          {viewTitle}
        </h1>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7ed] dark:bg-[#2d1f0e]">
          <Construction className="h-7 w-7 text-[#f59e0b] dark:text-[#fbbf24]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-[15px] font-semibold text-[#111827] dark:text-[#f3f4f6]">
            {viewTitle} isn&apos;t wired up yet
          </p>
          <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af] max-w-[380px] leading-relaxed">
            The route{" "}
            <code className="rounded bg-[#f3f4f6] dark:bg-[#252b35] px-1.5 py-0.5 text-xs font-mono text-[#2552ED]">
              &ldquo;{currentView}&rdquo;
            </code>{" "}
            is in <code className="rounded bg-[#f3f4f6] dark:bg-[#252b35] px-1.5 py-0.5 text-xs font-mono text-[#2552ED]">AppView</code> but no view component is connected in{" "}
            <code className="rounded bg-[#f3f4f6] dark:bg-[#252b35] px-1.5 py-0.5 text-xs font-mono text-[#2552ED]">App.tsx</code>.
          </p>
        </div>

        {/* Fix instructions */}
        <div className="w-full max-w-[480px] rounded-xl border border-[#e5e9f0] dark:border-[#252b35] bg-[#f9fafb] dark:bg-[#1a1e27] text-left overflow-hidden">
          <div className="border-b border-[#e5e9f0] dark:border-[#252b35] px-4 py-2.5">
            <p className="text-[11px] font-semibold text-[#374151] dark:text-[#d1d5db] uppercase tracking-wide">
              Fix in 2 steps
            </p>
          </div>
          <div className="divide-y divide-[#e5e9f0] dark:divide-[#252b35]">
            <div className="px-4 py-3 flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2552ED] text-[10px] font-bold text-white mt-0.5">
                1
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-medium text-[#111827] dark:text-[#f3f4f6]">
                  Copy the template
                </p>
                <code className="text-[11px] text-[#6b7280] dark:text-[#9ca3af] font-mono break-all">
                  cp src/app/components/TemplateModuleView.tsx<br />
                  &nbsp;&nbsp;&nbsp;src/app/components/{viewComponentName}.tsx
                </code>
              </div>
            </div>
            <div className="px-4 py-3 flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2552ED] text-[10px] font-bold text-white mt-0.5">
                2
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] font-medium text-[#111827] dark:text-[#f3f4f6]">
                  Wire it in App.tsx
                </p>
                <code className="text-[11px] text-[#6b7280] dark:text-[#9ca3af] font-mono">
                  {`} : currentView === "${currentView}" ? (`}<br />
                  &nbsp;&nbsp;{`<${viewComponentName} />`}<br />
                  {`) : ...`}
                </code>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#9ca3af] dark:text-[#6b7280]">
          Full guide in <code className="font-mono">CLAUDE.md</code>
        </p>
      </div>
    </div>
  );
}
