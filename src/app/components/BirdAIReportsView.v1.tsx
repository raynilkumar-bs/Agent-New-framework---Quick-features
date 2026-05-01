import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronDown, Sparkles, Filter,
  TrendingUp, CheckCircle2, Zap, Users, Bot, AlertTriangle,
  XCircle, PauseCircle, Eye, Workflow, BarChart3, Shield,
  Clock,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { ReportActionsButton, buildReportContext } from "./report-actions/ReportActionsButton";
import type { ReportActionId } from "./report-actions/types";
import { Button } from "@/app/components/ui/button";

/* ─── Report tab definitions ─── */
type ReportTab =
  | "executive"
  | "agent-performance"
  | "product-outcomes"
  | "workflow"
  | "attention"
  | "adoption";

type ProductSubTab = "reviews" | "social" | "listings" | "ticketing" | "automation";

const reportTabs: { id: ReportTab; label: string }[] = [
  { id: "executive", label: "Outcome" },
  { id: "agent-performance", label: "Agent performance" },
  { id: "product-outcomes", label: "Product outcomes" },
  { id: "workflow", label: "Workflow performance" },
  { id: "attention", label: "Attention & risk" },
  { id: "adoption", label: "Adoption & usage" },
];

const productSubTabs: { id: ProductSubTab; label: string }[] = [
  { id: "reviews", label: "Reviews" },
  { id: "social", label: "Social" },
  { id: "listings", label: "Listings" },
  { id: "ticketing", label: "Ticketing" },
  { id: "automation", label: "Automation" },
];

/* ─── Date filter options ─── */
const dateOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "This year", "Custom"];

/* ─── Shared chart colors ─── */
const ACCENT = "#2552ED";
const GREEN = "#4caf50";
const AMBER = "#F59E0B";
const RED = "#ef5350";
const PURPLE = "#9970D7";
const CHART_COLORS = [ACCENT, GREEN, AMBER, PURPLE, RED];

/* ════════════════════════════════════════════════════════════
   MOCK DATA
   ════════════════════════════════════════════════════════════ */

/* Executive */
const execMetrics = [
  { label: "Tasks automated", value: "4,812", icon: Zap, color: ACCENT },
  { label: "Human hours saved", value: "96h", icon: Clock, color: GREEN },
  { label: "Automation rate", value: "72%", icon: TrendingUp, color: PURPLE },
  { label: "Agent success rate", value: "95%", icon: CheckCircle2, color: GREEN },
  { label: "Interactions handled", value: "8,420", icon: Users, color: ACCENT },
];

const automationTrend = [
  { month: "Sep", automated: 2800, manual: 1600 },
  { month: "Oct", automated: 3100, manual: 1400 },
  { month: "Nov", automated: 3600, manual: 1200 },
  { month: "Dec", automated: 3900, manual: 1100 },
  { month: "Jan", automated: 4200, manual: 1000 },
  { month: "Feb", automated: 4812, manual: 880 },
];

const workloadSplit = [
  { name: "AI handled", value: 72 },
  { name: "Human handled", value: 28 },
];

const topAgents = [
  { name: "Review response", tasks: 1240, rate: "96%" },
  { name: "Ticketing", tasks: 890, rate: "94%" },
  { name: "Social publishing", tasks: 640, rate: "92%" },
  { name: "Listing optimization", tasks: 320, rate: "97%" },
  { name: "Review generation", tasks: 280, rate: "91%" },
];

/* Agent Performance */
const agentPerfMetrics = [
  { label: "Overall success rate", value: "95.2%", icon: CheckCircle2, color: GREEN },
  { label: "Total completions", value: "4,812", icon: BarChart3, color: ACCENT },
  { label: "Failure rate", value: "3.1%", icon: XCircle, color: RED },
  { label: "Avg completion time", value: "11.4s", icon: Clock, color: AMBER },
];

