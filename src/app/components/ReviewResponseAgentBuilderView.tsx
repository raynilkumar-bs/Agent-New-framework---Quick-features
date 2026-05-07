import { Fragment, useEffect, useRef, useState, type DragEvent as ReactDragEvent } from "react";
import {
  ArrowLeft,
  CloudUpload,
  Paperclip,
  PencilLine,
  MoreHorizontal,
  ArrowUp,
  Sparkles,
  Plus,
  Star,
  Workflow,
  ChevronDown,
  BookOpen,
  X,
  Search,
  Clock,
  MessageSquare,
  MapPin,
  Users,
  ClipboardCheck,
  Ticket,
  Grid3x3,
  ChevronRight,
  ArrowRight,
  ArrowDownToLine,
  Play,
  Info,
  Zap,
  MoreVertical,
  Maximize2,
  GripVertical,
  ClipboardList,
  Braces,
  Link as LinkIcon,
  Workflow as WorkflowIcon,
  GitBranch,
  Wand2,
  Command,
  ExternalLink,
  Check,
  Undo2,
  Redo2,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
  PROMPT_INPUT_PRIMARY_ICON_SEND_CLASSNAME,
} from "@/app/components/ui/prompt-input";
import { useRequestChromeless } from "@/app/context/ChromeContext";
import { ContextPickerDialog } from "@/app/components/ContextPickerDialog";
import { BranchConfigPanel } from "@/app/components/BranchConfigPanel";

function TaskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5" y1="6.25" x2="11" y2="6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="9.75" x2="11" y2="9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface Props {
  onBack: () => void;
}

const PROMPT_SUGGESTIONS = [
  "Replying using templates",
  "Replying autonomously",
  "Replying after human approval",
  "Suggesting replies in dashboard",
];

type BuilderTab = "ai" | "manual";

const LIBRARY_TEMPLATES = [
  {
    id: "templates",
    title: "Review response agent replying using templates",
    description: "Uses pre-defined templates and responds to reviews automatically",
  },
  {
    id: "autonomous",
    title: "Review response agent replying autonomously",
    description:
      "Uses AI to analyze review sentiment, generates and posts unique, context aware replies automatically",
  },
  {
    id: "human-approval",
    title: "Review response agent replying after human approval",
    description:
      "Uses AI to analyze review sentiment, generates and sends unique, context-aware replies for a human approval before posting",
  },
  {
    id: "suggesting",
    title: "Review response agent suggesting replies in dashboard",
    description:
      "Uses AI to analyze review sentiment, generates and shows unique, context-aware replies in the dashboard for one-click manual posting",
  },
];

interface TriggerSubOption {
  id: string;
  label: string;
  description: string;
}

interface TriggerSourceOption {
  id: string;
  label: string;
  icon: typeof Clock;
  subOptions?: TriggerSubOption[];
}

const TRIGGER_OPTIONS: TriggerSourceOption[] = [
  { id: "schedule", label: "Schedule-based", icon: Clock },
  {
    id: "review",
    label: "Reviews",
    icon: Star,
    subOptions: [
      {
        id: "review-new",
        label: "When a new review is received",
        description: "Agent triggers when a new review is received from any source",
      },
      {
        id: "review-updated",
        label: "When a review is updated",
        description: "Agent triggers when an existing review is edited or updated",
      },
      {
        id: "review-responded",
        label: "When a review is responded",
        description: "Agent triggers when a reply is posted to a review",
      },
      {
        id: "review-new-or-updated",
        label: "When a new review is received or updated",
        description: "Agent triggers on new or updated reviews across all sources and locations",
      },
    ],
  },
  { id: "inbox", label: "Inbox", icon: MessageSquare },
  { id: "listing", label: "Listings", icon: MapPin },
  { id: "social", label: "Social", icon: Users },
  { id: "survey", label: "Surveys", icon: ClipboardCheck },
  { id: "ticketing", label: "Ticketing", icon: Ticket },
  { id: "external", label: "External", icon: Grid3x3 },
];

const TRIGGER_DRAG_MIME = "application/x-aero-trigger";
const TASK_DRAG_MIME = "application/x-aero-task";
const TASK_REORDER_MIME = "application/x-aero-task-reorder";
const BRANCH_DRAG_MIME = "application/x-aero-branch";
const NODE_REORDER_MIME = "application/x-aero-node-reorder";

function popoutSectionLabel(label: string): string {
  return label.replace(/\s+(event|task)$/i, "").trim();
}

interface PlacedTrigger {
  /** Parent trigger type, e.g. "review", "schedule". Drives the type picker. */
  typeId: string;
  subId: string;
  label: string;
  description: string;
}

interface PlacedTask {
  /** Stable id for selection / array updates. */
  id: string;
  kind: "task";
  subId: string;
  label: string;
  description: string;
  prompt: string;
  enabled: boolean;
}

interface BranchCondition {
  id: string;
  variable: string;
  operator: string;
  value: string;
}

interface BranchLane {
  id: string;
  name: string;
  /** The auto-added "No conditions met" lane — always last, always present, only the name is editable. */
  isDefault: boolean;
  conditions: BranchCondition[];
  /** Length is conditions.length - 1; conditions[i] {connector} conditions[i+1]. */
  connectors: ("AND" | "OR")[];
  nodes: WorkflowNode[];
}

interface PlacedBranch {
  id: string;
  kind: "branch";
  label: string;
  description: string;
  branchType: string;
  enabled: boolean;
  lanes: BranchLane[];
}

type WorkflowNode = PlacedTask | PlacedBranch;

type CanvasSelection =
  | { kind: "agent" }
  | { kind: "trigger" }
  | { kind: "task"; taskId: string }
  | { kind: "branch"; branchId: string }
  | null;

interface TaskSubOption {
  id: string;
  label: string;
  description: string;
  systemPrompt?: string;
}

interface TaskSourceOption {
  id: string;
  label: string;
  icon: typeof Clock;
  /** When omitted, the row itself is draggable (direct task). */
  subOptions?: TaskSubOption[];
}

const TRIAGE_REVIEW_DESCRIPTION =
  "The system checks the review to decide whether a response is required based on whether it is a genuine customer review or spam content that is irrelevant to the business or in any way violates the content policy of the source.";

const TRIAGE_REVIEW_PROMPT =
  "You are the First-Line triaging agent. Analyze the incoming review if it is a genuine customer review and decide whether it requires a response.";

const TASK_OPTIONS: TaskSourceOption[] = [
  { id: "custom-task", label: "Custom", icon: ClipboardList },
  {
    id: "review-task",
    label: "Reviews",
    icon: Star,
    subOptions: [
      {
        id: "triage-review",
        label: "Triage review",
        description: TRIAGE_REVIEW_DESCRIPTION,
        systemPrompt: TRIAGE_REVIEW_PROMPT,
      },
      {
        id: "draft-reply",
        label: "Draft reply",
        description:
          "Generate a context-aware reply for the review based on sentiment, source, and your brand voice.",
      },
    ],
  },
  {
    id: "ticketing-task",
    label: "Ticketing",
    icon: Ticket,
    subOptions: [
      {
        id: "create-ticket",
        label: "Create ticket",
        description:
          "Create a support ticket from the review for the assigned team to follow up.",
      },
    ],
  },
  {
    id: "contact-task",
    label: "Contacts",
    icon: Users,
    subOptions: [
      {
        id: "update-contact",
        label: "Update contact",
        description: "Update the matching contact record with this review's metadata.",
      },
    ],
  },
];

const DEFAULT_GOALS =
  "Executes rule-based logic to rotate through qualifying templates and publish them automatically. If technical restrictions prevent immediate posting, the response is queued as a suggestion for manual review";

const DEFAULT_OUTCOMES =
  "Ensure safe, effortless engagement by relying exclusively on your pre-approved templates. Eliminate manual effort and operational overhead by autonomously responding across platforms";

const DEFAULT_LOCATIONS = [
  "1001 - Mountain view, CA",
  "1002 - Seattle, WA",
  "1004 - Chicago, IL",
  "1006 - Las Vegas, NV",
];

