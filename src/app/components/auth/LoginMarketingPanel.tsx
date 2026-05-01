import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";

// ─── AI platform SVG paths ─────────────────────────────────────────────────
// Source: simple-icons (npm package, CC0 licensed). Run `npm update simple-icons`
// to pick up logo refreshes when platforms rebrand.
//
// OpenAI/ChatGPT: not in simple-icons (trademark removed); using well-known
// public path used across open-source projects.

const OPENAI_PATH =
  "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 22.4a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 21.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.64 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z";

// simple-icons paths (viewBox 0 0 24 24)
const GEMINI_PATH =
  "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81";

const PERPLEXITY_PATH =
  "M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z";

// ─── Platform registry (login hero cycle) ──────────────────────────────────
const PLATFORMS = [
  { label: "ChatGPT", hex: "#000000", darkHex: "#ffffff", path: OPENAI_PATH },
  { label: "Perplexity", hex: "#1FB8CD", darkHex: "#4dd4e8", path: PERPLEXITY_PATH },
  { label: "Gemini", hex: "#8E75B2", darkHex: "#b39dd4", path: GEMINI_PATH },
] as const;

const CYCLE_MS = 2600;

const SEARCH_AI_SIGN_IN_CTA_URL =
  "https://birdeye.com/search-ai/?utm_term=sign_in_page_try_search_ai";

/**
 * Right column for login — Search AI themed.
 * Headline cycles through AI engine logos and names (inline SVG from simple-icons).
 * Pure CSS blobs, no image dependency.
 */
export function LoginMarketingPanel({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % PLATFORMS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const platform = PLATFORMS[idx];

  return (
    <div
      className={cn(
        "hidden h-full min-h-0 w-full flex-col p-6 lg:flex lg:w-1/2 lg:min-w-0 lg:shrink-0",
        className,
      )}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[#f7f5ff] ring-1 ring-border/40 dark:bg-[#17161e]">

        {/* Blob — top-left lavender */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full opacity-70 dark:opacity-20"
          style={{ background: "radial-gradient(ellipse at center, #ddd6fe 0%, transparent 65%)" }}
        />
        {/* Blob — bottom-right blue */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full opacity-55 dark:opacity-15"
          style={{ background: "radial-gradient(ellipse at center, #bfdbfe 0%, transparent 65%)" }}
        />

        {/* Content — +10% vs prior step (ChatGPT / Perplexity / Gemini cycle) */}
        <div className="relative z-10 flex flex-col items-center gap-[2.40625rem] px-[4.125rem] text-center">

          {/* "Search AI" badge */}
          <div className="inline-flex items-center gap-[0.55rem] rounded-full bg-violet-50/90 px-[1.375rem] py-[11px] text-[19.25px] font-medium leading-none text-violet-700 ring-1 ring-violet-300/60 backdrop-blur-sm dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-600/40">
            <Search className="h-[22px] w-[22px] shrink-0" strokeWidth={2.2} aria-hidden />
            Search AI
          </div>

          {/* Headline + cycling platform */}
          <div className="flex flex-col items-center gap-[0.55rem]">
            <p className="text-[3.575rem] font-black leading-[1.07] tracking-tight text-[#1a1a1a] dark:text-[#f0efff]">
              Be the #1 Answer
            </p>
            <p className="text-[3.575rem] font-black leading-[1.07] tracking-tight text-[#1a1a1a] dark:text-[#f0efff]">
              for every location on
            </p>

            {/* Fixed-height cycling row: logo + name */}
            <div className="relative flex h-[4.4rem] w-full items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-[11px]"
                  style={{ color: platform.hex }}
                >
                  <svg width={53} height={53} viewBox="0 0 24 24" aria-hidden className="shrink-0" fill={platform.hex}>
                    <path d={platform.path} />
                  </svg>
                  <span className="text-[3.575rem] font-black leading-[1.07] tracking-tight">
                    {platform.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitle */}
          <p className="max-w-[440px] text-[20.625px] leading-relaxed text-[#555] dark:text-[#9ba2b0]">
            AI agents that track visibility and act on what&apos;s missing—across every location.
          </p>

          {/* CTA — Search AI marketing page (new tab) */}
          <Button
            asChild
            className="h-[66px] min-w-[302.5px] rounded-xl bg-gradient-to-r from-[#5b73f5] to-[#7c4fe0] px-[2.2rem] text-[1.2375rem] font-semibold text-white hover:from-[#4c65e8] hover:to-[#6e42d3] border-0"
          >
            <a href={SEARCH_AI_SIGN_IN_CTA_URL} target="_blank" rel="noopener noreferrer">
              Try Search AI
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
