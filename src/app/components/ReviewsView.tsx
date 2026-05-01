import { useEffect, useRef, useState } from "react";
import {
  REVIEWS_SHORTCUT_EVENT,
  type ReviewsShortcutAction,
} from "@/app/shortcuts/events";
import {
  Search,
  MoreVertical,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Send,
} from "lucide-react";
import { FunnelSimple } from "@phosphor-icons/react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";
import { FilterPanel, type FilterItem } from "./FilterPanel";
import { ReviewResponseAgentsView } from "./ReviewResponseAgentsView";
import svgPaths from "../../imports/svg-k7qrt1366a";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  id: number;
  site: "yelp" | "google";
  rating: number;
  reviewer: string;
  date: string;
  photoCount?: number;
  featured?: boolean;
  location: string;
  photos: string[];
  text: string;
  replyStatus: "post" | "edit";
  hasReplyDots?: boolean;
}

interface PendingApproval {
  id: number;
  site: "yelp" | "google";
  rating: number;
  reviewer: string;
  date: string;
  reviewText: string;
  suggestedReply: string;
  replyAuthor: string;
  location: string;
}

interface RejectedReply {
  id: number;
  site: "yelp" | "google";
  rating: number;
  reviewer: string;
  date: string;
  reviewText: string;
  rejectedReply: string;
  rejectedBy: string;
  rejectedAt: string;
  rejectionReason: string;
}

interface ScheduledReply {
  id: number;
  site: "yelp" | "google";
  rating: number;
  reviewer: string;
  date: string;
  reviewText: string;
  scheduledReply: string;
  scheduledAt: string;
  scheduledBy: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PHOTO_URLS = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&auto=format",
];

const ALL_MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    site: "yelp",
    rating: 5,
    reviewer: "Arya Stark",
    date: "Jan 7, 2023",
    photoCount: 12,
    featured: true,
    location: "Georgia",
    photos: PHOTO_URLS,
    text: "I had a great time here, the place is situated near Wagle circle. It has top notch ambience and a really cool vibe. The food and drinks were pretty good and would definitely recommend this out to all the non veg lovers. The restaurant is pretty big and can accommodate a huge crowd with indoor as well as an outdoor seating. The prices for the dishes are pretty reasonable and totally worth it! My personal preference were the desserts, especially the DIY cake. Would definitely visit again! ❤️",
    replyStatus: "post",
  },
  {
    id: 2,
    site: "google",
    rating: 4,
    reviewer: "Daniel Peirre",
    date: "Jan 7, 2023",
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
    location: "Georgia",
    photos: [],
    text: "This place is super amazing. The ambience is beautiful. The staff is very cooperative. I tried out there lunch express you should definitely try it out. The menu have variety of dishes. The best part was that desert. I ordered paint pastry. It was super delicious.",
    replyStatus: "post",
    hasReplyDots: true,
  },
  {
    id: 5,
    site: "google",
    rating: 3,
    reviewer: "Maria Garcia",
    date: "Feb 12, 2023",
    location: "New York",
    photos: [],
    text: "Decent place overall but service could be improved. The food was good but we waited over 30 minutes for our order. Would visit again but hope they fix the wait times.",
    replyStatus: "post",
  },
  {
    id: 6,
    site: "google",
    rating: 2,
    reviewer: "John Smith",
    date: "Mar 3, 2023",
    location: "California",
    photos: [],
    text: "Very disappointing experience. The food was cold when it arrived and the staff seemed indifferent. Not the quality I expected based on reviews.",
    replyStatus: "post",
  },
];

