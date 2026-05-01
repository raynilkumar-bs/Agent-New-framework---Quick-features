import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, MoreHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const imgFrame1000003570 = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format";
const imgFrame1000003571 = "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&auto=format";
const imgFrame1000003572 = "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format";
const imgFrame1000003573 = "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&auto=format";
const imgFrame1000003574 = "https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop&auto=format";
const imgRectangle4668 = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format";
const imgRectangle4669 = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format";
const imgBitmapCopy1 = "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop&auto=format";

/* ─── Platform icons ─── */
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#337FFF" />
      <path
        d="M10.5 8.5h-1.75v4h-2v-4H5.5v-2h1.25V5.25c0-1.25.75-2 1.875-2H10v1.75H9.125c-.375 0-.375.188-.375.5V6.5H10.5l-.25 2z"
        fill="white"
      />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="16" x2="16" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="16" height="16" rx="4" fill="url(#ig-grad)" />
      <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.2" fill="none" />
      <circle cx="11.5" cy="4.5" r="0.8" fill="white" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#1DA1F2" />
      <path
        d="M12 5.5c-.35.15-.72.26-1.1.3.4-.23.7-.6.85-1.05-.37.22-.78.38-1.22.47A1.93 1.93 0 009.2 4.5c-1.06 0-1.93.87-1.93 1.93 0 .15.02.3.05.44A5.48 5.48 0 014.3 5.1a1.93 1.93 0 00.6 2.58c-.32-.01-.62-.1-.88-.24v.02c0 .94.67 1.72 1.55 1.9a1.93 1.93 0 01-.87.03c.24.76.95 1.32 1.79 1.33A3.87 3.87 0 014 11.5a5.47 5.47 0 002.97.87c3.56 0 5.5-2.95 5.5-5.5v-.25c.38-.27.7-.61.96-1 0 0-.44.2-.93.3z"
        fill="white"
      />
    </svg>
  );
}

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="white" />
      <path d="M11.8 8.1c0-.4 0-.7-.1-1H8v1.9h2.1c-.1.5-.4.9-.8 1.2v1h1.3c.8-.7 1.2-1.8 1.2-3.1z" fill="#4285F4" />
      <path d="M8 12c1.1 0 2-.4 2.6-1l-1.3-1c-.4.2-.8.4-1.3.4-1 0-1.9-.7-2.2-1.6H4.5v1C5.1 11.2 6.5 12 8 12z" fill="#34A853" />
      <path d="M5.8 8.8c-.1-.3-.1-.6 0-.9v-1H4.5c-.3.7-.3 1.5 0 2.2l1.3-1z" fill="#FBBC05" />
      <path d="M8 5.4c.6 0 1.1.2 1.5.6l1.1-1.1C10 4.3 9.1 4 8 4c-1.5 0-2.9.8-3.5 2.1l1.3 1c.3-.9 1.2-1.7 2.2-1.7z" fill="#EA4335" />
    </svg>
  );
}

