import type { Meta, StoryObj } from "@storybook/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Chart",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

// ── Area Chart ──────────────────────────────────────────────────────────────

const areaData = [
  { month: "Jan", reviews: 42, responses: 38 },
  { month: "Feb", reviews: 58, responses: 51 },
  { month: "Mar", reviews: 47, responses: 44 },
  { month: "Apr", reviews: 73, responses: 68 },
  { month: "May", reviews: 89, responses: 82 },
  { month: "Jun", reviews: 95, responses: 91 },
];

const areaConfig: ChartConfig = {
  reviews: {
    label: "Reviews Received",
    color: "var(--chart-1)",
  },
  responses: {
    label: "Responses Sent",
    color: "var(--chart-2)",
  },
};

export const AreaChartStory: Story = {
  name: "Area Chart",
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="text-sm font-medium text-foreground mb-4">
        Monthly Review Activity
      </h3>
      <ChartContainer config={areaConfig} className="h-64 w-full">
        <AreaChart data={areaData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="reviews"
            stroke="var(--color-reviews)"
            fill="var(--color-reviews)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="responses"
            stroke="var(--color-responses)"
            fill="var(--color-responses)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
};

// ── Bar Chart ───────────────────────────────────────────────────────────────

const barData = [
  { day: "Mon", positive: 12, negative: 2 },
  { day: "Tue", positive: 18, negative: 1 },
  { day: "Wed", positive: 9, negative: 4 },
  { day: "Thu", positive: 22, negative: 3 },
  { day: "Fri", positive: 27, negative: 2 },
  { day: "Sat", positive: 15, negative: 1 },
  { day: "Sun", positive: 8, negative: 0 },
];

const barConfig: ChartConfig = {
  positive: {
    label: "Positive Reviews",
    color: "var(--chart-1)",
  },
  negative: {
    label: "Negative Reviews",
    color: "var(--chart-5)",
  },
};

export const BarChartStory: Story = {
  name: "Bar Chart",
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="text-sm font-medium text-foreground mb-4">
        Weekly Review Breakdown
      </h3>
      <ChartContainer config={barConfig} className="h-64 w-full">
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="positive" fill="var(--color-positive)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="negative" fill="var(--color-negative)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

// ── Line Chart ──────────────────────────────────────────────────────────────

const lineData = [
  { week: "W1", rating: 3.8 },
  { week: "W2", rating: 4.0 },
  { week: "W3", rating: 3.9 },
  { week: "W4", rating: 4.2 },
  { week: "W5", rating: 4.5 },
  { week: "W6", rating: 4.3 },
  { week: "W7", rating: 4.6 },
  { week: "W8", rating: 4.8 },
];

const lineConfig: ChartConfig = {
  rating: {
    label: "Avg. Star Rating",
    color: "var(--chart-3)",
  },
};

export const LineChartStory: Story = {
  name: "Line Chart",
  render: () => (
    <div className="w-full max-w-2xl">
      <h3 className="text-sm font-medium text-foreground mb-4">
        Star Rating Trend (8-week)
      </h3>
      <ChartContainer config={lineConfig} className="h-64 w-full">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis domain={[3, 5]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="var(--color-rating)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--color-rating)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  ),
};