const PENDING_APPROVALS: PendingApproval[] = [
  {
    id: 1,
    site: "google",
    rating: 5,
    reviewer: "Sarah Mitchell",
    date: "Apr 18, 2024",
    reviewText: "Absolutely loved the experience! The staff was incredibly welcoming and the food exceeded all expectations. Will definitely be coming back!",
    suggestedReply: "Thank you so much for the wonderful review, Sarah! We're thrilled to hear you had such a great experience. Our team works hard to ensure every visit is memorable, and it means a lot to know we succeeded. We look forward to welcoming you back soon!",
    replyAuthor: "Sampada (me)",
    location: "Georgia",
  },
  {
    id: 2,
    site: "yelp",
    rating: 4,
    reviewer: "James Rodriguez",
    date: "Apr 16, 2024",
    reviewText: "Great food, amazing ambience. Only small issue was a slight wait at the bar. But overall a fantastic experience worth every penny.",
    suggestedReply: "Hi James, thank you for the kind words! We're glad you enjoyed the food and ambience. We apologize for the wait at the bar — we're actively working to improve our service speed during peak hours. Hope to see you again soon!",
    replyAuthor: "Sampada (me)",
    location: "Georgia",
  },
  {
    id: 3,
    site: "google",
    rating: 3,
    reviewer: "Lisa Chen",
    date: "Apr 14, 2024",
    reviewText: "Mixed experience. The food was good but service was slow. The atmosphere was nice though. Middle of the road for me.",
    suggestedReply: "Hi Lisa, thank you for taking the time to share your feedback. We're sorry to hear the service didn't meet your expectations. We take all feedback seriously and are working to improve our response times. We hope to provide you with a better experience on your next visit!",
    replyAuthor: "Sampada (me)",
    location: "New York",
  },
];

const REJECTED_REPLIES: RejectedReply[] = [
  {
    id: 1,
    site: "google",
    rating: 2,
    reviewer: "Tom Bradley",
    date: "Apr 10, 2024",
    reviewText: "Very disappointed with the service. Had to wait 45 minutes for a table even with a reservation.",
    rejectedReply: "Thank you for your feedback. We understand your frustration and appreciate your patience.",
    rejectedBy: "Priya Nair",
    rejectedAt: "Apr 11, 2024",
    rejectionReason: "Too generic — needs specific acknowledgment of the reservation issue.",
  },
  {
    id: 2,
    site: "yelp",
    rating: 1,
    reviewer: "Anna Williams",
    date: "Apr 8, 2024",
    reviewText: "The worst dining experience I've ever had. Food was undercooked, staff was rude, and they messed up our order twice.",
    rejectedReply: "We're sorry to hear about your experience. Please contact us directly.",
    rejectedBy: "Raj Kumar",
    rejectedAt: "Apr 9, 2024",
    rejectionReason: "Should offer a specific resolution, not just redirect to contact.",
  },
];

const SCHEDULED_REPLIES: ScheduledReply[] = [
  {
    id: 1,
    site: "google",
    rating: 5,
    reviewer: "Kevin Park",
    date: "Apr 20, 2024",
    reviewText: "Best restaurant in town! The tasting menu was phenomenal. Every dish was a work of art.",
    scheduledReply: "Thank you so much, Kevin! We're delighted you enjoyed the tasting menu. Our chef puts incredible care into every dish. We hope to see you again soon!",
    scheduledAt: "Apr 25, 2024 at 10:00 AM",
    scheduledBy: "Sampada",
  },
  {
    id: 2,
    site: "yelp",
    rating: 4,
    reviewer: "Emma Thompson",
    date: "Apr 19, 2024",
    reviewText: "Lovely place with a great atmosphere. The cocktails were creative and the appetizers were excellent.",
    scheduledReply: "Hi Emma, thank you for your wonderful review! We're thrilled you enjoyed the cocktails and appetizers. Hope to have you back soon for more!",
    scheduledAt: "Apr 24, 2024 at 2:00 PM",
    scheduledBy: "Sampada",
  },
  {
    id: 3,
    site: "google",
    rating: 4,
    reviewer: "Michael Davis",
    date: "Apr 18, 2024",
    reviewText: "Solid experience overall. Good food and service. The dessert selection was particularly impressive.",
    scheduledReply: "Thank you, Michael! We're glad you had a great time and that our desserts left an impression. We work hard to keep the menu exciting!",
    scheduledAt: "Apr 26, 2024 at 11:00 AM",
    scheduledBy: "Raj Kumar",
  },
];

