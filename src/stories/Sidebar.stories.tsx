import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import {
  IconStrip,
  L2NavPanel,
  ReviewsL2NavPanel,
  SocialL2NavPanel,
  SearchAIL2NavPanel,
  ContactsL2NavPanel,
  AgentsL2NavPanel,
  ListingsL2NavPanel,
  TicketingL2NavPanel,
  CampaignsL2NavPanel,
  SurveysL2NavPanel,
  InsightsL2NavPanel,
  CompetitorsL2NavPanel,
  InboxL2NavPanel,
} from "@/app/components/Sidebar";
import { ReviewsL2NavPanel as ReviewsL2NavPanelV1 } from "@/app/components/Sidebar.v1";
import { ReviewsL2NavPanel as ReviewsL2NavPanelV2 } from "@/app/components/Sidebar.v2";
import { AgentsL2NavPanel as AgentsL2NavPanelV1 } from "@/app/components/AgentsL2NavPanel.v1";
import { AgentsL2NavPanel as AgentsL2NavPanelV2 } from "@/app/components/AgentsL2NavPanel.v2";
import type { AppView } from "@/app/App";
import { MonitorNotificationsProvider } from "@/app/context/MonitorNotificationsContext";

// ─── All selectable views ─────────────────────────────
const VIEW_OPTIONS: AppView[] = [
  "business-overview",
  "agents-monitor", "birdai-reports",
  "dashboard", "shared-by-me",
  "reviews", "social", "searchai",
  "listings", "contacts", "inbox",
  "surveys", "ticketing", "campaigns",
  "insights", "competitors",
  "scheduled-deliveries",
];

const VIEW_LABELS: Record<string, string> = {
  "business-overview":     "Overview (no L2)",
  "agents-monitor":        "BirdAI — Monitor",
  "birdai-reports":        "BirdAI — Reports (in-app)",
  "dashboard":             "Reports — Dashboard",
  "shared-by-me":          "Reports — Shared by me",
  "reviews":               "Reviews",
  "social":                "Social AI",
  "searchai":              "Search AI",
  "listings":              "Listings",
  "contacts":              "Contacts",
  "inbox":                 "Inbox",
  "surveys":               "Surveys",
  "ticketing":             "Ticketing",
  "campaigns":             "Campaigns",
  "insights":              "Insights",
  "competitors":           "Competitors",
  "scheduled-deliveries":  "Scheduled deliveries (no L2)",
};

// ─── L2 panel resolver ────────────────────────────────
function ActiveL2Panel({ view, onViewChange }: { view: AppView; onViewChange: (v: AppView) => void }) {
  if (view === "business-overview") return null;
  if (view === "reviews")     return <ReviewsL2NavPanel />;
  if (view === "social")      return <SocialL2NavPanel />;
  if (view === "searchai")    return <SearchAIL2NavPanel />;
  if (view === "contacts")    return <ContactsL2NavPanel />;
  if (view === "listings")    return <ListingsL2NavPanel />;
  if (view === "surveys")     return <SurveysL2NavPanel />;
  if (view === "ticketing")   return <TicketingL2NavPanel />;
  if (view === "campaigns")   return <CampaignsL2NavPanel />;
  if (view === "insights")    return <InsightsL2NavPanel />;
  if (view === "competitors") return <CompetitorsL2NavPanel />;
  if (view === "inbox")       return <InboxL2NavPanel />;
  if (["agents-monitor", "agents-builder", "agents-onboarding", "agent-detail", "birdai-reports"].includes(view))
    return <AgentsL2NavPanel currentView={view} onViewChange={onViewChange} selectedAgentSlug="" />;
  if (["scheduled-deliveries", "shared-by-me", "storybook"].includes(view))
    return null;
  return <L2NavPanel currentView={view} onViewChange={onViewChange} />;
}

function SidebarFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#e0e5eb] dark:bg-[#13161b] transition-colors duration-300">
      {children}
    </div>
  );
}

// ─── Storybook meta ───────────────────────────────────
const meta: Meta = {
  title: "App/Sidebar",
  parameters: { layout: "fullscreen" },
  argTypes: {
    currentView: {
      name: "Active view",
      description: "Active product — updates the highlighted icon and L2 panel.",
      control: "select",
      options: VIEW_OPTIONS,
      labels: Object.fromEntries(VIEW_OPTIONS.map(v => [v, VIEW_LABELS[v]])) as Record<string, string>,
    },
    iconSize: {
      name: "Icon size (px)",
      description: "Phosphor icon size. Default is 16.2px (10% under 18px).",
      control: { type: "range", min: 12, max: 28, step: 0.1 },
    },
  },
};
export default meta;

type Story = StoryObj<{ currentView: AppView; iconSize: number }>;

/* ══════════════════════════════════════════════════════
   STORY 1 — Icon Strip only
   ══════════════════════════════════════════════════════ */
export const IconStripOnly: Story = {
  name: "Icon Strip",
    args: { currentView: "agents-monitor", iconSize: 16.2 },
  render: ({ currentView: argView, iconSize }) => {
    const [view, setView] = useState<AppView>(argView);
    useEffect(() => { setView(argView); }, [argView]);
    return (
      <MonitorNotificationsProvider onNavigateToMonitor={() => setView("agents-monitor")}>
        <SidebarFrame>
          <IconStrip currentView={view} onViewChange={setView} iconSize={iconSize} />
        </SidebarFrame>
      </MonitorNotificationsProvider>
    );
  },
};

