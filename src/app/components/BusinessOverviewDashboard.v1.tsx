import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Share2, ChevronDown, Maximize2, Info, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";

// ─── Chart series (neutral at rest; brand blue reserved for hover/focus on links) ───
/** Uses CSS variable so the stroke adapts to light/dark mode automatically. */
const CHART_STROKE = "var(--color-muted-foreground)";
const CHART_FILL_BASE = "var(--color-muted-foreground)";
/** Stacked social — categorical, avoid extra brand-blue blocks */
const SOCIAL_BAR_FACEBOOK = "#64748b";
const SOCIAL_BAR_LINKEDIN = "#0d9488";

// ─── Sub-components ───

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-lg p-5 ${className}`}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  title: React.ReactNode;
  right?: React.ReactNode;
}
function SectionHeader({ title, right }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm text-foreground" style={{ fontWeight: 400 }}>{title}</div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

function StatItem({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-2xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontWeight: 400 }}>{label}</div>
    </div>
  );
}

function StatGrid({ children, cols = 4 }: { children: React.ReactNode; cols?: number }) {
  const colClass = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-4";
  return <div className={`grid ${colClass} gap-5`}>{children}</div>;
}

function TimeChip({ label = "All time" }: { label?: string }) {
  return (
    <Button variant="outline" className="gap-1 text-muted-foreground font-normal">
      {label}
      <ChevronDown className="w-3 h-3" />
    </Button>
  );
}

// ─── Gradient score bar ───
function GradientBar({ score, min = 0, max = 100 }: { score: number; min?: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
  return (
    <div className="relative h-2 rounded-full overflow-visible" style={{ background: "linear-gradient(to right, #ef4444, #f59e0b, #22c55e)" }}>
      <div
        className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-border shadow dark:bg-card"
        style={{ left: `${pct}%`, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

// ─── Star rating display ───
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block w-4 h-4">
            <Star className="w-4 h-4 text-muted fill-muted absolute" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : `${(rating - Math.floor(rating)) * 100}%` }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─── Star distribution bar ───
function StarDistributionBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground w-4 text-right" style={{ fontWeight: 400 }}>{star}</span>
      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#f59e0b" }} />
      </div>
      <span className="text-muted-foreground w-5 text-right" style={{ fontWeight: 400 }}>{count}</span>
    </div>
  );
}

// ─── Platform chip ───
function PlatformChip({ name, rating, count, color }: { name: string; rating: string; count: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] border border-border bg-background">
      <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
      <span className="text-xs text-foreground" style={{ fontWeight: 400 }}>{name}</span>
      <span className="text-xs text-foreground" style={{ fontWeight: 400 }}>{rating}</span>
      <span className="text-xs text-muted-foreground" style={{ fontWeight: 300 }}>{count}</span>
    </div>
  );
}

// ─── Inbox chart data ───
const inboxChartData = Array.from({ length: 30 }, (_, i) => ({
  date: `Apr ${i + 1}`,
  value: i === 28 ? 12 : Math.max(0.3, 0.5 + Math.sin(i * 0.8) * 0.7 + Math.random() * 0.5),
}));

// ─── Social chart data ───
const socialChartData = [
  { month: "Jan '24", facebook: 3, instagram: 5, linkedin: 2 },
  { month: "Feb '24", facebook: 5, instagram: 8, linkedin: 3 },
  { month: "Mar '24", facebook: 4, instagram: 6, linkedin: 2 },
  { month: "Apr '24", facebook: 7, instagram: 10, linkedin: 4 },
  { month: "May '24", facebook: 6, instagram: 9, linkedin: 3 },
  { month: "Jun '24", facebook: 8, instagram: 11, linkedin: 5 },
  { month: "Jul '24", facebook: 5, instagram: 7, linkedin: 2 },
  { month: "Aug '24", facebook: 9, instagram: 13, linkedin: 6 },
  { month: "Sep '24", facebook: 7, instagram: 10, linkedin: 4 },
  { month: "Oct '24", facebook: 11, instagram: 14, linkedin: 7 },
  { month: "Nov '24", facebook: 8, instagram: 12, linkedin: 5 },
  { month: "Dec '24", facebook: 10, instagram: 15, linkedin: 6 },
  { month: "Jan '25", facebook: 6, instagram: 9, linkedin: 3 },
  { month: "Feb '25", facebook: 9, instagram: 12, linkedin: 5 },
  { month: "Mar '25", facebook: 7, instagram: 11, linkedin: 4 },
];

// ─── Insights table rows ───
const insightRows = [
  { location: "Copy Town", birdeye: 39.2, sentiment: 90.9, reputation: 66.9, listing: 96.6 },
  { location: "Johnston, Dr. Jared B", birdeye: 39.8, sentiment: 94.2, reputation: 81.9, listing: 96.6 },
  { location: "AmeriMattress", birdeye: 39.9, sentiment: 90.7, reputation: 92.2, listing: 56.6 },
  { location: "Dianix IRS", birdeye: 70.6, sentiment: 7.60, reputation: 91.7, listing: 86.5 },
  { location: "FUNC", birdeye: 41.4, sentiment: 1.90, reputation: 70.9, listing: 96.4 },
];

// ─── Main Component ───
export default function BusinessOverviewDashboard() {
  return (
    <div className="h-full min-h-0 overflow-hidden rounded-tl-lg bg-white dark:bg-[#1e2229]">
      <div className="h-full min-h-0 overflow-y-auto">
      <div className="px-6 py-8 flex flex-col gap-5">

        {/* 1. Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-foreground" style={{ fontWeight: 300 }}>Welcome, Balaji</h1>
            <p className="text-sm text-muted-foreground mt-1" style={{ fontWeight: 400 }}>
              Here are the things which need your attention.
            </p>
          </div>
          <Button variant="outline" size="icon">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        {/* 2. Attention Cards Row */}
        <div className="border border-border rounded-lg overflow-hidden grid grid-cols-2 divide-x divide-border">
          {/* Inbox */}
          <div className="p-5 bg-card">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3" style={{ fontWeight: 400 }}>Inbox</div>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>499</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5" style={{ fontWeight: 400 }}>Unread Messages</div>
              </div>
              <div>
                <div className="text-3xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>538</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5" style={{ fontWeight: 400 }}>Open Leads</div>
              </div>
            </div>
          </div>
          {/* Ticketing */}
          <div className="p-5 bg-card">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3" style={{ fontWeight: 400 }}>Ticketing</div>
            <div>
              <div className="text-3xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>1</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5" style={{ fontWeight: 400 }}>Assigned To Me</div>
            </div>
          </div>
        </div>

        {/* 3. Performance Section Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground" style={{ fontWeight: 400 }}>
            Here is the recent performance of your business for{" "}
            <a
              href="#"
              className="text-foreground underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
              style={{ fontWeight: 400 }}
            >
              48 locations
            </a>
          </p>
          <div className="flex items-center gap-2">
            <TimeChip />
            <Button variant="outline" size="icon">
              <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* 4. Reviews Card */}
        <SectionCard>
          <SectionHeader title="Reviews" right={<TimeChip />} />
          <div className="flex gap-8">
            {/* Left: rating + bars */}
            <div className="flex flex-col gap-3 min-w-[180px]">
              <div className="flex items-end gap-2">
                <span className="text-3xl text-foreground" style={{ fontWeight: 300 }}>4.40</span>
                <StarRating rating={4.4} />
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { star: 5, count: 28 },
                  { star: 4, count: 8 },
                  { star: 3, count: 3 },
                  { star: 2, count: 2 },
                  { star: 1, count: 2 },
                ].map(({ star, count }) => (
                  <StarDistributionBar key={star} star={star} count={count} total={43} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground" style={{ fontWeight: 400 }}>43 total reviews</p>
              {/* Platform chips */}
              <div className="flex flex-wrap gap-2 mt-2">
                <PlatformChip name="Google" rating="4.36" count="845K" color="#4285F4" />
                <PlatformChip name="Bing" rating="4.76" count="16.8k" color="#00B4F0" />
                <PlatformChip name="Google Play" rating="" count="" color="#34A853" />
                <PlatformChip name="Shopping" rating="" count="167.8K" color="#FBBC04" />
              </div>
            </div>
            {/* Right: stats 2x2 */}
            <div className="flex-1 grid grid-cols-2 gap-5">
              <StatItem value="372.1K" label="Review Impressions" />
              <StatItem value="1.3M" label="Review Impressions" />
              <StatItem value="187.3K" label="Stars on Google" />
              <StatItem value="1.1M" label="Survey Topics" />
            </div>
          </div>
          {/* Info banner */}
          <div className="mt-4 flex items-center justify-between bg-muted/50 border border-border rounded-lg px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs text-foreground" style={{ fontWeight: 400 }}>
                Maximize reviews by updating 7293 review sites
              </span>
            </div>
            <a
              href="#"
              className="text-xs text-foreground hover:text-primary hover:underline underline-offset-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
              style={{ fontWeight: 400 }}
            >
              See all
            </a>
          </div>
        </SectionCard>

        {/* 5. Payments Card */}
        <SectionCard>
          <SectionHeader title="Payments" />
          <p className="text-sm text-muted-foreground" style={{ fontWeight: 400 }}>
            Get paid today.{" "}
            <a
              href="#"
              className="text-foreground hover:text-primary hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
              style={{ fontWeight: 400 }}
            >
              Set up Payments
            </a>{" "}
            to get started.
          </p>
        </SectionCard>

        {/* 6. Listings Card */}
        <SectionCard>
          <SectionHeader title="Listings" right={<TimeChip />} />
          <p className="text-xs text-muted-foreground mb-4" style={{ fontWeight: 400 }}>
            See how your business is listing on Google Search
          </p>
          {/* Google Ad */}
          <div className="mb-5">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3" style={{ fontWeight: 400 }}>
              Google Ad
            </div>
            <StatGrid cols={4}>
              <StatItem value="21.5K" label="Weekly Impressions" />
              <StatItem value="5" label="Property Topics" />
              <StatItem value="6.6K" label="Click to Close" />
              <StatItem value="143" label="Call to Close" />
            </StatGrid>
          </div>
          {/* Google 360 */}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3" style={{ fontWeight: 400 }}>
              Google 360
            </div>
            <StatGrid cols={4}>
              <StatItem value="0" label="Listings in Progress" />
              <StatItem value="0" label="Recently Enrolled" />
              <StatItem value="5" label="Instant Updates" />
              <StatItem value="0" label="With Deal" />
            </StatGrid>
          </div>
        </SectionCard>

        {/* 7. Referrals Card */}
        <SectionCard>
          <SectionHeader title="Referrals" right={<TimeChip />} />
          <StatGrid cols={3}>
            <StatItem value="122.9K" label="Requests Sent" />
            <StatItem value="507" label="Sources" />
            <StatItem value="452" label="Leads" />
          </StatGrid>
        </SectionCard>

        {/* 8. Appointments Card */}
        <SectionCard>
          <SectionHeader title="Appointments" right={<TimeChip label="Last 7 days" />} />
          <StatGrid cols={4}>
            <StatItem value="0" label="Total Appointments" />
            <StatItem value="0%" label="Confirmation Rate via SMS" />
            <StatItem value="0%" label="Confirmation Rate via Device" />
            <StatItem value="0%" label="No Show Rate" />
          </StatGrid>
        </SectionCard>

        {/* 9. Inbox Performance Card */}
        <SectionCard>
          <SectionHeader
            title="Inbox Performance"
            right={<TimeChip />}
          />
          <div className="grid grid-cols-3 gap-5 mb-5">
            <StatItem value="<1 Min" label="Unique Response Time" />
            <StatItem value="97.9K" label="Active Conversations" />
            <StatItem value="15.2K" label="Message Responses" />
          </div>
          <div className="text-xs text-muted-foreground mb-2" style={{ fontWeight: 400 }}>Median response time</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={inboxChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="inboxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_FILL_BASE} stopOpacity={0.12} />
                  <stop offset="100%" stopColor={CHART_FILL_BASE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-card)" }}
                labelStyle={{ fontWeight: 400, color: "var(--color-foreground)" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={CHART_STROKE}
                strokeWidth={1.5}
                fill="url(#inboxGrad)"
                dot={false}
                name="Median response time"
              />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* 10. Social Card */}
        <SectionCard>
          <SectionHeader
            title="Social"
            right={<TimeChip />}
          />
          <div className="mb-4">
            <StatItem value="63" label="New Followers" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={socialChartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={12}>
              <CartesianGrid horizontal vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                interval={1}
                angle={-35}
                textAnchor="end"
                height={40}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                tickLine={false}
                axisLine={false}
                width={24}
              />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-card)" }}
                labelStyle={{ fontWeight: 400, color: "var(--color-foreground)" }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8, color: "var(--color-muted-foreground)" }}
                formatter={(value) => <span style={{ fontWeight: 400, color: "var(--color-muted-foreground)" }}>{value}</span>}
              />
              <Bar dataKey="facebook" name="Facebook" stackId="a" fill={SOCIAL_BAR_FACEBOOK} radius={[0, 0, 0, 0]} />
              <Bar dataKey="instagram" name="Instagram" stackId="a" fill="#E1306C" radius={[0, 0, 0, 0]} />
              <Bar dataKey="linkedin" name="LinkedIn" stackId="a" fill={SOCIAL_BAR_LINKEDIN} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* 11. Insights AI Card */}
        <SectionCard>
          <SectionHeader title="Insights" />

          {/* Score row */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* BirdEye Score */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontWeight: 400 }}>BirdEye Score</span>
                <Info className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="text-3xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>59.7</div>
            </div>
            {/* Understanding */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground" style={{ fontWeight: 400 }}>Understanding the BirdEye Score</span>
              <div className="text-2xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>79.2</div>
              <GradientBar score={79.2} />
            </div>
            {/* Sentiment Score */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontWeight: 400 }}>Sentiment Score</span>
              <div className="text-2xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>58</div>
              <GradientBar score={58} />
            </div>
            {/* 4th score */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontWeight: 400 }}>Reputation Score</span>
              <div className="text-2xl text-foreground tabular-nums" style={{ fontWeight: 300 }}>34.7</div>
              <GradientBar score={34.7} />
            </div>
          </div>

          {/* Top performing locations table */}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-3" style={{ fontWeight: 400 }}>
              Top performing locations
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Location", "BirdEye Score", "Sentiment Score", "Reputation Score", "Listing Score"].map((h) => (
                      <th
                        key={h}
                        className="text-left py-2 pr-4 text-xs text-muted-foreground uppercase tracking-wide"
                        style={{ fontWeight: 400 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {insightRows.map((row) => (
                    <tr key={row.location} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-4 text-sm text-foreground" style={{ fontWeight: 400 }}>{row.location}</td>
                      <td className="py-2.5 pr-4 text-sm text-foreground tabular-nums" style={{ fontWeight: 300 }}>{row.birdeye}</td>
                      <td className="py-2.5 pr-4 text-sm text-foreground tabular-nums" style={{ fontWeight: 300 }}>{row.sentiment}</td>
                      <td className="py-2.5 pr-4 text-sm text-foreground tabular-nums" style={{ fontWeight: 300 }}>{row.reputation}</td>
                      <td className="py-2.5 pr-4 text-sm text-foreground tabular-nums" style={{ fontWeight: 300 }}>{row.listing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

      </div>
      </div>
    </div>
  );
}
