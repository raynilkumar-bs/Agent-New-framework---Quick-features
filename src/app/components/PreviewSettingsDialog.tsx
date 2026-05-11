import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  ChevronLeft,
  X,
  MapPin,
  Star,
  ChevronDown,
} from "lucide-react";

type SampleReview = {
  id: string;
  reviewer: string;
  date: string;
  source: "Google";
  location: string;
  rating: number;
  body: string;
};

const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: "review-1",
    reviewer: "Daniel Peirre",
    date: "Mar 12, 2025",
    source: "Google",
    location: "Miami",
    rating: 2,
    body: '"Ordered a pizza from Viola Brickell on South Avenue, Miami, but was disappointed. The delivery took over an hour, and the pizza arrived cold and soggy, nothing like the photos. Ms. Lisa from the restaurant tried to help, but the overall experience was not worth it!"',
  },
  {
    id: "review-2",
    reviewer: "Joshua Shareen",
    date: "Mar 12, 2025",
    source: "Google",
    location: "Miami",
    rating: 1,
    body: "Ordered a pizza from Viola Brickell on South Avenue, Miami, and was really disappointed. The pizza was burnt and tasted bitter, definitely not like the photos online. Ms. Lisa from the restaurant was polite, but this ruined our dinner plans. Hope they improve their quality.",
  },
  {
    id: "review-3",
    reviewer: "Vinoth",
    date: "Mar 12, 2025",
    source: "Google",
    location: "Miami",
    rating: 1,
    body: "I ordered a pizza from Viola Brickell on South Avenue in Miami, and it was quite disappointing. The pizza was overcooked and had a bitter taste, far from what the pictures suggested. While Ms. Lisa from the restaurant was courteous, this really put a damper on our dinner plans. I hope they can enhance their quality.",
  },
  {
    id: "review-4",
    reviewer: "Maria Gonzalez",
    date: "Mar 10, 2025",
    source: "Google",
    location: "Miami",
    rating: 5,
    body: "Absolutely loved the new menu. The pasta was rich, the bread was warm, and the service was attentive without being overbearing. Will be back next weekend.",
  },
  {
    id: "review-5",
    reviewer: "Aaron Liu",
    date: "Mar 09, 2025",
    source: "Google",
    location: "Miami",
    rating: 3,
    body: "Food was fine, nothing remarkable. The wait was a bit long for a Tuesday evening and the table next to us was loud. The dessert was the highlight.",
  },
  {
    id: "review-6",
    reviewer: "Priya Raman",
    date: "Mar 07, 2025",
    source: "Google",
    location: "Miami",
    rating: 4,
    body: "Great vibe and friendly staff. The pizza had a thin, crispy crust which I really enjoyed. Took a star off because the soda was flat — happy to give it another try.",
  },
  {
    id: "review-7",
    reviewer: "Carlos Mendez",
    date: "Mar 05, 2025",
    source: "Google",
    location: "Miami",
    rating: 2,
    body: "Pizza arrived 45 minutes late and was lukewarm. The driver was apologetic, which I appreciated, but the experience as a whole felt rushed and not what I expected.",
  },
];

interface PreviewSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAll: () => void;
  onRunWithReview: (reviewId: string) => void;
}

