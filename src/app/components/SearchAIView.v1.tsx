import { useState, Fragment, useMemo } from "react";
import { ChevronDown, ChevronUp, Filter, MoreVertical, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie,
  LineChart, Line,
  ComposedChart,
} from "recharts";
import imgMap from "figma:asset/bf80a96c14e50ef92a57fc0098164cd207b9809f.png";

/* ─── Platform Tabs ─── */
const platformTabs = ["ChatGPT", "Gemini", "Perplexity", "Google AI Mode", "Google AI Overviews", "All sites"] as const;
type PlatformTab = (typeof platformTabs)[number];

/* ─── Mock Data ─── */
const summaryMetrics = [
  { label: "Visibility score", value: "58%", change: "+36.6%", positive: true },
  { label: "ChatGPT", value: "79%", change: "+20%", positive: true },
  { label: "Gemini", value: "22%", change: "-40%", positive: false },
  { label: "Perplexity", value: "67%", change: "-10%", positive: false },
];

const visibilityOverTimeData = [
  { month: "Mar\n2025", yourBrand: 30, chatgpt: 32, gemini: 28, perplexity: 25, claude: 22 },
  { month: "Apr", yourBrand: 32, chatgpt: 34, gemini: 30, perplexity: 27, claude: 25 },
  { month: "May", yourBrand: 35, chatgpt: 36, gemini: 32, perplexity: 28, claude: 27 },
  { month: "Jun", yourBrand: 36, chatgpt: 38, gemini: 33, perplexity: 30, claude: 28 },
  { month: "Jul", yourBrand: 38, chatgpt: 40, gemini: 34, perplexity: 31, claude: 30 },
  { month: "Aug", yourBrand: 40, chatgpt: 42, gemini: 36, perplexity: 33, claude: 32 },
  { month: "Sep", yourBrand: 42, chatgpt: 44, gemini: 37, perplexity: 34, claude: 34 },
  { month: "Oct", yourBrand: 48, chatgpt: 50, gemini: 40, perplexity: 36, claude: 38 },
  { month: "Nov", yourBrand: 52, chatgpt: 54, gemini: 42, perplexity: 38, claude: 42 },
  { month: "Dec", yourBrand: 58, chatgpt: 55, gemini: 44, perplexity: 40, claude: 55 },
];

/* ─── Per-platform competition line chart data ─── */
const competitorLineDataByPlatform: Record<string, { month: string; aspen: number; apex: number; rapid: number; citywide: number; horizon: number }[]> = {
  ChatGPT: [
    { month: "Jan\n2023", aspen: 72, apex: 50, rapid: 55, citywide: 38, horizon: 80 },
    { month: "Feb", aspen: 68, apex: 52, rapid: 58, citywide: 42, horizon: 75 },
    { month: "Mar", aspen: 75, apex: 48, rapid: 52, citywide: 45, horizon: 72 },
    { month: "Apr", aspen: 70, apex: 55, rapid: 50, citywide: 40, horizon: 78 },
    { month: "May", aspen: 72, apex: 50, rapid: 55, citywide: 48, horizon: 70 },
    { month: "Jun", aspen: 78, apex: 52, rapid: 48, citywide: 42, horizon: 75 },
    { month: "Jul", aspen: 75, apex: 48, rapid: 52, citywide: 45, horizon: 72 },
    { month: "Aug", aspen: 80, apex: 55, rapid: 50, citywide: 40, horizon: 68 },
    { month: "Sep", aspen: 78, apex: 52, rapid: 55, citywide: 48, horizon: 72 },
    { month: "Oct", aspen: 82, apex: 50, rapid: 48, citywide: 42, horizon: 75 },
    { month: "Nov", aspen: 80, apex: 55, rapid: 52, citywide: 45, horizon: 70 },
    { month: "Dec", aspen: 85, apex: 48, rapid: 50, citywide: 40, horizon: 72 },
  ],
  Gemini: [
    { month: "Jan\n2023", aspen: 40, apex: 62, rapid: 45, citywide: 70, horizon: 55 },
    { month: "Feb", aspen: 38, apex: 65, rapid: 48, citywide: 68, horizon: 58 },
    { month: "Mar", aspen: 42, apex: 60, rapid: 50, citywide: 72, horizon: 52 },
    { month: "Apr", aspen: 45, apex: 58, rapid: 52, citywide: 75, horizon: 50 },
    { month: "May", aspen: 43, apex: 62, rapid: 48, citywide: 70, horizon: 55 },
    { month: "Jun", aspen: 48, apex: 65, rapid: 45, citywide: 68, horizon: 58 },
    { month: "Jul", aspen: 50, apex: 60, rapid: 50, citywide: 72, horizon: 52 },
    { month: "Aug", aspen: 45, apex: 58, rapid: 52, citywide: 75, horizon: 50 },
    { month: "Sep", aspen: 48, apex: 62, rapid: 48, citywide: 70, horizon: 55 },
    { month: "Oct", aspen: 52, apex: 65, rapid: 45, citywide: 68, horizon: 58 },
    { month: "Nov", aspen: 50, apex: 60, rapid: 50, citywide: 72, horizon: 52 },
    { month: "Dec", aspen: 55, apex: 58, rapid: 52, citywide: 75, horizon: 50 },
  ],
  Perplexity: [
    { month: "Jan\n2023", aspen: 65, apex: 45, rapid: 70, citywide: 50, horizon: 60 },
    { month: "Feb", aspen: 62, apex: 48, rapid: 68, citywide: 52, horizon: 58 },
    { month: "Mar", aspen: 68, apex: 42, rapid: 72, citywide: 48, horizon: 62 },
    { month: "Apr", aspen: 70, apex: 50, rapid: 65, citywide: 55, horizon: 60 },
    { month: "May", aspen: 65, apex: 48, rapid: 70, citywide: 52, horizon: 58 },
    { month: "Jun", aspen: 72, apex: 45, rapid: 68, citywide: 50, horizon: 62 },
    { month: "Jul", aspen: 68, apex: 42, rapid: 72, citywide: 48, horizon: 60 },
    { month: "Aug", aspen: 75, apex: 50, rapid: 65, citywide: 55, horizon: 58 },
    { month: "Sep", aspen: 72, apex: 48, rapid: 70, citywide: 52, horizon: 62 },
    { month: "Oct", aspen: 78, apex: 45, rapid: 68, citywide: 50, horizon: 60 },
    { month: "Nov", aspen: 75, apex: 42, rapid: 72, citywide: 48, horizon: 58 },
    { month: "Dec", aspen: 80, apex: 50, rapid: 65, citywide: 55, horizon: 62 },
  ],
};
competitorLineDataByPlatform["Google AI Mode"] = competitorLineDataByPlatform.ChatGPT.map(d => ({
  ...d, aspen: d.aspen - 5, apex: d.apex + 8, rapid: d.rapid + 3, citywide: d.citywide + 10, horizon: d.horizon - 8,
}));
competitorLineDataByPlatform["Google AI Overviews"] = competitorLineDataByPlatform.Gemini.map(d => ({
  ...d, aspen: d.aspen + 10, apex: d.apex - 5, rapid: d.rapid + 5, citywide: d.citywide - 8, horizon: d.horizon + 5,
}));
competitorLineDataByPlatform["All sites"] = competitorLineDataByPlatform.ChatGPT;