/* ─── Post action icons (inline SVGs) ─── */
function EditIcon() {
  return (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 12 12" fill="none">
      <path
        d="M8.38.58a1.92 1.92 0 012.83 0 1.92 1.92 0 010 2.83L3.78 10.83l-3.22.94.94-3.22L8.38.58z"
        stroke="currentColor" strokeWidth="1" fill="none"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
      <path
        d="M1 5h12M4 1v2m6-2v2M2 3h10a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z"
        stroke="currentColor" strokeWidth="1" fill="none"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
      <path
        d="M13.88 3.34a1.06 1.06 0 00-.36-.37L.56.06A.56.56 0 00.01.57l.78 5.06 6.6.37-6.6.37-.78 5.06a.56.56 0 00.55.51.56.56 0 00.24-.06l12.95-5.91a.56.56 0 00.14-.92z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ─── AI indicator ─── */
function AiIndicator({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#f0edff] dark:bg-[#2d2050]">
        <Sparkles className="w-[10px] h-[10px] text-[#7c3aed]" />
        <span className="text-[10px] text-[#7c3aed]" style={{ fontWeight: 400 }}>AI</span>
      </div>
      <span className="text-[10px] text-[#999] dark:text-[#6b7280]">{time}</span>
    </div>
  );
}

/* ─── Types ─── */
type Platform = "facebook" | "instagram" | "twitter" | "google";
type ViewMode = "list" | "week" | "month";

interface PostCard {
  id: string;
  time: string;
  platform: Platform;
  text: string;
  image?: string;
  aiScheduled?: { time: string }[];
}

/* ─── Mock data ─── */
const WEEK_DAYS = [
  { label: "Sun", date: 1 },
  { label: "Mon", date: 2 },
  { label: "Tue", date: 3 },
  { label: "Wed", date: 4, isToday: true },
  { label: "Thu", date: 5 },
  { label: "Fri", date: 6 },
  { label: "Sat", date: 7 },
];

const POST_TEXT = "McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a McDonald's store or download the McDelivery App to order online McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a lon…";
const POST_TEXT_SHORT = "McDonald's meals in every celebration that brings smiles, happiness, and tog…";

const postsData: Record<number, PostCard[]> = {
  1: [
    { id: "s1-1", time: "12:00 AM", platform: "facebook", text: POST_TEXT },
    { id: "s1-2", time: "12:00 AM", platform: "facebook", text: POST_TEXT },
  ],
  2: [
    {
      id: "s2-1", time: "10:28 AM", platform: "facebook", text: POST_TEXT_SHORT,
      image: imgFrame1000003570,
    },
    {
      id: "s2-2", time: "12:00 AM", platform: "facebook", text: "McDonald's meals in every celebration that brings smiles, happiness, and togetherness.",
    },
  ],
  3: [
    { id: "s3-1", time: "12:00 AM", platform: "instagram", text: POST_TEXT_SHORT,
      image: imgRectangle4668,
    },
    {
      id: "s3-2", time: "12:00 AM", platform: "twitter", text: "McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a McDonald's store or download the McDelivery App to order online McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a lon…",
    },
  ],
  4: [
    {
      id: "s4-1", time: "10:28 AM", platform: "facebook", text: POST_TEXT_SHORT,
      image: imgFrame1000003571,
    },
    {
      id: "s4-2", time: "12:00 AM", platform: "facebook", text: POST_TEXT_SHORT,
      aiScheduled: [{ time: "12:48 PM" }],
    },
  ],
  5: [
    {
      id: "s5-1", time: "10:28 AM", platform: "facebook", text: POST_TEXT_SHORT,
      image: imgFrame1000003572,
    },
    {
      id: "s5-2", time: "12:50 PM", platform: "facebook",
      text: "McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a McDonald's store or download the McDelivery App to order online McDonald's meals in every celebration that brings smiles, happiness, and togetherness.",
      aiScheduled: [{ time: "6:48 PM" }],
    },
  ],
  6: [
    {
      id: "s6-1", time: "12:48 PM", platform: "facebook", text: POST_TEXT_SHORT,
      image: imgFrame1000003573,
      aiScheduled: [{ time: "10:48 PM" }, { time: "6:48 PM" }, { time: "8:48 PM" }],
    },
    {
      id: "s6-2", time: "12:48 PM", platform: "facebook", text: POST_TEXT_SHORT,
      image: imgRectangle4669,
    },
  ],
  7: [
    { id: "s7-1", time: "12:00 AM", platform: "facebook", text: POST_TEXT_SHORT },
    {
      id: "s7-2", time: "10:28 AM", platform: "facebook", text: "McDonald's meals in every celebration that brings smiles, happiness, and tog…",
      image: imgFrame1000003574,
      aiScheduled: [{ time: "9:48 AM" }],
    },
    {
      id: "s7-3", time: "12:00 AM", platform: "facebook",
      text: "McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a McDonald's store or download the McDelivery App to order online",
      image: imgBitmapCopy1,
      aiScheduled: [{ time: "6:48 PM" }],
    },
  ],
};

/* ─── Platform icon map ─── */
function PlatformIcon({ platform, size = 16 }: { platform: Platform; size?: number }) {
  switch (platform) {
    case "facebook": return <FacebookIcon size={size} />;
    case "instagram": return <InstagramIcon size={size} />;
    case "twitter": return <TwitterIcon size={size} />;
    case "google": return <GoogleIcon size={size} />;
  }
}

/* ─── Single post card ─── */
function PostCardComponent({ post }: { post: PostCard }) {
  const maxTextLen = post.image ? 80 : 260;
  const displayText = post.text.length > maxTextLen ? post.text.slice(0, maxTextLen) + "…" : post.text;

  return (
    <div className="bg-[#f4f6f7] dark:bg-[#22262f] rounded-[6px] border border-[#e9e9eb] dark:border-[#333a47] p-2 flex flex-col gap-2 transition-colors">
      {/* Time */}
      <span className="text-[10px] text-[#555] dark:text-[#8b92a5]">{post.time}</span>

      {/* Platform icon */}
      <PlatformIcon platform={post.platform} size={16} />

      {/* Post text */}
      <p className="text-[10px] text-[#212121] dark:text-[#c0c6d4] leading-[1.4]" style={{ fontWeight: 400 }}>
        {displayText}
      </p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post media"
          className="w-full rounded-[4px] object-cover max-h-[100px]"
        />
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <button className="p-0.5 text-[#555] dark:text-[#8b92a5] hover:text-[#212121] dark:hover:text-[#e4e4e4] transition-colors">
            <EditIcon />
          </button>
          <button className="p-0.5 text-[#555] dark:text-[#8b92a5] hover:text-[#212121] dark:hover:text-[#e4e4e4] transition-colors">
            <CalendarIcon />
          </button>
        </div>
        <button className="p-0.5 text-[#555] dark:text-[#8b92a5] hover:text-[#212121] dark:hover:text-[#e4e4e4] transition-colors -rotate-90">
          <MoreHorizontal className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* AI scheduled */}
      {post.aiScheduled?.map((ai, idx) => (
        <AiIndicator key={idx} time={ai.time} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Social View – Main export
   ═══════════════════════════════════════════ */
export function SocialView() {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [currentMonth] = useState("April 2024");

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        {/* Left: month nav */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-[14px] h-[14px] text-[#303030] dark:text-[#c0c6d4]" />
          </Button>
          <span className="text-[17px] text-[#212121] dark:text-[#e4e4e4] mx-1" style={{ fontWeight: 400 }}>
            {currentMonth}
          </span>
          <Button variant="ghost" size="icon">
            <ChevronRight className="w-[14px] h-[14px] text-[#303030] dark:text-[#c0c6d4]" />
          </Button>
          <Button variant="ghost" className="ml-2 text-[#1976d2] hover:bg-[#e8effe] dark:hover:bg-[#1e2d5e]">
            Today
          </Button>
        </div>

        {/* Right: view toggle + filter */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] p-1">
            {(["list", "week", "month"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2 py-0.5 text-[13px] rounded-[4px] capitalize transition-colors ${
                  viewMode === mode
                    ? "bg-[#e5e9f0] dark:bg-[#333a47] text-[#212121] dark:text-[#e4e4e4]"
                    : "text-[#555] dark:text-[#8b92a5] hover:text-[#212121] dark:hover:text-[#e4e4e4]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Filter button */}
          <Button variant="outline" size="icon">
            <Filter className="w-[14px] h-[14px]" />
          </Button>
        </div>
      </div>

      {/* ─── Calendar grid ─── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Day headers */}
        <div className="flex shrink-0 border-b border-[#e9e9eb] dark:border-[#333a47]">
          {WEEK_DAYS.map((day) => (
            <div
              key={day.date}
              className="flex-1 flex items-center justify-center py-3 bg-white dark:bg-[#1e2229]"
            >
              {day.isToday ? (
                <div className="flex items-center gap-1">
                  <span className="text-[13px] text-[#125598] dark:text-[#6b9bff]">{day.label}</span>
                  <span className="w-[20px] h-[20px] rounded-full bg-[#125598] dark:bg-[#2552ED] text-white text-[11px] flex items-center justify-center" style={{ fontWeight: 400 }}>
                    {day.date}
                  </span>
                </div>
              ) : (
                <span className="text-[13px] text-[#555] dark:text-[#8b92a5]">
                  {day.label} {day.date}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Day columns with posts */}
        <div className="flex flex-1 min-h-0 overflow-y-auto">
          {WEEK_DAYS.map((day) => {
            const posts = postsData[day.date] || [];
            return (
              <div
                key={day.date}
                className={`flex-1 border-r border-[#e9e9eb] dark:border-[#333a47] last:border-r-0 p-2 flex flex-col gap-2 min-w-0 ${
                  day.isToday ? "bg-white dark:bg-[#1e2229]" : "bg-[#f9fafb] dark:bg-[#181b22]"
                }`}
              >
                {posts.map((post) => (
                  <PostCardComponent key={post.id} post={post} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}