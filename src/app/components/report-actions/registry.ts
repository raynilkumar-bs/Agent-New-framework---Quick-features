import { Share2, Palette, Clock, Download, Copy, Play, Workflow, Send } from "lucide-react";
import { createElement } from "react";
import type { ReportActionDefinition, ReportActionId } from "./types";

/* ─── Icon factory ─── */
const icon = (Icon: typeof Share2) => createElement(Icon, { className: "w-3.5 h-3.5" });

/* ─── Core action definitions ─── */
const actionDefinitions: ReportActionDefinition[] = [
  {
    id: "share",
    label: "Share report",
    icon: icon(Share2),
    isVisible: (ctx) => ctx.canShare !== false,
    isEnabled: (ctx) => ctx.permissions.includes("share_report") || ctx.permissions.length === 0,
    requiredPermission: "share_report",
    analytics: { clicked: "share_report_started", completed: "share_report_completed" },
  },
  {
    id: "customizeShare",
    label: "Customize & share",
    icon: icon(Palette),
    isVisible: (ctx) => ctx.canCustomize !== false,
    isEnabled: (ctx) => ctx.permissions.includes("share_report") || ctx.permissions.length === 0,
    requiredPermission: "share_report",
    analytics: { clicked: "customize_share_opened", completed: "customize_share_completed" },
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: icon(Clock),
    isVisible: (ctx) => ctx.canSchedule !== false,
    isEnabled: (ctx) => ctx.permissions.includes("schedule_report") || ctx.permissions.length === 0,
    requiredPermission: "schedule_report",
    analytics: { clicked: "schedule_report_started", completed: "schedule_report_completed" },
  },
  {
    id: "export",
    label: "Export",
    icon: icon(Download),
    isVisible: (ctx) => (ctx.exportFormats?.length ?? 0) > 0,
    isEnabled: () => true,
    analytics: { clicked: "export_report_started", completed: "export_report_completed" },
  },
  {
    id: "duplicate",
    label: "Duplicate report",
    icon: icon(Copy),
    isVisible: () => false, // future
    isEnabled: () => true,
    analytics: { clicked: "duplicate_report_clicked" },
  },
  {
    id: "runNow",
    label: "Run now",
    icon: icon(Play),
    isVisible: () => false, // future
    isEnabled: () => true,
    analytics: { clicked: "run_now_clicked" },
  },
  {
    id: "addToWorkflow",
    label: "Add to workflow",
    icon: icon(Workflow),
    isVisible: () => false, // future
    isEnabled: () => true,
    analytics: { clicked: "add_to_workflow_clicked" },
  },
  {
    id: "sendTest",
    label: "Send test",
    icon: icon(Send),
    isVisible: () => false, // future
    isEnabled: () => true,
    analytics: { clicked: "send_test_clicked" },
  },
];

/* ─── Registry API ─── */
const registryMap = new Map<ReportActionId, ReportActionDefinition>(
  actionDefinitions.map((a) => [a.id, a])
);

export function getAction(id: ReportActionId): ReportActionDefinition | undefined {
  return registryMap.get(id);
}

export function getActions(ids: ReportActionId[]): ReportActionDefinition[] {
  return ids.map((id) => registryMap.get(id)).filter(Boolean) as ReportActionDefinition[];
}

export function registerAction(action: ReportActionDefinition) {
  registryMap.set(action.id, action);
}

export function getAllActions(): ReportActionDefinition[] {
  return Array.from(registryMap.values());
}
