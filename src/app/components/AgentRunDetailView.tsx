import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Bot,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Maximize2,
  MoreVertical,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react";

function TaskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="6.25" x2="11" y2="6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="9.75" x2="11" y2="9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { useRequestChromeless } from "@/app/context/ChromeContext";

// ─── First-load animation flag ────────────────────────────────────────────────
// Toggle this to revert to the no-animation version. When false, no staggered
// delays are applied — all cards & RHS steps render with their default mount
// animation only.
const ENABLE_FIRST_LOAD_ANIMATIONS = true;
const STAGGER_MS = 220;

function staggerStyle(delayMs: number): React.CSSProperties | undefined {
  if (!ENABLE_FIRST_LOAD_ANIMATIONS || delayMs <= 0) return undefined;
  return { animationDelay: `${delayMs}ms`, animationFillMode: "backwards" };
}

// ─── Types ────────────────────────────────────────────────────────────────────

type RunStatus = "Success" | "In progress" | "Failed";
type NodeRunStatus = "success" | "failed" | "in-progress" | "skipped" | "pending";

interface RunAgent {
  id: string;
  name: string;
  status: "Running" | "Paused" | "Draft";
}

interface RunRecord {
  id: string;
  timestamp: string;
  status: RunStatus;
  duration: string;
  summary: string;
}

interface AgentRunDetailViewProps {
  agent: RunAgent;
  run: RunRecord;
  onBack: () => void;
}

// ─── Workflow node ids (canonical Review Response agent) ──────────────────────

const NODE = {
  trigger: "trigger",
  triage: "triage",
  branch: "branch",
  respondLane: "lane.respond",
  noConditionsLane: "lane.noConditions",
  respondExtract: "respond.extract",
  respondGenerate: "respond.generate",
  respondResponder: "respond.responder",
  noConditionsEmail: "noConditions.email",
} as const;

// ─── Per-run node execution map ───────────────────────────────────────────────

function buildNodeStatuses(run: RunRecord): Record<string, NodeRunStatus> {
  const all: Record<string, NodeRunStatus> = {
    [NODE.trigger]: "skipped",
    [NODE.triage]: "skipped",
    [NODE.branch]: "skipped",
    [NODE.respondExtract]: "skipped",
    [NODE.respondGenerate]: "skipped",
    [NODE.respondResponder]: "skipped",
    [NODE.noConditionsEmail]: "skipped",
  };

  const summary = run.summary.toLowerCase();
  const tookSpamPath = summary.includes("spam") || summary.includes("alert");
  const failedAtClassify =
    summary.includes("could not classify") ||
    summary.includes("source content unavailable");
  const failedAtPost =
    summary.includes("post failed") ||
    summary.includes("api returned");

  if (run.status === "In progress") {
    all[NODE.trigger] = "success";
    all[NODE.triage] = "in-progress";
    return all;
  }

  if (run.status === "Failed") {
    if (failedAtClassify) {
      all[NODE.trigger] = "success";
      all[NODE.triage] = "failed";
      return all;
    }
    if (failedAtPost) {
      all[NODE.trigger] = "success";
      all[NODE.triage] = "success";
      all[NODE.branch] = "success";
      all[NODE.respondExtract] = "success";
      all[NODE.respondGenerate] = "success";
      all[NODE.respondResponder] = "failed";
      return all;
    }
    all[NODE.trigger] = "success";
    all[NODE.triage] = "failed";
    return all;
  }

  // Success
  all[NODE.trigger] = "success";
  all[NODE.triage] = "success";
  all[NODE.branch] = "success";
  if (tookSpamPath) {
    all[NODE.noConditionsEmail] = "success";
  } else {
    all[NODE.respondExtract] = "success";
    all[NODE.respondGenerate] = "success";
    all[NODE.respondResponder] = "success";
  }
  return all;
}

// ─── Status visuals ───────────────────────────────────────────────────────────

const STATUS_RING: Record<NodeRunStatus, string> = {
  success: "ring-2 ring-[#37a248] dark:ring-[#86e08e]",
  failed: "ring-2 ring-[#dc2626] dark:ring-[#fca5a5]",
  "in-progress": "ring-2 ring-[#d97706] dark:ring-[#fbbf24]",
  skipped: "ring-1 ring-transparent",
  pending: "ring-1 ring-transparent",
};

