import { useState, useEffect } from "react";
import { X, ChevronDown, Clock, Calendar, FileText, Users, Mail, Type } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import imgCover from "figma:asset/cf41ec9f747e1d47078180a05f5f2ca35443cb9a.png";
import imgChart from "figma:asset/65e6c1159ecfae396cecb0e51b02f35873df9382.png";
import imgTable1 from "figma:asset/9d7bbfabce716475e8ebcd1c7b1a4ff09512ada8.png";
import imgTable2 from "figma:asset/dee5cbfe496c36c8c0519ab93c24d583a84dc3ff.png";
import imgTable3 from "figma:asset/0d916df5fe5f193444d1fcc37d6230fcfd59f017.png";
import imgTable4 from "figma:asset/a354c9b2dcc9e1469f80aa5994f146789051ac86.png";
import imgTable5 from "figma:asset/eaa0bbbefd8412f19964e9a78e78861f678c55c6.png";
import imgTable6 from "figma:asset/0c57f8a87a947e60bf7b9dca32d63cafe2e4cac2.png";
import imgTable7 from "figma:asset/97f52431a736eef2a6aa441bd1f1043481e35b77.png";
import reportSvg from "../../imports/svg-ps6vzxz3zm";
import imgPdf from "figma:asset/2eb63fcfdd8ce4bb1e43a8193de77170bc433ae1.png";
import imgXls from "figma:asset/90a91332f3ed0e2b01224d390892afe557a0a784.png";
import imgPpt from "figma:asset/f72d17590debcadc015a48798ce70e5cdaf517e1.png";
import imgPng from "figma:asset/df4924fa6c99c590e07f3ab3f0707613d183b93d.png";
import aiAgentSvg from "../../imports/svg-0k1pp57war";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onCustomize: () => void;
  themeColor?: string;
  showSummaryPage: boolean;
}

type ScheduleStep = "configure" | "confirm";

