import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export interface ReportPageProps {
  themeColor: string;
  selectedFont: string;
  fontScale: number;
  pagePadding: number;
  textAlign: "left" | "center" | "right";
  showHeader: boolean;
  showFooter: boolean;
  showPageNumbers: boolean;
  headerText: string;
  pageNumber: number;
  pageW: number;
  pageH: number;
  titleColor: string;
  bodyColor: string;
  borderColor: string;
  cardBg: string;
  bg: string;
}

const fontFamilies: Record<string, string> = {
  "Roboto": "'Roboto', sans-serif",
  "Inter": "'Inter', sans-serif",
  "Georgia": "Georgia, serif",
  "Playfair Display": "'Playfair Display', serif",
  "Montserrat": "'Montserrat', sans-serif",
  "Source Sans 3": "'Source Sans 3', sans-serif",
};

function fs(base: number, fontScale: number) {
  return Math.round(base * 0.5 * fontScale / 100);
}

function isLandscapeLayout(props: ReportPageProps) {
  return props.pageW > props.pageH;
}

function PageFooter({ props }: { props: ReportPageProps }) {
  if (!props.showFooter) return null;
  return (
    <div className="flex justify-between items-center px-3 py-1.5" style={{ borderTop: `1px solid ${props.borderColor}` }}>
      <span className="text-[5px]" style={{ color: props.bodyColor, opacity: 0.6 }}>{props.headerText}</span>
      {props.showPageNumbers && <span className="text-[5px]" style={{ color: props.bodyColor, opacity: 0.6 }}>Page {props.pageNumber}</span>}
    </div>
  );
}

function PageTitle({ title, props }: { title: string; props: ReportPageProps }) {
  return (
    <h3 style={{
      fontSize: fs(18, props.fontScale),
      fontFamily: fontFamilies[props.selectedFont],
      fontWeight: 400,
      color: props.titleColor,
      textAlign: props.textAlign,
      marginBottom: 4,
    }}>{title}</h3>
  );
}

function PageSubtitle({ text, props }: { text: string; props: ReportPageProps }) {
  return (
    <p style={{
      fontSize: fs(10, props.fontScale),
      fontFamily: fontFamilies[props.selectedFont],
      color: props.bodyColor,
      textAlign: props.textAlign,
      marginBottom: 6,
    }}>{text}</p>
  );
}

// ─── Page 3: Social Profile Overview ────────────────────────────────────────
const profileData = [
  { name: "Google", reviews: 245, rating: 4.5 },
  { name: "Facebook", reviews: 189, rating: 4.2 },
  { name: "Yelp", reviews: 132, rating: 3.9 },
  { name: "Tripadvisor", reviews: 98, rating: 4.1 },
  { name: "BBB", reviews: 45, rating: 4.7 },
];