/* ─── Per-platform competitor table data ─── */
const competitorTableByPlatform: Record<string, { name: string; isYou: boolean; score: string; change: string }[]> = {
  ChatGPT: [
    { name: "Aspen Dental", isYou: true, score: "61%", change: "+1.3%" },
    { name: "Apex Urgent Health", isYou: false, score: "34%", change: "+0.7%" },
    { name: "Rapid Response Medical Clinic", isYou: false, score: "38%", change: "+1.6%" },
    { name: "Citywide Emergency Health Services", isYou: false, score: "77.8%", change: "-1.3%" },
    { name: "Horizon 24/7 Care", isYou: false, score: "59.6%", change: "+1.8%" },
  ],
  Gemini: [
    { name: "Aspen Dental", isYou: true, score: "22%", change: "-2.1%" },
    { name: "Apex Urgent Health", isYou: false, score: "58%", change: "+3.2%" },
    { name: "Rapid Response Medical Clinic", isYou: false, score: "42%", change: "+0.9%" },
    { name: "Citywide Emergency Health Services", isYou: false, score: "68%", change: "+1.5%" },
    { name: "Horizon 24/7 Care", isYou: false, score: "50%", change: "-0.4%" },
  ],
  Perplexity: [
    { name: "Aspen Dental", isYou: true, score: "67%", change: "+4.2%" },
    { name: "Apex Urgent Health", isYou: false, score: "41%", change: "-1.3%" },
    { name: "Rapid Response Medical Clinic", isYou: false, score: "55%", change: "+2.8%" },
    { name: "Citywide Emergency Health Services", isYou: false, score: "48%", change: "+0.6%" },
    { name: "Horizon 24/7 Care", isYou: false, score: "62%", change: "+1.1%" },
  ],
};
competitorTableByPlatform["Google AI Mode"] = competitorTableByPlatform.ChatGPT.map(r => ({
  ...r, score: `${Math.max(10, parseInt(r.score) - 8)}%`, change: r.change,
}));
competitorTableByPlatform["Google AI Overviews"] = competitorTableByPlatform.Gemini.map(r => ({
  ...r, score: `${Math.min(95, parseInt(r.score) + 5)}%`, change: r.change,
}));
competitorTableByPlatform["All sites"] = competitorTableByPlatform.ChatGPT;

/* ─── Ranking themes data ─── */
const rankingThemes = [
  { theme: "Best dentist", badge: "Leader" as const, badgeColor: "#4cae3d", subThemes: [
    { theme: "Top 5 dentist near me", badge: "Needs action" as const, badgeColor: "#de1b0c" },
    { theme: "Best dentist for teeth cleaning", badge: null, badgeColor: null },
    { theme: "Best kids dentist near me", badge: null, badgeColor: null },
  ]},
  { theme: "Root canal", badge: null, badgeColor: null, subThemes: [] },
  { theme: "Dental crown", badge: null, badgeColor: null, subThemes: [] },
  { theme: "Sensitive teeth", badge: null, badgeColor: null, subThemes: [] },
  { theme: "Local dentist", badge: null, badgeColor: null, subThemes: [] },
  { theme: "Chipped tooth", badge: null, badgeColor: null, subThemes: [] },
  { theme: "Oral surgery", badge: null, badgeColor: null, subThemes: [] },
];

