import { useState } from "react";
import {
  Plus, Search, MoreHorizontal, Download, Copy, Trash2, BarChart2,
  ChevronDown, Users, Send, TrendingUp, Star, Eye,
  CheckCircle2, Clock, XCircle, Edit3,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
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
import { Progress } from "@/app/components/ui/progress";

/* ─── Types ─── */
type SurveyType = "nps" | "standard" | "custom";
type SurveyStatus = "active" | "draft" | "closed";

interface Survey {
  id: string;
  name: string;
  type: SurveyType;
  status: SurveyStatus;
  sent: number;
  responses: number;
  npsScore: number | null; // null for non-NPS
  completionRate: number;
  lastUpdated: string;
  owner: string;
  questions: Question[];
  recentResponses: SurveyResponse[];
}

interface Question {
  id: string;
  text: string;
  type: "nps" | "rating" | "multiple_choice" | "text";
  options?: { label: string; count: number; pct: number }[];
}

interface SurveyResponse {
  id: string;
  respondentName: string;
  score: number | null;
  comment: string;
  respondedOn: string;
}

/* ─── Mock data ─── */
const SURVEYS: Survey[] = [
  {
    id: "s1",
    name: "Post-Visit Patient Satisfaction",
    type: "nps",
    status: "active",
    sent: 1_840,
    responses: 742,
    npsScore: 68,
    completionRate: 91,
    lastUpdated: "Apr 13, 2026",
    owner: "Sarah Chen",
    questions: [
      {
        id: "q1", text: "How likely are you to recommend us to a friend?", type: "nps",
        options: [
          { label: "Promoters (9–10)", count: 478, pct: 64 },
          { label: "Passives (7–8)",   count: 178, pct: 24 },
          { label: "Detractors (0–6)", count:  86, pct: 12 },
        ],
      },
      {
        id: "q2", text: "How was the cleanliness of our facility?", type: "rating",
        options: [
          { label: "5 – Excellent", count: 320, pct: 43 },
          { label: "4 – Good",      count: 260, pct: 35 },
          { label: "3 – Average",   count: 115, pct: 16 },
          { label: "1–2 – Poor",    count:  47, pct:  6 },
        ],
      },
      {
        id: "q3", text: "How would you rate your wait time?", type: "rating",
        options: [
          { label: "Very short",    count: 195, pct: 26 },
          { label: "Acceptable",    count: 370, pct: 50 },
          { label: "Too long",      count: 177, pct: 24 },
        ],
      },
    ],
    recentResponses: [
      { id: "r1", respondentName: "Lisa Monroe",     score: 10, comment: "Absolutely love this clinic. The staff is so kind and professional.", respondedOn: "Apr 13" },
      { id: "r2", respondentName: "Tom Harrington",  score: 8,  comment: "Great experience overall, just a bit long of a wait.", respondedOn: "Apr 12" },
      { id: "r3", respondentName: "Aisha Rahman",    score: 3,  comment: "Scheduling was difficult and I felt rushed during my appointment.", respondedOn: "Apr 11" },
      { id: "r4", respondentName: "Carlos Vega",     score: 9,  comment: "Dr. Chen was phenomenal. Would highly recommend.", respondedOn: "Apr 10" },
    ],
  },
  {
    id: "s2",
    name: "Service Quality Check-in",
    type: "standard",
    status: "active",
    sent: 960,
    responses: 388,
    npsScore: null,
    completionRate: 84,
    lastUpdated: "Apr 10, 2026",
    owner: "Marcus Webb",
    questions: [
      {
        id: "q1", text: "How satisfied were you with our service?", type: "multiple_choice",
        options: [
          { label: "Very satisfied",  count: 180, pct: 46 },
          { label: "Satisfied",       count: 140, pct: 36 },
          { label: "Neutral",         count:  48, pct: 12 },
          { label: "Dissatisfied",    count:  20, pct:  6 },
        ],
      },
      {
        id: "q2", text: "Which area needs the most improvement?", type: "multiple_choice",
        options: [
          { label: "Communication",   count: 145, pct: 37 },
          { label: "Wait times",      count: 118, pct: 30 },
          { label: "Staff attitude",  count:  66, pct: 17 },
          { label: "Facility",        count:  59, pct: 15 },
        ],
      },
    ],
    recentResponses: [
      { id: "r1", respondentName: "Fiona Blake",   score: null, comment: "Communication could be improved but the team was friendly.", respondedOn: "Apr 10" },
      { id: "r2", respondentName: "David Park",    score: null, comment: "Everything was smooth and on time. Great job!", respondedOn: "Apr 9"  },
      { id: "r3", respondentName: "Maria Santos",  score: null, comment: "Had to call 3 times to get an appointment confirmed.", respondedOn: "Apr 8"  },
    ],
  },
  {
    id: "s3",
    name: "Annual Brand Perception Survey",
    type: "custom",
    status: "active",
    sent: 3_200,
    responses: 1_104,
    npsScore: null,
    completionRate: 78,
    lastUpdated: "Apr 5, 2026",
    owner: "Priya Nair",
    questions: [
      {
        id: "q1", text: "How would you describe our brand in one word?", type: "text",
        options: [],
      },
      {
        id: "q2", text: "How often do you interact with our services?", type: "multiple_choice",
        options: [
          { label: "Weekly",          count: 340, pct: 31 },
          { label: "Monthly",         count: 420, pct: 38 },
          { label: "Quarterly",       count: 220, pct: 20 },
          { label: "Rarely",          count: 124, pct: 11 },
        ],
      },
    ],
    recentResponses: [
      { id: "r1", respondentName: "Nina Petrov",   score: null, comment: "Innovative. Always pushing the boundary.", respondedOn: "Apr 5" },
      { id: "r2", respondentName: "Oliver Grant",  score: null, comment: "Trustworthy and reliable.", respondedOn: "Apr 4" },
    ],
  },
  {
    id: "s4",
    name: "Employee Engagement Q1",
    type: "nps",
    status: "closed",
    sent: 210,
    responses: 198,
    npsScore: 52,
    completionRate: 95,
    lastUpdated: "Mar 31, 2026",
    owner: "James Osei",
    questions: [
      {
        id: "q1", text: "Would you recommend working here to a friend?", type: "nps",
        options: [
          { label: "Promoters (9–10)", count: 102, pct: 52 },
          { label: "Passives (7–8)",   count:  65, pct: 33 },
          { label: "Detractors (0–6)", count:  31, pct: 16 },
        ],
      },
    ],
    recentResponses: [
      { id: "r1", respondentName: "Elena Watts",  score: 10, comment: "Great culture and leadership support.", respondedOn: "Mar 30" },
      { id: "r2", respondentName: "Ben Nakamura", score: 6,  comment: "Work-life balance could be better.", respondedOn: "Mar 29" },
    ],
  },
  {
    id: "s5",
    name: "New Patient Onboarding Experience",
    type: "standard",
    status: "draft",
    sent: 0,
    responses: 0,
    npsScore: null,
    completionRate: 0,
    lastUpdated: "Apr 12, 2026",
    owner: "Sarah Chen",
    questions: [],
    recentResponses: [],
  },
  {
    id: "s6",
    name: "Follow-Up Care Quality",
    type: "nps",
    status: "active",
    sent: 520,
    responses: 214,
    npsScore: 74,
    completionRate: 88,
    lastUpdated: "Apr 8, 2026",
    owner: "Marcus Webb",
    questions: [
      {
        id: "q1", text: "How likely are you to return for follow-up care?", type: "nps",
        options: [
          { label: "Promoters (9–10)", count: 142, pct: 66 },
          { label: "Passives (7–8)",   count:  58, pct: 27 },
          { label: "Detractors (0–6)", count:  14, pct:  7 },
        ],
      },
    ],
    recentResponses: [
      { id: "r1", respondentName: "Clara Hughes",  score: 10, comment: "Will definitely be back. You have my complete trust.", respondedOn: "Apr 8" },
      { id: "r2", respondentName: "Devon King",    score: 7,  comment: "Good care but the reminders were excessive.", respondedOn: "Apr 7" },
    ],
  },
];

/* ─── Config ─── */
const TYPE_CONFIG: Record<SurveyType, { label: string; className: string }> = {
  nps:      { label: "NPS",      className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400" },
  standard: { label: "Standard", className: "bg-blue-50   text-blue-700   border-blue-200   dark:bg-blue-950/40   dark:text-blue-400"   },
  custom:   { label: "Custom",   className: "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-950/40  dark:text-amber-400"  },
};

const STATUS_CONFIG: Record<SurveyStatus, { label: string; className: string; icon: React.ElementType }> = {
  active: { label: "Active", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400", icon: CheckCircle2 },
  draft:  { label: "Draft",  className: "bg-slate-50  text-slate-600  border-slate-200  dark:bg-slate-800/40  dark:text-slate-400",  icon: Clock },
  closed: { label: "Closed", className: "bg-red-50    text-red-600    border-red-200    dark:bg-red-950/40    dark:text-red-400",    icon: XCircle },
};

const NPS_COLOR_CLASS = (score: number) =>
  score >= 50 ? "text-emerald-600 dark:text-emerald-400" :
  score >= 0  ? "text-amber-600 dark:text-amber-400" :
                "text-red-600 dark:text-red-400";

/* ─── NPS gauge bar ─── */
function NPSBreakdownBar({ promoters, passives, detractors }: { promoters: number; passives: number; detractors: number }) {
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Promoters",  pct: promoters,  color: "bg-emerald-500", textColor: "text-emerald-700 dark:text-emerald-400" },
        { label: "Passives",   pct: passives,   color: "bg-slate-400",   textColor: "text-slate-600 dark:text-slate-400" },
        { label: "Detractors", pct: detractors, color: "bg-red-400",     textColor: "text-red-600 dark:text-red-400" },
      ].map(({ label, pct, color, textColor }) => (
        <div key={label} className="flex items-center gap-3">
          <span className={`text-xs font-medium w-20 shrink-0 ${textColor}`}>{label}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Question bar chart ─── */
function QuestionBars({ question }: { question: Question }) {
  const BAR_COLORS = ["bg-primary", "bg-chart-2", "bg-chart-3", "bg-chart-4"];
  if (question.type === "text") {
    return (
      <div className="bg-muted/30 rounded-lg px-4 py-3 text-xs text-muted-foreground italic">
        Open-ended responses — text analysis available in full reports.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {(question.options ?? []).map((opt, i) => (
        <div key={opt.label} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-36 shrink-0 truncate">{opt.label}</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all`} style={{ width: `${opt.pct}%` }} />
          </div>
          <span className="text-xs text-muted-foreground w-16 text-right">{opt.count.toLocaleString()} ({opt.pct}%)</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Survey Reports Sheet ─── */
function SurveyReportsSheet({
  survey,
  open,
  onClose,
}: {
  survey: Survey | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!survey) return null;
  const typeCfg   = TYPE_CONFIG[survey.type];
  const statusCfg = STATUS_CONFIG[survey.status];

  const npsPromoters  = survey.questions.find((q) => q.type === "nps")?.options?.[0]?.pct ?? 0;
  const npsPassives   = survey.questions.find((q) => q.type === "nps")?.options?.[1]?.pct ?? 0;
  const npsDetractors = survey.questions.find((q) => q.type === "nps")?.options?.[2]?.pct ?? 0;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-xl overflow-y-auto flex flex-col gap-0">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-base leading-snug pr-8">{survey.name}</SheetTitle>
          <SheetDescription className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={`text-xs ${typeCfg.className}`}>{typeCfg.label}</Badge>
            <Badge variant="outline" className={`text-xs ${statusCfg.className}`}>{survey.status}</Badge>
          </SheetDescription>
        </SheetHeader>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: Send,     label: "Sent",            value: survey.sent.toLocaleString() },
            { icon: Users,    label: "Responses",        value: survey.responses.toLocaleString() },
            { icon: TrendingUp, label: "Completion",    value: `${survey.completionRate}%` },
            ...(survey.npsScore !== null
              ? [{ icon: Star, label: "NPS Score", value: `${survey.npsScore > 0 ? "+" : ""}${survey.npsScore}` }]
              : []),
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-muted/30 rounded-xl px-4 py-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon size={12} strokeWidth={1.6} absoluteStrokeWidth />
                <span className="text-xs">{label}</span>
              </div>
              <span className={`text-xl font-semibold ${label === "NPS Score" && survey.npsScore !== null ? NPS_COLOR_CLASS(survey.npsScore) : "text-foreground"}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* NPS breakdown */}
        {survey.type === "nps" && survey.npsScore !== null && (
          <div className="mb-6">
            <p className="text-xs font-medium text-muted-foreground mb-3">NPS breakdown</p>
            <div className="bg-muted/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-3xl font-bold ${NPS_COLOR_CLASS(survey.npsScore)}`}>
                  {survey.npsScore > 0 ? "+" : ""}{survey.npsScore}
                </span>
                <div>
                  <p className="text-xs font-medium text-foreground">Net Promoter Score</p>
                  <p className="text-xs text-muted-foreground">{survey.responses} respondents</p>
                </div>
              </div>
              <NPSBreakdownBar
                promoters={npsPromoters}
                passives={npsPassives}
                detractors={npsDetractors}
              />
            </div>
          </div>
        )}

        {/* Questions */}
        {survey.questions.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-medium text-muted-foreground mb-3">Question breakdown</p>
            <div className="flex flex-col gap-5">
              {survey.questions.filter((q) => q.type !== "nps").map((q, idx) => (
                <div key={q.id}>
                  <p className="text-xs text-foreground font-medium mb-2">
                    <span className="text-muted-foreground mr-1">Q{idx + 1}.</span>
                    {q.text}
                  </p>
                  <QuestionBars question={q} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent responses */}
        {survey.recentResponses.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">Recent responses</p>
            <div className="flex flex-col gap-3">
              {survey.recentResponses.map((r) => (
                <div key={r.id} className="bg-muted/20 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-foreground">{r.respondentName}</span>
                    <div className="flex items-center gap-2">
                      {r.score !== null && (
                        <span className={`text-xs font-semibold ${r.score >= 9 ? "text-emerald-600 dark:text-emerald-400" : r.score >= 7 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                          {r.score}/10
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground">{r.respondedOn}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {survey.responses === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BarChart2 size={28} strokeWidth={1.4} absoluteStrokeWidth className="text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">No responses yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              {survey.status === "draft" ? "Publish the survey to start collecting responses." : "Responses will appear here once collected."}
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-border shrink-0">
          <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Download size={12} strokeWidth={1.6} absoluteStrokeWidth />
            Export responses
          </Button>
          <Button variant="outline" size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Send size={12} strokeWidth={1.6} absoluteStrokeWidth />
            Send survey
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Row actions ─── */
function SurveyRowActions({ onViewReports }: { onViewReports: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer">
          <MoreHorizontal size={15} strokeWidth={1.6} absoluteStrokeWidth />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem className="text-xs cursor-pointer" onClick={onViewReports}>
          <BarChart2 size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          View reports
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Eye size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Preview
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Edit3 size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Edit survey
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Send size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Distribute
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Copy size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Clone survey
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs cursor-pointer">
          <Copy size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Copy link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-destructive cursor-pointer focus:text-destructive">
          <Trash2 size={13} strokeWidth={1.6} absoluteStrokeWidth className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Main view ─── */
export function SurveysView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SurveyStatus | "all">("all");
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = SURVEYS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.owner.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openReports = (survey: Survey) => {
    setSelectedSurvey(survey);
    setSheetOpen(true);
  };

  const STATUS_OPTS: { label: string; value: SurveyStatus | "all" }[] = [
    { label: "All status", value: "all" },
    { label: "Active",     value: "active" },
    { label: "Draft",      value: "draft" },
    { label: "Closed",     value: "closed" },
  ];

  const activeSurveys = SURVEYS.filter((s) => s.status === "active").length;
  const totalResponses = SURVEYS.reduce((sum, s) => sum + s.responses, 0);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full overflow-hidden">
        {/* ── Header ── */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Surveys</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeSurveys} active · {totalResponses.toLocaleString()} total responses
            </p>
          </div>
          <Button size="sm" className="cursor-pointer gap-1.5 text-xs">
            <Plus size={13} strokeWidth={1.6} absoluteStrokeWidth />
            Create survey
          </Button>
        </div>

        {/* ── Table card ── */}
        <div className="flex-1 min-h-0 mx-6 mb-6 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={13} strokeWidth={1.6} absoluteStrokeWidth className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search surveys…"
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

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{filtered.length} survey{filtered.length !== 1 ? "s" : ""}</span>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 cursor-pointer">
                <Download size={12} strokeWidth={1.6} absoluteStrokeWidth />
                Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-medium">Survey name</TableHead>
                  <TableHead className="text-xs font-medium w-[90px]">Type</TableHead>
                  <TableHead className="text-xs font-medium w-[90px]">Status</TableHead>
                  <TableHead className="text-xs font-medium w-[80px] text-right">Sent</TableHead>
                  <TableHead className="text-xs font-medium w-[100px] text-right">Responses</TableHead>
                  <TableHead className="text-xs font-medium w-[110px] text-right">Completion</TableHead>
                  <TableHead className="text-xs font-medium w-[90px] text-right">
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">NPS score</TooltipTrigger>
                      <TooltipContent className="text-xs">Net Promoter Score (NPS surveys only)</TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-xs font-medium w-[120px]">Last updated</TableHead>
                  <TableHead className="text-xs font-medium w-[120px]">Owner</TableHead>
                  <TableHead className="text-xs font-medium w-[48px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-12 text-sm text-muted-foreground">
                      No surveys match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((survey) => {
                    const typeCfg   = TYPE_CONFIG[survey.type];
                    const statusCfg = STATUS_CONFIG[survey.status];
                    return (
                      <TableRow
                        key={survey.id}
                        className="cursor-pointer"
                        onClick={() => openReports(survey)}
                      >
                        <TableCell className="py-3">
                          <p className="text-sm font-medium text-foreground">{survey.name}</p>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge variant="outline" className={`text-xs ${typeCfg.className}`}>
                            {typeCfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge variant="outline" className={`text-xs gap-1 ${statusCfg.className}`}>
                            <statusCfg.icon size={10} strokeWidth={1.6} absoluteStrokeWidth />
                            {statusCfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground text-right tabular-nums">
                          {survey.sent ? survey.sent.toLocaleString() : "—"}
                        </TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground text-right tabular-nums">
                          {survey.responses ? survey.responses.toLocaleString() : "—"}
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          {survey.completionRate > 0 ? (
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${survey.completionRate}%` }} />
                              </div>
                              <span className="text-xs text-muted-foreground tabular-nums">{survey.completionRate}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="py-3 text-right">
                          {survey.npsScore !== null ? (
                            <span className={`text-sm font-semibold ${NPS_COLOR_CLASS(survey.npsScore)}`}>
                              {survey.npsScore > 0 ? "+" : ""}{survey.npsScore}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {survey.lastUpdated}
                        </TableCell>
                        <TableCell className="py-3 text-xs text-muted-foreground">
                          {survey.owner}
                        </TableCell>
                        <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                          <SurveyRowActions onViewReports={() => openReports(survey)} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border flex items-center justify-between shrink-0">
            <p className="text-xs text-muted-foreground">
              Showing {filtered.length} of {SURVEYS.length} surveys
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer" disabled>Next</Button>
            </div>
          </div>
        </div>

        {/* ── Reports Sheet ── */}
        <SurveyReportsSheet
          survey={selectedSurvey}
          open={sheetOpen}
          onClose={() => { setSheetOpen(false); setSelectedSurvey(null); }}
        />
      </div>
    </TooltipProvider>
  );
}
