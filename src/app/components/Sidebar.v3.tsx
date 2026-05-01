/** Sidebar v3 — Restructured L1: BirdAI, Tasks, Agent lib, Myna IQ, Apps, Reports + bottom tower. */

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import {
  ChevronDown, ChevronUp, Settings, User, LogOut, Camera, Moon, Sun, Monitor, ChevronLeft, Share2, Clock, ExternalLink, Keyboard,
} from "lucide-react";
import {
  Sparkle, ListChecks, Robot, Brain, SquaresFour, ChartBar,
} from "@phosphor-icons/react";
import svgPaths from "../../imports/svg-y1gexucine";
import type { AppView } from "../App";
import { Button } from "@/app/components/ui/button";
import { L1_STRIP_ICON_SIZE, L1_STRIP_ICON_STROKE_PX } from "./l1StripIconTokens";
import { MonitorNotificationsTrigger } from "./MonitorNotificationsTrigger";
import { useTheme, type ThemePreference } from "./useTheme";
import { L2NavLayout, PANEL, ROW, HOVER, CHILD_ACTIVE, CHILD_INACTIVE, FOOTER_ROW_CLS, SECTION_HEADER } from "./L2NavLayout";

export const REPORTS_EXTERNAL_SHIMMER_MS = 480;

export function openReportingModuleInNewTab() {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const envUrl = (env?.VITE_REPORTING_MODULE_URL ?? "").trim();
  const url = envUrl || `${window.location.origin}${window.location.pathname}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1617853701628-bfcf8b81d13d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHNtaWxlJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMjE4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ─── L1 icon-strip items (v3 restructured) ─── */
const iconStripItems: { label: string; Icon: React.ElementType }[] = [
  { label: "BirdAI",     Icon: Sparkle      },
  { label: "Tasks",      Icon: ListChecks   },
  { label: "Agent lib",  Icon: Robot        },
  { label: "Myna IQ",    Icon: Brain        },
  { label: "Apps",       Icon: SquaresFour  },
  { label: "Reports",    Icon: ChartBar     },
];

/* ═══════════════════════════════════════════
   Icon Strip (L1 nav rail) v3
   ═══════════════════════════════════════════ */

interface IconStripProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  iconSize?: number;
  onOpenKeyboardShortcuts?: () => void;
}

export function IconStrip({ currentView, onViewChange, iconSize = L1_STRIP_ICON_SIZE, onOpenKeyboardShortcuts }: IconStripProps) {
  const [activeIcon, setActiveIcon] = useState("BirdAI");
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDark, preference, setPreference } = useTheme();

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem("profile_avatar") || DEFAULT_AVATAR;
  });

  // Sync activeIcon with currentView
  useLayoutEffect(() => {
    if (
      currentView === "agents-monitor" ||
      currentView === "agents-analyze-performance" ||
      currentView === "agents-builder" ||
      currentView === "agent-detail" ||
      currentView === "agents-onboarding" ||
      currentView === "birdai-reports"
    ) setActiveIcon("BirdAI");
    else if (
      currentView === "tasks-approval" ||
      currentView === "tasks-fix-recommendation" ||
      currentView === "tasks-assigned" ||
      currentView === "tasks-fix-failed"
    ) setActiveIcon("Tasks");
    else if (currentView === "agent-library") setActiveIcon("Agent lib");
    else if (currentView === "myna-iq") setActiveIcon("Myna IQ");
    else if (
      currentView === "reviews" ||
      currentView === "social" ||
      currentView === "listings" ||
      currentView === "searchai" ||
      currentView === "surveys" ||
      currentView === "inbox" ||
      currentView === "ticketing" ||
      currentView === "contacts"
    ) setActiveIcon("Apps");
    else if (
      currentView === "dashboard" ||
      currentView === "shared-by-me"
    ) setActiveIcon("Reports");
  }, [currentView]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setAvatarUrl(dataUrl);
      localStorage.setItem("profile_avatar", dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setShowAppearance(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="w-[66px] bg-sidebar dark:bg-sidebar flex flex-col items-center shrink-0 transition-colors duration-300" data-no-print>
      {/* Birdeye logo */}
      <div className="h-[56px] w-[55px] flex items-center justify-center shrink-0 text-primary">
        <svg width="17.55" height="16.875" viewBox="0 0 19.5 18.75" fill="none" aria-hidden>
          <path clipRule="evenodd" d={svgPaths.p23fcc000} fill="currentColor" fillRule="evenodd" />
        </svg>
      </div>

      {/* Icon buttons */}
      <div className="flex flex-col items-center px-[12px] py-[8px] gap-[2px] flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {iconStripItems.map(({ label, Icon }) => {
          const isActive = label === activeIcon;
          return (
            <button
              key={label}
              onClick={() => {
                setActiveIcon(label);
                if (label === "BirdAI") onViewChange("agents-monitor");
                else if (label === "Tasks") onViewChange("tasks-approval");
                else if (label === "Agent lib") onViewChange("agent-library");
                else if (label === "Myna IQ") onViewChange("myna-iq");
                else if (label === "Apps") onViewChange("reviews");
                else if (label === "Reports") onViewChange("dashboard");
              }}
              className={`
                group relative w-[32px] h-[32px] flex items-center justify-center rounded-[10px] shrink-0
                transition-all duration-200 ease-out outline-none
                focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-sidebar
                ${isActive
                  ? "bg-sidebar-accent dark:bg-sidebar-accent shadow-none"
                  : "bg-transparent hover:bg-sidebar-accent dark:hover:bg-sidebar-accent active:opacity-90 hover:scale-110 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                }
              `}
              title={label}
              aria-label={label}
            >
              <Icon
                size={iconSize}
                weight={isActive ? "fill" : "regular"}
                stroke="currentColor"
                strokeWidth={L1_STRIP_ICON_STROKE_PX}
                className={`transition-all duration-200 group-hover:text-primary group-active:text-primary ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:scale-110 motion-reduce:group-hover:scale-100"
                } ${label === "BirdAI" && isActive ? "group-hover:animate-[agents-shimmer_3s_ease-in-out_infinite] motion-reduce:animate-none" : ""}`}
              />
            </button>
          );
        })}
      </div>

      {/* ─── Bottom tower: Settings + Notifications + Profile ─── */}
      <div className="flex flex-col items-center gap-2 pb-3 pt-2 shrink-0">
        {/* Settings gear */}
        <button
          type="button"
          className="group relative w-[32px] h-[32px] flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200 ease-out outline-none bg-transparent hover:bg-sidebar-accent dark:hover:bg-sidebar-accent active:opacity-90 hover:scale-110 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-sidebar"
        >
          <Settings
            width={L1_STRIP_ICON_SIZE}
            height={L1_STRIP_ICON_SIZE}
            strokeWidth={L1_STRIP_ICON_STROKE_PX}
            className="text-muted-foreground transition-all duration-200 group-hover:text-primary group-active:text-primary group-hover:scale-110 motion-reduce:group-hover:scale-100"
          />
        </button>

        <MonitorNotificationsTrigger />

        {/* Profile avatar with upward dropdown */}
        <div className="relative" ref={profileRef}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setProfileOpen(!profileOpen);
              if (profileOpen) setShowAppearance(false);
            }}
            className="relative shrink-0 cursor-pointer overflow-hidden rounded-full p-0 shadow-sm ring-2 ring-white/80 transition-all hover:ring-white dark:ring-sidebar-border dark:hover:ring-sidebar-accent"
          >
            <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
            <span className="absolute bottom-[1px] right-[1px] h-[10px] w-[10px] rounded-full border-2 border-sidebar bg-[#4caf50] dark:border-sidebar" />
          </Button>

          {profileOpen && (
            <div className="absolute left-[calc(100%+8px)] bottom-0 bg-popover text-popover-foreground rounded-xl shadow-lg border border-border w-[260px] z-50 overflow-hidden transition-colors duration-300">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-250 ease-in-out"
                  style={{ transform: showAppearance ? "translateX(-100%)" : "translateX(0)" }}
                >
                  {/* ─── Main menu panel ─── */}
                  <div className="w-full shrink-0">
                    <div className="px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="relative group shrink-0">
                          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-border">
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] text-foreground truncate" style={{ fontWeight: 400 }}>John Doe</p>
                          <p className="text-[11px] text-muted-foreground truncate">john.doe@acmecorp.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1.5">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                        <User className="w-4 h-4 text-muted-foreground" /> My profile
                      </button>
                      <button onClick={() => { onViewChange("shared-by-me"); setProfileOpen(false); setShowAppearance(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${currentView === "shared-by-me" ? "text-primary bg-accent dark:bg-accent" : "text-foreground hover:bg-muted"}`}>
                        <Share2 className={`w-4 h-4 ${currentView === "shared-by-me" ? "text-primary" : "text-muted-foreground"}`} /> Shared by me
                      </button>
                      <button onClick={() => { onViewChange("scheduled-deliveries"); setProfileOpen(false); setShowAppearance(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${currentView === "scheduled-deliveries" ? "text-primary bg-accent dark:bg-accent" : "text-foreground hover:bg-muted"}`}>
                        <Clock className={`w-4 h-4 ${currentView === "scheduled-deliveries" ? "text-primary" : "text-muted-foreground"}`} /> Scheduled deliveries
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                        <Settings className="w-4 h-4 text-muted-foreground" /> Settings
                      </button>
                      {onOpenKeyboardShortcuts && (
                        <button type="button" onClick={() => { onOpenKeyboardShortcuts(); setProfileOpen(false); setShowAppearance(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                          <Keyboard className="w-4 h-4 text-muted-foreground" /> Keyboard shortcuts
                        </button>
                      )}
                      <button onClick={() => setShowAppearance(true)} className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-foreground hover:bg-muted transition-colors">
                        <Moon className="w-4 h-4 text-muted-foreground transition-transform duration-500 motion-reduce:transition-none" style={{ transform: isDark ? "rotate(-30deg)" : "rotate(0deg)" }} /> Switch appearance
                      </button>
                    </div>
                    <div className="border-t border-border py-1.5">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-destructive hover:bg-destructive/10 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </div>

                  {/* ─── Appearance sub-panel ─── */}
                  <div className="w-full shrink-0">
                    <div className="flex items-center gap-2.5 px-3 py-3 border-b border-border">
                      <Button type="button" variant="outline" size="icon" onClick={() => setShowAppearance(false)} className="shrink-0 border-2 border-primary transition-colors hover:bg-accent">
                        <ChevronLeft className="h-4 w-4 text-primary" />
                      </Button>
                      <span className="text-[14px] text-foreground flex-1" style={{ fontWeight: 400 }}>Switch appearance</span>
                      <Moon className="w-5 h-5 text-muted-foreground transition-transform duration-500 motion-reduce:transition-none" style={{ transform: isDark ? "rotate(-30deg)" : "rotate(0deg)" }} />
                    </div>
                    <div className="py-2">
                      {([
                        { value: "light" as ThemePreference, label: "Light", Icon: Sun },
                        { value: "dark" as ThemePreference, label: "Dark", Icon: Moon },
                        { value: "auto" as ThemePreference, label: "System", Icon: Monitor },
                      ]).map(({ value, label, Icon }) => {
                        const isSelected = preference === value;
                        return (
                          <button key={value} onClick={() => setPreference(value)} className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors ${isSelected ? "text-primary bg-accent dark:bg-accent" : "text-foreground hover:bg-muted"}`}>
                            <span className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 transition-transform duration-500 motion-reduce:transition-none ${isSelected ? "text-primary" : "text-muted-foreground"}`} style={{ transform: value === "dark" && isDark ? "rotate(-30deg)" : "rotate(0deg)" }} />
                              {label}
                            </span>
                            <span className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-primary" : "border-muted-foreground/40"}`}>
                              {isSelected && <span className="w-[10px] h-[10px] rounded-full bg-primary" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Tasks L2 Nav Panel
   ═══════════════════════════════════════════ */
export function TasksL2NavPanel({ currentView, onViewChange }: { currentView: AppView; onViewChange: (view: AppView) => void }) {
  const handleActiveItemChange = useCallback((key: string) => {
    const id = key.split("/").pop()!;
    if (id === "approval") onViewChange("tasks-approval");
    else if (id === "fix-recommendation") onViewChange("tasks-fix-recommendation");
    else if (id === "assigned") onViewChange("tasks-assigned");
    else if (id === "fix-failed") onViewChange("tasks-fix-failed");
  }, [onViewChange]);

  const activeKey = currentView === "tasks-fix-recommendation" ? "flatNav/fix-recommendation"
    : currentView === "tasks-assigned" ? "flatNav/assigned"
    : currentView === "tasks-fix-failed" ? "flatNav/fix-failed"
    : "flatNav/approval";

  return (
    <L2NavLayout
      flatNavItems={[
        { label: "Require approval", key: "approval" },
        { label: "Fix recommendation", key: "fix-recommendation" },
        { label: "Assign to you", key: "assigned" },
        { label: "Fix failed posts", key: "fix-failed" },
      ]}
      sections={[]}
      activeItem={activeKey}
      onActiveItemChange={handleActiveItemChange}
      data-no-print
    />
  );
}

/* ═══════════════════════════════════════════
   Agent lib L2 Nav Panel
   ═══════════════════════════════════════════ */
export function AgentLibL2NavPanel({ currentView, onViewChange }: { currentView?: AppView; onViewChange?: (view: AppView) => void } = {}) {
  return (
    <L2NavLayout
      headerAction={{ label: "Create agent", onClick: () => onViewChange?.("agents-builder") }}
      flatNavItems={[
        { label: "All agents", key: "all" },
      ]}
      sections={[
        {
          label: "By theme",
          children: [
            "Reputation Management",
            "Social Media",
            "Listings & SEO",
            "Messaging & Inbox",
            "Surveys & Feedback",
            "Payments & Appointments",
            "Insights & Reporting",
          ],
        },
      ]}
      defaultExpandedSections={["By theme"]}
      data-no-print
    />
  );
}

/* ═══════════════════════════════════════════
   Myna IQ L2 Nav Panel
   ═══════════════════════════════════════════ */
export function MynaIQL2NavPanel() {
  return (
    <L2NavLayout
      flatNavItems={[
        { label: "Context", key: "context" },
        { label: "Knowledge", key: "knowledge" },
      ]}
      sections={[]}
      data-no-print
    />
  );
}

/* ═══════════════════════════════════════════
   Apps L2 Nav Panel
   ═══════════════════════════════════════════ */
export function AppsL2NavPanel({ currentView, onViewChange }: { currentView: AppView; onViewChange: (view: AppView) => void }) {
  const handleActiveItemChange = useCallback((key: string) => {
    const id = key.split("/").pop()!;
    if (id === "reviews") onViewChange("reviews");
    else if (id === "social") onViewChange("social");
    else if (id === "listings") onViewChange("listings");
    else if (id === "searchai") onViewChange("searchai");
    else if (id === "surveys") onViewChange("surveys");
    else if (id === "appointments") onViewChange("inbox");
    else if (id === "tickets") onViewChange("ticketing");
    else if (id === "conversations") onViewChange("contacts");
  }, [onViewChange]);

  const activeKey =
    currentView === "social" ? "flatNav/social"
    : currentView === "listings" ? "flatNav/listings"
    : currentView === "searchai" ? "flatNav/searchai"
    : currentView === "surveys" ? "flatNav/surveys"
    : currentView === "inbox" ? "flatNav/appointments"
    : currentView === "ticketing" ? "flatNav/tickets"
    : currentView === "contacts" ? "flatNav/conversations"
    : "flatNav/reviews";

  return (
    <L2NavLayout
      flatNavItems={[
        { label: "Review feed", key: "reviews" },
        { label: "Social feed", key: "social" },
        { label: "Listings recommendation", key: "listings" },
        { label: "Search AI recommendation", key: "searchai" },
        { label: "Surveys", key: "surveys" },
        { label: "Appointments", key: "appointments" },
        { label: "Tickets", key: "tickets" },
        { label: "Conversations", key: "conversations" },
      ]}
      sections={[]}
      activeItem={activeKey}
      onActiveItemChange={handleActiveItemChange}
      data-no-print
    />
  );
}

/* ═══════════════════════════════════════════
   Reports L2 Nav Panel (reused from v2)
   ═══════════════════════════════════════════ */
const dashboardSections = [
  { label: "Created by me", children: ["Palo Alto performance", "2024 Yearly report"] },
  { label: "Shared with me", children: ["2025 Q1 dashboard", "2025 Q2 dashboard", "2025 Q3 dashboard"] },
];

const reportCatalogSections = [
  { label: "Listings", children: ["All", "Google", "Apple", "Facebook", "Bing", "Yelp"] },
  { label: "Social", children: ["All channels", "Post performance", "Response trends", "Best time to post"] },
  { label: "Campaigns", children: ["Review campaigns", "Referral campaigns", "CX campaigns", "Custom campaigns"] },
  { label: "Inbox", children: ["Over time", "Location", "Users", "Channels"] },
  { label: "Surveys", children: ["Survey NPS", "Responses"] },
  { label: "Ticketing", children: ["Resolution time", "Volume"] },
];

export function L2NavPanel({ currentView: _currentView, onViewChange }: { currentView: AppView; onViewChange: (view: AppView) => void }) {
  const [activeItem, setActiveItem] = useState("Created by me/Palo Alto performance");
  const activate = (key: string) => { setActiveItem(key); onViewChange("dashboard"); };
  const dashboardExpandedInit = Object.fromEntries(dashboardSections.map(s => [s.label, s.label === "Created by me"]));
  const reportExpandedInit = Object.fromEntries(reportCatalogSections.map(s => [s.label, s.label === "Listings"]));
  const [dashboardExpanded, setDashboardExpanded] = useState<Record<string, boolean>>(() => dashboardExpandedInit);
  const [reportExpanded, setReportExpanded] = useState<Record<string, boolean>>(() => reportExpandedInit);
  const toggleDashboard = (label: string) => setDashboardExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  const toggleReport = (label: string) => setReportExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  const renderSection = (section: { label: string; children: string[] }, expanded: Record<string, boolean>, toggle: (l: string) => void) => (
    <div key={section.label}>
      <button type="button" onClick={() => toggle(section.label)} className={SECTION_HEADER} style={{ fontWeight: 400 }}>
        <span>{section.label}</span>
        {expanded[section.label] ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
      </button>
      {expanded[section.label] && section.children.map(child => {
        const key = `${section.label}/${child}`;
        const isActive = activeItem === key;
        return <button type="button" key={key} onClick={() => activate(key)} className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE} style={{ fontWeight: isActive ? 400 : 300 }}>{child}</button>;
      })}
    </div>
  );

  return (
    <div className={PANEL} data-no-print>
      <div className="flex-1 overflow-y-auto px-[8px] pt-3 pb-4">
        <p className="px-2 pb-2 text-[11px] uppercase tracking-wide text-muted-foreground" style={{ fontWeight: 500 }}>Reports</p>
        <button type="button" className={`${FOOTER_ROW_CLS} mb-2`} style={{ fontSize: 14 }} onClick={() => onViewChange("dashboard")}>
          <span className="text-[14px]">Create dashboard</span>
          <div className="w-[18px] h-[18px] bg-primary rounded-full flex items-center justify-center shrink-0"><span className="text-primary-foreground text-[12px] leading-none select-none">+</span></div>
        </button>
        {dashboardSections.map(s => renderSection(s, dashboardExpanded, toggleDashboard))}
        <button type="button" className={`${FOOTER_ROW_CLS} mt-2 mb-2`} style={{ fontSize: 14 }} onClick={() => onViewChange("dashboard")}>
          <span className="text-[14px]">Create report</span>
          <div className="w-[18px] h-[18px] bg-primary rounded-full flex items-center justify-center shrink-0"><span className="text-primary-foreground text-[12px] leading-none select-none">+</span></div>
        </button>
        <div className="mt-2 flex flex-col gap-1">{reportCatalogSections.map(s => renderSection(s, reportExpanded, toggleReport))}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Re-exports
   ═══════════════════════════════════════════ */
export { AgentsL2NavPanel } from "./AgentsL2NavPanel";
export { MynaConversationsL2NavPanel } from "./MynaConversationsL2NavPanel";

/* ═══════════════════════════════════════════
   Legacy combined Sidebar export
   ═══════════════════════════════════════════ */
interface SidebarProps {
  hideL2Nav?: boolean;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

export function Sidebar({ hideL2Nav = false, currentView, onViewChange }: SidebarProps) {
  return (
    <div className="flex h-full shrink-0" data-no-print>
      <IconStrip currentView={currentView} onViewChange={onViewChange} />
      {!hideL2Nav && <L2NavPanel currentView={currentView} onViewChange={onViewChange} />}
    </div>
  );
}
