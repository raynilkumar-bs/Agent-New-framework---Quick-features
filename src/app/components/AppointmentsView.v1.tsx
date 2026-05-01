import { useState, useMemo } from "react";
import {
  ChevronLeft, ChevronRight, Plus, Search, MoreHorizontal,
  Clock, User, Calendar, List, CheckCircle2, X, Bell,
  MapPin, Phone, Mail,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/app/components/ui/table";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/app/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/app/components/ui/dialog";
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
} from "@/app/components/ui/tooltip";

/* ─── Types ─── */
type ApptStatus = "confirmed" | "requested" | "completed" | "cancelled" | "no_show" | "in_progress";
type ViewMode = "calendar" | "schedule";
type CalendarView = "day" | "week";

interface Provider {
  id: string; name: string; specialty: string; color: string;
}

interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  providerId: string;
  service: string;
  status: ApptStatus;
  date: string; // ISO yyyy-mm-dd
  startTime: string; // HH:MM 24h
  endTime: string;
  duration: number; // minutes
  location: string;
  notes?: string;
}

/* ─── Mock data ─── */
const PROVIDERS: Provider[] = [
  { id: "p1", name: "Dr. Sarah Chen",   specialty: "General Dentistry", color: "#4f46e5" },
  { id: "p2", name: "Dr. Marcus Webb",  specialty: "Orthodontics",      color: "#0891b2" },
  { id: "p3", name: "Dr. Priya Nair",   specialty: "Cosmetic Dentistry", color: "#059669" },
  { id: "p4", name: "Dr. James Osei",   specialty: "Oral Surgery",       color: "#d97706" },
];

// Week of Apr 14, 2026 (Mon–Sun)
const WEEK_DATES = ["2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17", "2026-04-18", "2026-04-19", "2026-04-20"];

const APPOINTMENTS: Appointment[] = [
  // Monday
  { id: "a1",  patientName: "Lisa Monroe",     patientEmail: "lisa@example.com",    patientPhone: "(512) 555-0141", providerId: "p1", service: "Teeth Cleaning",      status: "confirmed",   date: "2026-04-14", startTime: "09:00", endTime: "09:45", duration: 45, location: "Suite 101" },
  { id: "a2",  patientName: "Tom Harrington",  patientEmail: "tom@example.com",     patientPhone: "(512) 555-0182", providerId: "p2", service: "Braces Adjustment",   status: "confirmed",   date: "2026-04-14", startTime: "10:00", endTime: "10:30", duration: 30, location: "Suite 204" },
  { id: "a3",  patientName: "Aisha Rahman",    patientEmail: "aisha@example.com",   patientPhone: "(512) 555-0109", providerId: "p3", service: "Veneer Consultation", status: "requested",   date: "2026-04-14", startTime: "11:00", endTime: "11:30", duration: 30, location: "Suite 308" },
  { id: "a4",  patientName: "Carlos Vega",     patientEmail: "carlos@example.com",  patientPhone: "(512) 555-0155", providerId: "p4", service: "Tooth Extraction",    status: "confirmed",   date: "2026-04-14", startTime: "14:00", endTime: "15:00", duration: 60, location: "Suite 412" },
  // Tuesday
  { id: "a5",  patientName: "Fiona Blake",     patientEmail: "fiona@example.com",   patientPhone: "(512) 555-0122", providerId: "p1", service: "Root Canal",          status: "in_progress", date: "2026-04-15", startTime: "09:30", endTime: "11:00", duration: 90, location: "Suite 101" },
  { id: "a6",  patientName: "David Park",      patientEmail: "david@example.com",   patientPhone: "(512) 555-0177", providerId: "p2", service: "Retainer Fitting",    status: "confirmed",   date: "2026-04-15", startTime: "13:00", endTime: "13:30", duration: 30, location: "Suite 204" },
  // Wednesday
  { id: "a7",  patientName: "Maria Santos",    patientEmail: "maria@example.com",   patientPhone: "(512) 555-0133", providerId: "p3", service: "Whitening Session",   status: "confirmed",   date: "2026-04-16", startTime: "10:00", endTime: "11:00", duration: 60, location: "Suite 308" },
  { id: "a8",  patientName: "James Okafor",    patientEmail: "james@example.com",   patientPhone: "(512) 555-0194", providerId: "p1", service: "Check-up & X-ray",   status: "cancelled",   date: "2026-04-16", startTime: "14:30", endTime: "15:00", duration: 30, location: "Suite 101", notes: "Patient requested reschedule." },
  // Thursday
  { id: "a9",  patientName: "Nina Petrov",     patientEmail: "nina@example.com",    patientPhone: "(512) 555-0161", providerId: "p4", service: "Implant Consult",     status: "confirmed",   date: "2026-04-17", startTime: "09:00", endTime: "09:30", duration: 30, location: "Suite 412" },
  { id: "a10", patientName: "Oliver Grant",    patientEmail: "oliver@example.com",  patientPhone: "(512) 555-0148", providerId: "p2", service: "Invisalign Check",    status: "requested",   date: "2026-04-17", startTime: "11:30", endTime: "12:00", duration: 30, location: "Suite 204" },
  { id: "a11", patientName: "Sophia Turner",   patientEmail: "sophia@example.com",  patientPhone: "(512) 555-0115", providerId: "p3", service: "Bonding",             status: "no_show",     date: "2026-04-17", startTime: "15:00", endTime: "15:45", duration: 45, location: "Suite 308" },
  // Friday
  { id: "a12", patientName: "Ben Nakamura",    patientEmail: "ben@example.com",     patientPhone: "(512) 555-0127", providerId: "p1", service: "Fluoride Treatment",  status: "confirmed",   date: "2026-04-18", startTime: "08:30", endTime: "09:00", duration: 30, location: "Suite 101" },
  { id: "a13", patientName: "Clara Hughes",    patientEmail: "clara@example.com",   patientPhone: "(512) 555-0188", providerId: "p3", service: "Scaling & Polish",    status: "completed",   date: "2026-04-18", startTime: "10:00", endTime: "10:45", duration: 45, location: "Suite 308" },
  { id: "a14", patientName: "Devon King",      patientEmail: "devon@example.com",   patientPhone: "(512) 555-0139", providerId: "p4", service: "Wisdom Tooth Eval",   status: "confirmed",   date: "2026-04-18", startTime: "13:30", endTime: "14:00", duration: 30, location: "Suite 412" },
  // Saturday
  { id: "a15", patientName: "Elena Watts",     patientEmail: "elena@example.com",   patientPhone: "(512) 555-0172", providerId: "p2", service: "Dental Emergency",    status: "confirmed",   date: "2026-04-19", startTime: "10:00", endTime: "11:00", duration: 60, location: "Suite 204" },
];

