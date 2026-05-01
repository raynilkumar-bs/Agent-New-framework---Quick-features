import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown, ChevronUp, Settings, User, LogOut, Camera, Moon, Sun, Monitor, ChevronLeft, Share2, Clock, ExternalLink, Keyboard, Sparkles, LifeBuoy, Menu,
} from "lucide-react";
import {
  House, ChatDots, MapPin, Star, Gift, CurrencyDollar,
  CalendarDots, Graph, ClipboardText, Ticket, Users,
  MegaphoneSimple, Globe, Lightbulb, ChartBar, Sparkle,
  Terminal, CaretRight, Briefcase, Database, LinkSimple, Shield,
} from "@phosphor-icons/react";
import svgPaths from "../../imports/svg-y1gexucine";
import type { AppView } from "../App";
import { Button } from "@/app/components/ui/button";
import { L1_STRIP_ICON_SIZE, L1_STRIP_ICON_STROKE_PX } from "./l1StripIconTokens";
import { MonitorNotificationsTrigger } from "./MonitorNotificationsTrigger";
import { useTheme, type ThemePreference } from "./useTheme";
import { L2NavLayout, PANEL, ROW, HOVER, CHILD_ACTIVE, CHILD_INACTIVE, FOOTER_ROW_CLS, SECTION_HEADER } from "./L2NavLayout";
import { useL2NavBridgeSetter } from "@/app/context/L2NavBridgeContext";

/** How long to show the Reports-row shimmer before opening the tab (~sub-second “micro” handoff). */
export const REPORTS_EXTERNAL_SHIMMER_MS = 480;

