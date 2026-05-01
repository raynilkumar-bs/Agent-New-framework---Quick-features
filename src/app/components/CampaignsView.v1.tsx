import { useState } from "react";
import {
  Plus, Search, MoreHorizontal, Mail, Smartphone, BarChart2, Edit3,
  Copy, Trash2, ChevronDown, Users, Send, MousePointerClick,
  CheckCircle2, PauseCircle, Clock, Calendar, Zap, Play,
  UserMinus, Star, RefreshCw,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/app/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/app/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/app/components/ui/tooltip";

/* ─── Types ─── */
type CampaignType = "review_request" | "referral" | "survey" | "promotional" | "customer_experience";
type CampaignStatus = "active" | "paused" | "draft" | "completed" | "scheduled";
type CampaignMedium = "email" | "sms" | "both";
type CampaignTab = "campaigns" | "automations";

interface ActivityRow {
  id: string;
  name: string;
  action: "Opened" | "Clicked" | "Unsubscribed";
  timestamp: string;
}

interface Campaign {
  id: string;
  name: string;
  tab: CampaignTab;
  medium: CampaignMedium;
  type: CampaignType;
  status: CampaignStatus;
  contacts: number;
  opened: number;
  openedPct: number;
  clicked: number;
  clickedPct: number;
  lastRun: string;
  createdBy: string;
  created: string;
  scheduleType: string;
  recentActivity: ActivityRow[];
  unsubscribed: number;
  unsubscribedPct: number;
}

/* ─── Mock data ─── */
const CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "Spring Promo – 20% Off Services",
    tab: "campaigns",
    medium: "email",
    type: "promotional",
    status: "active",
    contacts: 1840,
    opened: 612,
    openedPct: 33,
    clicked: 287,
    clickedPct: 16,
    lastRun: "Apr 12, 2026",
    createdBy: "Sarah Chen",
    created: "Apr 8, 2026",
    scheduleType: "One-time",
    unsubscribed: 14,
    unsubscribedPct: 1,
    recentActivity: [
      { id: "a1", name: "Lisa Monroe",    action: "Opened",       timestamp: "Apr 12, 2:14 PM" },
      { id: "a2", name: "Tom Harrington", action: "Clicked",      timestamp: "Apr 12, 1:58 PM" },
      { id: "a3", name: "Aisha Rahman",   action: "Opened",       timestamp: "Apr 12, 1:33 PM" },
      { id: "a4", name: "Carlos Vega",    action: "Unsubscribed", timestamp: "Apr 12, 12:47 PM" },
      { id: "a5", name: "Nina Petrov",    action: "Clicked",      timestamp: "Apr 12, 11:22 AM" },
    ],
  },
  {
    id: "c2",
    name: "Review Request – Post Visit",
    tab: "campaigns",
    medium: "sms",
    type: "review_request",
    status: "active",
    contacts: 3200,
    opened: 1856,
    openedPct: 58,
    clicked: 924,
    clickedPct: 29,
    lastRun: "Apr 13, 2026",
    createdBy: "Marcus Webb",
    created: "Apr 11, 2026",
    scheduleType: "One-time",
    unsubscribed: 22,
    unsubscribedPct: 1,
    recentActivity: [
      { id: "a1", name: "Oliver Grant",  action: "Clicked",      timestamp: "Apr 13, 9:41 AM" },
      { id: "a2", name: "Fiona Blake",   action: "Opened",       timestamp: "Apr 13, 9:18 AM" },
      { id: "a3", name: "David Park",    action: "Opened",       timestamp: "Apr 13, 8:55 AM" },
      { id: "a4", name: "Maria Santos",  action: "Clicked",      timestamp: "Apr 13, 8:30 AM" },
      { id: "a5", name: "Ben Nakamura",  action: "Unsubscribed", timestamp: "Apr 13, 7:44 AM" },
    ],
  },
  {
    id: "c3",
    name: "Q1 Referral Drive",
    tab: "campaigns",
    medium: "both",
    type: "referral",
    status: "completed",
    contacts: 960,
    opened: 441,
    openedPct: 46,
    clicked: 182,
    clickedPct: 19,
    lastRun: "Mar 31, 2026",
    createdBy: "Priya Nair",
    created: "Mar 20, 2026",
    scheduleType: "One-time",
    unsubscribed: 6,
    unsubscribedPct: 1,
    recentActivity: [
      { id: "a1", name: "Devon King",   action: "Clicked",  timestamp: "Mar 31, 5:02 PM" },
      { id: "a2", name: "Clara Hughes", action: "Opened",   timestamp: "Mar 31, 4:39 PM" },
      { id: "a3", name: "Elena Watts",  action: "Opened",   timestamp: "Mar 31, 3:15 PM" },
      { id: "a4", name: "Sam Rivers",   action: "Clicked",  timestamp: "Mar 31, 2:44 PM" },
      { id: "a5", name: "Joy Okonkwo",  action: "Opened",   timestamp: "Mar 31, 1:20 PM" },
    ],
  },
  {
    id: "c4",
    name: "Patient Satisfaction Survey",
    tab: "campaigns",
    medium: "email",
    type: "survey",
    status: "draft",
    contacts: 0,
    opened: 0,
    openedPct: 0,
    clicked: 0,
    clickedPct: 0,
    lastRun: "—",
    createdBy: "James Osei",
    created: "Apr 10, 2026",
    scheduleType: "Not scheduled",
    unsubscribed: 0,
    unsubscribedPct: 0,
    recentActivity: [],
  },
  {
    id: "c5",
    name: "Win-Back Inactive Clients",
    tab: "campaigns",
    medium: "email",
    type: "customer_experience",
    status: "scheduled",
    contacts: 540,
    opened: 0,
    openedPct: 0,
    clicked: 0,
    clickedPct: 0,
    lastRun: "Apr 20, 2026",
    createdBy: "Sarah Chen",
    created: "Apr 13, 2026",
    scheduleType: "Scheduled – Apr 20, 2026",
    unsubscribed: 0,
    unsubscribedPct: 0,
    recentActivity: [],
  },
  {
    id: "a1",
    name: "Post-Appointment Review Request",
    tab: "automations",
    medium: "sms",
    type: "review_request",
    status: "active",
    contacts: 8420,
    opened: 4884,
    openedPct: 58,
    clicked: 2442,
    clickedPct: 29,
    lastRun: "Ongoing",
    createdBy: "Marcus Webb",
    created: "Jan 15, 2026",
    scheduleType: "Triggered – post-appointment",
    unsubscribed: 48,
    unsubscribedPct: 1,
    recentActivity: [
      { id: "a1", name: "Rachel Kim",    action: "Clicked",      timestamp: "Apr 14, 10:02 AM" },
      { id: "a2", name: "Luke Brennan",  action: "Opened",       timestamp: "Apr 14, 9:48 AM" },
      { id: "a3", name: "Sasha Patel",   action: "Opened",       timestamp: "Apr 14, 9:22 AM" },
      { id: "a4", name: "Meg Foster",    action: "Unsubscribed", timestamp: "Apr 14, 8:55 AM" },
      { id: "a5", name: "Finn Murphy",   action: "Clicked",      timestamp: "Apr 14, 8:31 AM" },
    ],
  },
  {
    id: "a2",
    name: "Birthday Offer",
    tab: "automations",
    medium: "email",
    type: "promotional",
    status: "active",
    contacts: 1140,
    opened: 570,
    openedPct: 50,
    clicked: 228,
    clickedPct: 20,
    lastRun: "Ongoing",
    createdBy: "Priya Nair",
    created: "Feb 1, 2026",
    scheduleType: "Triggered – birthday",
    unsubscribed: 9,
    unsubscribedPct: 1,
    recentActivity: [
      { id: "a1", name: "Zara Ahmed",   action: "Opened",  timestamp: "Apr 14, 7:00 AM" },
      { id: "a2", name: "Hugo Blanc",   action: "Clicked", timestamp: "Apr 13, 7:04 AM" },
      { id: "a3", name: "Isla Ramos",   action: "Opened",  timestamp: "Apr 12, 7:01 AM" },
      { id: "a4", name: "Chris Lane",   action: "Clicked", timestamp: "Apr 11, 7:02 AM" },
      { id: "a5", name: "Daisy Ford",   action: "Opened",  timestamp: "Apr 10, 7:00 AM" },
    ],
  },
  {
    id: "a3",
    name: "NPS Follow-Up",
    tab: "automations",
    medium: "email",
    type: "survey",
    status: "paused",
    contacts: 2600,
    opened: 1118,
    openedPct: 43,
    clicked: 0,
    clickedPct: 0,
    lastRun: "Apr 1, 2026",
    createdBy: "James Osei",
    created: "Mar 1, 2026",
    scheduleType: "Triggered – post-survey",
    unsubscribed: 31,
    unsubscribedPct: 1,
    recentActivity: [
      { id: "a1", name: "Ann Fischer",   action: "Opened",       timestamp: "Apr 1, 3:12 PM" },
      { id: "a2", name: "Raj Mehta",     action: "Opened",       timestamp: "Apr 1, 2:54 PM" },
      { id: "a3", name: "Tara Simmons",  action: "Unsubscribed", timestamp: "Apr 1, 1:30 PM" },
      { id: "a4", name: "Marco Silva",   action: "Opened",       timestamp: "Apr 1, 11:48 AM" },
      { id: "a5", name: "Beth Collins",  action: "Opened",       timestamp: "Apr 1, 10:22 AM" },
    ],
  },
];

