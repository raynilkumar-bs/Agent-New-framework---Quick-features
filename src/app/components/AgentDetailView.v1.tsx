import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Pause,
  Play,
  MoreHorizontal,
  Settings,
  Activity,
  TrendingUp,
  Zap,
  X,
  Calendar,
  Globe,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Copy,
  History,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */
interface AgentInstance {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "error" | "draft";
  tasksToday: number;
  successRate: number;
  lastRun: string;
  createdAt: string;
}

interface LibraryTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface AgentDetailConfig {
  slug: string;
  title: string;
  agents: AgentInstance[];
  templates: LibraryTemplate[];
}

/* ═══════════════════════════════════════════
   Agent data registry
   ═══════════════════════════════════════════ */
const agentDataRegistry: Record<string, AgentDetailConfig> = {
  "review-response": {
    slug: "review-response",
    title: "Review response agents",
    agents: [
      {
        id: "rr-1",
        name: "Standard review responder",
        description: "Responds to incoming reviews based on star rating and sentiment analysis with pre-configured templates",
        status: "active",
        tasksToday: 42,
        successRate: 96.3,
        lastRun: "3 min ago",
        createdAt: "Jan 14, 2026",
      },
      {
        id: "rr-2",
        name: "Negative review escalator",
        description: "Identifies 1-2 star reviews and drafts empathetic responses while escalating to the support team for follow-up",
        status: "active",
        tasksToday: 8,
        successRate: 91.7,
        lastRun: "12 min ago",
        createdAt: "Feb 2, 2026",
      },
      {
        id: "rr-3",
        name: "Multi-location responder",
        description: "Generates location-specific responses by incorporating branch details, manager names, and local context",
        status: "paused",
        tasksToday: 0,
        successRate: 94.1,
        lastRun: "2 days ago",
        createdAt: "Feb 18, 2026",
      },
    ],
    templates: [
      {
        id: "rr-t1",
        name: "Review response agent",
        description: "Automatically replies to incoming reviews based on sentiment and context using pre-defined response templates",
        category: "Standard",
      },
      {
        id: "rr-t2",
        name: "Review response agent with tone matching",
        description: "Matches the tone and language style of the reviewer to create more personalized and empathetic responses",
        category: "Advanced",
      },
      {
        id: "rr-t3",
        name: "Review response agent with escalation rules",
        description: "Responds to positive reviews automatically and routes negative reviews through an approval queue with suggested responses",
        category: "Advanced",
      },
      {
        id: "rr-t4",
        name: "Review response agent with multi-language support",
        description: "Detects the language of the review and generates responses in the same language with culturally appropriate messaging",
        category: "Premium",
      },
      {
        id: "rr-t5",
        name: "Review response agent with competitive intelligence",
        description: "Analyzes competitor mentions in reviews and crafts responses that highlight your unique value propositions",
        category: "Premium",
      },
    ],
  },
  "review-generation": {
    slug: "review-generation",
    title: "Review generation agents",
    agents: [
      {
        id: "rg-1",
        name: "Post-visit review requester",
        description: "Sends review requests via SMS and email to customers after confirmed check-ins with optimized timing",
        status: "active",
        tasksToday: 124,
        successRate: 97.8,
        lastRun: "1 min ago",
        createdAt: "Dec 10, 2025",
      },
      {
        id: "rg-2",
        name: "Follow-up campaign agent",
        description: "Sends gentle follow-up requests to customers who opened but did not complete their initial review request",
        status: "active",
        tasksToday: 34,
        successRate: 88.4,
        lastRun: "22 min ago",
        createdAt: "Jan 28, 2026",
      },
    ],
    templates: [
      {
        id: "rg-t1",
        name: "Review generation agent",
        description: "Sends review requests to all checked-in contacts with pre defined templates",
        category: "Standard",
      },
      {
        id: "rg-t2",
        name: "Review generation agent with A/B testing",
        description: "Sends review requests to all checked-in contacts, testing multiple template variations to optimize for conversion",
        category: "Advanced",
      },
      {
        id: "rg-t3",
        name: "Review generation agent with smart targeting",
        description: "Sends review requests to qualified checked-in contacts at their optimal day and time using predefined templates",
        category: "Advanced",
      },
      {
        id: "rg-t4",
        name: "Review generation agent with A/B testing and smart targeting",
        description: "Sends review requests to qualified checked-in contacts at their optimal day and time, testing multiple template variations to optimize for conversion",
        category: "Premium",
      },
      {
        id: "rg-t5",
        name: "Review generation agent with A/B testing, smart targeting and split campaigns",
        description: "Combines smart targeting, A/B testing, and split campaign strategies to maximize review generation across multiple customer segments",
        category: "Premium",
      },
    ],
  },
  "social-publishing": {
    slug: "social-publishing",
    title: "Publishing agents",
    agents: [
      {
        id: "sp-1",
        name: "Campaign scheduler",
        description: "Schedules and publishes social media posts across Facebook, Instagram, and Google at optimal engagement times",
        status: "active",
        tasksToday: 56,
        successRate: 98.2,
        lastRun: "5 min ago",
        createdAt: "Nov 20, 2025",
      },
      {
        id: "sp-2",
        name: "Content repurposer",
        description: "Automatically adapts long-form content into platform-specific social posts with proper formatting and hashtags",
        status: "error",
        tasksToday: 0,
        successRate: 89.5,
        lastRun: "1 hour ago",
        createdAt: "Mar 1, 2026",
      },
    ],
    templates: [
      {
        id: "sp-t1",
        name: "Social publishing agent",
        description: "Schedules and publishes social media posts across platforms based on a content calendar",
        category: "Standard",
      },
      {
        id: "sp-t2",
        name: "Social publishing agent with AI content generation",
        description: "Generates and publishes original social media content based on business updates, promotions, and seasonal trends",
        category: "Advanced",
      },
      {
        id: "sp-t3",
        name: "Social publishing agent with cross-platform optimization",
        description: "Optimizes post format, copy length, and media for each social platform to maximize reach and engagement",
        category: "Advanced",
      },
    ],
  },
  "social-engagement": {
    slug: "social-engagement",
    title: "Engagement agents",
    agents: [
      {
        id: "se-1",
        name: "Comment responder",
        description: "Monitors and responds to comments and direct messages across social channels with context-aware replies",
        status: "paused",
        tasksToday: 0,
        successRate: 92.1,
        lastRun: "3 days ago",
        createdAt: "Feb 5, 2026",
      },
    ],
    templates: [
      {
        id: "se-t1",
        name: "Social engagement agent",
        description: "Responds to comments and messages on social channels with appropriate and on-brand replies",
        category: "Standard",
      },
      {
        id: "se-t2",
        name: "Social engagement agent with sentiment routing",
        description: "Analyzes sentiment in social interactions and routes negative messages to human agents while auto-responding to positive ones",
        category: "Advanced",
      },
    ],
  },
  "listing-optimization": {
    slug: "listing-optimization",
    title: "Listing optimization agents",
    agents: [
      {
        id: "lo-1",
        name: "Profile completeness checker",
        description: "Monitors business listings across Google, Yelp, and Bing for accuracy and completeness, suggesting updates when needed",
        status: "active",
        tasksToday: 43,
        successRate: 99.1,
        lastRun: "8 min ago",
        createdAt: "Oct 15, 2025",
      },
    ],
    templates: [
      {
        id: "lo-t1",
        name: "Listing optimization agent",
        description: "Monitors and updates business listings for accuracy, consistency, and completeness across all directories",
        category: "Standard",
      },
      {
        id: "lo-t2",
        name: "Listing optimization agent with competitor benchmarking",
        description: "Compares your listings against competitors and recommends improvements to categories, descriptions, and media",
        category: "Advanced",
      },
    ],
  },
  "ticket-resolution": {
    slug: "ticket-resolution",
    title: "Ticket resolution agents",
    agents: [
      {
        id: "tr-1",
        name: "Ticket triage and router",
        description: "Triages incoming support tickets by category and urgency, routing them to the appropriate team or auto-resolving common issues",
        status: "active",
        tasksToday: 32,
        successRate: 87.3,
        lastRun: "2 min ago",
        createdAt: "Jan 5, 2026",
      },
      {
        id: "tr-2",
        name: "FAQ auto-resolver",
        description: "Identifies frequently asked questions in support tickets and provides instant resolutions from the knowledge base",
        status: "active",
        tasksToday: 18,
        successRate: 95.6,
        lastRun: "15 min ago",
        createdAt: "Feb 12, 2026",
      },
    ],
    templates: [
      {
        id: "tr-t1",
        name: "Ticketing agent",
        description: "Triages incoming support tickets and routes to appropriate teams based on category, urgency, and sentiment",
        category: "Standard",
      },
      {
        id: "tr-t2",
        name: "Ticketing agent with auto-resolution",
        description: "Automatically resolves common support requests using knowledge base articles and pre-defined workflows",
        category: "Advanced",
      },
      {
        id: "tr-t3",
        name: "Ticketing agent with SLA monitoring",
        description: "Monitors ticket SLAs in real-time and escalates at-risk tickets to prevent breaches while auto-resolving low-priority items",
        category: "Premium",
      },
    ],
  },
  "data-source": {
    slug: "data-source",
    title: "Data source agents",
    agents: [],
    templates: [
      {
        id: "ds-t1",
        name: "Data source agent",
        description: "Connects to external data sources, validates incoming data, and maintains clean data pipelines for reporting",
        category: "Standard",
      },
    ],
  },
  "crm-mapping": {
    slug: "crm-mapping",
    title: "CRM mapping agents",
    agents: [],
    templates: [
      {
        id: "cm-t1",
        name: "CRM mapping agent",
        description: "Maps and synchronizes customer records between your CRM and the platform, resolving duplicates and data conflicts",
        category: "Standard",
      },
    ],
  },
  "sync": {
    slug: "sync",
    title: "Sync agents",
    agents: [],
    templates: [
      {
        id: "sy-t1",
        name: "Sync agent",
        description: "Maintains real-time synchronization of business data across all connected platforms and integrations",
        category: "Standard",
      },
    ],
  },
  "scheduled-reports": {
    slug: "scheduled-reports",
    title: "Scheduled reports agents",
    agents: [
      {
        id: "sr-a1",
        name: "Weekly executive digest",
        description: "Combines Reviews, Social, and Ticketing reports into a weekly PDF delivery to the leadership team every Monday at 8 AM",
        status: "active",
        tasksToday: 1,
        successRate: 98.5,
        lastRun: "Mon, 8 AM",
        createdAt: "Sep 15, 2025",
      },
      {
        id: "sr-a2",
        name: "Daily reviews digest",
        description: "Generates and sends a daily summary of new reviews across all platforms to the operations team",
        status: "active",
        tasksToday: 1,
        successRate: 97.2,
        lastRun: "Today, 8 AM",
        createdAt: "Nov 1, 2025",
      },
      {
        id: "sr-a3",
        name: "Monthly social performance",
        description: "Compiles comprehensive social analytics into a presentation-ready PPT delivered to the marketing team on the 1st of every month",
        status: "paused",
        tasksToday: 0,
        successRate: 94.1,
        lastRun: "Mar 1",
        createdAt: "Oct 1, 2025",
      },
      {
        id: "sr-a4",
        name: "Quarterly investor report",
        description: "Cross-product executive summary combining profile performance, competitor analysis, and survey results for board distribution",
        status: "active",
        tasksToday: 0,
        successRate: 100,
        lastRun: "Jan 1",
        createdAt: "Apr 1, 2025",
      },
      {
        id: "sr-a5",
        name: "Bi-weekly campaign metrics",
        description: "Email and SMS campaign performance report delivered in XLS format to the marketing team every other Monday",
        status: "active",
        tasksToday: 0,
        successRate: 96.8,
        lastRun: "Mon, Mar 9",
        createdAt: "Dec 1, 2025",
      },
      {
        id: "sr-a6",
        name: "Weekly ticket resolution report",
        description: "Summarizes ticket volume, resolution time, and SLA compliance from the Ticketing module for the support lead",
        status: "error",
        tasksToday: 0,
        successRate: 88.4,
        lastRun: "Mon, Mar 9",
        createdAt: "Jan 6, 2026",
      },
    ],
    templates: [
      {
        id: "sr-t1",
        name: "Scheduled reports agent",
        description: "Generates and delivers customized reports on a recurring schedule to stakeholders via email or dashboard",
        category: "Standard",
      },
      {
        id: "sr-t2",
        name: "Multi-product digest",
        description: "Combines reports from multiple product areas into a single automated delivery with AI-generated executive summary",
        category: "Advanced",
      },
      {
        id: "sr-t3",
        name: "Executive summary agent",
        description: "Creates presentation-ready reports with page covers, AI insights, and branded styling for leadership distribution",
        category: "Premium",
      },
    ],
  },
  "automation": {
    slug: "automation",
    title: "Automation agents",
    agents: [],
    templates: [
      {
        id: "au-t1",
        name: "Automation agent",
        description: "Executes automated workflows triggered by events, schedules, or conditions across connected business tools",
        category: "Standard",
      },
    ],
  },
};