/* ─── Per-platform ranking orders (indices into rankColors for each of 5 brand columns) ─── */
const rankColors = ["#0f7195", "#6665DD", "#DB61DB", "#FBC123", "#FF6A4D"];
const rankingOrderByPlatform: Record<string, number[][]> = {
  ChatGPT: [[1,3,2,5,4],[2,1,4,3,5],[3,2,1,5,4],[1,4,3,2,5],[2,5,1,3,4],[4,1,3,2,5],[3,2,5,1,4]],
  Gemini:  [[3,1,4,2,5],[5,2,1,3,4],[2,4,3,1,5],[4,3,2,5,1],[1,5,4,2,3],[3,2,1,4,5],[5,1,3,2,4]],
  Perplexity:[[1,2,5,3,4],[3,4,1,2,5],[2,1,3,5,4],[4,5,2,1,3],[1,3,4,2,5],[5,2,3,4,1],[2,1,4,3,5]],
};
rankingOrderByPlatform["Google AI Mode"] = rankingOrderByPlatform.ChatGPT;
rankingOrderByPlatform["Google AI Overviews"] = rankingOrderByPlatform.Gemini;
rankingOrderByPlatform["All sites"] = rankingOrderByPlatform.ChatGPT;

const rankingBrands = [
  { rank: "#1", isYou: true },
  { rank: "#2", isYou: false },
  { rank: "#3", isYou: false },
  { rank: "#4", isYou: false },
  { rank: "#5", isYou: false },
];

/* ─── Share of voice per platform ─── */
const shareOfVoiceByPlatform: Record<string, { donut: { name: string; value: number; color: string }[]; table: { name: string; isYou: boolean; pct: string; count: string }[] }> = {
  ChatGPT: {
    donut: [
      { name: "Aspen Dental", value: 30, color: "#0099FF" },
      { name: "Apex Urgent Health", value: 18, color: "#6665DD" },
      { name: "Rapid Response", value: 22, color: "#DB61DB" },
      { name: "Citywide Emergency", value: 15, color: "#FBC123" },
      { name: "Horizon 24/7", value: 15, color: "#FF6A4D" },
    ],
    table: [
      { name: "Aspen Dental", isYou: true, pct: "30%", count: "210" },
      { name: "Rapid Response Medical Clinic", isYou: false, pct: "22%", count: "178" },
      { name: "Apex Urgent Health", isYou: false, pct: "18%", count: "156" },
      { name: "Citywide Emergency Health Services", isYou: false, pct: "15%", count: "143" },
      { name: "Horizon 24/7 Care", isYou: false, pct: "15%", count: "98" },
    ],
  },
  Gemini: {
    donut: [
      { name: "Aspen Dental", value: 15, color: "#0099FF" },
      { name: "Apex Urgent Health", value: 25, color: "#6665DD" },
      { name: "Rapid Response", value: 20, color: "#DB61DB" },
      { name: "Citywide Emergency", value: 28, color: "#FBC123" },
      { name: "Horizon 24/7", value: 12, color: "#FF6A4D" },
    ],
    table: [
      { name: "Citywide Emergency Health Services", isYou: false, pct: "28%", count: "245" },
      { name: "Apex Urgent Health", isYou: false, pct: "25%", count: "218" },
      { name: "Rapid Response Medical Clinic", isYou: false, pct: "20%", count: "175" },
      { name: "Aspen Dental", isYou: true, pct: "15%", count: "131" },
      { name: "Horizon 24/7 Care", isYou: false, pct: "12%", count: "105" },
    ],
  },
  Perplexity: {
    donut: [
      { name: "Aspen Dental", value: 35, color: "#0099FF" },
      { name: "Apex Urgent Health", value: 15, color: "#6665DD" },
      { name: "Rapid Response", value: 18, color: "#DB61DB" },
      { name: "Citywide Emergency", value: 12, color: "#FBC123" },
      { name: "Horizon 24/7", value: 20, color: "#FF6A4D" },
    ],
    table: [
      { name: "Aspen Dental", isYou: true, pct: "35%", count: "287" },
      { name: "Horizon 24/7 Care", isYou: false, pct: "20%", count: "164" },
      { name: "Rapid Response Medical Clinic", isYou: false, pct: "18%", count: "148" },
      { name: "Apex Urgent Health", isYou: false, pct: "15%", count: "123" },
      { name: "Citywide Emergency Health Services", isYou: false, pct: "12%", count: "98" },
    ],
  },
};
shareOfVoiceByPlatform["Google AI Mode"] = shareOfVoiceByPlatform.ChatGPT;
shareOfVoiceByPlatform["Google AI Overviews"] = shareOfVoiceByPlatform.Gemini;
shareOfVoiceByPlatform["All sites"] = shareOfVoiceByPlatform.ChatGPT;

const themesTableData = [
  { theme: "Best dentist", visibility: 72, visChange: "+7%", citations: "53.4K", citChange: "+2.3K", rankings: 1, rankChange: "+1", sentiment: "71%", sentChange: "+4%" },
  { theme: "Root canal", visibility: 65, visChange: "+4%", citations: "40.2K", citChange: "+1.1K", rankings: 2, rankChange: "0", sentiment: "65%", sentChange: "+2%" },
  { theme: "Dental crown", visibility: 58, visChange: "+3%", citations: "35.8K", citChange: "+0.8K", rankings: 3, rankChange: "-1", sentiment: "68%", sentChange: "+1%" },
  { theme: "Sensitive teeth", visibility: 52, visChange: "+5%", citations: "28.1K", citChange: "+1.5K", rankings: 4, rankChange: "+2", sentiment: "72%", sentChange: "+3%" },
  { theme: "Local dentist", visibility: 48, visChange: "+2%", citations: "22.4K", citChange: "+0.6K", rankings: 5, rankChange: "0", sentiment: "60%", sentChange: "+1%" },
  { theme: "Chipped tooth", visibility: 42, visChange: "+1%", citations: "18.6K", citChange: "+0.3K", rankings: 6, rankChange: "-2", sentiment: "55%", sentChange: "-1%" },
  { theme: "Oral surgery", visibility: 38, visChange: "+6%", citations: "15.2K", citChange: "+1.8K", rankings: 7, rankChange: "+1", sentiment: "58%", sentChange: "+2%" },
];

