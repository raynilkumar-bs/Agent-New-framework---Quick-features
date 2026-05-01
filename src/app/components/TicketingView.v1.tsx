import { useState } from "react";
import {
  Plus, Search, MoreHorizontal, ChevronDown, Filter,
  Mail, Phone, Globe, Star, MessageSquare, Send,
  CheckCircle2, Clock, AlertCircle, XCircle, Minus,
  User, Tag, Paperclip, RefreshCcw, Archive, Flag,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import { cn } from "@/app/components/ui/utils";
import {
  FLOATING_SHEET_FRAME_CONTENT_CLASS,
  FloatingSheetFrame,
} from "@/app/components/layout/FloatingSheetFrame";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/app/components/ui/tooltip";
import { Checkbox } from "@/app/components/ui/checkbox";

/* ─── Types ─── */
type TicketStatus   = "new" | "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "urgent" | "high" | "medium" | "low";
type TicketSource   = "email" | "phone" | "google" | "yelp" | "web_form" | "facebook";

interface TicketMessage {
  id: string;
  author: string;
  isAgent: boolean;
  body: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  subject: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  source: TicketSource;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string | null;
  tags: string[];
  createdAt: string;
  lastActivity: string;
  replyCount: number;
  messages: TicketMessage[];
}

/* ─── Mock data ─── */
const TICKETS: Ticket[] = [
  {
    id: "TKT-1041",
    subject: "Unable to log into patient portal after password reset",
    contactName: "Lisa Monroe",
    contactEmail: "lisa.monroe@email.com",
    contactPhone: "(512) 555-0141",
    source: "email",
    status: "open",
    priority: "urgent",
    assignee: "Sarah Chen",
    tags: ["portal", "login"],
    createdAt: "Apr 13, 2026",
    lastActivity: "2h ago",
    replyCount: 3,
    messages: [
      { id: "m1", author: "Lisa Monroe",  isAgent: false, body: "Hi, I reset my password yesterday but still can't log in. It keeps saying 'invalid credentials' even though I'm sure the password is correct. I need access urgently as my prescription refill is due.", timestamp: "Apr 13, 9:14 am" },
      { id: "m2", author: "Sarah Chen",   isAgent: true,  body: "Hi Lisa, thanks for reaching out! I'm sorry to hear you're having trouble. Let me look into your account right away. Could you confirm which email address you used to register?", timestamp: "Apr 13, 9:32 am" },
      { id: "m3", author: "Lisa Monroe",  isAgent: false, body: "It's this email — lisa.monroe@email.com. I've tried resetting it twice now.", timestamp: "Apr 13, 10:05 am" },
      { id: "m4", author: "Sarah Chen",   isAgent: true,  body: "Thank you! I can see there was a sync issue with our auth system. I've manually cleared the session cache for your account. Please try logging in again now and let me know if it works.", timestamp: "Apr 13, 10:18 am" },
    ],
  },
  {
    id: "TKT-1040",
    subject: "Billing discrepancy on April invoice — overcharged by $240",
    contactName: "Tom Harrington",
    contactEmail: "t.harrington@company.com",
    contactPhone: "(512) 555-0182",
    source: "web_form",
    status: "in_progress",
    priority: "high",
    assignee: "Marcus Webb",
    tags: ["billing", "refund"],
    createdAt: "Apr 12, 2026",
    lastActivity: "5h ago",
    replyCount: 2,
    messages: [
      { id: "m1", author: "Tom Harrington", isAgent: false, body: "I just reviewed my April invoice (#INV-20041) and I was charged $480 when the agreed rate was $240. I've attached the original quote. Please advise on when I can expect a credit or refund.", timestamp: "Apr 12, 2:30 pm" },
      { id: "m2", author: "Marcus Webb",    isAgent: true,  body: "Hello Tom, I sincerely apologize for the billing error. I've flagged this to our finance team and they're reviewing invoice #INV-20041 now. We'll have an update for you within one business day.", timestamp: "Apr 12, 4:15 pm" },
    ],
  },
  {
    id: "TKT-1039",
    subject: "Google review removal request — fake 1-star review",
    contactName: "Aisha Rahman",
    contactEmail: "aisha.r@salon.com",
    contactPhone: "(512) 555-0109",
    source: "google",
    status: "new",
    priority: "high",
    assignee: null,
    tags: ["reviews", "google"],
    createdAt: "Apr 12, 2026",
    lastActivity: "8h ago",
    replyCount: 0,
    messages: [
      { id: "m1", author: "Aisha Rahman", isAgent: false, body: "We received a 1-star review from someone who has never visited our salon. The account was created the same day and has no other reviews. This appears to be a competitor attack. Can you help us flag this for removal through Google?", timestamp: "Apr 12, 11:00 am" },
    ],
  },
  {
    id: "TKT-1038",
    subject: "Appointment confirmation texts not being received",
    contactName: "Carlos Vega",
    contactEmail: "carlos@vegaauto.com",
    contactPhone: "(512) 555-0155",
    source: "phone",
    status: "open",
    priority: "medium",
    assignee: "Priya Nair",
    tags: ["sms", "appointments"],
    createdAt: "Apr 11, 2026",
    lastActivity: "1d ago",
    replyCount: 4,
    messages: [
      { id: "m1", author: "Carlos Vega", isAgent: false, body: "Our customers haven't been getting the appointment confirmation texts for the past 3 days. We've had 6 no-shows as a result. This is a major issue for our business.", timestamp: "Apr 11, 8:45 am" },
      { id: "m2", author: "Priya Nair",  isAgent: true,  body: "Hi Carlos, I completely understand the urgency. I'm checking the SMS delivery logs for your account now.", timestamp: "Apr 11, 9:00 am" },
      { id: "m3", author: "Carlos Vega", isAgent: false, body: "Please hurry — we have 12 appointments scheduled for tomorrow.", timestamp: "Apr 11, 9:30 am" },
      { id: "m4", author: "Priya Nair",  isAgent: true,  body: "I found the issue — your sending number was flagged by the carrier due to an unusual spike in outbound volume. I've submitted an appeal and updated your sending number to a clean long code. Texts should resume within the hour.", timestamp: "Apr 11, 10:15 am" },
    ],
  },
  {
    id: "TKT-1037",
    subject: "Feature request: bulk export for survey responses",
    contactName: "Fiona Blake",
    contactEmail: "fiona@cateringco.com",
    contactPhone: "(512) 555-0122",
    source: "email",
    status: "open",
    priority: "low",
    assignee: "James Osei",
    tags: ["feature-request", "surveys"],
    createdAt: "Apr 11, 2026",
    lastActivity: "1d ago",
    replyCount: 1,
    messages: [
      { id: "m1", author: "Fiona Blake", isAgent: false, body: "It would be incredibly helpful to be able to bulk export survey responses filtered by date range. Currently I have to export each survey individually which is very time-consuming. Is this something on the roadmap?", timestamp: "Apr 11, 3:00 pm" },
      { id: "m2", author: "James Osei",  isAgent: true,  body: "Hi Fiona, great feedback! I've logged this as a feature request with our product team. I'll make sure to follow up once we have a timeline for this.", timestamp: "Apr 11, 4:30 pm" },
    ],
  },
  {
    id: "TKT-1036",
    subject: "Yelp page showing wrong business hours",
    contactName: "David Park",
    contactEmail: "david@parkdentistry.com",
    contactPhone: "(512) 555-0177",
    source: "yelp",
    status: "resolved",
    priority: "medium",
    assignee: "Sarah Chen",
    tags: ["listings", "yelp"],
    createdAt: "Apr 9, 2026",
    lastActivity: "2d ago",
    replyCount: 3,
    messages: [
      { id: "m1", author: "David Park",  isAgent: false, body: "Our Yelp listing is showing we're open until 5pm on Saturdays but we actually close at 2pm. We've had customers showing up after hours and leaving negative reviews.", timestamp: "Apr 9, 9:00 am" },
      { id: "m2", author: "Sarah Chen",  isAgent: true,  body: "I've located your listing and can see the discrepancy. I'll push a correction through our listings sync tool now.", timestamp: "Apr 9, 9:30 am" },
      { id: "m3", author: "Sarah Chen",  isAgent: true,  body: "The update has been submitted to Yelp. Changes typically reflect within 24-48 hours. I'll monitor and confirm once it's live.", timestamp: "Apr 9, 10:00 am" },
    ],
  },
  {
    id: "TKT-1035",
    subject: "Account dashboard not loading — blank white screen",
    contactName: "Maria Santos",
    contactEmail: "maria@santoslegal.com",
    contactPhone: "(512) 555-0133",
    source: "facebook",
    status: "closed",
    priority: "urgent",
    assignee: "Marcus Webb",
    tags: ["bug", "dashboard"],
    createdAt: "Apr 8, 2026",
    lastActivity: "3d ago",
    replyCount: 5,
    messages: [
      { id: "m1", author: "Maria Santos", isAgent: false, body: "When I log in, the dashboard is just a blank white screen. I've tried Chrome and Firefox. This has been happening for 2 days.", timestamp: "Apr 8, 8:00 am" },
      { id: "m2", author: "Marcus Webb",  isAgent: true,  body: "Hi Maria, I'm sorry for the inconvenience. I've reproduced the issue on our end — it appears to be related to a recent browser cache conflict from our last deployment. Please try a hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac).", timestamp: "Apr 8, 8:30 am" },
      { id: "m3", author: "Maria Santos", isAgent: false, body: "That worked! Thank you so much!", timestamp: "Apr 8, 9:00 am" },
    ],
  },
  {
    id: "TKT-1034",
    subject: "Request to add 3 new team members to account",
    contactName: "James Okafor",
    contactEmail: "james@okaforlaw.com",
    contactPhone: "(512) 555-0194",
    source: "email",
    status: "new",
    priority: "low",
    assignee: null,
    tags: ["account", "users"],
    createdAt: "Apr 13, 2026",
    lastActivity: "30m ago",
    replyCount: 0,
    messages: [
      { id: "m1", author: "James Okafor", isAgent: false, body: "We've grown our team and would like to add 3 new members to our Birdeye account. Their details are:\n1. Karen Hill — karen@okaforlaw.com — Manager\n2. Ben Foster — ben@okaforlaw.com — Staff\n3. Rita Osei — rita@okaforlaw.com — Staff\n\nPlease confirm once they've been added.", timestamp: "Apr 13, 11:30 am" },
    ],
  },
];

/* ─── Config ─── */
const STATUS_CONFIG: Record<TicketStatus, { label: string; className: string; icon: React.ElementType }> = {
  new:         { label: "New",         className: "bg-blue-50   text-blue-700   border-blue-200   dark:bg-blue-950/40   dark:text-blue-400",   icon: AlertCircle },
  open:        { label: "Open",        className: "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-400",  icon: Clock },
  in_progress: { label: "In progress", className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400", icon: RefreshCcw },
  resolved:    { label: "Resolved",    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400", icon: CheckCircle2 },
  closed:      { label: "Closed",      className: "bg-slate-50  text-slate-600  border-slate-200  dark:bg-slate-800/40  dark:text-slate-400",  icon: XCircle },
};

const PRIORITY_CONFIG: Record<TicketPriority, { label: string; border: string; dot: string }> = {
  urgent: { label: "Urgent", border: "border-l-red-500",    dot: "bg-red-500" },
  high:   { label: "High",   border: "border-l-orange-400", dot: "bg-orange-400" },
  medium: { label: "Medium", border: "border-l-blue-400",   dot: "bg-blue-400" },
  low:    { label: "Low",    border: "border-l-slate-300",  dot: "bg-slate-300" },
};

const SOURCE_CONFIG: Record<TicketSource, { icon: React.ElementType; label: string; color: string }> = {
  email:    { icon: Mail,          label: "Email",    color: "text-blue-500" },
  phone:    { icon: Phone,         label: "Phone",    color: "text-emerald-500" },
  google:   { icon: Globe,         label: "Google",   color: "text-red-500" },
  yelp:     { icon: Star,          label: "Yelp",     color: "text-red-400" },
  web_form: { icon: Globe,         label: "Web form", color: "text-purple-500" },
  facebook: { icon: MessageSquare, label: "Facebook", color: "text-blue-600" },
};

/* ─── Ticket detail sheet ─── */
function TicketDetailSheet({
  ticket,
  open,
  onClose,
}: {
  ticket: Ticket | null;
  open: boolean;
  onClose: () => void;
}) {
  const [reply, setReply] = useState("");

  if (!ticket) return null;
  const statusCfg   = STATUS_CONFIG[ticket.status];
  const priorityCfg = PRIORITY_CONFIG[ticket.priority];
  const sourceCfg   = SOURCE_CONFIG[ticket.source];
  const SourceIcon  = sourceCfg.icon;

  const replyComposer = (
    <div className="w-full">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply…"
        rows={3}
        className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            <Paperclip size={14} strokeWidth={1.6} absoluteStrokeWidth />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {ticket.status !== "resolved" && (
            <Button variant="outline" size="sm" className="h-7 cursor-pointer gap-2 text-xs">
              <CheckCircle2 size={12} strokeWidth={1.6} absoluteStrokeWidth />
              Resolve
            </Button>
          )}
          <Button size="sm" className="h-7 cursor-pointer gap-2 text-xs" disabled={!reply.trim()}>
            <Send size={12} strokeWidth={1.6} absoluteStrokeWidth />
            Send reply
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        inset="floating"
        floatingSize="lg"
        className={cn(FLOATING_SHEET_FRAME_CONTENT_CLASS, "flex flex-col")}
      >
        <FloatingSheetFrame
          title={
            <>
              <span className="block font-mono text-[11px] font-normal tracking-normal text-muted-foreground">
                {ticket.id}
              </span>
              <span className="mt-1 block text-base font-normal leading-snug tracking-normal text-foreground">
                {ticket.subject}
              </span>
              <span className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`gap-1 text-xs ${statusCfg.className}`}>
                  <statusCfg.icon size={10} strokeWidth={1.6} absoluteStrokeWidth />
                  {statusCfg.label}
                </Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className={`h-2 w-2 rounded-full ${priorityCfg.dot}`} />
                  {priorityCfg.label}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs ${sourceCfg.color}`}>
                  <SourceIcon size={11} strokeWidth={1.6} absoluteStrokeWidth />
                  <span className="text-muted-foreground">{sourceCfg.label}</span>
                </span>
                {ticket.assignee ? (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <User size={11} strokeWidth={1.6} absoluteStrokeWidth />
                    {ticket.assignee}
                  </span>
                ) : null}
              </span>
              {ticket.tags.length > 0 ? (
                <span className="mt-2 flex flex-wrap gap-2">
                  {ticket.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      <Tag size={8} strokeWidth={1.6} absoluteStrokeWidth />
                      {t}
                    </span>
                  ))}
                </span>
              ) : null}
              <span className="sr-only">
                {`Contact ${ticket.contactName}, ${ticket.contactEmail}.`}
              </span>
            </>
          }
          classNames={{
            root: "min-h-0 flex-1",
            header: "border-b border-border",
            body: "px-6 pt-0 pb-4",
            footer:
              "flex w-full flex-col items-stretch justify-start gap-0 border-t border-border sm:flex-col",
          }}
          footer={replyComposer}
        >
          <div className="sticky top-0 z-[1] -mx-6 mb-4 border-b border-border bg-muted/20 px-6 py-3">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{ticket.contactName}</span>
              <span>{ticket.contactEmail}</span>
              <span>{ticket.contactPhone}</span>
              <span className="ml-auto">{ticket.createdAt}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {ticket.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${msg.isAgent ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className={`font-medium ${msg.isAgent ? "text-primary" : "text-foreground"}`}
                  >
                    {msg.author}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.isAgent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            ))}
          </div>
        </FloatingSheetFrame>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Ticket row ─── */
function TicketRow({
  ticket,
  selected,
  onSelect,
  onClick,
}: {
  ticket: Ticket;
  selected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onClick: (t: Ticket) => void;
}) {
  const statusCfg   = STATUS_CONFIG[ticket.status];
  const priorityCfg = PRIORITY_CONFIG[ticket.priority];
  const sourceCfg   = SOURCE_CONFIG[ticket.source];
  const SourceIcon  = sourceCfg.icon;
  const isUnread    = ticket.status === "new";

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 border-b border-border cursor-pointer transition-colors hover:bg-muted/30 ${selected ? "bg-primary/5" : ""} ${isUnread ? "bg-blue-50/50 dark:bg-blue-950/10" : ""} border-l-4 ${priorityCfg.border}`}
      onClick={() => onClick(ticket)}
    >
      {/* Checkbox */}
      <div className="shrink-0 mt-0.5" onClick={(e) => { e.stopPropagation(); onSelect(ticket.id, !selected); }}>
        <Checkbox checked={selected} className="cursor-pointer" />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-sm font-medium truncate ${isUnread ? "text-foreground" : "text-foreground/80"}`}>
              {ticket.contactName}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground shrink-0">{ticket.id}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {ticket.replyCount > 0 && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <MessageSquare size={9} strokeWidth={1.6} absoluteStrokeWidth />
                {ticket.replyCount}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{ticket.lastActivity}</span>
          </div>
        </div>

        <p className={`text-xs mb-1.5 truncate ${isUnread ? "font-medium text-foreground" : "text-foreground/80"}`}>
          {ticket.subject}
        </p>

        <p className="text-[11px] text-muted-foreground truncate">
          {ticket.messages[0]?.body.slice(0, 120)}…
        </p>

        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className={`text-[10px] gap-1 py-0 h-4 ${statusCfg.className}`}>
            <statusCfg.icon size={8} strokeWidth={1.6} absoluteStrokeWidth />
            {statusCfg.label}
          </Badge>
          <div className={`flex items-center gap-1 text-[10px] ${sourceCfg.color}`}>
            <SourceIcon size={9} strokeWidth={1.6} absoluteStrokeWidth />
            <span className="text-muted-foreground">{sourceCfg.label}</span>
          </div>
          {ticket.assignee && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <User size={9} strokeWidth={1.6} absoluteStrokeWidth />
              {ticket.assignee}
            </div>
          )}
          {ticket.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] bg-muted text-muted-foreground rounded px-1.5 py-px">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main view ─── */
export function TicketingView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "all">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = TICKETS.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch =
      t.subject.toLowerCase().includes(q) ||
      t.contactName.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q));
    const matchesStatus   = statusFilter === "all"   || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((t) => t.id)));
    }
  };

  const openTicket = (t: Ticket) => {
    setSelectedTicket(t);
    setSheetOpen(true);
  };

  const STATUS_OPTS: { label: string; value: TicketStatus | "all" }[] = [
    { label: "All status",  value: "all" },
    { label: "New",         value: "new" },
    { label: "Open",        value: "open" },
    { label: "In progress", value: "in_progress" },
    { label: "Resolved",    value: "resolved" },
    { label: "Closed",      value: "closed" },
  ];

  const PRIORITY_OPTS: { label: string; value: TicketPriority | "all" }[] = [
    { label: "All priority", value: "all" },
    { label: "Urgent",       value: "urgent" },
    { label: "High",         value: "high" },
    { label: "Medium",       value: "medium" },
    { label: "Low",          value: "low" },
  ];

  const newCount = TICKETS.filter((t) => t.status === "new").length;
  const openCount = TICKETS.filter((t) => t.status === "open" || t.status === "in_progress").length;

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Tickets</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {newCount} new · {openCount} open
            </p>
          </div>
          <Button size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Plus size={13} strokeWidth={1.6} absoluteStrokeWidth />
            New ticket
          </Button>
        </div>

        {/* ── Ticket list card ── */}
        <div className="flex-1 min-h-0 mx-6 mb-6 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3 shrink-0">
            {/* Select all */}
            <Checkbox
              checked={selectedIds.size > 0 && selectedIds.size === filtered.length}
              onCheckedChange={toggleAll}
              className="cursor-pointer"
            />

            {/* Bulk actions (visible when any selected) */}
            {selectedIds.size > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{selectedIds.size} selected</span>
                <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer gap-1">
                  <CheckCircle2 size={11} strokeWidth={1.6} absoluteStrokeWidth />
                  Resolve
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer gap-1">
                  <User size={11} strokeWidth={1.6} absoluteStrokeWidth />
                  Assign
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer gap-1">
                  <Archive size={11} strokeWidth={1.6} absoluteStrokeWidth />
                  Close
                </Button>
              </div>
            ) : (
              <>
                <div className="relative flex-1 max-w-xs">
                  <Search size={13} strokeWidth={1.6} absoluteStrokeWidth className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search tickets…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 h-8 text-xs"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 cursor-pointer">
                      {STATUS_OPTS.find((o) => o.value === statusFilter)?.label}
                      <ChevronDown size={12} strokeWidth={1.6} absoluteStrokeWidth />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-36">
                    {STATUS_OPTS.map((opt) => (
                      <DropdownMenuItem key={opt.value} className="text-xs cursor-pointer" onClick={() => setStatusFilter(opt.value)}>
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 cursor-pointer">
                      <Flag size={12} strokeWidth={1.6} absoluteStrokeWidth />
                      {PRIORITY_OPTS.find((o) => o.value === priorityFilter)?.label}
                      <ChevronDown size={12} strokeWidth={1.6} absoluteStrokeWidth />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-36">
                    {PRIORITY_OPTS.map((opt) => (
                      <DropdownMenuItem key={opt.value} className="text-xs cursor-pointer" onClick={() => setPriorityFilter(opt.value)}>
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            <span className="text-xs text-muted-foreground ml-auto">{filtered.length} ticket{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Ticket feed */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <MessageSquare size={28} strokeWidth={1.4} absoluteStrokeWidth className="text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">No tickets found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              filtered.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  selected={selectedIds.has(ticket.id)}
                  onSelect={toggleSelect}
                  onClick={openTicket}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border flex items-center justify-between shrink-0">
            <p className="text-xs text-muted-foreground">Showing {filtered.length} of {TICKETS.length} tickets</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>Next</Button>
            </div>
          </div>
        </div>

        {/* ── Ticket detail sheet ── */}
        <TicketDetailSheet
          ticket={selectedTicket}
          open={sheetOpen}
          onClose={() => { setSheetOpen(false); setSelectedTicket(null); }}
        />
      </div>
    </TooltipProvider>
  );
}
