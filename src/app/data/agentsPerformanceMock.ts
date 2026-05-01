export type TrendDirection = "up" | "down" | "neutral";

export interface KpiMetric {
  label: string;
  value: string;
  trend: TrendDirection;
  delta: string;
}

export interface AiInsight {
  text: string;
  action?: string;
}

export interface BenchmarkItem {
  label: string;
  percentile: number;
  result: string;
  tooltip: string;
}

export interface AgentMetricRow {
  label: string;
  value: string;
  trend?: TrendDirection;
  delta?: string;
}

export type AgentStatus = "active" | "inactive" | "not-configured";

export interface AgentSection {
  id: string;
  label: string;
  description: string;
  status: AgentStatus;
  metrics: AgentMetricRow[];
  insight: AiInsight;
  benchmark: string;
}

/* ─── Global KPIs (Surface A) ─── */
export const globalKpis: KpiMetric[] = [
  { label: "Reviews handled",     value: "12,430", trend: "up",      delta: "+18%" },
  { label: "Avg response time",   value: "2.1 hrs", trend: "up",     delta: "−25%" },
  { label: "Customer satisfaction", value: "4.6★",  trend: "up",     delta: "+0.3" },
  { label: "Leads generated",     value: "1,240",  trend: "up",      delta: "+22%" },
  { label: "Tickets resolved",    value: "3,890",  trend: "up",      delta: "+15%" },
  { label: "Social engagement",   value: "+32%",   trend: "neutral", delta: "uplift" },
];

/* ─── AI Insights (Surface B) ─── */
export const globalInsights: AiInsight[] = [
  {
    text: "Review response speed improved by 25% vs last month — driven primarily by the Review Response Agent across 8 active locations.",
    action: "View response time breakdown",
  },
  {
    text: "Social engagement increased 32% after enabling the Amplification Agent. 5★ reviews with images are generating 3× more reach.",
    action: "See top-performing reviews",
  },
  {
    text: "Ticket resolution SLA improved across 3 locations. Escalation rate dropped to 6% this period — your lowest on record.",
    action: "Review SLA report",
  },
  {
    text: "Review generation conversion rate via SMS is 2× higher than email. Shifting volume toward SMS could yield ~200 additional reviews next month.",
    action: "Adjust channel settings",
  },
];

/* ─── Benchmarks (Surface C) ─── */
export const globalBenchmarks: BenchmarkItem[] = [
  {
    label: "Response time",
    percentile: 78,
    result: "Faster than 78% of competitors",
    tooltip: "Compared against businesses in your industry vertical and region with the same agent configuration.",
  },
  {
    label: "Rating improvement",
    percentile: 80,
    result: "Top 20% in category",
    tooltip: "Month-over-month rating trend benchmarked against your industry vertical.",
  },
  {
    label: "Engagement rate",
    percentile: 65,
    result: "Above industry average",
    tooltip: "Social engagement rate across all published content vs. industry average for your category.",
  },
  {
    label: "Review volume growth",
    percentile: 72,
    result: "Top 28% in your market",
    tooltip: "Review acquisition growth rate vs. comparable businesses. Updated monthly.",
  },
];

/* ─── Product groups (shared by nav + content) ─── */
export const agentGroups: { label: string; agentIds: string[] }[] = [
  { label: "Reviews",   agentIds: ["review-response","review-generation","review-amplification","review-monitoring","review-aggregation","review-marketing"] },
  { label: "Social",    agentIds: ["social-publishing","social-engagement"] },
  { label: "Listings",  agentIds: ["listing-ranking","duplicate-suppression","auto-fix"] },
  { label: "Search", agentIds: ["search-ai"] },
  { label: "Support",   agentIds: ["messaging","ticketing","scheduled-report"] },
];

