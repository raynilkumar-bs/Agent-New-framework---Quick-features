import { useState, useRef, useEffect } from "react";
import { X, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { reportScheduleService, trackReportAction, buildEvent } from "./services";
import type { ReportContext } from "./types";

interface ScheduleReportModalProps {
  open: boolean;
  onClose: () => void;
  context: ReportContext;
}

/* ─── Reusable select ─── */
function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[] | string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div>
      <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>
        {label}
      </label>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
          style={{ fontWeight: 400 }}
        >
          {value}
          <ChevronDown className="w-3 h-3 text-[#999] dark:text-[#6b7280]" />
        </button>
        {open && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] py-1 z-50 max-h-[200px] overflow-y-auto">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => { onChange(o); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-[13px] transition-colors ${
                  o === value
                    ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e]"
                    : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ScheduleReportModal({ open, onClose, context }: ScheduleReportModalProps) {
  const frequencies = reportScheduleService.getFrequencyOptions();
  const days = reportScheduleService.getDayOptions();
  const times = reportScheduleService.getTimeOptions();
  const timezones = reportScheduleService.getTimezoneOptions();
  const formats = reportScheduleService.getFormatOptions();

  const [frequency, setFrequency] = useState<string>(frequencies[1]);
  const [day, setDay] = useState<string>(days[0]);
  const [time, setTime] = useState<string>(times[9]);
  const [timezone, setTimezone] = useState<string>("US/Eastern");
  const [format, setFormat] = useState<string>("pdf");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState(`${context.reportName} report`);
  const [body, setBody] = useState(`Hi,\n\nPlease find the latest ${context.reportName} report attached.\n\nBest regards`);
  const [saving, setSaving] = useState(false);

  // Reset subject when context changes
  useEffect(() => {
    setSubject(`${context.reportName} report`);
    setBody(`Hi,\n\nPlease find the latest ${context.reportName} report attached.\n\nBest regards`);
  }, [context.reportName]);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    const recipientList = recipients.split(",").map((r) => r.trim()).filter(Boolean);
    await reportScheduleService.create({
      reportId: context.reportId,
      frequency,
      day,
      time,
      timezone,
      format,
      recipients: recipientList,
      subject,
      body,
    });
    trackReportAction(buildEvent("schedule_report_completed", context, "schedule"));
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] w-full max-w-[520px] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f1f5] dark:border-[#2e3340] shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2552ED]" />
            <h2 className="text-[15px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.3px]" style={{ fontWeight: 400 }}>
              Schedule report
            </h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4 text-[#888] dark:text-[#6b7280]" />
          </Button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
          {/* Report name */}
          <div className="flex items-center gap-2 bg-[#f8f9fa] dark:bg-[#262b35] rounded-[8px] px-3 py-2.5">
            <span className="text-[13px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Report:</span>
            <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{context.reportName}</span>
          </div>

          {/* Frequency / Day / Time row */}
          <div className="grid grid-cols-3 gap-3">
            <SelectField label="Frequency" value={frequency} options={frequencies} onChange={setFrequency} />
            <SelectField label="Day" value={day} options={days} onChange={setDay} />
            <SelectField label="Time" value={time} options={times} onChange={setTime} />
          </div>

          {/* Timezone */}
          <SelectField label="Timezone" value={timezone} options={timezones} onChange={setTimezone} />

          {/* Format */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Format</label>
            <div className="flex gap-2">
              {formats.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`px-3 py-1.5 text-[12px] rounded-[8px] border transition-colors uppercase tracking-[0.3px] ${
                    format === f.id
                      ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e] border-[#2552ED]/20 dark:border-[#2552ED]/30"
                      : "text-[#888] dark:text-[#6b7280] bg-white dark:bg-[#262b35] border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Recipients</label>
            <input
              type="text"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="Enter email addresses, separated by commas"
              className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors placeholder:text-[#bbb] dark:placeholder:text-[#555]"
              style={{ fontWeight: 400 }}
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors"
              style={{ fontWeight: 400 }}
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors resize-none"
              style={{ fontWeight: 400 }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[#f0f1f5] dark:border-[#2e3340] shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
            style={{ fontWeight: 400 }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-[13px] text-white bg-[#2552ED] hover:bg-[#1E44CC] rounded-[8px] transition-colors disabled:opacity-60"
            style={{ fontWeight: 400 }}
          >
            {saving ? "Saving..." : context.existingScheduleId ? "Update schedule" : "Create schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