/** Opens the full Reporting module in a new tab. Set `VITE_REPORTING_MODULE_URL` in the host app when known. */
export function openReportingModuleInNewTab() {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const envUrl = (env?.VITE_REPORTING_MODULE_URL ?? "").trim();
  const url = envUrl || `${window.location.origin}${window.location.pathname}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1617853701628-bfcf8b81d13d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHNtaWxlJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzczMjE4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ─── Icon-strip items — Phosphor Icons ─── */
const iconStripItems: { label: string; Icon: React.ElementType }[] = [
  { label: "Agents",       Icon: Sparkle        },
  { label: "Home",         Icon: House          },
  { label: "Inbox",        Icon: ChatDots       },
  { label: "Listings",     Icon: MapPin         },
  { label: "Reviews",      Icon: Star           },
  { label: "Referrals",    Icon: Gift           },
  { label: "Payments",     Icon: CurrencyDollar },
  { label: "Appointments", Icon: CalendarDots   },
  { label: "Social",       Icon: Graph          },
  { label: "Surveys",      Icon: ClipboardText  },
  { label: "Ticketing",    Icon: Ticket         },
  { label: "Contacts",     Icon: Users          },
  { label: "Campaigns",    Icon: MegaphoneSimple},
  { label: "Competitors",  Icon: Globe          },
  { label: "Insights",     Icon: Lightbulb      },
  { label: "Reports",      Icon: ChartBar       },
];

/* ═══════════════════════════════════════════
   Icon Strip (L1 nav rail) – exported separately
   (sizes / stroke: `l1StripIconTokens`)
   ═══════════════════════════════════════════ */

interface IconStripProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  /** Icon size in px. Defaults to `L1_STRIP_ICON_SIZE` (16.2). */
  iconSize?: number;
  onOpenKeyboardShortcuts?: () => void;
}

export function IconStrip({ currentView, onViewChange, iconSize = L1_STRIP_ICON_SIZE, onOpenKeyboardShortcuts }: IconStripProps) {
  const [activeIcon, setActiveIcon] = useState("Home");
  const [profileOpen, setProfileOpen] = useState(false);
  // Portal tooltip — fixed position so it escapes overflow-y: auto clipping
  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(null);

  const showTooltip = (e: React.MouseEvent<HTMLElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ label, top: rect.top + rect.height / 2 });
  };
  const hideTooltip = () => setTooltip(null);
  const [showAppearance, setShowAppearance] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDark, preference, setPreference } = useTheme();

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    return localStorage.getItem("profile_avatar") || DEFAULT_AVATAR;
  });

  // Sync activeIcon with currentView (layout effect avoids wrong rail highlight on first paint)
  useLayoutEffect(() => {
    if (currentView === "business-overview") setActiveIcon("Home");
    else if (currentView === "inbox") setActiveIcon("Inbox");
    else if (currentView === "reviews") setActiveIcon("Reviews");
    else if (currentView === "social") setActiveIcon("Social");
    else if (currentView === "searchai") setActiveIcon("Insights");
    else if (currentView === "contacts") setActiveIcon("Contacts");
    else if (currentView === "listings") setActiveIcon("Listings");
    else if (currentView === "surveys") setActiveIcon("Surveys");
    else if (currentView === "ticketing") setActiveIcon("Ticketing");
    else if (currentView === "campaigns") setActiveIcon("Campaigns");
    else if (currentView === "insights") setActiveIcon("Insights");
    else if (currentView === "competitors") setActiveIcon("Competitors");
    else if (currentView === "referrals") setActiveIcon("Referrals");
    else if (currentView === "payments") setActiveIcon("Payments");
    else if (currentView === "appointments") setActiveIcon("Appointments");
    else if (currentView === "dashboard" || currentView === "shared-by-me") setActiveIcon("Reports");
    else if (currentView === "agents-monitor" || currentView === "agents-analyze-performance" || currentView === "agents-builder" || currentView === "agent-detail" || currentView === "agents-onboarding" || currentView === "birdai-reports") setActiveIcon("Agents");
    else if (currentView === "birdeye-assist") setActiveIcon("");
    // scheduled-deliveries / schedule-builder: no icon mapping
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
    <div className="w-[66px] bg-[#e0e5eb] dark:bg-[#181b22] flex flex-col items-center shrink-0 transition-colors duration-300" data-no-print>
      {/* Birdeye logo */}
      <div className="h-[56px] w-[55px] flex items-center justify-center shrink-0">
        <svg width="17.55" height="16.875" viewBox="0 0 19.5 18.75" fill="none">
          <path clipRule="evenodd" d={svgPaths.p23fcc000} fill="#2552ED" fillRule="evenodd" />
        </svg>
      </div>

      {/* Icon buttons */}
      <div className="flex flex-col items-center px-[12px] py-[8px] gap-[2px] flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {iconStripItems.map(({ label, Icon }) => {
          const isActive = label === activeIcon;
          return (
            <button
              key={label}
              onMouseEnter={(e) => showTooltip(e, label)}
              onMouseLeave={hideTooltip}
              onClick={() => {
                hideTooltip();
                setActiveIcon(label);
                if (label === "Home") onViewChange("business-overview");
                else if (label === "Inbox") onViewChange("inbox");
                else if (label === "Reports") onViewChange("dashboard");
                else if (label === "Reviews") onViewChange("reviews");
                else if (label === "Social") onViewChange("social");
                else if (label === "Insights") onViewChange("searchai");
                else if (label === "Contacts") onViewChange("contacts");
                else if (label === "Agents") onViewChange("agents-monitor");
                else if (label === "Listings") onViewChange("listings");
                else if (label === "Surveys") onViewChange("surveys");
                else if (label === "Ticketing") onViewChange("ticketing");
                else if (label === "Campaigns") onViewChange("campaigns");
                else if (label === "Competitors") onViewChange("competitors");
                else if (label === "Referrals") onViewChange("referrals");
                else if (label === "Payments") onViewChange("payments");
                else if (label === "Appointments") onViewChange("appointments");
              }}
              className={`
                group relative w-[32px] h-[32px] flex items-center justify-center rounded-[10px] shrink-0
                transition-all duration-200 ease-out outline-none
                focus-visible:ring-2 focus-visible:ring-[#1E44CC]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#e0e5eb] dark:focus-visible:ring-offset-[#181b22]
                ${isActive
                  ? "bg-[#d4dae3] dark:bg-[#282e3a] shadow-none"
                  : "bg-transparent hover:bg-[#d4dae3] dark:hover:bg-[#282e3a] active:bg-[#c8d0dc] dark:active:bg-[#313845] hover:scale-110 active:scale-95"
                }
              `}
            >
              <Icon
                size={iconSize}
                weight={isActive ? "fill" : "regular"}
                stroke="currentColor"
                strokeWidth={L1_STRIP_ICON_STROKE_PX}
                className={`transition-all duration-200 group-hover:text-[#1E44CC] dark:group-hover:text-[#2952E3] group-active:text-[#1E44CC] dark:group-active:text-[#2952E3] ${
                  isActive
                    ? "text-[#1E44CC] dark:text-[#2952E3]"
                    : "text-[#505050] dark:text-[#9ba2b0] group-hover:scale-110"
                } ${label === "Agents" && isActive ? "group-hover:animate-[agents-shimmer_3s_ease-in-out_infinite]" : ""}`}
              />
            </button>
          );
        })}
      </div>

      {/* ─── Bottom tower: Agent setup + Settings + Notifications + Profile (matches main rail order + v2 notifications) ─── */}
      <div className="flex flex-col items-center gap-2 pb-3 pt-2 shrink-0">
        {/* Agent setup — from main L1 tower */}
        <button
          type="button"
          onMouseEnter={(e) => showTooltip(e, "Agent setup")}
          onMouseLeave={hideTooltip}
          onClick={() => { hideTooltip(); onViewChange("agents-onboarding"); }}
          className={`group relative w-[32px] h-[32px] flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#1E44CC]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#e0e5eb] dark:focus-visible:ring-offset-[#181b22] ${
            currentView === "agents-onboarding"
              ? "bg-[#d4dae3] dark:bg-[#282e3a] shadow-none"
              : "bg-transparent hover:bg-[#d4dae3] dark:hover:bg-[#282e3a] active:bg-[#c8d0dc] dark:active:bg-[#313845] hover:scale-110 active:scale-95"
          }`}
          aria-label="Agent setup"
        >
          <Sparkles
            width={L1_STRIP_ICON_SIZE}
            height={L1_STRIP_ICON_SIZE}
            strokeWidth={L1_STRIP_ICON_STROKE_PX}
            className={`transition-all duration-200 ${
              currentView === "agents-onboarding"
                ? "text-[#1E44CC] dark:text-[#2952E3]"
                : "text-[#505050] dark:text-[#9ba2b0] group-hover:text-[#1E44CC] dark:group-hover:text-[#2952E3] group-hover:scale-110"
            }`}
          />
        </button>

        {/* Birdeye Assist */}
        <button
          type="button"
          onMouseEnter={(e) => showTooltip(e, "Birdeye Assist")}
          onMouseLeave={hideTooltip}
          onClick={() => { hideTooltip(); onViewChange("birdeye-assist"); }}
          className={`group relative w-[32px] h-[32px] flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#1E44CC]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#e0e5eb] dark:focus-visible:ring-offset-[#181b22] ${
            currentView === "birdeye-assist"
              ? "bg-[#d4dae3] dark:bg-[#282e3a] shadow-none"
              : "bg-transparent hover:bg-[#d4dae3] dark:hover:bg-[#282e3a] active:bg-[#c8d0dc] dark:active:bg-[#313845] hover:scale-110 active:scale-95"
          }`}
          aria-label="Birdeye Assist"
        >
          <LifeBuoy
            width={L1_STRIP_ICON_SIZE}
            height={L1_STRIP_ICON_SIZE}
            strokeWidth={L1_STRIP_ICON_STROKE_PX}
            className={`transition-all duration-200 ${
              currentView === "birdeye-assist"
                ? "text-[#1E44CC] dark:text-[#2952E3]"
                : "text-[#505050] dark:text-[#9ba2b0] group-hover:text-[#1E44CC] dark:group-hover:text-[#2952E3] group-hover:scale-110"
            }`}
          />
        </button>

        {/* Settings gear — same surface / hover / focus as L1 nav icons */}
        <button
          type="button"
          onMouseEnter={(e) => showTooltip(e, "Settings")}
          onMouseLeave={hideTooltip}
          onClick={hideTooltip}
          className="group relative w-[32px] h-[32px] flex items-center justify-center rounded-[10px] shrink-0 transition-all duration-200 ease-out outline-none bg-transparent hover:bg-[#d4dae3] dark:hover:bg-[#282e3a] active:bg-[#c8d0dc] dark:active:bg-[#313845] hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#1E44CC]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#e0e5eb] dark:focus-visible:ring-offset-[#181b22]"
          aria-label="Settings"
        >
          <Settings
            width={L1_STRIP_ICON_SIZE}
            height={L1_STRIP_ICON_SIZE}
            strokeWidth={L1_STRIP_ICON_STROKE_PX}
            className="text-[#505050] dark:text-[#9ba2b0] transition-all duration-200 group-hover:text-[#1E44CC] dark:group-hover:text-[#2952E3] group-active:text-[#1E44CC] dark:group-active:text-[#2952E3] group-hover:scale-110"
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
            className="relative shrink-0 cursor-pointer overflow-hidden rounded-full p-0 shadow-sm ring-2 ring-white/80 transition-all hover:ring-white dark:ring-[#3d4555] dark:hover:ring-[#4d5568]"
          >
            <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
            {/* Online indicator */}
            <span className="absolute bottom-[1px] right-[1px] h-[10px] w-[10px] rounded-full border-2 border-[#e0e5eb] bg-[#4caf50] dark:border-[#181b22]" />
          </Button>

          {/* Dropdown - opens UPWARD from bottom-left */}
          {profileOpen && (
            <div className="absolute left-[calc(100%+8px)] bottom-0 bg-white dark:bg-[#22262f] rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.14)] dark:shadow-[0px_4px_24px_rgba(0,0,0,0.4)] border border-[#e8eaed] dark:border-[#333a47] w-[260px] z-50 overflow-hidden transition-colors duration-300">
              {/* Slide between main menu and appearance sub-panel */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-250 ease-in-out"
                  style={{ transform: showAppearance ? "translateX(-100%)" : "translateX(0)" }}
                >
                  {/* ─── Main menu panel ─── */}
                  <div className="w-full shrink-0">
                    {/* Profile header */}
                    <div className="px-4 py-3 border-b border-[#f0f0f0] dark:border-[#333a47]">
                      <div className="flex items-center gap-3">
                        <div className="relative group shrink-0">
                          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#e8eaed] dark:ring-[#3d4555]">
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] truncate" style={{ fontWeight: 400 }}>John Doe</p>
                          <p className="text-[11px] text-[#999] dark:text-[#777] truncate">john.doe@acmecorp.com</p>
                        </div>
                      </div>
                    </div>
                    {/* Menu items */}
                    <div className="py-1.5">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors">
                        <User className="w-4 h-4 text-[#555] dark:text-[#8b92a5]" />
                        My profile
                      </button>
                      <button
                        onClick={() => {
                          onViewChange("shared-by-me");
                          setProfileOpen(false);
                          setShowAppearance(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${
                          currentView === "shared-by-me"
                            ? "text-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e]"
                            : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                        }`}
                      >
                        <Share2 className="w-4 h-4" style={{ color: currentView === "shared-by-me" ? "#2552ED" : undefined }} />
                        Shared by me
                      </button>
                      <button
                        onClick={() => {
                          onViewChange("scheduled-deliveries");
                          setProfileOpen(false);
                          setShowAppearance(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${
                          currentView === "scheduled-deliveries"
                            ? "text-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e]"
                            : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                        }`}
                      >
                        <Clock className="w-4 h-4" style={{ color: currentView === "scheduled-deliveries" ? "#2552ED" : undefined }} />
                        Scheduled deliveries
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors">
                        <Settings className="w-4 h-4 text-[#555] dark:text-[#8b92a5]" />
                        Settings
                      </button>
                      {onOpenKeyboardShortcuts && (
                        <button
                          type="button"
                          onClick={() => {
                            onOpenKeyboardShortcuts();
                            setProfileOpen(false);
                            setShowAppearance(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                        >
                          <Keyboard className="w-4 h-4 text-[#555] dark:text-[#8b92a5]" />
                          Keyboard shortcuts
                        </button>
                      )}
                      {/* Switch appearance – navigates to sub-panel */}
                      <button
                        onClick={() => setShowAppearance(true)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                      >
                        <Moon
                          className="w-4 h-4 text-[#555] dark:text-[#8b92a5] transition-transform duration-500"
                          style={{ transform: isDark ? "rotate(-30deg)" : "rotate(0deg)" }}
                        />
                        Switch appearance
                      </button>
                    </div>
                    <div className="border-t border-[#f0f0f0] dark:border-[#333a47] py-1.5">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] text-[#C62828] hover:bg-[#fce4ec] dark:hover:bg-[#352530] transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>

                  {/* ─── Appearance sub-panel ─── */}
                  <div className="w-full shrink-0">
                    {/* Header row */}
                    <div className="flex items-center gap-2.5 px-3 py-3 border-b border-[#f0f0f0] dark:border-[#333a47]">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowAppearance(false)}
                        className="shrink-0 border-2 border-[#2552ED] transition-colors hover:bg-[#e8effe] dark:hover:bg-[#1e2d5e]"
                      >
                        <ChevronLeft className="h-4 w-4 text-[#2552ED]" />
                      </Button>
                      <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4] flex-1" style={{ fontWeight: 400 }}>
                        Switch appearance
                      </span>
                      <Moon
                        className="w-5 h-5 text-[#555] dark:text-[#ccc] transition-transform duration-500"
                        style={{ transform: isDark ? "rotate(-30deg)" : "rotate(0deg)" }}
                      />
                    </div>
                    {/* Theme options */}
                    <div className="py-2">
                      {([
                        { value: "light" as ThemePreference, label: "Light", Icon: Sun },
                        { value: "dark" as ThemePreference, label: "Dark", Icon: Moon },
                        { value: "auto" as ThemePreference, label: "System", Icon: Monitor },
                      ]).map(({ value, label, Icon }) => {
                        const isSelected = preference === value;
                        return (
                          <button
                            key={value}
                            onClick={() => setPreference(value)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors ${
                              isSelected
                                ? "text-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e]"
                                : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <Icon
                                className={`w-4 h-4 transition-transform duration-500 ${
                                  isSelected ? "text-[#2552ED]" : "text-[#555] dark:text-[#8b92a5]"
                                }`}
                                style={{
                                  transform: value === "dark" && isDark ? "rotate(-30deg)" : "rotate(0deg)",
                                }}
                              />
                              {label}
                            </span>
                            {/* Radio indicator */}
                            <span
                              className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-[#2552ED]"
                                  : "border-[#ccc] dark:border-[#4d5568]"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-[10px] h-[10px] rounded-full bg-[#2552ED]" />
                              )}
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

      {/* L1 tooltip portal — renders at document.body so it escapes overflow-y:auto clipping */}
      {tooltip && createPortal(
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{ top: tooltip.top, left: 74, transform: "translateY(-50%)" }}
        >
          <div className="relative flex items-center">
            {/* Left-pointing caret */}
            <span
              className="absolute -left-[6px]"
              style={{
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderRight: "6px solid #111827",
              }}
            />
            <span className="bg-[#111827] dark:bg-[#0d1117] text-white text-[12px] font-medium px-[10px] py-[5px] rounded-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.28)] whitespace-nowrap leading-none">
              {tooltip.label}
            </span>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   L2 Nav Panel (Reports sub-nav) – exported separately
   ═══════════════════════════════════════════ */
interface L2NavPanelProps {
  currentView: AppView;
  onViewChange: (view: AppView, agentSlug?: string) => void;
}

/* ─── Reporting nav data ─── */
const dashboardSections = [
  { label: "Created by me", children: ["Palo Alto performance", "2024 Yearly report"] },
  { label: "Shared with me", children: ["2025 Q1 dashboard", "2025 Q2 dashboard", "2025 Q3 dashboard"] },
];

/** Product report catalogs in Reports L2 (no "Agent Reports" parent). */
const reportCatalogSections = [
  { label: "Reviews AI", children: ["Overview", "Volume and ratings", "Leaderboard", "Distribution", "Responses", "NPS", "Tags", "QR Codes", "Impressions"] },
  { label: "Listings AI", children: ["All sites", "Google", "Apple", "Facebook", "Bing", "Yelp"] },
  { label: "Social AI", children: ["All channels", "Post performance", "Profile performance", "Response trends", "Best time to post"] },
  { label: "Campaigns", children: ["Review requests", "Referral requests", "Referrals shared", "Referral leads", "Customer experience", "Mass texting"] },
  { label: "Inbox", children: ["Over time", "Location", "Users", "Channels"] },
  { label: "Surveys AI", children: ["Survey NPS"] },
  { label: "Ticketing AI", children: ["Ticket resolution time", "Ticket volume"] },
];

export function L2NavPanel({ currentView: _currentView, onViewChange }: L2NavPanelProps) {
  // Active item tracked internally
  const [activeItem, setActiveItem] = useState("Created by me/Palo Alto performance");

  const activate = (key: string) => {
    setActiveItem(key);
    onViewChange("dashboard");
  };

  const dashboardExpandedInit = Object.fromEntries(
    dashboardSections.map(s => [s.label, s.label === "Created by me"])
  );
  const reportExpandedInit = Object.fromEntries(
    reportCatalogSections.map(s => [s.label, s.label === "Listings"])
  );

  const [dashboardExpanded, setDashboardExpanded] = useState<Record<string, boolean>>(() => dashboardExpandedInit);
  const [reportExpanded, setReportExpanded] = useState<Record<string, boolean>>(() => reportExpandedInit);

  const toggleDashboard = (label: string) =>
    setDashboardExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  const toggleReport = (label: string) =>
    setReportExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  const renderDashboardSection = (section: { label: string; children: string[] }) => {
    const isExp = dashboardExpanded[section.label];
    return (
      <div key={section.label}>
        <button
          type="button"
          onClick={() => toggleDashboard(section.label)}
          className={SECTION_HEADER}
          style={{ fontWeight: 400 }}
        >
          <span>{section.label}</span>
          {isExp
            ? <ChevronUp className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
            : <ChevronDown className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
          }
        </button>
        {isExp && section.children.map(child => {
          const key = `${section.label}/${child}`;
          const isActive = activeItem === key;
          return (
            <button
              type="button"
              key={key}
              onClick={() => activate(key)}
              className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
              style={{ fontWeight: isActive ? 400 : 300 }}
            >
              {child}
            </button>
          );
        })}
      </div>
    );
  };

  const renderReportSection = (section: { label: string; children: string[] }) => {
    const isExp = reportExpanded[section.label];
    return (
      <div key={section.label}>
        <button
          type="button"
          onClick={() => toggleReport(section.label)}
          className={SECTION_HEADER}
          style={{ fontWeight: 400 }}
        >
          <span>{section.label}</span>
          {isExp
            ? <ChevronUp className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
            : <ChevronDown className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
          }
        </button>
        {isExp && section.children.map(child => {
          const key = `${section.label}/${child}`;
          const isActive = activeItem === key;
          return (
            <button
              type="button"
              key={key}
              onClick={() => activate(key)}
              className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
              style={{ fontWeight: isActive ? 400 : 300 }}
            >
              {child}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={PANEL} data-no-print>
      <div className="flex-1 overflow-y-auto px-[8px] pt-3 pb-4">
        <p className="px-2 pb-2 text-[11px] uppercase tracking-wide text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 500 }}>
          Reports
        </p>

        {/* Create dashboard button */}
        <button
          type="button"
          className={`${FOOTER_ROW_CLS} mb-2`}
          style={{ fontSize: 14 }}
          onClick={() => onViewChange("dashboard")}
        >
          <span className="text-[14px]">Create dashboard</span>
          <div className="w-[18px] h-[18px] bg-[#1E44CC] rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-[12px] leading-none select-none">+</span>
          </div>
        </button>

        {/* Dashboard sections */}
        {dashboardSections.map(renderDashboardSection)}

        {/* Create report button */}
        <button
          type="button"
          className={`${FOOTER_ROW_CLS} mt-2 mb-2`}
          style={{ fontSize: 14 }}
          onClick={() => onViewChange("dashboard")}
        >
          <span className="text-[14px]">Create report</span>
          <div className="w-[18px] h-[18px] bg-[#1E44CC] rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-[12px] leading-none select-none">+</span>
          </div>
        </button>

        {/* Product report catalogs (Listings, Social, …) — no Agent Reports parent */}
        <div className="mt-2 flex flex-col gap-1">
          {reportCatalogSections.map(renderReportSection)}
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Reviews L2 Nav Panel – uses L2NavLayout
   ═══════════════════════════════════════════ */

const reviewsConfig = {
  headerAction: { label: "Send a review request" },
  defaultExpandedSections: ["Actions"],
  sections: [
    {
      label: "Actions",
      children: [
        "View all reviews",
        "Respond to reviews",
        "Approve replies",
        "Fix rejected replies",
        "View scheduled replies",
        "Fix failed replies",
      ],
    },
    {
      label: "Reports",
      children: [
        "Overview",
        "Volume and ratings",
        "Leaderboard",
        "Distribution",
        "Responses",
        "NPS",
        "Tags",
        "QR Codes",
        "Impressions",
      ],
    },
    {
      label: "Competitors",
      children: ["Benchmarking", "Head to head", "Reviews"],
    },
    {
      label: "Agents",
      children: ["Review generation agents", "Review response agents"],
    },
    {
      label: "Settings",
      children: [
        "Review sites",
        "Request templates",
        "Reply templates",
        "Approvals",
        "QR codes",
        "Widgets",
        "Rating display",
        "Auto share rules",
        "Auto reply rules",
        "AI prompts",
      ],
    },
  ],
  footerLink: { label: "Reports", external: true },
};

export function ReviewsL2NavPanel() {
  return <L2NavLayout {...reviewsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Social L2 Nav Panel – uses L2NavLayout
   ═══════════════════════════════════════════ */
const socialConfig = {
  headerAction: { label: "Create post" },
  sections: [
    { label: "Publish", children: ["View calendar", "View drafts", "Approve posts", "Fix failed posts", "Fix rejected posts"] },
    { label: "Engage", children: ["View all engagements", "Respond to replies", "Approve replies", "Fix rejected replies", "View spam"] },
    { label: "Reports", children: ["All channels", "Post performance", "Profile performance", "Response trends", "Best time to post"] },
    { label: "Competitors", children: ["Benchmarking", "Posts"] },
    { label: "Libraries", children: ["Post library", "Media library", "Reply templates"] },
    { label: "Agents", children: ["Publishing agents", "Engagement agents"] },
    { label: "Settings", children: ["Approvals", "Link in bio", "Tags", "AI posts", "AI prompts"] },
  ],
};

export function SocialL2NavPanel() {
  return <L2NavLayout {...socialConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Search AI L2 Nav Panel – uses L2NavLayout
   ═══════════════════════════════════════════ */
const searchAIConfig = {
  sections: [
    { label: "Reports", children: ["Citations", "Visibility", "Rankings", "Accuracy", "Sentiment"] },
    { label: "Settings", children: ["Prompts"] },
  ],
};

export function SearchAIL2NavPanel(_props?: { activeItem?: string; onActiveItemChange?: (key: string) => void }) {
  return <L2NavLayout {...searchAIConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Contacts L2 Nav Panel – uses L2NavLayout
   ═══════════════════════════════════════════ */
const contactsConfig = {
  headerAction: { label: "Add a contact" },
  standaloneItems: ["All contacts", "Lists & segments"],
  sections: [
    { label: "Settings", children: ["Custom fields", "Tags"] },
  ],
};

export function ContactsL2NavPanel(_props?: { activeItem?: string; onActiveItemChange?: (key: string) => void; onAddContact?: () => void }) {
  return <L2NavLayout {...contactsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Listings L2 Nav Panel – new export
   ═══════════════════════════════════════════ */
const listingsConfig = {
  sections: [
    { label: "Actions", children: ["Recommendations", "Suppress duplicates"] },
    { label: "Ranking reports", children: ["All sites", "Google", "Apple", "Facebook", "Bing", "Yelp"] },
    { label: "Search performance", children: ["All sites", "Google", "Apple", "Facebook", "Bing", "Yelp"] },
    { label: "Accuracy", children: ["Core sites", "Other sites"] },
    { label: "Publish status", children: ["All listings", "By locations", "By sites"] },
    { label: "Agents", children: [] },
    { label: "Settings", children: ["Profiles", "FAQs", "Services", "Keywords & sites", "SEO radius", "Credentials"] },
  ],
};

export function ListingsL2NavPanel() {
  return <L2NavLayout {...listingsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Ticketing L2 Nav Panel – new export
   ═══════════════════════════════════════════ */
const ticketingConfig = {
  headerAction: { label: "Create ticket" },
  sections: [
    { label: "Actions", children: ["My tickets", "View all tickets"] },
    { label: "Reports", children: ["Ticket resolution time", "Ticket volume"] },
    { label: "Agents", children: ["Ticketing agents"] },
  ],
};

export function TicketingL2NavPanel() {
  return <L2NavLayout {...ticketingConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Campaigns L2 Nav Panel – new export
   ═══════════════════════════════════════════ */
const campaignsConfig = {
  sections: [
    { label: "Actions", children: ["Manage automations", "Manage campaigns"] },
    { label: "Libraries", children: ["Templates", "Landing pages"] },
    { label: "Reports", children: ["Review requests", "Referral requests", "Referrals shared", "Referral leads", "Customer experience", "Mass texting"] },
    { label: "Settings", children: ["Communication restriction", "Workflow tags"] },
  ],
};

export function CampaignsL2NavPanel() {
  return <L2NavLayout {...campaignsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Surveys L2 Nav Panel – new export
   ═══════════════════════════════════════════ */
const surveysConfig = {
  headerAction: { label: "Create survey" },
  sections: [
    { label: "Actions", children: ["View surveys"] },
    { label: "Reports", children: ["Survey NPS", "Responses"] },
  ],
};

export function SurveysL2NavPanel() {
  return <L2NavLayout {...surveysConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Insights L2 Nav Panel – new export
   ═══════════════════════════════════════════ */
const insightsConfig = {
  sections: [
    { label: "Actions", children: ["Recommendations", "Track progress"] },
    { label: "Analysis", children: ["All signals", "Reviews", "Listings", "Calls"] },
    { label: "Settings", children: ["Categories & keywords", "Birdeye score"] },
  ],
};

export function InsightsL2NavPanel() {
  return <L2NavLayout {...insightsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Competitors L2 Nav Panel – new export
   ═══════════════════════════════════════════ */
const competitorsConfig = {
  sections: [
    { label: "Actions", children: ["Recommendations", "Track progress"] },
    { label: "Analysis", children: ["All signals", "Reviews", "Social"] },
    { label: "Benchmarking", children: [] },
    { label: "Settings", children: [] },
  ],
};

export function CompetitorsL2NavPanel() {
  return <L2NavLayout {...competitorsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Inbox L2 Nav Panel – custom (not using L2NavLayout)
   ═══════════════════════════════════════════ */

const GREEN_BTN = "w-[18px] h-[18px] bg-[#1E44CC] rounded-full flex items-center justify-center shrink-0";

const inboxSections = [
  {
    label: "Assignment",
    children: ["Assigned to me", "Assigned to AI Agents", "Assigned to others", "Unassigned", "Spam"],
  },
  {
    label: "Leads",
    children: [],
  },
  {
    label: "Feedback",
    children: [],
  },
  {
    label: "Saved filters",
    children: [],
  },
  {
    label: "Reports",
    children: ["Over time", "Location", "Users", "Channels"],
  },
  {
    label: "Agents",
    children: [],
  },
  {
    label: "Settings",
    children: [],
  },
];

const teamSections = [
  {
    label: "Sales Team",
    children: ["Assigned to me", "Assigned to AI Agents", "Assigned to others", "Unassigned", "Spam"],
  },
  {
    label: "Customer Service Team",
    children: ["Assigned to me", "Assigned to AI Agents", "Assigned to others", "Unassigned", "Spam"],
  },
];

export function InboxL2NavPanel() {
  const [activeItem, setActiveItem] = useState("standalone/All messages");
  const publishToBridge = useL2NavBridgeSetter();

  const activate = (key: string) => {
    setActiveItem(key);
    publishToBridge(key);
  };

  // Inbox sections: "Assignment" expanded by default
  const [inboxExpanded, setInboxExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(inboxSections.map(s => [s.label, s.label === "Assignment"]))
  );
  // Team sections: all expanded by default
  const [teamExpanded, setTeamExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(teamSections.map(s => [s.label, false]))
  );

  const toggleInbox = (label: string) =>
    setInboxExpanded(prev => ({ ...prev, [label]: !prev[label] }));
  const toggleTeam = (label: string) =>
    setTeamExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  const renderChildren = (sectionLabel: string, children: string[], prefix: string) =>
    children.map(child => {
      const key = `${prefix}/${sectionLabel}/${child}`;
      const isActive = activeItem === key;
      return (
        <button
          key={key}
          onClick={() => activate(key)}
          className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
          style={{ fontWeight: isActive ? 400 : 300 }}
        >
          {child}
        </button>
      );
    });

  return (
    <div className={PANEL} data-no-print>
      <div className="flex-1 overflow-y-auto px-[8px] pt-3 pb-4">

        {/* Header: New message */}
        <button className={`${FOOTER_ROW_CLS} mb-[6px]`} style={{ fontSize: 14 }}>
          <span className="text-[14px]">New message</span>
          <div className={GREEN_BTN}>
            <span className="text-white text-[12px] leading-none select-none">+</span>
          </div>
        </button>

        {/* Flat item: All messages */}
        {(() => {
          const key = "standalone/All messages";
          const isActive = activeItem === key;
          return (
            <button
              onClick={() => activate(key)}
              className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
              style={{ fontWeight: isActive ? 400 : 300 }}
            >
              All messages
            </button>
          );
        })()}

        {/* Inbox sections */}
        {inboxSections.map(section => (
          <div key={section.label}>
            <button
              onClick={() => toggleInbox(section.label)}
              className={SECTION_HEADER}
              style={{ fontWeight: 400 }}
            >
              <span>{section.label}</span>
              {inboxExpanded[section.label]
                ? <ChevronUp className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
                : <ChevronDown className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
              }
            </button>
            {inboxExpanded[section.label] && renderChildren(section.label, section.children, "inbox")}
          </div>
        ))}

        {/* Divider */}
        <div className="h-px bg-[#dfe1e6] dark:bg-[#2e3340] mx-1 my-3" />

        {/* Internal team chat header */}
        <button className={`${FOOTER_ROW_CLS} mb-[6px]`} style={{ fontSize: 14 }}>
          <span className="text-[14px]">Internal team chat</span>
          <div className={GREEN_BTN}>
            <span className="text-white text-[12px] leading-none select-none">+</span>
          </div>
        </button>

        {/* Team sections */}
        {teamSections.map(section => (
          <div key={section.label}>
            <button
              onClick={() => toggleTeam(section.label)}
              className={SECTION_HEADER}
              style={{ fontWeight: 400 }}
            >
              <span>{section.label}</span>
              {teamExpanded[section.label]
                ? <ChevronUp className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
                : <ChevronDown className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
              }
            </button>
            {teamExpanded[section.label] && renderChildren(section.label, section.children, "team")}
          </div>
        ))}

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Agents L2 Nav Panel – re-exported from versioned file
   ═══════════════════════════════════════════ */
export { AgentsL2NavPanel } from "./AgentsL2NavPanel";

export { MynaConversationsL2NavPanel } from "./MynaConversationsL2NavPanel";

/* ═══════════════════════════════════════════
   Referrals L2 Nav Panel
   ═══════════════════════════════════════════ */
const referralsConfig = {
  standaloneItems: ["Referrals"],
  sections: [],
};

export function ReferralsL2NavPanel() {
  return <L2NavLayout {...referralsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Payments L2 Nav Panel
   ═══════════════════════════════════════════ */
const paymentsConfig = {
  standaloneItems: ["Payments"],
  sections: [],
};

export function PaymentsL2NavPanel() {
  return <L2NavLayout {...paymentsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Appointments L2 Nav Panel
   ═══════════════════════════════════════════ */
const appointmentsConfig = {
  standaloneItems: ["Appointments"],
  sections: [],
};

export function AppointmentsL2NavPanel() {
  return <L2NavLayout {...appointmentsConfig} data-no-print />;
}

/* ═══════════════════════════════════════════
   Birdeye Assist L2 Nav Panel — custom dark panel
   ═══════════════════════════════════════════ */

const ASSIST_APPS: { label: string; Icon: React.ElementType }[] = [
  { label: "Doc Explorer", Icon: ClipboardText },
  { label: "Redash",       Icon: ChartBar      },
  { label: "PAL Console",  Icon: Terminal       },
];

const ASSIST_SERVICES: { label: string; Icon: React.ElementType; sub: boolean }[] = [
  { label: "Account",      Icon: Users,          sub: false },
  { label: "AgentArc",     Icon: Sparkle,        sub: true  },
  { label: "Aggregation",  Icon: Graph,          sub: true  },
  { label: "Appointment",  Icon: CalendarDots,   sub: true  },
  { label: "Armor",        Icon: Shield,         sub: true  },
  { label: "BizApps",      Icon: Briefcase,      sub: true  },
  { label: "Campaign",     Icon: MegaphoneSimple,sub: true  },
  { label: "Competitors",  Icon: Globe,          sub: true  },
  { label: "Doup",         Icon: Database,       sub: true  },
  { label: "Inbox",        Icon: ChatDots,       sub: true  },
  { label: "Integrations", Icon: LinkSimple,     sub: true  },
  { label: "Listings",     Icon: MapPin,         sub: true  },
  { label: "Nexus",        Icon: Lightbulb,      sub: true  },
  { label: "NLP",          Icon: Star,           sub: true  },
  { label: "Reviews",      Icon: Star,           sub: true  },
];

export function BirdeyeAssistL2NavPanel() {
  const [activeService, setActiveService] = useState("Account");

  return (
    <div
      className="w-[220px] bg-[#1a2535] flex flex-col h-full overflow-hidden shrink-0 rounded-tl-lg"
      data-no-print
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[13px] shrink-0">
        <span className="text-white font-semibold text-[14px] tracking-[-0.2px]">Birdeye Assist</span>
        <button className="text-[#6a84a0] hover:text-white transition-colors p-0.5">
          <Menu width={16} height={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* APPS section */}
        <p className="px-2 pt-1 pb-[6px] text-[10.5px] text-[#6a84a0] uppercase tracking-widest font-semibold">
          Apps
        </p>
        {ASSIST_APPS.map(({ label, Icon }) => (
          <button
            key={label}
            className="flex items-center gap-2.5 w-full px-2 py-[7px] text-[13px] text-[#adbdd0] hover:bg-white/[0.07] rounded-[5px] transition-colors text-left"
          >
            <Icon size={15} className="shrink-0 text-[#6a84a0]" />
            <span>{label}</span>
          </button>
        ))}

        {/* SERVICES section */}
        <p className="px-2 pt-3 pb-[6px] text-[10.5px] text-[#6a84a0] uppercase tracking-widest font-semibold">
          Services
        </p>
        {ASSIST_SERVICES.map(({ label, Icon, sub }) => {
          const isActive = activeService === label;
          return (
            <button
              key={label}
              onClick={() => setActiveService(label)}
              className={`flex items-center gap-2.5 w-full px-2 py-[7px] text-[13px] rounded-[5px] transition-colors text-left ${
                isActive
                  ? "bg-white/[0.12] text-white"
                  : "text-[#adbdd0] hover:bg-white/[0.07]"
              }`}
            >
              <Icon
                size={15}
                className={`shrink-0 ${isActive ? "text-[#7aaee8]" : "text-[#6a84a0]"}`}
              />
              <span className="flex-1">{label}</span>
              {sub && (
                <CaretRight
                  size={12}
                  className="shrink-0 text-[#405570]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Legacy combined Sidebar export (backward compat)
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
