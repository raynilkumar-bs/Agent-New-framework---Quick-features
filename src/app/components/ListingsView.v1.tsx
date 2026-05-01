import { useState } from "react";
import {
  Search, ChevronDown, MoreHorizontal, ExternalLink, RefreshCcw,
  CheckCircle2, AlertCircle, XCircle, Minus, Plus,
  MapPin, Phone, Globe, Building2, TrendingUp,
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
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/app/components/ui/tooltip";

/* ─── Types ─── */
type ListingStatus = "synced" | "error" | "needs_update" | "not_listed" | "pending";

interface SitePresence {
  siteId: string;
  status: ListingStatus;
  accuracy: number | null; // 0-100, null if not listed
  lastSynced: string | null;
  issueDetail?: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  sites: SitePresence[];
}

interface Site {
  id: string;
  name: string;
  category: string;
  locationsListed: number;
  locationsTotal: number;
  avgAccuracy: number;
  lastSynced: string;
}

/* ─── Mock data ─── */
const SITES: Site[] = [
  { id: "google",      name: "Google Business",   category: "Search",    locationsListed: 6, locationsTotal: 6, avgAccuracy: 96, lastSynced: "2h ago" },
  { id: "yelp",        name: "Yelp",               category: "Reviews",   locationsListed: 6, locationsTotal: 6, avgAccuracy: 88, lastSynced: "4h ago" },
  { id: "facebook",    name: "Facebook",            category: "Social",    locationsListed: 5, locationsTotal: 6, avgAccuracy: 82, lastSynced: "6h ago" },
  { id: "apple",       name: "Apple Maps",          category: "Maps",      locationsListed: 6, locationsTotal: 6, avgAccuracy: 91, lastSynced: "1d ago" },
  { id: "bing",        name: "Bing Places",         category: "Search",    locationsListed: 4, locationsTotal: 6, avgAccuracy: 74, lastSynced: "2d ago" },
  { id: "foursquare",  name: "Foursquare",          category: "Discovery", locationsListed: 5, locationsTotal: 6, avgAccuracy: 79, lastSynced: "3d ago" },
  { id: "tripadvisor", name: "TripAdvisor",         category: "Reviews",   locationsListed: 3, locationsTotal: 6, avgAccuracy: 68, lastSynced: "4d ago" },
  { id: "yahoo",       name: "Yahoo Local",         category: "Search",    locationsListed: 4, locationsTotal: 6, avgAccuracy: 71, lastSynced: "5d ago" },
];

const LOCATIONS: Location[] = [
  {
    id: "l1", name: "Downtown Austin", address: "210 W 6th St", city: "Austin", state: "TX", phone: "(512) 555-0101",
    sites: [
      { siteId: "google",      status: "synced",       accuracy: 98, lastSynced: "2h ago" },
      { siteId: "yelp",        status: "synced",       accuracy: 95, lastSynced: "4h ago" },
      { siteId: "facebook",    status: "needs_update", accuracy: 76, lastSynced: "2d ago",  issueDetail: "Phone number mismatch — update to (512) 555-0101" },
      { siteId: "apple",       status: "synced",       accuracy: 96, lastSynced: "1d ago" },
      { siteId: "bing",        status: "synced",       accuracy: 88, lastSynced: "2d ago" },
      { siteId: "foursquare",  status: "synced",       accuracy: 91, lastSynced: "3d ago" },
      { siteId: "tripadvisor", status: "synced",       accuracy: 84, lastSynced: "4d ago" },
      { siteId: "yahoo",       status: "synced",       accuracy: 87, lastSynced: "5d ago" },
    ],
  },
  {
    id: "l2", name: "North Loop", address: "4815 Burnet Rd", city: "Austin", state: "TX", phone: "(512) 555-0209",
    sites: [
      { siteId: "google",      status: "synced",       accuracy: 97, lastSynced: "2h ago" },
      { siteId: "yelp",        status: "synced",       accuracy: 89, lastSynced: "4h ago" },
      { siteId: "facebook",    status: "synced",       accuracy: 85, lastSynced: "6h ago" },
      { siteId: "apple",       status: "synced",       accuracy: 93, lastSynced: "1d ago" },
      { siteId: "bing",        status: "error",        accuracy: 44, lastSynced: "10d ago", issueDetail: "Business name mismatch — Bing shows 'N Loop Dental' instead of 'North Loop Dental'" },
      { siteId: "foursquare",  status: "needs_update", accuracy: 62, lastSynced: "5d ago",  issueDetail: "Address outdated — shows old suite number" },
      { siteId: "tripadvisor", status: "not_listed",   accuracy: null, lastSynced: null },
      { siteId: "yahoo",       status: "synced",       accuracy: 80, lastSynced: "5d ago" },
    ],
  },
  {
    id: "l3", name: "South Congress", address: "1201 S Congress Ave", city: "Austin", state: "TX", phone: "(512) 555-0317",
    sites: [
      { siteId: "google",      status: "synced",       accuracy: 99, lastSynced: "2h ago" },
      { siteId: "yelp",        status: "needs_update", accuracy: 71, lastSynced: "7d ago",  issueDetail: "Hours need updating — Sunday hours not reflected" },
      { siteId: "facebook",    status: "synced",       accuracy: 88, lastSynced: "6h ago" },
      { siteId: "apple",       status: "synced",       accuracy: 90, lastSynced: "1d ago" },
      { siteId: "bing",        status: "not_listed",   accuracy: null, lastSynced: null },
      { siteId: "foursquare",  status: "synced",       accuracy: 82, lastSynced: "3d ago" },
      { siteId: "tripadvisor", status: "synced",       accuracy: 75, lastSynced: "4d ago" },
      { siteId: "yahoo",       status: "not_listed",   accuracy: null, lastSynced: null },
    ],
  },
  {
    id: "l4", name: "Cedar Park", address: "900 E Whitestone Blvd", city: "Cedar Park", state: "TX", phone: "(512) 555-0428",
    sites: [
      { siteId: "google",      status: "synced",       accuracy: 94, lastSynced: "2h ago" },
      { siteId: "yelp",        status: "synced",       accuracy: 86, lastSynced: "4h ago" },
      { siteId: "facebook",    status: "not_listed",   accuracy: null, lastSynced: null },
      { siteId: "apple",       status: "synced",       accuracy: 89, lastSynced: "1d ago" },
      { siteId: "bing",        status: "synced",       accuracy: 77, lastSynced: "2d ago" },
      { siteId: "foursquare",  status: "synced",       accuracy: 74, lastSynced: "3d ago" },
      { siteId: "tripadvisor", status: "not_listed",   accuracy: null, lastSynced: null },
      { siteId: "yahoo",       status: "pending",      accuracy: null, lastSynced: null },
    ],
  },
  {
    id: "l5", name: "Round Rock", address: "3600 Gattis School Rd", city: "Round Rock", state: "TX", phone: "(512) 555-0535",
    sites: [
      { siteId: "google",      status: "error",        accuracy: 38, lastSynced: "3d ago",  issueDetail: "Duplicate listing detected — merge required" },
      { siteId: "yelp",        status: "synced",       accuracy: 90, lastSynced: "4h ago" },
      { siteId: "facebook",    status: "synced",       accuracy: 84, lastSynced: "6h ago" },
      { siteId: "apple",       status: "needs_update", accuracy: 68, lastSynced: "6d ago",  issueDetail: "Category mismatch — update from 'Healthcare' to 'Dentist'" },
      { siteId: "bing",        status: "synced",       accuracy: 81, lastSynced: "2d ago" },
      { siteId: "foursquare",  status: "not_listed",   accuracy: null, lastSynced: null },
      { siteId: "tripadvisor", status: "synced",       accuracy: 72, lastSynced: "4d ago" },
      { siteId: "yahoo",       status: "synced",       accuracy: 79, lastSynced: "5d ago" },
    ],
  },
  {
    id: "l6", name: "Pflugerville", address: "15900 Windermere Dr", city: "Pflugerville", state: "TX", phone: "(512) 555-0641",
    sites: [
      { siteId: "google",      status: "synced",       accuracy: 95, lastSynced: "2h ago" },
      { siteId: "yelp",        status: "synced",       accuracy: 87, lastSynced: "4h ago" },
      { siteId: "facebook",    status: "synced",       accuracy: 80, lastSynced: "6h ago" },
      { siteId: "apple",       status: "synced",       accuracy: 88, lastSynced: "1d ago" },
      { siteId: "bing",        status: "needs_update", accuracy: 55, lastSynced: "8d ago",  issueDetail: "Website URL outdated" },
      { siteId: "foursquare",  status: "synced",       accuracy: 76, lastSynced: "3d ago" },
      { siteId: "tripadvisor", status: "not_listed",   accuracy: null, lastSynced: null },
      { siteId: "yahoo",       status: "synced",       accuracy: 75, lastSynced: "5d ago" },
    ],
  },
];

/* ─── Config ─── */
const STATUS_CFG: Record<ListingStatus, { label: string; icon: React.ElementType; className: string; dotColor: string }> = {
  synced:       { label: "Synced",       icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400", dotColor: "#10b981" },
  error:        { label: "Error",        icon: XCircle,      className: "bg-red-50    text-red-600    border-red-200    dark:bg-red-950/40    dark:text-red-400",    dotColor: "#ef4444" },
  needs_update: { label: "Needs update", icon: AlertCircle,  className: "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-400",  dotColor: "#f59e0b" },
  not_listed:   { label: "Not listed",   icon: Minus,        className: "bg-slate-50  text-slate-500  border-slate-200  dark:bg-slate-800/40  dark:text-slate-400",  dotColor: "#94a3b8" },
  pending:      { label: "Pending",      icon: RefreshCcw,   className: "bg-blue-50   text-blue-600   border-blue-200   dark:bg-blue-950/40   dark:text-blue-400",   dotColor: "#3b82f6" },
};

function StatusBadge({ status }: { status: ListingStatus }) {
  const cfg = STATUS_CFG[status];
  return (
    <Badge variant="outline" className={`text-[10px] gap-1 ${cfg.className}`}>
      <cfg.icon size={9} strokeWidth={1.6} absoluteStrokeWidth />
      {cfg.label}
    </Badge>
  );
}

function AccuracyBar({ value }: { value: number | null }) {
  if (value === null) return <span className="text-xs text-muted-foreground">—</span>;
  const color = value >= 90 ? "bg-emerald-500" : value >= 70 ? "bg-amber-400" : "bg-red-400";
  const textColor = value >= 90 ? "text-emerald-700 dark:text-emerald-400" : value >= 70 ? "text-amber-700 dark:text-amber-400" : "text-red-600 dark:text-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-xs font-medium ${textColor}`}>{value}%</span>
    </div>
  );
}

/* ─── Location detail sheet ─── */
function LocationDetailSheet({
  location,
  open,
  onClose,
}: {
  location: Location | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!location) return null;
  const errorCount  = location.sites.filter((s) => s.status === "error").length;
  const updateCount = location.sites.filter((s) => s.status === "needs_update").length;
  const syncedCount = location.sites.filter((s) => s.status === "synced").length;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-base">{location.name}</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            <span className="flex flex-col gap-1 mt-1">
              <span className="flex items-center gap-1.5"><MapPin size={11} strokeWidth={1.6} absoluteStrokeWidth />{location.address}, {location.city}, {location.state}</span>
              <span className="flex items-center gap-1.5"><Phone size={11} strokeWidth={1.6} absoluteStrokeWidth />{location.phone}</span>
            </span>
          </SheetDescription>
        </SheetHeader>

        {/* Summary tiles */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Synced",       count: syncedCount,  color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Needs update", count: updateCount,  color: "text-amber-600 dark:text-amber-400" },
            { label: "Errors",       count: errorCount,   color: "text-red-600 dark:text-red-400" },
          ].map(({ label, count, color }) => (
            <div key={label} className="bg-muted/30 rounded-xl px-3 py-3 text-center">
              <p className={`text-xl font-bold ${color}`}>{count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Per-site breakdown */}
        <div className="flex flex-col gap-3">
          {location.sites.map((sp) => {
            const site = SITES.find((s) => s.id === sp.siteId)!;
            const cfg  = STATUS_CFG[sp.status];
            return (
              <div
                key={sp.siteId}
                className={`border border-border rounded-xl p-4 ${sp.status === "error" ? "border-red-200 dark:border-red-900/40" : sp.status === "needs_update" ? "border-amber-200 dark:border-amber-900/40" : ""}`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Globe size={14} strokeWidth={1.6} absoluteStrokeWidth className="text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium text-foreground">{site.name}</span>
                  </div>
                  <StatusBadge status={sp.status} />
                </div>
                {sp.accuracy !== null && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">Field accuracy</span>
                    <AccuracyBar value={sp.accuracy} />
                  </div>
                )}
                {sp.issueDetail && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg px-3 py-2 text-xs text-amber-700 dark:text-amber-400 mt-2">
                    {sp.issueDetail}
                  </div>
                )}
                {sp.status !== "not_listed" && sp.status !== "pending" && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-muted-foreground">Last synced: {sp.lastSynced}</span>
                    <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 cursor-pointer gap-1 ml-auto">
                      <ExternalLink size={9} strokeWidth={1.6} absoluteStrokeWidth />
                      View listing
                    </Button>
                  </div>
                )}
                {sp.status === "not_listed" && (
                  <Button size="sm" className="h-6 text-[10px] px-3 cursor-pointer gap-1 mt-2">
                    <Plus size={9} strokeWidth={1.6} absoluteStrokeWidth />
                    Add listing
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Locations tab ─── */
function LocationsTab({ search }: { search: string }) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = LOCATIONS.filter((l) =>
    [l.name, l.city, l.address, l.phone].some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  const getSummaryStatus = (loc: Location): ListingStatus => {
    if (loc.sites.some((s) => s.status === "error"))        return "error";
    if (loc.sites.some((s) => s.status === "needs_update")) return "needs_update";
    if (loc.sites.every((s) => s.status === "synced"))      return "synced";
    return "needs_update";
  };

  const getAvgAccuracy = (loc: Location): number => {
    const listed = loc.sites.filter((s) => s.accuracy !== null);
    if (!listed.length) return 0;
    return Math.round(listed.reduce((sum, s) => sum + (s.accuracy ?? 0), 0) / listed.length);
  };

  const getIssueCount = (loc: Location) =>
    loc.sites.filter((s) => s.status === "error" || s.status === "needs_update").length;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-medium">Location</TableHead>
            <TableHead className="text-xs font-medium w-[110px]">Overall status</TableHead>
            <TableHead className="text-xs font-medium w-[130px]">Avg. accuracy</TableHead>
            <TableHead className="text-xs font-medium w-[90px] text-center">Synced</TableHead>
            <TableHead className="text-xs font-medium w-[90px] text-center">Issues</TableHead>
            <TableHead className="text-xs font-medium w-[48px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-sm text-muted-foreground">
                No locations match your search.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((loc) => {
              const summaryStatus = getSummaryStatus(loc);
              const avgAcc = getAvgAccuracy(loc);
              const issues = getIssueCount(loc);
              const syncedSites = loc.sites.filter((s) => s.status === "synced").length;
              return (
                <TableRow
                  key={loc.id}
                  className="cursor-pointer"
                  onClick={() => { setSelectedLocation(loc); setSheetOpen(true); }}
                >
                  <TableCell className="py-3">
                    <p className="text-sm font-medium text-foreground">{loc.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={10} strokeWidth={1.6} absoluteStrokeWidth />
                      {loc.address}, {loc.city}, {loc.state}
                    </p>
                  </TableCell>
                  <TableCell className="py-3">
                    <StatusBadge status={summaryStatus} />
                  </TableCell>
                  <TableCell className="py-3">
                    <AccuracyBar value={avgAcc} />
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <span className="text-xs text-muted-foreground tabular-nums">{syncedSites}/{loc.sites.length}</span>
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    {issues > 0 ? (
                      <span className="text-xs font-medium text-red-600 dark:text-red-400 tabular-nums">{issues}</span>
                    ) : (
                      <CheckCircle2 size={13} strokeWidth={1.6} absoluteStrokeWidth className="text-emerald-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer">
                          <MoreHorizontal size={15} strokeWidth={1.6} absoluteStrokeWidth />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="text-xs cursor-pointer">
                          <Globe size={12} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
                          View on map
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs cursor-pointer">
                          <RefreshCcw size={12} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
                          Sync now
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs cursor-pointer">
                          Edit profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <LocationDetailSheet
        location={selectedLocation}
        open={sheetOpen}
        onClose={() => { setSheetOpen(false); setSelectedLocation(null); }}
      />
    </>
  );
}

/* ─── Sites tab ─── */
function SitesTab({ search }: { search: string }) {
  const filtered = SITES.filter((s) =>
    [s.name, s.category].some((f) => f.toLowerCase().includes(search.toLowerCase()))
  );

  const coveragePct = (s: Site) => Math.round((s.locationsListed / s.locationsTotal) * 100);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-medium">Directory</TableHead>
          <TableHead className="text-xs font-medium w-[100px]">Category</TableHead>
          <TableHead className="text-xs font-medium w-[150px]">Coverage</TableHead>
          <TableHead className="text-xs font-medium w-[140px]">Avg. accuracy</TableHead>
          <TableHead className="text-xs font-medium w-[120px]">Last synced</TableHead>
          <TableHead className="text-xs font-medium w-[48px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((site) => {
          const pct = coveragePct(site);
          return (
            <TableRow key={site.id} className="cursor-default">
              <TableCell className="py-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Globe size={13} strokeWidth={1.6} absoluteStrokeWidth className="text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{site.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <span className="text-xs text-muted-foreground">{site.category}</span>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct === 100 ? "bg-emerald-500" : pct >= 66 ? "bg-amber-400" : "bg-red-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{site.locationsListed}/{site.locationsTotal}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <AccuracyBar value={site.avgAccuracy} />
              </TableCell>
              <TableCell className="py-3 text-xs text-muted-foreground">{site.lastSynced}</TableCell>
              <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer">
                      <MoreHorizontal size={15} strokeWidth={1.6} absoluteStrokeWidth />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem className="text-xs cursor-pointer">
                      <RefreshCcw size={12} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
                      Sync now
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs cursor-pointer">
                      <ExternalLink size={12} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
                      View directory
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

/* ─── Main view ─── */
export function ListingsView() {
  const [search, setSearch] = useState("");

  // Aggregate stats
  const allSitePresences = LOCATIONS.flatMap((l) => l.sites);
  const totalSynced     = allSitePresences.filter((s) => s.status === "synced").length;
  const totalErrors     = allSitePresences.filter((s) => s.status === "error").length;
  const totalUpdates    = allSitePresences.filter((s) => s.status === "needs_update").length;
  const totalNotListed  = allSitePresences.filter((s) => s.status === "not_listed").length;
  const totalPresences  = allSitePresences.length;
  const overallAccuracy = Math.round(
    allSitePresences.filter((s) => s.accuracy !== null).reduce((sum, s) => sum + (s.accuracy ?? 0), 0) /
    allSitePresences.filter((s) => s.accuracy !== null).length
  );

  const SUMMARY_TILES = [
    { label: "Synced",       count: totalSynced,    total: totalPresences, icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "With errors",  count: totalErrors,    total: totalPresences, icon: XCircle,      color: "text-red-600 dark:text-red-400",          bg: "bg-red-50 dark:bg-red-950/20" },
    { label: "Needs update", count: totalUpdates,   total: totalPresences, icon: AlertCircle,  color: "text-amber-600 dark:text-amber-400",      bg: "bg-amber-50 dark:bg-amber-950/20" },
    { label: "Not listed",   count: totalNotListed, total: totalPresences, icon: Minus,        color: "text-slate-500 dark:text-slate-400",      bg: "bg-muted/50" },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Listings</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {LOCATIONS.length} locations · {SITES.length} directories · {overallAccuracy}% avg. accuracy
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs">
              <RefreshCcw size={12} strokeWidth={1.6} absoluteStrokeWidth />
              Sync all
            </Button>
            <Button size="sm" className="cursor-pointer gap-1.5 text-xs">
              <Plus size={13} strokeWidth={1.6} absoluteStrokeWidth />
              Add location
            </Button>
          </div>
        </div>

        {/* ── Summary tiles ── */}
        <div className="px-6 pb-4 grid grid-cols-4 gap-3 shrink-0">
          {SUMMARY_TILES.map(({ label, count, total, icon: Icon, color, bg }) => (
            <div key={label} className={`${bg} border border-border rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:shadow-sm transition-shadow`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}>
                <Icon size={16} strokeWidth={1.6} absoluteStrokeWidth className={color} />
              </div>
              <div>
                <p className={`text-xl font-bold ${color}`}>{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main table card ── */}
        <div className="flex-1 min-h-0 mx-6 mb-6 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <Tabs defaultValue="locations" className="flex flex-col flex-1 min-h-0">
            {/* Tab bar + search */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-4 shrink-0">
              <TabsList className="h-8">
                <TabsTrigger value="locations" className="text-xs h-6 px-3">
                  <Building2 size={11} strokeWidth={1.6} absoluteStrokeWidth className="mr-1.5" />
                  Locations
                </TabsTrigger>
                <TabsTrigger value="sites" className="text-xs h-6 px-3">
                  <Globe size={11} strokeWidth={1.6} absoluteStrokeWidth className="mr-1.5" />
                  Sites
                </TabsTrigger>
              </TabsList>

              <div className="relative max-w-xs flex-1">
                <Search size={13} strokeWidth={1.6} absoluteStrokeWidth className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>

            {/* Locations */}
            <TabsContent value="locations" className="flex-1 overflow-y-auto mt-0">
              <LocationsTab search={search} />
            </TabsContent>

            {/* Sites */}
            <TabsContent value="sites" className="flex-1 overflow-y-auto mt-0">
              <SitesTab search={search} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}
