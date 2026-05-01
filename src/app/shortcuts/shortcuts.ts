/** Keep in sync with `AppView` in `App.tsx` (avoid importing App — circular). */
export type ShortcutScope =
  | "global"
  | "reviews"
  | "inbox"
  | "agents"
  | "social"
  | "dashboard"
  | "ticketing"
  | "surveys"
  | "default";

export interface ShortcutDefinition {
  id: string;
  keys: string[];
  description: string;
  /** Shown in modal; global shortcuts always listed */
  scope: ShortcutScope;
}

export function shortcutScopeFromView(view: string): ShortcutScope {
  if (view === "reviews") return "reviews";
  if (view === "inbox") return "inbox";
  if (
    view === "agents-monitor" ||
    view === "agents-builder" ||
    view === "agents-onboarding" ||
    view === "agent-detail" ||
    view === "birdai-reports" ||
    view === "schedule-builder"
  ) {
    return "agents";
  }
  if (view === "social") return "social";
  if (view === "ticketing") return "ticketing";
  if (view === "surveys") return "surveys";
  if (
    view === "dashboard" ||
    view === "listings" ||
    view === "campaigns" ||
    view === "insights" ||
    view === "competitors"
  ) {
    return "dashboard";
  }
  return "default";
}

/** All shortcuts documented in the help modal (single source of truth). */
export const SHORTCUT_REGISTRY: ShortcutDefinition[] = [
  {
    id: "open-help",
    keys: ["?"],
    description: "Show keyboard shortcuts",
    scope: "global",
  },
  {
    id: "open-help-cmdk",
    keys: ["⌘", "K"],
    description: "Show keyboard shortcuts",
    scope: "global",
  },
  {
    id: "go-ticketing",
    keys: ["G", "T"],
    description: "Go to Ticketing",
    scope: "global",
  },
  {
    id: "go-reviews",
    keys: ["G", "V"],
    description: "Go to Reviews",
    scope: "global",
  },
  {
    id: "go-monitor",
    keys: ["G", "M"],
    description: "Go to BirdAI (Monitor)",
    scope: "global",
  },
  {
    id: "go-shared",
    keys: ["G", "P"],
    description: "Go to Shared by me",
    scope: "global",
  },
  {
    id: "go-overview",
    keys: ["G", "O"],
    description: "Go to Overview",
    scope: "global",
  },
  {
    id: "reviews-search",
    keys: ["/"],
    description: "Focus reviews search",
    scope: "reviews",
  },
  {
    id: "reviews-filters",
    keys: ["F"],
    description: "Toggle review filters",
    scope: "reviews",
  },
  {
    id: "reviews-ai",
    keys: ["C"],
    description: "Focus AI reply assistant",
    scope: "reviews",
  },
  {
    id: "inbox-compose",
    keys: ["C"],
    description: "Focus message composer",
    scope: "inbox",
  },
  {
    id: "inbox-search",
    keys: ["R"],
    description: "Focus conversation search",
    scope: "inbox",
  },
  {
    id: "agents-builder",
    keys: ["B"],
    description: "Open Agent builder",
    scope: "agents",
  },
  {
    id: "agents-home",
    keys: ["H"],
    description: "Open Myna monitor",
    scope: "agents",
  },
  {
    id: "social-new",
    keys: ["N"],
    description: "New post (coming soon)",
    scope: "social",
  },
  {
    id: "dashboard-refresh",
    keys: ["R"],
    description: "Refresh reports (coming soon)",
    scope: "dashboard",
  },
  {
    id: "ticketing-new",
    keys: ["N"],
    description: "New ticket (coming soon)",
    scope: "ticketing",
  },
  {
    id: "surveys-new",
    keys: ["N"],
    description: "New survey (coming soon)",
    scope: "surveys",
  },
];

export function shortcutsForModal(scope: ShortcutScope): ShortcutDefinition[] {
  const global = SHORTCUT_REGISTRY.filter((s) => s.scope === "global");
  const scoped =
    scope === "default"
      ? []
      : SHORTCUT_REGISTRY.filter((s) => s.scope === scope);
  return [...global, ...scoped];
}
