import { useMemo } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Eye,
  Info,
  Sliders,
  Calendar,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
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

interface ActivityAgent {
  id: string;
  name: string;
  status: "Running" | "Paused" | "Draft";
}

type RunStatus = "Success" | "In progress" | "Failed";

export interface AgentRun {
  id: string;
  timestamp: string;
  status: RunStatus;
  duration: string;
  summary: string;
}

interface AgentActivityViewProps {
  agent: ActivityAgent;
  onBack: () => void;
  onViewRun?: (run: AgentRun) => void;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const AGENT_RUNS: AgentRun[] = [
  {
    id: "r1",
    timestamp: "Feb 25, 2024, 5:30 pm",
    status: "Success",
    duration: "8s",
    summary:
      "Detected service complaint (wait time), staff mention Maria T., severity high. Assembled empathetic reply in brand voice and posted to Google.",
  },
  {
    id: "r2",
    timestamp: "Feb 25, 2024, 4:12 pm",
    status: "Success",
    duration: "6s",
    summary:
      "Classified as spam — competitor mention and off-topic promotion detected. Alerted Devon S. to flag on Yelp.",
  },
  {
    id: "r3",
    timestamp: "Feb 25, 2024, 3:48 pm",
    status: "In progress",
    duration: "—",
    summary:
      "New 4-star Google review received. Extracting topics and mapping to business vocabulary.",
  },
  {
    id: "r4",
    timestamp: "Feb 25, 2024, 2:21 pm",
    status: "Failed",
    duration: "1m 12s",
    summary:
      "Drafted reply for 2-star Trustpilot review but post failed — source API returned 403.",
  },
  {
    id: "r5",
    timestamp: "Feb 25, 2024, 1:05 pm",
    status: "Success",
    duration: "11s",
    summary:
      "Mapped 5-star review topics to ambience and staff, flagged James R. mention. Replied in brand voice on Google.",
  },
  {
    id: "r6",
    timestamp: "Feb 25, 2024, 11:42 am",
    status: "In progress",
    duration: "—",
    summary:
      "Suspected spam — running content-policy check against Yelp source rules.",
  },
  {
    id: "r7",
    timestamp: "Feb 24, 2024, 9:18 pm",
    status: "Success",
    duration: "9s",
    summary:
      "Classified as spam — irrelevant promotional content. Alerted Priya K. to flag on Google.",
  },
  {
    id: "r8",
    timestamp: "Feb 24, 2024, 6:50 pm",
    status: "Failed",
    duration: "4s",
    summary:
      "Could not classify review — source content unavailable. Run halted before drafting.",
  },
  {
    id: "r9",
    timestamp: "Feb 24, 2024, 4:33 pm",
    status: "Success",
    duration: "7s",
    summary:
      "Detected billing complaint, scored severity medium, no staff mention. Assembled apology reply and posted to Trustpilot.",
  },
  {
    id: "r10",
    timestamp: "Feb 24, 2024, 2:11 pm",
    status: "Success",
    duration: "10s",
    summary:
      "5-star review with no actionable topics — assembled brief thank-you in brand voice and posted to Google.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RUN_STATUS_STYLES: Record<RunStatus, { dot: string; chip: string }> = {
  Success: {
    dot: "bg-[#4eac5d]",
    chip: "bg-[#f1faf0] text-[#377e2c] dark:bg-[#1f3a20] dark:text-[#86e08e]",
  },
  "In progress": {
    dot: "bg-[#d97706]",
    chip: "bg-[#fef3c7] text-[#92400e] dark:bg-[#3a2a12] dark:text-[#fbbf24]",
  },
  Failed: {
    dot: "bg-[#dc2626]",
    chip: "bg-[#fef2f2] text-[#b91c1c] dark:bg-[#2a1515] dark:text-[#fca5a5]",
  },
};

function RunStatusChip({ status }: { status: RunStatus }) {
  const s = RUN_STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-[12px] leading-[18px] tracking-[-0.24px] ${s.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="relative flex flex-col items-start gap-1 rounded-[8px] border border-[#eaeaea] bg-white px-5 py-7 dark:border-[#252b35] dark:bg-[#1e2229]">
      <div className="flex items-baseline gap-2">
        <span className="text-[26px] leading-9 tracking-[-0.48px] text-[#212121] dark:text-[#f3f4f6]">
          {value}
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
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AgentActivityView({ agent, onBack, onViewRun }: AgentActivityViewProps) {
  const metrics = useMemo(() => {
    const total = AGENT_RUNS.length;
    const success = AGENT_RUNS.filter((r) => r.status === "Success").length;
    const inProgress = AGENT_RUNS.filter((r) => r.status === "In progress").length;
    const failed = AGENT_RUNS.filter((r) => r.status === "Failed").length;
    return {
      total: total.toLocaleString(),
      success: success.toLocaleString(),
      inProgress: inProgress.toLocaleString(),
      failed: failed.toLocaleString(),
    };
  }, []);

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
              Activity for {agent.name}
            </h1>
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
            <MetricCard label="Total agent runs" value={metrics.total} />
            <MetricCard label="Successful runs" value={metrics.success} />
            <MetricCard label="In-progress runs" value={metrics.inProgress} />
            <MetricCard label="Failed runs" value={metrics.failed} />
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="overflow-hidden rounded-[8px] border border-[#eaeaea] bg-white dark:border-[#252b35] dark:bg-[#1e2229]">
            <Table className="table-fixed">
              <TableHeader>
                <TableRow className="border-b border-[#eaeaea] bg-[#fafbfc] hover:bg-[#fafbfc] dark:border-[#252b35] dark:bg-[#181c24] dark:hover:bg-[#181c24]">
                  <TableHead className="h-12 w-[220px] px-6 text-[13px] font-medium text-[#6b7280] dark:text-[#9ba2b0]">
                    Timestamp
                  </TableHead>
                  <TableHead className="h-12 w-[160px] px-6 text-[13px] font-medium text-[#6b7280] dark:text-[#9ba2b0]">
                    Status
                  </TableHead>
                  <TableHead className="h-12 w-[140px] px-6 text-[13px] font-medium text-[#6b7280] dark:text-[#9ba2b0]">
                    Duration
                  </TableHead>
                  <TableHead className="h-12 px-6 text-[13px] font-medium text-[#6b7280] dark:text-[#9ba2b0]">
                    Summary
                  </TableHead>
                  <TableHead className="h-12 w-[72px] px-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGENT_RUNS.map((run) => (
                  <TableRow
                    key={run.id}
                    className="group border-b border-[#f0f2f5] last:border-b-0 hover:bg-[#fafbfc] dark:border-[#252b35] dark:hover:bg-[#181c24]"
                  >
                    <TableCell className="px-6 py-5 align-top text-[14px] leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
                      {run.timestamp}
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top">
                      <RunStatusChip status={run.status} />
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top text-[14px] leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
                      {run.duration}
                    </TableCell>
                    <TableCell className="whitespace-normal px-6 py-5 align-top text-[14px] leading-5 tracking-[-0.28px] text-[#374151] dark:text-[#e4e4e4]">
                      <div className="line-clamp-2 whitespace-normal">{run.summary}</div>
                    </TableCell>
                    <TableCell className="px-6 py-5 align-top text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => onViewRun?.(run)}
                            aria-label="View run details"
                            className="ml-auto flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#e5e9f0] bg-white opacity-0 transition-opacity hover:bg-[#f0f0f0] focus-visible:opacity-100 group-hover:opacity-100 dark:border-[#333a47] dark:bg-[#262b35] dark:hover:bg-[#2e3340]"
                          >
                            <Eye className="h-[14px] w-[14px] text-[#303030] dark:text-[#bbb]" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>View run</TooltipContent>
                      </Tooltip>
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
