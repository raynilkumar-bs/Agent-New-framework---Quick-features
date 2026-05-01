/**
 * TemplateModuleView — canonical starting point for every new feature module.
 *
 * HOW TO USE THIS FILE
 * ────────────────────
 * 1. Copy this file:
 *      cp src/app/components/TemplateModuleView.tsx src/app/components/InventoryView.tsx
 *
 * 2. Rename every occurrence of "Template" → "Inventory" (your feature name).
 *
 * 3. Wire it up in 4 places (see CLAUDE.md for the full 5-step guide):
 *      App.tsx          → add "inventory" to AppView union + render case
 *      appViewTitle.ts  → add case "inventory": return "Inventory"
 *      Sidebar.v2.tsx   → add L1 icon entry + click handler
 *      Sidebar.v2.tsx   → create InventoryL2NavPanel (copy an existing panel)
 *
 * 4. Replace the L2 sections in your panel with your real navigation structure.
 *
 * 5. Ask Claude Code: "Build the Stock levels screen for the Inventory module".
 *    Drop the generated component into the routing switch below.
 *    It renders immediately — no extra wiring needed.
 *
 * GUARANTEES
 * ──────────
 * • No blank screens. Every unbuilt section shows a clear ModuleEmptyState.
 * • L2 navigation is wired automatically via useActiveL2Item().
 * • Generated content drops in and renders on the first try.
 */

import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";
import { ModuleHeader } from "@/app/components/layout/ModuleHeader";
import { Button } from "@/app/components/ui/button";

// ─── Step 1: Import your real content components here ────────────────────────
// import { StockLevelsContent }  from "./inventory/StockLevelsContent";
// import { ReorderAlertsContent } from "./inventory/ReorderAlertsContent";
// ─────────────────────────────────────────────────────────────────────────────

/** Module name shown in the header and in empty states. Change to your feature name. */
const MODULE_NAME = "Template"; // ← rename this

export function TemplateModuleView() {
  /**
   * activeItem holds whichever L2 nav item the user clicked most recently.
   *
   * Format:
   *   "SectionLabel/ItemLabel"   e.g. "Actions/Stock levels"
   *   "standalone/ItemLabel"     e.g. "standalone/All contacts"
   *   ""                         nothing clicked yet → shows default empty state
   *
   * The L2NavBridgeContext updates this automatically whenever any L2 panel item
   * is clicked — no extra plumbing needed in this file.
   */
  const activeItem = useActiveL2Item();

  // ─── Step 2: Route each L2 item to a real content component ──────────────
  //
  // When Claude Code generates a content component, add it here like this:
  //
  //   if (activeItem === "Actions/Stock levels")   return <StockLevelsContent />;
  //   if (activeItem === "Actions/Reorder alerts") return <ReorderAlertsContent />;
  //   if (activeItem === "Reports/Overview")       return <OverviewReportContent />;
  //
  // Any section you haven't built yet automatically falls through to the
  // ModuleEmptyState below — no case needed, no blank screen ever.
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-[#1e2229]">

      {/*
       * Page header
       * ModuleHeader is the shared header used across every module.
       * Replace the title, subtitle, and primary action with your own.
       * Remove it entirely once you have a full-bleed layout.
       */}
      <ModuleHeader
        title={MODULE_NAME}
        subtitle="Select a section from the left to get started"
        actions={
          <Button size="sm" variant="default">
            {/* Step 3: Replace with your real primary action */}
            Primary action
          </Button>
        }
      />

      {/*
       * Content area
       * ModuleEmptyState is shown for every unbuilt section.
       * As you add real content components in the routing switch above,
       * they take over naturally — this empty state only shows for
       * sections that haven't been implemented yet.
       */}
      <div className="flex-1 min-h-0 overflow-auto">
        <ModuleEmptyState
          moduleName={MODULE_NAME}
          activeL2Key={activeItem}
        />
      </div>
    </div>
  );
}
