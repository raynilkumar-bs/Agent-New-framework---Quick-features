import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Plus,
  Sliders,
  Info,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  LayoutGrid,
  List,
  Columns3,
  GripVertical,
  Lock,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { FunnelSimple } from "@phosphor-icons/react";
import { FilterPanel, type FilterItem } from "./FilterPanel";
import { AgentOutcomesView } from "./AgentOutcomesView";
import { AgentActivityView, type AgentRun } from "./AgentActivityView";
import { AgentRunDetailView } from "./AgentRunDetailView";
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
  locationNames: string[];
  reviewSpam: boolean;
  spammedReviews: number;
  lastRun: string;
  createdBy: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const LOCATION_POOL = [
  "Dallas",
  "Austin Downtown",
  "Houston Galleria",
  "San Antonio North",
  "Plano Legacy West",
  "Frisco Stonebriar",
  "Fort Worth Sundance",
  "El Paso Westside",
  "Arlington Highlands",
  "Irving Las Colinas",
  "McKinney Gateway",
  "Lubbock South",
  "Amarillo East",
  "Corpus Christi Bay",
  "Galveston Seawall",
  "Round Rock Tech",
  "Sugar Land Town Square",
  "The Woodlands Market",
  "Katy Mills",
  "Pearland Pkwy",
];

function generateLocations(count: number): string[] {
  return Array.from({ length: count }, (_, i) => LOCATION_POOL[i % LOCATION_POOL.length]);
}

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
    locationNames: generateLocations(500),
    reviewSpam: true,
    spammedReviews: 24,
    lastRun: "2 hours ago",
    createdBy: "Priya Shah",
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
    locationNames: generateLocations(250),
    reviewSpam: false,
    spammedReviews: 0,
    lastRun: "15 min ago",
    createdBy: "Marcus Chen",
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
    locationNames: generateLocations(200),
    reviewSpam: true,
    spammedReviews: 13,
    lastRun: "Yesterday",
    createdBy: "Aisha Patel",
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
    locationNames: generateLocations(100),
    reviewSpam: false,
    spammedReviews: 0,
    lastRun: "1 hour ago",
    createdBy: "Diego Ramirez",
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
  | "locations"
  | "reviewSpam"
  | "lastRun"
  | "createdBy";

type ColumnId = SortKey;

interface ColumnDef {
  id: ColumnId;
  label: string;
  sortKey: SortKey;
  width: string;
  pinned?: boolean;
}

const DEFAULT_COLUMNS: ColumnDef[] = [
  { id: "name", label: "Agent name", sortKey: "name", width: "w-[360px] min-w-[280px]", pinned: true },
  { id: "status", label: "Status", sortKey: "status", width: "w-[140px]" },
  { id: "reviewsResponded", label: "Reviews responded", sortKey: "reviewsResponded", width: "w-[180px]" },
  { id: "responseRate", label: "Response rate", sortKey: "responseRate", width: "w-[150px]" },
  { id: "avgResponseTime", label: "Avg response time", sortKey: "avgResponseTime", width: "w-[180px]" },
  { id: "timeSaved", label: "Time saved", sortKey: "timeSaved", width: "w-[150px]" },
  { id: "locations", label: "Locations", sortKey: "locations", width: "w-[140px]" },
  { id: "reviewSpam", label: "Review spam", sortKey: "reviewSpam", width: "w-[140px]" },
  { id: "lastRun", label: "Last run", sortKey: "lastRun", width: "w-[160px]" },
  { id: "createdBy", label: "Created by", sortKey: "createdBy", width: "w-[160px]" },
];

const DEFAULT_VISIBILITY: Record<ColumnId, boolean> = {
  name: true,
  status: true,
  reviewsResponded: true,
  responseRate: true,
  avgResponseTime: true,
  timeSaved: true,
  locations: true,
  reviewSpam: true,
  lastRun: false,
  createdBy: false,
};

const COLUMNS_STORAGE_KEY = "rr-agents-columns-v1";

interface ColumnState {
  order: ColumnId[];
  visibility: Record<ColumnId, boolean>;
}

