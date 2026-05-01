/**
 * ModuleEmptyState
 *
 * The default screen shown inside any module view that hasn't been built yet.
 * This ensures teams NEVER see a blank screen — every L2 nav click produces
 * a clear, intentional signal that this section is ready to be implemented.
 *
 * USAGE:
 *
 *   import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";
 *
 *   export function InventoryView() {
 *     const activeItem = useActiveL2Item(); // from L2NavBridgeContext
 *
 *     if (activeItem === "Actions/Stock levels") return <StockLevelsContent />;
 *     if (activeItem === "Actions/Reorder alerts") return <ReorderAlertsContent />;
 *
 *     // Catch-all: any unbuilt section shows this instead of a blank screen.
 *     return <ModuleEmptyState moduleName="Inventory" activeL2Key={activeItem} />;
 *   }
 */

import { Sparkles } from "lucide-react";

interface ModuleEmptyStateProps {
  /** Display name of the module, e.g. "Inventory" */
  moduleName: string;
  /**
   * Raw L2 key from useActiveL2Item(), e.g. "Actions/Stock levels" or
   * "standalone/All contacts". Pass the raw key — this component handles
   * the display formatting. Pass an empty string when no item is selected.
   */
  activeL2Key?: string;
}

/** Converts raw L2 keys like "Actions/View all reviews" → "View all reviews" */
function formatL2Label(key: string): string {
  if (!key) return "";
  const parts = key.split("/");
  return parts[parts.length - 1] ?? "";
}

/** Converts raw L2 keys like "Actions/View all reviews" → "Actions" */
function formatL2Section(key: string): string {
  if (!key || !key.includes("/")) return "";
  return key.split("/")[0] ?? "";
}

export function ModuleEmptyState({ moduleName, activeL2Key = "" }: ModuleEmptyStateProps) {
  const itemLabel    = formatL2Label(activeL2Key);
  const sectionLabel = formatL2Section(activeL2Key);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[360px] bg-white dark:bg-[#1e2229] select-none px-8 py-12">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#f0f4ff] dark:bg-[#1e2d5e] flex items-center justify-center mb-5 shrink-0">
        <Sparkles className="w-6 h-6 text-[#2552ED] dark:text-[#4d7fff]" strokeWidth={1.5} />
      </div>

      {/* Heading */}
      <h2 className="text-[17px] font-semibold text-[#111827] dark:text-[#f3f4f6] tracking-[-0.3px] mb-2 text-center">
        {itemLabel
          ? `${itemLabel} is ready to build`
          : `${moduleName} is ready to build`}
      </h2>

      {/* Sub-copy */}
      <p className="text-[13px] text-[#6b7280] dark:text-[#9ba2b0] text-center max-w-[340px] leading-relaxed mb-6">
        {itemLabel && sectionLabel
          ? `No content has been wired to "${itemLabel}" in the ${sectionLabel} section yet.`
          : `No content has been wired to this module yet.`}
        {" "}Use Claude Code or your AI IDE to generate this screen from the template.
      </p>

      {/* Code hint */}
      <div className="bg-[#f8f9fb] dark:bg-[#252a33] border border-[#e5e9f0] dark:border-[#2e3340] rounded-lg px-4 py-3 font-mono text-[12px] text-[#374151] dark:text-[#9ba2b0] max-w-[420px] w-full">
        <span className="text-[#6b7280] dark:text-[#6b7280] select-none">$ </span>
        <span className="text-[#2552ED] dark:text-[#4d7fff]">cp</span>
        <span> src/app/components/TemplateModuleView.tsx </span>
        <span className="text-[#10b981]">src/app/components/{moduleName}View.tsx</span>
      </div>

      {/* Instruction strip */}
      <div className="mt-4 flex items-center gap-2 text-[12px] text-[#9ba2b0] dark:text-[#6b7280]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
          Copy template
        </span>
        <span className="text-[#d1d5db] dark:text-[#374151]">→</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2552ED] shrink-0" />
          Ask Claude Code to build this screen
        </span>
        <span className="text-[#d1d5db] dark:text-[#374151]">→</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shrink-0" />
          Content renders instantly
        </span>
      </div>
    </div>
  );
}
