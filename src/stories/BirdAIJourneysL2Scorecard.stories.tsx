import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { useState } from "react";
import type { AppView } from "@/app/App";
import { AgentsL2NavPanel } from "@/app/components/AgentsL2NavPanel";
import { PANEL } from "@/app/components/L2NavLayout";
import { APP_SHELL_GUTTER_SURFACE_CLASS } from "@/app/components/layout/appShellClasses";

/**
 * Scorecard for everything — Bird AI **Journeys** L2 (Figma New-gen exploration).
 * Primary review surface for hierarchy, Outcomes accent row, Campaign agents selected (Figma 577:63170), sticky title + Create workflow, and section expansion.
 */
const meta: Meta = {
  title: "App/Bird AI/Journeys L2 scorecard",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Isolated **Journeys** L2 navigation: Outcomes (primary accent), Agents, Settings. Use these stories to sign off IA and chrome before shipping.",
      },
    },
  },
};

export default meta;

function L2OnlyFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={`flex h-[min(720px,90vh)] w-full min-h-0 items-stretch justify-center ${APP_SHELL_GUTTER_SURFACE_CLASS} p-6`}
    >
      <div className={`${PANEL} max-h-full`}>{children}</div>
    </div>
  );
}

export const DefaultMonitorContext: StoryObj = {
  name: "Default (Monitor + Workflow agents)",
  render: () => (
    <L2OnlyFrame>
      <AgentsL2NavPanel
        currentView="agents-monitor"
        onViewChange={() => {}}
        journeysL2ActiveKey="Agents/workflow"
      />
    </L2OnlyFrame>
  ),
};

export const OutcomesSelected: StoryObj = {
  name: "Outcomes selected (Reports)",
  render: () => (
    <L2OnlyFrame>
      <AgentsL2NavPanel
        currentView="birdai-reports"
        onViewChange={() => {}}
        journeysL2ActiveKey="flatNav/outcomes"
      />
    </L2OnlyFrame>
  ),
};

/** Campaign agents child selected — sign-off vs Figma node 577:63170. */
export const CampaignAgentsSelected: StoryObj = {
  name: "Campaign agents selected (Journeys)",
  render: () => (
    <L2OnlyFrame>
      <AgentsL2NavPanel
        currentView="birdai-journeys"
        onViewChange={() => {}}
        journeysL2ActiveKey="Agents/campaign"
      />
    </L2OnlyFrame>
  ),
};

export const SettingsLeafPlaceholder: StoryObj = {
  name: "Settings — Channels (placeholder route)",
  render: () => (
    <L2OnlyFrame>
      <AgentsL2NavPanel
        currentView="birdai-journeys"
        onViewChange={() => {}}
        journeysL2ActiveKey="Settings/channels"
      />
    </L2OnlyFrame>
  ),
};

function InteractiveL2() {
  const [view, setView] = useState<AppView>("agents-monitor");
  const [key, setKey] = useState("Agents/workflow");
  return (
    <L2OnlyFrame>
      <AgentsL2NavPanel
        currentView={view}
        journeysL2ActiveKey={key}
        onViewChange={(v, slug) => {
          setView(v);
          if (slug?.startsWith("l2:")) setKey(slug.slice(3));
        }}
      />
    </L2OnlyFrame>
  );
}

export const Interactive: StoryObj = {
  name: "Interactive (click to navigate)",
  render: () => <InteractiveL2 />,
};