const DEFAULT_COLUMN_STATE: ColumnState = {
  order: DEFAULT_COLUMNS.map((c) => c.id),
  visibility: DEFAULT_VISIBILITY,
};

function loadColumnState(): ColumnState {
  if (typeof window === "undefined") return DEFAULT_COLUMN_STATE;
  try {
    const raw = window.localStorage.getItem(COLUMNS_STORAGE_KEY);
    if (!raw) return DEFAULT_COLUMN_STATE;
    const parsed = JSON.parse(raw) as Partial<ColumnState>;
    const knownIds = new Set<ColumnId>(DEFAULT_COLUMNS.map((c) => c.id));
    const savedOrder = (parsed.order ?? []).filter((id): id is ColumnId => knownIds.has(id as ColumnId));
    const missing = DEFAULT_COLUMNS.map((c) => c.id).filter((id) => !savedOrder.includes(id));
    return {
      order: [...savedOrder, ...missing],
      visibility: { ...DEFAULT_VISIBILITY, ...(parsed.visibility ?? {}) },
    };
  } catch {
    return DEFAULT_COLUMN_STATE;
  }
}

function saveColumnState(state: ColumnState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COLUMNS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / privacy mode failures */
  }
}

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

// ─── Locations cell ───────────────────────────────────────────────────────────

