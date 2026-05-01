import type { ReactNode } from "react";

/* ─── Action IDs ─── */
export type ReportActionId =
  | "share"
  | "customizeShare"
  | "schedule"
  | "export"
  | "duplicate"
  | "saveTemplate"
  | "runNow"
  | "addToWorkflow"
  | "sendTest";

/* ─── Report Context ─── */
export interface ReportContext {
  reportId: string;
  reportType: string;
  reportName: string;
  entityType: "report" | "dashboard" | "widget" | "savedView";
  ownerId?: string;
  permissions: string[];
  canSchedule?: boolean;
  canShare?: boolean;
  canCustomize?: boolean;
  exportFormats?: string[];
  supportsBranding?: boolean;
  supportsSectionVisibility?: boolean;
  existingScheduleId?: string;
}

/* ─── Action definition ─── */
export interface ReportActionDefinition {
  id: ReportActionId;
  label: string;
  icon?: ReactNode;
  isVisible?: (context: ReportContext) => boolean;
  isEnabled?: (context: ReportContext) => boolean;
  handler?: (context: ReportContext) => void;
  renderPanel?: (context: ReportContext) => ReactNode;
  requiredPermission?: string;
  analytics?: {
    clicked: string;
    completed?: string;
  };
}

/* ─── Share payload ─── */
export interface SharePayload {
  reportId: string;
  recipients: string[];
  message: string;
  accessLevel: "view" | "edit";
  copyLink?: boolean;
}

/* ─── Schedule payload ─── */
export interface SchedulePayload {
  reportId: string;
  frequency: string;
  day: string;
  time: string;
  timezone: string;
  format: string;
  recipients: string[];
  subject: string;
  body: string;
  startDate?: string;
  endDate?: string;
}

/* ─── Customize payload ─── */
export interface CustomizePayload {
  reportId: string;
  titleOverride?: string;
  subtitleOverride?: string;
  theme: string;
  layout: "standard" | "compact" | "executive";
  branding: boolean;
  includeSections: string[];
  exportFormat: string;
  recipients: string[];
  subject: string;
  body: string;
}

/* ─── Analytics event ─── */
export interface ReportActionEvent {
  eventName: string;
  reportId: string;
  reportType: string;
  entityType: string;
  actionId: ReportActionId;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/* ─── Hook return shape ─── */
export interface UseReportActionsReturn {
  openAction: (actionId: ReportActionId) => void;
  closeAction: () => void;
  activeAction: ReportActionId | null;
  availableActions: ReportActionDefinition[];
}
