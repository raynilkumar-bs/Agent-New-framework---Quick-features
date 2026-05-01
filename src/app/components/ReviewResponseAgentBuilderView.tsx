import { Fragment, useState, type DragEvent as ReactDragEvent } from "react";
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
} from "lucide-react";
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
  subId: string;
  label: string;
  description: string;
  prompt: string;
  enabled: boolean;
}

type CanvasSelection =
  | { kind: "agent" }
  | { kind: "trigger" }
  | { kind: "task"; taskId: string }
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
  const [placedTasks, setPlacedTasks] = useState<PlacedTask[]>([]);

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

  /** Insert a new task at the given position (defaults to end). */
  const handlePlaceTask = (sub: TaskSubOption, atIndex?: number) => {
    const id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next: PlacedTask = {
      id,
      subId: sub.id,
      label: sub.label,
      description: sub.description,
      prompt: sub.systemPrompt ?? "",
      enabled: true,
    };
    setPlacedTasks((tasks) => {
      const insertAt = typeof atIndex === "number" ? atIndex : tasks.length;
      const copy = tasks.slice();
      copy.splice(insertAt, 0, next);
      return copy;
    });
    setSelection({ kind: "task", taskId: id });
  };

  const updateTask = (taskId: string, patch: Partial<PlacedTask>) => {
    setPlacedTasks((tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)),
    );
  };

  const handleReorderTask = (taskId: string, toIndex: number) => {
    setPlacedTasks((tasks) => {
      const fromIndex = tasks.findIndex((t) => t.id === taskId);
      if (fromIndex === -1) return tasks;
      const next = tasks.slice();
      const [moved] = next.splice(fromIndex, 1);
      // Removing the item shifts later indices left by one.
      const adjusted = toIndex > fromIndex ? toIndex - 1 : toIndex;
      next.splice(adjusted, 0, moved);
      return next;
    });
  };

  const selectedTask =
    selection?.kind === "task"
      ? placedTasks.find((t) => t.id === selection.taskId) ?? null
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
              placedTasks={placedTasks}
              onTaskEnabledChange={(taskId, enabled) =>
                updateTask(taskId, { enabled })
              }
              onTaskSelect={(taskId) => setSelection({ kind: "task", taskId })}
              onPlaceTask={handlePlaceTask}
              onReorderTask={handleReorderTask}
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
            <AccordionContent className="px-3 pb-1 pt-1 text-xs text-[#6b7280] dark:text-[#9ba2b0]">
              No controls yet.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
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
  placedTasks: PlacedTask[];
  onTaskEnabledChange: (taskId: string, enabled: boolean) => void;
  onTaskSelect: (taskId: string) => void;
  onPlaceTask: (sub: TaskSubOption, atIndex?: number) => void;
  onReorderTask: (taskId: string, toIndex: number) => void;
}

const CARD_WIDTH = "w-[360px]";

type DragKind = "trigger" | "task" | "task-reorder" | null;

function readDragKind(types: ReadonlyArray<string> | DOMStringList): DragKind {
  const has = (mime: string) => {
    if (Array.isArray(types)) return (types as string[]).includes(mime);
    return Array.from(types).includes(mime);
  };
  if (has(TRIGGER_DRAG_MIME)) return "trigger";
  if (has(TASK_REORDER_MIME)) return "task-reorder";
  if (has(TASK_DRAG_MIME)) return "task";
  return null;
}

