import {
  useCallback, useEffect, useRef, useState,
} from "react";
import {
  Play, Pause, SkipBack, SkipForward, Globe, TicketIcon,
  Volume2, VolumeX, Sparkles, CheckSquare, Square,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import {
  FLOATING_SHEET_FRAME_CONTENT_CLASS,
  FloatingSheetFrame,
} from "@/app/components/layout/FloatingSheetFrame";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/components/ui/utils";
import type {
  CallRecord, CallMarker, CallTranscriptMessage, Language, CallOutcome,
} from "./callRecordingData";

/* ─── Helpers ───────────────────────────────────────────────── */
function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Deterministic waveform from a numeric seed. */
function seededWaveform(seed: number, bars = 80): number[] {
  return Array.from({ length: bars }, (_, i) => {
    const x = Math.abs(Math.sin(seed * 127.1 + i * 311.7) * 43758.5) % 1;
    const env = Math.sin(Math.PI * (i / bars));
    return 0.08 + x * 0.72 * (0.35 + env * 0.65);
  });
}

const OUTCOME_STYLES: Record<CallOutcome, { label: string; cls: string }> = {
  resolved:   { label: "Resolved",   cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800" },
  escalated:  { label: "Escalated",  cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800" },
  "follow-up":{ label: "Follow-up",  cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800" },
};

const MARKER_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  problem:    { dot: "bg-red-500",     bg: "bg-red-50 dark:bg-red-950/60",     text: "text-red-700 dark:text-red-400" },
  info:       { dot: "bg-blue-500",    bg: "bg-blue-50 dark:bg-blue-950/60",   text: "text-blue-700 dark:text-blue-400" },
  escalation: { dot: "bg-amber-500",   bg: "bg-amber-50 dark:bg-amber-950/60", text: "text-amber-700 dark:text-amber-400" },
  resolution: { dot: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/60", text: "text-emerald-700 dark:text-emerald-400" },
};

const LANG_OPTIONS: { label: string; value: Language }[] = [
  { label: "English", value: "en" },
  { label: "French",  value: "fr" },
  { label: "Spanish", value: "es" },
];

const SPEED_OPTIONS = [
  { label: "1×",   value: 1 },
  { label: "2.5×", value: 2.5 },
  { label: "3×",   value: 3 },
];

/* ─── Speech Synthesis helpers ──────────────────────────────── */
function pickVoice(isAgent: boolean): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const enVoices = voices.filter((v) => v.lang.startsWith("en"));

  if (isAgent) {
    // Prefer common female English voices
    const preferred = ["Samantha", "Karen", "Victoria", "Ava", "Tessa", "Fiona"];
    const match = enVoices.find((v) => preferred.some((n) => v.name.includes(n)));
    return match ?? enVoices[0] ?? null;
  } else {
    // Prefer common male English voices
    const preferred = ["Alex", "Daniel", "Tom", "Fred", "Oliver", "Aaron"];
    const match = enVoices.find((v) => preferred.some((n) => v.name.includes(n)));
    return match ?? enVoices[1] ?? enVoices[0] ?? null;
  }
}

function speakLine(text: string, isAgent: boolean, rate: number, muted: boolean) {
  if (muted || typeof window === "undefined" || !window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate   = Math.min(Math.max(rate, 0.5), 3);
  utt.pitch  = isAgent ? 1.05 : 0.9;
  utt.volume = 0.85;
  const voice = pickVoice(isAgent);
  if (voice) utt.voice = voice;
  window.speechSynthesis.speak(utt);
}

/* ─── Playback hook ─────────────────────────────────────────── */
function useCallPlayer(record: CallRecord) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [speed,       setSpeedState]  = useState(1);
  const [language,    setLanguage]    = useState<Language>("en");
  const [activeMsgIdx, setActiveMsgIdx] = useState(0);
  const [muted,       setMuted]       = useState(false);

  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const tRef          = useRef(0);
  const isPlayingRef  = useRef(false);
  const speedRef      = useRef(1);
  const mutedRef      = useRef(false);
  const languageRef   = useRef<Language>("en");
  const spokenRef     = useRef<Set<string>>(new Set());

  // Sync refs
  useEffect(() => { tRef.current         = currentTime; }, [currentTime]);
  useEffect(() => { isPlayingRef.current = isPlaying;   }, [isPlaying]);
  useEffect(() => { speedRef.current     = speed;       }, [speed]);
  useEffect(() => { mutedRef.current     = muted;       }, [muted]);
  useEffect(() => { languageRef.current  = language;    }, [language]);

  const getActiveMsgIdx = useCallback((t: number) => {
    let idx = 0;
    for (let i = 0; i < record.messages.length; i++) {
      if (record.messages[i].timestampSec <= t) idx = i;
      else break;
    }
    return idx;
  }, [record.messages]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const stopSpeech = useCallback(() => {
    try { window.speechSynthesis?.cancel(); } catch { /* ignore */ }
  }, []);

  const stopAll = useCallback(() => { stopTimer(); stopSpeech(); }, [stopTimer, stopSpeech]);

  const startTimer = useCallback((fromT: number) => {
    stopAll();
    spokenRef.current = new Set(
      record.messages.filter((m) => m.timestampSec < fromT).map((m) => m.id),
    );
    setActiveMsgIdx(getActiveMsgIdx(fromT));

    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const spd  = speedRef.current;
        const next = Math.min(prev + 0.1 * spd, record.durationSec);

        // Speak new messages as playhead passes their timestamp
        for (const msg of record.messages) {
          if (!spokenRef.current.has(msg.id) && msg.timestampSec <= next) {
            spokenRef.current.add(msg.id);
            setActiveMsgIdx(record.messages.indexOf(msg));
            speakLine(
              msg.translations[languageRef.current],
              msg.sender === "agent",
              spd,
              mutedRef.current,
            );
          }
        }

        if (next >= record.durationSec) {
          stopAll();
          setIsPlaying(false);
        }
        return next;
      });
    }, 100);

    setIsPlaying(true);
  }, [record.messages, record.durationSec, stopAll, getActiveMsgIdx]);

  const play = useCallback(() => {
    const from = tRef.current >= record.durationSec ? 0 : tRef.current;
    if (from === 0) { setCurrentTime(0); tRef.current = 0; }
    startTimer(from);
  }, [record.durationSec, startTimer]);

  const pause = useCallback(() => { stopAll(); setIsPlaying(false); }, [stopAll]);

  const seek = useCallback((t: number) => {
    const wasPlaying = isPlayingRef.current;
    stopAll();
    const c = Math.max(0, Math.min(t, record.durationSec));
    setCurrentTime(c); tRef.current = c;
    setActiveMsgIdx(getActiveMsgIdx(c));
    setIsPlaying(false);
    if (wasPlaying) setTimeout(() => startTimer(c), 50);
  }, [record.durationSec, stopAll, getActiveMsgIdx, startTimer]);

  const skipBy = useCallback((delta: number) => {
    seek(tRef.current + delta);
  }, [seek]);

  const setSpeed = useCallback((s: number) => {
    setSpeedState(s);
    speedRef.current = s;
    if (isPlayingRef.current) {
      stopSpeech();
      // Timer already reads speedRef.current so just cancel current speech
    }
  }, [stopSpeech]);

  useEffect(() => () => stopAll(), [stopAll]);

  // Pre-load voices on mount
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    load();
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  return {
    currentTime, isPlaying, speed, language, activeMsgIdx, muted,
    play, pause, seek, skipBy, setSpeed, setLanguage,
    toggleMute: () => {
      const next = !mutedRef.current;
      setMuted(next); mutedRef.current = next;
      if (next) stopSpeech();
    },
  };
}

