/** AgentsL2NavPanel v3 — BirdAI L2: Outcome + Monitor + Agent running. */

import { useCallback } from "react";
import type { AppView } from "../App";
import { L2NavLayout, L2_FLAT_NAV_KEY_PREFIX } from "./L2NavLayout";

interface AgentsL2NavPanelProps {
  currentView: AppView;
  onViewChange: (view: AppView, slug?: string) => void;
  selectedAgentSlug?: string;
  selectedAnalyzeItem?: string;
}

function resolveActiveKey(currentView: AppView): string {
  if (currentView === "birdai-reports") return `${L2_FLAT_NAV_KEY_PREFIX}/outcome`;
  if (currentView === "agents-builder" || currentView === "agent-detail") return `${L2_FLAT_NAV_KEY_PREFIX}/agent-running`;
  return `${L2_FLAT_NAV_KEY_PREFIX}/monitor`;
}

export function AgentsL2NavPanel({ currentView, onViewChange }: AgentsL2NavPanelProps) {
  const handleActiveItemChange = useCallback((key: string) => {
    const slashIdx = key.indexOf("/");
    const id = key.slice(slashIdx + 1);
    if (id === "outcome") onViewChange("birdai-reports");
    else if (id === "monitor") onViewChange("agents-monitor");
    else if (id === "agent-running") onViewChange("agents-monitor");
  }, [onViewChange]);

  return (
    <L2NavLayout
      headerAction={{ label: "Create agent", onClick: () => onViewChange("agents-builder") }}
      flatNavItems={[
        { label: "Outcome", key: "outcome" },
        { label: "Monitor", key: "monitor" },
        { label: "Agent running", key: "agent-running" },
      ]}
      sections={[]}
      activeItem={resolveActiveKey(currentView)}
      onActiveItemChange={handleActiveItemChange}
      data-no-print
    />
  );
}
