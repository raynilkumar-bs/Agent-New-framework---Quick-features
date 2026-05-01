import { useState, useEffect } from "react";
import { ChevronDown, X, Link2, Copy, Check } from "lucide-react";
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
import svgPaths from "../../imports/svg-ta3ytlg3hb";
import aiAgentSvg from "../../imports/svg-0k1pp57war";
import reportSvg from "../../imports/svg-ps6vzxz3zm";
import imgPdf from "figma:asset/2eb63fcfdd8ce4bb1e43a8193de77170bc433ae1.png";
import imgXls from "figma:asset/90a91332f3ed0e2b01224d390892afe557a0a784.png";
import imgPpt from "figma:asset/f72d17590debcadc015a48798ce70e5cdaf517e1.png";
import imgPng from "figma:asset/df4924fa6c99c590e07f3ab3f0707613d183b93d.png";
import exportSvgPaths from "../../imports/svg-ysfd3q3ivx";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  onCustomize: () => void;
  themeColor?: string;
  showSummaryPage: boolean;
  initialTab?: "share" | "export" | "email";
  hidePreview?: boolean;
}

export function ShareModal({ open, onClose, onCustomize, themeColor, showSummaryPage, initialTab, hidePreview }: ShareModalProps) {
  const [activeTab, setActiveTab] = useState<"share" | "export" | "email">("share");
  const [access, setAccess] = useState("Only invited users");
  const [accessOpen, setAccessOpen] = useState(false);
  const [inviteSearch, setInviteSearch] = useState("");
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => {
    if (!open) { setAccessOpen(false); setJustCopied(false); }
  }, [open]);

  useEffect(() => {
    if (open && initialTab) setActiveTab(initialTab);
  }, [open, initialTab]);

  if (!open) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText("share.birdeye.com/view/cc6fe16f").catch(() => {});
    setJustCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setJustCopied(false), 2000);
  };

  const handleShare = () => {
    toast.success("Report shared successfully!");
    onClose();
  };

  const accentColor = themeColor || "#2552ED";

  /* ── Page count ── */
  const reportImages = [imgChart, imgTable1, imgTable2, imgTable3, imgTable4, imgTable5, imgTable6, imgTable7];
  const totalPages = 1 /* cover */ + (showSummaryPage ? 1 : 0) + reportImages.length;

  /* ── Birdeye logo header for preview pages ── */
  const BirdeyeHeader = ({ size = "normal" }: { size?: "normal" | "small" }) => {
    const iconW = size === "small" ? 8 : 10;
    return (
      <div className="flex items-center gap-1">
        <svg width={iconW} height={iconW - 1} viewBox="0 0 20 19" fill="none">
          <path d="M10 0C4.48 0 0 4.02 0 8.97C0 12.27 1.93 15.13 4.86 16.72C4.73 17.72 4.13 18.72 3 19C3 19 6.27 18.82 8.18 17.16C8.77 17.26 9.38 17.31 10 17.31C15.52 17.31 20 13.62 20 8.97C20 4.02 15.52 0 10 0Z" fill={accentColor}/>
        </svg>
        <span className="font-['Inter',sans-serif]" style={{ fontSize: size === "small" ? 5 : 6, fontWeight: 400, color: accentColor }}>Birdeye</span>
      </div>
    );
  };

  /* ── Page footer ── */
  const PageFooter = ({ pageNum, label }: { pageNum?: number; label?: string }) => (
    <div className="flex justify-between items-center px-2.5 py-1 border-t border-[#f0f0f0] dark:border-[#333a47] mt-auto shrink-0">
      <span className="font-['Inter',sans-serif] text-[4px] text-[#bbb] dark:text-[#6b7280]">Profile performance report</span>
      <span className="font-['Inter',sans-serif] text-[4px] text-[#bbb] dark:text-[#6b7280]">{label || `Page ${pageNum}`}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />

      {/* ════ Modal — 25% smaller than typical large (~920px × 68vh) ════ */}
      <div
        className={`relative flex bg-white dark:bg-[#1e2229] rounded-2xl overflow-hidden transition-colors duration-300 ${
          hidePreview ? "max-w-[380px] w-[380px]" : "max-w-[920px] w-[88vw]"
        }`}
        style={{
          maxHeight: "68vh",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
      >
        {/* ═══ LEFT PANEL — 45% ═══ */}
        <div className={`flex flex-col shrink-0 min-h-0 ${hidePreview ? "w-full" : "w-[45%]"}`}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
            <h2
              className="font-['Inter',sans-serif] text-[15px] text-[#111] dark:text-[#e4e4e4] tracking-[-0.3px]"
              style={{ fontWeight: 400 }}
            >
              Share
            </h2>
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

          {/* Tabs — pill style */}
          <div className="flex items-center gap-0.5 px-5 pt-3 pb-2.5 shrink-0">
            {(["share", "export", "email"] as const).map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-[5px] rounded-lg text-[12px] capitalize transition-all ${
                    isActive
                      ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] dark:text-[#6b9bff]"
                      : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4] hover:bg-[#f9fafb] dark:hover:bg-[#2e3340]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="h-px bg-[#f0f0f0] dark:bg-[#333a47] mx-5 shrink-0" />

          {/* Content area */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">

            {activeTab === "share" && (
              <div className="flex flex-col gap-4">
                {/* Share link */}
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Share link</label>
                  <div className="flex items-center gap-2 bg-[#f8f9fb] dark:bg-[#262b35] border border-[#eceef2] dark:border-[#333a47] rounded-lg px-3 min-h-[38px] py-1">
                    <Link2 className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568] shrink-0" />
                    <span className="flex-1 text-[12px] text-[#2552ED] dark:text-[#6b9bff] truncate select-all font-['Inter',sans-serif]">
                      share.birdeye.com/view/cc6fe16f
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCopyLink}
                      className={`shrink-0 gap-1 px-2.5 text-[11px] font-normal ${
                        justCopied
                          ? "border-transparent bg-[#d4edda] dark:bg-[#1a3328] text-[#28a745] dark:text-[#6fcf73] hover:bg-[#d4edda] dark:hover:bg-[#1a3328]"
                          : "bg-white dark:bg-[#262b35] shadow-sm"
                      }`}
                    >
                      {justCopied ? (
                        <><Check className="w-3 h-3" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Who can access */}
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Who can access?</label>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAccessOpen(!accessOpen)}
                      className="w-full justify-between rounded-lg border-[#eceef2] bg-white px-3 font-normal hover:border-[#d0d5dd] dark:border-[#333a47] dark:bg-[#1e2229] dark:hover:border-[#3d4555]"
                    >
                      <span className="text-[12px] text-[#333] dark:text-[#e4e4e4] font-['Inter',sans-serif]">{access}</span>
                      <ChevronDown className={`w-4 h-4 text-[#aaa] dark:text-[#6b7280] transition-transform ${accessOpen ? "rotate-180" : ""}`} />
                    </Button>
                    {accessOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#22262f] border border-[#eceef2] dark:border-[#333a47] rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] z-30 py-1 overflow-hidden">
                        {["Only invited users", "Anyone with the link", "Public"].map(opt => (
                          <button
                            key={opt}
                            onClick={() => { setAccess(opt); setAccessOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-[12px] font-['Inter',sans-serif] transition-colors ${
                              access === opt ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] dark:text-[#6b9bff]" : "text-[#333] dark:text-[#e4e4e4] hover:bg-[#f8f9fb] dark:hover:bg-[#2e3340]"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Invite users */}
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Invite people</label>
                  <div className="flex items-center bg-white dark:bg-[#1e2229] border border-[#eceef2] dark:border-[#333a47] rounded-lg px-3 h-[36px] focus-within:border-[#7BA3F5] dark:focus-within:border-[#5580e0] focus-within:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus-within:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all">
                    <input
                      type="text"
                      value={inviteSearch}
                      onChange={e => setInviteSearch(e.target.value)}
                      placeholder="Search users or teams..."
                      className="w-full text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] bg-transparent outline-none font-['Inter',sans-serif]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "export" && (
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "PDF", sub: "Document", icon: imgPdf, bg: "#fef2f2" },
                  { label: "XLS", sub: "Spreadsheet", icon: imgXls, bg: "#f0fdf4" },
                  { label: "PPT", sub: "Presentation", icon: imgPpt, bg: "#fff7ed" },
                  { label: "PNG", sub: "Image", icon: imgPng, bg: "#eff6ff" },
                ].map(f => (
                  <button
                    key={f.label}
                    onClick={() => toast.success(`Exporting as ${f.label}...`)}
                    className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg hover:bg-[#f8f9fb] dark:hover:bg-[#2e3340] transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: f.bg }}
                    >
                      <img src={f.icon} alt={f.label} className="w-[18px] h-[18px] object-contain" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[12px] text-[#333] dark:text-[#e4e4e4] font-['Inter',sans-serif]" style={{ fontWeight: 400 }}>{f.label}</p>
                      <p className="text-[10px] text-[#aaa] dark:text-[#6b7280] font-['Inter',sans-serif]">{f.sub}</p>
                    </div>
                    <svg className="w-[9px] h-[11px] text-[#d0d0d0] dark:text-[#3d4555] group-hover:text-[#999] dark:group-hover:text-[#8b92a5] transition-colors" viewBox="0 0 10 11.3333" fill="none">
                      <path d={exportSvgPaths.p1f1737a0} fill="currentColor" />
                    </svg>
                  </button>
                ))}
              </div>
            )}

            {activeTab === "email" && (
              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Recipients</label>
                  <input
                    type="text"
                    placeholder="Enter email addresses"
                    className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Subject</label>
                  <input
                    type="text"
                    defaultValue="Profile performance report"
                    className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#888] dark:text-[#6b7280] mb-1.5" style={{ fontWeight: 400 }}>Message (optional)</label>
                  <textarea
                    placeholder="Add a message..."
                    rows={3}
                    className="w-full px-3 py-2 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#1e2229] outline-none resize-none font-['Inter',sans-serif] focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer bar */}
          <div className={`flex items-center gap-2 px-5 py-3 border-t border-[#f0f0f0] dark:border-[#333a47] shrink-0 ${hidePreview ? "justify-end" : "justify-between"}`}>
            {!hidePreview && (
              <button
                onClick={onCustomize}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#f5f3ff] dark:hover:bg-[#1e2d5e] transition-colors group"
              >
                <svg width="13" height="13" viewBox="0 0 10 12.1053" fill="none" className="shrink-0">
                  <path d={aiAgentSvg.p266794f0} fill="url(#ai-grad-compact)" />
                  <defs>
                    <linearGradient id="ai-grad-compact" x1="0" y1="0" x2="10" y2="12">
                      <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[11px] text-[#6d28d9] dark:text-[#a78bfa] group-hover:text-[#5b21b6] dark:group-hover:text-[#c4b5fd] font-['Inter',sans-serif]" style={{ fontWeight: 400 }}>
                  Customise with BirdAI
                </span>
              </button>
            )}
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
                onClick={handleShare}
                className="rounded-lg px-4 text-[12px] font-normal text-white shadow-sm hover:shadow hover:text-white font-['Inter',sans-serif]"
                style={{ backgroundColor: accentColor }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(0.92)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "none")}
              >
                {activeTab === "share" ? "Share" : activeTab === "export" ? "Export" : "Send"}
              </Button>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT PANEL — 55% · Light grey preview canvas matching AICustomizePanel ═══ */}
        {!hidePreview && (
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

            {/* Scrollable page previews — mirrors AICustomizePanel page design */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4">
              <div className="flex flex-col items-center gap-3">

                {/* ── COVER PAGE — matches AICustomizePanel renderCoverPage ── */}
                <div
                  className="bg-white rounded-md overflow-hidden w-full shrink-0"
                  style={{
                    aspectRatio: "1 / 1.4142",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="w-full h-full flex flex-col relative overflow-hidden">
                    {/* Background image */}
                    <div className="absolute inset-0 opacity-[0.06]">
                      <img src={imgCover} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
                      {/* Birdeye full logo */}
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
                    {/* Footer */}
                    <div className="relative z-10">
                      <PageFooter label="Cover" />
                    </div>
                  </div>
                </div>

                {/* ── SUMMARY PAGE — matches AICustomizePanel summary page ── */}
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
                        {/* Header with logo */}
                        <div className="mb-2">
                          <BirdeyeHeader />
                        </div>

                        {/* Title */}
                        <h3 className="font-['Inter',sans-serif] text-[8px] text-[#111] mb-1" style={{ fontWeight: 400 }}>
                          Executive Summary
                        </h3>
                        <p className="font-['Inter',sans-serif] text-[5px] text-[#888] mb-2 leading-[1.6]">
                          Comprehensive overview of your social media profile performance over the last 30 days with positive growth trends across all platforms.
                        </p>

                        {/* Metrics grid — same structure as AICustomizePanel */}
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

                        {/* Key Insights */}
                        <p className="font-['Inter',sans-serif] text-[5px] text-[#111] mb-1" style={{ fontWeight: 400 }}>Key Insights</p>
                        <div className="space-y-1 flex-1">
                          {[
                            "Engagement saw a significant increase of 98.6%, indicating strong audience interaction.",
                            "Total audience grew by 4.5% to 92 members across all connected platforms.",
                            "Impressions increased by 4.8%, reflecting improved content reach and visibility.",
                          ].map((insight, i) => (
                            <div key={i} className="flex items-start gap-1">
                              <span className="w-1 h-1 rounded-full mt-[2px] shrink-0" style={{ backgroundColor: accentColor }} />
                              <span className="font-['Inter',sans-serif] text-[4.5px] text-[#888] leading-[1.5]">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <PageFooter pageNum={2} />
                    </div>
                  </div>
                )}

                {/* ── REPORT IMAGE PAGES — matches AICustomizePanel static image pages ── */}
                {reportImages.map((img, idx) => {
                  const pageNum = 1 /* cover */ + (showSummaryPage ? 1 : 0) + idx + 1;
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
                        {/* Content — report image (no extra header; images have their own) */}
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
        )}
      </div>
    </div>
  );
}