function WorkflowCanvas({
  agentName,
  selection,
  onSelectAgent,
  placedTrigger,
  onTriggerSelect,
  onPlaceTrigger,
  placedTasks,
  onTaskEnabledChange,
  onTaskSelect,
  onPlaceTask,
  onReorderTask,
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

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDragEnd}
      className="relative z-10 flex flex-1 flex-col items-center overflow-y-auto px-6 py-6"
    >
      <div className="flex h-10 items-center gap-1 rounded-md border border-[#e5e9f0] bg-white px-1 shadow-[0_1px_3px_rgba(15,23,42,0.06)] animate-in fade-in slide-in-from-top-2 duration-300 dark:border-[#333a47] dark:bg-[#1e2229]">
        <CanvasToolButton aria-label="Download">
          <ArrowDownToLine className="h-4 w-4" />
        </CanvasToolButton>
        <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
        <CanvasToolButton aria-label="Direction">
          <ArrowRight className="h-4 w-4" />
        </CanvasToolButton>
        <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
        <button
          type="button"
          className="flex h-8 items-center gap-1 rounded px-2 text-sm text-[#212121] transition-colors hover:bg-[#f4f6f7] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
        >
          100%
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <span className="h-5 w-px bg-[#e5e9f0] dark:bg-[#333a47]" />
        <CanvasToolButton aria-label="Run">
          <Play className="h-4 w-4" />
        </CanvasToolButton>
      </div>

      <div className="mt-10 flex flex-col items-center">
        {/* Agent header — pill, smaller than the workflow cards */}
        <BuilderCard
          width="w-[280px]"
          variant={placedTrigger ? "pill" : "raised"}
          selected={agentSelected}
          onClick={onSelectAgent}
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

        {/* Task slots + task cards (only meaningful after a trigger is placed) */}
        {placedTrigger && (
          <>
            {placedTasks.map((task, i) => (
              <Fragment key={task.id}>
                <Connector />
                <DropSlot
                  accept="task"
                  activeDrag={activeDrag}
                  onDrop={handleTaskDrop(i)}
                />
                <Connector />
                <DragHandleWrapper
                  onDragStart={handleTaskCardDragStart(task.id)}
                  onDragEnd={handleTaskCardDragEnd}
                >
                  <BuilderCard
                    width={CARD_WIDTH}
                    variant="raised"
                    selected={selection?.kind === "task" && selection.taskId === task.id}
                    onClick={() => onTaskSelect(task.id)}
                    enterAnimation
                    isDragging={draggingTaskId === task.id}
                    draggable
                    onDragStart={handleTaskCardDragStart(task.id)}
                    onDragEnd={handleTaskCardDragEnd}
                    dataTaskId={task.id}
                  >
                    <CardEyebrow
                      icon={<ClipboardList className="h-3.5 w-3.5 text-[#1976d2] dark:text-[#5b9bf5]" />}
                      right={
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={task.enabled}
                            onCheckedChange={(v) => onTaskEnabledChange(task.id, v)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <MoreVertical className="h-4 w-4 text-[#9ca3af] dark:text-[#6b7280]" />
                        </div>
                      }
                    >
                      Task
                    </CardEyebrow>
                    <CardTitle>
                      {i + 2}. {task.label}
                    </CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </BuilderCard>
                </DragHandleWrapper>
              </Fragment>
            ))}

            {/* Trailing slot — small `+` handle when idle, drop zone when dragging */}
            <Connector />
            <DropSlot
              accept="task"
              activeDrag={activeDrag}
              onDrop={handleTaskDrop(placedTasks.length)}
            />
            <Connector />
            <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">End</span>
          </>
        )}
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
  // Task slots also accept task-reorder drags (moving an existing card).
  const accepts = (k: DragKind) =>
    k === accept || (accept === "task" && k === "task-reorder");
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

function CanvasToolButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
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
                const TypeIcon = t.icon;
                const isHovered = t.id === activeType.id;
                const isCurrent = t.id === currentTypeId;
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
                    <TypeIcon className="h-4 w-4 shrink-0 text-[#6b7280] dark:text-[#9ba2b0]" />
                    <span className="flex-1 truncate">{t.label}</span>
                    {isCurrent && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#1976d2] dark:text-[#5b9bf5]" />
                    )}
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
                  const SubIcon = activeType.icon;
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
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#f4f6f7] dark:bg-[#1e2229]">
                        <SubIcon className="h-3.5 w-3.5 text-[#6b7280] dark:text-[#9ba2b0]" />
                      </div>
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
  const CurrentTypeIcon = currentType.icon;

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
                <CurrentTypeIcon className="h-4 w-4 shrink-0 text-[#6b7280] dark:text-[#9ba2b0]" />
                <span className="flex-1 truncate text-left">{currentType.label}</span>
                <span className="text-xs font-medium text-[#1976d2] dark:text-[#5b9bf5]">
                  Change
                </span>
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
      </div>

      <footer className="flex flex-col gap-3 border-t border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#212121] dark:text-[#f3f4f6]">
              Prompt strength:
            </span>
            <span className="text-[#16a34a] dark:text-[#4ade80]">Strong</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5e9f0] dark:bg-[#262b35]">
            <div
              className="h-full rounded-full bg-[#22c55e] transition-[width] duration-500 ease-out"
              style={{ width: "85%" }}
            />
          </div>
        </div>
        <Button size="sm" className="h-9 w-full">
          Save
        </Button>
      </footer>
    </aside>
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