const STATUS_DOT: Record<NodeRunStatus, string> = {
  success: "bg-[#37a248]",
  failed: "bg-[#dc2626]",
  "in-progress": "bg-[#d97706]",
  skipped: "bg-[#c4cbd6]",
  pending: "bg-[#c4cbd6]",
};

function RunStatusChip({ status }: { status: RunStatus }) {
  const styles: Record<RunStatus, string> = {
    Success:
      "bg-[#f1faf0] text-[#377e2c] dark:bg-[#1f3a20] dark:text-[#86e08e]",
    "In progress":
      "bg-[#fef3c7] text-[#92400e] dark:bg-[#3a2a12] dark:text-[#fbbf24]",
    Failed:
      "bg-[#fef2f2] text-[#b91c1c] dark:bg-[#2a1515] dark:text-[#fca5a5]",
  };
  const dot: Record<RunStatus, string> = {
    Success: "bg-[#4eac5d]",
    "In progress": "bg-[#d97706]",
    Failed: "bg-[#dc2626]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-[12px] leading-[18px] tracking-[-0.24px] ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

// ─── Card primitives (visually match builder; no edit affordances) ────────────

const CARD_WIDTH = "w-[400px]";

function NodeCard({
  status,
  children,
  delayMs = 0,
}: {
  status: NodeRunStatus;
  children: React.ReactNode;
  delayMs?: number;
}) {
  return (
    <div
      style={staggerStyle(delayMs)}
      className={`flex ${CARD_WIDTH} flex-col gap-2 rounded-xl bg-white p-4 text-left shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-[box-shadow,transform] duration-200 ease-out animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-300 dark:bg-[#262b35] ${STATUS_RING[status]}`}
    >
      {children}
    </div>
  );
}

function CardEyebrow({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
        {icon}
        {label}
      </span>
      {right}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium leading-5 text-[#212121] dark:text-[#f3f4f6]">
      {children}
    </p>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="line-clamp-2 text-xs leading-[18px] text-[#6b7280] dark:text-[#9ba2b0]">
      {children}
    </p>
  );
}

function Connector() {
  return <span className="my-2 h-6 w-px bg-[#c4cbd6] dark:bg-[#3d4555]" />;
}

function EndChip() {
  return (
    <span className="rounded-[4px] bg-[#eaeaea] px-2 py-0.5 text-[12px] leading-[18px] tracking-[-0.24px] text-[#555] dark:bg-[#252b35] dark:text-[#9ba2b0]">
      End
    </span>
  );
}

function LaneChip({ label }: { label: string }) {
  return (
    <span className="max-w-[200px] truncate rounded border border-[#e5e9f0] bg-white px-3 py-1 text-xs text-[#212121] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#f3f4f6]">
      {label}
    </span>
  );
}

// ─── Chart ────────────────────────────────────────────────────────────────────

function CanvasToolButton({
  children,
  ariaLabel,
  onClick,
  title,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
    >
      {children}
    </button>
  );
}

function CanvasToolbar({
  zoom,
  onFit,
}: {
  zoom: number;
  onFit: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
      <div className="pointer-events-auto flex h-10 items-center gap-1 rounded-md border border-[#e5e9f0] bg-white px-1 shadow-[0_1px_3px_rgba(15,23,42,0.06)] animate-in fade-in slide-in-from-top-2 duration-300 dark:border-[#333a47] dark:bg-[#1e2229]">
        <CanvasToolButton ariaLabel="Download">
          <ArrowDownToLine className="h-4 w-4" />
        </CanvasToolButton>
        <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
        <CanvasToolButton ariaLabel="Direction">
          <ArrowRight className="h-4 w-4" />
        </CanvasToolButton>
        <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
        <CanvasToolButton ariaLabel="Fit to view" title="Fit to view" onClick={onFit}>
          <Maximize2 className="h-4 w-4" />
        </CanvasToolButton>
        <span className="flex h-8 items-center gap-1 rounded px-2 text-sm text-[#212121] dark:text-[#e4e4e4]">
          {Math.round(zoom * 100)}%
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}

function WorkflowChart({
  agentName,
  nodeStatuses,
}: {
  agentName: string;
  nodeStatuses: Record<string, NodeRunStatus>;
}) {
  // Pan/zoom — same UX as the builder canvas
  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 2;
  const outerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ panX: 0, panY: 80, zoom: 1 });
  const [spacePan, setSpacePan] = useState(false);
  const panDragRef = useRef<{ startX: number; startY: number; pan0X: number; pan0Y: number } | null>(null);

  // Spacebar hold → grab cursor pan
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const t = e.target as HTMLElement | null;
      if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable) return;
      e.preventDefault();
      setSpacePan(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpacePan(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Wheel: ⌘/Ctrl + wheel = zoom around cursor; plain wheel = pan
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const rect = outer.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top;
        setViewport((v) => {
          const factor = Math.exp(-e.deltaY * 0.0015);
          const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v.zoom * factor));
          const ratio = nextZoom / v.zoom;
          return {
            zoom: nextZoom,
            panX: cx - (cx - v.panX) * ratio,
            panY: cy - (cy - v.panY) * ratio,
          };
        });
      } else {
        e.preventDefault();
        setViewport((v) => ({ ...v, panX: v.panX - e.deltaX, panY: v.panY - e.deltaY }));
      }
    };
    outer.addEventListener("wheel", onWheel, { passive: false });
    return () => outer.removeEventListener("wheel", onWheel);
  }, []);

  // Mouse-drag pan (anywhere on the canvas; with spacebar held, also through cards)
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const t = e.target as HTMLElement;
    const onInteractive = !!t.closest('button, input, select, textarea, [role="button"]');
    if (onInteractive && !spacePan) return;
    e.preventDefault();
    panDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      pan0X: viewport.panX,
      pan0Y: viewport.panY,
    };
    const onMove = (ev: MouseEvent) => {
      if (!panDragRef.current) return;
      setViewport((v) => ({
        ...v,
        panX: panDragRef.current!.pan0X + (ev.clientX - panDragRef.current!.startX),
        panY: panDragRef.current!.pan0Y + (ev.clientY - panDragRef.current!.startY),
      }));
    };
    const onUp = () => {
      panDragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const fitToView = () => {
    const outer = outerRef.current;
    const content = contentRef.current;
    if (!outer || !content) return;
    const oRect = outer.getBoundingClientRect();
    const cRect = content.getBoundingClientRect();
    const naturalW = cRect.width / viewport.zoom;
    const naturalH = cRect.height / viewport.zoom;
    if (naturalW === 0 || naturalH === 0) return;
    const padding = 80;
    const fitZoom = Math.min(
      MAX_ZOOM,
      Math.max(
        MIN_ZOOM,
        Math.min((oRect.width - padding * 2) / naturalW, (oRect.height - padding * 2) / naturalH),
      ),
    );
    setViewport({
      zoom: fitZoom,
      panX: 0,
      panY: (oRect.height - naturalH * fitZoom) / 2,
    });
  };

  // Lane execution → dim the path the run did NOT take
  const respondLaneExecuted =
    nodeStatuses[NODE.respondExtract] !== "skipped" ||
    nodeStatuses[NODE.respondGenerate] !== "skipped" ||
    nodeStatuses[NODE.respondResponder] !== "skipped";
  const noConditionsLaneExecuted = nodeStatuses[NODE.noConditionsEmail] !== "skipped";
  const respondDimClass =
    !respondLaneExecuted && noConditionsLaneExecuted ? "opacity-40" : "";
  const noConditionsDimClass =
    !noConditionsLaneExecuted && respondLaneExecuted ? "opacity-40" : "";

  return (
    <div
      ref={outerRef}
      onMouseDown={handleCanvasMouseDown}
      className={`relative h-full w-full select-none overflow-hidden ${
        spacePan || panDragRef.current ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(15,23,42,0.08) 1px, transparent 1px)",
        backgroundSize: `${24 * viewport.zoom}px ${24 * viewport.zoom}px`,
        backgroundPosition: `${viewport.panX}px ${viewport.panY}px`,
      }}
    >
      <CanvasToolbar zoom={viewport.zoom} onFit={fitToView} />

      <div
        ref={contentRef}
        style={{
          transform: `translate(calc(-50% + ${viewport.panX}px), ${viewport.panY}px) scale(${viewport.zoom})`,
          transformOrigin: "50% 0",
        }}
        className="absolute left-1/2 top-0"
      >
        <div className="flex flex-col items-center">
        {/* Agent header — pill, smaller than the workflow cards (matches builder) */}
        <div className="flex w-[280px] flex-col gap-2 rounded-full bg-white px-5 py-3 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-transparent dark:bg-[#262b35]">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 shrink-0 text-[#6834b7] dark:text-[#b39ae5]" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
                {agentName}
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                All locations
              </span>
            </div>
          </div>
        </div>

        <Connector />

        {/* Trigger */}
        <NodeCard status={nodeStatuses[NODE.trigger]} delayMs={STAGGER_MS * 1}>
          <CardEyebrow
            icon={<Zap className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />}
            label="Trigger"
            right={<MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />}
          />
          <CardTitle>1. When a new review is received or updated</CardTitle>
          <CardDescription>
            Agent triggers on new or updated reviews across all sources and locations
          </CardDescription>
        </NodeCard>

        <Connector />

        {/* Triage task */}
        <NodeCard status={nodeStatuses[NODE.triage]} delayMs={STAGGER_MS * 2}>
          <CardEyebrow
            icon={<TaskIcon className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
            label="Task"
            right={
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />
                <Switch checked disabled />
                <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
              </div>
            }
          />
          <CardTitle>2. Triage review</CardTitle>
          <CardDescription>
            The system checks the review to decide whether a response is required based on
            whether it is a genuine customer review or spam content that is irrelevant to
            the business or in any way violates the content policy of the source.
          </CardDescription>
        </NodeCard>

        <Connector />

        {/* Branch */}
        <NodeCard status={nodeStatuses[NODE.branch]} delayMs={STAGGER_MS * 3}>
          <CardEyebrow
            icon={<GitBranch className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
            label="Branch"
            right={
              <div className="flex items-center gap-2">
                <Switch checked disabled />
                <Plus className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
              </div>
            }
          />
          <CardTitle>3. Based on conditions</CardTitle>
          <CardDescription>Build condition-specific flows</CardDescription>
        </NodeCard>

        {/* Branch lanes — wrapped to match builder visual */}
        <Connector />
        <div className="rounded-2xl border-2 border-[#c4cbd6]/60 bg-white/30 p-4 dark:border-[#3d4555]/60 dark:bg-[#1e2229]/30">
          <div className="flex items-start gap-6">
            {/* Lane: Respond */}
            <div className={`flex min-w-[360px] flex-col items-center gap-1 transition-opacity duration-300 ${respondDimClass}`}>
              <LaneChip label="Respond" />
              <Connector />
              <NodeCard status={nodeStatuses[NODE.respondExtract]} delayMs={STAGGER_MS * 4}>
                <CardEyebrow
                  icon={<TaskIcon className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
                  label="Task"
                  right={
                    <div className="flex items-center gap-2">
                      <Bot className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />
                      <Switch checked disabled />
                      <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                    </div>
                  }
                />
                <CardTitle>4. Review Details Extraction</CardTitle>
                <CardDescription>
                  Detects what the reviewer is talking about, maps it to the
                  business&rsquo;s vocabulary, scores severity, identifies staff mentioned
                  and competitors, and flags relevant business context details.
                </CardDescription>
              </NodeCard>
              <Connector />
              <NodeCard status={nodeStatuses[NODE.respondGenerate]} delayMs={STAGGER_MS * 5}>
                <CardEyebrow
                  icon={<TaskIcon className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
                  label="Task"
                  right={
                    <div className="flex items-center gap-2">
                      <Bot className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />
                      <Switch checked disabled />
                      <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                    </div>
                  }
                />
                <CardTitle>5. Response Generation</CardTitle>
                <CardDescription>
                  Assemble the final message using the drafted strategy, the extracted
                  details, and the brand voice.
                </CardDescription>
              </NodeCard>
              <Connector />
              <NodeCard status={nodeStatuses[NODE.respondResponder]} delayMs={STAGGER_MS * 6}>
                <CardEyebrow
                  icon={<TaskIcon className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
                  label="Task"
                  right={
                    <div className="flex items-center gap-2">
                      <Bot className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />
                      <Switch checked disabled />
                      <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                    </div>
                  }
                />
                <CardTitle>6. Review responder</CardTitle>
                <CardDescription>
                  Reply to the review using the generated response.
                </CardDescription>
              </NodeCard>
            </div>

            {/* Lane: No conditions met */}
            <div className={`flex min-w-[360px] flex-col items-center gap-1 transition-opacity duration-300 ${noConditionsDimClass}`}>
              <LaneChip label="No conditions met" />
              <Connector />
              <NodeCard status={nodeStatuses[NODE.noConditionsEmail]} delayMs={STAGGER_MS * 4}>
                <CardEyebrow
                  icon={<TaskIcon className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
                  label="Task"
                  right={
                    <div className="flex items-center gap-2">
                      <Bot className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />
                      <Switch checked disabled />
                      <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                    </div>
                  }
                />
                <CardTitle>7. Send an email alert</CardTitle>
                <CardDescription>
                  Alerts specific users when a review has been marked as SPAM and user has
                  to take an action to flag it on the review site.
                </CardDescription>
              </NodeCard>
            </div>
          </div>
        </div>

        <Connector />
        <EndChip />
        </div>
      </div>
    </div>
  );
}

// ─── Test details RHS panel ───────────────────────────────────────────────────

interface RunStep {
  number: number;
  label: string;
  type: "Trigger" | "Task" | "Branch";
  status: NodeRunStatus;
  output?: Array<{ key: string; value: string }>;
  groups?: Array<{ name: string; properties: Array<{ key: string; value: string }> }>;
  toolName?: string;
  errorMessage?: string;
}

function buildSteps(_run: RunRecord, ns: Record<string, NodeRunStatus>): RunStep[] {
  const all: RunStep[] = [
    {
      number: 1,
      label: "When a new review is received or updated",
      type: "Trigger",
      status: ns[NODE.trigger],
      output: [
        { key: "Source", value: "Google" },
        { key: "Source type", value: "Google" },
        { key: "Received at", value: "Feb 25, 2024 5:30 pm" },
      ],
    },
    {
      number: 2,
      label: "Triage analysis",
      type: "Task",
      status: ns[NODE.triage],
      output: [
        { key: "Source", value: "Google" },
        { key: "Rating", value: "2 Star" },
        {
          key: "Comments",
          value:
            "Terrible experience at Aspen Dental on Oak street. I waited over 45 minutes past my scheduled appointment",
        },
        { key: "Source type", value: "Google" },
        { key: "Has comment", value: "True" },
        { key: "Has edit", value: "True" },
      ],
      groups: [
        {
          name: "Reviewer",
          properties: [{ key: "Name", value: "Sarah Jones" }],
        },
        {
          name: "Contact",
          properties: [
            { key: "Email", value: "Sarah.Jones@birdeye.com" },
            { key: "ID", value: "Bird_82391" },
          ],
        },
      ],
      toolName: "Tool : Triage classifier",
      errorMessage:
        ns[NODE.triage] === "failed"
          ? "Could not classify review — source content unavailable. Run halted before drafting."
          : undefined,
    },
    {
      number: 3,
      label: "Based on conditions",
      type: "Branch",
      status: ns[NODE.branch],
      output: [
        { key: "Decision", value: ns[NODE.noConditionsEmail] !== "skipped" ? "No conditions met" : "Respond" },
        { key: "Matched lane", value: ns[NODE.noConditionsEmail] !== "skipped" ? "No conditions met" : "Respond" },
      ],
    },
    {
      number: 4,
      label: "Review Details Extraction",
      type: "Task",
      status: ns[NODE.respondExtract],
      output: [
        { key: "Topics", value: "service, wait time" },
        { key: "Severity", value: "High" },
        { key: "Staff mention", value: "Maria T." },
        { key: "Competitors", value: "—" },
      ],
      toolName: "Tool : Detail extractor",
    },
    {
      number: 5,
      label: "Response Generation",
      type: "Task",
      status: ns[NODE.respondGenerate],
      output: [
        { key: "Tone", value: "Empathetic" },
        { key: "Length", value: "187 chars" },
        {
          key: "Draft",
          value:
            "Hi Sarah, we're sorry for the long wait at our Oak street location. Your time matters and we'll be reaching out directly to make this right.",
        },
      ],
      toolName: "Tool : Response writer",
    },
    {
      number: 6,
      label: "Review responder",
      type: "Task",
      status: ns[NODE.respondResponder],
      output: [
        { key: "Posted", value: ns[NODE.respondResponder] === "success" ? "True" : "False" },
        { key: "Response ID", value: "r_8821" },
        { key: "Posted at", value: "Feb 25, 2024 5:30:42 pm" },
      ],
      toolName: "Tool : Review responder",
      errorMessage:
        ns[NODE.respondResponder] === "failed"
          ? "Drafted reply for 2-star review but post failed — source API returned 403."
          : undefined,
    },
    {
      number: 7,
      label: "Send an email alert",
      type: "Task",
      status: ns[NODE.noConditionsEmail],
      output: [
        { key: "Recipient", value: "devon.s@birdeye.com" },
        { key: "Subject", value: "Spam alert: Yelp review #4421" },
        { key: "Sent", value: ns[NODE.noConditionsEmail] === "success" ? "True" : "False" },
      ],
      toolName: "Tool : Email sender",
    },
  ];
  return all.filter((step) => step.status !== "skipped");
}

function StepStatusIcon({ status }: { status: NodeRunStatus }) {
  if (status === "success") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#37a248] text-white">
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#dc2626] text-white">
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#d97706] bg-white">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
      </span>
    );
  }
  return <span className="block h-4 w-4 rounded-full border border-[#c4cbd6] bg-white" />;
}

function StepTypeLabel({ type, status }: { type: RunStep["type"]; status: NodeRunStatus }) {
  const colors: Record<RunStep["type"], string> = {
    Trigger: "text-[#5071ce] dark:text-[#7cb6f0]",
    Task: "text-[#37a248] dark:text-[#86e08e]",
    Branch: "text-[#5071ce] dark:text-[#7cb6f0]",
  };
  const failed = status === "failed";
  const colorClass = failed ? "text-[#dc2626] dark:text-[#fca5a5]" : colors[type];
  return (
    <span className={`inline-flex items-center gap-1 text-[12px] leading-[15px] ${colorClass}`}>
      {type === "Trigger" ? (
        <Zap className="h-3.5 w-3.5" />
      ) : type === "Task" ? (
        <TaskIcon className="h-3.5 w-3.5" />
      ) : (
        <GitBranch className="h-3.5 w-3.5" />
      )}
      {type}
    </span>
  );
}

function PillKey({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-[4px] border border-[#d9e3ed] bg-white pr-1.5 dark:border-[#333a47] dark:bg-[#262b35]">
      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[3px] bg-[#ecf5fd] text-[9px] font-medium text-[#1a75d1] dark:bg-[#16324a] dark:text-[#7cb6f0]">
        {"{·}"}
      </span>
      <span className="text-[11px] text-[#545454] dark:text-[#9ba2b0]">{label}</span>
    </span>
  );
}

function OutputRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <PillKey label={k} />
      <span className="text-[12px] leading-[18px] tracking-[-0.24px] text-[#212121] dark:text-[#e4e4e4]">{v}</span>
    </div>
  );
}

function StepCard({
  step,
  isFirst,
  isLast,
  delayMs = 0,
}: {
  step: RunStep;
  isFirst: boolean;
  isLast: boolean;
  delayMs?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const [outputOpen, setOutputOpen] = useState(true);
  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({});

  const toggleGroup = (name: string) =>
    setGroupOpen((s) => ({ ...s, [name]: !s[name] }));

  // Icon geometry relative to step top:
  //   pt-5 (20) + mt-0.5 (2) = 22px → icon top
  //   icon is h-4 (16) → icon center at 30px, icon bottom at 38px
  // Rail is centered horizontally on the icon (icon left = 19, center = 27, so left-[26px] for a 1px line).
  const railStyle: React.CSSProperties = {
    top: isFirst ? 22 : 0,
    ...(isLast ? { height: isFirst ? 8 : 30 } : { bottom: 0 }),
  };

  return (
    <div
      style={staggerStyle(delayMs)}
      className="relative animate-in fade-in slide-in-from-top-1 duration-300"
    >
      {/* Rail running through the icon column. Spans top-to-bottom on middle steps;
          starts at icon-top on the first step; ends at icon-center on the last step. */}
      <span
        className="pointer-events-none absolute left-[26px] w-px bg-[#e5e9f0] dark:bg-[#333a47]"
        style={railStyle}
      />

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-2.5 px-4 pt-5 text-left"
      >
        <span className="relative z-10 mt-0.5 ml-[3px] shrink-0">
          <StepStatusIcon status={step.status} />
        </span>
        <div className="flex flex-1 flex-col gap-1 pl-1.5">
          <StepTypeLabel type={step.type} status={step.status} />
          <span className="text-[14px] leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
            {step.number}. {step.label}
          </span>
        </div>
        <ChevronDown
          className={`mt-1 h-4 w-4 shrink-0 text-[#6b7280] transition-transform ${
            expanded ? "" : "-rotate-90"
          }`}
        />
      </button>

      {expanded && (
        <div className="pb-6 pl-[40px] pr-4 pt-3">
          {step.errorMessage && (
            <div className="mb-3 rounded-[6px] border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-[12px] leading-[18px] tracking-[-0.24px] text-[#b91c1c] dark:border-[#7f1d1d] dark:bg-[#2a1515] dark:text-[#fca5a5]">
              {step.errorMessage}
            </div>
          )}

          {step.output && step.output.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setOutputOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-[4px] py-0.5 text-[12px] leading-[18px] tracking-[-0.24px] text-[#1976d2] dark:text-[#5b9bf5]"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${outputOpen ? "rotate-90" : ""}`} />
                Task output
              </button>

              {outputOpen && (
                <div className="ml-2 mt-2 flex flex-col gap-2.5 border-l border-[#e5e9f0] pl-4 dark:border-[#333a47]">
                  {step.output.map((row) => (
                    <OutputRow key={row.key} k={row.key} v={row.value} />
                  ))}

                  {step.groups?.map((group) => {
                    const open = groupOpen[group.name] ?? true;
                    return (
                      <div key={group.name} className="flex flex-col gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.name)}
                          className="flex items-center gap-1.5 text-[12px] leading-[18px] tracking-[-0.24px] text-[#8f8f8f] dark:text-[#9ba2b0]"
                        >
                          <ChevronRight className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`} />
                          <span>{group.name}</span>
                          <span>{`{ ${group.properties.length} properties }`}</span>
                        </button>
                        {open && (
                          <div className="ml-2 flex flex-col gap-2.5 border-l border-[#e5e9f0] pl-4 dark:border-[#333a47]">
                            {group.properties.map((p) => (
                              <OutputRow key={p.key} k={p.key} v={p.value} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {step.toolName && (
                <button
                  type="button"
                  className="mt-3 flex items-center gap-1.5 text-[12px] leading-[18px] tracking-[-0.24px] text-[#1976d2] dark:text-[#5b9bf5]"
                >
                  <ChevronRight className="h-4 w-4" />
                  {step.toolName}
                </button>
              )}

              <button
                type="button"
                className="mt-2 flex items-center gap-1.5 text-[12px] leading-[18px] tracking-[-0.24px] text-[#1976d2] dark:text-[#5b9bf5]"
              >
                <ChevronRight className="h-4 w-4" />
                View inputs
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function TestDetailsPanel({ steps }: { steps: RunStep[] }) {
  return (
    <aside className="m-4 flex w-[340px] shrink-0 flex-col self-stretch overflow-hidden rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] animate-in slide-in-from-right-4 fade-in duration-300 ease-out dark:bg-[#1e2229]">
      <header className="flex items-center justify-between border-b border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <h3 className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
          Test details
        </h3>
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {steps.map((step, i) => (
          <StepCard
            key={`${step.number}-${step.label}`}
            step={step}
            isFirst={i === 0}
            isLast={i === steps.length - 1}
            delayMs={STAGGER_MS * (i + 1)}
          />
        ))}
      </div>
    </aside>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AgentRunDetailView({ agent, run, onBack }: AgentRunDetailViewProps) {
  useRequestChromeless(true);
  const nodeStatuses = useMemo(() => buildNodeStatuses(run), [run]);
  const steps = useMemo(() => buildSteps(run, nodeStatuses), [run, nodeStatuses]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#1e2229]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#e5e9f0] bg-white dark:border-[#333a47] dark:bg-[#1e2229]">
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={onBack}
              aria-label="Back to activity"
            >
              <ArrowLeft className="h-4 w-4 text-[#555] dark:text-[#9ba2b0]" />
            </Button>
            <h1 className="truncate text-[18px] leading-[26px] tracking-[-0.36px] text-[#212121] dark:text-[#f3f4f6]">
              Run · {run.timestamp}
            </h1>
            <RunStatusChip status={run.status} />
            <span className="text-[13px] leading-5 tracking-[-0.26px] text-[#6b7280] dark:text-[#9ba2b0]">
              {run.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 bg-[#f4f6f7] dark:bg-[#1a1d23]">
        <div className="relative flex-1 min-w-0">
          <WorkflowChart agentName={agent.name} nodeStatuses={nodeStatuses} />
        </div>
        <TestDetailsPanel steps={steps} />
      </div>
    </div>
  );
}

