import { toast } from "sonner";
import type {
  ReportContext,
  ReportActionId,
  ReportActionEvent,
  SharePayload,
  SchedulePayload,
  CustomizePayload,
} from "./types";

/* ════════════════════════════════════════════
   Analytics Service
   ════════════════════════════════════════════ */

export function trackReportAction(event: ReportActionEvent) {
  // Stub: in production, send to analytics backend
  if (typeof window !== "undefined" && (window as any).__DEV_LOG__) {
    console.info("[ReportActions Analytics]", event);
  }
}

export function buildEvent(
  eventName: string,
  context: ReportContext,
  actionId: ReportActionId,
  metadata?: Record<string, unknown>
): ReportActionEvent {
  return {
    eventName,
    reportId: context.reportId,
    reportType: context.reportType,
    entityType: context.entityType,
    actionId,
    timestamp: Date.now(),
    metadata,
  };
}

/* ════════════════════════════════════════════
   Share Service
   ════════════════════════════════════════════ */

export const reportShareService = {
  validateRecipients(recipients: string[]): { valid: boolean; errors: string[] } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: string[] = [];
    recipients.forEach((r) => {
      if (!emailRegex.test(r.trim())) errors.push(`Invalid email: ${r}`);
    });
    return { valid: errors.length === 0, errors };
  },

  async share(payload: SharePayload): Promise<{ success: boolean; shareUrl?: string }> {
    // Stub API call
    await new Promise((r) => setTimeout(r, 600));
    const shareUrl = `https://share.birdeye.com/view/${payload.reportId.slice(0, 8)}`;
    toast.success("Report shared successfully!");
    return { success: true, shareUrl };
  },

  generateShareLink(reportId: string): string {
    return `https://share.birdeye.com/view/${reportId.slice(0, 8)}`;
  },
};

/* ════════════════════════════════════════════
   Customize Service
   ════════════════════════════════════════════ */

export const reportCustomizeService = {
  async savePreset(payload: CustomizePayload): Promise<{ success: boolean; presetId?: string }> {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, presetId: `preset-${Date.now()}` };
  },

  async sendCustomized(payload: CustomizePayload): Promise<{ success: boolean }> {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Customized report sent!");
    return { success: true };
  },

  getLayoutOptions() {
    return [
      { id: "standard", label: "Standard" },
      { id: "compact", label: "Compact" },
      { id: "executive", label: "Executive summary" },
    ] as const;
  },

  getThemeOptions() {
    return [
      { id: "default", label: "Default", color: "#2552ED" },
      { id: "dark", label: "Dark", color: "#1e2229" },
      { id: "brand", label: "Brand", color: "#2552ED" },
    ] as const;
  },
};

/* ════════════════════════════════════════════
   Schedule Service
   ════════════════════════════════════════════ */

export const reportScheduleService = {
  async create(payload: SchedulePayload): Promise<{ success: boolean; scheduleId?: string }> {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Schedule created successfully!");
    return { success: true, scheduleId: `sched-${Date.now()}` };
  },

  async update(scheduleId: string, payload: Partial<SchedulePayload>): Promise<{ success: boolean }> {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Schedule updated!");
    return { success: true };
  },

  async fetchExisting(reportId: string): Promise<SchedulePayload | null> {
    // Stub: return null for most reports
    return null;
  },

  async triggerTestSend(scheduleId: string): Promise<{ success: boolean }> {
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Test report sent!");
    return { success: true };
  },

  getFrequencyOptions() {
    return ["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly"] as const;
  },

  getDayOptions() {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
  },

  getTimeOptions() {
    return Array.from({ length: 24 }, (_, i) => {
      const h = i % 12 === 0 ? 12 : i % 12;
      const ampm = i < 12 ? "AM" : "PM";
      return `${h}:00 ${ampm}`;
    });
  },

  getTimezoneOptions() {
    return [
      "US/Eastern",
      "US/Central",
      "US/Mountain",
      "US/Pacific",
      "UTC",
      "Europe/London",
      "Europe/Berlin",
      "Asia/Kolkata",
      "Asia/Tokyo",
    ] as const;
  },

  getFormatOptions() {
    return [
      { id: "pdf", label: "PDF" },
      { id: "xls", label: "XLS" },
      { id: "ppt", label: "PPT" },
      { id: "png", label: "PNG" },
    ] as const;
  },
};

/* ════════════════════════════════════════════
   Orchestration Service
   ════════════════════════════════════════════ */

export const reportActionsService = {
  /**
   * Determine which actions are available for a given context.
   */
  resolveActions(context: ReportContext, requestedIds: ReportActionId[]): ReportActionId[] {
    return requestedIds.filter((id) => {
      if (id === "share" && context.canShare === false) return false;
      if (id === "customizeShare" && context.canCustomize === false) return false;
      if (id === "schedule" && context.canSchedule === false) return false;
      return true;
    });
  },
};
