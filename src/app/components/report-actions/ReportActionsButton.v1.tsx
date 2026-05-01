import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useReportActions, buildReportContext } from "./useReportActions";
import { ShareReportModal } from "./ShareReportModal";
import { ScheduleReportModal } from "./ScheduleReportModal";
import { CustomizeShareDrawer } from "./CustomizeShareDrawer";
import { trackReportAction, buildEvent } from "./services";
import type { ReportContext, ReportActionId } from "./types";

/* ─── Props ─── */
interface ReportActionsButtonProps {
  /** Pre-built context or use buildReportContext() helper */
  context: ReportContext;
  /** Which actions to offer */
  actions: ReportActionId[];
  /** Override the button label (defaults to "Actions") */
  label?: string;
  /** Custom handler for "customizeShare" — e.g. Dashboard opens its AI panel instead */
  onCustomize?: () => void;
}

/**
 * Plug-and-play report actions dropdown.
 *
 * Usage:
 * ```tsx
 * <ReportActionsButton
 *   context={buildReportContext({ reportId: 'executive-impact', reportType: 'birdai', reportName: 'Executive impact' })}
 *   actions={['share', 'customizeShare', 'schedule']}
 * />
 * ```
 */
export function ReportActionsButton({
  context,
  actions,
  label = "Actions",
  onCustomize,
}: ReportActionsButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openAction, closeAction, activeAction, availableActions } = useReportActions(context, actions);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleActionClick = (actionId: ReportActionId) => {
    setDropdownOpen(false);
    trackReportAction(buildEvent("report_action_clicked", context, actionId));

    // If customizeShare has a custom handler, use it
    if (actionId === "customizeShare" && onCustomize) {
      onCustomize();
      return;
    }

    openAction(actionId);
  };

  return (
    <>
      {/* Trigger */}
      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="gap-1 rounded-[8px] text-[13px] font-normal tracking-[-0.26px] dark:bg-[#1e2229]"
        >
          {label}
          <ChevronDown className="w-3.5 h-3.5 text-[#212121] dark:text-[#e4e4e4]" />
        </Button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] z-20 min-w-[180px] py-1">
            {availableActions.map((action, i) => {
              const disabled = action.isEnabled ? !action.isEnabled(context) : false;
              return (
                <button
                  key={action.id}
                  onClick={() => !disabled && handleActionClick(action.id)}
                  disabled={disabled}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-left text-[13px] transition-colors ${
                    disabled
                      ? "text-[#ccc] dark:text-[#444] cursor-not-allowed"
                      : "text-[#1e1e1e] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                  } ${i === 0 ? "rounded-t-[7px]" : ""} ${i === availableActions.length - 1 ? "rounded-b-[7px]" : ""}`}
                  style={{ fontWeight: 400 }}
                >
                  <span className="w-3.5 h-3.5 flex items-center justify-center text-[#888] dark:text-[#6b7280]">
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals / Drawer — rendered based on activeAction */}
      <ShareReportModal
        open={activeAction === "share"}
        onClose={closeAction}
        context={context}
      />
      <ScheduleReportModal
        open={activeAction === "schedule"}
        onClose={closeAction}
        context={context}
      />
      <CustomizeShareDrawer
        open={activeAction === "customizeShare"}
        onClose={closeAction}
        context={context}
      />
    </>
  );
}

/* Re-export helpers for convenience */
export { buildReportContext } from "./useReportActions";
export type { ReportContext, ReportActionId } from "./types";
