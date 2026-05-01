import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Filter, Info, MoreVertical } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ShareModal } from "./ShareModal";
import { AICustomizePanel } from "./AICustomizePanel";
import { ScheduleModal } from "./ScheduleModal";
import { type DraftReport } from "./draftStore";
import svgPaths from "../../imports/svg-mh0ycv9qll";

// ─── Generate chart data for Mar 1–28 ───
function generateChartData(series: { key: string; base: number; variance: number }[]) {
  return Array.from({ length: 28 }, (_, i) => {
    const day = `Mar ${i + 1}`;
    const point: Record<string, string | number> = { day };
    series.forEach(s => {
      point[s.key] = Math.max(0, s.base + (Math.sin(i * 0.7 + s.base) * s.variance) + (Math.random() - 0.5) * s.variance * 0.5);
    });
    return point;
  });
}

const audienceData = generateChartData([
  { key: "youtube", base: 7000, variance: 2000 },
  { key: "linkedin", base: 5500, variance: 1500 },
]);

const messagingData = generateChartData([
  { key: "youtube", base: 6000, variance: 3000 },
  { key: "linkedin", base: 4000, variance: 2000 },
]);

const impressionsData = generateChartData([
  { key: "youtube", base: 5000, variance: 2500 },
  { key: "linkedin", base: 3500, variance: 1800 },
]);

const engagementData = generateChartData([
  { key: "youtube", base: 5000, variance: 2500 },
  { key: "linkedin", base: 3000, variance: 1500 },
]);

const engagementRateData = generateChartData([
  { key: "youtube", base: 50, variance: 15 },
  { key: "linkedin", base: 40, variance: 10 },
]);

const videoViewsData = generateChartData([
  { key: "youtube", base: 3000, variance: 2000 },
  { key: "linkedin", base: 1500, variance: 1000 },
]);

const publishedPostsData = generateChartData([
  { key: "youtube", base: 3000, variance: 2000 },
  { key: "linkedin", base: 1200, variance: 800 },
]);

// ─── Reusable SVG icons matching Figma ───
function QuestionIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g />
      </svg>
      <div className="absolute inset-[12.5%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path clipRule="evenodd" d={svgPaths.p2fb1e00} fill="#8F8F8F" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function EqualizerIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p3f857700} className="fill-[#212121] dark:fill-[#c0c6d4]" />
      </svg>
    </div>
  );
}

function ThreeDotIcon() {
  return (
    <div className="relative shrink-0 size-[14px]">
      <div className="absolute flex inset-[14.81%_42.24%_14.88%_42.24%] items-center justify-center">
        <div className="flex-none h-[2.484px] rotate-90 w-[11.25px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 2.48438">
            <path clipRule="evenodd" d={svgPaths.p23a25380} className="fill-[#212121] dark:fill-[#c0c6d4]" fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function UpArrowIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute bottom-[18.75%] flex items-center justify-center left-1/4 right-1/4 top-[18.75%]">
        <div className="flex-none h-[8px] rotate-90 w-[10px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 8">
            <path d={svgPaths.p327991f0} fill="#4EAC5D" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Legend dot ───
function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex gap-[6px] items-center shrink-0">
      <div className="relative shrink-0 size-[12px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill={color} r="6" />
        </svg>
      </div>
      <p className="text-[11px] text-[#8a8a8a] dark:text-[#8b92a5] whitespace-nowrap" style={{ fontWeight: 400 }}>{label}</p>
    </div>
  );
}

// ─── KPI value with change ───
function KpiValue({ value, change, label, large }: { value: string; change: string; label: string; large?: boolean }) {
  return (
    <div className="flex flex-col gap-[2px] items-start shrink-0">
      <div className="flex gap-[4px] items-center">
        <p className={`text-[#222] dark:text-[#e4e4e4] whitespace-nowrap ${large ? "text-[30px] leading-[42px]" : "text-[20px] leading-[22px]"}`} style={{ fontWeight: 400 }}>
          {value}
        </p>
        {change && (
          <div className="flex items-center pt-[6px]">
            <UpArrowIcon />
            <p className="text-[13px] text-[#4eac5d] whitespace-nowrap" style={{ fontWeight: 400 }}>{change}</p>
          </div>
        )}
      </div>
      <p className={`text-[12px] whitespace-nowrap ${large ? "text-[#555] dark:text-[#9ba2b0] leading-[18px]" : "text-[#8f8f8f] dark:text-[#7d849a] uppercase leading-[16px]"}`} style={{ fontWeight: 400 }}>
        {label}
      </p>
    </div>
  );
}

