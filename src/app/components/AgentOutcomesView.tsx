import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Info,
  Sliders,
  TrendingUp,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OutcomeAgent {
  id: string;
  name: string;
  status: "Running" | "Paused" | "Draft";
}

interface LocationOutcome {
  location: string;
  reviewsResponded: number;
  responseRate: number;
  avgResponseTime: string;
  timeSaved: string;
}

interface AgentOutcomesViewProps {
  agent: OutcomeAgent;
  onBack: () => void;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const LOCATION_OUTCOMES: LocationOutcome[] = [
  { location: "Atlanta, GA", reviewsResponded: 19, responseRate: 90, avgResponseTime: "1h 48m", timeSaved: "4h 20m" },
  { location: "Stamford, CT", reviewsResponded: 9, responseRate: 92, avgResponseTime: "2h 05m", timeSaved: "2h 10m" },
  { location: "Los Angeles, CA", reviewsResponded: 22, responseRate: 90, avgResponseTime: "2h 22m", timeSaved: "2h 05m" },
  { location: "New York City, NY", reviewsResponded: 18, responseRate: 90, avgResponseTime: "2h 10m", timeSaved: "2h 40m" },
  { location: "San Diego, CA", reviewsResponded: 7, responseRate: 95, avgResponseTime: "2h 40m", timeSaved: "3h 05m" },
  { location: "Las Vegas, NV", reviewsResponded: 3, responseRate: 88, avgResponseTime: "3h 05m", timeSaved: "2h 10m" },
  { location: "Chicago, IL", reviewsResponded: 10, responseRate: 91, avgResponseTime: "3h 05m", timeSaved: "3h 05m" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type SortKey =
  | "location"
  | "reviewsResponded"
  | "responseRate"
  | "avgResponseTime"
  | "timeSaved";

function timeToMinutes(value: string): number {
  const hours = /([0-9]+)h/.exec(value);
  const minutes = /([0-9]+)m/.exec(value);
  return (hours ? parseInt(hours[1], 10) * 60 : 0) + (minutes ? parseInt(minutes[1], 10) : 0);
}

function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function StatusChip({ status }: { status: OutcomeAgent["status"] }) {
  const styles: Record<OutcomeAgent["status"], string> = {
    Running:
      "bg-[#f1faf0] text-[#377e2c] dark:bg-[#1f3a20] dark:text-[#86e08e]",
    Paused:
      "bg-[#fef3c7] text-[#92400e] dark:bg-[#3a2a12] dark:text-[#fbbf24]",
    Draft:
      "bg-[#f3f4f6] text-[#555] dark:bg-[#252b35] dark:text-[#9ba2b0]",
  };
  return (
    <span className={`inline-flex items-center rounded-[4px] px-2 py-1 text-[12px] leading-[18px] tracking-[-0.24px] ${styles[status]}`}>
      {status}
    </span>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
  customize?: boolean;
}

function MetricCard({ label, value, trend, positive = true, customize = false }: MetricCardProps) {
  return (
    <div className="relative flex flex-col items-start gap-1 rounded-[8px] border border-[#eaeaea] bg-white px-5 py-7 dark:border-[#252b35] dark:bg-[#1e2229]">
      <div className="flex items-baseline gap-2">
        <span className="text-[26px] leading-9 tracking-[-0.48px] text-[#212121] dark:text-[#f3f4f6]">
          {value}
        </span>
        <span
          className={`flex items-center gap-0.5 text-[12px] leading-[18px] ${
            positive ? "text-[#4eac5d]" : "text-[#e53e3e]"
          }`}
        >
          <TrendingUp className="h-3 w-3" />
          {trend}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[14px] leading-5 tracking-[-0.28px] text-[#555] dark:text-[#9ba2b0]">
          {label}
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-[#9ba2b0] transition-colors hover:text-[#555] dark:hover:text-[#e4e4e4]"
              aria-label={`About ${label}`}
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      </div>
      {customize && (
        <button
          type="button"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#eaeaea] bg-white text-[#555] transition-colors hover:bg-[#f8f9fb] dark:border-[#252b35] dark:bg-[#1e2229] dark:text-[#9ba2b0] dark:hover:bg-[#252b35]"
          aria-label="Customize metrics"
        >
          <Sliders className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

// ─── Sortable column header ───────────────────────────────────────────────────

interface SortableHeadProps {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  direction: "asc" | "desc";
  onSort: (key: SortKey) => void;
  className?: string;
}

function SortableHead({ label, sortKey, activeKey, direction, onSort, className }: SortableHeadProps) {
  const isActive = activeKey === sortKey;
  return (
    <TableHead className={`h-16 px-5 ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`flex items-center gap-1.5 text-left text-[13px] leading-5 tracking-[-0.28px] transition-colors ${
          isActive
            ? "font-medium text-[#212121] dark:text-[#f3f4f6]"
            : "font-medium text-[#6b7280] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:text-[#f3f4f6]"
        }`}
      >
        {label}
        {isActive && direction === "asc" ? (
          <ChevronDown className="h-3.5 w-3.5 rotate-180" />
        ) : (
          <ChevronDown className={`h-3.5 w-3.5 ${isActive ? "" : "opacity-50"}`} />
        )}
      </button>
    </TableHead>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AgentOutcomesView({ agent, onBack }: AgentOutcomesViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>("location");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const metrics = useMemo(() => {
    const count = LOCATION_OUTCOMES.length;
    const reviewsResponded = LOCATION_OUTCOMES.reduce((s, r) => s + r.reviewsResponded, 0);
    const responseRate = count === 0 ? 0 : Math.round(LOCATION_OUTCOMES.reduce((s, r) => s + r.responseRate, 0) / count);
    const avgResponseTime = count === 0
      ? 0
      : Math.round(LOCATION_OUTCOMES.reduce((s, r) => s + timeToMinutes(r.avgResponseTime), 0) / count);
    const timeSaved = LOCATION_OUTCOMES.reduce((s, r) => s + timeToMinutes(r.timeSaved), 0);
    return {
      reviewsResponded: reviewsResponded.toLocaleString(),
      responseRate: `${responseRate}%`,
      avgResponseTime: formatMinutes(avgResponseTime),
      timeSaved: formatMinutes(timeSaved),
    };
  }, []);

  const sorted = useMemo(() => {
    const arr = [...LOCATION_OUTCOMES].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "location":
          cmp = a.location.localeCompare(b.location);
          break;
        case "reviewsResponded":
          cmp = a.reviewsResponded - b.reviewsResponded;
          break;
        case "responseRate":
          cmp = a.responseRate - b.responseRate;
          break;
        case "avgResponseTime":
          cmp = timeToMinutes(a.avgResponseTime) - timeToMinutes(b.avgResponseTime);
          break;
        case "timeSaved":
          cmp = timeToMinutes(a.timeSaved) - timeToMinutes(b.timeSaved);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [sortKey, sortDir]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#1e2229]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#e5e9f0] bg-white dark:border-[#252b35] dark:bg-[#1e2229]">
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={onBack}
              aria-label="Back to agents list"
            >
              <ArrowLeft className="h-4 w-4 text-[#555] dark:text-[#9ba2b0]" />
            </Button>
            <h1 className="truncate text-[18px] leading-[26px] tracking-[-0.36px] text-[#212121] dark:text-[#f3f4f6]">
              {agent.name}
            </h1>
            <StatusChip status={agent.status} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Last 30 days
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Filter">
              <Sliders className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#181c24]">
        <div className="px-6 pt-6">
          <div className="grid grid-cols-4 gap-5">
            <MetricCard label="Reviews responded" value={metrics.reviewsResponded} trend="+1.3%" />
            <MetricCard label="Response rate" value={metrics.responseRate} trend="+1.3%" />
            <MetricCard label="Average response time" value={metrics.avgResponseTime} trend="+1.3%" />
            <MetricCard label="Time saved" value={metrics.timeSaved} trend="+1.3%" customize />
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="overflow-hidden rounded-[8px] border border-[#eaeaea] bg-white dark:border-[#252b35] dark:bg-[#1e2229]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#eaeaea] bg-[#fafbfc] hover:bg-[#fafbfc] dark:border-[#252b35] dark:bg-[#181c24] dark:hover:bg-[#181c24]">
                  <SortableHead
                    label="Location"
                    sortKey="location"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[320px] min-w-[240px]"
                  />
                  <SortableHead
                    label="Reviews responded"
                    sortKey="reviewsResponded"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[200px]"
                  />
                  <SortableHead
                    label="Response rate"
                    sortKey="responseRate"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[160px]"
                  />
                  <SortableHead
                    label="Average response time"
                    sortKey="avgResponseTime"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[200px]"
                  />
                  <SortableHead
                    label="Time saved"
                    sortKey="timeSaved"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                  />
                  <TableHead className="w-[72px] px-5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((row) => (
                  <TableRow
                    key={row.location}
                    className="border-b border-[#f0f2f5] last:border-b-0 hover:bg-[#fafbfc] dark:border-[#252b35] dark:hover:bg-[#181c24]"
                  >
                    <TableCell className="h-[64px] px-5 py-4 text-[14px] font-light leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
                      {row.location}
                    </TableCell>
                    <TableCell className="h-[64px] px-5 py-4 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {row.reviewsResponded}
                    </TableCell>
                    <TableCell className="h-[64px] px-5 py-4 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {row.responseRate}%
                    </TableCell>
                    <TableCell className="h-[64px] px-5 py-4 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {row.avgResponseTime}
                    </TableCell>
                    <TableCell className="h-[64px] px-5 py-4 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {row.timeSaved}
                    </TableCell>
                    <TableCell className="h-[64px] px-5 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Row actions">
                        <MoreHorizontal className="h-4 w-4 text-[#6b7280] dark:text-[#9ba2b0]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
