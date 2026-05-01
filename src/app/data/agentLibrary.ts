/** Agent Library — 7 themes, 54 agents, badge system. */

export type BadgeType = "POPULAR" | "AI" | "NEW" | "CORE" | "PIPELINE";

export interface AgentCard {
  slug: string;
  name: string;
  description: string;
  badges: BadgeType[];
  usedBy?: string;
  pipelineStep?: string;
}

export interface AgentTheme {
  id: string;
  title: string;
  subtitle: string;
  heroBg: string;
  heroBgDark: string;
  heroText: string;
  agents: AgentCard[];
}

export const BADGE_COLORS: Record<BadgeType, { bg: string; text: string; darkBg: string; darkText: string }> = {
  POPULAR:  { bg: "#FAECE7", text: "#712B13", darkBg: "#3d2418", darkText: "#e8a07a" },
  AI:       { bg: "#EEEDFE", text: "#3C3489", darkBg: "#262246", darkText: "#b4a8f0" },
  NEW:      { bg: "#E1F5EE", text: "#085041", darkBg: "#0f2e25", darkText: "#6dd4b0" },
  CORE:     { bg: "#E6F1FB", text: "#0C447C", darkBg: "#0f2640", darkText: "#6db3e8" },
  PIPELINE: { bg: "#FEF3C7", text: "#92400E", darkBg: "#3d2e0a", darkText: "#e8c55a" },
};

