import { useState } from "react";
import { X, Link2, Copy, Check, Users } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { reportShareService, trackReportAction, buildEvent } from "./services";
import type { ReportContext } from "./types";

interface ShareReportModalProps {
  open: boolean;
  onClose: () => void;
  context: ReportContext;
}

export function ShareReportModal({ open, onClose, context }: ShareReportModalProps) {
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [access, setAccess] = useState<"view" | "edit">("view");
  const [sending, setSending] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  if (!open) return null;

  const shareLink = reportShareService.generateShareLink(context.reportId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).catch(() => {});
    setJustCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setJustCopied(false), 2000);
  };

  const handleSend = async () => {
    const recipientList = recipients
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    if (recipientList.length === 0) {
      toast.error("Please add at least one recipient");
      return;
    }

    const validation = reportShareService.validateRecipients(recipientList);
    if (!validation.valid) {
      toast.error(validation.errors[0]);
      return;
    }

    setSending(true);
    await reportShareService.share({
      reportId: context.reportId,
      recipients: recipientList,
      message,
      accessLevel: access,
    });
    trackReportAction(buildEvent("share_report_completed", context, "share", { recipientCount: recipientList.length }));
    setSending(false);
    setRecipients("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] w-full max-w-[480px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f1f5] dark:border-[#2e3340]">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2552ED]" />
            <h2 className="text-[15px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.3px]" style={{ fontWeight: 400 }}>
              Share report
            </h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4 text-[#888] dark:text-[#6b7280]" />
          </Button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Report name */}
          <div className="flex items-center gap-2 bg-[#f8f9fa] dark:bg-[#262b35] rounded-[8px] px-3 py-2.5">
            <span className="text-[13px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Report:</span>
            <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{context.reportName}</span>
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

          {/* Message */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message..."
              rows={3}
              className="w-full px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] outline-none focus:border-[#2552ED] transition-colors resize-none placeholder:text-[#bbb] dark:placeholder:text-[#555]"
              style={{ fontWeight: 400 }}
            />
          </div>

          {/* Access level */}
          <div>
            <label className="block text-[12px] text-[#888] dark:text-[#6b7280] mb-1.5 tracking-[-0.24px]" style={{ fontWeight: 400 }}>Access</label>
            <div className="flex gap-2">
              {(["view", "edit"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setAccess(level)}
                  className={`px-3 py-1.5 text-[12px] rounded-[8px] border transition-colors capitalize tracking-[-0.24px] ${
                    access === level
                      ? "text-[#2552ED] dark:text-[#6b9bff] bg-[#f0f4ff] dark:bg-[#1e2d5e] border-[#2552ED]/20 dark:border-[#2552ED]/30"
                      : "text-[#888] dark:text-[#6b7280] bg-white dark:bg-[#262b35] border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  Can {level}
                </button>
              ))}
            </div>
          </div>

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-[13px] text-[#2552ED] dark:text-[#6b9bff] hover:underline"
            style={{ fontWeight: 400 }}
          >
            {justCopied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            {justCopied ? "Copied!" : "Copy share link"}
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[#f0f1f5] dark:border-[#2e3340]">
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
            {sending ? "Sending..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