// ─── Widget header ───
function WidgetHeader({ title, showActions = true }: { title: string; showActions?: boolean }) {
  return (
    <div className="flex flex-col gap-[16px] items-start shrink-0 w-full">
      <div className="flex items-start justify-between px-[20px] py-[16px] w-full relative">
        <div className="absolute border-[#eaeaea] dark:border-[#333a47] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-col gap-[4px] items-start justify-center">
          <div className="flex gap-[4px] items-center">
            <p className="text-[17px] text-[#555] dark:text-[#c0c6d4] whitespace-nowrap" style={{ fontWeight: 400 }}>{title}</p>
            <QuestionIcon />
          </div>
          <div className="flex gap-[4px] items-start text-[12px] whitespace-nowrap" style={{ fontWeight: 400 }}>
            <span className="text-[#555] dark:text-[#9ba2b0] leading-[16px]">This month</span>
            <span className="text-[#8f8f8f] dark:text-[#6b7280] leading-[16px]">vs</span>
            <span className="text-[#555] dark:text-[#9ba2b0] leading-[16px]">Previous period</span>
          </div>
        </div>
        {showActions && (
          <div className="flex gap-[8px] items-start">
            <button className="bg-white dark:bg-[#2a3040] flex items-start p-[8px] relative rounded-[8px] border border-[#e5e9f0] dark:border-[#333a47]">
              <EqualizerIcon />
            </button>
            <button className="bg-white dark:bg-[#2a3040] flex items-start p-[8px] relative rounded-[8px] border border-[#e5e9f0] dark:border-[#333a47]">
              <ThreeDotIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Chart widget card ───
interface ChartWidgetProps {
  title: string;
  kpis: { value: string; change: string; label: string }[];
  data: Record<string, string | number>[];
  series: { key: string; color: string; label: string }[];
  yDomain?: [number, number];
  yTickFormatter?: (v: number) => string;
  tableHeaders?: string[];
  tableRows?: { channel: string; values: { value: string; change: string }[] }[];
}

function ChartWidget({ title, kpis, data, series, yDomain, yTickFormatter, tableHeaders, tableRows }: ChartWidgetProps) {
  const chartId = useId();
  const defaultFormatter = (v: number) => {
    if (v >= 1000) return `${Math.round(v / 1000)}k`;
    return String(v);
  };
  const formatter = yTickFormatter || defaultFormatter;

  return (
    <div className="bg-white dark:bg-[#1e2229] flex flex-col gap-[20px] items-center pb-[20px] px-[20px] rounded-[8px] border border-[#e5e9f0] dark:border-[#333a47] w-full transition-colors duration-300">
      <WidgetHeader title={title} />

      {/* KPIs */}
      <div className="flex gap-[24px] items-end px-[20px] w-full">
        {kpis.map(kpi => (
          <KpiValue key={kpi.label} value={kpi.value} change={kpi.change} label={kpi.label} />
        ))}
      </div>

      {/* Chart */}
      <div className="w-full px-[0px]">
        <div className="flex gap-[16px] items-center w-full">
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <defs key="defs">
                {series.map(s => (
                  <linearGradient key={`grad-${s.key}`} id={`gradient-${chartId}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop key="stop-0" offset="0%" stopColor={s.color} stopOpacity={0.1} />
                    <stop key="stop-1" offset="100%" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid key="grid" horizontal={true} vertical={false} stroke="#eaeaea" />
              <XAxis
                key="xaxis"
                dataKey="day"
                tick={{ fontSize: 11, fill: "#555" }}
                tickLine={false}
                axisLine={false}
                interval={0}
                tickFormatter={(v: string) => v.replace("Mar ", "")}
              />
              <YAxis
                key="yaxis"
                tick={{ fontSize: 11, fill: "#555" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatter}
                domain={yDomain}
                width={36}
              />
              <Tooltip
                key="tooltip"
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eaeaea" }}
                labelStyle={{ fontWeight: 400 }}
              />
              {series.map(s => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  stroke={s.color}
                  strokeWidth={2}
                  fill={`url(#gradient-${chartId}-${s.key})`}
                  name={s.label}
                  dot={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legends */}
        <div className="flex gap-[24px] items-center mt-[8px] ml-[36px]">
          {series.map(s => (
            <LegendDot key={s.key} color={s.color} label={s.label} />
          ))}
        </div>
      </div>

      {/* Data table */}
      {tableHeaders && tableRows && (
        <div className="w-full border-t border-[#eaeaea] dark:border-[#333a47]">
          {/* Table header */}
          <div className="flex items-center py-[12px]">
            <div className="min-w-[200px]">
              <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Channels</p>
            </div>
            {tableHeaders.map(h => (
              <div key={h} className="min-w-[200px] flex items-center gap-[4px]">
                <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{h}</p>
                <div className="relative shrink-0 size-[12px]">
                  <div className="absolute bottom-1/4 left-[18.75%] right-[18.75%] top-[37.5%]">
                    <svg className="absolute block size-full" fill="none" viewBox="0 0 7.5 4.5">
                      <path d={svgPaths.p3ddac800} fill="#303030" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Table rows */}
          {tableRows.map(row => (
            <div key={row.channel} className="flex items-center border-t border-[#eaeaea] dark:border-[#333a47]">
              <div className="min-w-[200px] py-[12px]">
                <p className="text-[15px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{row.channel}</p>
              </div>
              {row.values.map((v, vi) => (
                <div key={vi} className="min-w-[200px] py-[12px] flex items-center gap-[8px]">
                  <p className="text-[15px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{v.value}</p>
                  {v.change && (
                    <div className="flex items-center">
                      <UpArrowIcon />
                      <p className="text-[13px] text-[#4eac5d]" style={{ fontWeight: 400 }}>{v.change}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Chart widget configs ───
const chartWidgets: ChartWidgetProps[] = [
  {
    title: "Audience growth",
    kpis: [
      { value: "23.2K", change: "4.6%", label: "Total audience" },
      { value: "11.2K", change: "4.2%", label: "Audience gained" },
    ],
    data: audienceData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    tableHeaders: ["Total audience", "Net audience growth"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "12,487", change: "4.2%" }, { value: "537", change: "4.2%" }] },
      { channel: "LinkedIn", values: [{ value: "10,713", change: "2.3%" }, { value: "232", change: "2.3%" }] },
    ],
  },
  {
    title: "Messaging volume",
    kpis: [
      { value: "21.9K", change: "12.6%", label: "Total messages" },
      { value: "18K", change: "11.2%", label: "Messages received" },
    ],
    data: messagingData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    tableHeaders: ["Messages received", "Messages sent"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "12,487", change: "4.2%" }, { value: "537", change: "4.2%" }] },
      { channel: "LinkedIn", values: [{ value: "10,713", change: "2.3%" }, { value: "232", change: "2.3%" }] },
    ],
  },
  {
    title: "Impressions",
    kpis: [
      { value: "17.9K", change: "1.6%", label: "Total impressions" },
    ],
    data: impressionsData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    tableHeaders: ["Impressions"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "10,215", change: "4.2%" }] },
      { channel: "LinkedIn", values: [{ value: "7,685", change: "1.3%" }] },
    ],
  },
  {
    title: "Engagement",
    kpis: [
      { value: "17.9K", change: "10.6%", label: "Total engagements" },
    ],
    data: engagementData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    tableHeaders: ["Engagement"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "11,200", change: "1.2%" }] },
      { channel: "LinkedIn", values: [{ value: "6,700", change: "0.3%" }] },
    ],
  },
  {
    title: "Engagement rate",
    kpis: [
      { value: "49.4%", change: "15.6%", label: "Engagement rate" },
    ],
    data: engagementRateData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    yDomain: [0, 100],
    yTickFormatter: (v: number) => `${v}%`,
    tableHeaders: ["Engagement rate"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "52.3%", change: "4.2%" }] },
      { channel: "LinkedIn", values: [{ value: "46.5%", change: "2.3%" }] },
    ],
  },
  {
    title: "Video views",
    kpis: [
      { value: "7.9K", change: "140.6%", label: "Total video views" },
    ],
    data: videoViewsData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    tableHeaders: ["Video views"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "5,400", change: "2.2%" }] },
      { channel: "LinkedIn", values: [{ value: "2,500", change: "2.1%" }] },
    ],
  },
  {
    title: "Published posts",
    kpis: [
      { value: "7.9K", change: "140.6%", label: "Total published posts" },
    ],
    data: publishedPostsData,
    series: [
      { key: "youtube", color: "#FF6A4D", label: "YouTube" },
      { key: "linkedin", color: "#0A66C2", label: "LinkedIn" },
    ],
    tableHeaders: ["Published posts"],
    tableRows: [
      { channel: "YouTube", values: [{ value: "4,800", change: "2.2%" }] },
      { channel: "LinkedIn", values: [{ value: "3,100", change: "2.1%" }] },
    ],
  },
];

// ─── Main Dashboard ───
export function Dashboard({ aiPanelOpen, onAiPanelChange, editingDraft }: { aiPanelOpen: boolean; onAiPanelChange: (open: boolean) => void; editingDraft?: DraftReport | null }) {
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [aiEntryMode, setAiEntryMode] = useState<"share" | "schedule">("share");
  const [themeColor, setThemeColor] = useState("#2552ED");
  const [showSummaryPage, setShowSummaryPage] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ─── AI Customize Panel (page-level, replaces dashboard) ───
  if (aiPanelOpen) {
    return (
      <AICustomizePanel
        onClose={() => { onAiPanelChange(false); setAiEntryMode("share"); }}
        themeColor={themeColor}
        onThemeColorChange={setThemeColor}
        showSummaryPage={showSummaryPage}
        onToggleSummaryPage={setShowSummaryPage}
        editingDraft={editingDraft}
        entryMode={aiEntryMode}
      />
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-[#13161b] overflow-auto flex flex-col transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#13161b] px-8 h-[76px] flex items-center justify-between shrink-0 transition-colors duration-300">
        <h1 className="text-[#212121] dark:text-[#e4e4e4] tracking-[-0.26px] text-[18px]" style={{ fontWeight: 400 }}>Profile performance</h1>
        <div className="flex items-center gap-3">
          <div className="relative" ref={shareRef}>
            <button
              onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
              className="flex items-center gap-1 px-4 py-1.5 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[14px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] tracking-[-0.15px]"
              style={{ fontWeight: 400 }}
            >
              Actions
              <ChevronDown className="w-4 h-4 text-[#212121] dark:text-[#e4e4e4]" />
            </button>
            {shareDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-lg shadow-[0px_20px_34px_rgba(33,33,33,0.16)] dark:shadow-[0px_20px_34px_rgba(0,0,0,0.35)] z-20 min-w-[160px]">
                <button
                  onClick={() => { setShareDropdownOpen(false); setShareModalOpen(true); }}
                  className="w-full px-4 py-2.5 text-left text-[13px] text-[#1e1e1e] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] rounded-t-lg"
                  style={{ fontWeight: 400 }}
                >
                  Share report
                </button>
                <button
                  onClick={() => { setShareDropdownOpen(false); setAiEntryMode("share"); onAiPanelChange(true); }}
                  className="w-full px-4 py-2.5 text-left text-[13px] text-[#1e1e1e] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                  style={{ fontWeight: 400 }}
                >
                  Customize & share
                </button>
                <button
                  onClick={() => { setShareDropdownOpen(false); setScheduleModalOpen(true); }}
                  className="w-full px-4 py-2.5 text-left text-[13px] text-[#1e1e1e] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] rounded-b-lg"
                  style={{ fontWeight: 400 }}
                >
                  Schedule
                </button>
              </div>
            )}
          </div>
          <button className="bg-white dark:bg-[#262b35] p-2 border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]">
            <Filter className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pt-0 pb-8 flex flex-col gap-[20px] flex-1">
        {/* Performance Summary */}
        <div className="bg-white dark:bg-[#1e2229] flex flex-col gap-[20px] items-center pb-[20px] px-[20px] rounded-[8px] border border-[#e5e9f0] dark:border-[#333a47] w-full transition-colors duration-300">
          <WidgetHeader title="Performance summary" showActions={false} />
          <div className="flex flex-wrap gap-[80px_80px] items-start w-full px-[0px]">
            {[
              { value: "19.1K", change: "8.2%", label: "Impressions" },
              { value: "11.9K", change: "6.2%", label: "Engagement" },
              { value: "2.4%", change: "1.2%", label: "Engagement rate" },
              { value: "9.2K", change: "3.2%", label: "Post link clicks" },
            ].map(kpi => (
              <KpiValue key={kpi.label} value={kpi.value} change={kpi.change} label={kpi.label} large />
            ))}
          </div>
        </div>

        {/* Chart widgets */}
        {chartWidgets.map(widget => (
          <ChartWidget key={widget.title} {...widget} />
        ))}
      </div>

      {/* Share Modal */}
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        onCustomize={() => { setShareModalOpen(false); setAiEntryMode("share"); onAiPanelChange(true); }}
        themeColor={themeColor}
        showSummaryPage={showSummaryPage}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onCustomize={() => { setScheduleModalOpen(false); setAiEntryMode("schedule"); onAiPanelChange(true); }}
        themeColor={themeColor}
        showSummaryPage={showSummaryPage}
      />
    </div>
  );
}