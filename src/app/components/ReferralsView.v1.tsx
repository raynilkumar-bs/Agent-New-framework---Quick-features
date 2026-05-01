import { useState } from "react";
import {
  Mail, Smartphone, Share2, Link2, Globe,
  Download, UserPlus, Search, MapPin,
  CheckCircle2, ArrowUpDown, Send, Gift,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Progress } from "@/app/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/app/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/app/components/ui/sheet";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/app/components/ui/tooltip";

/* ─── Types ─── */
type Channel = "email" | "sms" | "facebook" | "link" | "other";

interface ChannelBreakdown { channel: Channel; count: number; pct: number; }

interface StatCard {
  label: string;
  count: number;
  channels: ChannelBreakdown[];
}

interface SentRow {
  id: string; sentTo: string; via: Channel; code: string; sentOn: string;
}
interface SharedRow {
  id: string; sharedBy: string; via: Channel[]; code: string; sharedOn: string;
}
interface LeadRow {
  id: string; name: string; location: string;
  referredBy: string; code: string; createdOn: string;
  thanksSent: boolean; response: string;
}

/* ─── Mock data ─── */
const STATS: StatCard[] = [
  {
    label: "Referrals sent",
    count: 247,
    channels: [
      { channel: "email",    count: 104, pct: 42 },
      { channel: "sms",      count: 77,  pct: 31 },
      { channel: "facebook", count: 37,  pct: 15 },
      { channel: "link",     count: 20,  pct:  8 },
      { channel: "other",    count:  9,  pct:  4 },
    ],
  },
  {
    label: "Referrals shared",
    count: 89,
    channels: [
      { channel: "facebook", count: 46, pct: 52 },
      { channel: "email",    count: 21, pct: 24 },
      { channel: "sms",      count: 13, pct: 15 },
      { channel: "link",     count:  9, pct: 10 },
    ],
  },
  {
    label: "Leads generated",
    count: 34,
    channels: [
      { channel: "facebook", count: 18, pct: 53 },
      { channel: "email",    count: 10, pct: 29 },
      { channel: "sms",      count:  6, pct: 18 },
    ],
  },
];

const SENT_ROWS: SentRow[] = [
  { id: "1", sentTo: "John Smith",        via: "email",    code: "REF-2024-001", sentOn: "Mar 15, 2024" },
  { id: "2", sentTo: "Sarah Johnson",     via: "sms",      code: "REF-2024-002", sentOn: "Mar 14, 2024" },
  { id: "3", sentTo: "Michael Chen",      via: "email",    code: "REF-2024-003", sentOn: "Mar 14, 2024" },
  { id: "4", sentTo: "Emily Rodriguez",   via: "facebook", code: "REF-2024-004", sentOn: "Mar 13, 2024" },
  { id: "5", sentTo: "David Kim",         via: "sms",      code: "REF-2024-005", sentOn: "Mar 13, 2024" },
  { id: "6", sentTo: "Jennifer Lee",      via: "email",    code: "REF-2024-006", sentOn: "Mar 12, 2024" },
  { id: "7", sentTo: "Robert Martinez",   via: "link",     code: "REF-2024-007", sentOn: "Mar 12, 2024" },
  { id: "8", sentTo: "Amanda Taylor",     via: "facebook", code: "REF-2024-008", sentOn: "Mar 11, 2024" },
];

const SHARED_ROWS: SharedRow[] = [
  { id: "1", sharedBy: "Lisa Park",       via: ["facebook", "email"], code: "REF-2024-001", sharedOn: "Mar 16, 2024" },
  { id: "2", sharedBy: "Tom Wilson",      via: ["facebook"],          code: "REF-2024-002", sharedOn: "Mar 15, 2024" },
  { id: "3", sharedBy: "Rachel Brown",    via: ["email"],             code: "REF-2024-003", sharedOn: "Mar 15, 2024" },
  { id: "4", sharedBy: "James Garcia",    via: ["sms"],               code: "REF-2024-004", sharedOn: "Mar 14, 2024" },
  { id: "5", sharedBy: "Megan Thompson",  via: ["facebook", "link"],  code: "REF-2024-005", sharedOn: "Mar 14, 2024" },
  { id: "6", sharedBy: "Kevin Anderson",  via: ["email", "sms"],      code: "REF-2024-006", sharedOn: "Mar 13, 2024" },
];

