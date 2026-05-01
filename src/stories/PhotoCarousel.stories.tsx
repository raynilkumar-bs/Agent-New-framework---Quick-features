import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── Real photo sets using Unsplash (food / restaurant theme) ── */
const FOOD_PHOTOS = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&auto=format",
];

const SINGLE_PHOTO = [FOOD_PHOTOS[0]];
const THREE_PHOTOS = FOOD_PHOTOS.slice(0, 3);

/* ── Lightbox ───────────────────────────────────────── */
function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none p-2 transition-colors"
      >
        ✕
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
        {index + 1} / {photos.length}
      </div>
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-[44px] rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <img
        src={photos[index]}
        alt={`Photo ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {index < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 size-[44px] rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

/* ── PhotoCarousel ──────────────────────────────────── */
function PhotoCarousel({ photos, visibleCount = 4 }: { photos: string[]; visibleCount?: number }) {
  const [offset, setOffset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const canLeft  = offset > 0;
  const canRight = offset + visibleCount < photos.length;

  const visible = photos.slice(offset, offset + visibleCount + 1);

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex(i => Math.min(photos.length - 1, (i ?? 0) + 1))}
        />
      )}

      <div className="relative w-full">
        <div className="flex gap-[6px] overflow-hidden">
          {visible.map((src, idx) => {
            const absIdx = offset + idx;
            const isLast = idx === visible.length - 1 && canRight;
            return (
              <div
                key={absIdx}
                onClick={() => setLightboxIndex(absIdx)}
                className="w-[180px] h-[120px] rounded-[6px] overflow-hidden shrink-0 relative cursor-pointer group/photo"
              >
                <img
                  src={src}
                  alt={`Photo ${absIdx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover/photo:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://picsum.photos/seed/fallback${absIdx}/400/300`;
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 group-hover/photo:opacity-100 transition-opacity">
                    View
                  </span>
                </div>
                <div className="absolute inset-0 border border-black/[0.06] rounded-[6px] pointer-events-none" />
                {/* Right-edge fade on last photo when more exist */}
                {isLast && (
                  <div
                    className="absolute inset-0 rounded-[6px]"
                    style={{ backgroundImage: "linear-gradient(-90deg, rgba(20,20,20,0.85) 0%, transparent 60%)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Prev / Next buttons */}
        {canLeft && (
          <button
            onClick={() => setOffset(o => Math.max(0, o - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 size-[36px] rounded-full bg-white/70 dark:bg-black/50 border border-black/10 dark:border-white/20 flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-black/70 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-[#212121] dark:text-white" />
          </button>
        )}
        {canRight && (
          <button
            onClick={() => setOffset(o => Math.min(photos.length - visibleCount, o + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-[36px] rounded-full bg-white/70 dark:bg-black/50 border border-black/10 dark:border-white/20 flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-black/70 transition-all"
          >
            <ChevronRight className="w-4 h-4 text-[#212121] dark:text-white" />
          </button>
        )}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   META + STORIES
   ══════════════════════════════════════════════════════ */
const meta: Meta = {
  title: "UI/PhotoCarousel",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "7 photos — scroll + lightbox",
  render: () => (
    <div className="max-w-[800px]">
      <PhotoCarousel photos={FOOD_PHOTOS} />
    </div>
  ),
};

export const ThreePhotos: Story = {
  name: "3 photos — no scroll needed",
  render: () => (
    <div className="max-w-[800px]">
      <PhotoCarousel photos={THREE_PHOTOS} />
    </div>
  ),
};

export const SinglePhoto: Story = {
  name: "1 photo",
  render: () => (
    <div className="max-w-[800px]">
      <PhotoCarousel photos={SINGLE_PHOTO} />
    </div>
  ),
};

export const CustomVisibleCount: Story = {
  name: "2 visible at a time",
  render: () => (
    <div className="max-w-[400px]">
      <PhotoCarousel photos={FOOD_PHOTOS} visibleCount={2} />
    </div>
  ),
};

export const InReviewCard: Story = {
  name: "In review card context",
  render: () => (
    <div className="max-w-[800px] bg-white dark:bg-card rounded-xl border border-border p-6 flex flex-col gap-4">
      {/* Reviewer */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[#e1306c] flex items-center justify-center text-white text-sm shrink-0">A</div>
        <div className="flex flex-col">
          <span className="text-sm text-foreground">Arya Stark</span>
          <span className="text-xs text-muted-foreground">Jan 7, 2023 · 12 Photos · Featured</span>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-[#f59e0b] text-sm">★</span>
          ))}
        </div>
      </div>
      {/* Review text */}
      <p className="text-sm text-foreground leading-relaxed">
        I had a great time here, the place is situated near Wagle circle. It has top notch ambience and a really cool vibe.
        The food and drinks were pretty good and would definitely recommend this out to all the non veg lovers. ❤️
      </p>
      {/* Carousel */}
      <PhotoCarousel photos={FOOD_PHOTOS} />
      {/* Reply */}
      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <span className="text-xs text-muted-foreground">BirdAI suggested reply · </span>
        We appreciate your feedback! Thank you for taking the time to share your experience with us.
      </div>
    </div>
  ),
};