const REVIEW_FILTERS: FilterItem[] = [
  { id: "review_source", label: "Source", options: ["All sources", "Google", "Yelp", "Facebook", "TripAdvisor"] },
  { id: "review_rating", label: "Rating", options: ["All ratings", "5 stars", "4 stars", "3 stars", "2 stars", "1 star"] },
  { id: "review_status", label: "Reply status", options: ["All statuses", "Replied", "Not replied", "Draft"] },
  { id: "review_date", label: "Date range", options: ["All time", "Today", "Last 7 days", "Last 30 days", "Last 90 days", "Last year"] },
  { id: "review_location", label: "Location", options: ["All locations", "Georgia", "New York", "California", "Texas", "Florida"] },
  { id: "review_sentiment", label: "Sentiment", options: ["All sentiments", "Positive", "Neutral", "Negative"] },
  { id: "review_keyword", label: "Keywords", options: ["All keywords", "Ambience", "Food", "Service", "Price", "Cleanliness"] },
  { id: "review_featured", label: "Featured", options: ["All", "Featured only", "Not featured"] },
  { id: "review_photos", label: "Has photos", options: ["All", "With photos", "Without photos"] },
  { id: "review_employee", label: "Employee", options: ["All employees", "Unassigned", "Sampada", "John", "Maria"] },
];

// ─── Shared UI: Site Logos ────────────────────────────────────────────────────

function YelpLogo() {
  return (
    <div className="bg-white flex items-center justify-center p-[5px] rounded-full size-[40px] relative border border-[#eaeaea] dark:border-[#333a47] dark:bg-[#262b35] shrink-0">
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

function SiteLogo({ site }: { site: "yelp" | "google" }) {
  return site === "yelp" ? <YelpLogo /> : <GoogleLogo />;
}

// ─── Shared UI: Star Rating ───────────────────────────────────────────────────

function StarRating({ rating, size = 20 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < rating ? "fill-[#FB433C] text-[#FB433C]" : "fill-[#ccc] text-[#ccc] dark:fill-[#555] dark:text-[#555]"}
        />
      ))}
    </div>
  );
}

// ─── Shared UI: BirdAI Reply Box ──────────────────────────────────────────────

function BirdAIReplyBox({ hasThreeDots, text }: { hasThreeDots?: boolean; text?: string }) {
  return (
    <div className="relative bg-[#f9f7fd] dark:bg-[#1e1a2e] rounded-[8px] p-5 w-full">
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">BirdAI suggested reply</span>
          <div className="size-[4px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
          <div className="flex items-center gap-[2px]">
            <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">Reply as</span>
            <span className="text-[12px] text-[#1976d2] px-1">Sampada (me)</span>
          </div>
        </div>
        <p className="text-[15px] text-[#212121] dark:text-[#d0d0d0] leading-[20px]">
          {text ?? "We appreciate your feedback! Thank you for taking the time to share your experience with us."}
        </p>
      </div>
      {hasThreeDots && (
        <div className="absolute right-3 top-2 flex items-center justify-center size-[24px]">
          <MoreVertical className="w-[12px] h-[12px] text-[#757575]" />
        </div>
      )}
    </div>
  );
}

// ─── Shared UI: Lightbox ──────────────────────────────────────────────────────

