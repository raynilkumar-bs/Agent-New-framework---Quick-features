import { useEffect, useRef, useState } from "react";
import {
  REVIEWS_SHORTCUT_EVENT,
  type ReviewsShortcutAction,
} from "@/app/shortcuts/events";
import { Search, ChevronDown, MoreVertical, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { FunnelSimple } from "@phosphor-icons/react";
import { Button } from "@/app/components/ui/button";
import svgPaths from "../../imports/svg-k7qrt1366a";
// Real placeholder images — replace with actual CDN URLs in production
const imgRectangle2429 = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format";
const imgRectangle2430 = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format";
const imgRectangle2431 = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format";
const imgRectangle2432 = "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&auto=format";
const imgRectangle2436 = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format";
const imgRectangle2437 = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format";
const imgRectangle2435 = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&auto=format";
import { FilterPanel, type FilterItem } from "./FilterPanel";

// Types
interface Review {
  id: number;
  site: "yelp" | "google";
  rating: number;
  reviewer: string;
  date: string;
  photoCount?: number;
  featured?: boolean;
  employees: number;
  location: string;
  photos: string[];
  text: string;
  replyStatus: "post" | "edit";
  hasReplyDots?: boolean;
}

// Mock data matching Figma reference 2
const mockReviews: Review[] = [
  {
    id: 1,
    site: "yelp",
    rating: 5,
    reviewer: "Arya Stark",
    date: "Jan 7, 2023",
    photoCount: 12,
    featured: true,
    employees: 2,
    location: "Georgia",
    photos: [imgRectangle2429, imgRectangle2430, imgRectangle2431, imgRectangle2432, imgRectangle2436, imgRectangle2437, imgRectangle2435],
    text: "I had a great time here, the place is situated near Wagle circle. It has top notch ambience and a really cool vibe. The food and drinks were pretty good and would definitely recommend this out to all the non veg lovers. The restaurant is pretty big and can accommodate a huge crowd with indoor as well as an outdoor seating. The prices for the dishes are pretty reasonable and totally worth it! My personal preference were the desserts, especially the DIY cake. Would definitely visit again! ❤️",
    replyStatus: "post",
  },
  {
    id: 2,
    site: "google",
    rating: 4,
    reviewer: "Daniel Peirre",
    date: "Jan 7, 2023",
    employees: 2,
    location: "Georgia",
    photos: [],
    text: "I recently had a experience of dining at Magna and I must say that it was an outstanding experience from start to end. The menu is so diverse and thoughtfully curated.",
    replyStatus: "post",
  },
  {
    id: 3,
    site: "yelp",
    rating: 5,
    reviewer: "Austin Dale",
    date: "Jan 7, 2023",
    employees: 2,
    location: "Georgia",
    photos: [],
    text: "A huge place where you can hang out with your friend/relative. A huge place where you can hang out with your friend/relative. A huge place where you can hang out with your friend/relative.",
    replyStatus: "edit",
    hasReplyDots: true,
  },
  {
    id: 4,
    site: "yelp",
    rating: 5,
    reviewer: "Austin Dale",
    date: "Jan 7, 2023",
    employees: 2,
    location: "Georgia",
    photos: [],
    text: "This place is super amazing. The ambience is beautiful. The staff is very cooperative. I tried out there lunch express you should definitely try it out. The menu have variety of dishes. The best part was that desert. I ordered paint pastry. It was super delicious.",
    replyStatus: "post",
    hasReplyDots: true,
  },
];

/* ─── Yelp Logo ─── */
function YelpLogo() {
  return (
    <div className="bg-white flex items-center justify-center p-[5px] rounded-full size-[40px] relative border border-[#eaeaea] dark:border-[#333a47] dark:bg-[#262b35]">
      <div className="h-[27.435px] w-[22.881px]">
        <svg className="w-full h-full" viewBox="0 0 22.8814 27.4352" fill="none">
          <path d={svgPaths.p53b0d00} fill="#FF1A1A" />
          <path d={svgPaths.pf0e0dc0} fill="#FF1A1A" />
          <path d={svgPaths.p27030500} fill="#FF1A1A" />
          <path d={svgPaths.p3643f600} fill="#FF1A1A" />
          <path d={svgPaths.p5cc3100} fill="#FF1A1A" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Google Logo (full color G) ─── */
function GoogleLogo() {
  return (
    <div className="relative shrink-0 size-[40px]">
      <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" fill="white" r="19.5833" stroke="#EAEAEA" strokeWidth="0.833333" />
        <path d={svgPaths.p27765500} fill="#4285F4" />
        <path d={svgPaths.p266b3f00} fill="#34A853" />
        <path d={svgPaths.p39b489f0} fill="#FBBC05" />
        <path d={svgPaths.p16fc1f80} fill="#EB4335" />
      </svg>
    </div>
  );
}

/* ─── Star Rating (Yelp-style red stars) ─── */
function StarRating({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i < rating
              ? "fill-[#FB433C] text-[#FB433C]"
              : "fill-[#ccc] text-[#ccc] dark:fill-[#555] dark:text-[#555]"
          }
        />
      ))}
    </div>
  );
}