/* ─── Waveform + Markers ────────────────────────────────────── */
function WaveformSection({
  record, currentTime, onSeek, markers,
}: {
  record: CallRecord;
  currentTime: number;
  onSeek: (t: number) => void;
  markers: CallMarker[];
}) {
  const bars = seededWaveform(record.id.length + record.durationSec, 80);
  const progress = currentTime / record.durationSec;
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
    onSeek(frac * record.durationSec);
  };

  return (
    <div className="px-5 pt-3 pb-2">
      {/* Marker flags row */}
      <div className="relative mb-1 h-7">
        {markers.map((m) => {
          const pct = (m.timestampSec / record.durationSec) * 100;
          const s   = MARKER_STYLES[m.type];
          const hovered = hoveredMarker === m.id;
          return (
            <div
              key={m.id}
              className="absolute top-0 flex flex-col items-center"
              style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
              onMouseEnter={() => setHoveredMarker(m.id)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              {/* Flag dot */}
              <button
                type="button"
                onClick={() => onSeek(m.timestampSec)}
                className={cn(
                  "size-2.5 cursor-pointer rounded-full ring-2 ring-white dark:ring-[#13161b] transition-transform duration-150",
                  s.dot,
                  hovered && "scale-150",
                )}
                aria-label={m.label}
              />
              {/* Tooltip card */}
              {hovered && (
                <div
                  className={cn(
                    "absolute bottom-full mb-2 z-50 w-52 rounded-lg border border-border p-3 shadow-lg",
                    "bg-white dark:bg-[#1e2229] text-[#212121] dark:text-[#e4e4e4]",
                  )}
                  style={{ left: pct > 65 ? "auto" : 0, right: pct > 65 ? 0 : "auto" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={cn("size-1.5 rounded-full shrink-0", s.dot)} />
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-[#999] dark:text-[#6b7280]">
                      {m.type}
                    </span>
                    <span className="ml-auto text-[11px] tabular-nums text-[#999] dark:text-[#6b7280]">
                      {fmt(m.timestampSec)}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium leading-snug">{m.label}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#666] dark:text-[#9ba2b0]">{m.detail}</p>
                  <button
                    onClick={() => onSeek(m.timestampSec)}
                    className={cn(
                      "mt-2 w-full rounded-md py-1 text-[11px] font-medium cursor-pointer transition-colors",
                      s.bg, s.text,
                    )}
                  >
                    Jump to {fmt(m.timestampSec)}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Waveform bars — click to seek */}
      <div
        ref={waveRef}
        role="slider"
        aria-label="Seek audio"
        aria-valuenow={Math.round(currentTime)}
        aria-valuemin={0}
        aria-valuemax={record.durationSec}
        tabIndex={0}
        className="relative flex h-14 cursor-pointer items-end gap-px select-none"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") onSeek(currentTime + 5);
          if (e.key === "ArrowLeft")  onSeek(currentTime - 5);
        }}
      >
        {bars.map((h, i) => {
          const barProgress = i / bars.length;
          const played = barProgress <= progress;
          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-full transition-colors duration-75",
                played
                  ? "bg-[#2552ED] dark:bg-[#4f7ef8]"
                  : "bg-[#dde1e9] dark:bg-[#2e3340]",
              )}
              style={{ height: `${h * 100}%`, minHeight: 2 }}
            />
          );
        })}
        {/* Playhead needle */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 w-0.5 rounded-full bg-[#2552ED] dark:bg-[#4f7ef8] shadow-sm"
          style={{ left: `${progress * 100}%` }}
        />
      </div>

      {/* Time labels */}
      <div className="mt-1 flex justify-between">
        <span className="text-[11px] tabular-nums text-[#999] dark:text-[#6b7280]">{fmt(currentTime)}</span>
        <span className="text-[11px] tabular-nums text-[#999] dark:text-[#6b7280]">{fmt(record.durationSec)}</span>
      </div>
    </div>
  );
}

/* ─── Play controls ─────────────────────────────────────────── */
function PlayControls({
  isPlaying, speed, muted, language, record,
  onPlay, onPause, onSkip, onSpeedChange, onToggleMute, onLanguageChange,
  onCreateTicket,
}: {
  isPlaying: boolean;
  speed: number;
  muted: boolean;
  language: Language;
  record: CallRecord;
  onPlay: () => void;
  onPause: () => void;
  onSkip: (d: number) => void;
  onSpeedChange: (s: number) => void;
  onToggleMute: () => void;
  onLanguageChange: (l: Language) => void;
  onCreateTicket: () => void;
}) {
  return (
    <div className="flex items-center gap-2 px-5 pb-4">
      {/* Play / Pause */}
      <button
        type="button"
        onClick={isPlaying ? onPause : onPlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#2552ED] text-white shadow-sm transition-all hover:bg-[#1E44CC] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2552ED]/50"
      >
        {isPlaying
          ? <Pause  className="size-4 fill-current" />
          : <Play   className="size-4 fill-current translate-x-px" />
        }
      </button>

      {/* Skip back 15s */}
      <button
        type="button"
        onClick={() => onSkip(-15)}
        aria-label="Back 15 seconds"
        className="flex size-7 cursor-pointer items-center justify-center rounded-md text-[#555] dark:text-[#8b92a5] transition-colors hover:bg-[#f0f1f5] dark:hover:bg-[#2e3340]"
      >
        <SkipBack className="size-4" />
      </button>

      {/* Skip forward 15s */}
      <button
        type="button"
        onClick={() => onSkip(15)}
        aria-label="Forward 15 seconds"
        className="flex size-7 cursor-pointer items-center justify-center rounded-md text-[#555] dark:text-[#8b92a5] transition-colors hover:bg-[#f0f1f5] dark:hover:bg-[#2e3340]"
      >
        <SkipForward className="size-4" />
      </button>

      {/* Speed buttons */}
      <div className="flex items-center gap-0.5">
        {SPEED_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSpeedChange(opt.value)}
            className={cn(
              "cursor-pointer rounded-md px-2 py-1 text-[11px] font-medium transition-colors duration-150",
              speed === opt.value
                ? "bg-[#2552ED] text-white"
                : "text-[#555] dark:text-[#8b92a5] hover:bg-[#f0f1f5] dark:hover:bg-[#2e3340]",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Mute */}
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="flex size-7 cursor-pointer items-center justify-center rounded-md text-[#555] dark:text-[#8b92a5] transition-colors hover:bg-[#f0f1f5] dark:hover:bg-[#2e3340]"
      >
        {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
      </button>

      <div className="ml-auto flex items-center gap-2">
        {/* Language */}
        <div className="flex items-center gap-1">
          <Globe className="size-3.5 shrink-0 text-[#999] dark:text-[#6b7280]" />
          <Select value={language} onValueChange={(v) => onLanguageChange(v as Language)}>
            <SelectTrigger size="sm" className="h-7 w-24 text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANG_OPTIONS.map((l) => (
                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Create ticket */}
        <button
          type="button"
          onClick={onCreateTicket}
          className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#e5e9f0] bg-white px-2.5 py-1 text-[12px] text-[#212121] transition-colors hover:bg-[#f5f5f5] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:bg-[#2e3340]"
        >
          <TicketIcon className="size-3" />
          Ticket
        </button>
      </div>
    </div>
  );
}

/* ─── AI Call Summary ───────────────────────────────────────── */
function CallSummary({ record }: { record: CallRecord }) {
  const [expanded, setExpanded] = useState(true);
  const [checked, setChecked]   = useState<Record<string, boolean>>({});

  return (
    <div className="mx-5 mb-4 rounded-xl border border-[#eaeaea] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-[#fafafa] dark:hover:bg-[#252a3a]"
      >
        <Sparkles className="size-3.5 shrink-0 text-[#2552ED]" />
        <span className="flex-1 text-[13px] font-semibold text-[#212121] dark:text-[#e4e4e4]">AI Summary</span>
        {expanded
          ? <ChevronUp   className="size-3.5 text-[#999] dark:text-[#6b7280]" />
          : <ChevronDown className="size-3.5 text-[#999] dark:text-[#6b7280]" />
        }
      </button>

      {expanded && (
        <div className="border-t border-[#eaeaea] dark:border-[#2e3340] px-4 py-3">
          <p className="text-[13px] leading-relaxed text-[#444] dark:text-[#b0b7c3]">
            {record.summary}
          </p>

          {record.actionItems.length > 0 && (
            <div className="mt-3">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#999] dark:text-[#6b7280]">
                Action items
              </p>
              <div className="flex flex-col gap-1.5">
                {record.actionItems.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                    className="flex cursor-pointer items-start gap-2 text-left text-[12px] leading-snug text-[#444] dark:text-[#b0b7c3] transition-colors hover:text-[#212121] dark:hover:text-[#e4e4e4]"
                  >
                    {checked[i]
                      ? <CheckSquare className="mt-px size-3.5 shrink-0 text-[#2552ED]" />
                      : <Square      className="mt-px size-3.5 shrink-0 text-[#bbb] dark:text-[#555]" />
                    }
                    <span className={cn(checked[i] && "line-through text-[#bbb] dark:text-[#555]")}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Transcript bubble ─────────────────────────────────────── */
function TranscriptBubble({
  msg, language, isActive, onSeek,
}: {
  msg: CallTranscriptMessage;
  language: Language;
  isActive: boolean;
  onSeek: (t: number) => void;
}) {
  const isAgent = msg.sender === "agent";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group flex flex-col ${isAgent ? "items-end" : "items-start"} mb-2`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <div
          className={cn(
            "max-w-[420px] px-4 py-3 rounded-2xl text-[14px] leading-relaxed transition-all duration-200",
            isAgent
              ? "bg-[#e3f0ff] dark:bg-[#1e3a5f] text-[#212121] dark:text-[#e4e4e4] rounded-br-md"
              : "bg-white dark:bg-[#262b35] text-[#212121] dark:text-[#e4e4e4] rounded-bl-md border border-[#eaeaea] dark:border-[#333a47]",
            isActive && "ring-2 ring-[#2552ED]/40 ring-offset-1",
          )}
          style={{ fontWeight: 400 }}
        >
          {msg.translations[language]}
        </div>

        {/* Seek-to hover pill */}
        {hovered && (
          <button
            type="button"
            onClick={() => onSeek(msg.timestampSec)}
            className={cn(
              "absolute -top-2.5 cursor-pointer rounded-full border border-[#e5e9f0] bg-white px-2 py-0.5 text-[10px] font-medium text-[#555] shadow-sm transition-colors hover:bg-[#f0f4ff] hover:text-[#2552ED] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#9ba2b0] dark:hover:bg-[#252a3a] dark:hover:text-[#6b9bff]",
              isAgent ? "right-2" : "left-2",
            )}
          >
            ↑ {fmt(msg.timestampSec)}
          </button>
        )}
      </div>

      <div className="mt-1.5 flex items-center gap-2 px-1">
        <span className="text-[11px] text-[#b0b0b0] dark:text-[#5a6170] italic" style={{ fontWeight: 400 }}>
          {isAgent ? "Agent" : "Customer"}
        </span>
        <span className="text-[11px] tabular-nums text-[#999] dark:text-[#5a6170]" style={{ fontWeight: 400 }}>
          {fmt(msg.timestampSec)}
        </span>
      </div>
    </div>
  );
}

/* ─── Create Ticket Sheet ───────────────────────────────────── */
function CreateTicketSheet({
  record, open, onOpenChange,
}: {
  record: CallRecord;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [subject,     setSubject]     = useState(`${record.topic} — ${record.contactName}`);
  const [description, setDescription] = useState(record.summary);
  const [priority,    setPriority]    = useState("high");
  const [submitting,  setSubmitting]  = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onOpenChange(false); }, 1200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" inset="floating" floatingSize="md" className={FLOATING_SHEET_FRAME_CONTENT_CLASS}>
        <FloatingSheetFrame
          title="Create Support Ticket"
          description="Pre-filled from call recording"
          primaryAction={
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Creating…" : "Create Ticket"}
            </Button>
          }
          secondaryAction={
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          }
        >
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger size="default"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Assignee</label>
              <Input placeholder="Search team members…" defaultValue={record.agentName} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <Input defaultValue={[record.topic.toLowerCase().replace(/\s+/g, "-"), record.outcome].join(", ")} />
            </div>
          </div>
        </FloatingSheetFrame>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Main export ───────────────────────────────────────────── */
export interface CallRecordingPlayerProps {
  record: CallRecord;
}

export function CallRecordingPlayer({ record }: CallRecordingPlayerProps) {
  const {
    currentTime, isPlaying, speed, language, activeMsgIdx, muted,
    play, pause, seek, skipBy, setSpeed, setLanguage, toggleMute,
  } = useCallPlayer(record);

  const [ticketOpen, setTicketOpen] = useState(false);
  const activeBubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active bubble into view
  useEffect(() => {
    if (!isPlaying) return;
    activeBubbleRefs.current[activeMsgIdx]?.scrollIntoView({
      behavior: "smooth", block: "nearest",
    });
  }, [activeMsgIdx, isPlaying]);

  const outcome = OUTCOME_STYLES[record.outcome];

  return (
    <>
      {/* ── Sticky player chrome ── */}
      <div className="sticky top-0 z-10 border-b border-[#eaeaea] dark:border-[#2e3340] bg-[#f5f6f8] dark:bg-[#13161b] transition-colors duration-300">

        {/* Call meta strip */}
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-[#212121] dark:text-[#e4e4e4]">
                {record.dateLabel}
              </span>
              <span className="text-[#ccc] dark:text-[#444]">·</span>
              <span className="text-[12px] text-[#666] dark:text-[#9ba2b0]">
                {fmt(record.durationSec)}
              </span>
              <span className="text-[#ccc] dark:text-[#444]">·</span>
              <span className="text-[12px] text-[#666] dark:text-[#9ba2b0]">
                Agent: {record.agentName}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  outcome.cls,
                )}
              >
                {outcome.label}
              </span>
              <span className="rounded-full border border-[#e5e9f0] bg-[#f5f6f8] px-2 py-0.5 text-[11px] text-[#666] dark:border-[#333a47] dark:bg-[#1e2229] dark:text-[#9ba2b0]">
                {record.topic}
              </span>
            </div>
          </div>
        </div>

        {/* Waveform + markers */}
        <WaveformSection
          record={record}
          currentTime={currentTime}
          onSeek={seek}
          markers={record.markers}
        />

        {/* Play controls */}
        <PlayControls
          isPlaying={isPlaying}
          speed={speed}
          muted={muted}
          language={language}
          record={record}
          onPlay={play}
          onPause={pause}
          onSkip={skipBy}
          onSpeedChange={setSpeed}
          onToggleMute={toggleMute}
          onLanguageChange={setLanguage}
          onCreateTicket={() => setTicketOpen(true)}
        />
      </div>

      {/* ── AI Summary ── */}
      <div className="pt-4">
        <CallSummary record={record} />
      </div>

      {/* ── Date separator ── */}
      <div ref={transcriptRef} className="px-6">
        <div className="mb-4 flex items-center justify-center">
          <span
            className="relative z-10 bg-[#f5f6f8] px-3 text-[12px] text-[#999] dark:bg-[#13161b] dark:text-[#6b7280]"
            style={{ fontWeight: 400 }}
          >
            {record.dateLabel} · Call Recording · {fmt(record.durationSec)}
          </span>
        </div>

        {/* ── Transcript ── */}
        {record.messages.map((msg, i) => (
          <div
            key={msg.id}
            ref={(el) => { activeBubbleRefs.current[i] = el; }}
          >
            <TranscriptBubble
              msg={msg}
              language={language}
              isActive={i === activeMsgIdx}
              onSeek={seek}
            />
          </div>
        ))}
      </div>

      <CreateTicketSheet
        record={record}
        open={ticketOpen}
        onOpenChange={setTicketOpen}
      />
    </>
  );
}