const frequencyOptions = ["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly"];
const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const h = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${h}:00 ${ampm}`;
});

const fileFormats = [
  { label: "PDF", icon: imgPdf, bg: "#fef2f2" },
  { label: "XLS", icon: imgXls, bg: "#f0fdf4" },
  { label: "PPT", icon: imgPpt, bg: "#fff7ed" },
  { label: "PNG", icon: imgPng, bg: "#eff6ff" },
];

export function ScheduleModal({ open, onClose, onCustomize, themeColor, showSummaryPage }: ScheduleModalProps) {
  const [step, setStep] = useState<ScheduleStep>("configure");
  const [frequency, setFrequency] = useState("Weekly");
  const [frequencyOpen, setFrequencyOpen] = useState(false);
  const [day, setDay] = useState("Monday");
  const [dayOpen, setDayOpen] = useState(false);
  const [time, setTime] = useState("9:00 AM");
  const [timeOpen, setTimeOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("Profile performance report");
  const [body, setBody] = useState("Hi,\n\nPlease find the latest profile performance report attached.\n\nBest regards");

  useEffect(() => {
    if (!open) {
      setStep("configure");
      setFrequencyOpen(false);
      setDayOpen(false);
      setTimeOpen(false);
    }
  }, [open]);

  if (!open) return null;

  const accentColor = themeColor || "#2552ED";
  const reportImages = [imgChart, imgTable1, imgTable2, imgTable3, imgTable4, imgTable5, imgTable6, imgTable7];
  const totalPages = 1 + (showSummaryPage ? 1 : 0) + reportImages.length;

  const handleCreateSchedule = () => {
    toast.success("Schedule created successfully!");
    onClose();
  };

  /* ── Page footer ── */
  const PageFooter = ({ pageNum, label }: { pageNum?: number; label?: string }) => (
    <div className="flex justify-between items-center px-2.5 py-1 border-t border-[#f0f0f0] dark:border-[#333a47] mt-auto shrink-0">
      <span className="font-['Inter',sans-serif] text-[4px] text-[#bbb] dark:text-[#6b7280]">Profile performance report</span>
      <span className="font-['Inter',sans-serif] text-[4px] text-[#bbb] dark:text-[#6b7280]">{label || `Page ${pageNum}`}</span>
    </div>
  );

  /* ── Dropdown helper ── */
  const SelectDropdown = ({
    value,
    options,
    isOpen,
    onToggle,
    onSelect,
    icon,
  }: {
    value: string;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (v: string) => void;
    icon?: React.ReactNode;
  }) => (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={onToggle}
        className="w-full justify-between rounded-lg border-[#eceef2] bg-white px-3 font-normal hover:border-[#d0d5dd] dark:border-[#333a47] dark:bg-[#1e2229] dark:hover:border-[#3d4555]"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[12px] text-[#333] dark:text-[#e4e4e4] font-['Inter',sans-serif]">{value}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#aaa] dark:text-[#6b7280] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#22262f] border border-[#eceef2] dark:border-[#333a47] rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] z-30 py-1 overflow-hidden max-h-[200px] overflow-y-auto">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); onToggle(); }}
              className={`w-full text-left px-3 py-2 text-[12px] font-['Inter',sans-serif] transition-colors ${
                value === opt
                  ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] dark:text-[#6b9bff]"
                  : "text-[#333] dark:text-[#e4e4e4] hover:bg-[#f8f9fb] dark:hover:bg-[#2e3340]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  /* ── Schedule confirmation popup ── */
  if (step === "confirm") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />
        <div
          className="relative flex flex-col bg-white dark:bg-[#1e2229] rounded-2xl overflow-hidden transition-colors duration-300 max-w-[520px] w-[90vw]"
          style={{
            maxHeight: "80vh",
            boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0 border-b border-[#f0f0f0] dark:border-[#333a47]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}14` }}>
                <Clock className="w-[14px] h-[14px]" style={{ color: accentColor }} />
              </div>
              <h2 className="font-['Inter',sans-serif] text-[15px] text-[#111] dark:text-[#e4e4e4] tracking-[-0.3px]" style={{ fontWeight: 400 }}>
                Schedule report
              </h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-lg text-[#aaa] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#e4e4e4]"
            >
              <X className="w-[14px] h-[14px]" />
            </Button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-4">
              {/* Frequency */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Frequency</label>
                <SelectDropdown
                  value={frequency}
                  options={frequencyOptions}
                  isOpen={frequencyOpen}
                  onToggle={() => { setFrequencyOpen(!frequencyOpen); setDayOpen(false); setTimeOpen(false); }}
                  onSelect={setFrequency}
                  icon={<Calendar className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568]" />}
                />
              </div>

              {/* Day & Time row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Day</label>
                  <SelectDropdown
                    value={day}
                    options={dayOptions}
                    isOpen={dayOpen}
                    onToggle={() => { setDayOpen(!dayOpen); setFrequencyOpen(false); setTimeOpen(false); }}
                    onSelect={setDay}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Time</label>
                  <SelectDropdown
                    value={time}
                    options={timeOptions}
                    isOpen={timeOpen}
                    onToggle={() => { setTimeOpen(!timeOpen); setFrequencyOpen(false); setDayOpen(false); }}
                    onSelect={setTime}
                    icon={<Clock className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568]" />}
                  />
                </div>
              </div>

              {/* File format */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>File format</label>
                <div className="flex gap-2">
                  {fileFormats.map(f => (
                    <button
                      key={f.label}
                      onClick={() => setSelectedFormat(f.label)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        selectedFormat === f.label
                          ? "border-[#2552ED] dark:border-[#5580e0] bg-[#e8effe] dark:bg-[#1e2d5e]"
                          : "border-[#eceef2] dark:border-[#333a47] bg-white dark:bg-[#1e2229] hover:bg-[#f8f9fb] dark:hover:bg-[#2e3340]"
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                        style={{ backgroundColor: f.bg }}
                      >
                        <img src={f.icon} alt={f.label} className="w-[14px] h-[14px] object-contain" />
                      </div>
                      <span className="text-[12px] text-[#333] dark:text-[#e4e4e4] font-['Inter',sans-serif]" style={{ fontWeight: 400 }}>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-[#f0f0f0] dark:bg-[#333a47]" />

              {/* Recipients */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Recipients
                  </span>
                </label>
                <input
                  type="text"
                  value={recipients}
                  onChange={e => setRecipients(e.target.value)}
                  placeholder="Enter email addresses, separated by commas"
                  className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
                  <span className="flex items-center gap-1">
                    <Type className="w-3 h-3" />
                    Subject
                  </span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Message body
                  </span>
                </label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none resize-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#f0f0f0] dark:border-[#333a47] shrink-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep("configure")}
              className="px-3 text-[12px] text-[#666] dark:text-[#9ba2b0] rounded-lg font-['Inter',sans-serif] font-normal"
            >
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="px-3 text-[12px] text-[#666] dark:text-[#9ba2b0] rounded-lg font-['Inter',sans-serif] font-normal"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCreateSchedule}
                className="rounded-lg px-4 text-[12px] font-normal text-white font-['Inter',sans-serif] shadow-sm hover:shadow"
                style={{ backgroundColor: accentColor }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(0.92)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "none")}
              >
                Create schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main schedule modal with preview ── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />
      <div
        className="relative flex bg-white dark:bg-[#1e2229] rounded-2xl overflow-hidden transition-colors duration-300 max-w-[920px] w-[88vw]"
        style={{
          maxHeight: "68vh",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
      >
        {/* ═══ LEFT PANEL — 45% ═══ */}
        <div className="flex flex-col shrink-0 min-h-0 w-[45%]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
            <div className="flex items-center gap-2">
              <h2
                className="font-['Inter',sans-serif] text-[15px] text-[#111] dark:text-[#e4e4e4] tracking-[-0.3px]"
                style={{ fontWeight: 400 }}
              >
                Schedule report
              </h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-lg text-[#aaa] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#e4e4e4]"
            >
              <X className="w-[14px] h-[14px]" />
            </Button>
          </div>

          {/* Schedule info summary */}
          <div className="px-5 pt-3 pb-2.5 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#f8f9fb] dark:bg-[#262b35] rounded-lg border border-[#eceef2] dark:border-[#333a47]">
              <Clock className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568] shrink-0" />
              <span className="text-[11px] text-[#888] dark:text-[#6b7280] font-['Inter',sans-serif]">
                {frequency} on {day} at {time} &middot; {selectedFormat} format
              </span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-[#f0f0f0] dark:bg-[#333a47] mx-5 shrink-0" />

          {/* Content area */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-4">
              {/* Frequency */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Frequency</label>
                <SelectDropdown
                  value={frequency}
                  options={frequencyOptions}
                  isOpen={frequencyOpen}
                  onToggle={() => { setFrequencyOpen(!frequencyOpen); setDayOpen(false); setTimeOpen(false); }}
                  onSelect={setFrequency}
                  icon={<Calendar className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568]" />}
                />
              </div>

              {/* Day & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Day</label>
                  <SelectDropdown
                    value={day}
                    options={dayOptions}
                    isOpen={dayOpen}
                    onToggle={() => { setDayOpen(!dayOpen); setFrequencyOpen(false); setTimeOpen(false); }}
                    onSelect={setDay}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Time</label>
                  <SelectDropdown
                    value={time}
                    options={timeOptions}
                    isOpen={timeOpen}
                    onToggle={() => { setTimeOpen(!timeOpen); setFrequencyOpen(false); setDayOpen(false); }}
                    onSelect={setTime}
                    icon={<Clock className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568]" />}
                  />
                </div>
              </div>

              {/* File format */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>File format</label>
                <div className="flex gap-2 flex-wrap">
                  {fileFormats.map(f => (
                    <button
                      key={f.label}
                      onClick={() => setSelectedFormat(f.label)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        selectedFormat === f.label
                          ? "border-[#2552ED] dark:border-[#5580e0] bg-[#e8effe] dark:bg-[#1e2d5e]"
                          : "border-[#eceef2] dark:border-[#333a47] bg-white dark:bg-[#1e2229] hover:bg-[#f8f9fb] dark:hover:bg-[#2e3340]"
                      }`}
                    >
                      <div className="w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ backgroundColor: f.bg }}>
                        <img src={f.icon} alt={f.label} className="w-[14px] h-[14px] object-contain" />
                      </div>
                      <span className="text-[12px] text-[#333] dark:text-[#e4e4e4] font-['Inter',sans-serif]" style={{ fontWeight: 400 }}>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-[#f0f0f0] dark:bg-[#333a47]" />

              {/* Recipients */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Recipients</label>
                <input
                  type="text"
                  value={recipients}
                  onChange={e => setRecipients(e.target.value)}
                  placeholder="Enter email addresses, separated by commas"
                  className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Message body</label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none resize-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#f0f0f0] dark:border-[#333a47] shrink-0">
            <button
              onClick={onCustomize}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#f5f3ff] dark:hover:bg-[#1e2d5e] transition-colors group"
            >
              <svg width="13" height="13" viewBox="0 0 10 12.1053" fill="none" className="shrink-0">
                <path d={aiAgentSvg.p266794f0} fill="url(#ai-grad-sched)" />
                <defs>
                  <linearGradient id="ai-grad-sched" x1="0" y1="0" x2="10" y2="12">
                    <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-[11px] text-[#6d28d9] dark:text-[#a78bfa] group-hover:text-[#5b21b6] dark:group-hover:text-[#c4b5fd] font-['Inter',sans-serif]" style={{ fontWeight: 400 }}>
                Customise with BirdAI
              </span>
            </button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="px-3 text-[12px] text-[#666] dark:text-[#9ba2b0] rounded-lg font-['Inter',sans-serif] font-normal"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCreateSchedule}
                className="rounded-lg px-4 text-[12px] font-normal text-white font-['Inter',sans-serif] shadow-sm hover:shadow"
                style={{ backgroundColor: accentColor }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(0.92)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "none")}
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT PANEL — 55% · Preview ═══ */}
        <div className="w-[55%] bg-[#f2f4f7] dark:bg-[#13161b] border-l border-[#ebebeb] dark:border-[#333a47] flex flex-col min-h-0 overflow-hidden transition-colors duration-300">
          {/* Preview header */}
          <div className="flex items-center justify-between px-4 h-[38px] shrink-0">
            <span className="text-[10px] text-[#b0b0b0] dark:text-[#6b7280] uppercase tracking-[0.5px] font-['Inter',sans-serif]" style={{ fontWeight: 400 }}>
              Preview
            </span>
            <span className="text-[10px] text-[#ccc] dark:text-[#4d5568] font-['Inter',sans-serif]">
              {totalPages} pages
            </span>
          </div>

          {/* Scrollable page previews */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4">
            <div className="flex flex-col items-center gap-3">
              {/* Cover page */}
              <div
                className="bg-white rounded-md overflow-hidden w-full shrink-0"
                style={{
                  aspectRatio: "1 / 1.4142",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
                }}
              >
                <div className="w-full h-full flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.06]">
                    <img src={imgCover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
                    <svg className="w-[50px] h-auto mb-3" viewBox="0 0 199.768 41.4" fill="none">
                      <path clipRule="evenodd" d={reportSvg.p2cc68880} fill={accentColor} fillRule="evenodd" />
                      <path d={reportSvg.pfe99e80} fill="#212121" />
                      <path d={reportSvg.p36edaf80} fill="#212121" />
                      <path d={reportSvg.pa24ff80} fill="#212121" />
                      <path d={reportSvg.p33cce400} fill="#212121" />
                      <path d={reportSvg.p16db6100} fill="#212121" />
                      <path d={reportSvg.p2b617580} fill="#212121" />
                      <path d={reportSvg.p11bbd0f1} fill="#212121" />
                      <path d={reportSvg.p3b3711e0} fill="#212121" />
                    </svg>
                    <p className="font-['Inter',sans-serif] text-[8px] text-[#111] tracking-[-0.2px] mb-0.5" style={{ fontWeight: 400 }}>
                      Profile performance report
                    </p>
                    <p className="font-['Inter',sans-serif] text-[5px] text-[#888] mb-2">
                      Social media analytics overview
                    </p>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="font-['Inter',sans-serif] text-[4px] text-[#888]">July 10, 2025</span>
                      <span className="font-['Inter',sans-serif] text-[4px] text-[#888]">30 locations</span>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <PageFooter label="Cover" />
                  </div>
                </div>
              </div>

              {/* Summary page */}
              {showSummaryPage && (
                <div
                  className="bg-white rounded-md overflow-hidden w-full shrink-0"
                  style={{
                    aspectRatio: "1 / 1.4142",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="w-full h-full flex flex-col" style={{ borderTop: `2px solid ${accentColor}` }}>
                    <div className="flex-1 flex flex-col p-3">
                      <div className="mb-2">
                        <div className="flex items-center gap-1">
                          <svg width="10" height="9" viewBox="0 0 20 19" fill="none">
                            <path d="M10 0C4.48 0 0 4.02 0 8.97C0 12.27 1.93 15.13 4.86 16.72C4.73 17.72 4.13 18.72 3 19C3 19 6.27 18.82 8.18 17.16C8.77 17.26 9.38 17.31 10 17.31C15.52 17.31 20 13.62 20 8.97C20 4.02 15.52 0 10 0Z" fill={accentColor}/>
                          </svg>
                          <span className="font-['Inter',sans-serif]" style={{ fontSize: 6, fontWeight: 400, color: accentColor }}>Birdeye</span>
                        </div>
                      </div>
                      <h3 className="font-['Inter',sans-serif] text-[8px] text-[#111] mb-1" style={{ fontWeight: 400 }}>
                        Executive Summary
                      </h3>
                      <p className="font-['Inter',sans-serif] text-[5px] text-[#888] mb-2 leading-[1.6]">
                        Comprehensive overview of your social media profile performance over the last 30 days.
                      </p>
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        {[
                          { label: "Impressions", value: "1.1K", change: "+4.8%" },
                          { label: "Engagement", value: "143", change: "+98.6%" },
                          { label: "Eng. Rate", value: "13.2%", change: "+6.3%" },
                          { label: "Link Clicks", value: "0", change: "" },
                        ].map(m => (
                          <div key={m.label} className="bg-[#f8f9fb] border border-[#f0f0f0] rounded p-1.5">
                            <p className="font-['Inter',sans-serif] text-[4px] text-[#aaa] mb-0.5">{m.label}</p>
                            <p className="font-['Inter',sans-serif] text-[8px] text-[#111]" style={{ fontWeight: 400 }}>{m.value}</p>
                            {m.change && <span className="font-['Inter',sans-serif] text-[4px] text-[#22c55e]">{m.change}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <PageFooter pageNum={2} />
                  </div>
                </div>
              )}

              {/* Report image pages */}
              {reportImages.map((img, idx) => {
                const pageNum = 1 + (showSummaryPage ? 1 : 0) + idx + 1;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-md overflow-hidden flex flex-col w-full shrink-0"
                    style={{
                      aspectRatio: "1 / 1.4142",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="flex flex-col flex-1 min-h-0" style={{ borderTop: `2px solid ${accentColor}` }}>
                      <div className="flex-1 min-h-0 overflow-hidden flex items-start px-3 pt-2 pb-1">
                        <img src={img} alt={`Report page ${idx + 1}`} className="w-full" />
                      </div>
                    </div>
                    <PageFooter pageNum={pageNum} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
