import { useState, useRef, useEffect } from "react";
import {
  Search, ChevronDown, MoreHorizontal,
  ArrowUpDown, ArrowUp, ArrowDown,
  Link2, Mail, Download, Lock,
  TrendingUp, Users, Calendar, Filter, FileText,
  Eye, Pencil, Trash2, ExternalLink, RotateCcw, Printer, Copy, Ban
} from "lucide-react";
import svgPaths from "../../imports/svg-zyxavbn7id";
import { getDrafts, deleteDraft, subscribeDrafts, type DraftReport } from "./draftStore";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";

/* ─── Types ─── */
type ShareStatus = "active" | "expired" | "revoked";
type ShareMethod = "link" | "email" | "download";
type ReportType = "profile_performance" | "review_summary" | "social_analytics" | "listing_audit" | "survey_results" | "campaign_report" | "competitor_analysis" | "custom_dashboard";

interface SharedItem {
  id: string;
  reportName: string;
  reportType: ReportType;
  sharedWith: string[];
  sharedVia: ShareMethod;
  sharedAt: string;
  expiresAt: string | null;
  status: ShareStatus;
  accessCount: number;
  uniqueViewers: number;
  lastAccessedAt: string | null;
  lastAccessedBy: string | null;
  shareLink: string | null;
  isPasswordProtected: boolean;
  downloadCount: number;
  locationCount: number;
  dateRange: string;
}

