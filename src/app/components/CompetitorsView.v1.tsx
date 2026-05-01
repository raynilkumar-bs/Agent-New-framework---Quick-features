import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Star,
  Building2,
  Globe,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/app/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/app/components/ui/tooltip";

// ─── Types ───────────────────────────────────────────────────────────────────

type Trend = "up" | "down" | "flat";
type ReviewSource = "Google" | "Yelp";

interface Business {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  trend: Trend;
  isMyBusiness?: boolean;
}

interface MonthlyVolume {
  month: string;
  birdeye: number;
  austinSmile: number;
  capitolCity: number;
  sixthStreet: number;
  bowieSt: number;
  domainDental: number;
}

interface RecentReview {
  id: string;
  reviewer: string;
  business: string;
  rating: number;
  source: ReviewSource;
  date: string;
  snippet: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MY_BUSINESS_ID = "birdeye-dental-austin";

const BUSINESSES: Business[] = [
  {
    id: MY_BUSINESS_ID,
    name: "Birdeye Dental Austin",
    rating: 4.8,
    reviewCount: 1247,
    trend: "up",
    isMyBusiness: true,
  },
  {
    id: "austin-smile-center",
    name: "Austin Smile Center",
    rating: 4.6,
    reviewCount: 892,
    trend: "up",
  },
  {
    id: "capitol-city-dental",
    name: "Capitol City Dental",
    rating: 4.3,
    reviewCount: 1104,
    trend: "down",
  },
  {
    id: "sixth-street-dental",
    name: "Sixth Street Dental",
    rating: 4.7,
    reviewCount: 634,
    trend: "up",
  },
  {
    id: "bowie-street-dentistry",
    name: "Bowie Street Dentistry",
    rating: 4.1,
    reviewCount: 481,
    trend: "flat",
  },
  {
    id: "domain-dental-group",
    name: "Domain Dental Group",
    rating: 4.5,
    reviewCount: 723,
    trend: "up",
  },
];

const RATING_CHART_DATA = BUSINESSES.map((b) => ({
  name: b.isMyBusiness ? "My Business" : b.name.split(" ").slice(0, 2).join(" "),
  fullName: b.name,
  rating: b.rating,
  isMyBusiness: !!b.isMyBusiness,
}));

const VOLUME_DATA: MonthlyVolume[] = [
  { month: "Nov", birdeye: 84, austinSmile: 52, capitolCity: 68, sixthStreet: 38, bowieSt: 29, domainDental: 44 },
  { month: "Dec", birdeye: 91, austinSmile: 47, capitolCity: 71, sixthStreet: 35, bowieSt: 33, domainDental: 40 },
  { month: "Jan", birdeye: 78, austinSmile: 60, capitolCity: 58, sixthStreet: 42, bowieSt: 25, domainDental: 51 },
  { month: "Feb", birdeye: 96, austinSmile: 55, capitolCity: 63, sixthStreet: 46, bowieSt: 31, domainDental: 48 },
  { month: "Mar", birdeye: 103, austinSmile: 67, capitolCity: 70, sixthStreet: 50, bowieSt: 38, domainDental: 55 },
  { month: "Apr", birdeye: 98, austinSmile: 72, capitolCity: 65, sixthStreet: 53, bowieSt: 34, domainDental: 62 },
];

const LINE_COLORS: Record<string, string> = {
  birdeye: "var(--chart-1)",
  austinSmile: "var(--chart-2)",
  capitolCity: "var(--chart-3)",
  sixthStreet: "var(--chart-4)",
  bowieSt: "var(--chart-5)",
  domainDental: "#a78bfa",
};

const LINE_LEGEND = [
  { key: "birdeye", label: "Birdeye Dental Austin" },
  { key: "austinSmile", label: "Austin Smile Center" },
  { key: "capitolCity", label: "Capitol City Dental" },
  { key: "sixthStreet", label: "Sixth Street Dental" },
  { key: "bowieSt", label: "Bowie Street Dentistry" },
  { key: "domainDental", label: "Domain Dental Group" },
];

const SENTIMENT = {
  myBusiness: { positive: 84, neutral: 9, negative: 7 },
  topCompetitor: { positive: 79, neutral: 12, negative: 9 },
  topCompetitorName: "Austin Smile Center",
};

const RECENT_REVIEWS: RecentReview[] = [
  {
    id: "r1",
    reviewer: "Sarah M.",
    business: "Birdeye Dental Austin",
    rating: 5,
    source: "Google",
    date: "Apr 11, 2026",
    snippet: "Best dental experience I've ever had. Staff were so welcoming and the cleaning was thorough.",
  },
  {
    id: "r2",
    reviewer: "James T.",
    business: "Austin Smile Center",
    rating: 4,
    source: "Google",
    date: "Apr 10, 2026",
    snippet: "Great service overall. Waited a bit longer than expected but the dentist was fantastic.",
  },
  {
    id: "r3",
    reviewer: "Priya L.",
    business: "Capitol City Dental",
    rating: 3,
    source: "Yelp",
    date: "Apr 9, 2026",
    snippet: "Average experience. The front desk seemed rushed and I had trouble getting a follow-up appointment.",
  },
  {
    id: "r4",
    reviewer: "Connor W.",
    business: "Birdeye Dental Austin",
    rating: 5,
    source: "Google",
    date: "Apr 8, 2026",
    snippet: "Dr. Patel is incredible. Painless procedure and very clear explanations throughout.",
  },
  {
    id: "r5",
    reviewer: "Maria G.",
    business: "Sixth Street Dental",
    rating: 5,
    source: "Yelp",
    date: "Apr 7, 2026",
    snippet: "Loved the modern equipment and friendly hygienists. Will definitely return.",
  },
  {
    id: "r6",
    reviewer: "Derek H.",
    business: "Bowie Street Dentistry",
    rating: 2,
    source: "Google",
    date: "Apr 6, 2026",
    snippet: "Billing was confusing and the office felt a bit outdated. Mixed feelings about coming back.",
  },
  {
    id: "r7",
    reviewer: "Amara N.",
    business: "Domain Dental Group",
    rating: 4,
    source: "Yelp",
    date: "Apr 5, 2026",
    snippet: "Convenient location near the Domain. Clean office, friendly staff, reasonable wait times.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      <Star
        className="size-3.5 fill-amber-400 text-amber-400 shrink-0"
        strokeWidth={1.6}
        absoluteStrokeWidth
      />
      <span className="text-xs text-foreground tabular-nums">{value.toFixed(1)}</span>
    </span>
  );
}

function TrendBadge({ trend }: { trend: Trend }) {
  if (trend === "up") {
    return (
      <TrendingUp
        className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0"
        strokeWidth={1.6}
        absoluteStrokeWidth
      />
    );
  }
  if (trend === "down") {
    return (
      <TrendingDown
        className="size-4 text-destructive shrink-0"
        strokeWidth={1.6}
        absoluteStrokeWidth
      />
    );
  }
  return (
    <Minus
      className="size-4 text-muted-foreground shrink-0"
      strokeWidth={1.6}
      absoluteStrokeWidth
    />
  );
}

function StarIcons({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating);
        return (
          <Star
            key={i}
            className={`size-3 shrink-0 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 fill-transparent"}`}
            strokeWidth={1.6}
            absoluteStrokeWidth
          />
        );
      })}
    </span>
  );
}