/* ─── Status config ─── */
const STATUS_CONFIG: Record<ApptStatus, { label: string; className: string; dotColor: string }> = {
  confirmed:   { label: "Confirmed",   className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400", dotColor: "#10b981" },
  requested:   { label: "Requested",   className: "bg-blue-50   text-blue-700   border-blue-200   dark:bg-blue-950/40   dark:text-blue-400",   dotColor: "#3b82f6" },
  completed:   { label: "Completed",   className: "bg-slate-50  text-slate-600  border-slate-200  dark:bg-slate-800/40  dark:text-slate-400",  dotColor: "#94a3b8" },
  cancelled:   { label: "Cancelled",   className: "bg-red-50    text-red-600    border-red-200    dark:bg-red-950/40    dark:text-red-400",    dotColor: "#ef4444" },
  no_show:     { label: "No show",     className: "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-400",  dotColor: "#f59e0b" },
  in_progress: { label: "In progress", className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400", dotColor: "#8b5cf6" },
};

/* ─── Helpers ─── */
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_FULL  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function fmtDateHeader(iso: string): { day: string; num: number; month: string } {
  const d = parseDate(iso);
  return { day: DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1], num: d.getDate(), month: MONTH_NAMES[d.getMonth()] };
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function fmtTime12(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function providerById(id: string): Provider {
  return PROVIDERS.find((p) => p.id === id)!;
}

function isToday(iso: string): boolean {
  return iso === "2026-04-14"; // Monday = "today" in our mock
}

/* ─── Appointment card (calendar cell) ─── */
function ApptCard({
  appt,
  onClick,
  compact = false,
}: {
  appt: Appointment;
  onClick: (a: Appointment) => void;
  compact?: boolean;
}) {
  const provider = providerById(appt.providerId);
  const statusCfg = STATUS_CONFIG[appt.status];

  return (
    <button
      onClick={() => onClick(appt)}
      className="w-full text-left rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      style={{ borderLeftColor: provider.color, borderLeftWidth: 3 }}
    >
      <div className="px-2.5 py-2 bg-card group-hover:bg-muted/30 transition-colors">
        <div className="flex items-start justify-between gap-1">
          <p className={`font-medium text-foreground leading-tight ${compact ? "text-[11px]" : "text-xs"}`}>
            {appt.patientName}
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
            style={{ background: statusCfg.dotColor }}
          />
        </div>
        {!compact && (
          <>
            <p className="text-[10px] text-muted-foreground mt-0.5">{appt.service}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <Clock size={9} strokeWidth={1.6} absoluteStrokeWidth />
              {fmtTime12(appt.startTime)} · {appt.duration}m
            </p>
          </>
        )}
        {compact && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{fmtTime12(appt.startTime)}</p>
        )}
      </div>
    </button>
  );
}

/* ─── Calendar week view ─── */
function WeekCalendar({
  dates,
  appointments,
  onApptClick,
}: {
  dates: string[];
  appointments: Appointment[];
  onApptClick: (a: Appointment) => void;
}) {
  const byDate = useMemo(() => {
    const map: Record<string, Appointment[]> = {};
    for (const d of dates) map[d] = [];
    for (const a of appointments) {
      if (map[a.date]) map[a.date].push(a);
    }
    // sort by start time
    for (const d of dates) {
      map[d].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    }
    return map;
  }, [dates, appointments]);

  const TIME_SLOTS: string[] = [];
  for (let h = 8; h <= 18; h++) {
    TIME_SLOTS.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 18) TIME_SLOTS.push(`${h.toString().padStart(2, "0")}:30`);
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Gutter + time column */}
      <div className="flex flex-col shrink-0">
        {/* Header spacer */}
        <div className="h-12 border-b border-r border-border" style={{ width: 52 }} />
        {/* Time labels */}
        <div className="overflow-y-auto flex-1 border-r border-border" style={{ width: 52 }}>
          {TIME_SLOTS.map((t) => (
            <div
              key={t}
              className="flex items-start justify-end pr-2 text-[10px] text-muted-foreground"
              style={{ height: 40 }}
            >
              <span className="-translate-y-1.5">{t.endsWith(":00") ? fmtTime12(t) : ""}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Day columns (scrollable together) */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden flex flex-col min-w-0">
        {/* Day headers */}
        <div className="flex border-b border-border shrink-0">
          {dates.map((d, i) => {
            const { day, num, month } = fmtDateHeader(d);
            const today = isToday(d);
            const count = (byDate[d] ?? []).length;
            return (
              <div
                key={d}
                className={`flex-1 min-w-[120px] h-12 flex flex-col items-center justify-center border-r border-border last:border-r-0 ${today ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground font-medium">{day}</span>
                  <span
                    className={`text-sm font-semibold ${today ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs" : "text-foreground"}`}
                  >
                    {num}
                  </span>
                </div>
                {count > 0 && (
                  <span className="text-[10px] text-muted-foreground mt-0.5">{count} appt{count > 1 ? "s" : ""}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Time grid */}
        <div className="flex flex-1 overflow-y-auto">
          {dates.map((d) => {
            const today = isToday(d);
            const dayAppts = byDate[d] ?? [];
            return (
              <div
                key={d}
                className={`flex-1 min-w-[120px] border-r border-border last:border-r-0 relative ${today ? "bg-primary/[0.02]" : ""}`}
              >
                {/* Grid rows */}
                {TIME_SLOTS.map((t) => (
                  <div
                    key={t}
                    className={`border-b ${t.endsWith(":30") ? "border-dashed border-border/40" : "border-border/60"}`}
                    style={{ height: 40 }}
                  />
                ))}

                {/* Appointments overlaid */}
                <div className="absolute inset-0 p-1 flex flex-col gap-1 pointer-events-none">
                  {dayAppts.map((a) => {
                    const startMin = timeToMinutes(a.startTime) - 8 * 60;
                    const topPx = (startMin / 30) * 40;
                    const heightPx = Math.max((a.duration / 30) * 40 - 4, 36);
                    return (
                      <div
                        key={a.id}
                        className="absolute left-1 right-1 pointer-events-auto"
                        style={{ top: topPx + 2, height: heightPx }}
                      >
                        <ApptCard appt={a} onClick={onApptClick} compact={a.duration <= 30} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Day single-column view ─── */
function DayCalendar({
  date,
  appointments,
  onApptClick,
}: {
  date: string;
  appointments: Appointment[];
  onApptClick: (a: Appointment) => void;
}) {
  const dayAppts = appointments
    .filter((a) => a.date === date)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  const TIME_SLOTS: string[] = [];
  for (let h = 8; h <= 18; h++) {
    TIME_SLOTS.push(`${h.toString().padStart(2, "0")}:00`);
    if (h < 18) TIME_SLOTS.push(`${h.toString().padStart(2, "0")}:30`);
  }

  const { day, num, month } = fmtDateHeader(date);
  const today = isToday(date);

  return (
    <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
      {/* Day header */}
      <div className={`h-12 border-b border-border flex items-center justify-center gap-2 ${today ? "bg-primary/5" : ""}`}>
        <span className="text-sm text-muted-foreground">{day}, {month}</span>
        <span className={`text-lg font-semibold ${today ? "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm" : "text-foreground"}`}>
          {num}
        </span>
      </div>

      {/* Time grid + appointments */}
      <div className="flex flex-1 overflow-y-auto min-h-0">
        {/* Time column */}
        <div className="shrink-0 border-r border-border" style={{ width: 64 }}>
          {TIME_SLOTS.map((t) => (
            <div
              key={t}
              className="flex items-start justify-end pr-3 text-[10px] text-muted-foreground"
              style={{ height: 56 }}
            >
              <span className="-translate-y-1.5">{t.endsWith(":00") ? fmtTime12(t) : ""}</span>
            </div>
          ))}
        </div>

        {/* Content column */}
        <div className="flex-1 relative">
          {TIME_SLOTS.map((t) => (
            <div
              key={t}
              className={`border-b ${t.endsWith(":30") ? "border-dashed border-border/40" : "border-border/60"}`}
              style={{ height: 56 }}
            />
          ))}
          {/* Appointment cards */}
          <div className="absolute inset-0 p-2 pointer-events-none">
            {dayAppts.map((a) => {
              const startMin = timeToMinutes(a.startTime) - 8 * 60;
              const topPx = (startMin / 30) * 56;
              const heightPx = Math.max((a.duration / 30) * 56 - 6, 44);
              const provider = providerById(a.providerId);
              const statusCfg = STATUS_CONFIG[a.status];
              return (
                <div
                  key={a.id}
                  className="absolute left-2 right-2 pointer-events-auto"
                  style={{ top: topPx + 2, height: heightPx }}
                >
                  <button
                    onClick={() => onApptClick(a)}
                    className="w-full h-full text-left rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                    style={{ borderLeftColor: provider.color, borderLeftWidth: 3 }}
                  >
                    <div className="px-3 py-1.5 bg-card group-hover:bg-muted/30 transition-colors flex items-start justify-between gap-2 h-full">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-xs font-medium text-foreground leading-tight truncate">{a.patientName}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{a.service}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock size={9} strokeWidth={1.6} absoluteStrokeWidth />
                          {fmtTime12(a.startTime)} – {fmtTime12(a.endTime)}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">{provider.name}</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] shrink-0 ${statusCfg.className}`}>
                        {statusCfg.label}
                      </Badge>
                    </div>
                  </button>
                </div>
              );
            })}
            {dayAppts.length === 0 && (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No appointments today
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Schedule list view ─── */
function ScheduleList({
  appointments,
  search,
  onSearch,
  onApptClick,
}: {
  appointments: Appointment[];
  search: string;
  onSearch: (s: string) => void;
  onApptClick: (a: Appointment) => void;
}) {
  const filtered = appointments.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.patientName.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q) ||
      providerById(a.providerId).name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={13} strokeWidth={1.6} absoluteStrokeWidth className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search appointments…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} appointments</span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium w-[160px]">Date & Time</TableHead>
              <TableHead className="text-xs font-medium w-[160px]">Patient</TableHead>
              <TableHead className="text-xs font-medium w-[160px]">Provider</TableHead>
              <TableHead className="text-xs font-medium">Service</TableHead>
              <TableHead className="text-xs font-medium w-[110px]">Status</TableHead>
              <TableHead className="text-xs font-medium w-[100px]">Location</TableHead>
              <TableHead className="text-xs font-medium w-[48px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-sm text-muted-foreground">
                  No appointments match your search.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((a) => {
                const provider = providerById(a.providerId);
                const statusCfg = STATUS_CONFIG[a.status];
                const { day, num, month } = fmtDateHeader(a.date);
                return (
                  <TableRow
                    key={a.id}
                    className="cursor-pointer"
                    onClick={() => onApptClick(a)}
                  >
                    <TableCell className="py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground">{day}, {month} {num}</span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock size={9} strokeWidth={1.6} absoluteStrokeWidth />
                          {fmtTime12(a.startTime)} · {a.duration}m
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-foreground">{a.patientName}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: provider.color }}
                        />
                        <span className="text-xs text-foreground truncate">{provider.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-muted-foreground">{a.service}</TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline" className={`text-xs ${statusCfg.className}`}>
                        {statusCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-xs text-muted-foreground">{a.location}</TableCell>
                    <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                      <ApptRowActions appt={a} onAction={() => {}} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ApptRowActions({ appt, onAction }: { appt: Appointment; onAction: () => void }) {
  const canCancel = appt.status === "confirmed" || appt.status === "requested";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer">
          <MoreHorizontal size={15} strokeWidth={1.6} absoluteStrokeWidth />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Bell size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Send reminder
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Calendar size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Reschedule
        </DropdownMenuItem>
        {canCancel && (
          <DropdownMenuItem className="text-xs text-destructive cursor-pointer focus:text-destructive">
            <X size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
            Cancel
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Appointment detail Sheet ─── */
function ApptDetailSheet({
  open,
  appt,
  onClose,
}: {
  open: boolean;
  appt: Appointment | null;
  onClose: () => void;
}) {
  if (!appt) return null;
  const provider = providerById(appt.providerId);
  const statusCfg = STATUS_CONFIG[appt.status];
  const { day, num, month } = fmtDateHeader(appt.date);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-base">Appointment detail</SheetTitle>
          <SheetDescription className="sr-only">
            Appointment for {appt.patientName}
          </SheetDescription>
        </SheetHeader>

        {/* Status banner */}
        <div
          className="rounded-lg px-4 py-3 mb-6 flex items-center justify-between"
          style={{ background: `${provider.color}14`, borderLeft: `3px solid ${provider.color}` }}
        >
          <div>
            <p className="text-sm font-semibold text-foreground">{appt.service}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{provider.name}</p>
          </div>
          <Badge variant="outline" className={`text-xs ${statusCfg.className}`}>
            {statusCfg.label}
          </Badge>
        </div>

        {/* Patient info */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-medium mb-3">Patient</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2.5">
              <User size={14} strokeWidth={1.6} absoluteStrokeWidth className="text-muted-foreground shrink-0" />
              <span className="text-foreground font-medium">{appt.patientName}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={14} strokeWidth={1.6} absoluteStrokeWidth className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">{appt.patientPhone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={14} strokeWidth={1.6} absoluteStrokeWidth className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">{appt.patientEmail}</span>
            </div>
          </div>
        </div>

        {/* Appointment info */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground font-medium mb-3">Details</p>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { icon: Calendar, label: "Date", value: `${DAY_FULL[parseDate(appt.date).getDay() === 0 ? 6 : parseDate(appt.date).getDay() - 1]}, ${month} ${num}` },
              { icon: Clock, label: "Time", value: `${fmtTime12(appt.startTime)} – ${fmtTime12(appt.endTime)} (${appt.duration} min)` },
              { icon: MapPin, label: "Location", value: appt.location },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon size={14} strokeWidth={1.6} absoluteStrokeWidth className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                  <p className="text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {appt.notes && (
          <div className="mb-6">
            <p className="text-xs text-muted-foreground font-medium mb-2">Notes</p>
            <p className="text-sm text-foreground bg-muted/40 rounded-lg px-3 py-2">{appt.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Bell size={12} strokeWidth={1.6} absoluteStrokeWidth />
            Send reminder
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Calendar size={12} strokeWidth={1.6} absoluteStrokeWidth />
            Reschedule
          </Button>
          {(appt.status === "confirmed" || appt.status === "requested") && (
            <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
              <X size={12} strokeWidth={1.6} absoluteStrokeWidth />
              Cancel
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Main view ─── */
export function AppointmentsView() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [calendarView, setCalendarView] = useState<CalendarView>("week");
  const [currentDateIdx, setCurrentDateIdx] = useState(0); // for day view: index into WEEK_DATES
  const [search, setSearch] = useState("");
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const currentDayDate = WEEK_DATES[currentDateIdx];

  const handleApptClick = (a: Appointment) => {
    setSelectedAppt(a);
    setSheetOpen(true);
  };

  // Week range label
  const startDate = parseDate(WEEK_DATES[0]);
  const endDate = parseDate(WEEK_DATES[6]);
  const weekLabel = `${MONTH_NAMES[startDate.getMonth()]} ${startDate.getDate()} – ${startDate.getMonth() !== endDate.getMonth() ? MONTH_NAMES[endDate.getMonth()] + " " : ""}${endDate.getDate()}, ${endDate.getFullYear()}`;

  // Day label
  const dayLabel = (() => {
    const { day, num, month } = fmtDateHeader(currentDayDate);
    return `${day}, ${month} ${num}`;
  })();

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Appointments</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Schedule, manage, and track patient appointments.
            </p>
          </div>
          <Button size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Plus size={13} strokeWidth={1.6} absoluteStrokeWidth />
            Book an appointment
          </Button>
        </div>

        {/* ── View toolbar ── */}
        <div className="px-6 pb-4 flex items-center gap-3 shrink-0">
          {/* Calendar / Schedule toggle */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${viewMode === "calendar" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Calendar size={12} strokeWidth={1.6} absoluteStrokeWidth />
              Calendar
            </button>
            <button
              onClick={() => setViewMode("schedule")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${viewMode === "schedule" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List size={12} strokeWidth={1.6} absoluteStrokeWidth />
              Schedule
            </button>
          </div>

          {/* Date navigation (calendar mode only) */}
          {viewMode === "calendar" && (
            <>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  disabled={calendarView === "day" && currentDateIdx === 0}
                  onClick={() => {
                    if (calendarView === "day") setCurrentDateIdx((i) => Math.max(0, i - 1));
                  }}
                >
                  <ChevronLeft size={13} strokeWidth={1.6} absoluteStrokeWidth />
                </Button>
                <button className="px-3 py-1 text-xs font-medium text-foreground hover:bg-muted rounded-md cursor-pointer transition-colors">
                  {calendarView === "week" ? weekLabel : dayLabel}
                </button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  disabled={calendarView === "day" && currentDateIdx === WEEK_DATES.length - 1}
                  onClick={() => {
                    if (calendarView === "day") setCurrentDateIdx((i) => Math.min(WEEK_DATES.length - 1, i + 1));
                  }}
                >
                  <ChevronRight size={13} strokeWidth={1.6} absoluteStrokeWidth />
                </Button>
              </div>

              {/* Day / Week toggle */}
              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                {(["day", "week"] as CalendarView[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setCalendarView(v)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer capitalize ${calendarView === v ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Provider legend */}
          {viewMode === "calendar" && (
            <div className="ml-auto flex items-center gap-3">
              {PROVIDERS.map((p) => (
                <Tooltip key={p.id}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 cursor-default">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                      <span className="text-[11px] text-muted-foreground hidden lg:inline">{p.name.split(" ")[1]}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    {p.name} · {p.specialty}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </div>

        {/* ── Main content area ── */}
        <div className="flex-1 min-h-0 mx-6 mb-6 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          {viewMode === "calendar" ? (
            calendarView === "week" ? (
              <WeekCalendar
                dates={WEEK_DATES}
                appointments={APPOINTMENTS}
                onApptClick={handleApptClick}
              />
            ) : (
              <DayCalendar
                date={currentDayDate}
                appointments={APPOINTMENTS}
                onApptClick={handleApptClick}
              />
            )
          ) : (
            <ScheduleList
              appointments={APPOINTMENTS}
              search={search}
              onSearch={setSearch}
              onApptClick={handleApptClick}
            />
          )}
        </div>

        {/* ── Detail sheet ── */}
        <ApptDetailSheet
          open={sheetOpen}
          appt={selectedAppt}
          onClose={() => { setSheetOpen(false); setSelectedAppt(null); }}
        />
      </div>
    </TooltipProvider>
  );
}