/* ─── Mock Data ─── */
const mockSharedItems: SharedItem[] = [
  {
    id: "sh-001",
    reportName: "Profile Performance Report - Q1 2026",
    reportType: "profile_performance",
    sharedWith: ["sarah.chen@acmecorp.com", "mike.jones@acmecorp.com", "team-leads@acmecorp.com"],
    sharedVia: "link",
    sharedAt: "2026-03-07T14:30:00Z",
    expiresAt: "2026-04-07T14:30:00Z",
    status: "active",
    accessCount: 24,
    uniqueViewers: 8,
    lastAccessedAt: "2026-03-09T09:15:00Z",
    lastAccessedBy: "sarah.chen@acmecorp.",
    shareLink: "https://app.birdeye.com/shared/rpt-a1b2c3d4",
    isPasswordProtected: true,
    downloadCount: 3,
    locationCount: 30,
    dateRange: "Jan 1 - Mar 7, 2026",
  },
  {
    id: "sh-002",
    reportName: "Social Media Analytics - February",
    reportType: "social_analytics",
    sharedWith: ["lisa.park@clientco.com"],
    sharedVia: "email",
    sharedAt: "2026-03-05T10:00:00Z",
    expiresAt: null,
    status: "active",
    accessCount: 12,
    uniqueViewers: 1,
    lastAccessedAt: "2026-03-08T16:42:00Z",
    lastAccessedBy: "lisa.park@clientco.com",
    shareLink: null,
    isPasswordProtected: false,
    downloadCount: 1,
    locationCount: 12,
    dateRange: "Feb 1 - Feb 28, 2026",
  },
  {
    id: "sh-003",
    reportName: "Review Sites Overview - All Locations",
    reportType: "review_summary",
    sharedWith: ["operations@acmecorp.com", "regional-mgrs@acmecorp.com"],
    sharedVia: "link",
    sharedAt: "2026-02-20T08:45:00Z",
    expiresAt: "2026-03-20T08:45:00Z",
    status: "active",
    accessCount: 47,
    uniqueViewers: 10,
    lastAccessedAt: "2026-03-09T07:30:00Z",
    lastAccessedBy: "regional-mgrd@acmeco",
    shareLink: "https://app.birdeye.com/shared/rpt-e5f6g7h8",
    isPasswordProtected: false,
    downloadCount: 8,
    locationCount: 45,
    dateRange: "Jan 1 - Feb 20, 2026",
  },
  {
    id: "sh-004",
    reportName: "Competitor Analysis - Downtown Region",
    reportType: "competitor_analysis",
    sharedWith: ["alex.rivera@acmecorp.com"],
    sharedVia: "download",
    sharedAt: "2026-02-15T13:20:00Z",
    expiresAt: null,
    status: "active",
    accessCount: 5,
    uniqueViewers: 1,
    lastAccessedAt: "2026-02-28T11:00:00Z",
    lastAccessedBy: "alex.rivera@acmecorp.c",
    shareLink: null,
    isPasswordProtected: false,
    downloadCount: 2,
    locationCount: 8,
    dateRange: "Dec 1, 2025 - Feb 15, 2026",
  },
  {
    id: "sh-005",
    reportName: "Listing Accuracy Audit - January",
    reportType: "listing_audit",
    sharedWith: ["seo-team@acmecorp.com", "john.kim@acmecorp.com", "anna.lee@acmecorp.com", "david.ng@acmecorp.com"],
    sharedVia: "email",
    sharedAt: "2026-02-01T09:00:00Z",
    expiresAt: "2026-03-01T09:00:00Z",
    status: "expired",
    accessCount: 32,
    uniqueViewers: 11,
    lastAccessedAt: "2026-02-28T23:58:00Z",
    lastAccessedBy: "john.kim@acmecorp.co",
    shareLink: null,
    isPasswordProtected: true,
    downloadCount: 6,
    locationCount: 30,
    dateRange: "Jan 1 - Jan 31, 2026",
  },
  {
    id: "sh-006",
    reportName: "Survey Results - Customer Satisfaction Q4 20",
    reportType: "survey_results",
    sharedWith: ["exec-team@acmecorp.com"],
    sharedVia: "link",
    sharedAt: "2026-01-10T15:00:00Z",
    expiresAt: "2026-02-10T15:00:00Z",
    status: "expired",
    accessCount: 18,
    uniqueViewers: 6,
    lastAccessedAt: "2026-02-09T14:22:00Z",
    lastAccessedBy: "exec-team@acmecorp.",
    shareLink: "https://app.birdeye.com/shared/rpt-m9n0p1q2",
    isPasswordProtected: true,
    downloadCount: 4,
    locationCount: 30,
    dateRange: "Oct 1 - Dec 31, 2025",
  },
  {
    id: "sh-007",
    reportName: "Campaign Performance - Holiday Promo",
    reportType: "campaign_report",
    sharedWith: ["marketing@acmecorp.com", "cfo@acmecorp.com"],
    sharedVia: "email",
    sharedAt: "2026-01-05T11:30:00Z",
    expiresAt: null,
    status: "revoked",
    accessCount: 9,
    uniqueViewers: 3,
    lastAccessedAt: "2026-01-12T10:15:00Z",
    lastAccessedBy: "marketing@acmecorp.c",
    shareLink: null,
    isPasswordProtected: false,
    downloadCount: 1,
    locationCount: 15,
    dateRange: "Nov 15 - Dec 31, 2025",
  },
  {
    id: "sh-008",
    reportName: "Custom Dashboard - Executive Overview",
    reportType: "custom_dashboard",
    sharedWith: ["ceo@acmecorp.com", "coo@acmecorp.com", "vp-ops@acmecorp.com"],
    sharedVia: "link",
    sharedAt: "2025-12-20T09:00:00Z",
    expiresAt: null,
    status: "active",
    accessCount: 89,
    uniqueViewers: 5,
    lastAccessedAt: "2026-03-09T08:05:00Z",
    lastAccessedBy: "ceo@acmecorp.com",
    shareLink: "https://app.birdeye.com/shared/rpt-r3s4t5u6",
    isPasswordProtected: true,
    downloadCount: 12,
    locationCount: 45,
    dateRange: "Rolling 30 days",
  },
];

/* ─── Helpers ─── */
const reportTypeLabels: Record<ReportType, string> = {
  profile_performance: "Profile performance",
  review_summary: "Review summary",
  social_analytics: "Social analytics",
  listing_audit: "Listing audit",
  survey_results: "Survey results",
  campaign_report: "Campaign report",
  competitor_analysis: "Competitor analysis",
  custom_dashboard: "Custom dashboard",
};

