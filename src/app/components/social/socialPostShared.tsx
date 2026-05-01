import { useId } from "react";
import { Sparkles } from "lucide-react";

export type SocialPostPlatform = "facebook" | "instagram" | "twitter" | "google";

export interface SocialCalendarPost {
  id: string;
  time: string;
  platform: SocialPostPlatform;
  text: string;
  image?: string;
  aiScheduled?: { time: string }[];
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="#337FFF" />
      <path
        d="M10.5 8.5h-1.75v4h-2v-4H5.5v-2h1.25V5.25c0-1.25.75-2 1.875-2H10v1.75H9.125c-.375 0-.375.188-.375.5V6.5H10.5l-.25 2z"
        fill="white"
      />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`ig-grad-${gid}`} x1="0" y1="16" x2="16" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="16" height="16" rx="4" fill={`url(#ig-grad-${gid})`} />
      <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="1.2" fill="none" />
      <circle cx="11.5" cy="4.5" r="0.8" fill="white" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
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
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="white" />
      <path d="M11.8 8.1c0-.4 0-.7-.1-1H8v1.9h2.1c-.1.5-.4.9-.8 1.2v1h1.3c.8-.7 1.2-1.8 1.2-3.1z" fill="#4285F4" />
      <path d="M8 12c1.1 0 2-.4 2.6-1l-1.3-1c-.4.2-.8.4-1.3.4-1 0-1.9-.7-2.2-1.6H4.5v1C5.1 11.2 6.5 12 8 12z" fill="#34A853" />
      <path d="M5.8 8.8c-.1-.3-.1-.6 0-.9v-1H4.5c-.3.7-.3 1.5 0 2.2l1.3-1z" fill="#FBBC05" />
      <path d="M8 5.4c.6 0 1.1.2 1.5.6l1.1-1.1C10 4.3 9.1 4 8 4c-1.5 0-2.9.8-3.5 2.1l1.3 1c.3-.9 1.2-1.7 2.2-1.7z" fill="#EA4335" />
    </svg>
  );
}

export function SocialPostPlatformIcon({
  platform,
  size = 16,
}: {
  platform: SocialPostPlatform;
  size?: number;
}) {
  switch (platform) {
    case "facebook":
      return <FacebookIcon size={size} />;
    case "instagram":
      return <InstagramIcon size={size} />;
    case "twitter":
      return <TwitterIcon size={size} />;
    case "google":
      return <GoogleIcon size={size} />;
  }
}

export function socialPostPlatformLabel(platform: SocialPostPlatform): string {
  switch (platform) {
    case "facebook":
      return "Facebook";
    case "instagram":
      return "Instagram";
    case "twitter":
      return "X (Twitter)";
    case "google":
      return "Google";
  }
}

function AiScheduleRow({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2 py-2">
      <div className="flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 dark:bg-primary/20">
        <Sparkles className="size-3 shrink-0 text-primary" strokeWidth={1.6} absoluteStrokeWidth aria-hidden />
        <span className="text-xs font-medium text-primary">AI</span>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}

export function SocialPostPreviewBody({
  post,
  variant,
}: {
  post: SocialCalendarPost;
  variant: "compact" | "drawer";
}) {
  const maxTextLen = variant === "compact" ? (post.image ? 80 : 260) : Number.POSITIVE_INFINITY;
  const displayText =
    variant === "compact" && post.text.length > maxTextLen
      ? `${post.text.slice(0, maxTextLen)}…`
      : post.text;

  const textClass =
    variant === "compact"
      ? "text-[10px] text-[#212121] dark:text-[#c0c6d4] leading-[1.4]"
      : "text-sm leading-relaxed text-foreground";

  const imageClass =
    variant === "compact"
      ? "w-full max-h-[100px] rounded object-cover"
      : "w-full max-h-56 rounded-lg border border-border object-cover";

  if (variant === "drawer") {
    return (
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2" aria-labelledby="social-post-preview-heading">
          <h2 id="social-post-preview-heading" className="text-base font-semibold text-foreground">
            Preview
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.time}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-2">
              <SocialPostPlatformIcon platform={post.platform} size={18} />
              {socialPostPlatformLabel(post.platform)}
            </span>
          </div>
          <p className={textClass}>{displayText}</p>
          {post.image ? (
            <img src={post.image} alt="" className={imageClass} />
          ) : null}
        </section>

        {post.aiScheduled && post.aiScheduled.length > 0 ? (
          <section className="flex flex-col gap-2" aria-labelledby="social-post-ai-heading">
            <h2 id="social-post-ai-heading" className="text-base font-semibold text-foreground">
              AI schedule
            </h2>
            <div className="flex flex-col gap-2">
              {post.aiScheduled.map((ai, idx) => (
                <AiScheduleRow key={idx} time={ai.time} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <span className="text-[10px] text-[#555] dark:text-[#8b92a5]">{post.time}</span>
      <SocialPostPlatformIcon platform={post.platform} size={16} />
      <p className={textClass} style={{ fontWeight: 400 }}>
        {displayText}
      </p>
      {post.image ? <img src={post.image} alt="Post media" className={imageClass} /> : null}
      {post.aiScheduled?.map((ai, idx) => (
        <div key={idx} className="flex items-center gap-1.5 mt-1">
          <div className="flex items-center gap-1 rounded bg-[#f0edff] px-1.5 py-0.5 dark:bg-[#2d2050]">
            <Sparkles className="h-[10px] w-[10px] text-[#7c3aed]" strokeWidth={1.6} absoluteStrokeWidth aria-hidden />
            <span className="text-[10px] text-[#7c3aed]" style={{ fontWeight: 400 }}>
              AI
            </span>
          </div>
          <span className="text-[10px] text-[#999] dark:text-[#6b7280]">{ai.time}</span>
        </div>
      ))}
    </>
  );
}