/* ─── Config maps ─── */
const TYPE_CONFIG: Record<CampaignType, { label: string; className: string }> = {
  review_request:      { label: "Review Request",      className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400" },
  referral:            { label: "Referral",            className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400" },
  survey:              { label: "Survey",              className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400" },
  promotional:         { label: "Promotional",         className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400" },
  customer_experience: { label: "Customer Experience", className: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-400" },
};

const STATUS_CONFIG: Record<CampaignStatus, { label: string; className: string; icon: React.ElementType }> = {
  active:    { label: "Active",    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400", icon: CheckCircle2 },
  paused:    { label: "Paused",    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400",           icon: PauseCircle },
  draft:     { label: "Draft",     className: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/40 dark:text-slate-400",           icon: Clock },
  completed: { label: "Completed", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400",               icon: CheckCircle2 },
  scheduled: { label: "Scheduled", className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400",     icon: Calendar },
};

const MEDIUM_CONFIG: Record<CampaignMedium, { label: string; icon: React.ElementType }> = {
  email: { label: "Email", icon: Mail },
  sms:   { label: "SMS",   icon: Smartphone },
  both:  { label: "Both",  icon: Mail },
};

const ACTIVITY_CONFIG: Record<ActivityRow["action"], { className: string; icon: React.ElementType }> = {
  Opened:       { className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400",         icon: Mail },
  Clicked:      { className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400", icon: MousePointerClick },
  Unsubscribed: { className: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400",              icon: UserMinus },
};

/* ─── Medium badge ─── */
function MediumBadge({ medium }: { medium: CampaignMedium }) {
  const cfg = MEDIUM_CONFIG[medium];
  const Icon = cfg.icon;
  if (medium === "both") {
    return (
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="text-[10px] gap-1 bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/40 dark:text-slate-400">
          <Mail size={9} strokeWidth={1.6} absoluteStrokeWidth />
          Email
        </Badge>
        <Badge variant="outline" className="text-[10px] gap-1 bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/40 dark:text-slate-400">
          <Smartphone size={9} strokeWidth={1.6} absoluteStrokeWidth />
          SMS
        </Badge>
      </div>
    );
  }
  return (
    <Badge variant="outline" className="text-[10px] gap-1 bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/40 dark:text-slate-400">
      <Icon size={9} strokeWidth={1.6} absoluteStrokeWidth />
      {cfg.label}
    </Badge>
  );
}

/* ─── Stat tile ─── */
function StatTile({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-muted/30 rounded-xl px-4 py-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon size={12} strokeWidth={1.6} absoluteStrokeWidth />
        <span className="text-xs">{label}</span>
      </div>
      <span className="text-xl font-semibold text-foreground">{value}</span>
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
    </div>
  );
}

/* ─── Campaign Detail Sheet ─── */
function CampaignDetailSheet({
  campaign,
  open,
  onClose,
}: {
  campaign: Campaign | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!campaign) return null;
  const typeCfg   = TYPE_CONFIG[campaign.type];
  const statusCfg = STATUS_CONFIG[campaign.status];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-xl overflow-y-auto flex flex-col gap-0">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-base leading-snug pr-8">{campaign.name}</SheetTitle>
          <SheetDescription className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="outline" className={`text-xs ${typeCfg.className}`}>
              {typeCfg.label}
            </Badge>
            <Badge variant="outline" className={`text-xs gap-1 ${statusCfg.className}`}>
              <statusCfg.icon size={10} strokeWidth={1.6} absoluteStrokeWidth />
              {statusCfg.label}
            </Badge>
            <MediumBadge medium={campaign.medium} />
          </SheetDescription>
        </SheetHeader>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatTile
            icon={Users}
            label="Contacts Sent"
            value={campaign.contacts.toLocaleString()}
          />
          <StatTile
            icon={Mail}
            label="Opened"
            value={campaign.opened.toLocaleString()}
            sub={campaign.openedPct > 0 ? `${campaign.openedPct}% open rate` : undefined}
          />
          <StatTile
            icon={MousePointerClick}
            label="Clicked"
            value={campaign.clicked.toLocaleString()}
            sub={campaign.clickedPct > 0 ? `${campaign.clickedPct}% click rate` : undefined}
          />
          <StatTile
            icon={UserMinus}
            label="Unsubscribed"
            value={campaign.unsubscribed.toLocaleString()}
            sub={campaign.unsubscribedPct > 0 ? `${campaign.unsubscribedPct}% unsub rate` : undefined}
          />
        </div>

        {/* Timeline info */}
        <div className="mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-3">Timeline</p>
          <div className="bg-muted/20 rounded-xl px-4 py-3 flex flex-col gap-2">
            {[
              { label: "Created",       value: campaign.created,      icon: Clock },
              { label: "Last run",      value: campaign.lastRun,      icon: RefreshCw },
              { label: "Schedule type", value: campaign.scheduleType, icon: Calendar },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon size={12} strokeWidth={1.6} absoluteStrokeWidth />
                  <span className="text-xs">{label}</span>
                </div>
                <span className="text-xs text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        {campaign.recentActivity.length > 0 ? (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Recent activity</p>
            <div className="flex flex-col gap-2">
              {campaign.recentActivity.map((row) => {
                const actCfg = ACTIVITY_CONFIG[row.action];
                const ActIcon = actCfg.icon;
                return (
                  <div key={row.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          {row.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{row.name}</p>
                        <Badge variant="outline" className={`text-[10px] gap-1 mt-0.5 ${actCfg.className}`}>
                          <ActIcon size={9} strokeWidth={1.6} absoluteStrokeWidth />
                          {row.action}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{row.timestamp}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Send size={28} strokeWidth={1.4} absoluteStrokeWidth className="text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">No activity yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              {campaign.status === "draft"
                ? "Publish this campaign to start sending."
                : "Activity will appear here once the campaign runs."}
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-border shrink-0">
          <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs">
            <BarChart2 size={12} strokeWidth={1.6} absoluteStrokeWidth />
            View report
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Edit3 size={12} strokeWidth={1.6} absoluteStrokeWidth />
            Edit campaign
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Row actions dropdown ─── */
function CampaignRowActions({
  campaign,
  onViewReport,
}: {
  campaign: Campaign;
  onViewReport: () => void;
}) {
  const isPaused  = campaign.status === "paused";
  const isActive  = campaign.status === "active";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <MoreHorizontal size={15} strokeWidth={1.6} absoluteStrokeWidth />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem className="text-xs cursor-pointer" onClick={onViewReport}>
          <BarChart2 size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          View report
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Edit3 size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Copy size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Clone
        </DropdownMenuItem>
        {(isActive || isPaused) && (
          <DropdownMenuItem className="text-xs cursor-pointer">
            {isActive ? (
              <>
                <PauseCircle size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
                Resume
              </>
            )}
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs cursor-pointer text-destructive focus:text-destructive">
          <Trash2 size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Campaign table ─── */
function CampaignTable({
  campaigns,
  onRowClick,
}: {
  campaigns: Campaign[];
  onRowClick: (c: Campaign) => void;
}) {
  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Send size={28} strokeWidth={1.4} absoluteStrokeWidth className="text-muted-foreground mb-3" />
        <p className="text-sm font-medium text-foreground">No campaigns found</p>
        <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-medium">Campaign name</TableHead>
          <TableHead className="text-xs font-medium w-[150px]">Type</TableHead>
          <TableHead className="text-xs font-medium w-[110px]">Status</TableHead>
          <TableHead className="text-xs font-medium w-[90px] text-right">Contacts</TableHead>
          <TableHead className="text-xs font-medium w-[110px] text-right">Opened</TableHead>
          <TableHead className="text-xs font-medium w-[110px] text-right">Clicked</TableHead>
          <TableHead className="text-xs font-medium w-[120px]">Last run</TableHead>
          <TableHead className="text-xs font-medium w-[120px]">Created by</TableHead>
          <TableHead className="text-xs font-medium w-[48px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => {
          const typeCfg   = TYPE_CONFIG[campaign.type];
          const statusCfg = STATUS_CONFIG[campaign.status];
          return (
            <TableRow
              key={campaign.id}
              className="cursor-pointer"
              onClick={() => onRowClick(campaign)}
            >
              {/* Campaign name */}
              <TableCell className="py-3">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                  <MediumBadge medium={campaign.medium} />
                </div>
              </TableCell>

              {/* Type */}
              <TableCell className="py-3">
                <Badge variant="outline" className={`text-xs ${typeCfg.className}`}>
                  {typeCfg.label}
                </Badge>
              </TableCell>

              {/* Status */}
              <TableCell className="py-3">
                <Badge variant="outline" className={`text-xs gap-1 ${statusCfg.className}`}>
                  <statusCfg.icon size={10} strokeWidth={1.6} absoluteStrokeWidth />
                  {statusCfg.label}
                </Badge>
              </TableCell>

              {/* Contacts */}
              <TableCell className="py-3 text-xs text-muted-foreground text-right tabular-nums">
                {campaign.contacts > 0 ? campaign.contacts.toLocaleString() : "—"}
              </TableCell>

              {/* Opened */}
              <TableCell className="py-3 text-right">
                {campaign.opened > 0 ? (
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-foreground tabular-nums">
                      {campaign.opened.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {campaign.openedPct}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>

              {/* Clicked */}
              <TableCell className="py-3 text-right">
                {campaign.clicked > 0 ? (
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-foreground tabular-nums">
                      {campaign.clicked.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {campaign.clickedPct}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>

              {/* Last run */}
              <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap">
                {campaign.lastRun}
              </TableCell>

              {/* Created by */}
              <TableCell className="py-3 text-xs text-muted-foreground">
                {campaign.createdBy}
              </TableCell>

              {/* Actions */}
              <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                <CampaignRowActions
                  campaign={campaign}
                  onViewReport={() => onRowClick(campaign)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

/* ─── Toolbar ─── */
function CampaignToolbar({
  search,
  onSearch,
  typeFilter,
  onTypeFilter,
  statusFilter,
  onStatusFilter,
  count,
}: {
  search: string;
  onSearch: (v: string) => void;
  typeFilter: CampaignType | "all";
  onTypeFilter: (v: CampaignType | "all") => void;
  statusFilter: CampaignStatus | "all";
  onStatusFilter: (v: CampaignStatus | "all") => void;
  count: number;
}) {
  const TYPE_OPTS: { label: string; value: CampaignType | "all" }[] = [
    { label: "All types",            value: "all" },
    { label: "Review Request",       value: "review_request" },
    { label: "Referral",             value: "referral" },
    { label: "Survey",               value: "survey" },
    { label: "Promotional",          value: "promotional" },
    { label: "Customer Experience",  value: "customer_experience" },
  ];

  const STATUS_OPTS: { label: string; value: CampaignStatus | "all" }[] = [
    { label: "All statuses", value: "all" },
    { label: "Active",       value: "active" },
    { label: "Paused",       value: "paused" },
    { label: "Draft",        value: "draft" },
    { label: "Completed",    value: "completed" },
    { label: "Scheduled",    value: "scheduled" },
  ];

  const activeTypeLabel   = TYPE_OPTS.find((o) => o.value === typeFilter)?.label   ?? "All types";
  const activeStatusLabel = STATUS_OPTS.find((o) => o.value === statusFilter)?.label ?? "All statuses";

  return (
    <div className="px-4 py-3 border-b border-border flex items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <Search
          size={13}
          strokeWidth={1.6}
          absoluteStrokeWidth
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          placeholder="Search campaigns…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-8 h-8 text-xs"
        />
      </div>

      {/* Type filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 cursor-pointer">
            {activeTypeLabel}
            <ChevronDown size={12} strokeWidth={1.6} absoluteStrokeWidth />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {TYPE_OPTS.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              className="text-xs cursor-pointer"
              onClick={() => onTypeFilter(opt.value)}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 cursor-pointer">
            {activeStatusLabel}
            <ChevronDown size={12} strokeWidth={1.6} absoluteStrokeWidth />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          {STATUS_OPTS.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              className="text-xs cursor-pointer"
              onClick={() => onStatusFilter(opt.value)}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Count */}
      <span className="text-xs text-muted-foreground ml-auto">
        {count} campaign{count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

/* ─── Main export ─── */
export function CampaignsView() {
  const [activeTab, setActiveTab]       = useState<CampaignTab>("campaigns");
  const [search, setSearch]             = useState("");
  const [typeFilter, setTypeFilter]     = useState<CampaignType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | "all">("all");
  const [selected, setSelected]         = useState<Campaign | null>(null);
  const [sheetOpen, setSheetOpen]       = useState(false);

  const openSheet = (campaign: Campaign) => {
    setSelected(campaign);
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setSelected(null);
  };

  const filtered = (tab: CampaignTab) =>
    CAMPAIGNS.filter((c) => {
      if (c.tab !== tab) return false;
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.createdBy.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter === "all" || c.type === typeFilter;
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });

  const activeCampaigns = CAMPAIGNS.filter((c) => c.status === "active").length;
  const totalSent       = CAMPAIGNS.reduce((sum, c) => sum + c.contacts, 0);

  const campaignsFiltered   = filtered("campaigns");
  const automationsFiltered = filtered("automations");

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Campaigns</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeCampaigns} active · {totalSent.toLocaleString()} total sent
            </p>
          </div>
          <Button size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Plus size={13} strokeWidth={1.6} absoluteStrokeWidth />
            Create campaign
          </Button>
        </div>

        {/* ── Tabs ── */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as CampaignTab)}
          className="flex-1 min-h-0 flex flex-col"
        >
          <div className="px-6 shrink-0">
            <TabsList className="h-8">
              <TabsTrigger value="campaigns" className="text-xs gap-1.5">
                <Send size={12} strokeWidth={1.6} absoluteStrokeWidth />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="automations" className="text-xs gap-1.5">
                <Zap size={12} strokeWidth={1.6} absoluteStrokeWidth />
                Automations
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ── Campaigns tab ── */}
          <TabsContent value="campaigns" className="flex-1 min-h-0 mt-4 mx-6 mb-6">
            <div className="h-full bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <CampaignToolbar
                search={search}
                onSearch={setSearch}
                typeFilter={typeFilter}
                onTypeFilter={setTypeFilter}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
                count={campaignsFiltered.length}
              />
              <div className="flex-1 overflow-y-auto">
                <CampaignTable
                  campaigns={campaignsFiltered}
                  onRowClick={openSheet}
                />
              </div>
              <div className="px-4 py-3 border-t border-border flex items-center justify-between shrink-0">
                <p className="text-xs text-muted-foreground">
                  Showing {campaignsFiltered.length} of{" "}
                  {CAMPAIGNS.filter((c) => c.tab === "campaigns").length} campaigns
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Automations tab ── */}
          <TabsContent value="automations" className="flex-1 min-h-0 mt-4 mx-6 mb-6">
            <div className="h-full bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <CampaignToolbar
                search={search}
                onSearch={setSearch}
                typeFilter={typeFilter}
                onTypeFilter={setTypeFilter}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
                count={automationsFiltered.length}
              />
              <div className="flex-1 overflow-y-auto">
                <CampaignTable
                  campaigns={automationsFiltered}
                  onRowClick={openSheet}
                />
              </div>
              <div className="px-4 py-3 border-t border-border flex items-center justify-between shrink-0">
                <p className="text-xs text-muted-foreground">
                  Showing {automationsFiltered.length} of{" "}
                  {CAMPAIGNS.filter((c) => c.tab === "automations").length} automations
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Detail sheet ── */}
        <CampaignDetailSheet
          campaign={selected}
          open={sheetOpen}
          onClose={closeSheet}
        />
      </div>
    </TooltipProvider>
  );
}
