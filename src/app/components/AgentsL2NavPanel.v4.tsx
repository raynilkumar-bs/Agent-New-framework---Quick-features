/** AgentsL2NavPanel v4 — Journeys IA: Outcomes + Agents / Settings (Figma New-gen exploration). */

import { useCallback } from "react";
import type { AppView } from "../App";
import { L2NavLayout, L2_FLAT_NAV_KEY_PREFIX } from "./L2NavLayout";

export interface AgentsL2NavPanelProps {
  currentView: AppView;
  onViewChange: (view: AppView, slug?: string) => void;
  /** Retained for call-site compatibility; Journeys v4 does not use agent slugs. */
  selectedAgentSlug?: string;
  selectedAnalyzeItem?: string;
  /** Persisted L2 compound key (e.g. flatNav/outcomes, Agents/workflow). */
  journeysL2ActiveKey: string;
}

function resolveActiveKey(view: AppView, journeysKey: string): string {
  const k = journeysKey.trim();
  if (view === "birdai-reports") return `${L2_FLAT_NAV_KEY_PREFIX}/outcomes`;
  if (view === "agents-monitor") {
    if (k.startsWith("Agents/")) return k;
    return "Agents/workflow";
  }
  if (view === "birdai-journeys") {
    if (k.startsWith("Settings/") || k === "Agents/campaign") return k;
    return "Settings/channels";
  }
  if (k) return k;
  return `${L2_FLAT_NAV_KEY_PREFIX}/outcomes`;
}

export function AgentsL2NavPanel({
  currentView,
  onViewChange,
  journeysL2ActiveKey,
}: AgentsL2NavPanelProps) {
  const handleActiveItemChange = useCallback(
    (key: string) => {
      const slashIdx = key.indexOf("/");
      if (slashIdx < 0) return;
      const prefix = key.slice(0, slashIdx);
      const rest = key.slice(slashIdx + 1);

      if (prefix === L2_FLAT_NAV_KEY_PREFIX) {
        if (rest === "outcomes") onViewChange("birdai-reports", `l2:${L2_FLAT_NAV_KEY_PREFIX}/outcomes`);
        return;
      }
      if (prefix === "Agents") {
        if (rest === "workflow") onViewChange("agents-monitor", "l2:Agents/workflow");
        else if (rest === "campaign") onViewChange("birdai-journeys", "l2:Agents/campaign");
        return;
      }
      if (prefix === "Settings") {
        onViewChange("birdai-journeys", `l2:Settings/${rest}`);
      }
    },
    [onViewChange],
  );

  return (
    <L2NavLayout
      stickyNavHeader
      headerAction={{ label: "Create workflow", onClick: () => onViewChange("agents-builder") }}
      flatNavItems={[{ label: "Outcomes", key: "outcomes" }]}
      flatNavAccentKeys={["outcomes"]}
      sections={[
        {
          label: "Agents",
          children: [
            { label: "Workflow agents", key: "workflow" },
            { label: "Campaign agents", key: "campaign" },
          ],
        },
        {
          label: "Settings",
          children: [
            { label: "Channels", key: "channels" },
            { label: "Templates", key: "templates" },
            { label: "Knowledge", key: "knowledge" },
            { label: "Memory", key: "memory" },
            { label: "Communication restriction", key: "comm-restriction" },
            { label: "Manage tags", key: "manage-tags" },
          ],
        },
      ]}
      defaultExpandedSections={["Agents", "Settings"]}
      activeItem={resolveActiveKey(currentView, journeysL2ActiveKey)}
      onActiveItemChange={handleActiveItemChange}
      data-no-print
    />
  );
}
