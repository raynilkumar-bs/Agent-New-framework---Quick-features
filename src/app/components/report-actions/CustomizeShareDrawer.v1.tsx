import { useState } from "react";
import { X, Palette, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { reportCustomizeService, trackReportAction, buildEvent } from "./services";
import type { ReportContext } from "./types";

interface CustomizeShareDrawerProps {
  open: boolean;
  onClose: () => void;
  context: ReportContext;
}

const layouts = reportCustomizeService.getLayoutOptions();
const themes = reportCustomizeService.getThemeOptions();

export function CustomizeShareDrawer({ open, onClose, context }: CustomizeShareDrawerProps) {
  const [titleOverride, setTitleOverride] = useState(context.reportName);
  const [subtitleOverride, setSubtitleOverride] = useState("");
  const [layout, setLayout] = useState<string>("standard");
  const [theme, setTheme] = useState<string>("default");
  const [branding, setBranding] = useState(true);
  const [format, setFormat] = useState("pdf");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState(`${context.reportName} — customized report`);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSend = async () => {
    setSending(true);
    const recipientList = recipients.split(",").map((r) => r.trim()).filter(Boolean);
    await reportCustomizeService.sendCustomized({
      reportId: context.reportId,
      titleOverride,
      subtitleOverride,
      theme,
      layout: layout as any,
      branding,
      includeSections: [], // would be dynamic in production
      exportFormat: format,
      recipients: recipientList,
      subject,
      body,
    });
    trackReportAction(buildEvent("customize_share_completed", context, "customizeShare"));
    setSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[420px] h-full bg-white dark:bg-[#1e2229] border-l border-[#E5E7EB] dark:border-[#2e3340] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f1f5] dark:border-[#2e3340] shrink-0">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#2552ED]" />
            <h2 className="text-[15px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.3px]" style={{ fontWeight: 400 }}>
              Customize & share
            </h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4 text-[#888] dark:text-[#6b7280]" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Presentation section */}
          <div>
            <p className="text-[12px] text-[#999] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-3" style={{ fontWeight: 400 }}>Presentation</p>

            {/* Title */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Title</label>
              <input
                type="text"
                value={titleOverride}
                onChange={(e) => setTitleOverride(e.target.value)}
                className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors"
                style={{ fontWeight: 400 }}
              />
            </div>

            {/* Subtitle */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Subtitle</label>
              <input
                type="text"
                value={subtitleOverride}
                onChange={(e) => setSubtitleOverride(e.target.value)}
                placeholder="Optional subtitle"
                className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors placeholder:text-[#bbb] dark:placeholder:text-[#555]"
                style={{ fontWeight: 400 }}
              />
            </div>

            {/* Layout */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Layout</label>
              <div className="flex gap-2">
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    className={`flex-1 px-3 py-2 text-[12px] rounded-[8px] border transition-colors tracking-[-0.24px] ${
                      layout === l.id
                        ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e] border-[#2552ED]/20 dark:border-[#2552ED]/30"
                        : "text-[#888] dark:text-[#6b7280] bg-white dark:bg-[#262b35] border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                    }`}
                    style={{ fontWeight: 400 }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Theme</label>
              <div className="flex gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-1.5 flex-1 px-3 py-2 text-[12px] rounded-[8px] border transition-colors tracking-[-0.24px] ${
                      theme === t.id
                        ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e] border-[#2552ED]/20 dark:border-[#2552ED]/30"
                        : "text-[#888] dark:text-[#6b7280] bg-white dark:bg-[#262b35] border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                    }`}
                    style={{ fontWeight: 400 }}
                  >
                    <span className="w-3 h-3 rounded-full border border-[#e5e9f0] dark:border-[#333a47]" style={{ background: t.color }} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Branding toggle */}
            {context.supportsBranding && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={branding}
                  onChange={(e) => setBranding(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#2552ED]"
                />
                <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Include company branding</span>
              </label>
            )}
          </div>

          <div className="h-px bg-[#f0f1f5] dark:bg-[#2e3340]" />

          {/* Delivery section */}
          <div>
            <p className="text-[12px] text-[#999] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-3" style={{ fontWeight: 400 }}>Delivery</p>

            {/* Format */}
            <div className="mb-3">
              <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Export format</label>
              <div className="flex gap-2">
                {(context.exportFormats ?? ["pdf", "xls"]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`px-3 py-1.5 text-[12px] rounded-[8px] border transition-colors uppercase tracking-[0.3px] ${
                      format === f
                        ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e] border-[#2552ED]/20 dark:border-[#2552ED]/30"
                        : "text-[#888] dark:text-[#6b7280] bg-white dark:bg-[#262b35] border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                    }`}
                    style={{ fontWeight: 400 }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipients */}
            <div className="mb-3">
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
            <div className="mb-3">
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
                placeholder="Add a message to include with the report..."
                rows={3}
                className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors resize-none placeholder:text-[#bbb] dark:placeholder:text-[#555]"
                style={{ fontWeight: 400 }}
              />
            </div>
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
            onClick={handleSend}
            disabled={sending}
            className="px-4 py-2 text-[13px] text-white bg-[#2552ED] hover:bg-[#1E44CC] rounded-[8px] transition-colors disabled:opacity-60"
            style={{ fontWeight: 400 }}
          >
            {sending ? "Sending..." : "Send customized report"}
          </button>
        </div>
      </div>
    </div>
  );
}