/* ─── Agent Sections ─── */
export const agentSections: AgentSection[] = [
  {
    id: "review-response",
    label: "Review Response Agent",
    description: "Automatically responds to new reviews across all connected platforms.",
    status: "active",
    metrics: [
      { label: "Total reviews responded",   value: "4,210",   trend: "up",   delta: "+12%" },
      { label: "Response rate",             value: "92%",     trend: "up",   delta: "+4%" },
      { label: "Avg response time",         value: "2.1 hrs", trend: "up",   delta: "−25%" },
      { label: "Sentiment improvement",     value: "+0.3",    trend: "up",   delta: "vs prior" },
      { label: "CSAT impact",               value: "+0.2",    trend: "up",   delta: "pts" },
    ],
    insight: {
      text: "92% response rate achieved. Negative reviews are being handled faster than positive ones — this is unusual and may warrant a review of response prioritization rules.",
      action: "Review prioritization settings",
    },
    benchmark: "Your response rate: 92% | Industry average: 76%",
  },
  {
    id: "review-generation",
    label: "Review Generation Agent",
    description: "Sends review requests to customers after interactions and tracks conversion.",
    status: "active",
    metrics: [
      { label: "New reviews generated",  value: "1,240",  trend: "up",   delta: "+22%" },
      { label: "Conversion rate",        value: "18%",    trend: "up",   delta: "+3%" },
      { label: "5★ reviews",             value: "805",    trend: "up",   delta: "+19%" },
      { label: "SMS conversion rate",    value: "22%",    trend: "up",   delta: "vs 11% email" },
      { label: "Email conversion rate",  value: "11%",    trend: "neutral", delta: "stable" },
    ],
    insight: {
      text: "SMS drives 2× more reviews than email. Consider increasing SMS send volume or shifting budget allocation toward SMS campaigns.",
      action: "Adjust channel allocation",
    },
    benchmark: "Your conversion rate: 18% | Industry average: 11%",
  },
  {
    id: "review-amplification",
    label: "Review Amplification Agent",
    description: "Shares top reviews on social channels to amplify social proof.",
    status: "active",
    metrics: [
      { label: "Reviews shared",       value: "320",    trend: "up",   delta: "+8%" },
      { label: "Engagement per post",  value: "12%",    trend: "up",   delta: "+2%" },
      { label: "Clicks",               value: "4,800",  trend: "up",   delta: "+15%" },
      { label: "Impressions",          value: "40,000", trend: "up",   delta: "+11%" },
    ],
    insight: {
      text: "5★ reviews with images generate 3× more engagement. Prioritizing image-rich reviews in amplification will improve reach without additional cost.",
      action: "Set image-first preference",
    },
    benchmark: "Your engagement rate: 12% | Industry average: 7%",
  },
  {
    id: "social-publishing",
    label: "Social Publishing Agent",
    description: "Creates and publishes branded social content across connected platforms.",
    status: "active",
    metrics: [
      { label: "Posts published",     value: "145",    trend: "up",    delta: "+18%" },
      { label: "Engagement rate",     value: "8%",     trend: "neutral", delta: "stable" },
      { label: "Reach",               value: "22,000", trend: "up",    delta: "+14%" },
      { label: "Impressions",         value: "88,000", trend: "up",    delta: "+20%" },
    ],
    insight: {
      text: "Posts published on Thursday and Friday receive 40% more engagement than other days. Adjusting the posting schedule could increase organic reach.",
      action: "Optimize posting schedule",
    },
    benchmark: "Your engagement rate: 8% | Industry average: 5.2%",
  },
  {
    id: "social-engagement",
    label: "Social Engagement Agent",
    description: "Monitors and responds to comments and messages across social platforms.",
    status: "active",
    metrics: [
      { label: "Comments replied",       value: "880",    trend: "up",   delta: "+9%" },
      { label: "Avg response time",      value: "1.4 hrs", trend: "up",  delta: "−18%" },
      { label: "Sentiment shift",        value: "+0.4",   trend: "up",   delta: "pts" },
      { label: "Customer satisfaction",  value: "4.7★",   trend: "up",   delta: "+0.2" },
    ],
    insight: {
      text: "Response time dropped to 1.4 hrs, improving customer sentiment by 0.4 points. Customers who receive responses within 2 hours are 60% more likely to return.",
      action: "View sentiment breakdown",
    },
    benchmark: "Your response rate: 94% | Industry average: 68%",
  },
  {
    id: "ticketing",
    label: "Ticketing Agent",
    description: "Automatically triages, routes, and resolves inbound support tickets.",
    status: "active",
    metrics: [
      { label: "Tickets resolved",      value: "3,890",  trend: "up",    delta: "+15%" },
      { label: "Avg resolution time",   value: "3.2 hrs", trend: "up",   delta: "−22%" },
      { label: "Escalation rate",       value: "6%",     trend: "up",    delta: "−2%" },
      { label: "SLA adherence",         value: "94%",    trend: "up",    delta: "+3%" },
    ],
    insight: {
      text: "SLA adherence reached 94% — up 3 points from last month. Escalation rate hit a new low of 6%. Billing-related tickets take 2× longer than average.",
      action: "Review billing ticket routing",
    },
    benchmark: "Your SLA adherence: 94% | Industry average: 81%",
  },
  {
    id: "scheduled-report",
    label: "Scheduled Report Agent",
    description: "Generates and delivers automated performance reports to stakeholders.",
    status: "active",
    metrics: [
      { label: "Reports sent",           value: "210",    trend: "up",    delta: "+5%" },
      { label: "Open rate",              value: "61%",    trend: "up",    delta: "+7%" },
      { label: "Download rate",          value: "38%",    trend: "neutral", delta: "stable" },
      { label: "Total recipients",       value: "1,400",  trend: "up",    delta: "+12%" },
    ],
    insight: {
      text: "Open rate of 61% is well above the 38% industry benchmark. Weekly digest reports have 2× the open rate of monthly summaries.",
      action: "Shift to weekly cadence",
    },
    benchmark: "Your open rate: 61% | Industry average: 38%",
  },
  {
    id: "review-monitoring",
    label: "Review Monitoring Agent",
    description: "Continuously watches for new reviews and surfaces anomalies and sentiment shifts in real time.",
    status: "active",
    metrics: [
      { label: "Reviews monitored",       value: "12,430",  trend: "up",   delta: "+18%" },
      { label: "New reviews detected",    value: "1,840",   trend: "up",   delta: "+11%" },
      { label: "Spike alerts triggered",  value: "3",       trend: "neutral", delta: "this period" },
      { label: "Avg time to alert",       value: "4 min",   trend: "up",   delta: "−1 min" },
      { label: "Sentiment trend (7d)",    value: "+0.2",    trend: "up",   delta: "rolling" },
    ],
    insight: {
      text: "A spike in 1★ reviews was detected on Google over the last 48 hours across 2 locations. Most mention wait times — this may indicate an operational issue worth investigating.",
      action: "View flagged reviews",
    },
    benchmark: "Alert latency: 4 min | Industry average: 18 min",
  },
  {
    id: "review-aggregation",
    label: "Review Aggregation Agent",
    description: "Pulls and consolidates reviews from all sources into a unified feed.",
    status: "active",
    metrics: [
      { label: "Reviews aggregated",   value: "12,430",  trend: "up",    delta: "+18%" },
      { label: "Sources connected",    value: "6",       trend: "neutral", delta: "stable" },
      { label: "Sync success rate",    value: "99.1%",   trend: "up",    delta: "+0.2%" },
      { label: "Avg sync latency",     value: "2.8 hrs", trend: "down",  delta: "+1.4 hrs Yelp" },
      { label: "Duplicate detection",  value: "312",     trend: "up",    delta: "+24" },
    ],
    insight: {
      text: "All 6 review sources are syncing successfully. Yelp sync latency increased to 4.2 hours this week — consider checking the Yelp API connection for this location.",
      action: "Check Yelp connection",
    },
    benchmark: "Your sync success rate: 99.1% | Platform average: 96.4%",
  },
  {
    id: "listing-ranking",
    label: "Listing Ranking Agent",
    description: "Monitors and optimizes business listing health across directories to improve local search ranking.",
    status: "active",
    metrics: [
      { label: "Listings managed",          value: "48",    trend: "neutral", delta: "stable" },
      { label: "Listing accuracy score",    value: "94%",   trend: "up",   delta: "+3%" },
      { label: "Avg ranking position",      value: "#3.2",  trend: "up",   delta: "▲4 spots" },
      { label: "Ranking improvements",      value: "+4 pos", trend: "up",  delta: "this month" },
      { label: "Suppressed duplicates",     value: "3",     trend: "up",   delta: "this period" },
    ],
    insight: {
      text: "Average local ranking improved by 4 positions this month. 3 duplicate listings were suppressed on Google Maps — this likely contributed to the ranking lift.",
      action: "View ranking history",
    },
    benchmark: "Your avg rank: #3.2 | Competitors avg: #5.8",
  },
  {
    id: "search-ai",
    label: "Search Agent",
    description: "Optimizes presence in AI-driven search surfaces (Google AI Overviews, Bing Copilot) and tracks AI search visibility.",
    status: "active",
    metrics: [
      { label: "AI search appearances",      value: "340",   trend: "up",   delta: "+22%" },
      { label: "Share of voice",             value: "18%",   trend: "up",   delta: "+3%" },
      { label: "Queries triggering mention", value: "28",    trend: "up",   delta: "+6" },
      { label: "AI description sentiment",   value: "4.3★",  trend: "up",   delta: "+0.2" },
      { label: "WoW visibility trend",       value: "+8%",   trend: "up",   delta: "week over week" },
    ],
    insight: {
      text: "Your business was mentioned in AI search results for \"best dentist near downtown\" 340 times this month — up 22% from last month. Keeping your Google profile updated is directly correlated with this visibility.",
      action: "Update Google profile",
    },
    benchmark: "AI search visibility: Top 15% in your category",
  },
  {
    id: "messaging",
    label: "Messaging Agent",
    description: "Handles inbound and outbound customer messages across SMS, webchat, and other channels.",
    status: "active",
    metrics: [
      { label: "Total messages handled",      value: "6,240",  trend: "up",   delta: "+19%" },
      { label: "Avg first response time",     value: "48 sec", trend: "up",   delta: "−35%" },
      { label: "Resolution rate",             value: "84%",    trend: "up",   delta: "+4%" },
      { label: "Escalation rate",             value: "16%",    trend: "up",   delta: "−4%" },
      { label: "CSAT score",                  value: "4.5★",   trend: "up",   delta: "+0.3" },
      { label: "Busiest channel",             value: "SMS",    trend: "neutral", delta: "91% resolution" },
    ],
    insight: {
      text: "84% of inbound messages were resolved without escalation this month. Webchat resolution rate is lower than SMS (71% vs 91%) — reviewing webchat conversation flows may close this gap.",
      action: "Optimize webchat flows",
    },
    benchmark: "Your resolution rate: 84% | Industry average: 61%",
  },
  {
    id: "duplicate-suppression",
    label: "Duplicate Suppression Agent",
    description: "Continuously scans listing directories to detect, flag, and suppress duplicate listings.",
    status: "active",
    metrics: [
      { label: "Duplicates detected",       value: "14",     trend: "neutral", delta: "this month" },
      { label: "Duplicates suppressed",     value: "11",     trend: "up",   delta: "79%" },
      { label: "Suppression success rate",  value: "79%",    trend: "up",   delta: "+5%" },
      { label: "Avg time to suppress",      value: "18 hrs", trend: "up",   delta: "−4 hrs" },
      { label: "Active pending",            value: "3",      trend: "down", delta: "Yelp manual" },
    ],
    insight: {
      text: "14 duplicate listings were detected this month across Google, Yelp, and Apple Maps. 11 were successfully suppressed. The 3 remaining on Yelp require manual review — a support ticket has been flagged.",
      action: "Review pending duplicates",
    },
    benchmark: "Your suppression rate: 79% | Platform average: 55%",
  },
  {
    id: "auto-fix",
    label: "Auto-Fix Agent for Listing Publishing",
    description: "Automatically identifies and corrects listing inaccuracies across directories without manual intervention.",
    status: "active",
    metrics: [
      { label: "Fields monitored",         value: "840",    trend: "neutral", delta: "across 6 dirs" },
      { label: "Inaccuracies detected",    value: "62",     trend: "neutral", delta: "this month" },
      { label: "Auto-fixes applied",       value: "38",     trend: "up",   delta: "61% auto" },
      { label: "Fix success rate",         value: "97%",    trend: "up",   delta: "+2%" },
      { label: "Avg time to fix",          value: "1.8 hrs", trend: "up",  delta: "−0.4 hrs" },
      { label: "Listing health score",     value: "94%",    trend: "up",   delta: "+4%" },
    ],
    insight: {
      text: "38 listing fields were auto-corrected this month across 6 directories. Google Business Profile had the highest drift rate — hours and service descriptions were overwritten by third-party data 4 times. Auto-Fix reversed all 4 within 2 hours.",
      action: "View Google drift log",
    },
    benchmark: "Your listing health: 94% | Industry average: 78%",
  },
  {
    id: "review-marketing",
    label: "Review Marketing Agent",
    description: "Amplifies reviews with HIPAA/PHI/PII-compliant marketing assets for healthcare and regulated verticals.",
    status: "active",
    metrics: [
      { label: "Reviews syndicated",          value: "196",     trend: "up",   delta: "+14%" },
      { label: "Testimonial widget impressions", value: "42,000", trend: "up",  delta: "+28%" },
      { label: "Widget click-through rate",   value: "6.2%",   trend: "up",   delta: "+0.8%" },
      { label: "PHI/PII flags scrubbed",      value: "18",     trend: "neutral", delta: "auto-held" },
      { label: "HIPAA compliance pass rate",  value: "100%",   trend: "up",   delta: "all cleared" },
      { label: "Content approved vs. held",   value: "196/214", trend: "neutral", delta: "8.4% held" },
    ],
    insight: {
      text: "214 reviews were eligible for marketing use this month. 18 were automatically held due to potential PHI (patient name references and procedure mentions). 196 were approved and syndicated — generating 42,000 testimonial widget impressions. Compliance pass rate: 100%.",
      action: "View compliance audit log",
    },
    benchmark: "Testimonial CTR: 6.2% | Industry average: 2.8%",
  },
];