const agentPerfTable = [
  { agent: "Review response", success: "96%", volume: "1,240", failures: "3%", avgTime: "12s" },
  { agent: "Ticketing", success: "94%", volume: "890", failures: "4%", avgTime: "14s" },
  { agent: "Social publishing", success: "92%", volume: "640", failures: "5%", avgTime: "10s" },
  { agent: "Listing optimization", success: "97%", volume: "320", failures: "2%", avgTime: "8s" },
  { agent: "Review generation", success: "91%", volume: "280", failures: "6%", avgTime: "16s" },
  { agent: "Social engagement", success: "89%", volume: "210", failures: "7%", avgTime: "18s" },
];

const successTrend = [
  { month: "Sep", rate: 91 },
  { month: "Oct", rate: 92 },
  { month: "Nov", rate: 93.5 },
  { month: "Dec", rate: 94 },
  { month: "Jan", rate: 94.8 },
  { month: "Feb", rate: 95.2 },
];

/* Product Outcomes */
const productData: Record<ProductSubTab, {
  metrics: { label: string; value: string; icon: typeof Zap; color: string }[];
  insight: string;
}> = {
  reviews: {
    metrics: [
      { label: "AI responded", value: "89%", icon: Bot, color: ACCENT },
      { label: "Avg response time", value: "1.2m", icon: Clock, color: GREEN },
      { label: "Negative recovery", value: "+12%", icon: TrendingUp, color: PURPLE },
      { label: "Reviews generated", value: "312", icon: Zap, color: AMBER },
    ],
    insight: "AI-generated review responses reduced average response time by 64%. Negative review recovery improved 12% month over month.",
  },
  social: {
    metrics: [
      { label: "Posts published", value: "64", icon: Zap, color: ACCENT },
      { label: "Engagement", value: "8,420", icon: Users, color: GREEN },
      { label: "Comments responded", value: "312", icon: Bot, color: PURPLE },
      { label: "Follower growth", value: "+6.2%", icon: TrendingUp, color: AMBER },
    ],
    insight: "Tuesday and Thursday posts generated 42% higher engagement. AI-managed comment responses drove 18% more follower interactions.",
  },
  listings: {
    metrics: [
      { label: "Listings updated", value: "142", icon: Zap, color: ACCENT },
      { label: "Profile views", value: "+18%", icon: Eye, color: GREEN },
      { label: "Customer actions", value: "+9%", icon: Users, color: PURPLE },
      { label: "Data accuracy", value: "98%", icon: CheckCircle2, color: AMBER },
    ],
    insight: "Listing optimization agent corrected 23 data discrepancies across Google and Apple Maps, improving profile views by 18%.",
  },
  ticketing: {
    metrics: [
      { label: "Tickets resolved", value: "890", icon: Bot, color: ACCENT },
      { label: "Avg resolution time", value: "4.2m", icon: Clock, color: GREEN },
      { label: "Escalation rate", value: "12%", icon: AlertTriangle, color: AMBER },
      { label: "CSAT improvement", value: "+8%", icon: TrendingUp, color: PURPLE },
    ],
    insight: "AI ticket routing reduced resolution time by 38%. Escalation rate dropped 4% as the agent learned from resolved cases.",
  },
  automation: {
    metrics: [
      { label: "Workflows executed", value: "1,480", icon: Workflow, color: ACCENT },
      { label: "Success rate", value: "96%", icon: CheckCircle2, color: GREEN },
      { label: "Time saved", value: "42h", icon: Clock, color: PURPLE },
      { label: "Retries", value: "28", icon: AlertTriangle, color: AMBER },
    ],
    insight: "Automation workflows saved 42 hours of manual work this month. The scheduled report delivery agent had the highest reliability at 99.2%.",
  },
};

/* Workflow Performance */
const workflowMetrics = [
  { label: "Active workflows", value: "14", icon: Workflow, color: ACCENT },
  { label: "Reports delivered", value: "128", icon: BarChart3, color: GREEN },
  { label: "Success rate", value: "94%", icon: CheckCircle2, color: PURPLE },
  { label: "Avg execution time", value: "3.4s", icon: Clock, color: AMBER },
];

