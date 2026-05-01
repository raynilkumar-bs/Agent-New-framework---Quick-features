import { useState, useCallback } from "react";
import {
  ChevronLeft, Sparkles, Search, ChevronDown, ChevronUp, ChevronRight,
  Clock, Star, MessageSquare, MapPin, Share2, ClipboardList, Ticket,
  Puzzle, MoreVertical, X, Play, Maximize2, PlusCircle, ArrowDown,
  ArrowRight, Zap, Send, ToggleRight, ToggleLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */
type BuilderMode = "ai" | "manual";

interface TriggerItem {
  id: string;
  label: string;
  icon: typeof Clock;
  hasChildren?: boolean;
}

interface FlowNode {
  id: string;
  type: "trigger" | "task";
  stepNumber: number;
  label: string;
  description: string;
  enabled: boolean;
}

interface ConditionGroup {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface ConditionBlock {
  id: string;
  logic: "AND" | "OR";
  groups: ConditionGroup[];
}

/* ═══════════════════════════════════════════
   Mock Data – Review Response Agent
   ═══════════════════════════════════════════ */
const triggerItems: TriggerItem[] = [
  { id: "schedule", label: "Schedule-based", icon: Clock },
  { id: "review", label: "Review event", icon: Star, hasChildren: true },
  { id: "inbox", label: "Inbox event", icon: MessageSquare, hasChildren: true },
  { id: "listing", label: "Listing event", icon: MapPin, hasChildren: true },
  { id: "social", label: "Social event", icon: Share2, hasChildren: true },
  { id: "survey", label: "Survey event", icon: ClipboardList, hasChildren: true },
  { id: "ticketing", label: "Ticketing event", icon: Ticket, hasChildren: true },
  { id: "external", label: "External event", icon: Puzzle, hasChildren: true },
];

const defaultFlowNodes: FlowNode[] = [
  { id: "f1", type: "trigger", stepNumber: 1, label: "When a new review is received or updated", description: "Agent triggers on new or updated reviews across all sources and locations", enabled: true },
  { id: "f2", type: "task", stepNumber: 2, label: "Identify relevant mentions in the review", description: "Extract product or service specific feedback from the review", enabled: true },
  { id: "f3", type: "task", stepNumber: 3, label: "Identify custom tokens", description: "Detect city, location, staff, address or any custom location data mentioned in the review", enabled: true },
  { id: "f4", type: "task", stepNumber: 4, label: "Generate response", description: "Generate a contextual response based on the review content, identified mentions and custom tokens", enabled: true },
];

const initialConditions: ConditionBlock[] = [
  {
    id: "c1",
    logic: "AND",
    groups: [
      { id: "g1", field: "Review source", operator: "is equal to", value: "Google" },
      { id: "g2", field: "Review source", operator: "is equal to", value: "Birdeye" },
    ],
  },
  {
    id: "c2",
    logic: "OR",
    groups: [
      { id: "g3", field: "Review rating", operator: "is equal to", value: "4 star" },
      { id: "g4", field: "Review rating", operator: "is equal to", value: "5 star" },
    ],
  },
];

/* ═══════════════════════════════════════════
   Reusable dropdown-style select (read-only)
   ═══════════════════════════════════════════ */
function SelectField({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-[#262b35] border border-[#ccc] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] hover:border-[#999] dark:hover:border-[#4d5568] transition-colors"
        style={{ fontWeight: 400 }}
      >
        <span>{value}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] shadow-lg py-1 max-h-[180px] overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors ${opt === value ? "text-[#2552ED]" : "text-[#212121] dark:text-[#e4e4e4]"}`}
                style={{ fontWeight: 400 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Left Panel – Toolbox
   ═══════════════════════════════════════════ */
function ToolboxPanel({ mode, onModeChange }: { mode: BuilderMode; onModeChange: (m: BuilderMode) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerExpanded, setTriggerExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);

  const filteredTriggers = triggerItems.filter(t =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[260px] border-r border-[#e5e9f0] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] flex flex-col shrink-0 overflow-hidden">
      {/* Mode toggle */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <div className="inline-flex bg-[#f0f1f5] dark:bg-[#262b35] rounded-full p-[2px]">
          <button
            onClick={() => onModeChange("ai")}
            className={`flex items-center justify-center gap-1 px-3 py-[5px] rounded-full text-[12px] transition-all duration-200 ${
              mode === "ai" ? "bg-white dark:bg-[#333a47] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#212121] dark:text-[#e4e4e4]" : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4]"
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#6834B7]" />
            AI
          </button>
          <button
            onClick={() => onModeChange("manual")}
            className={`flex items-center justify-center px-3 py-[5px] rounded-full text-[12px] transition-all duration-200 ${
              mode === "manual" ? "bg-white dark:bg-[#333a47] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#212121] dark:text-[#e4e4e4]" : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4]"
            }`}
          >
            Manual
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-3 shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[13px] h-[13px] text-[#888] dark:text-[#6b7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-[32px] pl-8 pr-3 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] placeholder-[#999] dark:placeholder-[#6b7280] outline-none focus:border-[#2552ED] dark:focus:border-[#2552ED] transition-colors"
            style={{ fontWeight: 400 }}
          />
        </div>
      </div>

      {/* Accordion sections */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Trigger */}
        <div className="mb-1">
          <button
            onClick={() => setTriggerExpanded(!triggerExpanded)}
            className="flex items-center justify-between w-full py-2.5 text-[13px] text-[#212121] dark:text-[#e4e4e4]"
            style={{ fontWeight: 400 }}
          >
            Trigger
            {triggerExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#888]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#888]" />}
          </button>
          {triggerExpanded && (
            <div className="flex flex-col gap-0.5">
              {filteredTriggers.map(item => (
                <button
                  key={item.id}
                  className="flex items-center justify-between w-full px-2 py-2 text-[12px] text-[#555] dark:text-[#9ba2b0] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] rounded-[6px] transition-colors group"
                  style={{ fontWeight: 400 }}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-[15px] h-[15px] text-[#888] dark:text-[#6b7280]" />
                    <span>{item.label}</span>
                  </div>
                  {item.id === "schedule" ? (
                    <MoreVertical className="w-3.5 h-3.5 text-[#ccc] dark:text-[#4d5568] opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#ccc] dark:text-[#4d5568]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tasks */}
        <div className="mb-1 border-t border-[#f0f1f5] dark:border-[#2e3340] pt-1">
          <button
            onClick={() => setTasksExpanded(!tasksExpanded)}
            className="flex items-center justify-between w-full py-2.5 text-[13px] text-[#212121] dark:text-[#e4e4e4]"
            style={{ fontWeight: 400 }}
          >
            Tasks
            {tasksExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#888]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#888]" />}
          </button>
          {tasksExpanded && (
            <p className="text-[11px] text-[#999] dark:text-[#6b7280] px-2 pb-2" style={{ fontWeight: 300 }}>
              Drag task nodes onto the canvas to build your workflow.
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="border-t border-[#f0f1f5] dark:border-[#2e3340] pt-1">
          <button
            onClick={() => setControlsExpanded(!controlsExpanded)}
            className="flex items-center justify-between w-full py-2.5 text-[13px] text-[#212121] dark:text-[#e4e4e4]"
            style={{ fontWeight: 400 }}
          >
            Controls
            {controlsExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#888]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#888]" />}
          </button>
          {controlsExpanded && (
            <p className="text-[11px] text-[#999] dark:text-[#6b7280] px-2 pb-2" style={{ fontWeight: 300 }}>
              Add conditional logic, loops, and branching to your flow.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Center Panel – Canvas
   ═══════════════════════════════════════════ */
function CanvasPanel({
  nodes,
  selectedNodeId,
  onSelectNode,
  onToggleNode,
}: {
  nodes: FlowNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
  onToggleNode: (id: string) => void;
}) {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8f9fb] dark:bg-[#13161b]">
      {/* Agent title pill */}
      <div className="flex justify-center pt-6 pb-2 shrink-0">
        <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#3b4455] dark:bg-[#2e3340] rounded-[10px]">
          <div className="w-2 h-2 rounded-full bg-[#2552ED]" />
          <div>
            <p className="text-[12px] text-white" style={{ fontWeight: 400 }}>
              Review response agent replying autonomously
            </p>
            <p className="text-[10px] text-[#9ba2b0]" style={{ fontWeight: 300 }}>
              All locations
            </p>
          </div>
        </div>
      </div>

      {/* Canvas toolbar */}
      <div className="flex justify-center py-2 shrink-0">
        <div className="flex items-center gap-1 bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#2e3340] rounded-[8px] px-1.5 py-1">
          <Button type="button" variant="ghost" size="icon" className="rounded-[6px] text-[#555] dark:text-[#8b92a5]">
            <ArrowDown className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-[6px] text-[#555] dark:text-[#8b92a5]">
            <ArrowRight className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1 px-2">
            <span className="text-[12px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>{zoom}%</span>
            <ChevronDown className="w-3 h-3 text-[#888]" />
          </div>
          <Button type="button" variant="ghost" size="icon" className="rounded-[6px] text-[#555] dark:text-[#8b92a5]">
            <Play className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Flow nodes */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center py-4 gap-0">
          {nodes.map((node, idx) => (
            <div key={node.id} className="flex flex-col items-center">
              {/* Connector line before (except first) */}
              {idx > 0 && (
                <div className="flex flex-col items-center">
                  <div className="w-[1px] h-[28px] bg-[#ccc] dark:bg-[#4d5568]" />
                  <div className="w-[9px] h-[9px] border border-[#ccc] dark:border-[#4d5568] rounded-full bg-[#f8f9fb] dark:bg-[#13161b] -my-[4px] z-10" />
                  <div className="w-[1px] h-[28px] bg-[#ccc] dark:bg-[#4d5568]" />
                </div>
              )}

              {/* Node card */}
              <button
                onClick={() => onSelectNode(node.id)}
                className={`relative w-[340px] rounded-[10px] border-2 transition-all text-left ${
                  selectedNodeId === node.id
                    ? "border-[#2552ED] bg-white dark:bg-[#1e2229] shadow-[0_0_0_3px_rgba(37,82,237,0.12)]"
                    : "border-[#e5e9f0] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] hover:border-[#c0c6d4] dark:hover:border-[#4d5568]"
                }`}
              >
                {/* Node header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#f0f1f5] dark:border-[#2e3340]">
                  <div className="flex items-center gap-2">
                    {node.type === "trigger" ? (
                      <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                    ) : (
                      <div className="w-4 h-4 rounded-[3px] bg-[#4caf50] flex items-center justify-center">
                        <span className="text-[9px] text-white" style={{ fontWeight: 400 }}>T</span>
                      </div>
                    )}
                    <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>
                      {node.type === "trigger" ? "Trigger" : "Task"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {node.type === "task" && (
                      <button
                        onClick={e => { e.stopPropagation(); onToggleNode(node.id); }}
                        className="p-0.5"
                      >
                        {node.enabled ? (
                          <ToggleRight className="w-5 h-5 text-[#2552ED]" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-[#ccc] dark:text-[#4d5568]" />
                        )}
                      </button>
                    )}
                    <button onClick={e => e.stopPropagation()} className="p-0.5">
                      <MoreVertical className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
                    </button>
                  </div>
                </div>

                {/* Node body */}
                <div className="px-4 py-3">
                  <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] mb-1" style={{ fontWeight: 400 }}>
                    {node.stepNumber}. {node.label}
                  </p>
                  <p className="text-[11px] text-[#888] dark:text-[#6b7280] leading-[1.5]" style={{ fontWeight: 300 }}>
                    {node.description}
                  </p>
                </div>
              </button>
            </div>
          ))}

          {/* Bottom connector */}
          <div className="flex flex-col items-center mt-0">
            <div className="w-[1px] h-[28px] bg-[#ccc] dark:bg-[#4d5568]" />
            <div className="w-[9px] h-[9px] border border-[#ccc] dark:border-[#4d5568] rounded-full bg-[#f8f9fb] dark:bg-[#13161b]" />
          </div>
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Right Panel – Properties
   ═══════════════════════════════════════════ */
function PropertiesPanel({
  selectedNode,
  conditions,
  onConditionsChange,
  onClose,
}: {
  selectedNode: FlowNode | null;
  conditions: ConditionBlock[];
  onConditionsChange: (c: ConditionBlock[]) => void;
  onClose: () => void;
}) {
  const [triggerName, setTriggerName] = useState("When a new review is received or updated");
  const [description, setDescription] = useState("Agent triggers on new or updated reviews across all sources and locations");

  if (!selectedNode) return null;

  const fieldOptions = ["Review source", "Review rating", "Review text", "Reviewer name", "Location"];
  const operatorOptions = ["is equal to", "is not equal to", "contains", "starts with"];
  const valueOptions: Record<string, string[]> = {
    "Review source": ["Google", "Birdeye", "Yelp", "Facebook", "TripAdvisor"],
    "Review rating": ["1 star", "2 star", "3 star", "4 star", "5 star"],
    "Review text": [],
    "Reviewer name": [],
    "Location": [],
  };

  const updateConditionGroup = (blockIdx: number, groupIdx: number, key: keyof ConditionGroup, value: string) => {
    const updated = [...conditions];
    updated[blockIdx] = {
      ...updated[blockIdx],
      groups: updated[blockIdx].groups.map((g, i) =>
        i === groupIdx ? { ...g, [key]: value } : g
      ),
    };
    onConditionsChange(updated);
  };

  const addCondition = () => {
    const newBlock: ConditionBlock = {
      id: `c${Date.now()}`,
      logic: "AND",
      groups: [{ id: `g${Date.now()}`, field: "Review source", operator: "is equal to", value: "Google" }],
    };
    onConditionsChange([...conditions, newBlock]);
  };

  // Build preview string
  const buildPreview = (): string => {
    const parts = conditions.map((block, bi) => {
      const groupStr = block.groups.map(g => {
        if (g.field === "Review source") return `Review.source == "${g.value}"`;
        if (g.field === "Review rating") return `Review.rating == "${g.value}"`;
        return `${g.field} ${g.operator} "${g.value}"`;
      }).join(` ${block.logic === "AND" ? "&&" : "||"} `);
      return block.groups.length > 1 ? `(${groupStr})` : groupStr;
    });
    return parts.join(";\n");
  };

  const isTrigger = selectedNode.type === "trigger";

  return (
    <div className="w-[340px] border-l border-[#e5e9f0] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e9f0] dark:border-[#2e3340] shrink-0">
        <span className="text-[13px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>
          {isTrigger ? "Trigger" : "Task"}
        </span>
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" className="rounded-[6px] text-[#555] dark:text-[#8b92a5]">
            <Play className="w-4 h-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-[6px] text-[#555] dark:text-[#8b92a5]">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-[6px] text-[#555] dark:text-[#8b92a5]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Trigger/Task name */}
        <div>
          <label className="flex items-center gap-0.5 text-[12px] text-[#212121] dark:text-[#e4e4e4] mb-1.5" style={{ fontWeight: 400 }}>
            {isTrigger ? "Trigger name" : "Task name"}
            <span className="text-[#de1b0c]">*</span>
          </label>
          <input
            type="text"
            value={isTrigger ? triggerName : selectedNode.label}
            onChange={e => isTrigger && setTriggerName(e.target.value)}
            className="w-full h-[36px] px-3 bg-[#f5f5f5] dark:bg-[#262b35] border border-[#ccc] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#555] dark:text-[#9ba2b0] outline-none focus:border-[#2552ED] dark:focus:border-[#2552ED] transition-colors"
            style={{ fontWeight: 400 }}
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-0.5 text-[12px] text-[#212121] dark:text-[#e4e4e4] mb-1.5" style={{ fontWeight: 400 }}>
            Description
            <span className="text-[#de1b0c]">*</span>
          </label>
          <textarea
            value={isTrigger ? description : selectedNode.description}
            onChange={e => isTrigger && setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-white dark:bg-[#262b35] border border-[#ccc] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] outline-none focus:border-[#2552ED] dark:focus:border-[#2552ED] transition-colors resize-none leading-[1.5]"
            style={{ fontWeight: 400 }}
          />
        </div>

        {/* Filter conditions (trigger only) */}
        {isTrigger && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>
                Filter conditions
              </span>
            </div>

            {/* Condition blocks */}
            <div className="bg-[#f2f4f7] dark:bg-[#1a1e25] rounded-[8px] p-3 space-y-3">
              {conditions.map((block, bi) => (
                <div key={block.id}>
                  {/* Logic operator between blocks */}
                  {bi > 0 && (
                    <div className="flex items-center gap-1 mb-3 mt-1">
                      <span className="text-[11px] text-[#8f8f8f] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>
                        {block.logic}
                      </span>
                      <ChevronDown className="w-3 h-3 text-[#8f8f8f] dark:text-[#6b7280]" />
                    </div>
                  )}

                  {/* Condition groups */}
                  {block.groups.map((group, gi) => (
                    <div key={group.id}>
                      {/* Logic within group */}
                      {gi > 0 && (
                        <div className="flex items-center gap-1 my-2">
                          <span className="text-[11px] text-[#8f8f8f] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>
                            {bi === 0 ? "AND" : "AND"}
                          </span>
                          <ChevronDown className="w-3 h-3 text-[#8f8f8f] dark:text-[#6b7280]" />
                        </div>
                      )}
                      <div className="space-y-2">
                        <SelectField
                          value={group.field}
                          options={fieldOptions}
                          onChange={v => updateConditionGroup(bi, gi, "field", v)}
                        />
                        <SelectField
                          value={group.operator}
                          options={operatorOptions}
                          onChange={v => updateConditionGroup(bi, gi, "operator", v)}
                        />
                        <SelectField
                          value={group.value}
                          options={valueOptions[group.field] || ["Custom..."]}
                          onChange={v => updateConditionGroup(bi, gi, "value", v)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Add condition */}
              <button
                onClick={addCondition}
                className="flex items-center gap-1.5 py-2 text-[12px] text-[#2552ED] hover:text-[#1E44CC] transition-colors"
                style={{ fontWeight: 400 }}
              >
                <PlusCircle className="w-4 h-4" />
                Add condition
              </button>
            </div>
          </div>
        )}

        {/* Preview (trigger only) */}
        {isTrigger && (
          <div>
            <p className="text-[12px] text-[#212121] dark:text-[#e4e4e4] mb-1.5" style={{ fontWeight: 400 }}>
              Preview
            </p>
            <div className="bg-[#f2f4f7] dark:bg-[#1a1e25] rounded-[8px] px-3 py-2.5">
              <p className="text-[11px] text-[#8f8f8f] dark:text-[#6b7280] mb-1" style={{ fontWeight: 400 }}>IF</p>
              <p className="text-[12px] text-[#212121] dark:text-[#e4e4e4] font-mono leading-[1.6]" style={{ fontWeight: 400 }}>
                {buildPreview()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="px-4 py-4 border-t border-[#e5e9f0] dark:border-[#2e3340] shrink-0">
        <Button
          type="button"
          onClick={() => toast.success("Configuration saved")}
          className="w-full rounded-[8px] bg-[#2552ED] hover:bg-[#1E44CC] text-[13px] text-white"
          style={{ fontWeight: 400 }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Builder View
   ═══════════════════════════════════════════ */
export function AgentsBuilderView({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<BuilderMode>("manual");
  const [nodes, setNodes] = useState(defaultFlowNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("f1");
  const [conditions, setConditions] = useState(initialConditions);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const handleToggleNode = useCallback((id: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  }, []);

  const handleSave = () => {
    toast.success("Agent saved successfully");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300">
      {/* ─── Top Header ─── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#e5e9f0] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] shrink-0">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-[6px] text-[#555] dark:text-[#8b92a5]"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-[15px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.3px]" style={{ fontWeight: 400 }}>
            Review response agent replying autonomously
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" className="rounded-[8px] text-[#555] dark:text-[#8b92a5]">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="rounded-[8px] px-5 bg-[#2552ED] hover:bg-[#1E44CC] text-[13px] text-white"
            style={{ fontWeight: 400 }}
          >
            Save
          </Button>
        </div>
      </div>

      {/* ─── Body: 3-panel layout ─── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left: Toolbox */}
        <ToolboxPanel mode={mode} onModeChange={setMode} />

        {/* Center: Canvas */}
        <CanvasPanel
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          onToggleNode={handleToggleNode}
        />

        {/* Right: Properties */}
        <PropertiesPanel
          selectedNode={selectedNode}
          conditions={conditions}
          onConditionsChange={setConditions}
          onClose={() => setSelectedNodeId(null)}
        />
      </div>
    </div>
  );
}