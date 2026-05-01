import { useState, useCallback, useEffect } from "react";
import { X, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

/* ─── Types ─── */
export interface FilterItem {
  id: string;
  label: string;
  value?: string;
  options?: string[];
}

interface FilterPanelProps {
  filters: FilterItem[];
  onFiltersChange?: (filters: FilterItem[]) => void;
  onApply?: () => void;
  onReset?: () => void;
  title?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  storageKey?: string;
}

/* ─── Filter row ─── */
function FilterRow({
  filter,
  onValueChange,
}: {
  filter: FilterItem;
  onValueChange: (id: string, value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-2.5 py-2 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-lg text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:border-[#c0c6d0] dark:hover:border-[#444b5a] transition-colors"
            style={{ fontWeight: 400 }}
          >
            <span className="truncate text-left">
              {filter.value || filter.label}
            </span>
            {open ? (
              <ChevronUp className="w-3 h-3 text-[#999] dark:text-[#6b7280] shrink-0 ml-1" />
            ) : (
              <ChevronDown className="w-3 h-3 text-[#999] dark:text-[#6b7280] shrink-0 ml-1" />
            )}
          </button>

          {open && filter.options && (
            <div className="mt-1 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-lg shadow-sm overflow-hidden z-10 relative">
              {filter.options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onValueChange(filter.id, option);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 text-[13px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors ${
                    filter.value === option
                      ? "text-[#2552ED] bg-[#f0f3ff] dark:bg-[#1e2d5e]"
                      : "text-[#212121] dark:text-[#e4e4e4]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Panel ─── */
export function FilterPanel({
  filters: initialFilters,
  onFiltersChange,
  onApply,
  onReset,
  title = "Filters",
  collapsed = false,
  onToggleCollapse,
  storageKey,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterItem[]>(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as FilterItem[];
          const savedIds = new Set(parsed.map((f) => f.id));
          const newFilters = initialFilters.filter((f) => !savedIds.has(f.id));
          return [...parsed, ...newFilters];
        } catch {
          /* fall through */
        }
      }
    }
    return initialFilters;
  });

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(filters));
    }
  }, [filters, storageKey]);

  const handleValueChange = useCallback(
    (id: string, value: string) => {
      const updated = filters.map((f) =>
        f.id === id ? { ...f, value } : f
      );
      setFilters(updated);
      onFiltersChange?.(updated);
    },
    [filters, onFiltersChange]
  );

  const handleReset = useCallback(() => {
    const reset = filters.map((f) => ({ ...f, value: undefined }));
    setFilters(reset);
    onFiltersChange?.(reset);
    onReset?.();
  }, [filters, onFiltersChange, onReset]);

  if (collapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="h-full w-10 bg-white dark:bg-[#1e2229] border-l border-[#e5e9f0] dark:border-[#333a47] flex flex-col items-center justify-start pt-4 shrink-0 transition-colors hover:bg-[#f5f5f5] dark:hover:bg-[#262b35]"
        title="Expand filters"
      >
        <span
          className="text-[11px] text-[#555] dark:text-[#8b92a5] mt-0"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontWeight: 400,
          }}
        >
          {title}
        </span>
      </button>
    );
  }

  return (
    <div className="w-[260px] bg-white dark:bg-[#1e2229] border-l border-[#e5e9f0] dark:border-[#333a47] flex flex-col h-full shrink-0 transition-colors">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e9f0] dark:border-[#333a47] shrink-0">
        <span
          className="text-sm text-[#212121] dark:text-[#e4e4e4]"
          style={{ fontWeight: 400 }}
        >
          {title}
        </span>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
          title="Collapse filters"
        >
          <X className="w-3.5 h-3.5 text-[#555] dark:text-[#8b92a5]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 pb-2">
        <div className="flex flex-col gap-2">
          {filters.map((filter) => (
            <FilterRow
              key={filter.id}
              filter={filter}
              onValueChange={handleValueChange}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-3 border-t border-[#e5e9f0] dark:border-[#333a47] shrink-0">
        <button
          onClick={handleReset}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-[13px] text-[#555] dark:text-[#8b92a5] border border-[#e5e9f0] dark:border-[#333a47] rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
          style={{ fontWeight: 400 }}
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
        <button
          onClick={onApply}
          className="flex-1 px-3 py-2 text-[13px] text-white bg-[#2552ED] rounded-lg hover:bg-[#1E44CC] transition-colors"
          style={{ fontWeight: 400 }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
