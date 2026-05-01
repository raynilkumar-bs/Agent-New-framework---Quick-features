/** Shared mock types + data for Agents Monitor (activity feed + notifications). */

export type ActivityStatus = "success" | "warning" | "error" | "processing";

export type ActivityCategory =
  | "Customer interaction"
  | "Automation"
  | "Content publishing"
  | "Data update"
  | "System event"
  | "Error";

export interface TimelineStep {
  time: string;
  label: string;
  detail?: string;
}

export interface AgentReasoning {
  sentiment?: string;
  topic?: string;
  customerHistory?: string;
  confidence: number;
}

export interface ReviewLink {
  platform: string;
  rating: number;
  reviewText: string;
  generatedResponse: string;
}

export interface MonitorActivity {
  id: string;
  time: string;
  agentName: string;
  action: string;
  status: ActivityStatus;
  detail?: string;
  category: ActivityCategory;
  timeline?: TimelineStep[];
  reasoning?: AgentReasoning;
  hasDraft?: boolean;
  draftText?: string;
  /** Set on review-related activities to enable deep-link into Reviews tab */
  reviewLink?: ReviewLink;
}

export const monitorActivities: MonitorActivity[] = [
  {
    id: "m1",
    time: "10:42 AM",
    agentName: "Review response agent",
    action: "Replied to a 2-star review on Google",
    status: "success",
    detail: "Sentiment: negative • Auto-approved",
    category: "Customer interaction",
    timeline: [
      {
        time: "10:42:01",
        label: "Customer posted review",
        detail: '"Food was terrible and the wait was over an hour."',
      },
      { time: "10:42:04", label: "Agent detected sentiment: Negative" },
      {
        time: "10:42:06",
        label: "Agent generated response draft",
        detail:
          "\"I'm sorry your experience didn't meet expectations. We take feedback seriously and would love the chance to make it right...\"",
      },
      { time: "10:42:10", label: "Auto-approval rule applied" },
      { time: "10:42:11", label: "Response posted to Google" },
    ],
    reasoning: {
      sentiment: "Negative",
      topic: "Service delay",
      customerHistory: "First-time reviewer",
      confidence: 0.92,
    },
    reviewLink: {
      platform: "Google",
      rating: 2,
      reviewText: "Food was terrible and the wait was over an hour.",
      generatedResponse: "I'm sorry your experience didn't meet expectations. We take feedback seriously and would love the chance to make it right...",
    },
  },
  {
    id: "m2",
    time: "10:39 AM",
    agentName: "Social publishing agent",
    action: "Scheduled campaign post on Instagram",
    status: "success",
    detail: "Campaign: Spring Sale 2026",
    category: "Content publishing",
    timeline: [
      { time: "10:39:01", label: "Campaign trigger activated" },
      { time: "10:39:03", label: "Generated caption and hashtags" },
      { time: "10:39:05", label: "Image asset selected from library" },
      { time: "10:39:08", label: "Post scheduled for 2:00 PM EST" },
    ],
    reasoning: { topic: "Campaign scheduling", confidence: 0.95 },
  },
  {
    id: "m3",
    time: "10:34 AM",
    agentName: "Ticketing agent",
    action: "Escalated support request to Tier 2",
    status: "warning",
    detail: "Confidence: low",
    category: "Customer interaction",
    timeline: [
      { time: "10:34:01", label: "Ticket #5201 received" },
      { time: "10:34:04", label: "Agent classified: Billing dispute" },
      { time: "10:34:06", label: "Confidence below threshold (0.42)" },
      { time: "10:34:08", label: "Escalated to Tier 2 support" },
    ],
    reasoning: {
      topic: "Billing dispute",
      customerHistory: "3 prior tickets, VIP customer",
      confidence: 0.42,
    },
  },
  {
    id: "m4",
    time: "10:28 AM",
    agentName: "Review generation agent",
    action: "Sent 15 review requests via SMS",
    status: "success",
    detail: "Location: Austin, TX • Batch #847",
    category: "Automation",
    timeline: [
      { time: "10:28:01", label: "Batch #847 triggered" },
      { time: "10:28:03", label: "15 eligible customers identified" },
      { time: "10:28:06", label: "SMS messages dispatched" },
      { time: "10:28:10", label: "Delivery confirmed: 15/15" },
    ],
    reasoning: { topic: "Review solicitation", confidence: 0.98 },
  },
  {
    id: "m5",
    time: "10:22 AM",
    agentName: "Listing optimization agent",
    action: "Updated hours on 3 Google Business profiles",
    status: "success",
    detail: "Locations: San Francisco, Austin, Denver",
    category: "Data update",
    timeline: [
      { time: "10:22:01", label: "Holiday schedule detected" },
      { time: "10:22:04", label: "Updated 3 location profiles" },
      { time: "10:22:08", label: "Changes verified on Google" },
    ],
    reasoning: { topic: "Holiday hours sync", confidence: 0.97 },
  },
  {
    id: "m6",
    time: "10:15 AM",
    agentName: "Social publishing agent",
    action: "Failed to publish post — token expired",
    status: "error",
    detail: "Platform: Facebook • Error code: AUTH_EXPIRED",
    category: "Error",
    timeline: [
      { time: "10:15:01", label: "Scheduled post triggered" },
      {
        time: "10:15:03",
        label: "API authentication failed",
        detail: "Facebook OAuth token expired",
      },
      { time: "10:15:05", label: "Retry attempt 1 failed" },
      { time: "10:15:08", label: "Action flagged for manual intervention" },
    ],
    reasoning: { topic: "Authentication failure", confidence: 0.0 },
  },
  {
    id: "m7",
    time: "10:08 AM",
    agentName: "Review response agent",
    action: "Drafted response for 1-star review (pending approval)",
    status: "warning",
    detail: "Confidence: 0.38 • Requires human review",
    category: "Customer interaction",
    hasDraft: true,
    draftText:
      "We sincerely apologize for your experience. Your feedback is important to us, and we'd like to make things right. Could you reach out to our team directly so we can address your concerns?",
    timeline: [
      { time: "10:08:01", label: "1-star review detected on Google" },
      { time: "10:08:04", label: "Agent analyzed sentiment: Very negative" },
      {
        time: "10:08:07",
        label: "Response draft generated",
        detail: "Low confidence — flagged for human review",
      },
    ],
    reasoning: {
      sentiment: "Very negative",
      topic: "Product quality complaint",
      customerHistory: "Repeat customer, 2 prior reviews",
      confidence: 0.38,
    },
    reviewLink: {
      platform: "Google",
      rating: 1,
      reviewText: "Worst experience I've had. Product broke after two days and support was unhelpful.",
      generatedResponse: "We sincerely apologize for your experience. Your feedback is important to us, and we'd like to make things right. Could you reach out to our team directly so we can address your concerns?",
    },
  },
  {
    id: "m8",
    time: "9:55 AM",
    agentName: "Ticketing agent",
    action: "Auto-closed 12 resolved tickets",
    status: "success",
    detail: "SLA compliance: 98.2%",
    category: "Automation",
    timeline: [
      { time: "9:55:01", label: "Batch close triggered" },
      { time: "9:55:04", label: "12 tickets identified as resolved >48h" },
      { time: "9:55:06", label: "Closure notifications sent" },
    ],
    reasoning: { topic: "Ticket lifecycle management", confidence: 0.99 },
  },
  {
    id: "m9",
    time: "9:48 AM",
    agentName: "Review response agent",
    action: "Replied to a 5-star review on Yelp",
    status: "success",
    detail: "Sentiment: positive • Auto-approved",
    category: "Customer interaction",
    timeline: [
      { time: "9:48:01", label: "5-star review detected on Yelp" },
      { time: "9:48:03", label: "Sentiment: Positive" },
      { time: "9:48:05", label: "Thank-you response generated and posted" },
    ],
    reasoning: { sentiment: "Positive", topic: "Positive feedback", confidence: 0.96 },
    reviewLink: {
      platform: "Yelp",
      rating: 5,
      reviewText: "Amazing food and service! The staff went above and beyond to make our evening special.",
      generatedResponse: "Thank you so much for the kind words! We're thrilled you had a great experience and hope to see you again soon.",
    },
  },
  {
    id: "m10",
    time: "9:42 AM",
    agentName: "Social engagement agent",
    action: "Responded to 8 comments on Facebook",
    status: "success",
    detail: "Avg response time: 2.3 min",
    category: "Customer interaction",
    timeline: [
      { time: "9:42:01", label: "8 new comments detected" },
      { time: "9:42:04", label: "Responses generated and posted" },
    ],
    reasoning: { topic: "Social engagement", confidence: 0.91 },
  },
  {
    id: "m11",
    time: "9:35 AM",
    agentName: "Listing optimization agent",
    action: "Detected outdated photo on Google listing",
    status: "warning",
    detail: "Location: Portland • Flagged for review",
    category: "Data update",
    timeline: [
      { time: "9:35:01", label: "Photo audit completed" },
      { time: "9:35:04", label: "1 photo flagged as outdated (>12 months)" },
      { time: "9:35:06", label: "Notification sent to location manager" },
    ],
    reasoning: { topic: "Visual content freshness", confidence: 0.78 },
  },
  {
    id: "m12",
    time: "9:28 AM",
    agentName: "Ticketing agent",
    action: "Failed to route ticket — missing category",
    status: "error",
    detail: "Ticket #4892 • Needs manual assignment",
    category: "Error",
    timeline: [
      { time: "9:28:01", label: "Ticket #4892 received" },
      { time: "9:28:03", label: "Category classification failed" },
      { time: "9:28:05", label: "Routing aborted — flagged for manual assignment" },
    ],
    reasoning: { topic: "Unclassifiable request", confidence: 0.12 },
  },
];
