import type { AppView } from "./App";

/** Single source of truth for the top bar / Myna context label for each route. */
export function getAppViewTitle(view: AppView): string {
  switch (view) {
    case "business-overview":
      return "Overview";
    case "inbox":
      return "Inbox";
    case "storybook":
      return "Component showcase";
    case "reviews":
      return "Reviews";
    case "social":
      return "Social";
    case "searchai":
      return "Search";
    case "contacts":
      return "Contacts";
    case "listings":
      return "Listings";
    case "surveys":
      return "Surveys";
    case "ticketing":
      return "Ticketing";
    case "campaigns":
      return "Campaigns";
    case "insights":
      return "Insights";
    case "competitors":
      return "Competitors";
    case "referrals":
      return "Referrals";
    case "payments":
      return "Payments";
    case "appointments":
      return "Appointments";
    case "dashboard":
      return "Reports";
    case "shared-by-me":
      return "Shared by me";
    case "scheduled-deliveries":
    case "schedule-builder":
      return "Scheduled deliveries";
    case "agents-monitor":
    case "agents-analyze-performance":
    case "agents-builder":
    case "agent-detail":
    case "birdai-reports":
      return "BirdAI";
    case "agents-onboarding":
      return "BirdAI setup";
    case "birdai-journeys":
      return "BirdAI";
    case "conversation-stream":
      return "Conversation Stream";
    default:
      return "Reports";
  }
}

/** Browser tab titles when logged out — rotate on each sign-out (see App.tsx). */
export const LOGIN_TAB_TITLES = [
  "Welcome – Birdeye",
  "Hey there – Birdeye",
  "Sign in – Birdeye",
  "Hello – Birdeye",
  "Welcome back – Birdeye",
  "Good to see you – Birdeye",
  "Glad you're here – Birdeye",
  "Hi there – Birdeye",
  "Log in – Birdeye",
  "Let's get started – Birdeye",
  "Continue – Birdeye",
  "Almost there – Birdeye",
  "Jump back in – Birdeye",
  "Nice to see you – Birdeye",
  "Ready when you are – Birdeye",
  "Let's go – Birdeye",
  "Your workspace awaits – Birdeye",
  "Sign in to continue – Birdeye",
  "Secure sign-in – Birdeye",
  "Account access – Birdeye",
  "Back again – Birdeye",
  "Step inside – Birdeye",
  "Come on in – Birdeye",
  "Resume – Birdeye",
  "See you inside – Birdeye",
] as const;

export const LOGIN_TAB_TITLE_COUNT = LOGIN_TAB_TITLES.length;
