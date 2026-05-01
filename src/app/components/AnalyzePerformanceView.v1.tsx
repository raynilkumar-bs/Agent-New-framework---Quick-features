import { Sparkles, TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import {
  globalKpis,
  globalInsights,
  globalBenchmarks,
  agentSections,
  type TrendDirection,
  type AgentSection,
} from "@/app/data/agentsPerformanceMock";

/* ─── Shared helpers ─── */
function TrendIcon({ direction }: { direction: TrendDirection }) {
  if (direction === "up")   return <TrendingUp  className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
  if (direction === "down") return <TrendingDown className="size-3.5 text-red-500 dark:text-red-400 shrink-0" />;
  return <Minus className="size-3.5 text-[#aaa] shrink-0" />;
}

function trendClass(d: TrendDirection) {
  if (d === "up")   return "text-emerald-600 dark:text-emerald-400";
  if (d === "down") return "text-red-500 dark:text-red-400";
  return "text-[#888] dark:text-[#666]";
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#aaa] dark:text-[#555] mb-2.5">
      {children}
    </p>
  );
}

function AiInsightBlock({ insights }: { insights: { text: string; action?: string }[] }) {
  return (
    <div className="rounded-xl border border-[#c7d2fe] dark:border-[#2a3a70] bg-[#EEF2FF] dark:bg-[#1a2040] p-5">
      <div className="flex items-center gap-1.5 mb-3.5">
        <Sparkles className="size-3.5 text-[#4f46e5] dark:text-[#818cf8] shrink-0" />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#4f46e5] dark:text-[#818cf8]">AI Insight</span>
      </div>
      <ul className="flex flex-col gap-3">
        {insights.map((ins, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="mt-[7px] size-1.5 rounded-full bg-[#4f46e5] dark:bg-[#818cf8] shrink-0" />
            <div className="min-w-0">
              <p className="text-[13px] text-[#1e1e2e] dark:text-[#c7d2fe] leading-relaxed">{ins.text}</p>
              {ins.action && (
                <button className="mt-0.5 inline-flex items-center gap-0.5 text-[12px] text-[#4f46e5] dark:text-[#818cf8] hover:underline font-medium">
                  {ins.action}<ChevronRight className="size-3" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── KPI tile ─── */
function KpiTile({ label, value, trend, delta }: typeof globalKpis[number]) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] p-4 flex flex-col gap-2">
      <p className="text-[11px] text-[#888] dark:text-[#6b7280]">{label}</p>
      <p className="text-[22px] font-semibold tracking-tight text-[#212121] dark:text-[#e4e4e4] leading-none">{value}</p>
      <div className="flex items-center gap-1.5 mt-auto">
        <TrendIcon direction={trend} />
        <span className={cn("text-[11px] font-medium", trendClass(trend))}>{delta}</span>
        <span className="text-[11px] text-[#bbb] dark:text-[#555]">vs prev 30d</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Overview report
   ═══════════════════════════════════════════ */
function OverviewReport() {
  return (
    <div className="flex flex-col gap-6 px-6 py-6 max-w-[880px]">
      <div>
        <h2 className="text-[18px] font-semibold text-[#212121] dark:text-[#e4e4e4] tracking-tight">Global Performance Overview</h2>
        <p className="text-[13px] text-[#888] dark:text-[#6b7280] mt-1">CEO-level snapshot of how your full AI team is performing.</p>
      </div>

      {/* KPIs */}
      <div>
        <SectionLabel>Performance KPIs</SectionLabel>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {globalKpis.map((kpi) => <KpiTile key={kpi.label} {...kpi} />)}
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <SectionLabel>AI-Generated Insights</SectionLabel>
        <AiInsightBlock insights={globalInsights} />
      </div>

      {/* Benchmarks */}
      <div>
        <SectionLabel>Benchmark vs. Industry</SectionLabel>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] px-5 py-5">
          <div className="flex flex-col gap-4">
            {globalBenchmarks.map((b) => (
              <div key={b.label} className="flex items-center gap-3 min-w-0">
                <span className="text-[12px] text-[#666] dark:text-[#9ba2b0] w-[130px] shrink-0">{b.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#f0f1f5] dark:bg-[#262b35] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#4f46e5] dark:bg-[#818cf8] transition-all duration-500"
                    style={{ width: `${b.percentile}%` }}
                  />
                </div>
                <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4] font-medium shrink-0 text-right w-[196px]">{b.result}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-[#bbb] dark:text-[#555]">Benchmarks reflect your industry vertical. Updated monthly.</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Agent report
   ═══════════════════════════════════════════ */
function AgentStatusBadge({ status }: { status: AgentSection["status"] }) {
  if (status === "active")
    return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">Active</span>;
  if (status === "inactive")
    return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">Inactive</span>;
  return <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#f0f1f5] text-[#888] dark:bg-[#2e3340] dark:text-[#6b7280]">Not configured</span>;
}

function AgentReport({ agent }: { agent: AgentSection }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-6 max-w-[880px]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap mb-1">
          <h2 className="text-[18px] font-semibold text-[#212121] dark:text-[#e4e4e4] tracking-tight">{agent.label}</h2>
          <AgentStatusBadge status={agent.status} />
        </div>
        <p className="text-[13px] text-[#888] dark:text-[#6b7280]">{agent.description}</p>
      </div>

      {/* Metrics */}
      <div>
        <SectionLabel>Metrics</SectionLabel>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {agent.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-[#E5E7EB] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] p-4 flex flex-col gap-1.5">
              <p className="text-[11px] text-[#888] dark:text-[#6b7280]">{m.label}</p>
              <p className="text-[20px] font-semibold tracking-tight text-[#212121] dark:text-[#e4e4e4] leading-none">{m.value}</p>
              {m.trend && m.delta && (
                <div className="flex items-center gap-1 mt-auto">
                  <TrendIcon direction={m.trend} />
                  <span className={cn("text-[11px] font-medium", trendClass(m.trend))}>{m.delta}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div>
        <SectionLabel>AI Insight</SectionLabel>
        <AiInsightBlock insights={[agent.insight]} />
      </div>

      {/* Benchmark */}
      <div>
        <SectionLabel>Benchmark</SectionLabel>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] px-5 py-4">
          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]">{agent.benchmark}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main export
   ═══════════════════════════════════════════ */
export function AnalyzePerformanceView({ selectedItem = "overview" }: { selectedItem?: string }) {
  const agent = agentSections.find((a) => a.id === selectedItem) ?? null;

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {selectedItem === "overview" ? (
        <OverviewReport />
      ) : agent ? (
        <AgentReport agent={agent} />
      ) : (
        <OverviewReport />
      )}
    </div>
  );
}