export function getAgentDetailConfig(slug: string): AgentDetailConfig | undefined {
  return agentDataRegistry[slug];
}

export function getAllAgentSlugs(): string[] {
  return Object.keys(agentDataRegistry);
}

/* ═══════════════════════════════════════════
   Status Badge
   ═══════════════════════════════════════════ */
function StatusBadge({ status }: { status: AgentInstance["status"] }) {
  const config = {
    active: { label: "Active", dot: "bg-[#4caf50]", bg: "bg-[#e8f5e9] dark:bg-[#1b3a2a]", text: "text-[#2e7d32] dark:text-[#66bb6a]" },
    paused: { label: "Paused", dot: "bg-[#ff9800]", bg: "bg-[#fff3e0] dark:bg-[#3a2e1b]", text: "text-[#e65100] dark:text-[#ffb74d]" },
    error: { label: "Error", dot: "bg-[#ef5350]", bg: "bg-[#fce4ec] dark:bg-[#3a1b1b]", text: "text-[#c62828] dark:text-[#ef5350]" },
    draft: { label: "Draft", dot: "bg-[#9e9e9e]", bg: "bg-[#f5f5f5] dark:bg-[#2a2d33]", text: "text-[#757575] dark:text-[#9e9e9e]" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ${c.bg} ${c.text}`} style={{ fontWeight: 400 }}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

/* ═══════════════════════════════════════════
   Agent Config Modal
   ═══════════════════════════════════════════ */
interface AgentConfigModalProps {
  agent: AgentInstance;
  onClose: () => void;
}

function AgentConfigModal({ agent, onClose }: AgentConfigModalProps) {
  const [name, setName] = useState(agent.name);
  const [description, setDescription] = useState(agent.description);
  const [status, setStatus] = useState(agent.status);

  const handleSave = () => {
    toast.success(`Agent "${name}" configuration saved`);
    onClose();
  };

  const handleDuplicate = () => {
    toast.success(`Agent "${name}" duplicated`);
    onClose();
  };

  const handleDelete = () => {
    toast.success(`Agent "${name}" deleted`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[12px] shadow-xl w-[560px] max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e9f0] dark:border-[#2e3340]">
          <h2 className="text-[16px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.32px]" style={{ fontWeight: 400 }}>
            Agent configuration
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-[6px] text-[#888] dark:text-[#6b7280]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Status + Created */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={status} />
            </div>
            <span className="text-[12px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
              Created {agent.createdAt}
            </span>
          </div>

          {/* Name field */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
              Agent name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full h-[38px] px-3 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[13px] text-[#212121] dark:text-[#e4e4e4] outline-none focus:border-[#2552ED] dark:focus:border-[#2552ED] transition-colors"
              style={{ fontWeight: 400 }}
            />
          </div>

          {/* Description field */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[13px] text-[#212121] dark:text-[#e4e4e4] outline-none focus:border-[#2552ED] dark:focus:border-[#2552ED] transition-colors resize-none"
              style={{ fontWeight: 300 }}
            />
          </div>

          {/* Status toggle */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
              Status
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStatus(status === "active" ? "paused" : "active")}
                className="flex items-center gap-2 text-[13px] text-[#212121] dark:text-[#e4e4e4]"
                style={{ fontWeight: 400 }}
              >
                {status === "active" ? (
                  <ToggleRight className="w-5 h-5 text-[#2552ED]" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-[#999] dark:text-[#6b7280]" />
                )}
                {status === "active" ? "Active" : status === "paused" ? "Paused" : status === "error" ? "Error" : "Draft"}
              </button>
            </div>
          </div>

          {/* Performance metrics */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-2" style={{ fontWeight: 400 }}>
              Performance
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#fafbfc] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] px-3 py-2.5">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p className="text-[16px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{agent.tasksToday}</p>
                  <Zap className="w-3 h-3 text-[#2552ED] self-center" />
                </div>
                <span className="text-[10px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Tasks today</span>
              </div>
              <div className="bg-[#fafbfc] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] px-3 py-2.5">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p className="text-[16px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{agent.successRate}%</p>
                  <TrendingUp className="w-3 h-3 text-[#4caf50] self-center" />
                </div>
                <span className="text-[10px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Success rate</span>
              </div>
              <div className="bg-[#fafbfc] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] px-3 py-2.5">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] mt-0.5" style={{ fontWeight: 400 }}>{agent.lastRun}</p>
                  <Clock className="w-3 h-3 text-[#888] self-center" />
                </div>
                <span className="text-[10px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Last run</span>
              </div>
            </div>
          </div>

          {/* Schedule section */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
              Schedule
            </label>
            <div className="flex items-center gap-2 bg-[#fafbfc] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] px-3 py-2.5">
              <Calendar className="w-4 h-4 text-[#888] dark:text-[#6b7280]" />
              <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 300 }}>
                Runs continuously (event-triggered)
              </span>
            </div>
          </div>

          {/* Channels */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
              Connected channels
            </label>
            <div className="flex flex-wrap gap-2">
              {["Google", "Yelp", "Facebook", "TripAdvisor"].map(ch => (
                <span key={ch} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#fafbfc] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-full text-[12px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>
                  <Globe className="w-3 h-3" />
                  {ch}
                </span>
              ))}
            </div>
          </div>

          {/* Recent activity preview */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
              Recent activity
            </label>
            <div className="border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] divide-y divide-[#f0f1f5] dark:divide-[#2e3340]">
              {[
                { time: "2 min ago", action: "Responded to a 4-star Google review", ok: true },
                { time: "18 min ago", action: "Drafted response for 1-star review (pending)", ok: false },
                { time: "45 min ago", action: "Responded to a 5-star Yelp review", ok: true },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                  <History className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{a.action}</span>
                  </div>
                  <span className="text-[11px] text-[#999] dark:text-[#6b7280] shrink-0" style={{ fontWeight: 300 }}>{a.time}</span>
                  {a.ok ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4caf50] shrink-0" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e9f0] dark:border-[#2e3340]">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDuplicate}
              className="gap-1.5 rounded-[8px] text-[13px] text-[#555] dark:text-[#8b92a5]"
              style={{ fontWeight: 400 }}
            >
              <Copy className="w-3.5 h-3.5" />
              Duplicate
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="gap-1.5 rounded-[8px] text-[13px] text-[#C62828] border-[#fce4ec] dark:border-[#3a1b1b] hover:bg-[#fce4ec] dark:hover:bg-[#3a1b1b]"
              style={{ fontWeight: 400 }}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-[8px] px-4 text-[13px] text-[#555] dark:text-[#8b92a5]"
              style={{ fontWeight: 400 }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="rounded-[8px] px-4 text-[13px] bg-[#2552ED] hover:bg-[#1E44CC] text-white"
              style={{ fontWeight: 400 }}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Agent Instance Card (grid view)
   ═══════════════════════════════════════════ */
function AgentCard({ agent, onConfigure }: { agent: AgentInstance; onConfigure: (agent: AgentInstance) => void }) {
  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = agent.status === "active" ? "paused" : "active";
    toast.success(`Agent "${agent.name}" ${newStatus === "active" ? "resumed" : "paused"}`);
  };

  return (
    <div
      className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] p-5 hover:border-[#c0c6d4] dark:hover:border-[#4d5568] transition-colors group cursor-pointer"
      onClick={() => onConfigure(agent)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[15px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.3px] pr-3" style={{ fontWeight: 400 }}>
          {agent.name}
        </h3>
        <StatusBadge status={agent.status} />
      </div>
      <p className="text-[13px] text-[#555] dark:text-[#8b92a5] mb-4 line-clamp-2" style={{ fontWeight: 300 }}>
        {agent.description}
      </p>

      {/* Metrics row */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-[#2552ED]" />
          <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
            {agent.tasksToday} today
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3 text-[#4caf50]" />
          <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
            {agent.successRate}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f0f1f5] dark:border-[#2e3340]">
        <span className="text-[11px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
          Last run {agent.lastRun}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {agent.status === "active" ? (
            <Button type="button" variant="ghost" size="icon" onClick={handleToggleStatus} className="rounded-[6px]" title="Pause agent">
              <Pause className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
            </Button>
          ) : agent.status === "paused" ? (
            <Button type="button" variant="ghost" size="icon" onClick={handleToggleStatus} className="rounded-[6px]" title="Resume agent">
              <Play className="w-3.5 h-3.5 text-[#2552ED]" />
            </Button>
          ) : null}
          <Button type="button" variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onConfigure(agent); }} className="rounded-[6px]" title="Settings">
            <Settings className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="rounded-[6px]" title="More">
            <MoreHorizontal className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Agent Instance Row (list view)
   ═══════════════════════════════════════════ */
function AgentRow({ agent, onConfigure }: { agent: AgentInstance; onConfigure: (agent: AgentInstance) => void }) {
  const handleToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = agent.status === "active" ? "paused" : "active";
    toast.success(`Agent "${agent.name}" ${newStatus === "active" ? "resumed" : "paused"}`);
  };

  return (
    <div
      className="flex items-center gap-4 px-4 py-3 border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] hover:border-[#c0c6d4] dark:hover:border-[#4d5568] transition-colors group bg-white dark:bg-[#1e2229] cursor-pointer"
      onClick={() => onConfigure(agent)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-0.5">
          <h3 className="text-[14px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.28px] truncate" style={{ fontWeight: 400 }}>
            {agent.name}
          </h3>
          <StatusBadge status={agent.status} />
        </div>
        <p className="text-[12px] text-[#555] dark:text-[#8b92a5] truncate" style={{ fontWeight: 300 }}>
          {agent.description}
        </p>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <div className="text-center">
          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{agent.tasksToday}</p>
          <p className="text-[10px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Tasks today</p>
        </div>
        <div className="text-center">
          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{agent.successRate}%</p>
          <p className="text-[10px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Success</p>
        </div>
        <div className="text-center min-w-[70px]">
          <p className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>{agent.lastRun}</p>
          <p className="text-[10px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Last run</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {agent.status === "active" ? (
            <Button type="button" variant="ghost" size="icon" onClick={handleToggleStatus} className="rounded-[6px]" title="Pause">
              <Pause className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
            </Button>
          ) : agent.status === "paused" ? (
            <Button type="button" variant="ghost" size="icon" onClick={handleToggleStatus} className="rounded-[6px]" title="Resume">
              <Play className="w-3.5 h-3.5 text-[#2552ED]" />
            </Button>
          ) : null}
          <Button type="button" variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="rounded-[6px]">
            <MoreHorizontal className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Library Template Card
   ═══════════════════════════════════════════ */
function TemplateCard({ template, onUseTemplate }: { template: LibraryTemplate; onUseTemplate: (name: string) => void }) {
  return (
    <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] p-7 hover:border-[#c0c6d4] dark:hover:border-[#4d5568] transition-colors group flex flex-col h-full">
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-[15px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.3px]" style={{ fontWeight: 400 }}>
          {template.name}
        </h3>
        <p className="text-[13px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 300 }}>
          {template.description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#f0f1f5] dark:border-[#2e3340]">
        <span className="text-[11px] text-[#999] dark:text-[#6b7280] px-2 py-0.5 bg-[#f5f5f5] dark:bg-[#262b35] rounded-full" style={{ fontWeight: 300 }}>
          {template.category}
        </span>
        <button
          onClick={() => onUseTemplate(template.name)}
          className="text-[12px] text-[#2552ED] hover:text-[#1E44CC] opacity-0 group-hover:opacity-100 transition-all"
          style={{ fontWeight: 400 }}
        >
          Use template
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Empty State
   ═══════════════════════════════════════════ */
function EmptyState({ type }: { type: "agents" | "library" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 rounded-[12px] bg-[#f0f1f5] dark:bg-[#262b35] flex items-center justify-center mb-4">
        {type === "agents" ? (
          <Activity className="w-5 h-5 text-[#888] dark:text-[#6b7280]" />
        ) : (
          <LayoutGrid className="w-5 h-5 text-[#888] dark:text-[#6b7280]" />
        )}
      </div>
      <p className="text-[14px] text-[#555] dark:text-[#8b92a5] mb-1" style={{ fontWeight: 400 }}>
        {type === "agents" ? "No agents configured yet" : "No templates available"}
      </p>
      <p className="text-[12px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
        {type === "agents"
          ? "Create a new agent or choose a template from the library"
          : "Templates will appear here when available"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Agent Detail View
   ═══════════════════════════════════════════ */
interface AgentDetailViewProps {
  agentSlug: string;
  onOpenBuilder?: (templateName?: string) => void;
}

export function AgentDetailView({ agentSlug, onOpenBuilder }: AgentDetailViewProps) {
  const config = agentDataRegistry[agentSlug];
  const [activeTab, setActiveTab] = useState<"agents" | "library">(
    config && config.agents.length > 0 ? "agents" : "library"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [configModalAgent, setConfigModalAgent] = useState<AgentInstance | null>(null);

  const onConfigure = (agent: AgentInstance) => setConfigModalAgent(agent);
  const handleUseTemplate = (templateName: string) => {
    if (onOpenBuilder) {
      onOpenBuilder(templateName);
    } else {
      toast.success(`Opening builder with template "${templateName}"`);
    }
  };

  // Fallback for unknown slugs
  if (!config) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#13161b]">
        <p className="text-[14px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
          Agent type not found
        </p>
      </div>
    );
  }

  const filteredAgents = useMemo(() => {
    let result = config.agents;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(a => a.status === statusFilter);
    }
    return result;
  }, [config.agents, searchQuery, statusFilter]);

  const filteredTemplates = useMemo(() => {
    if (!searchQuery) return config.templates;
    const q = searchQuery.toLowerCase();
    return config.templates.filter(
      t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [config.templates, searchQuery]);

  // Summary metrics for agents tab
  const totalActive = config.agents.filter(a => a.status === "active").length;
  const totalTasksToday = config.agents.reduce((sum, a) => sum + a.tasksToday, 0);
  const avgSuccessRate = config.agents.length > 0
    ? (config.agents.reduce((sum, a) => sum + a.successRate, 0) / config.agents.length).toFixed(1)
    : "0";
  const needsAttention = config.agents.filter(a => a.status === "error" || a.status === "paused").length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300">
      {/* Header */}
      <div className="shrink-0 px-6 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[18px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.36px]" style={{ fontWeight: 400 }}>
            {config.title}
          </h1>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#888] dark:text-[#6b7280]" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                  placeholder="Search..."
                  className="h-[36px] w-[200px] pl-8 pr-3 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[13px] text-[#212121] dark:text-[#e4e4e4] placeholder-[#999] dark:placeholder-[#6b7280] outline-none focus:border-[#2552ED] dark:focus:border-[#2552ED] transition-colors"
                  style={{ fontWeight: 300 }}
                />
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="rounded-[8px] bg-white dark:bg-[#262b35]"
              >
                <Search className="w-[14px] h-[14px] text-[#303030] dark:text-[#8b92a5]" />
              </Button>
            )}

            {/* View toggle */}
            <div className="h-[36px] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] flex items-center px-1 gap-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`h-[24px] w-[24px] flex items-center justify-center rounded-[4px] transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#e5e9f0] dark:bg-[#3a4150]"
                    : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
              >
                <LayoutGrid className={`w-[14px] h-[14px] ${viewMode === "grid" ? "text-[#303030] dark:text-[#e4e4e4]" : "text-[#888] dark:text-[#6b7280]"}`} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`h-[24px] w-[24px] flex items-center justify-center rounded-[4px] transition-colors ${
                  viewMode === "list"
                    ? "bg-[#e5e9f0] dark:bg-[#3a4150]"
                    : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
              >
                <List className={`w-[14px] h-[14px] ${viewMode === "list" ? "text-[#303030] dark:text-[#e4e4e4]" : "text-[#888] dark:text-[#6b7280]"}`} />
              </button>
            </div>

            {/* Filter button */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFilterActive(!filterActive)}
              className={`rounded-[8px] ${
                filterActive
                  ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]"
                  : "bg-white dark:bg-[#262b35]"
              }`}
            >
              <Filter className={`w-[14px] h-[14px] ${filterActive ? "text-[#2552ED]" : "text-[#555] dark:text-[#8b92a5]"}`} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-end gap-0 border-b border-[#e5e9f0] dark:border-[#2e3340]">
          <button
            onClick={() => setActiveTab("agents")}
            className="relative px-3 pb-2"
          >
            <span
              className={`text-[14px] tracking-[-0.28px] transition-colors ${
                activeTab === "agents"
                  ? "text-[#212121] dark:text-[#e4e4e4]"
                  : "text-[#555] dark:text-[#8b92a5] hover:text-[#212121] dark:hover:text-[#e4e4e4]"
              }`}
              style={{ fontWeight: 400 }}
            >
              Agents
            </span>
            {activeTab === "agents" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2552ED] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className="relative px-3 pb-2"
          >
            <span
              className={`text-[14px] tracking-[-0.28px] transition-colors ${
                activeTab === "library"
                  ? "text-[#212121] dark:text-[#e4e4e4]"
                  : "text-[#555] dark:text-[#8b92a5] hover:text-[#212121] dark:hover:text-[#e4e4e4]"
              }`}
              style={{ fontWeight: 400 }}
            >
              Library
            </span>
            {activeTab === "library" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2552ED] rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Filter bar (conditional) */}
      {filterActive && activeTab === "agents" && (
        <div className="shrink-0 px-6 py-3 border-b border-[#e5e9f0] dark:border-[#2e3340] bg-[#fafbfc] dark:bg-[#1a1e25]">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Status:</span>
            {["all", "active", "paused", "error", "draft"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-full text-[12px] transition-colors border ${
                  statusFilter === s
                    ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] text-[#2552ED]"
                    : "border-[#e5e9f0] dark:border-[#333a47] text-[#555] dark:text-[#8b92a5] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "agents" ? (
          <div className="px-6 py-5">
            {/* Summary metrics */}
            {config.agents.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mb-5">
                <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] px-4 py-3">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="text-[20px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.4px]" style={{ fontWeight: 400 }}>{totalActive}</p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4caf50] self-center" />
                  </div>
                  <span className="text-[11px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Active</span>
                </div>
                <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] px-4 py-3">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="text-[20px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.4px]" style={{ fontWeight: 400 }}>{totalTasksToday}</p>
                    <Zap className="w-3.5 h-3.5 text-[#2552ED] self-center" />
                  </div>
                  <span className="text-[11px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Tasks today</span>
                </div>
                <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] px-4 py-3">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="text-[20px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.4px]" style={{ fontWeight: 400 }}>{avgSuccessRate}%</p>
                    <TrendingUp className="w-3.5 h-3.5 text-[#4caf50] self-center" />
                  </div>
                  <span className="text-[11px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Avg. success</span>
                </div>
                <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] px-4 py-3">
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <p className="text-[20px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.4px]" style={{ fontWeight: 400 }}>{needsAttention}</p>
                    <AlertTriangle className="w-3.5 h-3.5 text-[#F59E0B] self-center" />
                  </div>
                  <span className="text-[11px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>Needs attention</span>
                </div>
              </div>
            )}

            {/* Agent cards / rows */}
            {filteredAgents.length === 0 ? (
              <EmptyState type="agents" />
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-3 gap-5">
                {filteredAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} onConfigure={onConfigure} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredAgents.map(agent => (
                  <AgentRow key={agent.id} agent={agent} onConfigure={onConfigure} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Library tab */
          <div className="px-6 py-5">
            {filteredTemplates.length === 0 ? (
              <EmptyState type="library" />
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredTemplates.map(template => (
                  <TemplateCard key={template.id} template={template} onUseTemplate={handleUseTemplate} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Agent Config Modal */}
      {configModalAgent && (
        <AgentConfigModal
          agent={configModalAgent}
          onClose={() => setConfigModalAgent(null)}
        />
      )}
    </div>
  );
}