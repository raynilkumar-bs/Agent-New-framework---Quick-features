import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Sliders,
  Info,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { ModuleHeader } from "@/app/components/layout/ModuleHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { FunnelSimple } from "@phosphor-icons/react";
import { FilterPanel, type FilterItem } from "./FilterPanel";
import { AgentOutcomesView } from "./AgentOutcomesView";
import { ReviewResponseAgentBuilderView } from "./ReviewResponseAgentBuilderView";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgentStatus = "Running" | "Paused" | "Draft";
type Region = "North" | "East" | "South" | "West";

interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  region: Region;
  reviewsResponded: number;
  responseRate: number;
  avgResponseTime: string;
  timeSaved: string;
  locations: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_AGENTS: Agent[] = [
  {
    id: "a1",
    name: "Review response agent replying autonomously North Region",
    status: "Running",
    region: "North",
    reviewsResponded: 835,
    responseRate: 92,
    avgResponseTime: "20m",
    timeSaved: "4h 20m",
    locations: 500,
  },
  {
    id: "a2",
    name: "Review response agent replying autonomously East Region",
    status: "Running",
    region: "East",
    reviewsResponded: 412,
    responseRate: 88,
    avgResponseTime: "5m",
    timeSaved: "1h 10m",
    locations: 250,
  },
  {
    id: "a3",
    name: "Review response agent replying autonomously South Region",
    status: "Paused",
    region: "South",
    reviewsResponded: 318,
    responseRate: 85,
    avgResponseTime: "10m",
    timeSaved: "45m",
    locations: 200,
  },
  {
    id: "a4",
    name: "Review response agent replying autonomously West Region",
    status: "Running",
    region: "West",
    reviewsResponded: 274,
    responseRate: 90,
    avgResponseTime: "2m",
    timeSaved: "3h 20m",
    locations: 100,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type SortKey =
  | "name"
  | "status"
  | "reviewsResponded"
  | "responseRate"
  | "avgResponseTime"
  | "timeSaved"
  | "locations";

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

function StatusBadge({ status }: { status: AgentStatus }) {
  const styles: Record<AgentStatus, string> = {
    Running:
      "bg-[#eaf7e8] text-[#377e2c] border-transparent dark:bg-[#1f3a20] dark:text-[#86e08e]",
    Paused:
      "bg-[#fef3c7] text-[#92400e] border-transparent dark:bg-[#3a2a12] dark:text-[#fbbf24]",
    Draft:
      "bg-[#f3f4f6] text-[#555] border-transparent dark:bg-[#252b35] dark:text-[#9ba2b0]",
  };
  return (
    <Badge className={`rounded-[4px] px-2 py-1 text-[10px] font-normal ${styles[status]}`}>
      {status}
    </Badge>
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
  activeKey: SortKey | null;
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
        {isActive ? (
          direction === "asc" ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )
        ) : (
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        )}
      </button>
    </TableHead>
  );
}

// ─── Library cards ───────────────────────────────────────────────────────────

const LIBRARY_TEMPLATES = [
  {
    id: "l1",
    title: "Review response agent replying using templates",
    description: "Uses pre-defined templates and responds to reviews automatically",
  },
  {
    id: "l2",
    title: "Review response agent replying autonomously",
    description:
      "Uses AI to analyze review sentiment, generates and posts unique, context aware replies automatically",
  },
  {
    id: "l3",
    title: "Review response agent replying after human approval",
    description:
      "Uses AI to analyze review sentiment, generates and sends unique, context-aware replies for a human approval before posting",
  },
  {
    id: "l4",
    title: "Review response agent suggesting replies in dashboard",
    description:
      "Uses AI to analyze review sentiment, generates and shows unique, context-aware replies in the dashboard for one-click manual posting",
  },
];

function LibraryGrid({ viewMode }: { viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col divide-y divide-[#eaeaea] rounded-[8px] border border-[#eaeaea] bg-white dark:divide-[#252b35] dark:border-[#252b35] dark:bg-[#1e2229]">
        {LIBRARY_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="flex items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-[#fafbfc] dark:hover:bg-[#181c24]"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[15px] font-semibold leading-6 tracking-[-0.3px] text-[#111827] dark:text-[#f3f4f6]">
                {tpl.title}
              </p>
              <p className="text-[13px] font-normal leading-[1.6] text-[#6b7280] dark:text-[#9ba2b0]">
                {tpl.description}
              </p>
            </div>
            <Button size="sm" variant="outline" className="h-8 shrink-0">
              Use template
            </Button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {LIBRARY_TEMPLATES.map((tpl) => (
        <div
          key={tpl.id}
          className="group flex h-[190px] cursor-pointer flex-col justify-between rounded-[8px] border border-[#e5e9f0] bg-white p-7 transition-colors hover:bg-[#e5e9f0] dark:border-[#252b35] dark:bg-[#1e2229] dark:hover:bg-[#252b35]"
        >
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-semibold leading-6 tracking-[-0.3px] text-[#111827] dark:text-[#f3f4f6]">
              {tpl.title}
            </p>
            <p className="text-[13px] font-normal leading-[1.6] text-[#6b7280] dark:text-[#9ba2b0]">
              {tpl.description}
            </p>
          </div>
          <div className="translate-y-1 opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
            <Button size="sm">Use agent</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function ReviewResponseAgentsView() {
  const [tab, setTab] = useState("agents");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [outcomesAgent, setOutcomesAgent] = useState<Agent | null>(null);
  const [creatingAgent, setCreatingAgent] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterItem[]>([
    {
      id: "rra_location",
      label: "Location",
      options: ["All locations", "North Region", "East Region", "South Region", "West Region"],
    },
    {
      id: "rra_status",
      label: "Status",
      options: ["All statuses", "Running", "Paused", "Draft"],
    },
    {
      id: "rra_time_period",
      label: "Time period",
      options: ["Today", "Last 7 days", "Last 30 days", "Last 90 days", "Custom range"],
    },
  ]);

  const locationFilter = filters.find((f) => f.id === "rra_location")?.value;
  const statusFilter = filters.find((f) => f.id === "rra_status")?.value;

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const metrics = useMemo(() => {
    const count = MOCK_AGENTS.length;
    const reviewsResponded = MOCK_AGENTS.reduce((sum, a) => sum + a.reviewsResponded, 0);
    const responseRate =
      count === 0 ? 0 : Math.round(MOCK_AGENTS.reduce((sum, a) => sum + a.responseRate, 0) / count);
    const avgResponseTime =
      count === 0
        ? 0
        : Math.round(
            MOCK_AGENTS.reduce((sum, a) => sum + timeToMinutes(a.avgResponseTime), 0) / count
          );
    const timeSaved = MOCK_AGENTS.reduce((sum, a) => sum + timeToMinutes(a.timeSaved), 0);
    return {
      reviewsResponded: reviewsResponded.toLocaleString(),
      responseRate: `${responseRate}%`,
      avgResponseTime: formatMinutes(avgResponseTime),
      timeSaved: formatMinutes(timeSaved),
    };
  }, []);

  const filteredSorted = useMemo(() => {
    const filtered = MOCK_AGENTS.filter((a) => {
      if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (locationFilter && locationFilter !== "All locations" && !locationFilter.startsWith(a.region)) return false;
      if (statusFilter && statusFilter !== "All statuses" && a.status !== statusFilter) return false;
      return true;
    });
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
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
        case "locations":
          cmp = a.locations - b.locations;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [searchQuery, sortKey, sortDir, locationFilter, statusFilter]);

  if (outcomesAgent) {
    return (
      <AgentOutcomesView
        agent={{ id: outcomesAgent.id, name: outcomesAgent.name, status: outcomesAgent.status }}
        onBack={() => setOutcomesAgent(null)}
      />
    );
  }

  if (creatingAgent) {
    return <ReviewResponseAgentBuilderView onBack={() => setCreatingAgent(false)} />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#1e2229]">
      <ModuleHeader
        title="Review response agents"
        actions={
          <div className="flex items-center gap-2">
            {showSearch ? (
              <Input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setShowSearch(false)}
                placeholder="Search agents"
                className="h-9 w-56"
              />
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setShowSearch(true)}
                aria-label="Search agents"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            {tab === "agents" ? (
              <Button
                size="sm"
                className="h-9 gap-1.5"
                onClick={() => setCreatingAgent(true)}
              >
                <Plus className="h-4 w-4" />
                Create agent
              </Button>
            ) : (
              <div className="flex h-9 items-center gap-0.5 rounded-[6px] border border-[#e5e9f0] bg-white px-1.5 dark:border-[#252b35] dark:bg-[#1e2229]">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`flex h-6 w-6 items-center justify-center rounded-[4px] transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#e5e9f0] text-[#212121] dark:bg-[#252b35] dark:text-[#f3f4f6]"
                      : "text-[#6b7280] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:text-[#f3f4f6]"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={`flex h-6 w-6 items-center justify-center rounded-[4px] transition-colors ${
                    viewMode === "list"
                      ? "bg-[#e5e9f0] text-[#212121] dark:bg-[#252b35] dark:text-[#f3f4f6]"
                      : "text-[#6b7280] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:text-[#f3f4f6]"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              className={`h-9 w-9 ${
                filterOpen
                  ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]"
                  : ""
              }`}
              aria-label="Filter"
              aria-pressed={filterOpen}
              onClick={() => setFilterOpen((o) => !o)}
            >
              <FunnelSimple
                size={14}
                weight={filterOpen ? "fill" : "regular"}
                className={filterOpen ? "text-[#1E44CC]" : "text-[#555] dark:text-[#8b92a5]"}
              />
            </Button>
          </div>
        }
      />

      <div className="flex min-h-0 flex-1">
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#181c24]">
        <div className="border-b border-[#eaeaea] bg-white dark:border-[#252b35] dark:bg-[#1e2229]">
          <div className="px-6 pt-5">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="h-auto gap-2 rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="agents"
                  className="relative h-10 rounded-none border-0 bg-transparent px-3 text-[14px] font-normal text-[#555] data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-[#212121] data-[state=active]:shadow-none dark:data-[state=active]:text-[#f3f4f6] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#1976d2] after:opacity-0 data-[state=active]:after:opacity-100"
                >
                  Agents
                </TabsTrigger>
                <TabsTrigger
                  value="library"
                  className="relative h-10 rounded-none border-0 bg-transparent px-3 text-[14px] font-normal text-[#555] data-[state=active]:bg-transparent data-[state=active]:font-medium data-[state=active]:text-[#212121] data-[state=active]:shadow-none dark:data-[state=active]:text-[#f3f4f6] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#1976d2] after:opacity-0 data-[state=active]:after:opacity-100"
                >
                  Library
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {tab === "library" && (
          <div className="px-6 py-6">
            <LibraryGrid viewMode={viewMode} />
          </div>
        )}

        {tab === "agents" && (
        <div className="px-6 pt-6">
          <div className="grid grid-cols-4 gap-5">
            <MetricCard label="Reviews responded" value={metrics.reviewsResponded} trend="+1.3%" />
            <MetricCard label="Response rate" value={metrics.responseRate} trend="+1.3%" />
            <MetricCard label="Average response time" value={metrics.avgResponseTime} trend="+1.3%" />
            <MetricCard label="Time saved" value={metrics.timeSaved} trend="+1.3%" customize />
          </div>
        </div>
        )}

        {tab === "agents" && <div className="px-6 py-6">
          <div className="overflow-hidden rounded-[8px] border border-[#eaeaea] bg-white dark:border-[#252b35] dark:bg-[#1e2229]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#eaeaea] bg-[#fafbfc] hover:bg-[#fafbfc] dark:border-[#252b35] dark:bg-[#181c24] dark:hover:bg-[#181c24]">
                  <SortableHead
                    label="Agent name"
                    sortKey="name"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[360px] min-w-[280px]"
                  />
                  <SortableHead
                    label="Status"
                    sortKey="status"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[140px]"
                  />
                  <SortableHead
                    label="Reviews responded"
                    sortKey="reviewsResponded"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[180px]"
                  />
                  <SortableHead
                    label="Response rate"
                    sortKey="responseRate"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[150px]"
                  />
                  <SortableHead
                    label="Avg response time"
                    sortKey="avgResponseTime"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[180px]"
                  />
                  <SortableHead
                    label="Time saved"
                    sortKey="timeSaved"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[150px]"
                  />
                  <SortableHead
                    label="Locations"
                    sortKey="locations"
                    activeKey={sortKey}
                    direction={sortDir}
                    onSort={handleSort}
                    className="w-[140px]"
                  />
                  <TableHead className="w-[72px] px-5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSorted.map((agent) => (
                  <TableRow
                    key={agent.id}
                    className="border-b border-[#f0f2f5] last:border-b-0 hover:bg-[#fafbfc] dark:border-[#252b35] dark:hover:bg-[#181c24]"
                  >
                    <TableCell className="h-[72px] whitespace-normal px-5 py-5 text-[14px] font-light leading-[20px] tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
                      <button
                        type="button"
                        className="text-left font-light transition-colors hover:text-[#1976d2] dark:hover:text-[#60a5fa]"
                      >
                        {agent.name}
                      </button>
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5">
                      <StatusBadge status={agent.status} />
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {agent.reviewsResponded.toLocaleString()}
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {agent.responseRate}%
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {agent.avgResponseTime}
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                      {agent.timeSaved}
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5">
                      <button
                        type="button"
                        className="flex items-center gap-1 text-[14px] text-[#212121] transition-colors hover:text-[#1976d2] dark:text-[#e4e4e4] dark:hover:text-[#60a5fa]"
                      >
                        {agent.locations}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                    <TableCell className="h-[72px] px-5 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] outline-none transition-colors hover:bg-[#f3f4f6] hover:text-[#212121] focus-visible:ring-2 focus-visible:ring-[#1976d2] dark:text-[#9ba2b0] dark:hover:bg-[#252b35] dark:hover:text-[#f3f4f6]"
                          aria-label="Row actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          sideOffset={8}
                          className="w-[200px] rounded-[10px] border border-[#e5e9f0] bg-white p-2 shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_2px_6px_-2px_rgba(16,24,40,0.08)] dark:border-[#252b35] dark:bg-[#1e2229]"
                        >
                          <DropdownMenuItem className="h-9 cursor-pointer rounded-[6px] px-3 text-[14px] text-[#374151] focus:bg-[#f3f4f6] focus:text-[#111827] dark:text-[#e4e4e4] dark:focus:bg-[#252b35] dark:focus:text-[#f3f4f6]">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="h-9 cursor-pointer rounded-[6px] px-3 text-[14px] text-[#374151] focus:bg-[#f3f4f6] focus:text-[#111827] dark:text-[#e4e4e4] dark:focus:bg-[#252b35] dark:focus:text-[#f3f4f6]">
                            {agent.status === "Running" ? "Pause" : "Resume"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="h-9 cursor-pointer rounded-[6px] px-3 text-[14px] text-[#374151] focus:bg-[#f3f4f6] focus:text-[#111827] dark:text-[#e4e4e4] dark:focus:bg-[#252b35] dark:focus:text-[#f3f4f6]">
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setOutcomesAgent(agent)}
                            className="h-9 cursor-pointer rounded-[6px] px-3 text-[14px] text-[#374151] focus:bg-[#f3f4f6] focus:text-[#111827] dark:text-[#e4e4e4] dark:focus:bg-[#252b35] dark:focus:text-[#f3f4f6]"
                          >
                            Outcomes
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-[#eaeaea] dark:bg-[#252b35]" />
                          <DropdownMenuItem className="h-9 cursor-pointer rounded-[6px] px-3 text-[14px] text-[#dc2626] focus:bg-[#fef2f2] focus:text-[#b91c1c] dark:text-[#f87171] dark:focus:bg-[#2a1515] dark:focus:text-[#fca5a5]">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSorted.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-16 text-center text-[14px] text-[#9ba2b0]"
                    >
                      No agents match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>}
      </div>
        {filterOpen && (
          <FilterPanel
            title="Filters"
            filters={filters}
            onFiltersChange={setFilters}
            onToggleCollapse={() => setFilterOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