interface CompetitorRowProps {
  business: Business;
  isSelected: boolean;
  onClick: () => void;
}

function CompetitorRow({ business, isSelected, onClick }: CompetitorRowProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
        isSelected
          ? "bg-accent text-accent-foreground"
          : "hover:bg-muted/50 text-foreground",
        business.isMyBusiness ? "border border-border" : "",
      ].join(" ")}
    >
      <div
        className={[
          "size-7 rounded-md flex items-center justify-center shrink-0",
          business.isMyBusiness ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        <Building2 className="size-3.5" strokeWidth={1.6} absoluteStrokeWidth />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium truncate leading-tight">{business.name}</p>
          {business.isMyBusiness && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 leading-none shrink-0">
              You
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <StarRating value={business.rating} />
          <span className="text-[11px] text-muted-foreground">
            {business.reviewCount.toLocaleString()} reviews
          </span>
        </div>
      </div>
      <TrendBadge trend={business.trend} />
    </button>
  );
}

// ─── Rating Comparison Chart ──────────────────────────────────────────────────

interface RatingBarTooltipProps {
  active?: boolean;
  payload?: { payload: { fullName: string; rating: number } }[];
}

function RatingBarTooltip({ active, payload }: RatingBarTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md text-sm">
      <p className="text-foreground font-medium">{d.fullName}</p>
      <p className="text-muted-foreground mt-0.5">
        Avg rating: <span className="text-foreground font-semibold tabular-nums">{d.rating.toFixed(1)}</span>
      </p>
    </div>
  );
}

function RatingComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={RATING_CHART_DATA}
        layout="vertical"
        margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
        barCategoryGap="30%"
      >
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="4 4" />
        <XAxis
          type="number"
          domain={[3.5, 5]}
          tickCount={4}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={110}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <RechartsTooltip content={<RatingBarTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
        <Bar dataKey="rating" radius={[0, 4, 4, 0]} maxBarSize={24}>
          {RATING_CHART_DATA.map((entry) => (
            <Cell
              key={entry.fullName}
              fill={entry.isMyBusiness ? "var(--chart-1)" : "var(--chart-2)"}
              fillOpacity={entry.isMyBusiness ? 1 : 0.65}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Review Volume Line Chart ─────────────────────────────────────────────────

function VolumeLineChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={VOLUME_DATA}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--popover-foreground)",
            }}
            itemStyle={{ color: "var(--foreground)" }}
            labelStyle={{ color: "var(--muted-foreground)", marginBottom: 4 }}
          />
          {LINE_LEGEND.map(({ key, label }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={LINE_COLORS[key]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {/* Custom legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 px-1">
        {LINE_LEGEND.map(({ key, label }) => (
          <span key={key} className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: LINE_COLORS[key] }}
            />
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Sentiment Cards ──────────────────────────────────────────────────────────

interface SentimentCardProps {
  label: string;
  myPct: number;
  competitorPct: number;
  competitorName: string;
  color: "positive" | "neutral" | "negative";
}

function SentimentCard({ label, myPct, competitorPct, competitorName, color }: SentimentCardProps) {
  const colorMap = {
    positive: {
      bar: "bg-emerald-500",
      compBar: "bg-emerald-500/30",
      label: "text-emerald-700 dark:text-emerald-400",
      badge: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400",
    },
    neutral: {
      bar: "bg-slate-400",
      compBar: "bg-slate-400/30",
      label: "text-slate-600 dark:text-slate-400",
      badge: "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400",
    },
    negative: {
      bar: "bg-red-500",
      compBar: "bg-red-500/30",
      label: "text-red-600 dark:text-red-400",
      badge: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400",
    },
  };
  const c = colorMap[color];

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
      <span className={`text-xs font-semibold uppercase tracking-wide ${c.label}`}>{label}</span>

      {/* My business */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">My Business</span>
          <span className="text-sm font-semibold tabular-nums text-foreground">{myPct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${myPct}%` }} />
        </div>
      </div>

      {/* Top competitor */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-[11px] text-muted-foreground truncate max-w-[120px] cursor-default">
                  {competitorName}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">{competitorName}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm font-semibold tabular-nums text-foreground">{competitorPct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className={`h-full rounded-full ${c.compBar}`} style={{ width: `${competitorPct}%` }} />
        </div>
      </div>
    </div>
  );
}

// ─── Rating Stars display helper ──────────────────────────────────────────────

function RatingCell({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <StarIcons rating={rating} />
      <span className="text-xs text-muted-foreground tabular-nums ml-0.5">{rating}</span>
    </span>
  );
}

// ─── Source Badge ─────────────────────────────────────────────────────────────

function SourceBadge({ source }: { source: ReviewSource }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
      <Globe className="size-3 shrink-0" strokeWidth={1.6} absoluteStrokeWidth />
      {source}
    </span>
  );
}

// ─── Section Card wrapper ─────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-card border border-border rounded-xl p-5 ${className}`}>
      <h3 className="text-sm font-medium text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CompetitorsView() {
  const [selectedId, setSelectedId] = useState<string>(MY_BUSINESS_ID);

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-background">
      {/* ── Left panel: Competitor list ────────────────────────────── */}
      <aside className="w-[280px] shrink-0 border-r border-border flex flex-col bg-card">
        {/* Header */}
        <div className="px-4 pt-5 pb-3 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Competitors</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">Click to compare details</p>
        </div>

        {/* Business list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {BUSINESSES.map((biz) => (
            <CompetitorRow
              key={biz.id}
              business={biz}
              isSelected={selectedId === biz.id}
              onClick={() => setSelectedId(biz.id)}
            />
          ))}
        </div>

        {/* Add competitor */}
        <div className="px-3 py-3 border-t border-border">
          <Button variant="outline" className="w-full gap-2 text-muted-foreground font-normal text-sm">
            <Plus className="size-4 shrink-0" strokeWidth={1.6} absoluteStrokeWidth />
            Add competitor
          </Button>
        </div>
      </aside>

      {/* ── Right panel: Dashboard ──────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 flex flex-col gap-6 max-w-5xl">

          {/* Page header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-base font-semibold text-foreground">Competitor Monitoring</h1>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Comparing <span className="text-foreground font-medium">Birdeye Dental Austin</span> against {BUSINESSES.length - 1} competitors
              </p>
            </div>
            <Badge variant="outline" className="text-xs text-muted-foreground gap-1.5 mt-0.5">
              <span className="size-1.5 rounded-full bg-emerald-500 shrink-0 inline-block" />
              Live data
            </Badge>
          </div>

          {/* 1. Rating comparison */}
          <SectionCard title="Rating comparison">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full shrink-0 inline-block" style={{ backgroundColor: "var(--chart-1)" }} />
                <span className="text-[11px] text-muted-foreground">My Business</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full shrink-0 inline-block" style={{ backgroundColor: "var(--chart-2)", opacity: 0.65 }} />
                <span className="text-[11px] text-muted-foreground">Competitors</span>
              </span>
            </div>
            <RatingComparisonChart />
          </SectionCard>

          {/* 2. Review volume trend */}
          <SectionCard title="Review volume (last 6 months)">
            <VolumeLineChart />
          </SectionCard>

          {/* 3. Sentiment breakdown */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Sentiment breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              <SentimentCard
                label="Positive"
                myPct={SENTIMENT.myBusiness.positive}
                competitorPct={SENTIMENT.topCompetitor.positive}
                competitorName={SENTIMENT.topCompetitorName}
                color="positive"
              />
              <SentimentCard
                label="Neutral"
                myPct={SENTIMENT.myBusiness.neutral}
                competitorPct={SENTIMENT.topCompetitor.neutral}
                competitorName={SENTIMENT.topCompetitorName}
                color="neutral"
              />
              <SentimentCard
                label="Negative"
                myPct={SENTIMENT.myBusiness.negative}
                competitorPct={SENTIMENT.topCompetitor.negative}
                competitorName={SENTIMENT.topCompetitorName}
                color="negative"
              />
            </div>
          </div>

          {/* 4. Recent competitor reviews */}
          <SectionCard title="Recent competitor reviews">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs text-muted-foreground font-medium">Reviewer</TableHead>
                  <TableHead className="text-xs text-muted-foreground font-medium">Business</TableHead>
                  <TableHead className="text-xs text-muted-foreground font-medium">Rating</TableHead>
                  <TableHead className="text-xs text-muted-foreground font-medium">Source</TableHead>
                  <TableHead className="text-xs text-muted-foreground font-medium">Date</TableHead>
                  <TableHead className="text-xs text-muted-foreground font-medium">Snippet</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_REVIEWS.map((review) => (
                  <TableRow key={review.id} className="group">
                    <TableCell className="text-sm font-medium text-foreground whitespace-nowrap">
                      {review.reviewer}
                    </TableCell>
                    <TableCell>
                      <span
                        className={[
                          "text-[12px] font-medium whitespace-nowrap",
                          review.business === "Birdeye Dental Austin"
                            ? "text-primary"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {review.business}
                      </span>
                    </TableCell>
                    <TableCell>
                      <RatingCell rating={review.rating} />
                    </TableCell>
                    <TableCell>
                      <SourceBadge source={review.source} />
                    </TableCell>
                    <TableCell className="text-[12px] text-muted-foreground whitespace-nowrap">
                      {review.date}
                    </TableCell>
                    <TableCell className="max-w-[320px]">
                      <p className="text-[12px] text-muted-foreground truncate" title={review.snippet}>
                        {review.snippet}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>

        </div>
      </main>
    </div>
  );
}