const lineColors = [
  { key: "yourBrand", color: "#0099FF", label: "Overall" },
  { key: "chatgpt", color: "#6665DD", label: "ChatGPT" },
  { key: "gemini", color: "#DB61DB", label: "Gemini" },
  { key: "perplexity", color: "#FBC123", label: "Perplexity" },
  { key: "claude", color: "#7ED321", label: "Claude" },
];

const competitorLineColors = [
  { key: "aspen", color: "#0F7195", label: "Aspen Dental" },
  { key: "apex", color: "#6665DD", label: "Apex Urgent Health" },
  { key: "rapid", color: "#DB61DB", label: "Rapid Response" },
  { key: "citywide", color: "#FBC123", label: "Citywide Emergency" },
  { key: "horizon", color: "#FF6A4D", label: "Horizon 24/7" },
];

/* ─── Per-platform map bubbles ─── */
const mapBubblesByPlatform: Record<string, { x: number; y: number; size: number; value: number | null; color: string }[]> = {
  ChatGPT: [
    { x: 66, y: 27, size: 80, value: 10, color: "#1976d2" },
    { x: 70, y: 50, size: 48, value: 7, color: "#5ba4ec" },
    { x: 60, y: 20, size: 48, value: 6, color: "#5ba4ec" },
    { x: 66, y: 13, size: 48, value: 6, color: "#5ba4ec" },
    { x: 67, y: 47, size: 24, value: null, color: "#a4ccf4" },
    { x: 64, y: 10, size: 24, value: null, color: "#a4ccf4" },
    { x: 67, y: 58, size: 24, value: null, color: "#1565b4" },
  ],
  Gemini: [
    { x: 50, y: 35, size: 60, value: 5, color: "#1976d2" },
    { x: 62, y: 22, size: 48, value: 4, color: "#5ba4ec" },
    { x: 72, y: 45, size: 36, value: 3, color: "#5ba4ec" },
    { x: 55, y: 55, size: 24, value: null, color: "#a4ccf4" },
    { x: 68, y: 15, size: 24, value: null, color: "#a4ccf4" },
  ],
  Perplexity: [
    { x: 68, y: 30, size: 72, value: 9, color: "#1976d2" },
    { x: 58, y: 18, size: 56, value: 7, color: "#5ba4ec" },
    { x: 72, y: 48, size: 48, value: 5, color: "#5ba4ec" },
    { x: 65, y: 12, size: 36, value: 4, color: "#5ba4ec" },
    { x: 60, y: 42, size: 24, value: null, color: "#a4ccf4" },
    { x: 75, y: 55, size: 24, value: null, color: "#1565b4" },
  ],
};
mapBubblesByPlatform["Google AI Mode"] = mapBubblesByPlatform.ChatGPT;
mapBubblesByPlatform["Google AI Overviews"] = mapBubblesByPlatform.Gemini;
mapBubblesByPlatform["All sites"] = mapBubblesByPlatform.ChatGPT;

/* ─── Reusable: Card ─── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] transition-colors w-full min-w-0 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Reusable: Card Header ─── */
function CardHeader({ title, subtitle, actions }: { title: React.ReactNode; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-5 py-3 sm:py-4 gap-2 sm:gap-4">
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[18px] text-[#555] dark:text-[#8b92a5] tracking-[-0.36px]" style={{ fontWeight: 400 }}>{title}</span>
        </div>
        {subtitle && (
          <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">{subtitle}</span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0 flex-wrap">{actions}</div>}
    </div>
  );
}

/* ─── Reusable: Icon Button ─── */
function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="outline" size="icon" className="shrink-0">
      {children}
    </Button>
  );
}

/* ─── Reusable: Dropdown Button ─── */
function DropdownBtn({ label }: { label: string }) {
  return (
    <Button variant="outline" className="gap-2 shrink-0">
      <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.28px]" style={{ fontWeight: 400 }}>{label}</span>
      <ChevronDown className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" />
    </Button>
  );
}

/* ─── Reusable: AI Summarize Button ─── */
function SummarizeBtn() {
  return (
    <Button variant="outline" size="icon" className="relative shrink-0">
      <svg className="w-[14px] h-[14px]" viewBox="0 0 16 16" fill="none">
        <path d="M5.27 1.34C5.86.49 6.2.15 6.6.04a1 1 0 0 1 .52 0c.4.11.73.45 1.32 1.3l.26.37c.18.26.27.39.4.47a1 1 0 0 0 .26.1c.14.04.3.02.6-.02l.42-.06c1-.14 1.51-.21 1.87-.04a1 1 0 0 1 .38.33c.18.34.14.85-.02 1.85l-.08.42c-.05.3-.08.46-.05.6a1 1 0 0 0 .1.25c.09.13.22.22.48.4l.37.26c.85.59 1.28.88 1.39 1.28a1 1 0 0 1 0 .53c-.11.4-.54.7-1.39 1.28l-.37.26c-.26.18-.39.27-.48.4a1 1 0 0 0-.1.25c-.03.15 0 .3.05.6l.08.43c.16 1 .2 1.5.02 1.85a1 1 0 0 1-.38.32c-.36.18-.87.1-1.87-.04l-.42-.05c-.3-.04-.46-.06-.6-.03a1 1 0 0 0-.26.1c-.13.09-.22.22-.4.48l-.26.37c-.6.85-.93 1.28-1.32 1.39a1 1 0 0 1-.52 0c-.4-.1-.74-.54-1.33-1.39l-.26-.37c-.18-.26-.27-.4-.4-.48a1 1 0 0 0-.26-.1c-.14-.03-.3-.01-.6.03l-.42.05c-1 .14-1.5.22-1.87.04a1 1 0 0 1-.38-.32c-.18-.35-.14-.85.02-1.85l.08-.43c.05-.3.08-.45.05-.6a1 1 0 0 0-.1-.25c-.09-.13-.22-.22-.48-.4l-.37-.26C.49 8.47.06 8.18-.05 7.78a1 1 0 0 1 0-.53C.06 6.85.49 6.56 1.34 5.97l.37-.26c.26-.18.39-.27.48-.4a1 1 0 0 0 .1-.26c.03-.14 0-.3-.05-.6l-.08-.42c-.16-1-.2-1.5-.02-1.85a1 1 0 0 1 .38-.33c.36-.17.87-.1 1.87.04l.42.06c.3.04.46.06.6.03a1 1 0 0 0 .26-.11c.13-.08.22-.21.4-.47z" fill="#6834B7" />
      </svg>
    </Button>
  );
}