const LEAD_ROWS: LeadRow[] = [
  { id: "1", name: "Alex Martinez",    location: "Austin, TX",      referredBy: "Lisa Park",      code: "REF-2024-001", createdOn: "Mar 17, 2024", thanksSent: true,  response: "" },
  { id: "2", name: "Rachel Brown",     location: "Houston, TX",     referredBy: "Tom Wilson",     code: "REF-2024-002", createdOn: "Mar 16, 2024", thanksSent: false, response: "Very interested in the service" },
  { id: "3", name: "Nicole Davis",     location: "Dallas, TX",      referredBy: "Rachel Brown",   code: "REF-2024-003", createdOn: "Mar 16, 2024", thanksSent: true,  response: "Love the product" },
  { id: "4", name: "Mark Johnson",     location: "San Antonio, TX", referredBy: "James Garcia",   code: "REF-2024-004", createdOn: "Mar 15, 2024", thanksSent: false, response: "" },
  { id: "5", name: "Jessica Williams", location: "Austin, TX",      referredBy: "Megan Thompson", code: "REF-2024-005", createdOn: "Mar 15, 2024", thanksSent: true,  response: "Can't wait to get started" },
];

/* ─── Helpers ─── */
const CHANNEL_META: Record<Channel, { label: string; icon: React.ElementType; color: string }> = {
  email:    { label: "Email",    icon: Mail,        color: "text-blue-500" },
  sms:      { label: "SMS",      icon: Smartphone,  color: "text-green-500" },
  facebook: { label: "Facebook", icon: Share2,      color: "text-indigo-500" },
  link:     { label: "Link",     icon: Link2,       color: "text-orange-500" },
  other:    { label: "Other",    icon: Globe,       color: "text-muted-foreground" },
};