function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none p-2">✕</button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">{index + 1} / {photos.length}</div>
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 size-[44px] rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <img
        src={photos[index]}
        alt={`Photo ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-[8px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {index < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 size-[44px] rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// ─── Shared UI: Photo Carousel ────────────────────────────────────────────────

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visibleCount = 4;

  const canScrollLeft = scrollOffset > 0;
  const canScrollRight = scrollOffset + visibleCount < photos.length;
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
                />
                <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-200" />
                <div className="absolute inset-0 border border-[#f4f6f7] dark:border-[#333a47] rounded-[4px]" />
                {isLast && (
                  <div
                    className="absolute inset-0 rounded-[4px]"
                    style={{ backgroundImage: "linear-gradient(-90deg, rgba(33,33,33,0.9) 0%, rgba(0,0,0,0) 100%)" }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {photos.length > visibleCount && (
          <>
            {canScrollLeft && (
              <button
                onClick={() => setScrollOffset((p) => Math.max(0, p - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 size-[40px] rounded-full bg-white/60 dark:bg-black/40 border border-[#212121] dark:border-[#888] flex items-center justify-center hover:bg-white/80 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-[#0A0A0A] dark:text-white" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => setScrollOffset((p) => Math.min(photos.length - visibleCount, p + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-[40px] rounded-full bg-white/60 dark:bg-black/40 border border-[#212121] dark:border-[#888] flex items-center justify-center hover:bg-white/80 transition-all"
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

// ─── Shared UI: Review Card ───────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          <SiteLogo site={review.site} />
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
        <span className="text-[13px] text-[#999] dark:text-[#8b92a5] shrink-0">{review.location}</span>
      </div>
      <p className="text-[14px] text-[#212121] dark:text-[#d0d0d0] leading-[20px]">{review.text}</p>
      {review.photos.length > 0 && <PhotoCarousel photos={review.photos} />}
      <BirdAIReplyBox hasThreeDots={review.hasReplyDots} />
      <div className="flex items-center justify-end gap-3">
        <Button className="bg-[#6834b7] text-white dark:bg-[#7c3aed] hover:bg-[#5a2da0] dark:hover:bg-[#6d28d9]">
          {review.replyStatus === "post" ? "Post reply" : "Edit reply"}
        </Button>
        <Button variant="outline" size="icon">
          <MessageSquare className="w-[14px] h-[14px]" />
        </Button>
        <Button variant="outline" size="icon">
          <MoreVertical className="w-[14px] h-[14px]" />
        </Button>
      </div>
    </div>
  );
}

// ─── Shared UI: Review List Header ───────────────────────────────────────────

function ReviewListHeader({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  filterOpen,
  onToggleFilter,
  extraActions,
  searchRef,
}: {
  title: string;
  subtitle: string;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  filterOpen: boolean;
  onToggleFilter: () => void;
  extraActions?: React.ReactNode;
  searchRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35] bg-white dark:bg-[#1e2229]">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[17px] font-semibold text-[#111827] dark:text-[#e4e4e4]">{title}</h1>
        <p className="text-[12px] text-[#555] dark:text-[#8b92a5]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative h-[var(--button-height)] min-w-[200px] max-w-[280px]">
          <Search className="pointer-events-none absolute left-2 top-1/2 size-[14px] -translate-y-1/2 text-[#303030] dark:text-[#8b92a5]" />
          <input
            ref={searchRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reviews"
            className="h-full w-full rounded-[8px] border border-[#e5e9f0] bg-white py-0 pr-2 pl-8 text-[14px] text-[#212121] outline-none transition-colors placeholder:text-[#757575] focus:border-[#2552ED] focus:ring-1 focus:ring-[#2552ED] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:placeholder:text-[#8b92a5]"
          />
        </div>
        {extraActions}
        <Button variant="outline" size="icon">
          <MoreVertical className="w-[14px] h-[14px] text-[#303030] dark:text-[#8b92a5]" />
        </Button>
        <Button
          onClick={onToggleFilter}
          variant="outline"
          size="icon"
          className={filterOpen ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]" : ""}
        >
          <FunnelSimple
            size={14}
            weight={filterOpen ? "fill" : "regular"}
            className={filterOpen ? "text-[#1E44CC]" : "text-[#555] dark:text-[#8b92a5]"}
          />
        </Button>
      </div>
    </div>
  );
}

// ─── View: All Reviews ────────────────────────────────────────────────────────

function AllReviewsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterItem[]>(REVIEW_FILTERS);
  const searchRef = useRef<HTMLInputElement>(null);
  const aiButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ action: ReviewsShortcutAction }>).detail;
      if (!detail) return;
      if (detail.action === "focus-search") { searchRef.current?.focus(); searchRef.current?.select(); }
      if (detail.action === "toggle-filters") setFilterOpen((o) => !o);
      if (detail.action === "focus-ai-reply") aiButtonRef.current?.focus();
    };
    window.addEventListener(REVIEWS_SHORTCUT_EVENT, handler);
    return () => window.removeEventListener(REVIEWS_SHORTCUT_EVENT, handler);
  }, []);

  const filtered = ALL_MOCK_REVIEWS.filter((r) =>
    searchQuery
      ? r.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.text.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden bg-white dark:bg-[#1e2229]">
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-[17px] text-[#212121] dark:text-[#e4e4e4]">All reviews</h1>
            <div className="flex items-center gap-1 text-[12px] text-[#555] dark:text-[#8b92a5]">
              <span>832 total reviews</span>
              <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5] mx-0.5" />
              <span>4.1</span>
              <div className="flex items-center ml-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-[10px] h-[10px] ${i < 4 ? "fill-[#f57c00] text-[#f57c00]" : "fill-[#ccc] text-[#ccc] dark:fill-[#555] dark:text-[#555]"}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative h-[var(--button-height)] min-w-[200px] max-w-[280px]">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-[14px] -translate-y-1/2 text-[#303030] dark:text-[#8b92a5]" />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews"
                className="h-full w-full rounded-[8px] border border-[#e5e9f0] bg-white py-0 pr-2 pl-8 text-[14px] text-[#212121] outline-none transition-colors placeholder:text-[#757575] focus:border-[#2552ED] focus:ring-1 focus:ring-[#2552ED] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:placeholder:text-[#8b92a5]"
              />
            </div>
            <Button variant="outline" size="icon">
              <MoreVertical className="w-[14px] h-[14px] text-[#303030] dark:text-[#8b92a5]" />
            </Button>
            <Button ref={aiButtonRef} variant="outline" size="icon" title="AI reply assistant">
              <svg className="w-[14px] h-[14px]" viewBox="0 0 16.6975 14.8252" fill="none">
                <path d={svgPaths.p33170700} fill="#6834B7" />
                <path d={svgPaths.p2d8f3b80} fill="#6834B7" />
                <path clipRule="evenodd" d={svgPaths.p1692000} fill="#6834B7" fillRule="evenodd" />
                <path d={svgPaths.p4cf0c70} fill="#6834B7" />
              </svg>
            </Button>
            <Button
              onClick={() => setFilterOpen(!filterOpen)}
              variant="outline"
              size="icon"
              className={filterOpen ? "bg-[#e8effe] dark:bg-[#1e2d5e] border-[#2552ED] dark:border-[#2552ED]" : ""}
            >
              <FunnelSimple size={14} weight={filterOpen ? "fill" : "regular"} className={filterOpen ? "text-[#1E44CC]" : "text-[#555] dark:text-[#8b92a5]"} />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <div className="flex flex-col gap-6">
            {filtered.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
      {filterOpen && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          collapsed={false}
          onToggleCollapse={() => setFilterOpen(false)}
          storageKey="birdeye_reviews_all_filters"
        />
      )}
    </div>
  );
}

// ─── View: Respond to Reviews ─────────────────────────────────────────────────

function RespondToReviewsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterItem[]>(REVIEW_FILTERS);
  const searchRef = useRef<HTMLInputElement>(null);

  const needsReply = ALL_MOCK_REVIEWS.filter((r) => r.replyStatus === "post");
  const filtered = needsReply.filter((r) =>
    searchQuery
      ? r.reviewer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.text.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden bg-white dark:bg-[#1e2229]">
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <ReviewListHeader
          title="Respond to reviews"
          subtitle={`${needsReply.length} reviews need a reply`}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterOpen={filterOpen}
          onToggleFilter={() => setFilterOpen(!filterOpen)}
          searchRef={searchRef}
        />
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#9ba2b0]">
              <Check className="w-8 h-8 mb-3 opacity-40" />
              <p className="text-[14px]">All reviews have been responded to.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-0 divide-y divide-[#f3f4f6] dark:divide-[#252b35]">
              {filtered.map((review) => (
                <div key={review.id} className="py-6">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {filterOpen && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          collapsed={false}
          onToggleCollapse={() => setFilterOpen(false)}
          storageKey="birdeye_reviews_respond_filters"
        />
      )}
    </div>
  );
}

// ─── View: Approve Replies ────────────────────────────────────────────────────

function ApproveRepliesContent() {
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);

  const remove = (id: number) => setApprovals((prev) => prev.filter((a) => a.id !== id));

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#1e2229]">
      <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35]">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[17px] font-semibold text-[#111827] dark:text-[#e4e4e4]">Approve replies</h1>
          <p className="text-[12px] text-[#555] dark:text-[#8b92a5]">
            {approvals.length} AI-generated {approvals.length === 1 ? "reply" : "replies"} pending your approval
          </p>
        </div>
        {approvals.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setApprovals([])}>
            Approve all
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {approvals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#9ba2b0]">
            <Check className="w-8 h-8 mb-3 opacity-40" />
            <p className="text-[14px]">All caught up — no replies pending approval.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-5">
            {approvals.map((item) => (
              <div key={item.id} className="border border-[#e5e9f0] dark:border-[#2e3340] rounded-[12px] p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <SiteLogo site={item.site} />
                  <div className="flex flex-col gap-[2px]">
                    <StarRating rating={item.rating} size={14} />
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="text-[#212121] dark:text-[#e4e4e4]">{item.reviewer}</span>
                      <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                      <span className="text-[#555] dark:text-[#8b92a5]">{item.date}</span>
                      <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                      <span className="text-[#555] dark:text-[#8b92a5]">{item.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[14px] text-[#555] dark:text-[#8b92a5] leading-[20px] italic">"{item.reviewText}"</p>
                <div className="bg-[#f9f7fd] dark:bg-[#1e1a2e] rounded-[8px] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[12px] text-[#555] dark:text-[#8b92a5]">BirdAI suggested reply</span>
                    <div className="size-[4px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                    <span className="text-[12px] text-[#1976d2]">{item.replyAuthor}</span>
                  </div>
                  <p className="text-[14px] text-[#212121] dark:text-[#d0d0d0] leading-[20px]">{item.suggestedReply}</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#e53e3e] border-[#e53e3e]/30 hover:bg-[#fff5f5] dark:hover:bg-[#2d1515]"
                    onClick={() => remove(item.id)}
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#6834b7] text-white hover:bg-[#5a2da0]"
                    onClick={() => remove(item.id)}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Approve & post
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── View: Fix Rejected Replies ───────────────────────────────────────────────

function FixRejectedRepliesContent() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#1e2229]">
      <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35]">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[17px] font-semibold text-[#111827] dark:text-[#e4e4e4]">Fix rejected replies</h1>
          <p className="text-[12px] text-[#555] dark:text-[#8b92a5]">
            {REJECTED_REPLIES.length} {REJECTED_REPLIES.length === 1 ? "reply was" : "replies were"} rejected and need to be revised
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-4 pt-5">
          {REJECTED_REPLIES.map((item) => (
            <div key={item.id} className="border border-[#fee2e2] dark:border-[#3d1515] rounded-[12px] p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <SiteLogo site={item.site} />
                <div className="flex flex-col gap-[2px]">
                  <StarRating rating={item.rating} size={14} />
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-[#212121] dark:text-[#e4e4e4]">{item.reviewer}</span>
                    <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                    <span className="text-[#555] dark:text-[#8b92a5]">{item.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-[14px] text-[#555] dark:text-[#8b92a5] leading-[20px] italic">"{item.reviewText}"</p>
              <div className="bg-[#fff5f5] dark:bg-[#2d1515] border border-[#fee2e2] dark:border-[#3d1515] rounded-[8px] p-4 flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#e53e3e] shrink-0" />
                  <span className="text-[12px] text-[#e53e3e] font-medium">
                    Rejected by {item.rejectedBy} · {item.rejectedAt}
                  </span>
                </div>
                <p className="text-[14px] text-[#9ba2b0] leading-[20px] line-through">{item.rejectedReply}</p>
                <p className="text-[12px] text-[#e53e3e]">Reason: {item.rejectionReason}</p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">Edit manually</Button>
                <Button size="sm" className="bg-[#6834b7] text-white hover:bg-[#5a2da0]">
                  Regenerate reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── View: View Scheduled Replies ─────────────────────────────────────────────

function ScheduledRepliesContent() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#1e2229]">
      <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35]">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[17px] font-semibold text-[#111827] dark:text-[#e4e4e4]">Scheduled replies</h1>
          <p className="text-[12px] text-[#555] dark:text-[#8b92a5]">
            {SCHEDULED_REPLIES.length} {SCHEDULED_REPLIES.length === 1 ? "reply is" : "replies are"} scheduled to be posted
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-4 pt-5">
          {SCHEDULED_REPLIES.map((item) => (
            <div key={item.id} className="border border-[#e5e9f0] dark:border-[#2e3340] rounded-[12px] p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <SiteLogo site={item.site} />
                  <div className="flex flex-col gap-[2px]">
                    <StarRating rating={item.rating} size={14} />
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="text-[#212121] dark:text-[#e4e4e4]">{item.reviewer}</span>
                      <div className="size-[3px] rounded-full bg-[#555] dark:bg-[#8b92a5]" />
                      <span className="text-[#555] dark:text-[#8b92a5]">{item.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-[#eff6ff] dark:bg-[#1e2d5e] px-2.5 py-1 rounded-full shrink-0">
                  <Clock className="w-3 h-3 text-[#2552ED]" />
                  <span className="text-[11px] text-[#2552ED] font-medium">{item.scheduledAt}</span>
                </div>
              </div>
              <p className="text-[14px] text-[#555] dark:text-[#8b92a5] leading-[20px] italic">"{item.reviewText}"</p>
              <div className="bg-[#f9f7fd] dark:bg-[#1e1a2e] rounded-[8px] p-4">
                <p className="text-[12px] text-[#555] dark:text-[#8b92a5] mb-2">Scheduled by {item.scheduledBy}</p>
                <p className="text-[14px] text-[#212121] dark:text-[#d0d0d0] leading-[20px]">{item.scheduledReply}</p>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" className="text-[#e53e3e]">Cancel</Button>
                <Button variant="outline" size="sm">Edit</Button>
                <Button size="sm" className="bg-[#6834b7] text-white hover:bg-[#5a2da0]">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Send now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── View: Reports — Overview ─────────────────────────────────────────────────

function ReviewsOverviewContent() {
  const kpis = [
    { label: "Total reviews", value: "832", trend: "+12%", positive: true, Icon: MessageSquare },
    { label: "Average rating", value: "4.1", trend: "+0.2", positive: true, Icon: Star },
    { label: "Reply rate", value: "78%", trend: "+5%", positive: true, Icon: ThumbsUp },
    { label: "Pending replies", value: "24", trend: "-8", positive: false, Icon: Clock },
  ];

  const ratingDist = [
    { stars: 5, count: 420, pct: 50 },
    { stars: 4, count: 245, pct: 29 },
    { stars: 3, count: 98, pct: 12 },
    { stars: 2, count: 42, pct: 5 },
    { stars: 1, count: 27, pct: 4 },
  ];

  const sources = [
    { name: "Google", reviews: 512, pct: 62, color: "#4285F4" },
    { name: "Yelp", reviews: 187, pct: 22, color: "#FF1A1A" },
    { name: "Facebook", reviews: 89, pct: 11, color: "#1877F2" },
    { name: "TripAdvisor", reviews: 44, pct: 5, color: "#34E0A1" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f8f9fb] dark:bg-[#181c24] overflow-y-auto">
      <div className="px-6 py-4 shrink-0 bg-white dark:bg-[#1e2229] border-b border-[#e5e9f0] dark:border-[#252b35]">
        <h1 className="text-[17px] font-semibold text-[#111827] dark:text-[#e4e4e4]">Overview</h1>
        <p className="text-[12px] text-[#555] dark:text-[#8b92a5] mt-0.5">
          Performance across all review platforms · Last 30 days
        </p>
      </div>

      <div className="flex-1 p-6 space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map(({ label, value, trend, positive, Icon }) => (
            <div key={label} className="bg-white dark:bg-[#1e2229] rounded-[12px] border border-[#e5e9f0] dark:border-[#252b35] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] text-[#6b7280] dark:text-[#9ba2b0]">{label}</span>
                <div className="w-8 h-8 rounded-[8px] bg-[#f0f4ff] dark:bg-[#1e2d5e] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#2552ED]" />
                </div>
              </div>
              <div className="text-[24px] font-bold text-[#111827] dark:text-[#f3f4f6] tracking-tight leading-none mb-1">
                {value}
              </div>
              <div className={`flex items-center gap-0.5 text-[12px] ${positive ? "text-[#10b981]" : "text-[#e53e3e]"}`}>
                <TrendingUp className="w-3 h-3" />
                <span>{trend} vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Rating distribution */}
          <div className="bg-white dark:bg-[#1e2229] rounded-[12px] border border-[#e5e9f0] dark:border-[#252b35] p-5">
            <h3 className="text-[14px] font-semibold text-[#111827] dark:text-[#f3f4f6] mb-4">Rating distribution</h3>
            <div className="space-y-3">
              {ratingDist.map(({ stars, count, pct }) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 w-[52px] shrink-0">
                    <Star className="w-3 h-3 fill-[#f57c00] text-[#f57c00]" />
                    <span className="text-[12px] text-[#555] dark:text-[#8b92a5] ml-0.5">{stars}</span>
                  </div>
                  <div className="flex-1 h-2 bg-[#f3f4f6] dark:bg-[#252b35] rounded-full overflow-hidden">
                    <div className="h-full bg-[#f57c00] rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[12px] text-[#555] dark:text-[#8b92a5] w-8 text-right shrink-0">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews by source */}
          <div className="bg-white dark:bg-[#1e2229] rounded-[12px] border border-[#e5e9f0] dark:border-[#252b35] p-5">
            <h3 className="text-[14px] font-semibold text-[#111827] dark:text-[#f3f4f6] mb-4">Reviews by source</h3>
            <div className="space-y-4">
              {sources.map(({ name, reviews, pct, color }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[#212121] dark:text-[#e4e4e4]">{name}</span>
                    <span className="text-[#555] dark:text-[#8b92a5]">{reviews} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#f3f4f6] dark:bg-[#252b35] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent reviews */}
        <div className="bg-white dark:bg-[#1e2229] rounded-[12px] border border-[#e5e9f0] dark:border-[#252b35] p-5">
          <h3 className="text-[14px] font-semibold text-[#111827] dark:text-[#f3f4f6] mb-3">Recent reviews</h3>
          <div className="divide-y divide-[#f3f4f6] dark:divide-[#252b35]">
            {ALL_MOCK_REVIEWS.slice(0, 4).map((review) => (
              <div key={review.id} className="py-3 flex items-start gap-3">
                <SiteLogo site={review.site} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-medium text-[#212121] dark:text-[#e4e4e4]">{review.reviewer}</span>
                    <StarRating rating={review.rating} size={11} />
                    <span className="text-[11px] text-[#9ba2b0]">{review.date}</span>
                  </div>
                  <p className="text-[13px] text-[#555] dark:text-[#8b92a5] truncate">{review.text}</p>
                </div>
                <Badge
                  variant={review.replyStatus === "edit" ? "secondary" : "outline"}
                  className="shrink-0 text-[11px]"
                >
                  {review.replyStatus === "edit" ? "Replied" : "Needs reply"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root: ReviewsView ────────────────────────────────────────────────────────

export function ReviewsView() {
  const activeItem = useActiveL2Item();

  if (!activeItem || activeItem === "Actions/View all reviews") return <AllReviewsContent />;
  if (activeItem === "Actions/Respond to reviews") return <RespondToReviewsContent />;
  if (activeItem === "Actions/Approve replies") return <ApproveRepliesContent />;
  if (activeItem === "Actions/Fix rejected replies") return <FixRejectedRepliesContent />;
  if (activeItem === "Actions/View scheduled replies") return <ScheduledRepliesContent />;
  if (activeItem === "Reports/Overview") return <ReviewsOverviewContent />;
  if (activeItem === "Agents/Review response agents") return <ReviewResponseAgentsView />;

  return <ModuleEmptyState moduleName="Reviews" activeL2Key={activeItem} />;
}
