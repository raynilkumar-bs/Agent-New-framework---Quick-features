/** AgentsL2NavPanel v1 — Monitor + Analyze Performance (grouped agents). */

import { useCallback } from "react";
import type { AppView } from "../App";
import { L2NavLayout, L2_FLAT_NAV_KEY_PREFIX } from "./L2NavLayout";
import { agentSections } from "@/app/data/agentsPerformanceMock";

interface AgentsL2NavPanelProps {
  currentView: AppView;
  onViewChange: (view: AppView, slug?: string) => void;
  selectedAgentSlug?: string;
  selectedAnalyzeItem?: string;
}

function resolveAnalyzeActiveKey(currentView: AppView, selectedAnalyzeItem: string): string {
  if (currentView !== "agents-analyze-performance") return `${L2_FLAT_NAV_KEY_PREFIX}/monitor`;
  return `Analyze Performance/${selectedAnalyzeItem}`;
}

export function AgentsL2NavPanel({ currentView, onViewChange, selectedAnalyzeItem = "overview" }: AgentsL2NavPanelProps) {
  const handleActiveItemChange = useCallback((key: string) => {
    const slashIdx = key.indexOf("/");
    const prefix = key.slice(0, slashIdx);
    const id = key.slice(slashIdx + 1);
    if (prefix === L2_FLAT_NAV_KEY_PREFIX) {
      onViewChange("agents-monitor");
    } else {
      onViewChange("agents-analyze-performance", id);
    }
  }, [onViewChange]);

  return (
    <L2NavLayout
      flatNavItems={[{ label: "Monitor", key: "monitor" }]}
      sections={[{
        label: "Analyze Performance",
        children: [
          { label: "Overview", key: "overview" },
          ...agentSections.map(a => ({ label: a.label, key: a.id })),
        ],
      }]}
      activeItem={resolveAnalyzeActiveKey(currentView, selectedAnalyzeItem)}
      onActiveItemChange={handleActiveItemChange}
      defaultExpandedSections={["Analyze Performance"]}
      data-no-print
    />
  );
}