export const agentThemes: AgentTheme[] = [
  /* ═══ Theme 1 — Reputation Management ═══ */
  {
    id: "reputation",
    title: "Reputation Management",
    subtitle: "Win more reviews, respond faster, track brand health across every platform",
    heroBg: "#E6F1FB",
    heroBgDark: "#0f2640",
    heroText: "#185FA5",
    agents: [
      { slug: "review-request-sender", name: "Review request sender", description: "Auto-sends review invites via SMS/email after a job or visit.", badges: ["CORE", "POPULAR"], usedBy: "2,400+" },
      { slug: "review-responder", name: "Review responder", description: "Drafts on-brand replies to new reviews using AI.", badges: ["AI", "POPULAR"], usedBy: "1,800+" },
      { slug: "review-monitor", name: "Review monitor", description: "Alerts team when negative reviews appear across 200+ sites.", badges: ["CORE"], usedBy: "3,100+" },
      { slug: "review-aggregator", name: "Review aggregator", description: "Pulls all reviews into one feed with sentiment tagging.", badges: ["CORE"], usedBy: "2,200+" },
      { slug: "competitor-review-spy", name: "Competitor review spy", description: "Tracks competitor ratings and surfaces gaps you can win.", badges: ["AI", "NEW"] },
      { slug: "review-widget-builder", name: "Review widget builder", description: "Generates embeddable review showcase for your website.", badges: ["CORE"], usedBy: "1,400+" },
      { slug: "reputation-score-tracker", name: "Reputation score tracker", description: "Weekly digest of star rating trends by location.", badges: ["CORE"], usedBy: "1,600+" },
      { slug: "review-insight-summariser", name: "Review insight summariser", description: "Turns hundreds of reviews into key themes and action items.", badges: ["AI", "NEW"] },
    ],
  },

  /* ═══ Theme 2 — Social Media ═══ */
  {
    id: "social",
    title: "Social Media",
    subtitle: "Publish, engage, and grow across every social channel from one place",
    heroBg: "#E1F5EE",
    heroBgDark: "#0f2e25",
    heroText: "#0F6E56",
    agents: [
      { slug: "social-post-publisher", name: "Social post publisher", description: "Schedules and posts to FB, IG, LinkedIn, Twitter in one click.", badges: ["CORE", "POPULAR"], usedBy: "2,100+" },
      { slug: "caption-writer", name: "Caption writer", description: "Generates platform-specific captions with hashtags and CTAs.", badges: ["AI", "POPULAR"], usedBy: "1,500+" },
      { slug: "social-inbox-manager", name: "Social inbox manager", description: "Responds to comments and DMs across all platforms.", badges: ["CORE"], usedBy: "1,200+" },
      { slug: "content-calendar-planner", name: "Content calendar planner", description: "Builds a 30-day post schedule based on your goals.", badges: ["AI", "NEW"] },
      { slug: "social-listening-agent", name: "Social listening agent", description: "Monitors brand mentions and keywords across social platforms.", badges: ["NEW"] },
      { slug: "image-generator", name: "Image generator", description: "Creates on-brand visuals for posts from a text prompt.", badges: ["AI", "NEW"] },
      { slug: "review-to-post-converter", name: "Review-to-post converter", description: "Turns 5-star reviews into shareable social content.", badges: ["AI", "NEW"] },
      { slug: "social-performance-reporter", name: "Social performance reporter", description: "Weekly summary of reach, engagement, and top posts.", badges: ["CORE"], usedBy: "900+" },
    ],
  },

  /* ═══ Theme 3 — Listings & SEO ═══ */
  {
    id: "listings",
    title: "Listings & SEO",
    subtitle: "Get found on Google, Maps, and voice search — accurate everywhere, always",
    heroBg: "#EEEDFE",
    heroBgDark: "#1e1a3a",
    heroText: "#534AB7",
    agents: [
      { slug: "listings-manager", name: "Listings manager", description: "Syncs business info across Google, Yelp, Apple Maps, and 60+ directories.", badges: ["CORE", "POPULAR"], usedBy: "3,500+" },
      { slug: "duplicate-suppressor", name: "Duplicate suppressor", description: "Finds and removes duplicate listings that hurt local rankings.", badges: ["CORE"], usedBy: "1,100+" },
      { slug: "seo-optimiser-agent", name: "SEO optimiser agent", description: "Audits and improves listing content for local search ranking.", badges: ["AI", "CORE"], usedBy: "1,300+" },
      { slug: "aeo-optimiser-agent", name: "AEO optimiser agent", description: "Structures data so AI assistants (ChatGPT, Perplexity) surface your business.", badges: ["AI", "NEW"] },
      { slug: "local-rank-tracker", name: "Local rank tracker", description: "Shows where you rank on Google Maps grid by location.", badges: ["NEW"] },
      { slug: "google-business-post-agent", name: "Google Business post agent", description: "Creates and schedules weekly Google Business Profile posts.", badges: ["AI", "NEW"] },
      { slug: "listing-health-monitor", name: "Listing health monitor", description: "Alerts when listings are changed or go out of sync.", badges: ["CORE"], usedBy: "2,000+" },
    ],
  },

  /* ═══ Theme 4 — Messaging & Inbox ═══ */
  {
    id: "messaging",
    title: "Messaging & Inbox",
    subtitle: "Talk to every customer across SMS, webchat, email, and social — in one inbox",
    heroBg: "#FAECE7",
    heroBgDark: "#3d2418",
    heroText: "#993C1D",
    agents: [
      { slug: "unified-inbox", name: "Unified inbox", description: "All customer messages across channels in one view.", badges: ["CORE", "POPULAR"], usedBy: "4,200+" },
      { slug: "ai-webchat-bot", name: "AI webchat bot", description: "Answers FAQs, books appointments, captures leads 24/7.", badges: ["AI", "POPULAR"], usedBy: "2,800+" },
      { slug: "sms-campaign-sender", name: "SMS campaign sender", description: "Sends targeted promotional or transactional SMS blasts.", badges: ["CORE"], usedBy: "1,700+" },
      { slug: "email-campaign-sender", name: "Email campaign sender", description: "Creates and sends segmented email campaigns with analytics.", badges: ["CORE"], usedBy: "1,400+" },
      { slug: "auto-reply-agent", name: "Auto-reply agent", description: "Sends instant AI-drafted replies to common inbound messages.", badges: ["AI", "NEW"] },
      { slug: "missed-call-text-back", name: "Missed call text-back", description: "Instantly texts back customers who called and got no answer.", badges: ["CORE"], usedBy: "2,600+" },
      { slug: "conversation-summariser", name: "Conversation summariser", description: "Summarises long message threads into key points for staff.", badges: ["AI", "NEW"] },
      { slug: "inbound-call-agent", name: "Inbound call agent", description: "Picks up every inbound call, runs verification, presents options.", badges: ["AI", "NEW", "PIPELINE"], pipelineStep: "Step 1 of 4" },
      { slug: "outbound-call-agent", name: "Outbound call agent", description: "Calls patient to inform them of out-of-pocket amount before visit.", badges: ["AI", "NEW", "PIPELINE"], pipelineStep: "Step 3 of 4" },
    ],
  },

  /* ═══ Theme 5 — Surveys & Feedback ═══ */
  {
    id: "surveys",
    title: "Surveys & Feedback",
    subtitle: "Capture customer sentiment at every touchpoint and turn it into action",
    heroBg: "#FAEEDA",
    heroBgDark: "#3a2e10",
    heroText: "#854F0B",
    agents: [
      { slug: "survey-builder-sender", name: "Survey builder & sender", description: "Creates and sends post-visit or post-purchase surveys via SMS/email.", badges: ["CORE", "POPULAR"], usedBy: "1,900+" },
      { slug: "nps-tracker", name: "NPS tracker", description: "Monitors promoter/detractor scores over time by location.", badges: ["CORE"], usedBy: "1,500+" },
      { slug: "feedback-insights-ai", name: "Feedback insights AI", description: "Summarises survey results into top themes and fixes.", badges: ["AI", "NEW"] },
      { slug: "referral-campaign-agent", name: "Referral campaign agent", description: "Identifies happy customers and triggers referral ask automatically.", badges: ["NEW"] },
      { slug: "csat-monitor", name: "CSAT monitor", description: "Tracks customer satisfaction scores across all touchpoints.", badges: ["CORE"], usedBy: "1,100+" },
      { slug: "detractor-recovery-agent", name: "Detractor recovery agent", description: "Flags unhappy customers and suggests recovery actions.", badges: ["AI", "NEW"] },
    ],
  },

  /* ═══ Theme 6 — Payments & Appointments ═══ */
  {
    id: "payments",
    title: "Payments & Appointments",
    subtitle: "Collect payments, fill your calendar, and reduce no-shows — all via text",
    heroBg: "#EAF3DE",
    heroBgDark: "#1a2e10",
    heroText: "#3B6D11",
    agents: [
      { slug: "payment-request-sender", name: "Payment request sender", description: "Sends text-to-pay links after service completion.", badges: ["CORE", "POPULAR"], usedBy: "2,300+" },
      { slug: "online-scheduler", name: "Online scheduler", description: "Lets customers book appointments directly from texts or webchat.", badges: ["CORE"], usedBy: "1,800+" },
      { slug: "estimate-invoice-agent", name: "Estimate & invoice agent", description: "Generates and sends estimates or invoices via SMS/email.", badges: ["CORE"], usedBy: "900+" },
      { slug: "no-show-recovery-agent", name: "No-show recovery agent", description: "Detects no-shows and sends rebooking message instantly.", badges: ["AI", "NEW"] },
      { slug: "payment-analytics", name: "Payment analytics", description: "Shows revenue collected, pending, and overdue by location.", badges: ["NEW"] },
      { slug: "finance-report-generator", name: "Finance report generator", description: "Creates weekly/monthly payment summaries for ops teams.", badges: ["NEW"] },
      { slug: "appointment-payment-reminder", name: "Appointment & payment reminder", description: "Auto-sends appointment reminders and payment reminders for outstanding balances.", badges: ["CORE", "NEW", "PIPELINE"], pipelineStep: "Step 4 of 4" },
      { slug: "insurance-verification-agent", name: "Insurance verification agent", description: "Verifies insurance eligibility and returns out-of-pocket estimate.", badges: ["AI", "NEW", "PIPELINE"], pipelineStep: "Step 2 of 4" },
    ],
  },

  /* ═══ Theme 7 — Insights & Reporting ═══ */
  {
    id: "insights",
    title: "Insights & Reporting",
    subtitle: "Know how every location is performing and where to act next",
    heroBg: "#FBEAF0",
    heroBgDark: "#3a1525",
    heroText: "#993556",
    agents: [
      { slug: "reputation-score-dashboard", name: "Reputation score dashboard", description: "Single score combining reviews, listings, and social health.", badges: ["CORE", "POPULAR"], usedBy: "2,700+" },
      { slug: "competitive-benchmarker", name: "Competitive benchmarker", description: "Compares your ratings and visibility against local competitors.", badges: ["CORE"], usedBy: "1,600+" },
      { slug: "location-performance-report", name: "Location performance report", description: "Side-by-side performance across all your business locations.", badges: ["CORE"], usedBy: "1,200+" },
      { slug: "ai-insights-digest", name: "AI insights digest", description: "Weekly plain-English summary of what's working and what's not.", badges: ["AI", "NEW"] },
      { slug: "custom-report-builder", name: "Custom report builder", description: "Drag-and-drop report creator exportable to PDF/CSV.", badges: ["NEW"] },
      { slug: "roi-calculator-agent", name: "ROI calculator agent", description: "Estimates revenue impact of reputation and messaging activity.", badges: ["AI", "NEW"] },
      { slug: "alert-anomaly-detector", name: "Alert & anomaly detector", description: "Notifies when any metric drops below a set threshold.", badges: ["NEW"] },
      { slug: "executive-summary-agent", name: "Executive summary agent", description: "Generates a boardroom-ready one-pager on business health.", badges: ["AI", "NEW"] },
    ],
  },
];