/* ─── Reusable: Toggle (By locations / By brand) ─── */
function Toggle({ options, active, onChange }: { options: string[]; active: string; onChange: (v: string) => void }) {
  return (
    <div className="h-[var(--button-height)] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] flex items-center gap-2 p-2 shrink-0">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`h-[24px] px-2 rounded-[4px] text-[14px] tracking-[-0.28px] transition-colors ${
            active === opt
              ? "bg-[#e5e9f0] dark:bg-[#333a47] text-[#212121] dark:text-[#e4e4e4]"
              : "text-[#212121] dark:text-[#e4e4e4]"
          }`}
          style={{ fontWeight: 400 }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─── Reusable: Platform Tab Row ─── */
function PlatformTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  return (
    <div className="flex items-start px-4 sm:px-6 border-b border-[#eaeaea] dark:border-[#333a47] overflow-x-auto scrollbar-none">
      {platformTabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="flex flex-col items-start gap-1 px-2 pb-0 transition-colors shrink-0"
        >
          <span
            className={`h-[32px] flex items-center justify-center px-2 rounded-[4px] text-[14px] tracking-[-0.28px] whitespace-nowrap ${
              activeTab === tab ? "text-[#2552ED] dark:text-[#6b9bff]" : "text-[#555] dark:text-[#8b92a5]"
            }`}
            style={{ fontWeight: 400 }}
          >
            {tab}
          </span>
          <div className={`h-[1px] w-full ${activeTab === tab ? "bg-[#2552ED] dark:bg-[#6b9bff]" : "bg-transparent"}`} />
        </button>
      ))}
    </div>
  );
}

/* ─── Reusable: Legend Dash+Circle ─── */
function LegendItem({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1 px-2 shrink-0">
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <line x1="0" y1="6" x2="16" y2="6" stroke={color} strokeWidth="2" strokeDasharray={dashed ? "4 4" : "0"} />
        <circle cx="8" cy="6" r="3.5" fill={color} stroke={color} />
      </svg>
      <span className="text-[12px] text-[#555] dark:text-[#8b92a5] tracking-[-0.24px] whitespace-nowrap" style={{ fontWeight: 400 }}>{label}</span>
    </div>
  );
}

/* ─── Custom Tooltip ─── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white dark:bg-[#22262f] border border-[#e5e9f0] dark:border-[#333a47] rounded-[4px] shadow-[0px_10px_24px_rgba(33,33,33,0.2)] min-w-[200px]">
      <div className="px-4 pt-4 pb-2">
        <p className="text-[12px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.24px]" style={{ fontWeight: 400 }}>{label}</p>
      </div>
      <div className="px-4 pb-4 flex flex-col gap-1">
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-[12px] text-[#555] dark:text-[#8b92a5] whitespace-nowrap">{entry.name}</span>
            </div>
            <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── You Badge ─── */
function YouBadge({ small }: { small?: boolean }) {
  return (
    <span className={`bg-[#0f7195] text-white border border-white rounded-full flex items-center justify-center shrink-0 ${small ? "px-2 py-0.5 text-[12px]" : "px-[10px] py-[3px] text-[14px] tracking-[-0.28px]"}`} style={{ fontWeight: 400 }}>
      You
    </span>
  );
}

/* ═══════════════════════════════════════════
   Main Search AI View
   ═══════════════════════════════════════════ */