export function Page3_ProfileOverview(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const landscape = isLandscapeLayout(props);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Social profile overview" props={props} />
      <PageSubtitle text="Review distribution across platforms" props={props} />
      <div className={`flex-1 min-h-0 ${landscape ? "flex gap-2" : ""}`}>
        <div style={landscape ? { width: "55%" } : undefined}>
          <ResponsiveContainer width="100%" height={landscape ? "100%" : "55%"}>
            <BarChart data={profileData} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke={props.borderColor} />
              <XAxis key="xaxis" dataKey="name" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <YAxis key="yaxis" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <Tooltip key="tooltip" contentStyle={{ fontSize: fs(9, props.fontScale), fontFamily: ff }} />
              <Bar key="bar-reviews" dataKey="reviews" fill={props.themeColor} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={landscape ? "flex-1" : "mt-2"}>
          <p style={{ fontSize: fs(10, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor, marginBottom: 3 }}>Platform ratings</p>
          <div className="space-y-1">
            {profileData.map(p => (
              <div key={p.name} className="flex items-center justify-between" style={{ fontSize: fs(9, props.fontScale), fontFamily: ff, color: props.bodyColor }}>
                <span>{p.name}</span>
                <div className="flex items-center gap-1">
                  <div className="w-12 h-1 rounded-full" style={{ backgroundColor: props.borderColor }}>
                    <div className="h-full rounded-full" style={{ width: `${(p.rating / 5) * 100}%`, backgroundColor: props.themeColor }} />
                  </div>
                  <span style={{ fontWeight: 400, color: props.titleColor }}>{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 4: Impressions & Reach ────────────────────────────────────────────
const impressionsData = [
  { month: "Jan", impressions: 820, reach: 650 },
  { month: "Feb", impressions: 930, reach: 710 },
  { month: "Mar", impressions: 1100, reach: 890 },
  { month: "Apr", impressions: 980, reach: 760 },
  { month: "May", impressions: 1250, reach: 1020 },
  { month: "Jun", impressions: 1400, reach: 1150 },
];

export function Page4_ImpressionsReach(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const lightColor = props.themeColor + "60";
  const landscape = isLandscapeLayout(props);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Impressions & reach" props={props} />
      <PageSubtitle text="6-month trend analysis" props={props} />
      <div className={`flex-1 min-h-0 ${landscape ? "flex gap-2" : ""}`}>
        <div style={landscape ? { width: "60%" } : undefined}>
          <ResponsiveContainer width="100%" height={landscape ? "100%" : "60%"}>
            <LineChart data={impressionsData} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke={props.borderColor} />
              <XAxis key="xaxis" dataKey="month" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <YAxis key="yaxis" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <Tooltip key="tooltip" contentStyle={{ fontSize: fs(9, props.fontScale), fontFamily: ff }} />
              <Legend key="legend" wrapperStyle={{ fontSize: fs(8, props.fontScale), fontFamily: ff }} />
              <Line key="line-impressions" type="monotone" dataKey="impressions" stroke={props.themeColor} strokeWidth={1.5} dot={{ r: 2 }} />
              <Line key="line-reach" type="monotone" dataKey="reach" stroke={lightColor} strokeWidth={1.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={`${landscape ? "flex-1 flex flex-col gap-1" : "grid grid-cols-3 gap-1 mt-2"}`}>
          {[
            { label: "Total impressions", value: "6,480", change: "+12.3%" },
            { label: "Avg. reach", value: "863", change: "+8.7%" },
            { label: "Reach rate", value: "76.2%", change: "+3.1%" },
          ].map(m => (
            <div key={m.label} className="rounded p-1.5" style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
              <p style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor, opacity: 0.7 }}>{m.label}</p>
              <p style={{ fontSize: fs(14, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor }}>{m.value}</p>
              <span style={{ fontSize: fs(8, props.fontScale), color: "#4caf50" }}>{m.change}</span>
            </div>
          ))}
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 5: Engagement Metrics ─────────────────────────────────────────────
const engagementData = [
  { week: "W1", likes: 42, comments: 18, shares: 8 },
  { week: "W2", likes: 55, comments: 22, shares: 12 },
  { week: "W3", likes: 38, comments: 15, shares: 6 },
  { week: "W4", likes: 68, comments: 30, shares: 15 },
  { week: "W5", likes: 72, comments: 28, shares: 18 },
  { week: "W6", likes: 85, comments: 35, shares: 22 },
];

export function Page5_EngagementMetrics(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const color2 = props.themeColor + "80";
  const color3 = props.themeColor + "40";
  const landscape = isLandscapeLayout(props);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Engagement metrics" props={props} />
      <PageSubtitle text="Weekly engagement breakdown" props={props} />
      <div className={`flex-1 min-h-0 ${landscape ? "flex gap-2" : ""}`}>
        <div style={landscape ? { width: "60%" } : undefined}>
          <ResponsiveContainer width="100%" height={landscape ? "100%" : "65%"}>
            <AreaChart data={engagementData} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke={props.borderColor} />
              <XAxis key="xaxis" dataKey="week" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <YAxis key="yaxis" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <Tooltip key="tooltip" contentStyle={{ fontSize: fs(9, props.fontScale), fontFamily: ff }} />
              <Legend key="legend" wrapperStyle={{ fontSize: fs(8, props.fontScale), fontFamily: ff }} />
              <Area key="area-likes" type="monotone" dataKey="likes" stackId="1" stroke={props.themeColor} fill={props.themeColor} fillOpacity={0.6} />
              <Area key="area-comments" type="monotone" dataKey="comments" stackId="1" stroke={color2} fill={color2} fillOpacity={0.6} />
              <Area key="area-shares" type="monotone" dataKey="shares" stackId="1" stroke={color3} fill={color3} fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={landscape ? "flex-1" : "mt-2"}>
          <div className="rounded p-1.5" style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
            <p style={{ fontSize: fs(9, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor, marginBottom: 2 }}>Key takeaways</p>
            {["Likes increased 102% over 6 weeks", "Comments grew steadily with 94% increase", "Share rate doubled from W1 to W6"].map((t, i) => (
              <div key={i} className="flex items-start gap-1 mb-0.5">
                <span className="w-1 h-1 rounded-full mt-[3px] shrink-0" style={{ backgroundColor: props.themeColor }} />
                <span style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 6: Post Performance Table ─────────────────────────────────────────
const postData = [
  { date: "Jul 1", type: "Image", impressions: 342, engagement: 45, rate: "13.2%" },
  { date: "Jul 3", type: "Video", impressions: 521, engagement: 89, rate: "17.1%" },
  { date: "Jul 5", type: "Carousel", impressions: 278, engagement: 38, rate: "13.7%" },
  { date: "Jul 7", type: "Story", impressions: 189, engagement: 22, rate: "11.6%" },
  { date: "Jul 9", type: "Reel", impressions: 634, engagement: 112, rate: "17.7%" },
  { date: "Jul 11", type: "Image", impressions: 298, engagement: 41, rate: "13.8%" },
  { date: "Jul 13", type: "Video", impressions: 456, engagement: 78, rate: "17.1%" },
];

export function Page6_PostPerformance(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const sz = fs(8, props.fontScale);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Post performance" props={props} />
      <PageSubtitle text="Individual post metrics for the reporting period" props={props} />
      <div className="flex-1 min-h-0">
        <table className="w-full" style={{ fontSize: sz, fontFamily: ff }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${props.borderColor}` }}>
              {["Date", "Type", "Impressions", "Engagements", "Rate"].map(h => (
                <th key={h} className="py-1 px-1 text-left" style={{ color: props.titleColor, fontWeight: 400, fontSize: sz }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {postData.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${props.borderColor}30` }}>
                <td className="py-1 px-1" style={{ color: props.bodyColor }}>{row.date}</td>
                <td className="py-1 px-1">
                  <span className="px-1 py-0.5 rounded" style={{ backgroundColor: props.themeColor + "18", color: props.themeColor, fontSize: fs(7, props.fontScale) }}>{row.type}</span>
                </td>
                <td className="py-1 px-1" style={{ color: props.bodyColor }}>{row.impressions.toLocaleString()}</td>
                <td className="py-1 px-1" style={{ color: props.bodyColor }}>{row.engagement}</td>
                <td className="py-1 px-1" style={{ color: props.themeColor, fontWeight: 400 }}>{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 grid grid-cols-2 gap-1">
          <div className="rounded p-1.5" style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
            <p style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor, opacity: 0.7 }}>Best performing</p>
            <p style={{ fontSize: fs(11, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor }}>Reels</p>
            <span style={{ fontSize: fs(8, props.fontScale), color: "#4caf50" }}>17.7% avg rate</span>
          </div>
          <div className="rounded p-1.5" style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
            <p style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor, opacity: 0.7 }}>Total posts</p>
            <p style={{ fontSize: fs(11, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor }}>7</p>
            <span style={{ fontSize: fs(8, props.fontScale), color: "#4caf50" }}>+40% vs prior</span>
          </div>
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 7: Audience Growth ────────────────────────────────────────────────
const audienceData = [
  { month: "Jan", followers: 1200, new: 85 },
  { month: "Feb", followers: 1285, new: 92 },
  { month: "Mar", followers: 1377, new: 110 },
  { month: "Apr", followers: 1487, new: 98 },
  { month: "May", followers: 1585, new: 125 },
  { month: "Jun", followers: 1710, new: 148 },
];

export function Page7_AudienceGrowth(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const landscape = isLandscapeLayout(props);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Audience growth" props={props} />
      <PageSubtitle text="Follower growth and acquisition trends" props={props} />
      <div className={`flex-1 min-h-0 ${landscape ? "flex gap-2" : ""}`}>
        <div style={landscape ? { width: "60%" } : undefined}>
          <ResponsiveContainer width="100%" height={landscape ? "100%" : "55%"}>
            <BarChart data={audienceData} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
              <CartesianGrid key="grid" strokeDasharray="3 3" stroke={props.borderColor} />
              <XAxis key="xaxis" dataKey="month" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <YAxis key="yaxis" tick={{ fontSize: fs(9, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <Tooltip key="tooltip" contentStyle={{ fontSize: fs(9, props.fontScale), fontFamily: ff }} />
              <Legend key="legend" wrapperStyle={{ fontSize: fs(8, props.fontScale), fontFamily: ff }} />
              <Bar key="bar-followers" dataKey="followers" fill={props.themeColor} radius={[2, 2, 0, 0]} />
              <Bar key="bar-new" dataKey="new" fill={props.themeColor + "60"} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={`${landscape ? "flex-1 flex flex-col gap-1" : "grid grid-cols-3 gap-1 mt-2"}`}>
          {[
            { label: "Total followers", value: "1,710" },
            { label: "Growth rate", value: "+42.5%" },
            { label: "Avg new/month", value: "110" },
          ].map(m => (
            <div key={m.label} className="rounded p-1.5 text-center" style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
              <p style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor, opacity: 0.7 }}>{m.label}</p>
              <p style={{ fontSize: fs(13, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor }}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 8: Platform Comparison ────────────────────────────────────────────
const radarData = [
  { metric: "Reach", Google: 90, Facebook: 75, Yelp: 60 },
  { metric: "Engagement", Google: 85, Facebook: 80, Yelp: 55 },
  { metric: "Reviews", Google: 95, Facebook: 70, Yelp: 65 },
  { metric: "Rating", Google: 88, Facebook: 82, Yelp: 72 },
  { metric: "Growth", Google: 78, Facebook: 68, Yelp: 50 },
];

export function Page8_PlatformComparison(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const landscape = isLandscapeLayout(props);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Platform comparison" props={props} />
      <PageSubtitle text="Cross-platform performance analysis" props={props} />
      <div className={`flex-1 min-h-0 ${landscape ? "flex gap-2" : ""}`}>
        <div style={landscape ? { width: "55%" } : undefined}>
          <ResponsiveContainer width="100%" height={landscape ? "100%" : "65%"}>
            <RadarChart data={radarData} margin={{ top: 4, right: 8, bottom: 0, left: 8 }}>
              <PolarGrid key="polargrid" stroke={props.borderColor} />
              <PolarAngleAxis key="angleaxis" dataKey="metric" tick={{ fontSize: fs(8, props.fontScale), fill: props.bodyColor, fontFamily: ff }} />
              <PolarRadiusAxis key="radiusaxis" tick={false} axisLine={false} />
              <Radar key="radar-google" name="Google" dataKey="Google" stroke={props.themeColor} fill={props.themeColor} fillOpacity={0.3} />
              <Radar key="radar-facebook" name="Facebook" dataKey="Facebook" stroke={props.themeColor + "80"} fill={props.themeColor + "80"} fillOpacity={0.2} />
              <Radar key="radar-yelp" name="Yelp" dataKey="Yelp" stroke={props.themeColor + "50"} fill={props.themeColor + "50"} fillOpacity={0.1} />
              <Legend key="legend" wrapperStyle={{ fontSize: fs(8, props.fontScale), fontFamily: ff }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className={landscape ? "flex-1" : ""}>
          <p style={{ fontSize: fs(9, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor, marginBottom: 2, marginTop: landscape ? 0 : 2 }}>Summary</p>
          <p style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor, lineHeight: 1.5 }}>
            Google leads across all metrics with an average score of 87.2. Facebook follows closely at 75.0, while Yelp trails with an average of 60.4. Focus efforts on Yelp to improve overall presence.
          </p>
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 9: Content Analysis Table ─────────────────────────────────────────
const contentData = [
  { category: "Product photos", posts: 12, avgReach: 456, avgEng: "14.2%", sentiment: "Positive" },
  { category: "Customer reviews", posts: 8, avgReach: 389, avgEng: "18.5%", sentiment: "Very positive" },
  { category: "Promotions", posts: 6, avgReach: 612, avgEng: "11.3%", sentiment: "Neutral" },
  { category: "Behind the scenes", posts: 4, avgReach: 298, avgEng: "22.1%", sentiment: "Positive" },
  { category: "Tips & guides", posts: 5, avgReach: 534, avgEng: "16.8%", sentiment: "Positive" },
  { category: "Events", posts: 3, avgReach: 421, avgEng: "19.4%", sentiment: "Very positive" },
];

export function Page9_ContentAnalysis(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const sz = fs(8, props.fontScale);
  const sentimentColor = (s: string) => s === "Very positive" ? "#2e7d32" : s === "Positive" ? "#4caf50" : "#ff9800";
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Content analysis" props={props} />
      <PageSubtitle text="Performance by content category" props={props} />
      <div className="flex-1 min-h-0">
        <table className="w-full" style={{ fontSize: sz, fontFamily: ff }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${props.borderColor}` }}>
              {["Category", "Posts", "Avg reach", "Avg eng.", "Sentiment"].map(h => (
                <th key={h} className="py-1 px-0.5 text-left" style={{ color: props.titleColor, fontWeight: 400, fontSize: sz }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contentData.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${props.borderColor}30` }}>
                <td className="py-1 px-0.5" style={{ color: props.bodyColor, fontSize: fs(7, props.fontScale) }}>{row.category}</td>
                <td className="py-1 px-0.5" style={{ color: props.bodyColor }}>{row.posts}</td>
                <td className="py-1 px-0.5" style={{ color: props.bodyColor }}>{row.avgReach}</td>
                <td className="py-1 px-0.5" style={{ color: props.themeColor, fontWeight: 400 }}>{row.avgEng}</td>
                <td className="py-1 px-0.5">
                  <span style={{ color: sentimentColor(row.sentiment), fontSize: fs(7, props.fontScale) }}>{row.sentiment}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 rounded p-1.5" style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
          <p style={{ fontSize: fs(9, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor, marginBottom: 2 }}>Recommendations</p>
          {["Increase 'Behind the scenes' posts — highest engagement at 22.1%", "Leverage event content for strong positive sentiment", "Optimize promotions with stronger CTAs"].map((t, i) => (
            <div key={i} className="flex items-start gap-1 mb-0.5">
              <span className="w-1 h-1 rounded-full mt-[3px] shrink-0" style={{ backgroundColor: props.themeColor }} />
              <span style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// ─── Page 10: Review Summary ────────────────────────────────────────────────
const reviewPieData = [
  { name: "5 Stars", value: 142 },
  { name: "4 Stars", value: 89 },
  { name: "3 Stars", value: 34 },
  { name: "2 Stars", value: 12 },
  { name: "1 Star", value: 5 },
];

export function Page10_ReviewSummary(props: ReportPageProps) {
  const ff = fontFamilies[props.selectedFont];
  const colors = [props.themeColor, props.themeColor + "cc", props.themeColor + "88", props.themeColor + "55", props.themeColor + "30"];
  const landscape = isLandscapeLayout(props);
  return (
    <div className="w-full h-full flex flex-col" style={{ padding: props.pagePadding, backgroundColor: props.bg }}>
      <PageTitle title="Review summary" props={props} />
      <PageSubtitle text="Overall rating distribution and analysis" props={props} />
      <div className={`flex-1 min-h-0 ${landscape ? "flex gap-3" : "flex flex-col"}`}>
        {/* Left: Pie + score + bars */}
        <div className={landscape ? "w-[45%] flex flex-col" : ""}>
          <div className="flex items-start gap-2">
            <div style={{ width: landscape ? "50%" : "45%" }}>
              <ResponsiveContainer width="100%" height={landscape ? 70 : 80}>
                <PieChart>
                  <Pie data={reviewPieData} cx="50%" cy="50%" outerRadius={landscape ? 28 : 35} innerRadius={landscape ? 14 : 18} dataKey="value" paddingAngle={2}>
                    {reviewPieData.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1">
              <div className="text-center mb-1">
                <span style={{ fontSize: fs(22, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor }}>4.3</span>
                <span style={{ fontSize: fs(10, props.fontScale), fontFamily: ff, color: props.bodyColor }}> / 5.0</span>
              </div>
              <p style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor, textAlign: "center" }}>Based on 282 reviews</p>
            </div>
          </div>
          <div className="mt-2 space-y-0.5">
            {reviewPieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1" style={{ fontSize: fs(8, props.fontScale), fontFamily: ff, color: props.bodyColor }}>
                <span className="w-8 shrink-0">{d.name}</span>
                <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: props.borderColor }}>
                  <div className="h-full rounded-full" style={{ width: `${(d.value / 142) * 100}%`, backgroundColor: colors[i] }} />
                </div>
                <span className="w-5 text-right" style={{ fontWeight: 400, color: props.titleColor }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right/Bottom: Reviews */}
        <div className={`${landscape ? "flex-1" : "mt-3"} rounded p-1.5`} style={{ backgroundColor: props.cardBg, border: `1px solid ${props.borderColor}` }}>
          <p style={{ fontSize: fs(9, props.fontScale), fontFamily: ff, fontWeight: 400, color: props.titleColor, marginBottom: 2 }}>Recent reviews highlight</p>
          {[
            { text: "\"Excellent service and friendly staff!\"", stars: "\u2605\u2605\u2605\u2605\u2605", date: "Jul 8" },
            { text: "\"Great experience, would recommend.\"", stars: "\u2605\u2605\u2605\u2605\u2606", date: "Jul 6" },
            { text: "\"Good value for the price.\"", stars: "\u2605\u2605\u2605\u2605\u2606", date: "Jul 4" },
          ].map((r, i) => (
            <div key={i} className="mb-1" style={{ fontSize: fs(7, props.fontScale), fontFamily: ff }}>
              <div className="flex items-center gap-1">
                <span style={{ color: props.themeColor }}>{r.stars}</span>
                <span style={{ color: props.bodyColor, opacity: 0.6 }}>{r.date}</span>
              </div>
              <p style={{ color: props.bodyColor, fontStyle: "italic" }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
      <PageFooter props={props} />
    </div>
  );
}

// Export array of all page components for easy iteration
export const reportPages = [
  { Component: Page3_ProfileOverview, title: "Profile overview" },
  { Component: Page4_ImpressionsReach, title: "Impressions & reach" },
  { Component: Page5_EngagementMetrics, title: "Engagement metrics" },
  { Component: Page6_PostPerformance, title: "Post performance" },
  { Component: Page7_AudienceGrowth, title: "Audience growth" },
  { Component: Page8_PlatformComparison, title: "Platform comparison" },
  { Component: Page9_ContentAnalysis, title: "Content analysis" },
  { Component: Page10_ReviewSummary, title: "Review summary" },
];