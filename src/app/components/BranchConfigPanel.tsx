import { useState } from "react";
import {
  Braces,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Play,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export interface BranchCondition {
  id: string;
  variable: string;
  operator: string;
  value: string;
}

export interface BranchLane {
  id: string;
  name: string;
  isDefault: boolean;
  conditions: BranchCondition[];
  connectors: ("AND" | "OR")[];
}

export interface BranchConfigDraft {
  branchType: string;
  lanes: BranchLane[];
}

interface BranchConfigPanelProps {
  draft: BranchConfigDraft;
  onSave: (next: BranchConfigDraft) => void;
  onClose: () => void;
}

const VARIABLE_OPTIONS = [
  "1.Review.sentiment",
  "1.Review.rating",
  "1.Review.source",
  "1.Review.comment",
  "2.Triage.isSpam",
  "3.identified_team",
  "Business.category",
  "Business.hours",
];

const OPERATORS = [
  "is equal to",
  "is not equal to",
  "contains",
  "does not contain",
  "is greater than",
  "is less than",
];

const BRANCH_TYPES = [
  { id: "condition", label: "Based on condition" },
  { id: "outcome", label: "Based on previous outcome" },
];

export function BranchConfigPanel({ draft: initial, onSave, onClose }: BranchConfigPanelProps) {
  const [draft, setDraft] = useState<BranchConfigDraft>(initial);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(initial.lanes.map((l) => l.id)),
  );

  function updateLane(laneId: string, patch: Partial<BranchLane>) {
    setDraft((d) => ({
      ...d,
      lanes: d.lanes.map((l) => (l.id === laneId ? { ...l, ...patch } : l)),
    }));
  }

  function updateCondition(laneId: string, condId: string, patch: Partial<BranchCondition>) {
    setDraft((d) => ({
      ...d,
      lanes: d.lanes.map((l) =>
        l.id !== laneId
          ? l
          : { ...l, conditions: l.conditions.map((c) => (c.id === condId ? { ...c, ...patch } : c)) },
      ),
    }));
  }

  function addCondition(laneId: string) {
    setDraft((d) => ({
      ...d,
      lanes: d.lanes.map((l) => {
        if (l.id !== laneId) return l;
        const newCondition: BranchCondition = {
          id: `cond-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          variable: "",
          operator: "is equal to",
          value: "",
        };
        return {
          ...l,
          conditions: [...l.conditions, newCondition],
          connectors: l.conditions.length > 0 ? [...l.connectors, "OR"] : l.connectors,
        };
      }),
    }));
  }

  function removeCondition(laneId: string, condId: string) {
    setDraft((d) => ({
      ...d,
      lanes: d.lanes.map((l) => {
        if (l.id !== laneId) return l;
        const idx = l.conditions.findIndex((c) => c.id === condId);
        if (idx === -1) return l;
        const conditions = l.conditions.filter((c) => c.id !== condId);
        const connectors = l.connectors.slice();
        // The connector between condition[idx-1] and [idx] is connectors[idx-1].
        // After removing condition[idx], drop connectors[idx-1] if it exists,
        // else drop connectors[0] (the connector that followed the removed first item).
        if (idx > 0) connectors.splice(idx - 1, 1);
        else if (connectors.length > 0) connectors.splice(0, 1);
        return { ...l, conditions, connectors };
      }),
    }));
  }

  function setConnector(laneId: string, index: number, value: "AND" | "OR") {
    setDraft((d) => ({
      ...d,
      lanes: d.lanes.map((l) => {
        if (l.id !== laneId) return l;
        const connectors = l.connectors.slice();
        connectors[index] = value;
        return { ...l, connectors };
      }),
    }));
  }

  function addLane() {
    const insertIndex = draft.lanes.findIndex((l) => l.isDefault);
    const newLane: BranchLane = {
      id: `lane-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: "",
      isDefault: false,
      conditions: [{ id: `cond-${Date.now()}`, variable: "", operator: "is equal to", value: "" }],
      connectors: [],
    };
    setDraft((d) => {
      const lanes = d.lanes.slice();
      const at = insertIndex === -1 ? lanes.length : insertIndex;
      lanes.splice(at, 0, newLane);
      return { ...d, lanes };
    });
    setExpanded((s) => {
      const next = new Set(s);
      next.add(newLane.id);
      return next;
    });
  }

  function removeLane(laneId: string) {
    setDraft((d) => ({ ...d, lanes: d.lanes.filter((l) => l.id !== laneId) }));
  }

  function toggleExpanded(laneId: string) {
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(laneId)) next.delete(laneId);
      else next.add(laneId);
      return next;
    });
  }

  return (
    <aside className="flex w-[360px] shrink-0 flex-col rounded-lg bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] animate-in slide-in-from-right-4 fade-in duration-300 ease-out dark:bg-[#1e2229]">
      <header className="flex items-center justify-between border-b border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <h3 className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">Branch</h3>
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
        <Field label="Branch type" required>
          <Select
            value={draft.branchType}
            onChange={(v) => setDraft((d) => ({ ...d, branchType: v }))}
            options={BRANCH_TYPES}
          />
        </Field>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">Branches</span>

          {draft.lanes.map((lane) => {
            const open = expanded.has(lane.id);
            return (
              <div
                key={lane.id}
                className="flex flex-col rounded-md border border-[#e5e9f0] bg-white dark:border-[#333a47] dark:bg-[#262b35]"
              >
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
                    Branch name
                  </span>
                  <div className="flex items-center gap-1">
                    {!lane.isDefault && (
                      <button
                        type="button"
                        aria-label="Delete branch"
                        onClick={() => removeLane(lane.id)}
                        className="flex h-6 w-6 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#1f2530] dark:hover:text-[#f3f4f6]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label={open ? "Collapse" : "Expand"}
                      onClick={() => toggleExpanded(lane.id)}
                      className="flex h-6 w-6 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#1f2530] dark:hover:text-[#f3f4f6]"
                    >
                      {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {open && (
                  <div className="flex flex-col gap-2 border-t border-[#e5e9f0] px-3 py-3 dark:border-[#333a47]">
                    <Input
                      value={lane.name}
                      onChange={(e) => updateLane(lane.id, { name: e.target.value })}
                      placeholder={lane.isDefault ? "No conditions met" : "Branch name"}
                      className="h-9"
                    />

                    {lane.conditions.map((cond, i) => (
                      <div key={cond.id} className="flex flex-col gap-2">
                        {i > 0 && (
                          <ConnectorPicker
                            value={lane.connectors[i - 1] ?? "OR"}
                            onChange={(v) => setConnector(lane.id, i - 1, v)}
                          />
                        )}
                        <ConditionRowEditor
                          condition={cond}
                          onChange={(patch) => updateCondition(lane.id, cond.id, patch)}
                          onRemove={
                            lane.conditions.length > 1
                              ? () => removeCondition(lane.id, cond.id)
                              : undefined
                          }
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addCondition(lane.id)}
                      className="inline-flex items-center gap-1 self-start text-xs font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add condition
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={addLane}
            className="inline-flex items-center gap-1 self-start text-sm font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-[#e5e9f0] px-5 py-4 dark:border-[#252b35]">
        <Button size="sm" onClick={() => onSave(draft)} className="h-9 w-full">
          Save
        </Button>
      </footer>
    </aside>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-xs font-medium text-[#212121] dark:text-[#f3f4f6]">
        {label}
        {required && <span className="text-[#d92d20]">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full appearance-none rounded-md border border-[#e5e9f0] bg-white px-3 pr-8 text-sm text-[#212121] outline-none transition-colors hover:border-[#c4d5e9] focus:border-[#1976d2] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:border-[#5580e0] dark:focus:border-[#5b9bf5]"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
    </div>
  );
}

function ConditionRowEditor({
  condition,
  onChange,
  onRemove,
}: {
  condition: BranchCondition;
  onChange: (patch: Partial<BranchCondition>) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-[#e5e9f0] bg-[#f8fafc] p-2 dark:border-[#333a47] dark:bg-[#1f2530]">
      <div className="flex items-center gap-1.5">
        <div className="flex flex-1 items-center gap-1.5 rounded-md border border-[#e5e9f0] bg-white px-2 dark:border-[#333a47] dark:bg-[#262b35]">
          {condition.variable && (
            <span className="inline-flex h-6 items-center gap-1 rounded bg-[#ecf2fb] px-1.5 text-xs text-[#212121] dark:bg-[#1c2c4a] dark:text-[#e4e4e4]">
              <Braces className="h-3 w-3 text-[#1976d2] dark:text-[#5b9bf5]" />
              <span className="max-w-[120px] truncate">{condition.variable}</span>
              <button
                type="button"
                onClick={() => onChange({ variable: "" })}
                aria-label={`Remove ${condition.variable}`}
                className="ml-0.5 inline-flex h-3 w-3 items-center justify-center rounded text-[#6b7280] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:text-[#f3f4f6]"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <select
            value={condition.variable}
            onChange={(e) => onChange({ variable: e.target.value })}
            className="h-9 flex-1 appearance-none bg-transparent text-sm text-[#6b7280] outline-none dark:text-[#9ba2b0]"
          >
            <option value="">{condition.variable ? "" : "Select variable"}</option>
            {VARIABLE_OPTIONS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ChevronDown className="h-4 w-4 shrink-0 text-[#6b7280]" />
        </div>
        {onRemove && (
          <button
            type="button"
            aria-label="Remove condition"
            onClick={onRemove}
            className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-white hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <Select
        value={condition.operator}
        onChange={(v) => onChange({ operator: v })}
        options={OPERATORS.map((o) => ({ id: o, label: o }))}
      />

      <Input
        value={condition.value}
        onChange={(e) => onChange({ value: e.target.value })}
        placeholder="Value"
        className="h-9"
      />
    </div>
  );
}

function ConnectorPicker({
  value,
  onChange,
}: {
  value: "AND" | "OR";
  onChange: (v: "AND" | "OR") => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px flex-1 bg-[#e5e9f0] dark:bg-[#333a47]" />
      <div className="inline-flex items-center rounded-md border border-[#e5e9f0] bg-white text-xs dark:border-[#333a47] dark:bg-[#262b35]">
        {(["AND", "OR"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`h-7 px-3 transition-colors ${
              value === opt
                ? "bg-[#ecf2fb] text-[#1976d2] dark:bg-[#1c2c4a] dark:text-[#5b9bf5]"
                : "text-[#6b7280] hover:bg-[#f4f6f7] dark:text-[#9ba2b0] dark:hover:bg-[#1f2530]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <span className="h-px flex-1 bg-[#e5e9f0] dark:bg-[#333a47]" />
    </div>
  );
}