export function PreviewSettingsDialog({
  open,
  onOpenChange,
  onCloseAll,
  onRunWithReview,
}: PreviewSettingsDialogProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    SAMPLE_REVIEWS[0].id,
  );
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [hasLast30Filter, setHasLast30Filter] = useState(true);

  const handleRun = () => {
    if (!selectedId) return;
    onRunWithReview(selectedId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 flex w-[min(1120px,calc(100vw-3rem))] h-[min(720px,calc(100vh-3rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-[#eaeaea] px-6 py-5">
            <button
              type="button"
              aria-label="Back"
              onClick={() => onOpenChange(false)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-[#212121] transition-colors hover:bg-[#f4f6f7]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1 flex-col gap-0.5">
              <DialogPrimitive.Title className="text-[18px] font-medium leading-[26px] tracking-[-0.36px] text-[#212121]">
                Preview settings
              </DialogPrimitive.Title>
              <p className="text-xs leading-[18px] tracking-[-0.24px] text-[#555]">
                Choose a review to test your agent. Use filters to narrow your
                results
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onCloseAll}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121]"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex flex-1 min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
              <div className="flex flex-col gap-4">
                {SAMPLE_REVIEWS.map((review) => (
                  <ReviewRow
                    key={review.id}
                    review={review}
                    selected={selectedId === review.id}
                    onSelect={() => setSelectedId(review.id)}
                  />
                ))}
              </div>
            </div>
            <aside className="w-60 shrink-0 border-l border-[#eaeaea]">
              <FilterRail
                hasLast30={hasLast30Filter}
                onClearLast30={() => setHasLast30Filter(false)}
                onClearAll={() => setHasLast30Filter(false)}
              />
            </aside>
          </div>

          <footer className="flex shrink-0 items-center justify-between border-t border-[#eaeaea] px-6 py-5">
            <label className="flex cursor-pointer select-none items-center gap-2">
              <Checkbox
                checked={setAsDefault}
                onCheckedChange={(c) => setSetAsDefault(c === true)}
              />
              <span className="text-sm text-[#212121]">
                Set as default test review
              </span>
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-9 px-3 text-[#1976d2] hover:bg-[#ecf2fb]"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={!selectedId}
                onClick={handleRun}
                className="h-9 px-3"
              >
                Run task
              </Button>
            </div>
          </footer>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

function ReviewRow({
  review,
  selected,
  onSelect,
}: {
  review: SampleReview;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="flex items-start gap-1.5">
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onSelect}
        className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
            selected ? "border-[#1976d2]" : "border-[#ccc]"
          }`}
        >
          {selected ? (
            <span className="h-2 w-2 rounded-full bg-[#1976d2]" />
          ) : null}
        </span>
      </button>
      <button
        type="button"
        onClick={onSelect}
        className={`flex flex-1 flex-col gap-4 rounded-lg border bg-white p-4 text-left transition-colors ${
          selected
            ? "border-[#1976d2]"
            : "border-[#ccc] hover:border-[#9aa3b0]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <GoogleBadge />
            <div className="flex flex-col gap-1">
              <StarRow rating={review.rating} />
              <div className="flex items-center gap-2 text-[15px]">
                <span className="font-medium text-[#212121]">
                  {review.reviewer}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#ccc]" />
                <span className="font-normal text-[#555]">{review.date}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#999]">
            <MapPin className="h-3.5 w-3.5" />
            <span>{review.location}</span>
          </div>
        </div>
        <p className="text-sm leading-5 text-[#212121]">{review.body}</p>
      </button>
    </div>
  );
}

function GoogleBadge() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5e9f0] bg-white">
      <span className="text-lg font-bold text-[#4285f4]">G</span>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= rating;
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled
                ? "fill-[#f57c00] text-[#f57c00]"
                : "fill-[#ccc] text-[#ccc]"
            }`}
          />
        );
      })}
    </div>
  );
}

function FilterRail({
  hasLast30,
  onClearLast30,
  onClearAll,
}: {
  hasLast30: boolean;
  onClearLast30: () => void;
  onClearAll: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between px-5">
        <span className="text-[18px] leading-none text-[#212121]">Filter</span>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-normal text-[#1976d2] hover:underline"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5">
        {hasLast30 ? (
          <div className="flex items-center justify-between rounded bg-[#e5e9f0] px-2 py-1.5">
            <span className="truncate text-sm leading-5 text-[#212121]">
              Last 30 days
            </span>
            <button
              type="button"
              aria-label="Remove filter"
              onClick={onClearLast30}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[#212121] hover:bg-[#d5dbe5]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}
        <FilterDropdown label="Review source" />
        <FilterDropdown label="Ratings" />
        <FilterDropdown label="Review content" />
      </div>
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between rounded border border-[#e5e9f0] px-2 py-1.5 text-left transition-colors hover:border-[#c4d5e9]"
    >
      <span className="truncate text-sm leading-5 text-[#555]">{label}</span>
      <ChevronDown className="h-5 w-5 shrink-0 text-[#6b7280]" />
    </button>
  );
}