/* ══════════════════════════════════════════════════════
   STORY 2 — Full Sidebar (Icon Strip + L2)
   ══════════════════════════════════════════════════════ */
export const SidebarCombined: Story = {
  name: "Sidebar",
    args: { currentView: "dashboard", iconSize: 16.2 },
  render: ({ currentView: argView, iconSize }) => {
    const [view, setView] = useState<AppView>(argView);
    useEffect(() => { setView(argView); }, [argView]);
    return (
      <MonitorNotificationsProvider onNavigateToMonitor={() => setView("agents-monitor")}>
        <SidebarFrame>
          <IconStrip currentView={view} onViewChange={setView} iconSize={iconSize} />
          <ActiveL2Panel view={view} onViewChange={setView} />
        </SidebarFrame>
      </MonitorNotificationsProvider>
    );
  },
};

/* ══════════════════════════════════════════════════════
   STORY 3 — All L2 panels reference
   One story per panel for quick visual review
   ══════════════════════════════════════════════════════ */
const panelStories: { name: string; view: AppView }[] = [
  { name: "L2 / Reports (Dashboard)",  view: "dashboard" },
  { name: "L2 / Reviews",              view: "reviews" },
  { name: "L2 / Social AI",            view: "social" },
  { name: "L2 / Search AI",            view: "searchai" },
  { name: "L2 / Listings",             view: "listings" },
  { name: "L2 / Contacts",             view: "contacts" },
  { name: "L2 / Inbox",                view: "inbox" },
  { name: "L2 / Surveys",              view: "surveys" },
  { name: "L2 / Ticketing",            view: "ticketing" },
  { name: "L2 / Campaigns",            view: "campaigns" },
  { name: "L2 / Insights",             view: "insights" },
  { name: "L2 / Competitors",          view: "competitors" },
  { name: "L2 / BirdAI — Monitor",     view: "agents-monitor" },
];

export const L2Reports: Story     = { name: panelStories[0].name,  render: () => <SidebarFrame><L2NavPanel currentView="dashboard" onViewChange={() => {}} /></SidebarFrame> };
export const L2Reviews: Story     = { name: panelStories[1].name,  render: () => <SidebarFrame><ReviewsL2NavPanel /></SidebarFrame> };

/** Explicit design-version snapshots (import `.v1` / `.v2` sources directly). */
export const L2ReviewsDesignV1: Story = {
  name: "L2 / Reviews (Sidebar v1)",
  render: () => (
    <SidebarFrame>
      <ReviewsL2NavPanelV1 />
    </SidebarFrame>
  ),
};
export const L2ReviewsDesignV2: Story = {
  name: "L2 / Reviews (Sidebar v2)",
  render: () => (
    <SidebarFrame>
      <ReviewsL2NavPanelV2 />
    </SidebarFrame>
  ),
};
export const L2Social: Story      = { name: panelStories[2].name,  render: () => <SidebarFrame><SocialL2NavPanel /></SidebarFrame> };
export const L2SearchAI: Story    = { name: panelStories[3].name,  render: () => <SidebarFrame><SearchAIL2NavPanel /></SidebarFrame> };
export const L2Listings: Story    = { name: panelStories[4].name,  render: () => <SidebarFrame><ListingsL2NavPanel /></SidebarFrame> };
export const L2Contacts: Story    = { name: panelStories[5].name,  render: () => <SidebarFrame><ContactsL2NavPanel /></SidebarFrame> };
export const L2Inbox: Story       = { name: panelStories[6].name,  render: () => <SidebarFrame><InboxL2NavPanel /></SidebarFrame> };
export const L2Surveys: Story     = { name: panelStories[7].name,  render: () => <SidebarFrame><SurveysL2NavPanel /></SidebarFrame> };
export const L2Ticketing: Story   = { name: panelStories[8].name,  render: () => <SidebarFrame><TicketingL2NavPanel /></SidebarFrame> };
export const L2Campaigns: Story   = { name: panelStories[9].name,  render: () => <SidebarFrame><CampaignsL2NavPanel /></SidebarFrame> };
export const L2Insights: Story    = { name: panelStories[10].name, render: () => <SidebarFrame><InsightsL2NavPanel /></SidebarFrame> };
export const L2Competitors: Story = { name: panelStories[11].name, render: () => <SidebarFrame><CompetitorsL2NavPanel /></SidebarFrame> };
export const L2Agents: Story      = { name: panelStories[12].name, render: () => <SidebarFrame><AgentsL2NavPanel currentView="agents-monitor" onViewChange={() => {}} selectedAgentSlug="" /></SidebarFrame> };

/** Explicit design-version snapshots for Agents L2 panel. */
export const L2AgentsDesignV1: Story = {
  name: "L2 / Agents (v1)",
  render: () => (
    <SidebarFrame>
      <AgentsL2NavPanelV1 currentView="agents-monitor" onViewChange={() => {}} selectedAgentSlug="" />
    </SidebarFrame>
  ),
};
export const L2AgentsDesignV2: Story = {
  name: "L2 / Agents (v2)",
  render: () => (
    <SidebarFrame>
      <AgentsL2NavPanelV2 currentView="agents-monitor" onViewChange={() => {}} selectedAgentSlug="" />
    </SidebarFrame>
  ),
};