const workflowRuns = [
  { week: "W1", success: 28, failures: 2 },
  { week: "W2", success: 32, failures: 1 },
  { week: "W3", success: 30, failures: 3 },
  { week: "W4", success: 34, failures: 2 },
];

/* Attention & Risk */
const attentionMetrics = [
  { label: "Requires review", value: "23", icon: AlertTriangle, color: AMBER },
  { label: "Failed actions", value: "7", icon: XCircle, color: RED },
  { label: "Paused agents", value: "2", icon: PauseCircle, color: AMBER },
  { label: "Low confidence", value: "12", icon: Shield, color: PURPLE },
];

const attentionItems = [
  { agent: "Review response", issue: "2 responses flagged for tone review", severity: "warning" as const },
  { agent: "Ticketing agent", issue: "3 failed routing actions", severity: "error" as const },
  { agent: "Social engagement", issue: "Agent paused — token expired", severity: "error" as const },
  { agent: "Listing optimization", issue: "5 low-confidence updates held", severity: "warning" as const },
  { agent: "Review generation", issue: "2 delivery failures", severity: "error" as const },
];

/* Adoption & Usage */
const adoptionMetrics = [
  { label: "Active agents", value: "9", icon: Bot, color: ACCENT },
  { label: "Templates enabled", value: "6", icon: Zap, color: GREEN },
  { label: "Workflows created", value: "14", icon: Workflow, color: PURPLE },
  { label: "Scheduled reports", value: "4", icon: Clock, color: AMBER },
  { label: "AI coverage", value: "58%", icon: TrendingUp, color: ACCENT },
];

const adoptionTrend = [
  { month: "Sep", agents: 4, coverage: 32 },
  { month: "Oct", agents: 5, coverage: 38 },
  { month: "Nov", agents: 6, coverage: 44 },
  { month: "Dec", agents: 7, coverage: 48 },
  { month: "Jan", agents: 8, coverage: 53 },
  { month: "Feb", agents: 9, coverage: 58 },
];

/* ════════════════════════════════════════════════════════════
   COMPONENTS
   ════════════════════════════════════════════════════════════ */

/* Metric card */
function MetricCard({ label, value, icon: Icon, color }: {
  label: string; value: string; icon: typeof Zap; color: string;
}) {
  return (
    <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 transition-colors">
      <div className="flex items-baseline gap-2 mb-1">
        <p className="text-[24px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.5px]" style={{ fontWeight: 400 }}>{value}</p>
        <Icon className="w-4 h-4 self-center" style={{ color }} />
      </div>
      <span className="text-[12px] text-[#888] dark:text-[#6b7280] tracking-[-0.24px]" style={{ fontWeight: 400 }}>{label}</span>
    </div>
  );
}

/* BirdAI Insight block */
function InsightBlock({ text }: { text: string }) {
  return (
    <div className="bg-[#f8f6ff] dark:bg-[#1e1a2e] border border-[#e8e0f5] dark:border-[#362e50] rounded-[12px] px-5 py-4 flex items-start gap-3">
      <div className="w-7 h-7 rounded-[8px] bg-gradient-to-br from-[#9970D7] to-[#2552ED] flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <p className="text-[13px] text-[#9970D7] dark:text-[#b89ce6] mb-1 tracking-[-0.26px]" style={{ fontWeight: 400 }}>BirdAI insight</p>
        <p className="text-[13px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 300 }}>{text}</p>
      </div>
    </div>
  );
}

/* Chart container */
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 transition-colors">
      <p className="text-[14px] text-[#212121] dark:text-[#e4e4e4] mb-4 tracking-[-0.28px]" style={{ fontWeight: 400 }}>{title}</p>
      {children}
    </div>
  );
}

