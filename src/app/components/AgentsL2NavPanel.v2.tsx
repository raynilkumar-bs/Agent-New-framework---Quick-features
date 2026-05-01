/** AgentsL2NavPanel v2 — Create agent + Monitor + Outcome. */

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
  return `${L2_FLAT_NAV_KEY_PREFIX}/monitor`;
}

export function AgentsL2NavPanel({ currentView, onViewChange }: AgentsL2NavPanelProps) {
  const handleActiveItemChange = useCallback((key: string) => {
    const slashIdx = key.indexOf("/");
    const id = key.slice(slashIdx + 1);
    if (id === "monitor") onViewChange("agents-monitor");
    else if (id === "outcome") onViewChange("birdai-reports");
  }, [onViewChange]);

  return (
    <L2NavLayout
      headerAction={{ label: "Create agent", onClick: () => onViewChange("agents-builder") }}
      flatNavItems={[
        { label: "Monitor", key: "monitor" },
        { label: "Outcome", key: "outcome" },
      ]}
      sections={[]}
      activeItem={resolveActiveKey(currentView)}
      onActiveItemChange={handleActiveItemChange}
      data-no-print
    />
  );
}