/* ─── BirdAI Suggested Reply ─── */
function MynaAIReply({ hasThreeDots }: { hasThreeDots?: boolean }) {
  return (
    <div className="relative bg-[#f9f7fd] dark:bg-[#1e1a2e] rounded-[8px] p-5 w-full">
      <div className="flex flex-col gap-[6px]">
        {/* Header row */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">BirdAI suggested reply</span>
          <div className="size-[4px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
          <div className="flex items-center">
            <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">Reply as</span>
            <div className="flex items-center gap-[2px] px-1 rounded-full">
              <span className="text-[12px] text-[#1976d2]">Sampada (me)</span>
              <svg className="w-[7.5px] h-[3.75px]" viewBox="0 0 7.5 3.75" fill="none">
                <path d="M0 0L3.75 3.75L7.5 0H0Z" fill="#49454F" />
              </svg>
            </div>
          </div>
        </div>
        {/* Reply text */}
        <p className="text-[15px] text-[#212121] dark:text-[#d0d0d0] leading-[20px]">
          We appreciate your feedback! Thank you for taking the time to share your experience with us.
        </p>
      </div>
      {/* Optional 3-dot menu on reply */}
      {hasThreeDots && (
        <div className="absolute right-3 top-2 bg-[#f9f7fd] dark:bg-[#1e1a2e] rounded-full size-[24px] flex items-center justify-center">
          <svg className="w-[12px] h-[3px] rotate-90" viewBox="0 0 12 3" fill="none">
            <path clipRule="evenodd" d={svgPaths.p2d3a0500} fill="#757575" fillRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ─── Chat Icon ─── */
function ChatIcon() {
  return (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 19 19" fill="none">
      <g clipPath="url(#chatClip)">
        <path d={svgPaths.p84b0100} fill="#555555" className="dark:fill-[#8b92a5]" />
      </g>
      <defs>
        <clipPath id="chatClip">
          <rect fill="white" height="19" width="19" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── More Dots (vertical) ─── */
function MoreDots() {
  return (
    <svg className="w-[12px] h-[3px] rotate-90" viewBox="0 0 12 3" fill="none">
      <path clipRule="evenodd" d={svgPaths.p2d3a0500} fill="#555555" fillRule="evenodd" className="dark:fill-[#8b92a5]" />
    </svg>
  );
}

/* ─── Action Row (Post reply / Edit reply + chat + more) ─── */
function ActionRow({ replyStatus }: { replyStatus: "post" | "edit" }) {
  return (
    <div className="flex flex-col gap-6 items-end w-full">
      <div className="flex items-center gap-3">
        {/* Reply CTA */}
        <Button className="bg-[#6834b7] text-white dark:bg-[#7c3aed] hover:bg-[#5a2da0] dark:hover:bg-[#6d28d9]">
          {replyStatus === "post" ? "Post reply" : "Edit reply"}
        </Button>
        {/* Chat button */}
        <Button variant="outline" size="icon">
          <ChatIcon />
        </Button>
        {/* More button */}
        <Button variant="outline" size="icon">
          <MoreDots />
        </Button>
      </div>
    </div>
  );
}

/* ─── Lightbox ─── */
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
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none p-2"
      >
        ✕
      </button>
      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {photos.length}
      </div>
      {/* Prev */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-[44px] rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {/* Image */}
      <img
        src={photos[index]}
        alt={`Photo ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-[8px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {/* Next */}
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

/* ─── Photo Carousel ─── */
function PhotoCarousel({ photos }: { photos: string[] }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visibleCount = 4;

  const canScrollLeft = scrollOffset > 0;
  const canScrollRight = scrollOffset + visibleCount < photos.length;

  const scrollLeft = () => setScrollOffset((prev) => Math.max(0, prev - 1));
  const scrollRight = () => setScrollOffset((prev) => Math.min(photos.length - visibleCount, prev + 1));

  const visiblePhotos = photos.slice(scrollOffset, scrollOffset + visibleCount + 1);

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(photos.length - 1, (i ?? 0) + 1))}
        />
      )}
    <div className="relative w-full">
      <div className="flex gap-[6px] overflow-hidden">
        {visiblePhotos.map((photo, idx) => {
          const absoluteIdx = scrollOffset + idx;
          const isLast = idx === visiblePhotos.length - 1 && canScrollRight;
          return (
            <div
              key={absoluteIdx}
              onClick={() => setLightboxIndex(absoluteIdx)}
              className="w-[180px] h-[120px] rounded-[6px] overflow-hidden shrink-0 relative cursor-pointer group/photo"
            >
              <img
                src={photo}
                alt={`Review photo ${absoluteIdx + 1}`}
                className="w-full h-full object-cover transition-transform duration-200 group-hover/photo:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/review${absoluteIdx}/400/300`;
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover/photo:opacity-100 text-xs transition-opacity">View</span>
              </div>
              <div className="absolute inset-0 border border-[#f4f6f7] dark:border-[#333a47] rounded-[4px]" />
              {/* Fade gradient on last visible photo */}
              {isLast && (
                <div
                  className="absolute inset-0 rounded-[4px]"
                  style={{
                    backgroundImage: "linear-gradient(-90deg, rgba(33, 33, 33, 0.9) 0%, rgba(0, 0, 0, 0) 100.83%)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      {photos.length > visibleCount && (
        <>
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-[40px] rounded-full bg-white/60 dark:bg-black/40 border border-[#212121] dark:border-[#888] flex items-center justify-center hover:bg-white/80 dark:hover:bg-black/60 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#0A0A0A] dark:text-white" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-[40px] rounded-full bg-white/60 dark:bg-black/40 border border-[#212121] dark:border-[#888] flex items-center justify-center hover:bg-white/80 dark:hover:bg-black/60 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-[#212121] dark:text-white" />
            </button>
          )}
        </>
      )}
    </div>
    </>
  );
}

/* ─── Review Card ─── */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header: logo + details + employee/location */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          {review.site === "yelp" ? <YelpLogo /> : <GoogleLogo />}
          <div className="flex flex-col gap-[2px]">
            <StarRating rating={review.rating} />
            <div className="flex items-center gap-2 text-[12px]">
              <span className="text-[#212121] dark:text-[#e4e4e4]">{review.reviewer}</span>
              <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
              <span className="text-[#555] dark:text-[#8b92a5]">{review.date}</span>
              {review.photoCount && (
                <>
                  <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                  <span className="text-[#555] dark:text-[#8b92a5]">{review.photoCount} Photos</span>
                </>
              )}
              {review.featured && (
                <>
                  <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                  <div className="bg-[#eaeaea] dark:bg-[#333a47] px-2 py-0.5 rounded-[4px]">
                    <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]">Featured</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Employee & location meta */}
        <div className="flex items-center gap-3 text-[13px] text-[#999] dark:text-[#8b92a5]">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 11.2937 12" fill="none">
              <path clipRule="evenodd" d={svgPaths.pa635500} fill="currentColor" fillRule="evenodd" />
            </svg>
            <span>{review.employees} employees</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 9.7974 11.8269" fill="none">
              <path d={svgPaths.p12721780} fill="currentColor" />
            </svg>
            <span>{review.location}</span>
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[14px] text-[#212121] dark:text-[#d0d0d0] leading-[20px]">{review.text}</p>

      {/* Photo carousel */}
      {review.photos.length > 0 && <PhotoCarousel photos={review.photos} />}

      {/* BirdAI suggested reply */}
      <MynaAIReply hasThreeDots={review.hasReplyDots} />

      {/* Action row */}
      <ActionRow replyStatus={review.replyStatus} />
    </div>
  );
}

/* ─── Reviews filter definitions ─── */
const reviewFilters: FilterItem[] = [
  {
    id: "review_source",
    label: "Source",
    options: ["All sources", "Google", "Yelp", "Facebook", "TripAdvisor"],
  },
  {
    id: "review_rating",
    label: "Rating",
    options: ["All ratings", "5 stars", "4 stars", "3 stars", "2 stars", "1 star"],
  },
  {
    id: "review_status",
    label: "Reply status",
    options: ["All statuses", "Replied", "Not replied", "Draft"],
  },
  {
    id: "review_date",
    label: "Date range",
    options: ["All time", "Today", "Last 7 days", "Last 30 days", "Last 90 days", "Last year"],
  },
  {
    id: "review_location",
    label: "Location",
    options: ["All locations", "Georgia", "New York", "California", "Texas", "Florida"],
  },
  {
    id: "review_sentiment",
    label: "Sentiment",
    options: ["All sentiments", "Positive", "Neutral", "Negative"],
  },
  {
    id: "review_keyword",
    label: "Keywords",
    options: ["All keywords", "Ambience", "Food", "Service", "Price", "Cleanliness"],
  },
  {
    id: "review_featured",
    label: "Featured",
    options: ["All", "Featured only", "Not featured"],
  },
  {
    id: "review_photos",
    label: "Has photos",
    options: ["All", "With photos", "Without photos"],
  },
  {
    id: "review_employee",
    label: "Employee",
    options: ["All employees", "Unassigned", "Sampada", "John", "Maria"],
  },
];

/* ─── Main ReviewsView ─── */
export function ReviewsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState<FilterItem[]>(reviewFilters);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const aiReplyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onShortcut = (e: Event) => {
      const detail = (e as CustomEvent<{ action: ReviewsShortcutAction }>).detail;
      if (!detail) return;
      if (detail.action === "focus-search") {
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
      if (detail.action === "toggle-filters") {
        setFilterPanelOpen((open) => !open);
      }
      if (detail.action === "focus-ai-reply") {
        aiReplyButtonRef.current?.focus();
      }
    };
    window.addEventListener(REVIEWS_SHORTCUT_EVENT, onShortcut);
    return () => window.removeEventListener(REVIEWS_SHORTCUT_EVENT, onShortcut);
  }, []);

  const filteredReviews = mockReviews.filter((review) =>
    searchQuery
      ? review.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.text.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden bg-white dark:bg-[#1e2229] transition-colors duration-300">
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-[17px] text-[#212121] dark:text-[#e4e4e4]">All reviews</h1>
            <div className="flex items-center gap-1 text-[12px] text-[#555] dark:text-[#8b92a5]">
              <span>832 total reviews</span>
              <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5] mx-0.5" />
              <span>4.1</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-[10px] h-[10px] ${
                      i < 4
                        ? "fill-[#f57c00] text-[#f57c00]"
                        : "fill-[#ccc] text-[#ccc] dark:fill-[#555] dark:text-[#555]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative h-[var(--button-height)] min-w-[200px] max-w-[280px]">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-[14px] -translate-y-1/2 text-[#303030] dark:text-[#8b92a5]" aria-hidden />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews"
                className="h-full w-full rounded-[8px] border border-[#e5e9f0] bg-white py-0 pr-2 pl-8 text-[14px] text-[#212121] outline-none transition-colors placeholder:text-[#757575] focus:border-[#2552ED] focus:ring-1 focus:ring-[#2552ED] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:placeholder:text-[#8b92a5]"
                aria-label="Search reviews"
              />
            </div>

            {/* More options */}
            <Button variant="outline" size="icon">
              <MoreVertical className="w-[14px] h-[14px] text-[#303030] dark:text-[#8b92a5]" />
            </Button>

            {/* AI button */}
            <Button
              ref={aiReplyButtonRef}
              type="button"
              title="AI reply assistant"
              variant="outline"
              size="icon"
            >
              <svg className="w-[14px] h-[14px]" viewBox="0 0 16.6975 14.8252" fill="none">
                <path d={svgPaths.p33170700} fill="#6834B7" />
                <path d={svgPaths.p2d8f3b80} fill="#6834B7" />
                <path clipRule="evenodd" d={svgPaths.p1692000} fill="#6834B7" fillRule="evenodd" />
                <path d={svgPaths.p4cf0c70} fill="#6834B7" />
              </svg>
            </Button>

            {/* Filter button */}
            <Button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              variant="outline"
              size="icon"
              className={filterPanelOpen
                ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]"
                : ""
              }
            >
              <FunnelSimple size={14} weight={filterPanelOpen ? "fill" : "regular"} className={filterPanelOpen ? "text-[#1E44CC]" : "text-[#555] dark:text-[#8b92a5]"} />
            </Button>
          </div>
        </div>

        {/* Reviews feed */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <div className="flex flex-col gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Filter panel (collapsible) ─── */}
      {filterPanelOpen && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          collapsed={false}
          onToggleCollapse={() => setFilterPanelOpen(false)}
          storageKey="birdeye_reviews_filters"
        />
      )}
    </div>
  );
}