function LocationsCell({ count, locations }: { count: number; locations: string[] }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const top5 = locations.slice(0, 5);
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter((n) => n.toLowerCase().includes(q));
  }, [locations, searchQuery]);

  const handleViewMore = () => {
    setPopoverOpen(false);
    setDrawerOpen(true);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1 text-[14px] text-[#212121] transition-colors hover:text-[#1976d2] dark:text-[#e4e4e4] dark:hover:text-[#60a5fa]"
          >
            {count}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          collisionPadding={24}
          className="w-[280px] rounded-[8px] border border-[#e5e9f0] bg-white p-0 shadow-[0_8px_24px_-4px_rgba(16,24,40,0.12),0_2px_6px_-2px_rgba(16,24,40,0.08)] dark:border-[#252b35] dark:bg-[#1e2229]"
        >
          <div className="border-b border-[#eaeaea] px-4 py-3 text-[13px] font-medium text-[#212121] dark:border-[#252b35] dark:text-[#f3f4f6]">
            Locations
          </div>
          <ul className="py-1">
            {top5.map((name, i) => (
              <li
                key={i}
                className="truncate px-4 py-2 text-[14px] text-[#374151] dark:text-[#e4e4e4]"
                title={name}
              >
                {name}
              </li>
            ))}
          </ul>
          <div className="border-t border-[#eaeaea] dark:border-[#252b35]">
            <button
              type="button"
              onClick={handleViewMore}
              className="block w-full px-4 py-2.5 text-left text-[13px] font-medium text-[#1976d2] transition-colors hover:bg-[#f8fafc] dark:text-[#60a5fa] dark:hover:bg-[#181c24]"
            >
              View more
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="flex w-[520px] flex-col gap-0 p-0 sm:max-w-[520px] dark:bg-[#1e2229]"
        >
          <SheetHeader className="py-4 pl-6 pr-4">
            <SheetTitle className="text-[16px] text-[#212121] dark:text-[#f3f4f6]">
              View locations
            </SheetTitle>
          </SheetHeader>
          <div className="border-b border-[#eaeaea] py-3 pl-6 pr-4 dark:border-[#252b35]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ba2b0]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations"
                className="h-9 pl-9"
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto pl-6 pr-4">
            {filtered.length === 0 ? (
              <li className="py-12 text-center text-[14px] text-[#9ba2b0]">
                No locations found.
              </li>
            ) : (
              filtered.map((name, i) => (
                <li
                  key={i}
                  className="border-b border-[#f0f2f5] py-3 text-[14px] text-[#374151] last:border-b-0 dark:border-[#252b35] dark:text-[#e4e4e4]"
                >
                  {name}
                </li>
              ))
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </>
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

// ─── Review-spam badge ────────────────────────────────────────────────────────

function ReviewSpamBadge({ value }: { value: boolean }) {
  if (value) {
    return (
      <Badge className="rounded-[4px] border-transparent bg-[#fde8e8] px-2 py-1 text-[10px] font-normal text-[#b91c1c] dark:bg-[#3a1e1e] dark:text-[#f87171]">
        Yes
      </Badge>
    );
  }
  return (
    <Badge className="rounded-[4px] border-transparent bg-[#f3f4f6] px-2 py-1 text-[10px] font-normal text-[#555] dark:bg-[#252b35] dark:text-[#9ba2b0]">
      No
    </Badge>
  );
}

// ─── Metric scroller ──────────────────────────────────────────────────────────

function MetricScroller({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateChevrons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft < maxScroll - 1);
  };

  useLayoutEffect(() => {
    updateChevrons();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateChevrons, { passive: true });
    const ro = new ResizeObserver(updateChevrons);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateChevrons);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (dx: number) => {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {canLeft && (
        <button
          type="button"
          aria-label="Scroll metrics left"
          onClick={() => scrollBy(-320)}
          className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#374151] shadow-[0_4px_12px_-2px_rgba(16,24,40,0.12)] transition-colors hover:bg-[#f8f9fb] dark:border-[#252b35] dark:bg-[#1e2229] dark:text-[#e4e4e4] dark:hover:bg-[#252b35]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {canRight && (
        <button
          type="button"
          aria-label="Scroll metrics right"
          onClick={() => scrollBy(320)}
          className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#374151] shadow-[0_4px_12px_-2px_rgba(16,24,40,0.12)] transition-colors hover:bg-[#f8f9fb] dark:border-[#252b35] dark:bg-[#1e2229] dark:text-[#e4e4e4] dark:hover:bg-[#252b35]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// ─── Column customizer drawer ────────────────────────────────────────────────

const COL_DRAG_TYPE = "rr-agents-column";

interface DraggableColumnRowProps {
  col: ColumnDef;
  index: number;
  visible: boolean;
  onToggle: (id: ColumnId, next: boolean) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

function DraggableColumnRow({ col, index, visible, onToggle, onMove }: DraggableColumnRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dropIndicator, setDropIndicator] = useState<"above" | "below" | null>(null);
  const isPinned = !!col.pinned;

  const [{ isDragging }, drag] = useDrag({
    type: COL_DRAG_TYPE,
    item: { index },
    canDrag: () => !isPinned,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: COL_DRAG_TYPE,
    canDrop: () => !isPinned,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      if (item.index === index) {
        setDropIndicator(null);
        return;
      }
      const rect = ref.current.getBoundingClientRect();
      const middleY = (rect.bottom - rect.top) / 2;
      const offset = monitor.getClientOffset();
      if (!offset) return;
      const clientY = offset.y - rect.top;
      setDropIndicator(clientY < middleY ? "above" : "below");
    },
    drop: (item: { index: number }) => {
      const from = item.index;
      const to = index;
      if (from === to) return;
      let insert: number;
      if (from < to) {
        insert = dropIndicator === "above" ? to - 1 : to;
      } else {
        insert = dropIndicator === "above" ? to : to + 1;
      }
      onMove(from, Math.max(0, insert));
      setDropIndicator(null);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  useEffect(() => {
    if (!isOver) setDropIndicator(null);
  }, [isOver]);

  drag(drop(ref));

  const showAbove = isOver && dropIndicator === "above" && !isPinned;
  const showBelow = isOver && dropIndicator === "below" && !isPinned;

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isDragging ? 0.35 : 1,
        transform: isDragging ? "scale(0.98)" : "scale(1)",
        transition:
          "opacity 0.25s cubic-bezier(0.2, 0, 0, 1), transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      {showAbove && (
        <div className="pointer-events-none absolute -top-[3px] left-3 right-3 z-10 flex items-center animate-[pulse_1.4s_ease-in-out_infinite]">
          <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#2552ED] shadow-[0_0_0_3px_rgba(37,82,237,0.18)]" />
          <div className="h-[2px] flex-1 rounded-full bg-[#2552ED]" />
          <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#2552ED] shadow-[0_0_0_3px_rgba(37,82,237,0.18)]" />
        </div>
      )}
      <div
        className={`group flex items-center gap-4 rounded-[8px] border px-3.5 py-3.5 ${
          isPinned
            ? "border-transparent bg-[#fafbfc] dark:bg-[#181c24]"
            : isDragging
            ? "border-[#2552ED] bg-white shadow-[0_8px_24px_-6px_rgba(37,82,237,0.25),0_2px_6px_-2px_rgba(16,24,40,0.08)] dark:bg-[#1e2229]"
            : "border-transparent hover:border-[#eaeaea] hover:bg-[#fafbfc] dark:hover:border-[#252b35] dark:hover:bg-[#181c24]"
        }`}
        style={{
          transition:
            "background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease",
        }}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-[4px] transition-colors ${
            isPinned
              ? "text-[#cdd2dc] dark:text-[#3a4150]"
              : "cursor-grab text-[#9ba2b0] hover:bg-[#eef0f4] hover:text-[#374151] active:cursor-grabbing dark:hover:bg-[#252b35] dark:hover:text-[#e4e4e4]"
          }`}
          aria-hidden
        >
          <GripVertical className="h-[18px] w-[18px]" />
        </span>
        <span className="flex-1 text-[14px] leading-5 text-[#212121] dark:text-[#e4e4e4]">
          {col.label}
        </span>
        {isPinned ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] text-[#9ba2b0]">
                <Lock className="h-[14px] w-[14px]" />
              </span>
            </TooltipTrigger>
            <TooltipContent>Pinned · always visible</TooltipContent>
          </Tooltip>
        ) : null}
        <Switch
          checked={visible}
          onCheckedChange={(next) => onToggle(col.id, next)}
          disabled={isPinned}
          aria-label={`Toggle ${col.label}`}
        />
      </div>
      {showBelow && (
        <div className="pointer-events-none absolute -bottom-[3px] left-3 right-3 z-10 flex items-center animate-[pulse_1.4s_ease-in-out_infinite]">
          <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#2552ED] shadow-[0_0_0_3px_rgba(37,82,237,0.18)]" />
          <div className="h-[2px] flex-1 rounded-full bg-[#2552ED]" />
          <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#2552ED] shadow-[0_0_0_3px_rgba(37,82,237,0.18)]" />
        </div>
      )}
    </div>
  );
}

interface ColumnsCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: ColumnState;
  onChange: (next: ColumnState) => void;
}

function ColumnsCustomizer({ open, onOpenChange, state, onChange }: ColumnsCustomizerProps) {
  const orderedColumns = useMemo(() => {
    const byId = new Map(DEFAULT_COLUMNS.map((c) => [c.id, c]));
    return state.order.map((id) => byId.get(id)).filter((c): c is ColumnDef => Boolean(c));
  }, [state.order]);

  const visibleCount = orderedColumns.filter((c) => state.visibility[c.id]).length;

  const handleToggle = (id: ColumnId, next: boolean) => {
    onChange({ ...state, visibility: { ...state.visibility, [id]: next } });
  };

  const handleMove = (from: number, to: number) => {
    const next = [...state.order];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange({ ...state, order: next });
  };

  const handleReset = () => {
    onChange(DEFAULT_COLUMN_STATE);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[560px] flex-col gap-0 p-0 sm:max-w-[560px] dark:bg-[#1e2229]"
      >
        <SheetHeader className="gap-1.5 border-b border-[#eaeaea] px-7 py-6 dark:border-[#252b35]">
          <SheetTitle className="text-[18px] font-medium leading-7 tracking-[-0.36px] text-[#111827] dark:text-[#f3f4f6]">
            Customize columns
          </SheetTitle>
          <p className="text-[13px] leading-5 text-[#6b7280] dark:text-[#9ba2b0]">
            Drag to reorder. Toggle to show or hide.
          </p>
          <div className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eef2ff] px-2.5 py-1 text-[11px] font-medium text-[#3730a3] dark:bg-[#1e2d5e] dark:text-[#a5b4fc]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3730a3] dark:bg-[#a5b4fc]" />
            {visibleCount} of {orderedColumns.length} columns visible
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col gap-1.5">
              {orderedColumns.map((col, idx) => (
                <DraggableColumnRow
                  key={col.id}
                  col={col}
                  index={idx}
                  visible={state.visibility[col.id]}
                  onToggle={handleToggle}
                  onMove={handleMove}
                />
              ))}
            </div>
          </DndProvider>
          <p className="mt-5 px-1 text-[12px] leading-4 text-[#9ba2b0]">
            Changes save automatically and persist across sessions.
          </p>
        </div>

        <SheetFooter className="flex-row items-center justify-between gap-2 border-t border-[#eaeaea] bg-[#fafbfc] px-7 py-4 dark:border-[#252b35] dark:bg-[#181c24]">
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-[#374151] dark:text-[#e4e4e4]">
            Reset to default
          </Button>
          <Button size="sm" onClick={() => onOpenChange(false)} className="px-5">
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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
  const [activityAgent, setActivityAgent] = useState<Agent | null>(null);
  const [runDetail, setRunDetail] = useState<{ agent: Agent; run: AgentRun } | null>(null);
  const [creatingAgent, setCreatingAgent] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [columnsDrawerOpen, setColumnsDrawerOpen] = useState(false);
  const [columnState, setColumnState] = useState<ColumnState>(() => loadColumnState());

  useEffect(() => {
    saveColumnState(columnState);
  }, [columnState]);

  const orderedVisibleColumns = useMemo(() => {
    const byId = new Map(DEFAULT_COLUMNS.map((c) => [c.id, c]));
    return columnState.order
      .map((id) => byId.get(id))
      .filter((c): c is ColumnDef => Boolean(c) && columnState.visibility[c!.id]);
  }, [columnState]);
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
    const reviewsSpammed = MOCK_AGENTS.reduce((sum, a) => sum + a.spammedReviews, 0);
    return {
      reviewsResponded: reviewsResponded.toLocaleString(),
      responseRate: `${responseRate}%`,
      avgResponseTime: formatMinutes(avgResponseTime),
      timeSaved: formatMinutes(timeSaved),
      reviewsSpammed: reviewsSpammed.toLocaleString(),
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
        case "reviewSpam":
          cmp = (a.reviewSpam ? 1 : 0) - (b.reviewSpam ? 1 : 0);
          break;
        case "lastRun":
          cmp = a.lastRun.localeCompare(b.lastRun);
          break;
        case "createdBy":
          cmp = a.createdBy.localeCompare(b.createdBy);
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

  if (runDetail) {
    return (
      <AgentRunDetailView
        agent={{ id: runDetail.agent.id, name: runDetail.agent.name, status: runDetail.agent.status }}
        run={runDetail.run}
        onBack={() => setRunDetail(null)}
      />
    );
  }

  if (activityAgent) {
    return (
      <AgentActivityView
        agent={{ id: activityAgent.id, name: activityAgent.name, status: activityAgent.status }}
        onBack={() => setActivityAgent(null)}
        onViewRun={(run) => setRunDetail({ agent: activityAgent, run })}
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
            {tab === "agents" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-9 w-9 ${
                      columnsDrawerOpen
                        ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]"
                        : ""
                    }`}
                    aria-label="Customize columns"
                    aria-pressed={columnsDrawerOpen}
                    onClick={() => setColumnsDrawerOpen(true)}
                  >
                    <Columns3
                      className={`h-4 w-4 ${
                        columnsDrawerOpen ? "text-[#1E44CC]" : "text-[#555] dark:text-[#8b92a5]"
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Customize columns</TooltipContent>
              </Tooltip>
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

        {tab === "agents" && (() => {
          const metricCards: { key: string; node: React.ReactNode }[] = [
            { key: "reviewsResponded", node: <MetricCard label="Reviews responded" value={metrics.reviewsResponded} trend="+1.3%" /> },
            { key: "responseRate", node: <MetricCard label="Response rate" value={metrics.responseRate} trend="+1.3%" /> },
            { key: "avgResponseTime", node: <MetricCard label="Average response time" value={metrics.avgResponseTime} trend="+1.3%" /> },
            { key: "timeSaved", node: <MetricCard label="Time saved" value={metrics.timeSaved} trend="+1.3%" /> },
          ];
          if (columnState.visibility.reviewSpam) {
            metricCards.push({
              key: "reviewsSpammed",
              node: <MetricCard label="Reviews spammed" value={metrics.reviewsSpammed} trend="-0.4%" positive={false} customize />,
            });
          }
          const fitsWithoutScroll = metricCards.length <= 4;
          return (
            <div className="px-6 pt-6">
              {fitsWithoutScroll ? (
                <div
                  className="grid gap-5"
                  style={{ gridTemplateColumns: `repeat(${metricCards.length}, minmax(0, 1fr))` }}
                >
                  {metricCards.map((c) => (
                    <div key={c.key}>{c.node}</div>
                  ))}
                </div>
              ) : (
                <MetricScroller>
                  {metricCards.map((c) => (
                    <div key={c.key} className="min-w-[260px] flex-shrink-0">
                      {c.node}
                    </div>
                  ))}
                </MetricScroller>
              )}
            </div>
          );
        })()}

        {tab === "agents" && <div className="px-6 py-6">
          <div className="overflow-hidden rounded-[8px] border border-[#eaeaea] bg-white dark:border-[#252b35] dark:bg-[#1e2229]">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#eaeaea] bg-[#fafbfc] hover:bg-[#fafbfc] dark:border-[#252b35] dark:bg-[#181c24] dark:hover:bg-[#181c24]">
                  {orderedVisibleColumns.map((col) => (
                    <SortableHead
                      key={col.id}
                      label={col.label}
                      sortKey={col.sortKey}
                      activeKey={sortKey}
                      direction={sortDir}
                      onSort={handleSort}
                      className={col.width}
                    />
                  ))}
                  <TableHead className="w-[72px] px-5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSorted.map((agent) => (
                  <TableRow
                    key={agent.id}
                    className="border-b border-[#f0f2f5] last:border-b-0 hover:bg-[#fafbfc] dark:border-[#252b35] dark:hover:bg-[#181c24]"
                  >
                    {orderedVisibleColumns.map((col) => {
                      switch (col.id) {
                        case "name":
                          return (
                            <TableCell key={col.id} className="h-[72px] whitespace-normal px-5 py-5 text-[14px] font-light leading-[20px] tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
                              <button
                                type="button"
                                className="text-left font-light transition-colors hover:text-[#1976d2] dark:hover:text-[#60a5fa]"
                              >
                                {agent.name}
                              </button>
                            </TableCell>
                          );
                        case "status":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5">
                              <StatusBadge status={agent.status} />
                            </TableCell>
                          );
                        case "reviewsResponded":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                              {agent.reviewsResponded.toLocaleString()}
                            </TableCell>
                          );
                        case "responseRate":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                              {agent.responseRate}%
                            </TableCell>
                          );
                        case "avgResponseTime":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                              {agent.avgResponseTime}
                            </TableCell>
                          );
                        case "timeSaved":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                              {agent.timeSaved}
                            </TableCell>
                          );
                        case "locations":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5">
                              <LocationsCell count={agent.locations} locations={agent.locationNames} />
                            </TableCell>
                          );
                        case "reviewSpam":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5">
                              <ReviewSpamBadge value={agent.reviewSpam} />
                            </TableCell>
                          );
                        case "lastRun":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                              {agent.lastRun}
                            </TableCell>
                          );
                        case "createdBy":
                          return (
                            <TableCell key={col.id} className="h-[72px] px-5 py-5 text-[14px] text-[#212121] dark:text-[#e4e4e4]">
                              {agent.createdBy}
                            </TableCell>
                          );
                        default:
                          return null;
                      }
                    })}
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
                          <DropdownMenuItem
                            onSelect={() => setActivityAgent(agent)}
                            className="h-9 cursor-pointer rounded-[6px] px-3 text-[14px] text-[#374151] focus:bg-[#f3f4f6] focus:text-[#111827] dark:text-[#e4e4e4] dark:focus:bg-[#252b35] dark:focus:text-[#f3f4f6]"
                          >
                            Activity
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
                      colSpan={orderedVisibleColumns.length + 1}
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

      <ColumnsCustomizer
        open={columnsDrawerOpen}
        onOpenChange={setColumnsDrawerOpen}
        state={columnState}
        onChange={setColumnState}
      />
    </div>
  );
}