export function ReviewResponseAgentBuilderView({ onBack }: Props) {
  useRequestChromeless(true);
  const [tab, setTab] = useState<BuilderTab>("ai");
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("Review response agent  1");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selection, setSelection] = useState<CanvasSelection>(null);
  const [goals, setGoals] = useState(DEFAULT_GOALS);
  const [outcomes, setOutcomes] = useState(DEFAULT_OUTCOMES);
  const [triggerSearch, setTriggerSearch] = useState("");
  const [placedTrigger, setPlacedTrigger] = useState<PlacedTrigger | null>(null);
  const [triggerName, setTriggerName] = useState("");
  const [triggerDescription, setTriggerDescription] = useState("");
  const [placedNodes, setPlacedNodes] = useState<WorkflowNode[]>([]);

  type WorkflowSnapshot = {
    title: string;
    triggerName: string;
    triggerDescription: string;
    placedTrigger: PlacedTrigger | null;
    placedNodes: WorkflowNode[];
  };
  const [history, setHistory] = useState<{ stack: WorkflowSnapshot[]; index: number }>(() => ({
    stack: [{ title, triggerName, triggerDescription, placedTrigger, placedNodes }],
    index: 0,
  }));
  const applyingHistoryRef = useRef(false);

  useEffect(() => {
    if (applyingHistoryRef.current) {
      applyingHistoryRef.current = false;
      return;
    }
    const next: WorkflowSnapshot = { title, triggerName, triggerDescription, placedTrigger, placedNodes };
    const timer = window.setTimeout(() => {
      setHistory((h) => {
        const cur = h.stack[h.index];
        if (
          cur.title === next.title &&
          cur.triggerName === next.triggerName &&
          cur.triggerDescription === next.triggerDescription &&
          JSON.stringify(cur.placedTrigger) === JSON.stringify(next.placedTrigger) &&
          JSON.stringify(cur.placedNodes) === JSON.stringify(next.placedNodes)
        ) {
          return h;
        }
        const trimmed = h.stack.slice(0, h.index + 1);
        trimmed.push(next);
        return { stack: trimmed, index: trimmed.length - 1 };
      });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [title, triggerName, triggerDescription, placedTrigger, placedNodes]);

  const applySnapshot = (snap: WorkflowSnapshot) => {
    applyingHistoryRef.current = true;
    setTitle(snap.title);
    setTriggerName(snap.triggerName);
    setTriggerDescription(snap.triggerDescription);
    setPlacedTrigger(snap.placedTrigger);
    setPlacedNodes(snap.placedNodes);
  };

  const canUndo = history.index > 0;
  const canRedo = history.index < history.stack.length - 1;

  const handleUndo = () => {
    if (!canUndo) return;
    const nextIndex = history.index - 1;
    applySnapshot(history.stack[nextIndex]);
    setHistory((h) => ({ ...h, index: nextIndex }));
  };

  const handleRedo = () => {
    if (!canRedo) return;
    const nextIndex = history.index + 1;
    applySnapshot(history.stack[nextIndex]);
    setHistory((h) => ({ ...h, index: nextIndex }));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const target = e.target as HTMLElement | null;
      const isEditable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (isEditable) return;
      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if ((e.key === "z" && e.shiftKey) || e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const handleStartFromScratch = () => {
    setCreating(true);
    setLibraryOpen(false);
    setTab("manual");
    setSelection({ kind: "agent" });
  };

  const findTypeIdForSub = (subId: string): string => {
    const parent = TRIGGER_OPTIONS.find((t) =>
      t.subOptions?.some((s) => s.id === subId),
    );
    return parent?.id ?? subId;
  };

  const handlePlaceTrigger = (sub: TriggerSubOption) => {
    setPlacedTrigger({
      typeId: findTypeIdForSub(sub.id),
      subId: sub.id,
      label: sub.label,
      description: sub.description,
    });
    setTriggerName(sub.label);
    setTriggerDescription(sub.description);
    setSelection({ kind: "trigger" });
  };

  const handleTriggerTypeChange = (typeId: string, sub: TriggerSubOption) => {
    setPlacedTrigger({
      typeId,
      subId: sub.id,
      label: sub.label,
      description: sub.description,
    });
    setTriggerName(sub.label);
    setTriggerDescription(sub.description);
  };

  // ── Tree helpers ──────────────────────────────────────────────────────
  // The workflow is a forest: a top-level array of nodes plus, for each
  // BranchNode, one nested forest per lane. These helpers walk the tree
  // immutably, returning a new top-level array with the requested change.

  const mapNodes = (
    nodes: WorkflowNode[],
    fn: (n: WorkflowNode, parent: WorkflowNode[]) => WorkflowNode | null,
  ): WorkflowNode[] => {
    const out: WorkflowNode[] = [];
    for (const n of nodes) {
      const replaced = fn(n, nodes);
      if (replaced === null) continue;
      if (replaced.kind === "branch") {
        out.push({
          ...replaced,
          lanes: replaced.lanes.map((lane) => ({
            ...lane,
            nodes: mapNodes(lane.nodes, fn),
          })),
        });
      } else {
        out.push(replaced);
      }
    }
    return out;
  };

  const findNode = (nodes: WorkflowNode[], id: string): WorkflowNode | null => {
    for (const n of nodes) {
      if (n.id === id) return n;
      if (n.kind === "branch") {
        for (const lane of n.lanes) {
          const found = findNode(lane.nodes, id);
          if (found) return found;
        }
      }
    }
    return null;
  };

  const insertIntoLane = (
    nodes: WorkflowNode[],
    laneId: string,
    atIndex: number,
    inserted: WorkflowNode,
  ): WorkflowNode[] =>
    nodes.map((n) => {
      if (n.kind !== "branch") return n;
      const lanes = n.lanes.map((lane) => {
        if (lane.id !== laneId) {
          return { ...lane, nodes: insertIntoLane(lane.nodes, laneId, atIndex, inserted) };
        }
        const copy = lane.nodes.slice();
        const safeIndex = Math.min(Math.max(atIndex, 0), copy.length);
        copy.splice(safeIndex, 0, inserted);
        return { ...lane, nodes: copy };
      });
      return { ...n, lanes };
    });

  const removeNode = (nodes: WorkflowNode[], id: string): WorkflowNode[] =>
    mapNodes(nodes, (n) => (n.id === id ? null : n));

  /** Insert a new task at the given position in the top-level flow (defaults to end). */
  const handlePlaceTask = (sub: TaskSubOption, atIndex?: number) => {
    const id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next: PlacedTask = {
      id,
      kind: "task",
      subId: sub.id,
      label: sub.label,
      description: sub.description,
      prompt: sub.systemPrompt ?? "",
      enabled: true,
    };
    setPlacedNodes((nodes) => {
      const insertAt = typeof atIndex === "number" ? atIndex : nodes.length;
      const copy = nodes.slice();
      copy.splice(insertAt, 0, next);
      return copy;
    });
    setSelection({ kind: "task", taskId: id });
  };

  /** Insert a new task inside a specific branch lane at the given index. */
  const handlePlaceTaskInLane = (sub: TaskSubOption, laneId: string, atIndex: number) => {
    const id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next: PlacedTask = {
      id,
      kind: "task",
      subId: sub.id,
      label: sub.label,
      description: sub.description,
      prompt: sub.systemPrompt ?? "",
      enabled: true,
    };
    setPlacedNodes((nodes) => insertIntoLane(nodes, laneId, atIndex, next));
    setSelection({ kind: "task", taskId: id });
  };

  /** Insert a new branch (with one user lane + a default lane) at the top level. */
  const handlePlaceBranch = (atIndex?: number, laneId?: string) => {
    const branchId = `branch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const userLaneId = `lane-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const defaultLaneId = `lane-${Date.now() + 1}-${Math.random().toString(36).slice(2, 7)}`;
    const next: PlacedBranch = {
      id: branchId,
      kind: "branch",
      label: "Branch",
      description: "Build condition-specific flows",
      branchType: "condition",
      enabled: true,
      lanes: [
        {
          id: userLaneId,
          name: "",
          isDefault: false,
          conditions: [{ id: `cond-${Date.now()}`, variable: "", operator: "is equal to", value: "" }],
          connectors: [],
          nodes: [],
        },
        {
          id: defaultLaneId,
          name: "",
          isDefault: true,
          conditions: [],
          connectors: [],
          nodes: [],
        },
      ],
    };
    if (laneId) {
      setPlacedNodes((nodes) => insertIntoLane(nodes, laneId, atIndex ?? 0, next));
    } else {
      setPlacedNodes((nodes) => {
        const insertAt = typeof atIndex === "number" ? atIndex : nodes.length;
        const copy = nodes.slice();
        copy.splice(insertAt, 0, next);
        return copy;
      });
    }
    setSelection({ kind: "branch", branchId });
  };

  const updateTask = (taskId: string, patch: Partial<PlacedTask>) => {
    setPlacedNodes((nodes) =>
      mapNodes(nodes, (n) => (n.kind === "task" && n.id === taskId ? { ...n, ...patch } : n)),
    );
  };

  const updateBranch = (branchId: string, patch: Partial<PlacedBranch>) => {
    setPlacedNodes((nodes) =>
      mapNodes(nodes, (n) =>
        n.kind === "branch" && n.id === branchId ? { ...n, ...patch } : n,
      ),
    );
  };

  const handleReorderTask = (taskId: string, toIndex: number) => {
    setPlacedNodes((nodes) => {
      const fromIndex = nodes.findIndex((t) => t.id === taskId);
      if (fromIndex === -1) return nodes;
      const next = nodes.slice();
      const [moved] = next.splice(fromIndex, 1);
      const adjusted = toIndex > fromIndex ? toIndex - 1 : toIndex;
      next.splice(adjusted, 0, moved);
      return next;
    });
  };

  const selectedTask =
    selection?.kind === "task"
      ? (() => {
          const n = findNode(placedNodes, selection.taskId);
          return n && n.kind === "task" ? n : null;
        })()
      : null;

  const selectedBranch =
    selection?.kind === "branch"
      ? (() => {
          const n = findNode(placedNodes, selection.branchId);
          return n && n.kind === "branch" ? n : null;
        })()
      : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#1e2229]">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-[#e5e9f0] bg-white px-6 dark:border-[#252b35] dark:bg-[#1e2229]">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 -ml-2"
          onClick={onBack}
          aria-label="Back to agents"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-transparent text-[18px] font-normal tracking-[-0.36px] text-[#212121] outline-none focus:outline-none dark:text-[#f3f4f6]"
          aria-label="Agent name"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-[#6b7280] dark:text-[#9ba2b0]"
          aria-label="Save"
        >
          <CloudUpload className="h-4 w-4" />
        </Button>
        <Button size="sm" disabled className="h-9">
          Publish
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 gap-6 overflow-hidden bg-[#f4f6f7] p-6 dark:bg-[#1a1d23]">
        <aside className="flex w-[360px] shrink-0 flex-col gap-5 rounded-lg bg-white px-6 pt-2 pb-5 dark:bg-[#1e2229]">
          <div role="tablist" aria-label="Build mode" className="flex w-full">
            <button
              role="tab"
              aria-selected={tab === "ai"}
              onClick={() => setTab("ai")}
              className={`flex flex-1 flex-col items-center gap-1 pt-2 text-sm tracking-[-0.28px] transition-colors ${
                tab === "ai"
                  ? "text-[#212121] dark:text-[#f3f4f6]"
                  : "text-[#555] dark:text-[#9ba2b0] hover:text-[#212121] dark:hover:text-[#f3f4f6]"
              }`}
            >
              <span className="inline-flex items-center gap-1 px-2 py-1">
                Create with
                <Sparkles className="h-4 w-4 text-[#6834b7]" />
              </span>
              <span
                className={`h-px w-full ${tab === "ai" ? "bg-[#1976d2]" : "bg-transparent"}`}
              />
            </button>
            <button
              role="tab"
              aria-selected={tab === "manual"}
              onClick={() => setTab("manual")}
              className={`flex flex-1 flex-col items-center gap-1 pt-2 text-sm tracking-[-0.28px] transition-colors ${
                tab === "manual"
                  ? "text-[#212121] dark:text-[#f3f4f6]"
                  : "text-[#555] dark:text-[#9ba2b0] hover:text-[#212121] dark:hover:text-[#f3f4f6]"
              }`}
            >
              <span className="px-2 py-1">Create manually</span>
              <span
                className={`h-px w-full ${tab === "manual" ? "bg-[#1976d2]" : "bg-transparent"}`}
              />
            </button>
          </div>

          {tab === "ai" ? (
            <>
              <div className="flex flex-1 flex-col justify-end gap-3">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9970D7] to-[#2552ED]">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
                      Hi! I’m here to help you build your Review response agent. Tell me what
                      you’d like to build
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PROMPT_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPrompt(s)}
                          className="h-9 rounded-[4px] border border-[#e5e9f0] bg-white px-3 text-sm tracking-[-0.28px] text-[#212121] transition-colors hover:border-[#c4d5e9] hover:bg-[#f8fafc] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:border-[#5580e0]"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <PromptInput onSubmit={() => prompt.trim() && setPrompt("")}>
                <PromptInputTextarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What would you like to build? For example: Review response agent replying autonomously."
                />
                <PromptInputActions>
                  <div className="flex items-center gap-1">
                    <PromptInputAction tooltip="Attach file" aria-label="Attach file">
                      <Paperclip className="h-4 w-4" />
                    </PromptInputAction>
                    <PromptInputAction tooltip="Edit note" aria-label="Edit note">
                      <PencilLine className="h-4 w-4" />
                    </PromptInputAction>
                    <PromptInputAction tooltip="More" aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </PromptInputAction>
                  </div>
                  <PromptInputAction
                    tooltip="Send"
                    aria-label="Send"
                    disabled={!prompt.trim()}
                    className={PROMPT_INPUT_PRIMARY_ICON_SEND_CLASSNAME}
                    onClick={() => prompt.trim() && setPrompt("")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </PromptInputAction>
                </PromptInputActions>
              </PromptInput>
            </>
          ) : (
            <ManualBuilderContent
              search={triggerSearch}
              onSearchChange={setTriggerSearch}
              onPlaceTrigger={handlePlaceTrigger}
              onPlaceTask={handlePlaceTask}
            />
          )}
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #d6dde8 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              maskImage: creating
                ? "none"
                : "radial-gradient(ellipse at center, black 50%, transparent 85%)",
              WebkitMaskImage: creating
                ? "none"
                : "radial-gradient(ellipse at center, black 50%, transparent 85%)",
            }}
          />
          {creating ? (
            <WorkflowCanvas
              agentName={title}
              selection={selection}
              onSelectAgent={() => setSelection({ kind: "agent" })}
              placedTrigger={placedTrigger}
              onTriggerSelect={() => setSelection({ kind: "trigger" })}
              onPlaceTrigger={handlePlaceTrigger}
              placedNodes={placedNodes}
              onTaskEnabledChange={(taskId, enabled) =>
                updateTask(taskId, { enabled })
              }
              onTaskSelect={(taskId) => setSelection({ kind: "task", taskId })}
              onBranchSelect={(branchId) => setSelection({ kind: "branch", branchId })}
              onBranchEnabledChange={(branchId, enabled) =>
                updateBranch(branchId, { enabled })
              }
              onPlaceTask={handlePlaceTask}
              onPlaceTaskInLane={handlePlaceTaskInLane}
              onPlaceBranch={handlePlaceBranch}
              onReorderTask={handleReorderTask}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />
          ) : (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 py-12 animate-in fade-in duration-300">
            <div className="flex max-w-[560px] flex-col items-center gap-6 text-center">
              <WorkflowEmptyStateIllustration />
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-[18px] font-medium tracking-[-0.36px] text-[#212121] dark:text-[#f3f4f6]">
                  Build your first Review response agent
                </h2>
                <p className="max-w-[420px] text-sm leading-5 tracking-[-0.28px] text-[#6b7280] dark:text-[#9ba2b0]">
                  Connect a trigger, decide how to handle each review, and pick how to
                  reply — autonomously, with templates, or with human approval.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" className="h-9 gap-1.5" onClick={handleStartFromScratch}>
                  <Plus className="h-4 w-4" />
                  Start from scratch
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5"
                  aria-expanded={libraryOpen}
                  onClick={() => setLibraryOpen((v) => !v)}
                >
                  <BookOpen className="h-4 w-4" />
                  Browse library
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${libraryOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>
            </div>

            <div
              aria-hidden={!libraryOpen}
              className={`grid w-full max-w-[920px] transition-[grid-template-rows,opacity,margin-top] duration-300 ease-in-out ${
                libraryOpen
                  ? "mt-6 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid grid-cols-4 gap-4">
                  {LIBRARY_TEMPLATES.map((t, i) => (
                    <LibraryTemplateCard
                      key={t.id}
                      title={t.title}
                      description={t.description}
                      open={libraryOpen}
                      delayMs={i * 50}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          )}
        </main>

        {creating && selectedTask ? (
          <TaskConfigPanel
            key={`task-${selectedTask.id}`}
            name={selectedTask.label}
            onNameChange={(label) => updateTask(selectedTask.id, { label })}
            description={selectedTask.description}
            onDescriptionChange={(description) =>
              updateTask(selectedTask.id, { description })
            }
            prompt={selectedTask.prompt}
            onPromptChange={(prompt) => updateTask(selectedTask.id, { prompt })}
            onClose={() => setSelection(null)}
          />
        ) : creating && selectedBranch ? (
          <BranchConfigPanel
            key={`branch-${selectedBranch.id}`}
            draft={{
              branchType: selectedBranch.branchType,
              lanes: selectedBranch.lanes.map((l) => ({
                id: l.id,
                name: l.name,
                isDefault: l.isDefault,
                conditions: l.conditions.map((c) => ({ ...c })),
                connectors: l.connectors.slice(),
              })),
            }}
            onSave={(next) => {
              setPlacedNodes((nodes) =>
                mapNodes(nodes, (n) =>
                  n.kind === "branch" && n.id === selectedBranch.id
                    ? {
                        ...n,
                        branchType: next.branchType,
                        // Preserve nested workflow nodes inside lanes by id; new lanes get empty arrays.
                        lanes: next.lanes.map((nl) => {
                          const existing = n.lanes.find((el) => el.id === nl.id);
                          return {
                            id: nl.id,
                            name: nl.name,
                            isDefault: nl.isDefault,
                            conditions: nl.conditions,
                            connectors: nl.connectors,
                            nodes: existing?.nodes ?? [],
                          };
                        }),
                      }
                    : n,
                ),
              );
              setSelection(null);
            }}
            onClose={() => setSelection(null)}
          />
        ) : creating && selection?.kind === "trigger" && placedTrigger ? (
          <TriggerConfigPanel
            key={`trigger-${placedTrigger.subId}`}
            currentTypeId={placedTrigger.typeId}
            currentSubId={placedTrigger.subId}
            onTypeChange={handleTriggerTypeChange}
            name={triggerName}
            onNameChange={setTriggerName}
            description={triggerDescription}
            onDescriptionChange={setTriggerDescription}
            onClose={() => setSelection(null)}
          />
        ) : creating && selection?.kind === "agent" ? (
          <AgentDetailsPanel
            key="agent"
            name={title}
            onNameChange={setTitle}
            goals={goals}
            onGoalsChange={setGoals}
            outcomes={outcomes}
            onOutcomesChange={setOutcomes}
            locations={DEFAULT_LOCATIONS}
            onClose={() => setSelection(null)}
          />
        ) : null}
      </div>
    </div>
  );
}

interface ManualBuilderContentProps {
  search: string;
  onSearchChange: (next: string) => void;
  onPlaceTrigger: (sub: TriggerSubOption) => void;
  onPlaceTask: (sub: TaskSubOption) => void;
}

function ManualBuilderContent({
  search,
  onSearchChange,
  onPlaceTrigger,
  onPlaceTask,
}: ManualBuilderContentProps) {
  const q = search.trim().toLowerCase();
  const filtered = TRIGGER_OPTIONS.filter((t) => t.label.toLowerCase().includes(q));
  const filteredTasks = TASK_OPTIONS.filter((t) => t.label.toLowerCase().includes(q));
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280] dark:text-[#9ba2b0]" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="h-9 pl-9"
        />
      </div>
      <div className="flex-1 overflow-visible pr-1">
        <Accordion type="multiple" defaultValue={["trigger"]} className="flex flex-col gap-2">
          <AccordionItem value="trigger" className="border-0">
            <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium text-[#212121] hover:bg-[#f4f6f7] dark:text-[#f3f4f6] dark:hover:bg-[#262b35]">
              Trigger
            </AccordionTrigger>
            <AccordionContent className="overflow-visible pb-1 pt-1">
              <div className="flex flex-col gap-1.5">
                {filtered.map((t, i) => (
                  <TriggerRow
                    key={t.id}
                    option={t}
                    index={i}
                    onPlaceSub={onPlaceTrigger}
                  />
                ))}
                {filtered.length === 0 && (
                  <p className="px-3 py-2 text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                    No matches
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tasks" className="border-0">
            <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium text-[#212121] hover:bg-[#f4f6f7] dark:text-[#f3f4f6] dark:hover:bg-[#262b35]">
              Tasks
            </AccordionTrigger>
            <AccordionContent className="overflow-visible pb-1 pt-1">
              <div className="flex flex-col gap-1.5">
                {filteredTasks.map((t, i) => (
                  <TaskRow
                    key={t.id}
                    option={t}
                    index={i}
                    onPlaceSub={onPlaceTask}
                  />
                ))}
                {filteredTasks.length === 0 && (
                  <p className="px-3 py-2 text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                    No matches
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="controls" className="border-0">
            <AccordionTrigger className="rounded-md px-3 py-2 text-sm font-medium text-[#212121] hover:bg-[#f4f6f7] dark:text-[#f3f4f6] dark:hover:bg-[#262b35]">
              Controls
            </AccordionTrigger>
            <AccordionContent className="overflow-visible pb-1 pt-1">
              <div className="flex flex-col gap-1.5">
                <ControlRow
                  index={0}
                  label="Branch"
                  Icon={GitBranch}
                  mime={BRANCH_DRAG_MIME}
                  payload="branch"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

interface ControlRowProps {
  index: number;
  label: string;
  Icon: typeof Clock;
  mime: string;
  payload: string;
}

/** A draggable Controls-section row (Branch, Delay, etc.) — mime + payload picked by the canvas. */
function ControlRow({ index, label, Icon, mime, payload }: ControlRowProps) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: ReactDragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(mime, payload);
    e.dataTransfer.effectAllowed = "copy";
    const ghost = document.createElement("div");
    ghost.textContent = label;
    ghost.style.cssText = [
      "position:fixed",
      "top:-9999px",
      "left:-9999px",
      "padding:8px 12px",
      "background:#ffffff",
      "color:#212121",
      "font:500 13px/18px Roboto, sans-serif",
      "border-radius:8px",
      "box-shadow:0 8px 24px rgba(15,23,42,0.18)",
      "border:1px solid #c4d5e9",
      "max-width:280px",
      "white-space:nowrap",
      "overflow:hidden",
      "text-overflow:ellipsis",
      "pointer-events:none",
    ].join(";");
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    window.setTimeout(() => {
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    }, 0);
    setDragging(true);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setDragging(false)}
      style={{ animationDelay: `${index * 30}ms` }}
      className={`group flex h-9 items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 text-sm text-[#212121] transition-[background-color,border-color,opacity,transform] duration-200 ease-out animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-backwards hover:border-transparent hover:bg-[#E5E9F0] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:bg-[#2c333f] cursor-grab active:cursor-grabbing ${
        dragging ? "opacity-60" : ""
      }`}
    >
      <Icon className="h-4 w-4 shrink-0 text-[#6b7280] dark:text-[#9ba2b0]" />
      <span className="flex-1 truncate text-left">{label}</span>
      <GripVertical className="h-4 w-4 shrink-0 text-[#9ca3af] dark:text-[#6b7280]" />
    </div>
  );
}

interface TriggerRowProps {
  option: TriggerSourceOption;
  index: number;
  onPlaceSub: (sub: TriggerSubOption) => void;
}

function TriggerRow({ option, index, onPlaceSub }: TriggerRowProps) {
  const Icon = option.icon;
  const subs = option.subOptions ?? [];
  const hasSubs = subs.length > 0;
  const [open, setOpen] = useState(false);

  const row = (
    <div
      style={{ animationDelay: `${index * 30}ms` }}
      className="group flex h-9 cursor-default items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 text-sm text-[#212121] transition-colors duration-200 ease-out animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-backwards hover:border-transparent hover:bg-[#E5E9F0] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:bg-[#2c333f]"
    >
      <Icon className="h-4 w-4 shrink-0 text-[#6b7280] dark:text-[#9ba2b0]" />
      <span className="flex-1 truncate text-left">{option.label}</span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#9ca3af] transition-transform duration-200 ease-out group-hover:translate-x-0.5 dark:text-[#6b7280]" />
    </div>
  );

  if (!hasSubs) return row;

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>{row}</HoverCardTrigger>
      <HoverCardContent
        side="right"
        align="start"
        sideOffset={8}
        className="w-[296px] rounded-[10px] border border-[#e5e9f0] bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.14)] dark:border-[#333a47] dark:bg-[#1e2229]"
      >
        <p className="pb-2 text-[13px] font-medium text-[#212121] dark:text-[#f3f4f6]">
          {popoutSectionLabel(option.label)}
        </p>
        <div
          role="menu"
          aria-label={`${option.label} triggers`}
          className="flex flex-col gap-2"
        >
          {subs.map((sub, i) => (
            <SubTriggerItem
              key={sub.id}
              sub={sub}
              index={i}
              onPlace={onPlaceSub}
              onDragStartItem={() => setOpen(false)}
            />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

interface SubTriggerItemProps {
  sub: TriggerSubOption;
  index: number;
  onPlace: (sub: TriggerSubOption) => void;
  onDragStartItem?: () => void;
}

function SubTriggerItem({ sub, index, onPlace, onDragStartItem }: SubTriggerItemProps) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: ReactDragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(TRIGGER_DRAG_MIME, sub.id);
    e.dataTransfer.setData("text/plain", sub.label);
    e.dataTransfer.effectAllowed = "copy";

    const ghost = document.createElement("div");
    ghost.textContent = sub.label;
    ghost.style.cssText = [
      "position:absolute",
      "top:-9999px",
      "left:-9999px",
      "padding:8px 12px",
      "background:#ffffff",
      "color:#212121",
      "font:500 13px/18px Roboto, sans-serif",
      "border-radius:8px",
      "box-shadow:0 8px 24px rgba(15,23,42,0.18)",
      "border:1px solid #c4d5e9",
      "max-width:280px",
      "white-space:nowrap",
      "overflow:hidden",
      "text-overflow:ellipsis",
      "pointer-events:none",
    ].join(";");
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    window.setTimeout(() => {
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    }, 0);

    setDragging(true);
    onDragStartItem?.();
  };

  const handleDragEnd = () => setDragging(false);

  return (
    <div
      role="menuitem"
      tabIndex={0}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onPlace(sub)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlace(sub);
        }
      }}
      style={{ animationDelay: `${index * 30}ms` }}
      className={`group flex h-9 cursor-grab select-none items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 transition-[background-color,border-color,opacity,transform] duration-200 ease-out animate-in fade-in slide-in-from-left-1 duration-300 fill-mode-backwards hover:border-transparent hover:bg-[#E5E9F0] active:cursor-grabbing dark:border-[#333a47] dark:bg-[#262b35] dark:hover:bg-[#2c333f] ${
        dragging ? "scale-[0.98] opacity-40" : ""
      }`}
    >
      <span className="flex-1 truncate text-[13px] leading-5 text-[#212121] dark:text-[#e4e4e4]">
        {sub.label}
      </span>
      <GripVertical className="h-4 w-4 shrink-0 text-[#9ca3af] dark:text-[#6b7280]" />
    </div>
  );
}

interface TaskRowProps {
  option: TaskSourceOption;
  index: number;
  onPlaceSub: (sub: TaskSubOption) => void;
}

function TaskRow({ option, index, onPlaceSub }: TaskRowProps) {
  const Icon = option.icon;
  const subs = option.subOptions ?? [];
  const hasSubs = subs.length > 0;
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Direct draggable row (no sub-options) — drags itself as a task with a synthetic id.
  const handleDirectDragStart = (e: ReactDragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(TASK_DRAG_MIME, option.id);
    e.dataTransfer.setData("text/plain", option.label);
    e.dataTransfer.effectAllowed = "copy";

    const ghost = document.createElement("div");
    ghost.textContent = option.label;
    ghost.style.cssText = [
      "position:absolute",
      "top:-9999px",
      "left:-9999px",
      "padding:8px 12px",
      "background:#ffffff",
      "color:#212121",
      "font:500 13px/18px Roboto, sans-serif",
      "border-radius:8px",
      "box-shadow:0 8px 24px rgba(15,23,42,0.18)",
      "border:1px solid #c4d5e9",
      "max-width:280px",
      "white-space:nowrap",
      "overflow:hidden",
      "text-overflow:ellipsis",
      "pointer-events:none",
    ].join(";");
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    window.setTimeout(() => {
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    }, 0);

    setDragging(true);
  };

  const row = (
    <div
      draggable={!hasSubs}
      onDragStart={!hasSubs ? handleDirectDragStart : undefined}
      onDragEnd={!hasSubs ? () => setDragging(false) : undefined}
      style={{ animationDelay: `${index * 30}ms` }}
      className={`group flex h-9 items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 text-sm text-[#212121] transition-[background-color,border-color,opacity,transform] duration-200 ease-out animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-backwards hover:border-transparent hover:bg-[#E5E9F0] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:bg-[#2c333f] ${
        hasSubs ? "cursor-default" : "cursor-grab active:cursor-grabbing"
      } ${dragging ? "scale-[0.98] opacity-40" : ""}`}
    >
      <Icon className="h-4 w-4 shrink-0 text-[#6b7280] dark:text-[#9ba2b0]" />
      <span className="flex-1 truncate text-left">{option.label}</span>
      {hasSubs ? (
        <ChevronRight className="h-4 w-4 shrink-0 text-[#9ca3af] transition-transform duration-200 ease-out group-hover:translate-x-0.5 dark:text-[#6b7280]" />
      ) : (
        <GripVertical className="h-4 w-4 shrink-0 text-[#9ca3af] dark:text-[#6b7280]" />
      )}
    </div>
  );

  if (!hasSubs) return row;

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>{row}</HoverCardTrigger>
      <HoverCardContent
        side="right"
        align="start"
        sideOffset={8}
        className="w-[296px] rounded-[10px] border border-[#e5e9f0] bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.14)] dark:border-[#333a47] dark:bg-[#1e2229]"
      >
        <p className="pb-2 text-[13px] font-medium text-[#212121] dark:text-[#f3f4f6]">
          {popoutSectionLabel(option.label)}
        </p>
        <div role="menu" aria-label={`${option.label} tasks`} className="flex flex-col gap-2">
          {subs.map((sub, i) => (
            <TaskSubItem
              key={sub.id}
              sub={sub}
              index={i}
              onPlace={onPlaceSub}
              onDragStartItem={() => setOpen(false)}
            />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

interface TaskSubItemProps {
  sub: TaskSubOption;
  index: number;
  onPlace: (sub: TaskSubOption) => void;
  onDragStartItem?: () => void;
}

function TaskSubItem({ sub, index, onPlace, onDragStartItem }: TaskSubItemProps) {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: ReactDragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(TASK_DRAG_MIME, sub.id);
    e.dataTransfer.setData("text/plain", sub.label);
    e.dataTransfer.effectAllowed = "copy";

    const ghost = document.createElement("div");
    ghost.textContent = sub.label;
    ghost.style.cssText = [
      "position:absolute",
      "top:-9999px",
      "left:-9999px",
      "padding:8px 12px",
      "background:#ffffff",
      "color:#212121",
      "font:500 13px/18px Roboto, sans-serif",
      "border-radius:8px",
      "box-shadow:0 8px 24px rgba(15,23,42,0.18)",
      "border:1px solid #c4d5e9",
      "max-width:280px",
      "white-space:nowrap",
      "overflow:hidden",
      "text-overflow:ellipsis",
      "pointer-events:none",
    ].join(";");
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    window.setTimeout(() => {
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    }, 0);

    setDragging(true);
    onDragStartItem?.();
  };

  return (
    <div
      role="menuitem"
      tabIndex={0}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setDragging(false)}
      onClick={() => onPlace(sub)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlace(sub);
        }
      }}
      style={{ animationDelay: `${index * 30}ms` }}
      className={`group flex h-9 cursor-grab select-none items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 transition-[background-color,border-color,opacity,transform] duration-200 ease-out animate-in fade-in slide-in-from-left-1 duration-300 fill-mode-backwards hover:border-transparent hover:bg-[#E5E9F0] active:cursor-grabbing dark:border-[#333a47] dark:bg-[#262b35] dark:hover:bg-[#2c333f] ${
        dragging ? "scale-[0.98] opacity-40" : ""
      }`}
    >
      <span className="flex-1 truncate text-[13px] leading-5 text-[#212121] dark:text-[#e4e4e4]">
        {sub.label}
      </span>
      <GripVertical className="h-4 w-4 shrink-0 text-[#9ca3af] dark:text-[#6b7280]" />
    </div>
  );
}

interface WorkflowCanvasProps {
  agentName: string;
  selection: CanvasSelection;
  onSelectAgent: () => void;
  placedTrigger: PlacedTrigger | null;
  onTriggerSelect: () => void;
  onPlaceTrigger: (sub: TriggerSubOption) => void;
  placedNodes: WorkflowNode[];
  onTaskEnabledChange: (taskId: string, enabled: boolean) => void;
  onTaskSelect: (taskId: string) => void;
  onBranchSelect: (branchId: string) => void;
  onBranchEnabledChange: (branchId: string, enabled: boolean) => void;
  onPlaceTask: (sub: TaskSubOption, atIndex?: number) => void;
  onPlaceTaskInLane: (sub: TaskSubOption, laneId: string, atIndex: number) => void;
  onPlaceBranch: (atIndex?: number, laneId?: string) => void;
  onReorderTask: (taskId: string, toIndex: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const CARD_WIDTH = "w-[360px]";

type DragKind = "trigger" | "task" | "task-reorder" | "branch" | null;

function readDragKind(types: ReadonlyArray<string> | DOMStringList): DragKind {
  const has = (mime: string) => {
    if (Array.isArray(types)) return (types as string[]).includes(mime);
    return Array.from(types).includes(mime);
  };
  if (has(TRIGGER_DRAG_MIME)) return "trigger";
  if (has(TASK_REORDER_MIME)) return "task-reorder";
  if (has(TASK_DRAG_MIME)) return "task";
  if (has(BRANCH_DRAG_MIME)) return "branch";
  return null;
}

function WorkflowCanvas({
  selection,
  onSelectAgent,
  placedTrigger,
  onTriggerSelect,
  onPlaceTrigger,
  placedNodes,
  onTaskEnabledChange,
  onTaskSelect,
  onBranchSelect,
  onBranchEnabledChange,
  onPlaceTask,
  onPlaceTaskInLane,
  onPlaceBranch,
  onReorderTask,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  agentName,
}: WorkflowCanvasProps) {
  const agentSelected = selection?.kind === "agent";
  const triggerSelected = selection?.kind === "trigger";

  // Tracks which kind of drag is currently happening over the canvas (so all
  // compatible slots can light up at once).
  const [activeDrag, setActiveDrag] = useState<DragKind>(null);
  // Id of the task card the user is currently dragging (for reorder).
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleTaskCardDragStart = (taskId: string) => (e: ReactDragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(TASK_REORDER_MIME, taskId);
    e.dataTransfer.effectAllowed = "move";

    // Clone the actual card so the entire card visual follows the cursor.
    const source = document.querySelector<HTMLDivElement>(
      `[data-task-id="${taskId}"]`,
    );
    if (source) {
      const rect = source.getBoundingClientRect();
      const ghost = source.cloneNode(true) as HTMLElement;
      ghost.removeAttribute("data-task-id");
      ghost.style.position = "fixed";
      ghost.style.top = "-9999px";
      ghost.style.left = "-9999px";
      ghost.style.width = `${rect.width}px`;
      ghost.style.opacity = "0.85";
      ghost.style.transform = "rotate(1.5deg)";
      ghost.style.boxShadow = "0 16px 40px rgba(15,23,42,0.22)";
      ghost.style.pointerEvents = "none";
      // Strip transition/animation classes so the clone doesn't re-run entry anims.
      ghost.classList.remove(
        "animate-in",
        "fade-in",
        "zoom-in-95",
        "slide-in-from-top-1",
      );
      document.body.appendChild(ghost);
      e.dataTransfer.setDragImage(ghost, 60, 24);
      window.setTimeout(() => {
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      }, 0);
    }

    setActiveDrag("task-reorder");
    setDraggingTaskId(taskId);
  };

  const handleTaskCardDragEnd = () => {
    setActiveDrag(null);
    setDraggingTaskId(null);
  };

  const handleDragEnter = (e: ReactDragEvent<HTMLDivElement>) => {
    const kind = readDragKind(e.dataTransfer.types);
    if (kind) setActiveDrag(kind);
  };
  const handleDragLeave = (e: ReactDragEvent<HTMLDivElement>) => {
    // Only clear when the cursor truly exits the canvas root.
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveDrag(null);
  };
  const handleDragEnd = () => setActiveDrag(null);

  const handleTriggerDrop = (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveDrag(null);
    const subId = e.dataTransfer.getData(TRIGGER_DRAG_MIME);
    const sub = TRIGGER_OPTIONS.flatMap((t) => t.subOptions ?? []).find(
      (s) => s.id === subId,
    );
    if (sub) onPlaceTrigger(sub);
  };

  const handleTaskDrop = (atIndex: number) => (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActiveDrag(null);
    // Reorder takes priority — when dragging an existing task card.
    const reorderId = e.dataTransfer.getData(TASK_REORDER_MIME);
    if (reorderId) {
      onReorderTask(reorderId, atIndex);
      return;
    }
    const branchSubId = e.dataTransfer.getData(BRANCH_DRAG_MIME);
    if (branchSubId) {
      onPlaceBranch(atIndex);
      return;
    }
    const subId = e.dataTransfer.getData(TASK_DRAG_MIME);
    const inSubs = TASK_OPTIONS.flatMap((t) => t.subOptions ?? []).find(
      (s) => s.id === subId,
    );
    const direct = TASK_OPTIONS.find((t) => t.id === subId && !t.subOptions);
    if (inSubs) onPlaceTask(inSubs, atIndex);
    else if (direct)
      onPlaceTask(
        { id: direct.id, label: direct.label, description: "" },
        atIndex,
      );
  };

  const handleLaneDrop = (laneId: string, atIndex: number) => (e: ReactDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDrag(null);
    const branchSubId = e.dataTransfer.getData(BRANCH_DRAG_MIME);
    if (branchSubId) {
      onPlaceBranch(atIndex, laneId);
      return;
    }
    const subId = e.dataTransfer.getData(TASK_DRAG_MIME);
    const inSubs = TASK_OPTIONS.flatMap((t) => t.subOptions ?? []).find(
      (s) => s.id === subId,
    );
    const direct = TASK_OPTIONS.find((t) => t.id === subId && !t.subOptions);
    if (inSubs) onPlaceTaskInLane(inSubs, laneId, atIndex);
    else if (direct)
      onPlaceTaskInLane(
        { id: direct.id, label: direct.label, description: "" },
        laneId,
        atIndex,
      );
  };

  // ── Pan & zoom ────────────────────────────────────────────────────────
  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 2;
  const ZOOM_PRESETS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  const outerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // panX is the user's horizontal offset *from the auto-centered baseline*.
  // The content is positioned with `left: 50% + translateX(-50%)` (CSS), so panX = 0
  // always means horizontally centered in the canvas — exactly like the toolbar.
  // panY is absolute: 80 = 80px from the canvas top.
  const [viewport, setViewport] = useState<{ panX: number; panY: number; zoom: number }>({
    panX: 0,
    panY: 80,
    zoom: 1,
  });
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);
  const [spacePan, setSpacePan] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const panDragRef = useRef<{ startX: number; startY: number; pan0X: number; pan0Y: number } | null>(null);

  // No JS-driven horizontal centering needed — CSS does it via `left: 50% + translateX(-50%)`.
  // The workflow stays centered between LHS and RHS automatically as either panel opens/closes
  // or the window resizes, exactly like the toolbar's `inset-x-0 + flex justify-center`.

  // Spacebar: hold to enable cursor-grab pan from anywhere.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const t = e.target as HTMLElement | null;
        if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA" || t?.isContentEditable) return;
        e.preventDefault();
        setSpacePan(true);
      }
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

  // Wheel: plain wheel = pan, ⌘/Ctrl + wheel = zoom around cursor.
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const onWheel = (e: WheelEvent) => {
      stopTransition();
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const rect = outer.getBoundingClientRect();
        // panX is relative to canvas-center horizontally, so cursor X must be too.
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

  // Mouse drag pan: start when mousedown lands on the canvas background (not on a draggable card / button).
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const t = e.target as HTMLElement;
    const onInteractive = !!t.closest('[draggable="true"], button, input, select, textarea, [role="button"]');
    // When spacebar is held, force pan even if mousedown is on interactive content.
    if (onInteractive && !spacePan) return;
    e.preventDefault();
    stopTransition();
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

  const setZoomAroundCenter = (nextZoom: number) => {
    const outer = outerRef.current;
    if (!outer) {
      setViewport((v) => ({ ...v, zoom: nextZoom }));
      return;
    }
    const rect = outer.getBoundingClientRect();
    // Anchor at canvas center: cx-relative = 0 (panX is already center-relative), cy = canvasH/2.
    const cy = rect.height / 2;
    setViewport((v) => {
      const ratio = nextZoom / v.zoom;
      return {
        zoom: nextZoom,
        panX: v.panX * ratio,
        panY: cy - (cy - v.panY) * ratio,
      };
    });
  };

  const fitToView = () => {
    const outer = outerRef.current;
    const content = contentRef.current;
    if (!outer || !content) return;
    const oRect = outer.getBoundingClientRect();
    // Measure the content at scale 1 (subtract current zoom from the rect).
    const cRect = content.getBoundingClientRect();
    const naturalW = cRect.width / viewport.zoom;
    const naturalH = cRect.height / viewport.zoom;
    if (naturalW === 0 || naturalH === 0) return;
    const padding = 80;
    const fitZoom = Math.min(
      MAX_ZOOM,
      Math.max(
        MIN_ZOOM,
        Math.min(
          (oRect.width - padding * 2) / naturalW,
          (oRect.height - padding * 2) / naturalH,
        ),
      ),
    );
    // panX = 0 → CSS-centered. panY centers vertically with padding.
    setViewport({
      zoom: fitZoom,
      panX: 0,
      panY: (oRect.height - naturalH * fitZoom) / 2,
    });
  };

  // Auto-center the selected card in the visible viewport whenever the selection changes.
  useEffect(() => {
    if (!selection) return;
    let cardId: string | null = null;
    if (selection.kind === "agent") cardId = "__agent";
    else if (selection.kind === "trigger") cardId = "__trigger";
    else if (selection.kind === "task") cardId = selection.taskId;
    else if (selection.kind === "branch") cardId = selection.branchId;
    if (!cardId) return;

    // Wait for layout to settle (the RHS panel mounting may shrink the canvas's flex-1 width).
    const raf = requestAnimationFrame(() => {
      const outer = outerRef.current;
      if (!outer) return;
      const card = outer.querySelector<HTMLElement>(`[data-card-id="${cardId}"]`);
      if (!card) return;
      const oRect = outer.getBoundingClientRect();
      const cRect = card.getBoundingClientRect();
      // Always recenter horizontally — keeps the workflow centered between LHS and RHS
      // even as the panels open/close and shrink the canvas.
      const dx = oRect.left + oRect.width / 2 - (cRect.left + cRect.width / 2);
      // Vertically: only scroll into view when the card is actually outside the visible area.
      // Don't push the workflow down just because the user clicked the agent header.
      const PAD = 80;
      let dy = 0;
      if (cRect.top < oRect.top + PAD) {
        dy = oRect.top + PAD - cRect.top;
      } else if (cRect.bottom > oRect.bottom - PAD) {
        dy = oRect.bottom - PAD - cRect.bottom;
      }
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      setTransitioning(true);
      setViewport((v) => ({ ...v, panX: v.panX + dx, panY: v.panY + dy }));
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        setTransitioning(false);
        transitionTimerRef.current = null;
      }, 320);
    });
    return () => cancelAnimationFrame(raf);
  }, [selection]);

  // Kill the transition the moment the user starts a manual pan / zoom interaction.
  const stopTransition = () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    setTransitioning(false);
  };

  const resetView = () => {
    setViewport({ panX: 0, panY: 80, zoom: 1 });
  };

  return (
    <div
      ref={outerRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDragEnd}
      onMouseDown={handleCanvasMouseDown}
      className={`relative z-10 flex-1 overflow-hidden select-none ${
        spacePan || panDragRef.current ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(15,23,42,0.08) 1px, transparent 1px)",
        backgroundSize: `${24 * viewport.zoom}px ${24 * viewport.zoom}px`,
        backgroundPosition: `${viewport.panX}px ${viewport.panY}px`,
      }}
    >
      {/* Toolbar — fixed in viewport, not affected by pan/zoom */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center">
        <div className="pointer-events-auto flex h-10 items-center gap-1 rounded-md border border-[#e5e9f0] bg-white px-1 shadow-[0_1px_3px_rgba(15,23,42,0.06)] animate-in fade-in slide-in-from-top-2 duration-300 dark:border-[#333a47] dark:bg-[#1e2229]">
          <CanvasToolButton aria-label="Download">
            <ArrowDownToLine className="h-4 w-4" />
          </CanvasToolButton>
          <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
          <CanvasToolButton aria-label="Direction">
            <ArrowRight className="h-4 w-4" />
          </CanvasToolButton>
          <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
          <CanvasToolButton aria-label="Fit to view" title="Fit to view" onClick={fitToView}>
            <Maximize2 className="h-4 w-4" />
          </CanvasToolButton>
          <Popover open={zoomMenuOpen} onOpenChange={setZoomMenuOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-8 items-center gap-1 rounded px-2 text-sm text-[#212121] transition-colors hover:bg-[#f4f6f7] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
              >
                {Math.round(viewport.zoom * 100)}%
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-44 p-1">
              {ZOOM_PRESETS.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => {
                    setZoomAroundCenter(z);
                    setZoomMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded px-2 py-1.5 text-sm text-[#212121] transition-colors hover:bg-[#f4f6f7] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
                >
                  <span>{Math.round(z * 100)}%</span>
                  {Math.abs(viewport.zoom - z) < 0.01 && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
              <span className="my-1 block h-px bg-[#e5e9f0] dark:bg-[#333a47]" />
              <button
                type="button"
                onClick={() => {
                  fitToView();
                  setZoomMenuOpen(false);
                }}
                className="flex w-full items-center rounded px-2 py-1.5 text-sm text-[#212121] transition-colors hover:bg-[#f4f6f7] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
              >
                Fit to view
              </button>
              <button
                type="button"
                onClick={() => {
                  resetView();
                  setZoomMenuOpen(false);
                }}
                className="flex w-full items-center rounded px-2 py-1.5 text-sm text-[#212121] transition-colors hover:bg-[#f4f6f7] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
              >
                Reset view
              </button>
            </PopoverContent>
          </Popover>
          <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
          <CanvasToolButton
            aria-label="Undo"
            title="Undo"
            disabled={!canUndo}
            onClick={onUndo}
            className={!canUndo ? "opacity-40 hover:bg-transparent hover:text-[#6b7280] dark:hover:bg-transparent dark:hover:text-[#9ba2b0]" : undefined}
          >
            <Undo2 className="h-4 w-4" />
          </CanvasToolButton>
          <CanvasToolButton
            aria-label="Redo"
            title="Redo"
            disabled={!canRedo}
            onClick={onRedo}
            className={!canRedo ? "opacity-40 hover:bg-transparent hover:text-[#6b7280] dark:hover:bg-transparent dark:hover:text-[#9ba2b0]" : undefined}
          >
            <Redo2 className="h-4 w-4" />
          </CanvasToolButton>
          <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
          <CanvasToolButton aria-label="Run">
            <Play className="h-4 w-4" />
          </CanvasToolButton>
        </div>
      </div>

      {/* Pan/zoom transformed content. Anchored at canvas top-center via CSS so it
          stays centered between LHS/RHS exactly like the toolbar — panX is the user's
          offset from the centered baseline. Zoom anchors at the content's top-center. */}
      <div
        ref={contentRef}
        style={{
          transform: `translate(calc(-50% + ${viewport.panX}px), ${viewport.panY}px) scale(${viewport.zoom})`,
          transformOrigin: "50% 0",
          transition: transitioning ? "transform 280ms ease-out" : "none",
        }}
        className="absolute left-1/2 top-0"
      >
        <div className="flex flex-col items-center">
        {/* Agent header — pill, smaller than the workflow cards */}
        <BuilderCard
          width="w-[280px]"
          variant={placedTrigger ? "pill" : "raised"}
          selected={agentSelected}
          onClick={onSelectAgent}
          dataCardId="__agent"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 shrink-0 text-[#6834b7] dark:text-[#b39ae5]" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
                {agentName.trim() || "Untitled agent"}
              </span>
              <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                All locations
              </span>
            </div>
          </div>
        </BuilderCard>

        {/* Trigger slot or trigger card */}
        {placedTrigger ? (
          <>
            <Connector />
            <BuilderCard
              width={CARD_WIDTH}
              variant="raised"
              selected={triggerSelected}
              onClick={onTriggerSelect}
              dataCardId="__trigger"
            >
              <CardEyebrow icon={<Zap className="h-3.5 w-3.5 text-[#6834b7] dark:text-[#b39ae5]" />}>
                Trigger
              </CardEyebrow>
              <CardTitle>1. {placedTrigger.label}</CardTitle>
              <CardDescription>{placedTrigger.description}</CardDescription>
            </BuilderCard>
          </>
        ) : (
          <>
            <Connector />
            <DropSlot
              accept="trigger"
              activeDrag={activeDrag}
              onDrop={handleTriggerDrop}
              label="Drop to add trigger"
              idleHandle="none"
            />
          </>
        )}

        {/* Task slots + task / branch cards (only meaningful after a trigger is placed) */}
        {placedTrigger && (
          <>
            <NodeFlow
              nodes={placedNodes}
              startIndexLabel={2}
              activeDrag={activeDrag}
              draggingTaskId={draggingTaskId}
              selection={selection}
              onTaskSelect={onTaskSelect}
              onBranchSelect={onBranchSelect}
              onTaskEnabledChange={onTaskEnabledChange}
              onBranchEnabledChange={onBranchEnabledChange}
              onTaskDragStart={handleTaskCardDragStart}
              onTaskDragEnd={handleTaskCardDragEnd}
              topLevelDrop={handleTaskDrop}
              laneDrop={handleLaneDrop}
            />
            <Connector />
            <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">End</span>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

// ─── NodeFlow: renders a vertical sequence of task / branch nodes ─────────

interface NodeFlowProps {
  nodes: WorkflowNode[];
  /** Number to start counting tasks from in card titles (top-level: 2, since trigger is 1). */
  startIndexLabel: number;
  activeDrag: DragKind;
  draggingTaskId: string | null;
  selection: CanvasSelection;
  onTaskSelect: (taskId: string) => void;
  onBranchSelect: (branchId: string) => void;
  onTaskEnabledChange: (taskId: string, enabled: boolean) => void;
  onBranchEnabledChange: (branchId: string, enabled: boolean) => void;
  onTaskDragStart: (taskId: string) => (e: ReactDragEvent<HTMLDivElement>) => void;
  onTaskDragEnd: () => void;
  /** Returned function takes the insertion index. */
  topLevelDrop: (atIndex: number) => (e: ReactDragEvent<HTMLDivElement>) => void;
  /** Drop into a specific lane id at a specific position. */
  laneDrop: (laneId: string, atIndex: number) => (e: ReactDragEvent<HTMLDivElement>) => void;
  /** When set, this NodeFlow lives inside a branch lane — drops route to laneDrop. */
  laneId?: string;
}

function NodeFlow({
  nodes,
  startIndexLabel,
  activeDrag,
  draggingTaskId,
  selection,
  onTaskSelect,
  onBranchSelect,
  onTaskEnabledChange,
  onBranchEnabledChange,
  onTaskDragStart,
  onTaskDragEnd,
  topLevelDrop,
  laneDrop,
  laneId,
}: NodeFlowProps) {
  const dropAt = (i: number) => (laneId ? laneDrop(laneId, i) : topLevelDrop(i));

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={node.id}>
          <Connector />
          <DropSlot accept="task" activeDrag={activeDrag} onDrop={dropAt(i)} />
          <Connector />
          {node.kind === "task" ? (
            <DragHandleWrapper
              onDragStart={onTaskDragStart(node.id)}
              onDragEnd={onTaskDragEnd}
            >
              <BuilderCard
                width={CARD_WIDTH}
                variant="raised"
                selected={selection?.kind === "task" && selection.taskId === node.id}
                onClick={() => onTaskSelect(node.id)}
                enterAnimation
                isDragging={draggingTaskId === node.id}
                draggable
                onDragStart={onTaskDragStart(node.id)}
                onDragEnd={onTaskDragEnd}
                dataTaskId={node.id}
                dataCardId={node.id}
              >
                <CardEyebrow
                  icon={<TaskIcon className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
                  right={
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={node.enabled}
                        onCheckedChange={(v) => onTaskEnabledChange(node.id, v)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                    </div>
                  }
                >
                  Task
                </CardEyebrow>
                <CardTitle>
                  {startIndexLabel + i}. {node.label}
                </CardTitle>
                <CardDescription>{node.description}</CardDescription>
              </BuilderCard>
            </DragHandleWrapper>
          ) : (
            <BranchBlock
              branch={node}
              indexLabel={startIndexLabel + i}
              activeDrag={activeDrag}
              draggingTaskId={draggingTaskId}
              selection={selection}
              onTaskSelect={onTaskSelect}
              onBranchSelect={onBranchSelect}
              onTaskEnabledChange={onTaskEnabledChange}
              onBranchEnabledChange={onBranchEnabledChange}
              onTaskDragStart={onTaskDragStart}
              onTaskDragEnd={onTaskDragEnd}
              topLevelDrop={topLevelDrop}
              laneDrop={laneDrop}
            />
          )}
        </Fragment>
      ))}
      <Connector />
      <DropSlot accept="task" activeDrag={activeDrag} onDrop={dropAt(nodes.length)} />
    </>
  );
}

interface BranchBlockProps {
  branch: PlacedBranch;
  indexLabel: number;
  activeDrag: DragKind;
  draggingTaskId: string | null;
  selection: CanvasSelection;
  onTaskSelect: (taskId: string) => void;
  onBranchSelect: (branchId: string) => void;
  onTaskEnabledChange: (taskId: string, enabled: boolean) => void;
  onBranchEnabledChange: (branchId: string, enabled: boolean) => void;
  onTaskDragStart: (taskId: string) => (e: ReactDragEvent<HTMLDivElement>) => void;
  onTaskDragEnd: () => void;
  topLevelDrop: (atIndex: number) => (e: ReactDragEvent<HTMLDivElement>) => void;
  laneDrop: (laneId: string, atIndex: number) => (e: ReactDragEvent<HTMLDivElement>) => void;
}

function BranchBlock({
  branch,
  indexLabel,
  activeDrag,
  draggingTaskId,
  selection,
  onTaskSelect,
  onBranchSelect,
  onTaskEnabledChange,
  onBranchEnabledChange,
  onTaskDragStart,
  onTaskDragEnd,
  topLevelDrop,
  laneDrop,
}: BranchBlockProps) {
  const isSelected = selection?.kind === "branch" && selection.branchId === branch.id;
  return (
    <div className="flex flex-col items-center">
      <BuilderCard
        width={CARD_WIDTH}
        variant="raised"
        selected={isSelected}
        onClick={() => onBranchSelect(branch.id)}
        enterAnimation
        dataCardId={branch.id}
      >
        <CardEyebrow
          icon={<GitBranch className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
          right={
            <div className="flex items-center gap-2">
              <Switch
                checked={branch.enabled}
                onCheckedChange={(v) => onBranchEnabledChange(branch.id, v)}
                onClick={(e) => e.stopPropagation()}
              />
              <Plus className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
              <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
            </div>
          }
        >
          {branch.label}
        </CardEyebrow>
        <CardTitle>
          {indexLabel}. Based on {branch.branchType === "condition" ? "conditions" : branch.branchType}
        </CardTitle>
        <CardDescription>{branch.description}</CardDescription>
      </BuilderCard>

      {/* Lanes panel */}
      <Connector />
      <div className="rounded-2xl border-2 border-[#c4cbd6]/60 bg-white/30 p-4 dark:border-[#3d4555]/60 dark:bg-[#1e2229]/30">
        <div className="flex items-start gap-6">
          {branch.lanes.map((lane) => (
            <div key={lane.id} className="flex flex-col items-center gap-1 min-w-[360px]">
              <span className="max-w-[200px] truncate rounded border border-[#e5e9f0] bg-white px-3 py-1 text-xs text-[#212121] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#f3f4f6]">
                {lane.name || (lane.isDefault ? "No conditions met" : "Lane")}
              </span>
              <NodeFlow
                nodes={lane.nodes}
                startIndexLabel={1}
                activeDrag={activeDrag}
                draggingTaskId={draggingTaskId}
                selection={selection}
                onTaskSelect={onTaskSelect}
                onBranchSelect={onBranchSelect}
                onTaskEnabledChange={onTaskEnabledChange}
                onBranchEnabledChange={onBranchEnabledChange}
                onTaskDragStart={onTaskDragStart}
                onTaskDragEnd={onTaskDragEnd}
                topLevelDrop={topLevelDrop}
                laneDrop={laneDrop}
                laneId={lane.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Builder primitives ────────────────────────────────────────────────────

interface BuilderCardProps {
  width: string;
  variant: "raised" | "pill";
  selected?: boolean;
  enterAnimation?: boolean;
  onClick?: () => void;
  /** When true, the card itself becomes a drag source (along with any grip handle). */
  draggable?: boolean;
  onDragStart?: (e: ReactDragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
  /** Visual hint while this card is being dragged. */
  isDragging?: boolean;
  /** Optional id used by the drag-preview lookup (data-task-id). */
  dataTaskId?: string;
  /** Stable id used by the auto-center logic to find a card by selection. */
  dataCardId?: string;
  children: React.ReactNode;
}

function BuilderCard({
  width,
  variant,
  selected,
  enterAnimation,
  onClick,
  draggable,
  onDragStart,
  onDragEnd,
  isDragging,
  dataTaskId,
  dataCardId,
  children,
}: BuilderCardProps) {
  const radius = variant === "pill" ? "rounded-full" : "rounded-xl";
  const shadow =
    variant === "pill"
      ? "shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      : "shadow-[0_2px_8px_rgba(15,23,42,0.08)]";
  const padding = variant === "pill" ? "px-5 py-3" : "p-4";
  const ring = selected
    ? "ring-2 ring-[#1976d2] dark:ring-[#5b9bf5]"
    : "ring-1 ring-transparent hover:ring-1 hover:ring-[#c4d5e9] dark:hover:ring-[#3d4555]";
  const enter = enterAnimation
    ? "animate-in fade-in zoom-in-95 slide-in-from-top-1 duration-300"
    : "animate-in fade-in zoom-in-95 duration-300";
  const dragState = isDragging ? "scale-[0.97] opacity-60" : "";
  const cursor = draggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer";
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      data-task-id={dataTaskId}
      data-card-id={dataCardId}
      className={`flex ${width} flex-col gap-2 ${radius} bg-white ${padding} text-left ${shadow} outline-none transition-[background-color,box-shadow,opacity,transform] duration-200 ease-out ${enter} ${ring} ${cursor} ${dragState} dark:bg-[#262b35]`}
    >
      {children}
    </div>
  );
}

interface DragHandleWrapperProps {
  onDragStart: (e: ReactDragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  children: React.ReactNode;
}

/** Wraps a card and renders a larger grip handle floating to the left. */
function DragHandleWrapper({ onDragStart, onDragEnd, children }: DragHandleWrapperProps) {
  const handleDragStart = (e: ReactDragEvent<HTMLDivElement>) => {
    // Stop the wrapper's drag from being shadowed by the card body's own drag.
    e.stopPropagation();
    onDragStart(e);
  };
  return (
    <div className="group/card relative flex flex-col items-center">
      <div
        role="button"
        aria-label="Drag to reorder"
        tabIndex={0}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        className="absolute left-[-32px] top-1/2 flex h-9 w-7 -translate-y-1/2 cursor-grab items-center justify-center rounded-md text-[#9ca3af] opacity-0 transition-opacity duration-150 ease-out hover:bg-[#f4f6f7] hover:text-[#212121] hover:opacity-100 active:cursor-grabbing group-hover/card:opacity-100 group-focus-within/card:opacity-100 dark:text-[#6b7280] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      {children}
    </div>
  );
}

function CardEyebrow({
  icon,
  right,
  children,
}: {
  icon: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
        {icon}
        {children}
      </span>
      {right ?? <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />}
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

interface DropSlotProps {
  accept: "trigger" | "task";
  activeDrag: DragKind;
  onDrop: (e: ReactDragEvent<HTMLDivElement>) => void;
  /** Helper text shown when the slot is the active hover target. */
  label?: string;
  /** When idle: show a small `+` button (default), or render nothing. */
  idleHandle?: "plus" | "none";
}

function DropSlot({
  accept,
  activeDrag,
  onDrop,
  label,
  idleHandle = "plus",
}: DropSlotProps) {
  const [hovering, setHovering] = useState(false);
  // Task slots accept tasks, task-reorders (moving an existing card), and branches.
  const accepts = (k: DragKind) =>
    k === accept ||
    (accept === "task" && (k === "task-reorder" || k === "branch"));
  const dragging = accepts(activeDrag);

  const handleDragOver = (e: ReactDragEvent<HTMLDivElement>) => {
    const kind = readDragKind(e.dataTransfer.types);
    if (!accepts(kind)) return;
    e.preventDefault();
    // Match `effectAllowed` set by the source — mismatch silently rejects the drop.
    e.dataTransfer.dropEffect = kind === "task-reorder" ? "move" : "copy";
    if (!hovering) setHovering(true);
  };
  const handleDragLeave = (e: ReactDragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
  };
  const handleDrop = (e: ReactDragEvent<HTMLDivElement>) => {
    setHovering(false);
    onDrop(e);
  };

  // Idle (no drag): tiny `+` handle (or nothing). Drag-active: full drop zone.
  if (!dragging) {
    if (idleHandle === "none") return null;
    return (
      <div
        role="button"
        aria-label="Add step here"
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[#c4cbd6] bg-white text-[#6b7280] transition-colors duration-200 hover:border-[#1976d2] hover:text-[#1976d2] dark:border-[#3d4555] dark:bg-[#262b35] dark:text-[#9ba2b0] dark:hover:border-[#5b9bf5] dark:hover:text-[#5b9bf5]"
      >
        <Plus className="h-3 w-3" />
      </div>
    );
  }

  // Distinguish the two drag intents:
  //   - "add new" (trigger / task from the left rail) → Plus + "add" copy
  //   - "rearrange" (task-reorder from an existing card) → ArrowDownToLine + "move" copy
  const isReorder = activeDrag === "task-reorder";
  const fallbackAddLabel =
    accept === "trigger" ? "Drop to add trigger" : "Drop to add task";
  const reorderLabel = "Drop to move task here";
  const ZoneIcon = isReorder ? ArrowDownToLine : Plus;
  const zoneLabel = isReorder ? reorderLabel : (label ?? fallbackAddLabel);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex ${CARD_WIDTH} items-center justify-center overflow-hidden rounded-xl border-2 transition-[background-color,border-color] duration-200 ease-out animate-in fade-in zoom-in-95 duration-200 ${
        hovering
          ? "h-14 border-[#1976d2] bg-[#1976d214] dark:border-[#5b9bf5] dark:bg-[#1c2c4a]"
          : "h-14 border-dashed border-[#c4d5e9] bg-[#1976d20a] dark:border-[#3d4555] dark:bg-[#1c2c4a66]"
      }`}
    >
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
          hovering ? "text-[#1976d2] dark:text-[#5b9bf5]" : "text-[#6b7280] dark:text-[#9ba2b0]"
        }`}
      >
        <ZoneIcon className="h-3.5 w-3.5" />
        {zoneLabel}
      </span>
    </div>
  );
}

function CanvasToolButton({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`flex h-8 w-8 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] disabled:cursor-not-allowed dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6] ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}

interface AgentDetailsPanelProps {
  name: string;
  onNameChange: (next: string) => void;
  goals: string;
  onGoalsChange: (next: string) => void;
  outcomes: string;
  onOutcomesChange: (next: string) => void;
  locations: string[];
  onClose: () => void;
}

function AgentDetailsPanel({
  name,
  onNameChange,
  goals,
  onGoalsChange,
  outcomes,
  onOutcomesChange,
  locations,
  onClose,
}: AgentDetailsPanelProps) {
  return (
    <aside className="flex w-[340px] shrink-0 flex-col rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] animate-in slide-in-from-right-4 fade-in duration-300 ease-out dark:bg-[#1e2229]">
      <header className="flex items-center justify-between border-b border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <h3 className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">Agent details</h3>
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
        <Field label="Agent name" required>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-9"
          />
        </Field>
        <Field label="Goals" required>
          <Textarea
            value={goals}
            onChange={(e) => onGoalsChange(e.target.value)}
            rows={5}
            className="resize-none text-sm leading-5"
          />
        </Field>
        <Field label="Outcomes">
          <Textarea
            value={outcomes}
            onChange={(e) => onOutcomesChange(e.target.value)}
            rows={4}
            className="resize-none text-sm leading-5"
          />
        </Field>
        <Field label="Locations" required tooltip>
          <div className="flex flex-wrap gap-1.5">
            {locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex h-7 items-center rounded-md bg-[#f4f6f7] px-2.5 text-xs text-[#212121] transition-colors hover:bg-[#E5E9F0] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:bg-[#2c333f]"
              >
                {loc}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="mt-2 text-xs font-medium text-[#1976d2] hover:underline dark:text-[#5b9bf5]"
          >
            + 100 more
          </button>
        </Field>
      </div>

      <footer className="border-t border-[#e5e9f0] p-4 dark:border-[#252b35]">
        <Button size="sm" className="h-9 w-full">
          Save
        </Button>
      </footer>
    </aside>
  );
}

interface TriggerTypePickerProps {
  currentTypeId: string;
  currentSubId: string;
  onChange: (typeId: string, sub: TriggerSubOption) => void;
  trigger: React.ReactNode;
}

/**
 * Two-pane trigger type picker. Left column lists trigger types; right column
 * shows the sub-options for the highlighted type (or a single CTA when the
 * type is flat). Selection commits and closes the popover.
 */
function TriggerTypePicker({
  currentTypeId,
  currentSubId,
  onChange,
  trigger,
}: TriggerTypePickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hoveredTypeId, setHoveredTypeId] = useState(currentTypeId);

  const q = search.trim().toLowerCase();
  const filteredTypes = TRIGGER_OPTIONS.filter((t) => {
    if (!q) return true;
    if (t.label.toLowerCase().includes(q)) return true;
    return (t.subOptions ?? []).some((s) => s.label.toLowerCase().includes(q));
  });

  const activeType =
    TRIGGER_OPTIONS.find((t) => t.id === hoveredTypeId) ??
    filteredTypes[0] ??
    TRIGGER_OPTIONS[0];

  const commit = (typeId: string, sub: TriggerSubOption) => {
    onChange(typeId, sub);
    setOpen(false);
    setSearch("");
  };

  const commitFlat = (type: TriggerSourceOption) => {
    // Synthesize a sub-option for flat trigger types.
    commit(type.id, {
      id: type.id,
      label: type.label,
      description: `Triggers on ${type.label.toLowerCase()} events.`,
    });
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setHoveredTypeId(currentTypeId);
      }}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={12}
        className="w-[560px] overflow-hidden rounded-xl border border-[#e5e9f0] bg-white p-0 shadow-[0_16px_40px_rgba(15,23,42,0.16)] dark:border-[#333a47] dark:bg-[#1e2229]"
      >
        {/* Header — title, helper text, search */}
        <div className="flex flex-col gap-3 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-sm font-semibold text-[#212121] dark:text-[#f3f4f6]">
                Choose a trigger
              </h4>
              <p className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                Pick the event that starts this workflow
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280] dark:text-[#9ba2b0]" />
            <Input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search triggers"
              className="h-9 pl-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-[220px_1fr] border-t border-[#e5e9f0] dark:border-[#252b35]">
          {/* Left pane — type list */}
          <div className="max-h-[360px] overflow-y-auto border-r border-[#e5e9f0] px-2 py-3 dark:border-[#252b35]">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9ba2b0]">
              Type
            </p>
            <div className="flex flex-col gap-0.5">
              {filteredTypes.map((t) => {
                const isHovered = t.id === activeType.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onMouseEnter={() => setHoveredTypeId(t.id)}
                    onFocus={() => setHoveredTypeId(t.id)}
                    className={`flex h-10 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm transition-colors ${
                      isHovered
                        ? "bg-[#f4f6f7] text-[#212121] dark:bg-[#262b35] dark:text-[#f3f4f6]"
                        : "text-[#212121] hover:bg-[#f4f6f7] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
                    }`}
                  >
                    <span className="flex-1 truncate">{t.label}</span>
                    {(t.subOptions?.length ?? 0) > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#9ca3af] dark:text-[#6b7280]" />
                    )}
                  </button>
                );
              })}
              {filteredTypes.length === 0 && (
                <p className="px-3 py-2 text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                  No matches
                </p>
              )}
            </div>
          </div>

          {/* Right pane — sub-options or flat CTA */}
          <div className="max-h-[360px] overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-0.5 pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9ba2b0]">
                {activeType.label}
              </p>
              <p className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                {activeType.subOptions && activeType.subOptions.length > 0
                  ? `Triggers tied to ${activeType.label.toLowerCase()} events`
                  : `Fires on ${activeType.label.toLowerCase()} events`}
              </p>
            </div>
            {activeType.subOptions && activeType.subOptions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {activeType.subOptions.map((sub) => {
                  const isCurrent =
                    activeType.id === currentTypeId && sub.id === currentSubId;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => commit(activeType.id, sub)}
                      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                        isCurrent
                          ? "border-[#1976d2] bg-[#eff6ff] dark:border-[#5b9bf5] dark:bg-[#1e2a44]"
                          : "border-[#e5e9f0] bg-white hover:border-[#c4d5e9] hover:bg-[#f8fafc] dark:border-[#333a47] dark:bg-[#262b35] dark:hover:border-[#5580e0]"
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-sm font-medium leading-5 text-[#212121] dark:text-[#f3f4f6]">
                          {sub.label}
                        </span>
                        <span className="text-xs leading-5 text-[#6b7280] dark:text-[#9ba2b0]">
                          {sub.description}
                        </span>
                      </div>
                      {isCurrent && (
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#1976d2] dark:text-[#5b9bf5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-4 rounded-lg border border-[#e5e9f0] bg-[#f8fafc] px-4 py-4 dark:border-[#333a47] dark:bg-[#262b35]">
                <p className="text-xs leading-5 text-[#6b7280] dark:text-[#9ba2b0]">
                  This trigger fires whenever a {activeType.label.toLowerCase()} event occurs.
                </p>
                <Button
                  size="sm"
                  className="h-9 self-start"
                  onClick={() => commitFlat(activeType)}
                >
                  Use this trigger
                </Button>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface TriggerConfigPanelProps {
  currentTypeId: string;
  currentSubId: string;
  onTypeChange: (typeId: string, sub: TriggerSubOption) => void;
  name: string;
  onNameChange: (next: string) => void;
  description: string;
  onDescriptionChange: (next: string) => void;
  onClose: () => void;
}

function TriggerConfigPanel({
  currentTypeId,
  currentSubId,
  onTypeChange,
  name,
  onNameChange,
  description,
  onDescriptionChange,
  onClose,
}: TriggerConfigPanelProps) {
  const [conditions, setConditions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ]);

  const currentType =
    TRIGGER_OPTIONS.find((t) => t.id === currentTypeId) ?? TRIGGER_OPTIONS[0];

  return (
    <aside className="flex w-[340px] shrink-0 flex-col rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] animate-in slide-in-from-right-4 fade-in duration-300 ease-out dark:bg-[#1e2229]">
      <header className="flex items-center justify-between border-b border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <h3 className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">Trigger</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Run"
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <Play className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Expand"
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
        <Field label="Trigger type" required>
          <TriggerTypePicker
            currentTypeId={currentTypeId}
            currentSubId={currentSubId}
            onChange={onTypeChange}
            trigger={
              <button
                type="button"
                className="flex h-9 w-full items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 text-sm text-[#212121] transition-colors hover:border-[#c4d5e9] hover:bg-[#f8fafc] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:border-[#5580e0]"
              >
                <span className="flex-1 truncate text-left">{currentType.label}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-[#9ca3af] dark:text-[#6b7280]" />
              </button>
            }
          />
        </Field>
        <Field label="Trigger name" required>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-9"
          />
        </Field>
        <Field label="Description" required>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="resize-none text-sm leading-5"
          />
        </Field>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
            Trigger conditions
          </span>
          {conditions.map((c, i) => (
            <button
              key={c.id}
              type="button"
              style={{ animationDelay: `${i * 40}ms` }}
              className="flex h-9 items-center justify-between rounded-md border border-[#e5e9f0] bg-white px-3 text-sm text-[#6b7280] transition-colors duration-200 ease-out hover:border-[#c4d5e9] hover:bg-[#f8fafc] animate-in fade-in slide-in-from-right-1 duration-300 fill-mode-backwards dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#9ba2b0] dark:hover:border-[#5580e0]"
            >
              {c.value || "Select"}
              <ChevronDown className="h-4 w-4" />
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              setConditions((cs) => [...cs, { id: Date.now(), value: "" }])
            }
            className="mt-1 inline-flex items-center gap-1 self-start text-xs font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add condition
          </button>
        </div>
        <button
          type="button"
          className="self-start text-xs font-medium text-[#1976d2] hover:underline dark:text-[#5b9bf5]"
        >
          Advanced filters
        </button>
      </div>

      <footer className="border-t border-[#e5e9f0] p-4 dark:border-[#252b35]">
        <Button size="sm" className="h-9 w-full">
          Save
        </Button>
      </footer>
    </aside>
  );
}

interface TaskConfigPanelProps {
  name: string;
  onNameChange: (next: string) => void;
  description: string;
  onDescriptionChange: (next: string) => void;
  prompt: string;
  onPromptChange: (next: string) => void;
  onClose: () => void;
}

const DEFAULT_CONTEXT_CHIPS = [
  { id: "ctx-1", label: "Review.comment", kind: "var" as const },
  { id: "ctx-2", label: "Review.source", kind: "var" as const },
  { id: "ctx-3", label: "https://www.yelp.com/guidelines", kind: "url" as const },
];

const DEFAULT_INPUT_CHIPS = [
  { id: "in-1", label: "Review.comment" },
  { id: "in-2", label: "Review.source" },
  { id: "in-3", label: "Review.rating" },
];

const DEFAULT_OUTPUT_CHIPS = [
  { id: "out-1", label: "Review.isSpam" },
  { id: "out-2", label: "Review.spamReason" },
];

const DEFAULT_USER_PROMPT_PRE =
  "1. If the review content violates any content terms of ";
const DEFAULT_USER_PROMPT_POST =
  " treat it as spam.\n\n2. If the review contains business-unrelated self-promotion or distracts from the business profile, also treat it as spam.";

function TaskConfigPanel({
  name,
  onNameChange,
  description,
  onDescriptionChange,
  prompt,
  onPromptChange,
  onClose,
}: TaskConfigPanelProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="flex w-[360px] shrink-0 flex-col rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] animate-in slide-in-from-right-4 fade-in duration-300 ease-out dark:bg-[#1e2229]">
      <header className="flex items-center justify-between border-b border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <h3 className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">Task</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Run"
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <Play className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Expand"
            onClick={() => setExpanded(true)}
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
        <TaskFieldStack
          name={name}
          onNameChange={onNameChange}
          description={description}
          onDescriptionChange={onDescriptionChange}
          prompt={prompt}
          onPromptChange={onPromptChange}
        />
      </div>

      <footer className="flex flex-col gap-3 border-t border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <PromptStrengthMeter />
        <Button size="sm" className="h-9 w-full">
          Save
        </Button>
      </footer>
      <TaskExpandedDialog
        open={expanded}
        onOpenChange={setExpanded}
        name={name}
        onNameChange={onNameChange}
        description={description}
        onDescriptionChange={onDescriptionChange}
        prompt={prompt}
        onPromptChange={onPromptChange}
      />
    </aside>
  );
}

interface TaskFieldStackProps {
  name: string;
  onNameChange: (next: string) => void;
  description: string;
  onDescriptionChange: (next: string) => void;
  prompt: string;
  onPromptChange: (next: string) => void;
}

function TaskFieldStack({
  name,
  onNameChange,
  description,
  onDescriptionChange,
  prompt,
  onPromptChange,
}: TaskFieldStackProps) {
  const [contextPickerOpen, setContextPickerOpen] = useState(false);
  return (
    <>
      <Field label="Task name" required>
        <Input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="h-9"
        />
      </Field>
      <Field label="Description" required>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={5}
          className="resize-none text-sm leading-5"
        />
      </Field>
      <Field label="LLM Model" tooltip>
        <button
          type="button"
          className="flex h-9 items-center justify-between rounded-md border border-[#e5e9f0] bg-white px-3 text-sm text-[#212121] transition-colors hover:border-[#c4d5e9] hover:bg-[#f8fafc] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:border-[#5580e0]"
        >
          Fast
          <ChevronDown className="h-4 w-4 text-[#6b7280]" />
        </button>
      </Field>
      <Field label="Context" tooltip>
        <ChipField>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_CONTEXT_CHIPS.map((c, i) => (
              <ContextChip key={c.id} chip={c} index={i} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setContextPickerOpen(true)}
            className="mt-2 self-start text-xs font-medium text-[#1976d2] hover:underline dark:text-[#5b9bf5]"
          >
            + 8 more
          </button>
        </ChipField>
      </Field>
      <Field label="Input fields" tooltip>
        <ChipField>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_INPUT_CHIPS.map((c, i) => (
              <ContextChip
                key={c.id}
                chip={{ ...c, kind: "var" }}
                index={i}
                removable
              />
            ))}
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 self-start text-xs font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </ChipField>
      </Field>
      <Field label="System prompt" required>
        <PromptField>
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            rows={4}
            className="w-full resize-none bg-transparent px-3 pt-3 text-sm leading-5 text-[#212121] outline-none placeholder:text-[#9ca3af] dark:text-[#e4e4e4] dark:placeholder:text-[#6b7280]"
          />
          <PromptToolbar variant="system" />
        </PromptField>
      </Field>
      <Field label="User prompt" required>
        <PromptField>
          <div className="px-3 pt-3 pb-1 text-sm leading-5 text-[#212121] dark:text-[#e4e4e4]">
            <p className="whitespace-pre-wrap">
              {DEFAULT_USER_PROMPT_PRE}
              <ContextChip
                chip={{ id: "userp-1", label: "Review.source", kind: "var" }}
                index={0}
                removable
              />
              {DEFAULT_USER_PROMPT_POST}
            </p>
          </div>
          <PromptToolbar variant="user" />
        </PromptField>
      </Field>
      <Field label="Output fields">
        <ChipField>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_OUTPUT_CHIPS.map((c, i) => (
              <ContextChip
                key={c.id}
                chip={{ ...c, kind: "var" }}
                index={i}
                removable
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#6834b7] transition-colors hover:underline dark:text-[#b39ae5]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate from prompt
            </button>
          </div>
        </ChipField>
      </Field>
      <ContextPickerDialog
        open={contextPickerOpen}
        onOpenChange={setContextPickerOpen}
      />
    </>
  );
}

function PromptStrengthMeter({
  strength = "strong",
}: {
  strength?: "weak" | "strong";
}) {
  const isStrong = strength === "strong";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#212121] dark:text-[#f3f4f6]">
          Prompt strength:
        </span>
        <span
          className={`transition-colors duration-700 ease-out ${
            isStrong
              ? "text-[#16a34a] dark:text-[#4ade80]"
              : "text-[#dc2626] dark:text-[#f87171]"
          }`}
        >
          {isStrong ? "Strong" : "Weak"}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e9f0] dark:bg-[#262b35]">
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-700 ease-out ${
            isStrong ? "bg-[#22c55e]" : "bg-[#ef4444]"
          }`}
          style={{ width: isStrong ? "85%" : "20%" }}
        />
      </div>
    </div>
  );
}

interface TaskExpandedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  onNameChange: (next: string) => void;
  description: string;
  onDescriptionChange: (next: string) => void;
  prompt: string;
  onPromptChange: (next: string) => void;
}

type PreviewState = "idle" | "running" | "ready";

export function TaskExpandedDialog({
  open,
  onOpenChange,
  name,
  onNameChange,
  description,
  onDescriptionChange,
  prompt,
  onPromptChange,
}: TaskExpandedDialogProps) {
  const [previewState, setPreviewState] = useState<PreviewState>("idle");

  // Reset preview when the dialog closes so reopening starts fresh.
  useEffect(() => {
    if (!open) setPreviewState("idle");
  }, [open]);

  const handleRun = () => {
    setPreviewState("running");
    window.setTimeout(() => setPreviewState("ready"), RUNNING_TOTAL_DURATION_MS);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 flex w-[min(1120px,calc(100vw-3rem))] h-[min(720px,calc(100vh-3rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-[#1e2229]"
        >
          <header className="flex items-center justify-between border-b border-[#e5e9f0] px-6 py-4 dark:border-[#252b35]">
            <DialogPrimitive.Title className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
              Task
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close"
              className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </header>

          <div className="grid flex-1 min-h-0 grid-cols-2">
            <div className="flex flex-col gap-5 overflow-y-auto border-r border-[#e5e9f0] px-6 py-6 dark:border-[#252b35]">
              <TaskFieldStack
                name={name}
                onNameChange={onNameChange}
                description={description}
                onDescriptionChange={onDescriptionChange}
                prompt={prompt}
                onPromptChange={onPromptChange}
              />
            </div>
            <div className="flex min-h-0 flex-col overflow-hidden bg-[#f4f6f7] dark:bg-[#1a1d23]">
              <TaskPreviewPane state={previewState} onRun={handleRun} />
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-[#e5e9f0] px-6 py-4 dark:border-[#252b35]">
            <div className="w-[280px]">
              <PromptStrengthMeter
                strength={previewState === "ready" ? "strong" : "weak"}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-4 text-[#1976d2] hover:bg-[#ecf2fb] dark:text-[#5b9bf5] dark:hover:bg-[#1c2c4a]"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="h-9 px-4"
                onClick={() => onOpenChange(false)}
              >
                Save
              </Button>
            </div>
          </footer>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

type PreviewRow =
  | { id: string; kind: "number" | "string"; value: string }
  | { id: string; kind: "object"; rows: PreviewRow[] };

const PREVIEW_INPUT_ROWS = [
  {
    id: "review_text",
    value: "I went for a root canal, Mr.John was very professional",
  },
];

const PREVIEW_AGENT_OUTPUT_ROWS: PreviewRow[] = [
  { id: "id", kind: "number", value: "545043398" },
  { id: "overallRating", kind: "number", value: "5" },
  { id: "comments", kind: "string", value: "\"This is a great place for boon...\"" },
  { id: "businessAggregationId", kind: "number", value: "9651531" },
  { id: "sourceType", kind: "string", value: "\"Google\"" },
];

const PREVIEW_TOOL_OUTPUT_ROWS: PreviewRow[] = [
  { id: "comments", kind: "string", value: "\"This is a great place for boon...\"" },
  { id: "sourceType", kind: "string", value: "\"Google\"" },
  { id: "reviewDate", kind: "string", value: "\"Fri, Mar 27, 2026 12:46 AM\"" },
  {
    id: "reviewer",
    kind: "object",
    rows: [
      { id: "comments", kind: "string", value: "\"This is a great place for boon...\"" },
      { id: "sourceType", kind: "string", value: "\"Google\"" },
    ],
  },
  { id: "reviewDate", kind: "string", value: "\"Fri, Mar 27, 2026 12:46 AM\"" },
  { id: "status", kind: "number", value: "2" },
  { id: "featured", kind: "number", value: "false" },
];

const PREVIEW_TOOL_PROPERTY_COUNT = 6;

function TaskPreviewPane({
  state,
  onRun,
}: {
  state: PreviewState;
  onRun: () => void;
}) {
  if (state === "idle") {
    return (
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-5 px-8 py-8 text-center animate-in fade-in duration-300">
        <PreviewPlaceholderIllustration />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
            Your preview will appear here
          </span>
          <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
            Run task to generate preview
          </span>
        </div>
        <button
          type="button"
          onClick={onRun}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-[#ecf2fb] px-4 text-sm font-medium text-[#1976d2] transition-colors hover:bg-[#dde7f4] dark:bg-[#1c2c4a] dark:text-[#5b9bf5] dark:hover:bg-[#1f3357]"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Run task
        </button>
      </div>
    );
  }

  if (state === "running") {
    return <RunningStepper />;
  }

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-[#e5e9f0] bg-[#f4f6f7] px-5 py-4 dark:border-[#252b35] dark:bg-[#1a1d23]">
        <span className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
          Preview
        </span>
        <button
          type="button"
          onClick={onRun}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#ecf2fb] px-3 text-xs font-medium text-[#1976d2] transition-colors hover:bg-[#dde7f4] dark:bg-[#1c2c4a] dark:text-[#5b9bf5] dark:hover:bg-[#1f3357]"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Run task
        </button>
      </div>

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden px-5 py-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
        <PreviewInputTable rows={PREVIEW_INPUT_ROWS} />
        <PreviewOutputCard />
        <PreviewFeedback />
      </div>
    </div>
  );
}

function PreviewInputTable({
  rows,
}: {
  rows: { id: string; value: string }[];
}) {
  return (
    <div className="flex shrink-0 max-h-[110px] flex-col overflow-hidden rounded-lg border border-[#e5e9f0] bg-white dark:border-[#333a47] dark:bg-[#262b35]">
      <div className="grid shrink-0 grid-cols-[1fr_1.4fr_28px] items-center gap-2 border-b border-[#e5e9f0] px-3 py-2 text-xs font-medium text-[#6b7280] dark:border-[#333a47] dark:text-[#9ba2b0]">
        <span>Input fields</span>
        <span>Values</span>
        <span />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_1.4fr_28px] items-start gap-2 px-3 py-2.5"
          >
            <div>
              <span className="inline-flex h-6 items-center gap-1 rounded-md bg-[#ecf2fb] px-2 text-xs text-[#212121] dark:bg-[#1c2c4a] dark:text-[#e4e4e4]">
                <Braces className="h-3 w-3 text-[#1976d2] dark:text-[#5b9bf5]" />
                <span className="max-w-[140px] truncate">{row.id}</span>
              </span>
            </div>
            <p className="text-xs leading-5 text-[#212121] dark:text-[#e4e4e4]">
              {row.value}
            </p>
            <button
              type="button"
              aria-label="More"
              className="flex h-6 w-6 items-center justify-center rounded text-[#9ca3af] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#6b7280] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewOutputCard() {
  return (
    <JsonInspectorCard
      className="shrink-0 max-h-[340px]"
      sections={[
        {
          id: "agent-output",
          label: "Agent output",
          rows: PREVIEW_AGENT_OUTPUT_ROWS,
        },
        {
          id: "tool-output",
          label: (
            <>
              Tool : Review responder{" "}
              <span className="font-normal text-[#6b7280] dark:text-[#9ba2b0]">
                {`{ ${PREVIEW_TOOL_PROPERTY_COUNT} properties }`}
              </span>
            </>
          ),
          rows: PREVIEW_TOOL_OUTPUT_ROWS,
        },
      ]}
    />
  );
}

export interface JsonInspectorSection {
  id: string;
  label: React.ReactNode;
  rows: PreviewRow[];
  defaultOpen?: boolean;
}

export function JsonInspectorCard({
  sections,
  className,
}: {
  sections: JsonInspectorSection[];
  className?: string;
}) {
  const defaultOpen = sections
    .filter((s) => s.defaultOpen !== false)
    .map((s) => s.id);
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg border border-[#e5e9f0] bg-white dark:border-[#333a47] dark:bg-[#262b35] ${className ?? ""}`}
    >
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={defaultOpen}
          className="flex flex-col"
        >
          {sections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-0"
            >
              <AccordionTrigger className="items-center justify-start gap-0 px-3 py-2 text-xs font-medium text-[#212121] hover:no-underline dark:text-[#f3f4f6] [&>svg]:order-first [&>svg]:mr-1.5 [&>svg]:translate-y-0">
                <span>{section.label}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="flex flex-col">
                  {section.rows.map((row, i) => (
                    <JsonInspectorRow
                      key={`${row.id}-${i}`}
                      row={row}
                      depth={1}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

function JsonInspectorRow({
  row,
  depth,
}: {
  row: PreviewRow;
  depth: number;
}) {
  const paddingLeft = depth * 22 + 12;

  if (row.kind === "object") {
    return (
      <Accordion type="multiple" defaultValue={[row.id]} className="contents">
        <AccordionItem value={row.id} className="border-0">
          <AccordionTrigger
            className="items-center justify-start gap-0 py-1 pr-3 text-xs font-normal text-[#212121] hover:no-underline dark:text-[#f3f4f6] [&>svg]:order-first [&>svg]:mr-1.5 [&>svg]:translate-y-0"
            style={{ paddingLeft }}
          >
            <span className="inline-flex items-center gap-2">
              <JsonChip label={row.id} />
              <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                {`{ ${row.rows.length} properties }`}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-1">
            <div className="flex flex-col">
              {row.rows.map((child, i) => (
                <JsonInspectorRow
                  key={`${child.id}-${i}`}
                  row={child}
                  depth={depth + 1}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  const valueClass =
    row.kind === "number"
      ? "text-[#1976d2] dark:text-[#5b9bf5]"
      : "text-[#16a34a] dark:text-[#4ade80]";
  return (
    <div
      className="flex items-center gap-2 py-1 pr-3"
      style={{ paddingLeft }}
    >
      <JsonChip label={row.id} />
      <span className={`truncate text-xs ${valueClass}`}>{row.value}</span>
    </div>
  );
}

function JsonChip({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-md bg-[#ecf2fb] px-2 text-xs text-[#212121] dark:bg-[#1c2c4a] dark:text-[#e4e4e4]">
      <Braces className="h-3 w-3 text-[#1976d2] dark:text-[#5b9bf5]" />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}

function PreviewFeedback() {
  const [feedback, setFeedback] = useState("");
  return (
    <div className="flex shrink-0 flex-col gap-2">
      <span className="text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
        Your feedback
      </span>
      <div className="flex flex-col gap-2 rounded-lg border border-[#e5e9f0] bg-white p-3 dark:border-[#333a47] dark:bg-[#262b35]">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Output look wrong? Provide feedback to improve your prompt"
          rows={2}
          className="w-full resize-none bg-transparent text-xs leading-5 text-[#212121] outline-none placeholder:text-[#9ca3af] dark:text-[#e4e4e4] dark:placeholder:text-[#6b7280]"
        />
        <div className="flex justify-end">
          <button
            type="button"
            disabled={feedback.trim().length === 0}
            className="inline-flex h-8 items-center rounded-md border border-[#e5e9f0] bg-white px-3 text-xs font-medium text-[#212121] transition-colors hover:border-[#c4d5e9] hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:border-[#5580e0]"
          >
            Submit to revise prompt
          </button>
        </div>
      </div>
    </div>
  );
}

const RUNNING_STEPS: { kind: string; label: string }[] = [
  { kind: "Trigger", label: "When review is received" },
  { kind: "Task 1", label: "Identify relevant mentions" },
  { kind: "Task 2", label: "Detect sentiment" },
  { kind: "Task 3", label: "Filter spam" },
  { kind: "Preview", label: "Generating output" },
];
const RUNNING_STEP_DURATION_MS = 800;
const RUNNING_TOTAL_DURATION_MS =
  RUNNING_STEPS.length * RUNNING_STEP_DURATION_MS;

function RunningStepper() {
  const [step, setStep] = useState(0);
  const [barPercent, setBarPercent] = useState(0);

  useEffect(() => {
    const target = ((step + 1) / RUNNING_STEPS.length) * 100;
    setBarPercent(target);
    if (step >= RUNNING_STEPS.length - 1) return;
    const t = window.setTimeout(
      () => setStep(step + 1),
      RUNNING_STEP_DURATION_MS,
    );
    return () => window.clearTimeout(t);
  }, [step]);

  const current = RUNNING_STEPS[step];

  return (
    <div className="flex flex-1 min-h-0 flex-col items-center justify-center px-8 py-8 animate-in fade-in duration-300">
      <div className="flex w-full max-w-[260px] flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
            Preparing your preview
          </span>
          <span className="tabular-nums text-xs font-medium text-[#1976d2] dark:text-[#5b9bf5]">
            {Math.round(barPercent)}%
          </span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#e5e9f0] dark:bg-[#262b35]">
          <div
            className="relative h-full overflow-hidden rounded-full bg-[#1976d2] transition-[width] duration-[600ms] ease-out dark:bg-[#5b9bf5]"
            style={{ width: `${barPercent}%` }}
          >
            <div className="preview-progress-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          </div>
        </div>
        <div className="mt-2 flex w-full flex-col items-start gap-1">
          <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
            Step {step + 1} of {RUNNING_STEPS.length} · {current.kind}
          </span>
          <span
            key={step}
            className="text-sm font-medium text-[#212121] animate-in fade-in slide-in-from-bottom-1 duration-300 dark:text-[#f3f4f6]"
          >
            {current.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function PreviewPlaceholderIllustration() {
  return (
    <div className="flex h-[180px] w-[220px] items-center justify-center rounded-2xl border border-[#dbe2ec] bg-white/60 dark:border-[#333a47] dark:bg-[#262b35]/40">
      <div className="flex w-[140px] flex-col gap-2.5 rounded-lg border border-[#dbe2ec] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-[#333a47] dark:bg-[#262b35]">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#c4d5e9] dark:bg-[#3d4555]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#c4d5e9] dark:bg-[#3d4555]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#c4d5e9] dark:bg-[#3d4555]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#c4d5e9] dark:bg-[#3d4555]" />
        </div>
      </div>
    </div>
  );
}

function ChipField({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-md border border-[#e5e9f0] bg-white p-2 transition-colors focus-within:border-[#c4d5e9] dark:border-[#333a47] dark:bg-[#262b35] dark:focus-within:border-[#5580e0]">
      {children}
    </div>
  );
}

function PromptField({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-md border border-[#e5e9f0] bg-white transition-colors focus-within:border-[#c4d5e9] dark:border-[#333a47] dark:bg-[#262b35] dark:focus-within:border-[#5580e0]">
      {children}
    </div>
  );
}

function PromptToolbar({ variant }: { variant: "system" | "user" }) {
  return (
    <div className="flex items-center justify-between gap-1 px-2 pb-2 pt-1">
      <div className="flex items-center gap-0.5">
        <PromptToolButton aria-label="Insert variable">
          <Braces className="h-3.5 w-3.5" />
        </PromptToolButton>
        {variant === "user" && (
          <PromptToolButton aria-label="Generate">
            <Wand2 className="h-3.5 w-3.5" />
          </PromptToolButton>
        )}
        <PromptToolButton aria-label="Commands">
          <Command className="h-3.5 w-3.5" />
        </PromptToolButton>
      </div>
      <PromptToolButton aria-label="Expand">
        <ExternalLink className="h-3.5 w-3.5" />
      </PromptToolButton>
    </div>
  );
}

function PromptToolButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
      {...rest}
    >
      {children}
    </button>
  );
}

interface ContextChipProps {
  chip: { id: string; label: string; kind: "var" | "url" };
  index: number;
  removable?: boolean;
}

function ContextChip({ chip, index, removable = true }: ContextChipProps) {
  return (
    <span
      style={{ animationDelay: `${index * 30}ms` }}
      className="inline-flex h-6 items-center gap-1 rounded-md bg-[#ecf2fb] px-2 text-xs text-[#212121] transition-colors animate-in fade-in slide-in-from-right-1 duration-300 fill-mode-backwards hover:bg-[#dde7f4] dark:bg-[#1c2c4a] dark:text-[#e4e4e4] dark:hover:bg-[#1f3357]"
    >
      {chip.kind === "var" ? (
        <Braces className="h-3 w-3 text-[#1976d2] dark:text-[#5b9bf5]" />
      ) : (
        <LinkIcon className="h-3 w-3 text-[#16a34a] dark:text-[#4ade80]" />
      )}
      <span className="max-w-[160px] truncate">{chip.label}</span>
      {removable && (
        <button
          type="button"
          aria-label={`Remove ${chip.label}`}
          className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-white/60 hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-black/20 dark:hover:text-[#f3f4f6]"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  tooltip?: boolean;
  children: React.ReactNode;
}

function Field({ label, required, tooltip, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
        {label}
        {required && <span className="text-[#d92d20]">*</span>}
        {tooltip && <Info className="h-3.5 w-3.5 text-[#9ca3af] dark:text-[#6b7280]" />}
      </label>
      {children}
    </div>
  );
}

interface LibraryTemplateCardProps {
  title: string;
  description: string;
  open: boolean;
  delayMs?: number;
  onUse?: () => void;
}

function LibraryTemplateCard({
  title,
  description,
  open,
  delayMs = 0,
  onUse,
}: LibraryTemplateCardProps) {
  return (
    <div
      className={`group relative flex min-h-[200px] flex-col gap-3 rounded-lg bg-white p-4 transition-[background-color,opacity,transform] duration-300 ease-out hover:bg-[#E5E9F0] dark:bg-[#262b35] dark:hover:bg-[#2c333f] ${
        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      style={{ transitionDelay: open ? `${delayMs}ms` : "0ms" }}
    >
      <h3 className="text-sm font-medium leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#f3f4f6]">
        {title}
      </h3>
      <p className="text-sm leading-5 tracking-[-0.28px] text-[#6b7280] dark:text-[#9ba2b0]">
        {description}
      </p>
      <div className="mt-auto translate-y-1 pt-2 opacity-0 transition-[opacity,transform] duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <Button size="sm" className="h-8" onClick={onUse}>
          Use agent
        </Button>
      </div>
    </div>
  );
}

function WorkflowEmptyStateIllustration() {
  return (
    <div aria-hidden className="relative flex h-[112px] w-[112px] items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ecf2fb] to-[#f3edff] dark:from-[#1c2c4a] dark:to-[#2a2240]" />
      <span className="absolute inset-2 rounded-full border border-dashed border-[#c4d5e9] dark:border-[#3d4555]" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_12px_rgba(25,46,87,0.08)] dark:bg-[#262b35]">
        <Workflow className="h-6 w-6 text-[#1976d2] dark:text-[#5b9bf5]" />
      </span>
      <Sparkles className="absolute -right-1 top-2 h-4 w-4 text-[#6834b7] dark:text-[#b39ae5]" />
      <Star className="absolute -left-2 bottom-3 h-3 w-3 fill-[#1976d2] text-[#1976d2] dark:fill-[#5b9bf5] dark:text-[#5b9bf5]" />
      <span className="absolute -bottom-0.5 right-3 h-1.5 w-1.5 rounded-full bg-[#9aceff] dark:bg-[#5b9bf5]" />
    </div>
  );
}