const reportTypeColors: Record<ReportType, { text: string; bg: string }> = {
  profile_performance: { text: "#2552ED", bg: "rgba(37,82,237,0.08)" },
  review_summary: { text: "#E91E63", bg: "rgba(233,30,99,0.08)" },
  social_analytics: { text: "#7B1FA2", bg: "rgba(123,31,162,0.08)" },
  listing_audit: { text: "#FF9800", bg: "rgba(255,152,0,0.08)" },
  survey_results: { text: "#4caf50", bg: "rgba(76,175,80,0.08)" },
  campaign_report: { text: "#00BCD4", bg: "rgba(0,188,212,0.08)" },
  competitor_analysis: { text: "#F44336", bg: "rgba(244,67,54,0.08)" },
  custom_dashboard: { text: "#607D8B", bg: "rgba(96,125,139,0.08)" },
};

const reportIconColors: Record<ReportType, string> = {
  profile_performance: "#2552ED",
  review_summary: "#E91E63",
  social_analytics: "#7B1FA2",
  listing_audit: "#FF9800",
  survey_results: "#4caf50",
  campaign_report: "#00BCD4",
  competitor_analysis: "#F44336",
  custom_dashboard: "#607D8B",
};

const reportIconBgs: Record<ReportType, string> = {
  profile_performance: "rgba(25,118,210,0.09)",
  review_summary: "rgba(233,30,99,0.09)",
  social_analytics: "rgba(123,31,162,0.09)",
  listing_audit: "rgba(255,152,0,0.09)",
  survey_results: "rgba(76,175,80,0.09)",
  campaign_report: "rgba(0,188,212,0.09)",
  competitor_analysis: "rgba(244,67,54,0.09)",
  custom_dashboard: "rgba(96,125,139,0.09)",
};

function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date("2026-03-09T12:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatShortDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ─── Status Badge ─── */
const StatusBadge = ({ status }: { status: ShareStatus }) => {
  const config = {
    active: { label: "Active", bg: "#e8f5e9", color: "#2e7d32", dot: "#4caf50" },
    expired: { label: "Expired", bg: "#fff3e0", color: "#e65100", dot: "#FF9800" },
    revoked: { label: "Revoked", bg: "#fce4ec", color: "#c62828", dot: "#F44336" },
  }[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full text-[11px]"
      style={{ background: config.bg, color: config.color, fontWeight: 400, letterSpacing: "0.06px" }}
    >
      <span className="w-[6px] h-[6px] rounded-full" style={{ background: config.dot }} />
      {config.label}
    </span>
  );
};

/* ─── Share Method Icon ─── */
const ShareMethodIcon = ({ method }: { method: ShareMethod }) => {
  const icons = {
    link: <Link2 className="w-3.5 h-3.5 text-[#2552ED]" />,
    email: <Mail className="w-3.5 h-3.5 text-[#2552ED]" />,
    download: <Download className="w-3.5 h-3.5 text-[#2552ED]" />,
  };
  const labels = { link: "via link", email: "via email", download: "via download" };
  return (
    <span className="inline-flex items-center gap-1">
      {icons[method]}
      <span className="text-[10px] text-[#999]">{labels[method]}</span>
    </span>
  );
};

/* ─── Report Type Icon ─── */
const ReportIcon = ({ type }: { type: ReportType }) => {
  const color = reportIconColors[type];
  const bg = reportIconBgs[type];

  const iconMap: Record<ReportType, React.ReactNode> = {
    profile_performance: <TrendingUp className="w-4 h-4" style={{ color }} />,
    review_summary: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={svgPaths.p1316c380} fill={color} stroke={color} strokeWidth="0.5" />
        <path d={svgPaths.p1a14b300} fill={color} stroke={color} strokeWidth="0.5" />
        <path d={svgPaths.p25954bf0} stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    social_analytics: <Eye className="w-4 h-4" style={{ color }} />,
    listing_audit: <FileText className="w-4 h-4" style={{ color }} />,
    survey_results: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={svgPaths.p27e3ce00} fill={color} />
      </svg>
    ),
    campaign_report: <TrendingUp className="w-4 h-4" style={{ color }} />,
    competitor_analysis: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={svgPaths.p2853ef00} fill={color} />
      </svg>
    ),
    custom_dashboard: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={svgPaths.p27e3ce00} fill={color} />
      </svg>
    ),
  };

  return (
    <div className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: bg }}>
      {iconMap[type]}
    </div>
  );
};

