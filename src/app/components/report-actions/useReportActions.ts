import { useState, useCallback, useMemo } from "react";
import { getActions } from "./registry";
import { trackReportAction, buildEvent } from "./services";
import type { ReportContext, ReportActionId, ReportActionDefinition, UseReportActionsReturn } from "./types";

/**
 * Hook that orchestrates report actions for a given context.
 *
 * Usage:
 *   const { openAction, closeAction, activeAction, availableActions } =
 *     useReportActions(context, ['share', 'customizeShare', 'schedule']);
 */
export function useReportActions(
  context: ReportContext,
  actionIds: ReportActionId[]
): UseReportActionsReturn {
  const [activeAction, setActiveAction] = useState<ReportActionId | null>(null);

  const availableActions: ReportActionDefinition[] = useMemo(() => {
    const definitions = getActions(actionIds);
    return definitions.filter((action) => {
      if (action.isVisible && !action.isVisible(context)) return false;
      return true;
    });
  }, [actionIds, context]);

  const openAction = useCallback(
    (actionId: ReportActionId) => {
      const action = availableActions.find((a) => a.id === actionId);
      if (!action) return;

      // Check enabled state
      if (action.isEnabled && !action.isEnabled(context)) return;

      // Track analytics
      if (action.analytics?.clicked) {
        trackReportAction(buildEvent(action.analytics.clicked, context, actionId));
      }

      // If the action has a direct handler (no modal), call it
      if (action.handler) {
        action.handler(context);
        return;
      }

      // Otherwise open the associated modal/drawer
      setActiveAction(actionId);
    },
    [availableActions, context]
  );

  const closeAction = useCallback(() => {
    setActiveAction(null);
  }, []);

  return { openAction, closeAction, activeAction, availableActions };
}

/**
 * Helper to build a ReportContext with sensible defaults.
 */
export function buildReportContext(opts: {
  reportId: string;
  reportType: string;
  reportName: string;
  entityType?: ReportContext["entityType"];
  permissions?: string[];
  capabilities?: {
    share?: boolean;
    customize?: boolean;
    schedule?: boolean;
  };
  exportFormats?: string[];
  supportsBranding?: boolean;
  existingScheduleId?: string;
}): ReportContext {
  return {
    reportId: opts.reportId,
    reportType: opts.reportType,
    reportName: opts.reportName,
    entityType: opts.entityType ?? "report",
    permissions: opts.permissions ?? [],
    canShare: opts.capabilities?.share ?? true,
    canCustomize: opts.capabilities?.customize ?? true,
    canSchedule: opts.capabilities?.schedule ?? true,
    exportFormats: opts.exportFormats ?? ["pdf", "xls"],
    supportsBranding: opts.supportsBranding ?? false,
    existingScheduleId: opts.existingScheduleId,
  };
}
