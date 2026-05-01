export type MynaConversationType = "reports" | "reviews" | "agents" | "general";

export interface MynaChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface MynaConversation {
  id: string;
  title: string;
  /** L2 grouping */
  conversationType: MynaConversationType;
  /** Screen title when the thread was relevant (for "This screen" grouping) */
  screenLabel: string;
  messages: MynaChatMessage[];
}

const m = (id: string, role: "user" | "assistant", text: string): MynaChatMessage => ({
  id,
  role,
  text,
});

/** Deterministic seed for L2 ↔ conversation mapping and Storybook */
export const MYNA_SEED_CONVERSATIONS: MynaConversation[] = [
  {
    id: "myna-seed-reviews-pulse",
    title: "Pulse on Reviews",
    conversationType: "reviews",
    screenLabel: "Reviews",
    messages: [
      m(
        "m-pulse-a",
        "assistant",
        "Here is a quick pulse for **Reviews**: 12 new this week, sentiment slightly up vs last week.",
      ),
      m("m-pulse-u", "user", "Which locations drove the uptick?"),
      m(
        "m-pulse-a2",
        "assistant",
        "Top contributors were downtown and airport kiosks. I can break down by source if you want.",
      ),
    ],
  },
  {
    id: "myna-seed-reviews-draft",
    title: "Last week's sentiment",
    conversationType: "reviews",
    screenLabel: "Reviews",
    messages: [
      m("m-draft-u", "user", "How did sentiment trend last week?"),
      m(
        "m-draft-a",
        "assistant",
        "**Last week:** slightly positive vs the prior week; volume was steady. I can chart by location or source next.",
      ),
    ],
  },
  {
    id: "myna-seed-reports-q4",
    title: "Q4 report summary",
    conversationType: "reports",
    screenLabel: "Reports",
    messages: [
      m("m-q4-u", "user", "Summarize Q4 for leadership."),
      m(
        "m-q4-a",
        "assistant",
        "**Q4 snapshot:** revenue flat QoQ, NPS +2, support volume down 8%. Highlights: retention in enterprise tier and faster first response.",
      ),
    ],
  },
  {
    id: "myna-seed-agents-health",
    title: "Monitor health check",
    conversationType: "agents",
    screenLabel: "BirdAI",
    messages: [
      m("m-health-a", "assistant", "All monitored agents are **healthy**. Last errors cleared 2h ago."),
      m("m-health-u", "user", "Any queued jobs stuck?"),
      m(
        "m-health-a2",
        "assistant",
        "Two low-priority report jobs are retrying; nothing blocking customer-facing flows.",
      ),
    ],
  },
  {
    id: "myna-seed-general-social",
    title: "Social campaign ideas",
    conversationType: "general",
    screenLabel: "Social",
    messages: [
      m("m-soc-u", "user", "Ideas for a product launch thread."),
      m(
        "m-soc-a",
        "assistant",
        "Consider a countdown thread, a behind-the-scenes clip, and a single clear CTA. I can draft hooks for each.",
      ),
    ],
  },
];

export function mockAssistantReply(screenTitle: string): string {
  return `Thanks for your message. On **${screenTitle}**, I would pull live data next — this build uses **mock** replies. Connect your backend to stream real answers here.`;
}