/* ─── Sort Types ─── */
type SortField = "reportName" | "sharedAt" | "status" | "accessCount";

/* ─── Main Component ─── */
interface SharedByMeProps {
  onEditDraft?: (draft: DraftReport) => void;
  onViewReport?: (reportName: string) => void;
}

export function SharedByMe({ onEditDraft, onViewReport }: SharedByMeProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("sharedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"all" | ShareStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | ReportType>("all");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Shared items — stateful so revoke / delete / reshare updates the list
  const [sharedItems, setSharedItems] = useState<SharedItem[]>(mockSharedItems);

  // Confirm-delete modal
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Drafts state
  const [drafts, setDrafts] = useState<DraftReport[]>(getDrafts());

  useEffect(() => {
    // Re-read drafts on store changes and on focus (cross-tab sync)
    const unsub = subscribeDrafts(() => setDrafts(getDrafts()));
    const handleFocus = () => setDrafts(getDrafts());
    window.addEventListener("focus", handleFocus);
    return () => { unsub(); window.removeEventListener("focus", handleFocus); };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target as Node)) setStatusDropdownOpen(false);
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) setTypeDropdownOpen(false);
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) setActionMenuId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = sharedItems
    .filter(item => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (typeFilter !== "all" && item.reportType !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.reportName.toLowerCase().includes(q) ||
          item.sharedWith.some(r => r.toLowerCase().includes(q)) ||
          reportTypeLabels[item.reportType].toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === "sharedAt") cmp = new Date(a.sharedAt).getTime() - new Date(b.sharedAt).getTime();
      else if (sortField === "accessCount") cmp = a.accessCount - b.accessCount;
      else if (sortField === "reportName") cmp = a.reportName.localeCompare(b.reportName);
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "desc" ? -cmp : cmp;
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-[#bbb]" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3 h-3 text-[#2552ED]" />
      : <ArrowDown className="w-3 h-3 text-[#2552ED]" />;
  };

  const totalActive = sharedItems.filter(i => i.status === "active").length;
  const totalViews = sharedItems.reduce((s, i) => s + i.accessCount, 0);
  const totalUniqueViewers = sharedItems.reduce((s, i) => s + i.uniqueViewers, 0);
  const totalDownloads = sharedItems.reduce((s, i) => s + i.downloadCount, 0);

  return (
    <div className="flex-1 bg-[#f8f9fa] dark:bg-[#13161b] overflow-auto transition-colors duration-300">
      {/* Header */}
      <div className="bg-[#f8f9fa] dark:bg-[#13161b] px-8 pt-5 pb-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.26px]" style={{ fontWeight: 400 }}>Shared by me</h1>
          </div>
          <div className="flex items-center gap-[3px]">
            {/* All time */}
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e5e9f0] dark:border-[#333a47] rounded-[10px] bg-white dark:bg-[#262b35] text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors" style={{ fontWeight: 400 }}>
              <Calendar className="w-4 h-4 text-[#555] dark:text-[#8b92a5]" />
              <span>All time</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#999] dark:text-[#6b7280]" />
            </button>

            {/* Status filter */}
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 border border-[#e5e9f0] dark:border-[#333a47] rounded-[10px] bg-white dark:bg-[#262b35] text-[13px] text-[#555] dark:text-[#8b92a5] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                style={{ fontWeight: 400 }}
              >
                <Filter className="w-3.5 h-3.5 text-[#555] dark:text-[#8b92a5]" />
                <span>{statusFilter === "all" ? "Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                <ChevronDown className="w-3 h-3 text-[#555] dark:text-[#aaa]" />
              </button>
              {statusDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#262b35] rounded-lg shadow-lg border border-[#e5e9f0] dark:border-[#333a47] py-1 z-50 min-w-[140px]">
                  {(["all", "active", "expired", "revoked"] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setStatusDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] ${statusFilter === s ? "text-[#2552ED]" : "text-[#212121] dark:text-[#e4e4e4]"}`}
                      style={{ fontWeight: statusFilter === s ? 400 : 300 }}
                    >
                      {s === "all" ? "All statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type filter */}
            <div className="relative" ref={typeDropdownRef}>
              <button
                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 border border-[#e5e9f0] dark:border-[#333a47] rounded-[10px] bg-white dark:bg-[#262b35] text-[13px] text-[#555] dark:text-[#9ba2b0] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                style={{ fontWeight: 400 }}
              >
                <FileText className="w-3.5 h-3.5 text-[#555] dark:text-[#8b92a5]" />
                <span>{typeFilter === "all" ? "Type" : reportTypeLabels[typeFilter]}</span>
                <ChevronDown className="w-3 h-3 text-[#555] dark:text-[#aaa]" />
              </button>
              {typeDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#262b35] rounded-lg shadow-lg border border-[#e5e9f0] dark:border-[#333a47] py-1 z-50 min-w-[180px]">
                  <button
                    onClick={() => { setTypeFilter("all"); setTypeDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] ${typeFilter === "all" ? "text-[#2552ED]" : "text-[#212121] dark:text-[#e4e4e4]"}`}
                    style={{ fontWeight: typeFilter === "all" ? 400 : 300 }}
                  >
                    All types
                  </button>
                  {(Object.keys(reportTypeLabels) as ReportType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => { setTypeFilter(t); setTypeDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] ${typeFilter === t ? "text-[#2552ED]" : "text-[#212121] dark:text-[#e4e4e4]"}`}
                      style={{ fontWeight: typeFilter === t ? 400 : 300 }}
                    >
                      {reportTypeLabels[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="px-8 pb-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Active shares */}
          <div className="bg-white dark:bg-[#1e2229] rounded-[14px] px-5 pt-5 pb-4 flex items-start gap-4 transition-colors duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-[#e3f2fd] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p2d06c1f2} stroke="#2552ED" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p352f0080} stroke="#2552ED" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p12385e80} stroke="#2552ED" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p2fddaf00} stroke="#2552ED" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p2ed86a80} stroke="#2552ED" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[26px] text-[#212121] dark:text-[#e4e4e4] tracking-[0.22px]" style={{ fontWeight: 400 }}>{totalActive}</p>
              <p className="text-[12px] text-[#999] dark:text-[#6b7280] mt-0.5">Active shares</p>
            </div>
          </div>

          {/* Total views */}
          <div className="bg-white dark:bg-[#1e2229] rounded-[14px] px-5 pt-5 pb-4 flex items-start gap-4 transition-colors duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-[#f3e5f5] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.pbd79600} stroke="#7B1FA2" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p393cc300} stroke="#7B1FA2" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[26px] text-[#212121] dark:text-[#e4e4e4] tracking-[0.22px]" style={{ fontWeight: 400 }}>{totalViews}</p>
              <p className="text-[12px] text-[#999] dark:text-[#6b7280] mt-0.5">Total views</p>
            </div>
          </div>

          {/* Unique viewers */}
          <div className="bg-white dark:bg-[#1e2229] rounded-[14px] px-5 pt-5 pb-4 flex items-start gap-4 transition-colors duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-[#e8f5e9] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p2a5a7a80} stroke="#2E7D32" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p3c437f00} stroke="#2E7D32" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p387a3e80} stroke="#2E7D32" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.p196aa440} stroke="#2E7D32" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[26px] text-[#212121] dark:text-[#e4e4e4] tracking-[0.22px]" style={{ fontWeight: 400 }}>{totalUniqueViewers}</p>
              <p className="text-[12px] text-[#999] dark:text-[#6b7280] mt-0.5">Unique viewers</p>
            </div>
          </div>

          {/* Downloads */}
          <div className="bg-white dark:bg-[#1e2229] rounded-[14px] px-5 pt-5 pb-4 flex items-start gap-4 transition-colors duration-300">
            <div className="w-10 h-10 rounded-[10px] bg-[#fff3e0] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p3ed29900} stroke="#E65100" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPaths.pb337180} stroke="#E65100" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 20.5V10.5" stroke="#E65100" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[26px] text-[#212121] dark:text-[#e4e4e4] tracking-[0.22px]" style={{ fontWeight: 400 }}>{totalDownloads}</p>
              <p className="text-[12px] text-[#999] dark:text-[#6b7280] mt-0.5">Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div className="px-8 pb-4">
          <div className="bg-white dark:bg-[#1e2229] rounded-[14px] overflow-hidden transition-colors duration-300">
            <div className="px-5 py-3.5 border-b border-[#e5e9f0] dark:border-[#333a47] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF9800]" />
                <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Drafts</span>
                <span className="text-[12px] text-[#999] dark:text-[#777] ml-1">{drafts.length} unsent {drafts.length === 1 ? "report" : "reports"}</span>
              </div>
            </div>
            <div className="divide-y divide-[#e5e9f0] dark:divide-[#333a47]">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#fafbfc] dark:hover:bg-[#262b35] transition-colors group"
                >
                  {/* Draft icon */}
                  <div className="w-8 h-8 rounded-[10px] bg-[#fff3e0] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#FF9800]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] truncate" style={{ fontWeight: 400 }}>{draft.reportName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-[2px] rounded-full text-[10px]"
                        style={{ background: "#fff3e0", color: "#e65100", fontWeight: 400 }}
                      >
                        <span className="w-[5px] h-[5px] rounded-full bg-[#FF9800]" />
                        Draft
                      </span>
                      <span className="text-[11px] text-[#999] dark:text-[#777]">
                        Last edited {formatRelativeDate(draft.updatedAt)}
                      </span>
                    </div>
                  </div>

                  {/* Theme color indicator */}
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: draft.themeColor }} />
                    <span className="text-[11px] text-[#999] dark:text-[#777]">{draft.selectedFont}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEditDraft?.(draft)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2552ED] hover:bg-[#1E44CC] transition-colors text-white text-[12px]"
                      style={{ fontWeight: 400 }}
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => { deleteDraft(draft.id); setDrafts(getDrafts()); }}
                      className="p-1.5 rounded-lg hover:bg-[#fce4ec] transition-colors"
                      title="Delete draft"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#999] hover:text-[#c62828]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table Card */}
      <div className="px-8 pb-6">
        <div className="bg-white dark:bg-[#1e2229] rounded-[14px] overflow-hidden transition-colors duration-300">
          {/* Search bar */}
          <div className="px-5 py-3.5 border-b border-[#e5e9f0] dark:border-[#333a47] flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2 bg-[#f8f9fa] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[10px]">
              <Search className="w-4 h-4 text-[#999] dark:text-[#666]" />
              <input
                type="text"
                placeholder="Search reports, recipients..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-[13px] text-[#212121] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b border-[#e5e9f0] dark:border-[#333a47]">
                  <th className="w-[46px] px-4 py-4" />
                  <th className="text-left py-4 px-4">
                    <button onClick={() => toggleSort("reportName")} className="flex items-center gap-1.5 text-[11px] text-[#777] tracking-[0.06px]" style={{ fontWeight: 400 }}>
                      Report <SortIcon field="reportName" />
                    </button>
                  </th>
                  <th className="text-left py-4 px-4">
                    <span className="text-[11px] text-[#777] tracking-[0.06px]" style={{ fontWeight: 400 }}>Shared with</span>
                  </th>
                  <th className="text-left py-4 px-4">
                    <button onClick={() => toggleSort("sharedAt")} className="flex items-center gap-1.5 text-[11px] text-[#777] tracking-[0.06px]" style={{ fontWeight: 400 }}>
                      Shared <SortIcon field="sharedAt" />
                    </button>
                  </th>
                  <th className="text-left py-4 px-4">
                    <button onClick={() => toggleSort("status")} className="flex items-center gap-1.5 text-[11px] text-[#777] tracking-[0.06px]" style={{ fontWeight: 400 }}>
                      Status <SortIcon field="status" />
                    </button>
                  </th>
                  <th className="text-left py-4 px-4">
                    <button onClick={() => toggleSort("accessCount")} className="flex items-center gap-1.5 text-[11px] text-[#777] tracking-[0.06px]" style={{ fontWeight: 400 }}>
                      Views <SortIcon field="accessCount" />
                    </button>
                  </th>
                  <th className="text-left py-4 px-4">
                    <span className="text-[11px] text-[#777] tracking-[0.06px]" style={{ fontWeight: 400 }}>Last accessed</span>
                  </th>
                  <th className="w-[56px] py-4 px-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#fafbfc] dark:hover:bg-[#262b35] transition-colors group">
                    {/* Checkbox placeholder */}
                    <td className="px-4 py-4" />

                    {/* Report */}
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <ReportIcon type={item.reportType} />
                        <div className="flex flex-col gap-1 min-w-0">
                          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] truncate" style={{ fontWeight: 400 }}>{item.reportName}</p>
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block px-1.5 py-[1px] rounded text-[10px] tracking-[0.12px] truncate"
                              style={{
                                background: reportTypeColors[item.reportType].bg,
                                color: reportTypeColors[item.reportType].text,
                                fontWeight: 400,
                              }}
                            >
                              {reportTypeLabels[item.reportType]}
                            </span>
                            <ShareMethodIcon method={item.sharedVia} />
                            {item.isPasswordProtected && (
                              <Lock className="w-3 h-3 text-[#999] dark:text-[#666]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Shared with */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-[13px] text-[#555] dark:text-[#aaa]">
                          <Users className="w-3.5 h-3.5 text-[#bbb] dark:text-[#666]" />
                          <span>{item.sharedWith.length}</span>
                          <span className="text-[11px] text-[#999] dark:text-[#777]">
                            {item.sharedWith.length === 1 ? "" : "recipients"}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#999] dark:text-[#777] truncate max-w-[160px]">{item.sharedWith[0]}</p>
                      </div>
                    </td>

                    {/* Shared date */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]">{formatRelativeDate(item.sharedAt)}</p>
                        <p className="text-[11px] text-[#999] dark:text-[#777]">{formatDate(item.sharedAt)}</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <StatusBadge status={item.status} />
                        {item.expiresAt && (
                          <p className="text-[10px] text-[#999] dark:text-[#777] pl-0.5">
                            Expires {formatShortDate(item.expiresAt)}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Views */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-[#bbb] dark:text-[#666]" />
                          <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{item.accessCount}</span>
                        </div>
                        <p className="text-[11px] text-[#999] dark:text-[#777]">{item.uniqueViewers} unique</p>
                      </div>
                    </td>

                    {/* Last accessed */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]">
                          {item.lastAccessedAt ? formatRelativeDate(item.lastAccessedAt) : "—"}
                        </p>
                        {item.lastAccessedBy && (
                          <p className="text-[11px] text-[#999] dark:text-[#777] truncate max-w-[160px]">
                            by {item.lastAccessedBy}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 relative">
                      <div ref={actionMenuId === item.id ? actionMenuRef : undefined}>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setActionMenuId(actionMenuId === item.id ? null : item.id)}
                          className="text-[#999] dark:text-[#666] hover:bg-[#f0f0f0] dark:hover:bg-[#2e3340]"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                        {actionMenuId === item.id && (
                          <div className="absolute right-4 top-full mt-1 bg-white dark:bg-[#262b35] rounded-lg shadow-lg border border-[#e5e9f0] dark:border-[#333a47] py-1 z-50 min-w-[180px]">
                            {/* Copy link */}
                            <button
                              className="w-full text-left px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] flex items-center gap-2.5"
                              onClick={() => {
                                const link = item.shareLink || `https://app.birdeye.com/shared/${item.id}`;
                                navigator.clipboard.writeText(link).then(() => {
                                  toast.success("Link copied to clipboard");
                                }).catch(() => {
                                  toast.error("Failed to copy link");
                                });
                                setActionMenuId(null);
                              }}
                            >
                              <Copy className="w-3.5 h-3.5 text-[#777] dark:text-[#aaa]" />
                              Copy link
                            </button>

                            {/* View report — opens full editor */}
                            <button
                              className="w-full text-left px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] flex items-center gap-2.5"
                              onClick={() => {
                                setActionMenuId(null);
                                onViewReport?.(item.reportName);
                              }}
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-[#777] dark:text-[#aaa]" />
                              View report
                            </button>

                            {/* Print */}
                            <button
                              className="w-full text-left px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] flex items-center gap-2.5"
                              onClick={() => {
                                setActionMenuId(null);
                                // Open editor in print mode
                                onViewReport?.(item.reportName);
                                // The user can print from the editor
                                toast.info("Opening report editor — use Print from there");
                              }}
                            >
                              <Printer className="w-3.5 h-3.5 text-[#777] dark:text-[#aaa]" />
                              Print
                            </button>

                            {/* Reshare */}
                            <button
                              className="w-full text-left px-3 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] flex items-center gap-2.5"
                              onClick={() => {
                                setActionMenuId(null);
                                setSharedItems(prev =>
                                  prev.map(i =>
                                    i.id === item.id
                                      ? { ...i, status: "active" as ShareStatus, sharedAt: new Date().toISOString(), expiresAt: null }
                                      : i
                                  )
                                );
                                toast.success(`"${item.reportName}" reshared successfully`);
                              }}
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-[#777] dark:text-[#aaa]" />
                              Reshare
                            </button>

                            <div className="border-t border-[#e5e9f0] dark:border-[#333a47] my-1" />

                            {/* Revoke / Delete */}
                            {item.status === "revoked" ? (
                              <button
                                className="w-full text-left px-3 py-2 text-[13px] text-[#c62828] hover:bg-[#fce4ec] flex items-center gap-2.5"
                                onClick={() => {
                                  setActionMenuId(null);
                                  setConfirmDeleteId(item.id);
                                }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            ) : (
                              <button
                                className="w-full text-left px-3 py-2 text-[13px] text-[#c62828] hover:bg-[#fce4ec] flex items-center gap-2.5"
                                onClick={() => {
                                  setActionMenuId(null);
                                  setSharedItems(prev =>
                                    prev.map(i =>
                                      i.id === item.id ? { ...i, status: "revoked" as ShareStatus } : i
                                    )
                                  );
                                  toast.success(`Access revoked for "${item.reportName}"`);
                                }}
                              >
                                <Ban className="w-3.5 h-3.5" />
                                Revoke access
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteId && (() => {
        const item = sharedItems.find(i => i.id === confirmDeleteId);
        return (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]" onClick={() => setConfirmDeleteId(null)}>
            <div className="bg-white dark:bg-[#262b35] rounded-2xl shadow-2xl p-6 w-[380px]" onClick={e => e.stopPropagation()}>
              <h3 className="text-[16px] text-[#212121] dark:text-[#e4e4e4] mb-2" style={{ fontWeight: 400 }}>Delete shared report?</h3>
              <p className="text-[13px] text-[#555] dark:text-[#aaa] mb-5">
                This will permanently remove <span style={{ fontWeight: 400 }}>"{item?.reportName}"</span> from your shared reports. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 text-[13px] text-[#555] dark:text-[#9ba2b0] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] rounded-lg transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSharedItems(prev => prev.filter(i => i.id !== confirmDeleteId));
                    toast.success(`"${item?.reportName}" deleted`);
                    setConfirmDeleteId(null);
                  }}
                  className="px-4 py-2 text-[13px] text-white bg-[#c62828] hover:bg-[#b71c1c] rounded-lg transition-colors"
                  style={{ fontWeight: 400 }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}