/* Custom recharts tooltip */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-[#262b35] border border-[#E5E7EB] dark:border-[#333a47] rounded-[8px] px-3 py-2 text-[12px]">
      <p className="text-[#212121] dark:text-[#e4e4e4] mb-1" style={{ fontWeight: 400 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color, fontWeight: 300 }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

/* Date filter dropdown */
function DateFilterDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-[7px] text-[13px] text-[#212121] dark:text-[#e4e4e4] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] bg-white dark:bg-[#1e2229] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
        style={{ fontWeight: 400 }}
      >
        {value}
        <ChevronDown className="w-3 h-3 text-[#999] dark:text-[#6b7280]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] py-1 z-50 min-w-[160px]">
          {dateOptions.map(o => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-[13px] transition-colors ${
                o === value
                  ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e]"
                  : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
              }`}
              style={{ fontWeight: 400 }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   REPORT PAGE RENDERERS
   ════════════════════════════════════════════════════════════ */

function ExecutiveImpactPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-4">
        {execMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Automation trend">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={automationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--tw-dark, #2e3340)" className="stroke-[#f0f0f0] dark:stroke-[#2e3340]" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="automated" stroke={ACCENT} fill={ACCENT} fillOpacity={0.1} name="Automated" />
              <Area type="monotone" dataKey="manual" stroke={AMBER} fill={AMBER} fillOpacity={0.1} name="Manual" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="AI vs human workload">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={workloadSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                {workloadSplit.map((_, i) => <Cell key={i} fill={i === 0 ? ACCENT : "#ddd"} className={i === 1 ? "dark:fill-[#333a47]" : ""} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(v: string) => <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top performing agents table */}
      <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 transition-colors">
        <p className="text-[14px] text-[#212121] dark:text-[#e4e4e4] mb-3 tracking-[-0.28px]" style={{ fontWeight: 400 }}>Top performing agents</p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f0f1f5] dark:border-[#2e3340]">
              <th className="text-left text-[11px] text-[#999] dark:text-[#6b7280] pb-2 tracking-[0.5px] uppercase" style={{ fontWeight: 400 }}>Agent</th>
              <th className="text-right text-[11px] text-[#999] dark:text-[#6b7280] pb-2 tracking-[0.5px] uppercase" style={{ fontWeight: 400 }}>Tasks</th>
              <th className="text-right text-[11px] text-[#999] dark:text-[#6b7280] pb-2 tracking-[0.5px] uppercase" style={{ fontWeight: 400 }}>Success rate</th>
            </tr>
          </thead>
          <tbody>
            {topAgents.map(a => (
              <tr key={a.name} className="border-b border-[#f8f9fa] dark:border-[#262b35] last:border-0">
                <td className="py-2.5 text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{a.name}</td>
                <td className="py-2.5 text-[13px] text-[#888] dark:text-[#6b7280] text-right tabular-nums" style={{ fontWeight: 300 }}>{a.tasks}</td>
                <td className="py-2.5 text-[13px] text-[#4caf50] text-right tabular-nums" style={{ fontWeight: 400 }}>{a.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightBlock text="Your AI team handled 72% of repetitive customer interactions this month. Review response and ticketing agents generated the highest time savings, collectively saving 62 hours of manual work." />
    </div>
  );
}

function AgentPerformancePage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {agentPerfMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <ChartCard title="Success rate trend">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={successTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-[#f0f0f0] dark:stroke-[#2e3340]" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis domain={[88, 100]} tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="rate" stroke={GREEN} fill={GREEN} fillOpacity={0.1} name="Success %" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Performance table */}
      <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 transition-colors">
        <p className="text-[14px] text-[#212121] dark:text-[#e4e4e4] mb-3 tracking-[-0.28px]" style={{ fontWeight: 400 }}>Agent breakdown</p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f0f1f5] dark:border-[#2e3340]">
              {["Agent", "Success", "Volume", "Failures", "Avg time"].map(h => (
                <th key={h} className={`${h === "Agent" ? "text-left" : "text-right"} text-[11px] text-[#999] dark:text-[#6b7280] pb-2 tracking-[0.5px] uppercase`} style={{ fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agentPerfTable.map(row => (
              <tr key={row.agent} className="border-b border-[#f8f9fa] dark:border-[#262b35] last:border-0">
                <td className="py-2.5 text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{row.agent}</td>
                <td className="py-2.5 text-[13px] text-[#4caf50] text-right tabular-nums" style={{ fontWeight: 400 }}>{row.success}</td>
                <td className="py-2.5 text-[13px] text-[#888] dark:text-[#6b7280] text-right tabular-nums" style={{ fontWeight: 300 }}>{row.volume}</td>
                <td className="py-2.5 text-[13px] text-[#ef5350] text-right tabular-nums" style={{ fontWeight: 300 }}>{row.failures}</td>
                <td className="py-2.5 text-[13px] text-[#888] dark:text-[#6b7280] text-right tabular-nums" style={{ fontWeight: 300 }}>{row.avgTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InsightBlock text="Agent success rate improved 4.2% over the last 6 months. Review response agent leads in volume while listing optimization has the highest accuracy at 97%." />
    </div>
  );
}

function ProductOutcomesPage({ subTab }: { subTab: ProductSubTab }) {
  const data = productData[subTab];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {data.metrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>
      <InsightBlock text={data.insight} />
    </div>
  );
}

function WorkflowPerformancePage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {workflowMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <ChartCard title="Workflow runs — last 4 weeks">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={workflowRuns}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-[#f0f0f0] dark:stroke-[#2e3340]" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="success" fill={GREEN} radius={[4, 4, 0, 0]} name="Success" />
            <Bar dataKey="failures" fill={RED} radius={[4, 4, 0, 0]} name="Failures" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <InsightBlock text="Workflow execution reliability stayed above 93% for the last 4 weeks. Scheduled report delivery had the highest success rate at 99.2%." />
    </div>
  );
}

function AttentionRiskPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {attentionMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 transition-colors">
        <p className="text-[14px] text-[#212121] dark:text-[#e4e4e4] mb-3 tracking-[-0.28px]" style={{ fontWeight: 400 }}>Items requiring attention</p>
        <div className="space-y-0">
          {attentionItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#f8f9fa] dark:border-[#262b35] last:border-0">
              {item.severity === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-[#ef5350] shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{item.agent}</p>
                <p className="text-[12px] text-[#888] dark:text-[#6b7280] mt-0.5" style={{ fontWeight: 300 }}>{item.issue}</p>
              </div>
              <button className="text-[12px] text-[#2552ED] dark:text-[#6b9bff] hover:underline shrink-0" style={{ fontWeight: 400 }}>
                View in monitor
              </button>
            </div>
          ))}
        </div>
      </div>

      <InsightBlock text="3 agents have unresolved errors that require immediate attention. Social engagement agent needs token refresh to resume operations." />
    </div>
  );
}

function AdoptionUsagePage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-4">
        {adoptionMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <ChartCard title="AI adoption over time">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={adoptionTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-[#f0f0f0] dark:stroke-[#2e3340]" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="agents" stroke={ACCENT} fill={ACCENT} fillOpacity={0.1} name="Active agents" />
            <Area yAxisId="right" type="monotone" dataKey="coverage" stroke={PURPLE} fill={PURPLE} fillOpacity={0.1} name="Coverage %" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <InsightBlock text="AI automation coverage grew from 32% to 58% in the last 6 months. 5 new agents were activated, with review response and ticketing driving the most impact." />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════════════════════ */

const reportDescriptions: Record<ReportTab, string> = {
  executive: "How BirdAI improved your business this period",
  "agent-performance": "How each agent is performing across metrics",
  "product-outcomes": "Business outcomes broken down by product area",
  workflow: "Performance of automation workflows and scheduled deliveries",
  attention: "Items requiring human supervision and review",
  adoption: "Platform adoption and AI coverage growth",
};

/* ─── Report tab → readable name mapping ─── */
const reportTabNames: Record<ReportTab, string> = {
  executive: "Outcome",
  "agent-performance": "Agent performance",
  "product-outcomes": "Product outcomes",
  workflow: "Workflow performance",
  attention: "Attention & risk",
  adoption: "Adoption & usage",
};

/* ─── Actions available per report ─── */
const BIRDAI_REPORT_ACTIONS: ReportActionId[] = ["share", "customizeShare", "schedule"];

export function BirdAIReportsView() {
  const [activeTab, setActiveTab] = useState<ReportTab>("executive");
  const [dateFilter, setDateFilter] = useState("Last 30 days");
  const [productSubTab, setProductSubTab] = useState<ProductSubTab>("reviews");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  /* Build context dynamically based on active tab */
  const reportContext = useMemo(() => {
    const tabName = reportTabNames[activeTab];
    return buildReportContext({
      reportId: `birdai-${activeTab}`,
      reportType: "birdai",
      reportName: tabName,
      entityType: "report",
      capabilities: {
        share: true,
        customize: true,
        schedule: true,
      },
      exportFormats: ["pdf", "xls", "ppt"],
      supportsBranding: true,
    });
  }, [activeTab]);

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-[#13161b] transition-colors duration-300">
      <div className="px-6 py-6 space-y-5">

        {/* ─── Page Header ─── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[20px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.4px]" style={{ fontWeight: 400 }}>
              {reportTabNames[activeTab]}
            </h1>
            <p className="text-[13px] text-[#888] dark:text-[#6b7280] mt-0.5" style={{ fontWeight: 300 }}>
              {reportDescriptions[activeTab]}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <DateFilterDropdown value={dateFilter} onChange={setDateFilter} />

            {/* Actions dropdown — replaces Export + Schedule */}
            <ReportActionsButton
              context={reportContext}
              actions={BIRDAI_REPORT_ACTIONS}
            />

            {/* Filter button — same icon & pattern as ReviewsView */}
            <Button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              variant="outline"
              size="icon"
              className={filterPanelOpen
                ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]"
                : ""
              }
            >
              <Filter className={`w-[14px] h-[14px] ${filterPanelOpen ? "text-[#2552ED]" : "text-[#555] dark:text-[#8b92a5]"}`} />
            </Button>
          </div>
        </div>

        {/* ─── Report Tabs ─── */}
        <div className="flex items-center gap-1 border-b border-[#f0f1f5] dark:border-[#2e3340]">
          {reportTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2.5 text-[13px] tracking-[-0.26px] transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "text-[#2552ED] dark:text-[#6b9bff] border-[#2552ED] dark:border-[#6b9bff]"
                  : "text-[#888] dark:text-[#6b7280] border-transparent hover:text-[#212121] dark:hover:text-[#e4e4e4]"
              }`}
              style={{ fontWeight: 400 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Product Outcomes Sub-tabs ─── */}
        {activeTab === "product-outcomes" && (
          <div className="flex items-center gap-1">
            {productSubTabs.map(st => (
              <button
                key={st.id}
                onClick={() => setProductSubTab(st.id)}
                className={`px-3 py-1.5 text-[12px] rounded-[8px] border transition-colors tracking-[-0.24px] ${
                  productSubTab === st.id
                    ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e] border-[#2552ED]/20 dark:border-[#2552ED]/30"
                    : "text-[#888] dark:text-[#6b7280] bg-white dark:bg-[#1e2229] border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {st.label}
              </button>
            ))}
          </div>
        )}

        {/* ─── Report Content ─── */}
        {activeTab === "executive" && <ExecutiveImpactPage />}
        {activeTab === "agent-performance" && <AgentPerformancePage />}
        {activeTab === "product-outcomes" && <ProductOutcomesPage subTab={productSubTab} />}
        {activeTab === "workflow" && <WorkflowPerformancePage />}
        {activeTab === "attention" && <AttentionRiskPage />}
        {activeTab === "adoption" && <AdoptionUsagePage />}
      </div>
    </div>
  );
}