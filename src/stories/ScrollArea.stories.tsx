import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";

const meta: Meta = {
  title: "UI/ScrollArea",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const reviews = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  author: `Customer ${i + 1}`,
  rating: Math.floor(Math.random() * 2) + 4,
  text: [
    "Amazing service, will definitely return!",
    "Very professional and helpful staff.",
    "Quick turnaround, great quality.",
    "Highly recommend to anyone in the area.",
    "Outstanding experience from start to finish.",
  ][i % 5],
}));

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-80 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium text-foreground">
          All Reviews (50)
        </h4>
        {reviews.map((review, i) => (
          <div key={review.id}>
            <div className="py-2">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-medium text-foreground">
                  {review.author}
                </span>
                <span className="text-xs text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{review.text}</p>
            </div>
            {i < reviews.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

const platforms = [
  "Google",
  "Yelp",
  "Facebook",
  "TripAdvisor",
  "Booking.com",
  "Trustpilot",
  "Angi",
  "HomeAdvisor",
  "Houzz",
  "G2",
  "Capterra",
  "Glassdoor",
];

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max gap-4 p-4">
        {platforms.map((platform) => (
          <div
            key={platform}
            className="flex flex-col items-center gap-1 rounded-md border border-border bg-card px-6 py-4 shrink-0"
          >
            <span className="text-sm font-medium text-foreground">
              {platform}
            </span>
            <span className="text-xs text-yellow-500">★★★★★</span>
            <span className="text-xs text-muted-foreground">
              {Math.floor(Math.random() * 400 + 50)} reviews
            </span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

const tags = [
  "Excellent Service",
  "Fast Response",
  "Professional",
  "Friendly Staff",
  "Clean Location",
  "Good Value",
  "Highly Recommend",
  "5 Stars",
  "Best in Town",
  "Outstanding",
  "Top Notch",
  "Would Return",
  "Great Experience",
  "Trustworthy",
];

export const TagList: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Common Review Themes
      </p>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex shrink-0 items-center rounded-full border border-border bg-muted px-2 py-1 text-xs font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
};