export function SearchAIView() {
  const [toggleView, setToggleView] = useState("By brand");
  const [mapTab, setMapTab] = useState<PlatformTab>("ChatGPT");
  const [compTab, setCompTab] = useState<PlatformTab>("ChatGPT");
  const [rankTab, setRankTab] = useState<PlatformTab>("ChatGPT");
  const [sovTab, setSovTab] = useState<PlatformTab>("ChatGPT");
  const [expandedThemes, setExpandedThemes] = useState<string[]>(["Best dentist"]);

  const toggleTheme = (t: string) => {
    setExpandedThemes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  /* Derived data per active tab */
  const compData = useMemo(() => competitorLineDataByPlatform[compTab] || competitorLineDataByPlatform.ChatGPT, [compTab]);
  const compTable = useMemo(() => competitorTableByPlatform[compTab] || competitorTableByPlatform.ChatGPT, [compTab]);
  const mapBubbles = useMemo(() => mapBubblesByPlatform[mapTab] || mapBubblesByPlatform.ChatGPT, [mapTab]);
  const rankOrders = useMemo(() => rankingOrderByPlatform[rankTab] || rankingOrderByPlatform.ChatGPT, [rankTab]);
  const sovData = useMemo(() => shareOfVoiceByPlatform[sovTab] || shareOfVoiceByPlatform.ChatGPT, [sovTab]);

  return (
    <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden bg-white dark:bg-[#1e2229] transition-colors duration-300">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0 gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[18px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.36px]" style={{ fontWeight: 400 }}>Visibility</span>
          <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">See how frequently your brand is mentioned in AI-generated answers compared to competitors</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <DropdownBtn label="Dec 2026" />
          <Toggle options={["By locations", "By brand"]} active={toggleView} onChange={setToggleView} />
          <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
          <IconBtn><Filter className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 pb-8 pt-4 sm:pt-6 min-w-0">
        <div className="flex flex-col gap-6 w-full max-w-[1130px]">

          {/* ── 1. Summary Card ── */}
          <Card>
            <CardHeader
              title="Summary"
              subtitle="Percentage of AI responses that mention your brand"
              actions={<IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>}
            />
            <div className="px-4 sm:px-5 pb-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
                {summaryMetrics.map(m => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[30px] text-[#222] dark:text-[#e4e4e4] leading-[42px]" style={{ fontWeight: 400 }}>{m.value}</span>
                      <div className="flex flex-col h-[32px] justify-end">
                        <span className={`text-[12px] leading-[18px] ${m.positive ? "text-[#377e2c]" : "text-[#de1b0c]"}`}>{m.change}</span>
                      </div>
                    </div>
                    <span className="text-[16px] text-[#555] dark:text-[#8b92a5] leading-[24px]" style={{ fontWeight: 400 }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* ── 2. Visibility Over Time Area Chart ── */}
          <Card>
            <CardHeader
              title={
                <span>
                  How frequently is your business visible on AI sites for{" "}
                  <button className="text-[#1976d2] inline-flex items-center gap-0.5">
                    all themes <ChevronDown className="w-4 h-4" />
                  </button>
                </span>
              }
              subtitle="Shows how often your brand appears in AI-generated answers across AI sites"
              actions={
                <div className="flex items-center gap-2">
                  <DropdownBtn label="Last 12 months" />
                  <SummarizeBtn />
                  <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
                </div>
              }
            />
            <div className="px-4 sm:px-5 pb-5 w-full min-w-0">
              <div className="w-full min-w-0" style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={visibilityOverTimeData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="#eaeaea" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} axisLine={{ stroke: "#eaeaea" }} tickLine={{ stroke: "#A3A3A3" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#555" }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="yourBrand" name="Overall" stroke="#0099FF" fill="#9ACEFF" fillOpacity={0.1} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="chatgpt" name="ChatGPT" stroke="#6665DD" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="gemini" name="Gemini" stroke="#DB61DB" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="perplexity" name="Perplexity" stroke="#FBC123" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="claude" name="Claude" stroke="#7ED321" fill="#C0EBA2" fillOpacity={0.05} strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
              </div>
              <div className="flex items-center mt-3 pl-5 flex-wrap">
                {lineColors.map(l => <LegendItem key={l.key} color={l.color} label={l.label} />)}
              </div>
            </div>
          </Card>

          {/* ── 3. Map Section ── */}
          <Card>
            <CardHeader
              title={
                <span>
                  How visible are you for{" "}
                  <button className="text-[#1976d2] inline-flex items-center gap-0.5">
                    all themes <ChevronDown className="w-4 h-4" />
                  </button>
                </span>
              }
              subtitle="Track how often and how prominently your locations appear in AI-generated answers across themes"
              actions={
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#303030] dark:text-[#8b92a5]" />
                  <DropdownBtn label="Last 12 months" />
                  <SummarizeBtn />
                  <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
                </div>
              }
            />
            <PlatformTabs activeTab={mapTab} onTabChange={t => setMapTab(t as PlatformTab)} />
            <div className="px-4 sm:px-5 pb-5 pt-4">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[490px] rounded-[12px] overflow-hidden bg-[#e8ece4] dark:bg-[#262b35]">
                <img src={imgMap} alt="Map" className="absolute inset-0 w-full h-full object-cover" />
                {mapBubbles.map((b, i) => (
                  <div
                    key={`${mapTab}-${i}`}
                    className="absolute flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      width: b.size,
                      height: b.size,
                      backgroundColor: b.color,
                      transform: "translate(-50%, -50%)",
                      boxShadow: b.size < 40 ? "0px 1px 2.5px rgba(33,33,33,0.1)" : undefined,
                    }}
                  >
                    {b.value && (
                      <span className={`text-white ${b.size >= 60 ? "text-[30px]" : "text-[18px]"}`} style={{ fontWeight: 400 }}>{b.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* ── 4. Competition Line Chart ── */}
          <Card>
            <CardHeader
              title={
                <span>
                  How visible are you across AI sites for{" "}
                  <button className="text-[#1976d2] inline-flex items-center gap-0.5">
                    all themes <ChevronDown className="w-4 h-4" />
                  </button>
                  {" "}relative to competitors
                </span>
              }
              subtitle="Your visibility relative to competitors"
              actions={
                <div className="flex items-center gap-2">
                  <DropdownBtn label="Last 12 months" />
                  <SummarizeBtn />
                  <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
                </div>
              }
            />
            <PlatformTabs activeTab={compTab} onTabChange={t => setCompTab(t as PlatformTab)} />
            <div className="px-4 sm:px-5 pb-0 pt-4 w-full min-w-0">
              <div className="w-full min-w-0" style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={compData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="#eaeaea" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} axisLine={{ stroke: "#eaeaea" }} tickLine={{ stroke: "#A3A3A3" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#555" }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<ChartTooltip />} />
                  {competitorLineColors.map(l => (
                    <Line
                      key={l.key}
                      type="monotone"
                      dataKey={l.key}
                      name={l.label}
                      stroke={l.color}
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray={l.key === "horizon" ? "4 4" : undefined}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              </div>
              <div className="flex items-center mt-3 pl-5 gap-1 flex-wrap">
                {competitorLineColors.map(l => (
                  <LegendItem key={l.key} color={l.color} label={l.label} dashed={l.key === "horizon"} />
                ))}
              </div>
            </div>
            {/* Competitor Table */}
            <div className="px-4 sm:px-5 pt-4 pb-5">
              <div className="overflow-x-auto">
                <div className="flex border-t border-[#eaeaea] dark:border-[#333a47] min-w-[400px]">
                  <div className="flex-1 min-w-[128px]">
                    <div className="h-[52px] flex items-center px-4 border-b border-[#e9e9eb] dark:border-[#333a47]">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-[12px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>Competitors</span>
                        <ChevronDown className="w-4 h-4 text-[#303030] dark:text-[#8b92a5]" />
                      </div>
                    </div>
                    {compTable.map(row => (
                      <div key={row.name} className={`h-[56px] flex items-center px-4 border-b border-[#eaeaea] dark:border-[#333a47] ${row.isYou ? "bg-[#f2f4f7] dark:bg-[#252a3a]" : ""}`}>
                        <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.28px] truncate" style={{ fontWeight: 400 }}>{row.name}</span>
                        {row.isYou && <span className="ml-2"><YouBadge small /></span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-[82px]">
                    <div className="h-[52px] flex items-center px-4 border-b border-[#e9e9eb] dark:border-[#333a47]">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Visibility score</span>
                        <ChevronUp className="w-4 h-4 text-[#303030] dark:text-[#8b92a5]" />
                      </div>
                    </div>
                    {compTable.map(row => (
                      <div key={row.name} className={`h-[56px] flex items-center gap-2 px-4 border-b border-[#eaeaea] dark:border-[#333a47] ${row.isYou ? "bg-[#f2f4f7] dark:bg-[#252a3a]" : ""}`}>
                        <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{row.score}</span>
                        <span className="text-[12px] text-[#999] dark:text-[#6b7280]">{row.change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* ── 5. Rankings Section ── */}
          <Card>
            <CardHeader
              title="How is your visibility ranking against your competitors"
              subtitle="Understand how your brand compares to competitors by theme and ranking position across AI platforms"
              actions={
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#555] dark:text-[#8b92a5]" />
                  <SummarizeBtn />
                  <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
                </div>
              }
            />
            <PlatformTabs activeTab={rankTab} onTabChange={t => setRankTab(t as PlatformTab)} />
            <div className="px-4 sm:px-5 pb-5 pt-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#e9e9eb] dark:border-[#333a47]">
                      <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-4 px-4 min-w-[300px]" style={{ fontWeight: 400 }}>
                        <div className="flex items-center gap-1">
                          Themes <ChevronDown className="w-4 h-4" />
                        </div>
                      </th>
                      {rankingBrands.map((b, i) => (
                        <th key={i} className="text-center py-4 px-3 min-w-[60px]">
                          <div className="flex items-center justify-center">
                            {b.isYou ? (
                              <YouBadge />
                            ) : (
                              <span className="bg-[#ecf5fd] dark:bg-[#252a3a] px-[9px] py-[3px] rounded-[20px] text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{b.rank}</span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rankingThemes.map((item, themeIdx) => (
                      <Fragment key={item.theme}>
                        <tr className="border-b border-[#eaeaea] dark:border-[#333a47] hover:bg-[#fafafa] dark:hover:bg-[#22262f] transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => item.subThemes.length > 0 && toggleTheme(item.theme)}>
                                {item.subThemes.length > 0 ? (
                                  expandedThemes.includes(item.theme)
                                    ? <ChevronUp className="w-4 h-4 text-[#303030] dark:text-[#8b92a5]" />
                                    : <ChevronDown className="w-4 h-4 text-[#303030] dark:text-[#8b92a5]" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-[#303030] dark:text-[#8b92a5]" />
                                )}
                              </button>
                              <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4] truncate" style={{ fontWeight: 400 }}>{item.theme}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-[4px] text-[12px] border shrink-0" style={{ fontWeight: 400, color: item.badgeColor!, borderColor: item.badgeColor! }}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </td>
                          {rankingBrands.map((_, i) => {
                            const order = rankOrders[themeIdx] || [1,2,3,4,5];
                            const rankNum = order[i];
                            return (
                              <td key={i} className="text-center py-4 px-3">
                                <div className="flex justify-center">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center`} style={{ backgroundColor: rankColors[i] }}>
                                    <span className="text-white text-[10px]" style={{ fontWeight: 400 }}>{rankNum}</span>
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                        {expandedThemes.includes(item.theme) && item.subThemes.map((sub, subIdx) => {
                          /* Sub-theme gets offset ranking numbers */
                          const parentOrder = rankOrders[themeIdx] || [1,2,3,4,5];
                          const subOrder = parentOrder.map(v => Math.min(5, v + subIdx));
                          return (
                            <tr key={sub.theme} className="border-b border-[#eaeaea] dark:border-[#333a47] bg-[#fafafa] dark:bg-[#1a1d24]">
                              <td className="py-4 px-4 pl-12">
                                <div className="flex items-center gap-2">
                                  <ChevronDown className="w-4 h-4 text-[#303030] dark:text-[#8b92a5]" />
                                  <span className="text-[14px] text-[#555] dark:text-[#9ba2b0] truncate tracking-[-0.28px]" style={{ fontWeight: 400 }}>{sub.theme}</span>
                                  {sub.badge && (
                                    <span className="px-2 py-0.5 rounded-[4px] text-[12px] border shrink-0" style={{ fontWeight: 400, color: sub.badgeColor!, borderColor: sub.badgeColor! }}>
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                              </td>
                              {rankingBrands.map((_, i) => (
                                <td key={i} className="text-center py-4 px-3">
                                  <div className="flex justify-center">
                                    <div className="w-6 h-6 rounded-full opacity-60 flex items-center justify-center" style={{ backgroundColor: rankColors[i] }}>
                                      <span className="text-white text-[10px]" style={{ fontWeight: 400 }}>{subOrder[i]}</span>
                                    </div>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* ── 6. Share of Voice ── */}
          <Card>
            <CardHeader
              title="What are your share of voice compared to your competitors"
              subtitle="Your brand's proportion of AI mentions relative to competitors"
              actions={
                <div className="flex items-center gap-2">
                  <SummarizeBtn />
                  <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
                </div>
              }
            />
            <PlatformTabs activeTab={sovTab} onTabChange={t => setSovTab(t as PlatformTab)} />
            <div className="px-4 sm:px-5 pb-5 pt-4">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                <div className="shrink-0">
                  <PieChart width={280} height={280}>
                    <Pie
                      data={sovData.donut}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      dataKey="value"
                      stroke="none"
                      paddingAngle={2}
                    >
                      {sovData.donut.map((entry, idx) => (
                        <Cell key={`${sovTab}-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                {/* Share of Voice Table */}
                <div className="flex-1 w-full min-w-0 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#e9e9eb] dark:border-[#333a47]">
                        <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3 pr-4" style={{ fontWeight: 400 }}>Competitor</th>
                        <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3 pr-4" style={{ fontWeight: 400 }}>Share %</th>
                        <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3" style={{ fontWeight: 400 }}>No. of AI mentions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sovData.table.map(row => (
                        <tr key={row.name} className="border-b border-[#eaeaea] dark:border-[#333a47] last:border-0">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{row.name}</span>
                              {row.isYou && <YouBadge small />}
                            </div>
                          </td>
                          <td className="text-[13px] text-[#212121] dark:text-[#e4e4e4] py-3 pr-4" style={{ fontWeight: 400 }}>{row.pct}</td>
                          <td className="text-[13px] text-[#212121] dark:text-[#e4e4e4] py-3" style={{ fontWeight: 400 }}>{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          {/* ── 7. Themes Table ── */}
          <Card>
            <CardHeader
              title="Which themes have the strongest visibility"
              subtitle="Performance breakdown by topic categories"
              actions={
                <div className="flex items-center gap-2">
                  <DropdownBtn label="Last 12 months" />
                  <SummarizeBtn />
                  <IconBtn><MoreVertical className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" /></IconBtn>
                </div>
              }
            />
            <div className="px-4 sm:px-5 pb-5">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#e9e9eb] dark:border-[#333a47]">
                      <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3 pr-4" style={{ fontWeight: 400 }}>Theme</th>
                      <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3 pr-4" style={{ fontWeight: 400 }}>
                        <div className="flex items-center gap-1">Visibility (%)<ChevronDown className="w-3 h-3" /></div>
                      </th>
                      <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3 pr-4" style={{ fontWeight: 400 }}>Citations</th>
                      <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3 pr-4" style={{ fontWeight: 400 }}>Rankings</th>
                      <th className="text-left text-[12px] text-[#555] dark:text-[#8b92a5] py-3" style={{ fontWeight: 400 }}>Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {themesTableData.map(row => (
                      <tr key={row.theme} className="border-b border-[#eaeaea] dark:border-[#333a47] last:border-0">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <ChevronDown className="w-4 h-4 text-[#303030] dark:text-[#8b92a5] shrink-0" />
                            <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4] whitespace-nowrap" style={{ fontWeight: 400 }}>{row.theme}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-[80px] h-[6px] bg-[#eaeaea] dark:bg-[#333a47] rounded-full overflow-hidden shrink-0">
                              <div className="h-full bg-[#0099FF] rounded-full" style={{ width: `${row.visibility}%` }} />
                            </div>
                            <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4] whitespace-nowrap" style={{ fontWeight: 400 }}>{row.visibility}%</span>
                            <span className="text-[12px] text-[#999] dark:text-[#6b7280] whitespace-nowrap">{row.visChange}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4] whitespace-nowrap" style={{ fontWeight: 400 }}>{row.citations}</span>
                            <span className="text-[12px] text-[#999] dark:text-[#6b7280] whitespace-nowrap">{row.citChange}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4] whitespace-nowrap" style={{ fontWeight: 400 }}>#{row.rankings}</span>
                            <span className="text-[12px] text-[#999] dark:text-[#6b7280] whitespace-nowrap">{row.rankChange}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4] whitespace-nowrap" style={{ fontWeight: 400 }}>{row.sentiment}</span>
                            <span className="text-[12px] text-[#999] dark:text-[#6b7280] whitespace-nowrap">{row.sentChange}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