function ChannelIcon({ channel, className = "" }: { channel: Channel; className?: string }) {
  const { icon: Icon, color } = CHANNEL_META[channel];
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icon size={14} className={`${color} ${className}`} strokeWidth={1.6} absoluteStrokeWidth />
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">{CHANNEL_META[channel].label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* ─── Stat card ─── */
function StatCard({ card }: { card: StatCard }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-4 flex-1 min-w-0">
      <div>
        <p className="text-[28px] font-semibold tracking-tight text-foreground leading-none">
          {card.count.toLocaleString()}
        </p>
        <p className="mt-1 text-[13px] text-muted-foreground">{card.label}</p>
      </div>
      <div className="flex flex-col gap-2">
        {card.channels.map(({ channel, count, pct }) => {
          const { icon: Icon, color } = CHANNEL_META[channel];
          return (
            <div key={channel} className="flex items-center gap-2">
              <Icon size={13} className={`shrink-0 ${color}`} strokeWidth={1.6} absoluteStrokeWidth />
              <Progress value={pct} className="h-1.5 flex-1 bg-muted" />
              <span className="text-[11px] tabular-nums text-muted-foreground w-[26px] text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Sent table ─── */
function SentTable({ rows }: { rows: SentRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[220px]">
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Sent to <ArrowUpDown size={12} />
            </button>
          </TableHead>
          <TableHead className="w-[120px] text-xs font-medium text-muted-foreground">Sent via</TableHead>
          <TableHead className="w-[160px] text-xs font-medium text-muted-foreground">Referral code</TableHead>
          <TableHead className="text-xs font-medium text-muted-foreground">
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Sent on <ArrowUpDown size={12} />
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id} className="group">
            <TableCell className="font-medium text-[13px] text-foreground py-3">{r.sentTo}</TableCell>
            <TableCell className="py-3">
              <div className="flex items-center gap-1.5">
                <ChannelIcon channel={r.via} />
                <span className="text-[13px] text-muted-foreground">{CHANNEL_META[r.via].label}</span>
              </div>
            </TableCell>
            <TableCell className="py-3">
              <Badge variant="secondary" className="font-mono text-[11px] tracking-wide">{r.code}</Badge>
            </TableCell>
            <TableCell className="py-3 text-[13px] text-muted-foreground">{r.sentOn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ─── Shared table ─── */
function SharedTable({ rows }: { rows: SharedRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[220px]">
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Shared by <ArrowUpDown size={12} />
            </button>
          </TableHead>
          <TableHead className="w-[140px] text-xs font-medium text-muted-foreground">Shared via</TableHead>
          <TableHead className="w-[160px] text-xs font-medium text-muted-foreground">Referral code</TableHead>
          <TableHead className="text-xs font-medium text-muted-foreground">
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Shared on <ArrowUpDown size={12} />
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id} className="group">
            <TableCell className="font-medium text-[13px] text-foreground py-3">{r.sharedBy}</TableCell>
            <TableCell className="py-3">
              <div className="flex items-center gap-1.5">
                {r.via.map((ch) => <ChannelIcon key={ch} channel={ch} />)}
              </div>
            </TableCell>
            <TableCell className="py-3">
              <Badge variant="secondary" className="font-mono text-[11px] tracking-wide">{r.code}</Badge>
            </TableCell>
            <TableCell className="py-3 text-[13px] text-muted-foreground">{r.sharedOn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ─── Leads table ─── */
function LeadsTable({ rows, onViewDetails }: { rows: LeadRow[]; onViewDetails: (r: LeadRow) => void }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[200px] text-xs font-medium text-muted-foreground">Lead</TableHead>
          <TableHead className="w-[160px] text-xs font-medium text-muted-foreground">Referred by</TableHead>
          <TableHead className="w-[160px] text-xs font-medium text-muted-foreground">Referral code</TableHead>
          <TableHead className="w-[140px]">
            <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              Created on <ArrowUpDown size={12} />
            </button>
          </TableHead>
          <TableHead className="w-[120px] text-xs font-medium text-muted-foreground">Thanks note</TableHead>
          <TableHead className="text-xs font-medium text-muted-foreground">Response</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow
            key={r.id}
            className="group cursor-pointer"
            onClick={() => onViewDetails(r)}
          >
            <TableCell className="py-3">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-[13px] text-foreground flex items-center gap-1">
                  {r.name}
                  <Gift size={11} className="text-[#1E44CC] dark:text-[#2952E3]" strokeWidth={1.6} absoluteStrokeWidth />
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin size={10} strokeWidth={1.6} absoluteStrokeWidth />
                  {r.location}
                </span>
              </div>
            </TableCell>
            <TableCell className="py-3 text-[13px] text-muted-foreground">{r.referredBy}</TableCell>
            <TableCell className="py-3">
              <Badge variant="secondary" className="font-mono text-[11px] tracking-wide">{r.code}</Badge>
            </TableCell>
            <TableCell className="py-3 text-[13px] text-muted-foreground">{r.createdOn}</TableCell>
            <TableCell className="py-3">
              {r.thanksSent ? (
                <span className="flex items-center gap-1 text-[12px] text-green-600 dark:text-green-400 font-medium">
                  <CheckCircle2 size={13} strokeWidth={1.6} absoluteStrokeWidth />
                  Sent
                </span>
              ) : (
                <button
                  className="flex items-center gap-1 text-[12px] text-[#1E44CC] dark:text-[#2952E3] hover:underline font-medium"
                  onClick={(e) => { e.stopPropagation(); onViewDetails(r); }}
                >
                  <Send size={11} strokeWidth={1.6} absoluteStrokeWidth />
                  Send note
                </button>
              )}
            </TableCell>
            <TableCell className="py-3 text-[13px] text-muted-foreground max-w-[200px] truncate">
              {r.response || <span className="text-muted-foreground/40">—</span>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ─── Lead detail sheet ─── */
function LeadDetailSheet({ lead, open, onClose }: { lead: LeadRow | null; open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-[420px] sm:max-w-[420px] flex flex-col gap-6">
        {lead && (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {lead.name}
                <Gift size={14} className="text-[#1E44CC]" strokeWidth={1.6} absoluteStrokeWidth />
              </SheetTitle>
              <SheetDescription className="flex items-center gap-1 text-sm">
                <MapPin size={12} strokeWidth={1.6} absoluteStrokeWidth />
                {lead.location}
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Referred by</span>
                <span className="text-foreground">{lead.referredBy}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Referral code</span>
                <Badge variant="secondary" className="font-mono w-fit">{lead.code}</Badge>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Created on</span>
                <span className="text-foreground">{lead.createdOn}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Thanks note</span>
                {lead.thanksSent ? (
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 size={14} strokeWidth={1.6} absoluteStrokeWidth />
                    Note sent
                  </span>
                ) : (
                  <Button size="sm" variant="outline" className="w-fit gap-1.5">
                    <Send size={13} strokeWidth={1.6} absoluteStrokeWidth />
                    Send thanks note
                  </Button>
                )}
              </div>
              {lead.response && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response</span>
                  <p className="text-foreground leading-relaxed">{lead.response}</p>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ═══════════════════════════════════════════
   ReferralsView — main export
   ═══════════════════════════════════════════ */
export function ReferralsView() {
  const [tab, setTab] = useState("sent");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);

  const filteredSent   = SENT_ROWS.filter((r) => r.sentTo.toLowerCase().includes(search.toLowerCase()));
  const filteredShared = SHARED_ROWS.filter((r) => r.sharedBy.toLowerCase().includes(search.toLowerCase()));
  const filteredLeads  = LEAD_ROWS.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.referredBy.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ─── Top action bar ─── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="relative w-[260px]">
          <Search
            size={14} strokeWidth={1.6} absoluteStrokeWidth
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            placeholder="Search referrals…"
            className="pl-8 h-8 text-sm bg-muted/40 border-transparent focus:border-border focus:bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 h-8">
            <Download size={13} strokeWidth={1.6} absoluteStrokeWidth />
            Export
          </Button>
          <Button size="sm" className="gap-1.5 h-8 bg-[#1E44CC] hover:bg-[#1a3aad] text-white">
            <UserPlus size={13} strokeWidth={1.6} absoluteStrokeWidth />
            Invite customers
          </Button>
        </div>
      </div>

      {/* ─── Scrollable content ─── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

        {/* Stat cards */}
        <div className="flex gap-4">
          {STATS.map((card) => <StatCard key={card.label} card={card} />)}
        </div>

        {/* Tabs + table */}
        <Tabs value={tab} onValueChange={setTab} className="flex flex-col gap-0">
          <TabsList className="w-fit h-9 bg-muted/50 rounded-lg mb-4">
            <TabsTrigger value="sent"   className="text-[13px] px-4">Sent</TabsTrigger>
            <TabsTrigger value="shared" className="text-[13px] px-4">Shared</TabsTrigger>
            <TabsTrigger value="leads"  className="text-[13px] px-4">
              Leads
              <Badge className="ml-1.5 h-4 px-1.5 text-[10px] bg-[#1E44CC] text-white rounded-full">
                {LEAD_ROWS.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <TabsContent value="sent"   className="mt-0 p-0">
              <SentTable rows={filteredSent} />
            </TabsContent>
            <TabsContent value="shared" className="mt-0 p-0">
              <SharedTable rows={filteredShared} />
            </TabsContent>
            <TabsContent value="leads"  className="mt-0 p-0">
              <LeadsTable rows={filteredLeads} onViewDetails={setSelectedLead} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Lead detail sheet */}
      <LeadDetailSheet
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
