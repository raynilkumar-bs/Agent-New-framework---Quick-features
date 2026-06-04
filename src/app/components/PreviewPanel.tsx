import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  X,
  Send,
  Play,
  Pause,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

export type PreviewMode = "voice" | "chat";

type CallState = "idle" | "connecting" | "live" | "ended";

interface PreviewPanelProps {
  mode: PreviewMode;
  onClose: () => void;
}

type Turn = {
  speaker: "agent" | "user";
  text: string;
  /** Duration (ms) of this turn's "speaking" animation. */
  durationMs: number;
};

const CANNED_CALL: Turn[] = [
  {
    speaker: "agent",
    text:
      "Thank you for calling Rock Dental Brands — my name is Myrna, your virtual assistant. How can I help you today?",
    durationMs: 3800,
  },
  {
    speaker: "user",
    text: "I am having a very bad headache. I think it is migraine.",
    durationMs: 2800,
  },
  {
    speaker: "agent",
    text:
      "I'm really sorry you're dealing with that — a bad headache is no fun. Just so I point you in the right direction: is the pain coming from your teeth, jaw, or gums, or is it more of a general head pain?",
    durationMs: 5200,
  },
  {
    speaker: "user",
    text:
      "Now that you ask — it kind of started near my back tooth and spread up.",
    durationMs: 3000,
  },
  {
    speaker: "agent",
    text:
      "Thank you, that helps. Pain that radiates from a tooth can sometimes send pain into your jaw and head. Are you experiencing any pain when you bite or chew, fever, or trouble swallowing or breathing?",
    durationMs: 5400,
  },
  {
    speaker: "user",
    text: "A little swelling near the tooth, no fever.",
    durationMs: 2400,
  },
];

export function PreviewPanel({ mode, onClose }: PreviewPanelProps) {
  return (
    <aside className="flex w-[340px] shrink-0 flex-col overflow-hidden rounded-lg bg-white animate-in slide-in-from-right-4 fade-in duration-300 ease-out dark:bg-[#1e2229]">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[#e5e9f0] px-4 dark:border-[#252b35]">
        <h2 className="text-[15px] font-medium tracking-[-0.3px] text-[#212121] dark:text-[#f3f4f6]">
          Preview
        </h2>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-[#6b7280] dark:text-[#9ba2b0]"
            aria-label="Preview settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-[#6b7280] dark:text-[#9ba2b0]"
            onClick={onClose}
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {mode === "voice" ? <VoiceCallBody /> : <ChatPlaceholderBody />}
    </aside>
  );
}

function ChatPlaceholderBody() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff6ff] dark:bg-[#1e293b]">
        <MessageSquareText className="h-6 w-6 text-[#1976d2] dark:text-[#93c5fd]" />
      </div>
      <p className="text-sm font-medium tracking-[-0.28px] text-[#212121] dark:text-[#f3f4f6]">
        Web chat coming soon
      </p>
      <p className="text-xs leading-5 text-[#6b7280] dark:text-[#9ba2b0]">
        Test the agent's chat experience here. We're polishing it now — voice
        call is ready to try.
      </p>
    </div>
  );
}

function VoiceCallBody() {
  const [state, setState] = useState<CallState>("idle");
  const [turnIndex, setTurnIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const callStartedAtRef = useRef<number | null>(null);
  const turnTimerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);

  // Turns revealed so far (used for live transcript echo + final bubble list)
  const revealedTurns = useMemo(
    () => CANNED_CALL.slice(0, Math.min(turnIndex, CANNED_CALL.length)),
    [turnIndex],
  );

  // The currently-speaking turn (during live state)
  const activeTurn =
    state === "live" && turnIndex < CANNED_CALL.length
      ? CANNED_CALL[turnIndex]
      : null;

  // ───────────────────── Call lifecycle ─────────────────────
  const clearTimers = () => {
    if (turnTimerRef.current) window.clearTimeout(turnTimerRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
    turnTimerRef.current = null;
    tickRef.current = null;
  };

  useEffect(() => () => clearTimers(), []);

  const startCall = () => {
    setState("connecting");
    setTurnIndex(0);
    setElapsedMs(0);
    // Connecting beat → live
    window.setTimeout(() => {
      setState("live");
      callStartedAtRef.current = Date.now();
      tickRef.current = window.setInterval(() => {
        if (callStartedAtRef.current) {
          setElapsedMs(Date.now() - callStartedAtRef.current);
        }
      }, 250);
      advanceTurn(0);
    }, 1400);
  };

  const advanceTurn = (next: number) => {
    if (next >= CANNED_CALL.length) {
      endCall();
      return;
    }
    setTurnIndex(next);
    const dur = CANNED_CALL[next].durationMs;
    turnTimerRef.current = window.setTimeout(() => advanceTurn(next + 1), dur);
  };

  const endCall = () => {
    clearTimers();
    setTurnIndex(CANNED_CALL.length);
    setState("ended");
  };

  const resetCall = () => {
    clearTimers();
    setState("idle");
    setTurnIndex(0);
    setElapsedMs(0);
    callStartedAtRef.current = null;
  };

  // ─────────────────────────── Render ───────────────────────────
  if (state === "idle") {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={startCall}
            aria-label="Start a call"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#1976d2] text-white shadow-[0_6px_16px_rgba(25,118,210,0.35)] transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#1976d2] opacity-40 animate-ping"
            />
            <Phone className="relative h-5 w-5" />
          </button>
          <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
            Start a call
          </span>
        </div>
        <ChatComposer />
      </div>
    );
  }

  if (state === "connecting") {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-10 px-5">
          <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0] animate-in fade-in duration-300">
            Connecting…
          </span>
          <WaveformBars active={true} count={11} accent />
        </div>
        <CallControls
          muted={muted}
          speakerOn={speakerOn}
          onToggleMute={() => setMuted((m) => !m)}
          onToggleSpeaker={() => setSpeakerOn((s) => !s)}
          onHangUp={endCall}
        />
      </div>
    );
  }

  if (state === "live") {
    const seconds = Math.floor(elapsedMs / 1000);
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-center gap-2 pt-3">
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#dc2626]" />
          <span className="text-[11px] font-medium tracking-[-0.22px] text-[#6b7280] dark:text-[#9ba2b0]">
            On call · {mm}:{ss}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5">
          <WaveformBars active count={11} accent />
          {/* Live transcript echo */}
          <div
            key={turnIndex}
            className="w-full max-w-[260px] text-center animate-in fade-in slide-in-from-bottom-1 duration-300"
            aria-live="polite"
          >
            <span
              className={`mb-1 inline-block text-[10px] uppercase tracking-[0.6px] ${
                activeTurn?.speaker === "agent"
                  ? "text-[#1976d2] dark:text-[#93c5fd]"
                  : "text-[#6b7280] dark:text-[#9ba2b0]"
              }`}
            >
              {activeTurn?.speaker === "agent" ? "Agent" : "You"}
            </span>
            <p className="text-sm leading-5 tracking-[-0.28px] text-[#212121] dark:text-[#e4e4e4]">
              {activeTurn?.text}
            </p>
          </div>
        </div>

        <CallControls
          muted={muted}
          speakerOn={speakerOn}
          onToggleMute={() => setMuted((m) => !m)}
          onToggleSpeaker={() => setSpeakerOn((s) => !s)}
          onHangUp={endCall}
        />
      </div>
    );
  }

  // state === "ended"
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-center pt-3 pb-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6f7] px-2.5 py-1 text-[11px] font-medium text-[#6b7280] dark:bg-[#262b35] dark:text-[#9ba2b0]">
          Call ended
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pb-3">
        {revealedTurns.map((turn, i) => (
          <TranscriptBubble key={i} turn={turn} delayMs={i * 60} />
        ))}
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={resetCall}
            className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[#e5e9f0] bg-white px-3 text-[11px] font-medium tracking-[-0.22px] text-[#6b7280] transition-colors hover:border-[#1976d2] hover:text-[#1976d2] dark:border-[#333a47] dark:bg-[#1e2229] dark:text-[#9ba2b0]"
          >
            <Phone className="h-3 w-3" />
            New call
          </button>
        </div>
      </div>

      <ChatComposer />
    </div>
  );
}

// ────────────────────────── Sub-pieces ──────────────────────────

function CallControls({
  muted,
  speakerOn,
  onToggleMute,
  onToggleSpeaker,
  onHangUp,
}: {
  muted: boolean;
  speakerOn: boolean;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onHangUp: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-5 pb-6 pt-4">
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          muted
            ? "border-[#dc2626] bg-[#fee2e2] text-[#dc2626] dark:border-[#7f1d1d] dark:bg-[#3b1414]"
            : "border-[#e5e9f0] bg-white text-[#6b7280] hover:border-[#c4d5e9] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#9ba2b0]"
        }`}
      >
        {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={onHangUp}
        aria-label="Hang up"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0_6px_16px_rgba(220,38,38,0.4)] transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#dc2626] opacity-30 animate-ping"
        />
        <PhoneOff className="relative h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onToggleSpeaker}
        aria-label={speakerOn ? "Mute speaker" : "Unmute speaker"}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          !speakerOn
            ? "border-[#dc2626] bg-[#fee2e2] text-[#dc2626] dark:border-[#7f1d1d] dark:bg-[#3b1414]"
            : "border-[#e5e9f0] bg-white text-[#6b7280] hover:border-[#c4d5e9] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#9ba2b0]"
        }`}
      >
        {speakerOn ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

function WaveformBars({
  active,
  count = 9,
  accent = false,
}: {
  active: boolean;
  count?: number;
  accent?: boolean;
}) {
  // Deterministic-ish phase offsets so bars don't all peak together.
  const bars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        delay: (i * 90) % 600,
        height: 30 + ((i * 37) % 36),
      })),
    [count],
  );
  return (
    <div className="flex h-12 items-center justify-center gap-[5px]">
      {bars.map((b, i) => (
        <span
          key={i}
          className={`w-1 rounded-full ${
            accent ? "bg-[#1976d2] dark:bg-[#5580e0]" : "bg-[#9ba2b0]"
          } ${active ? "wave-bar" : ""}`}
          style={
            {
              animationDelay: `${b.delay}ms`,
              "--wave-base": `${b.height}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function TranscriptBubble({ turn, delayMs }: { turn: Turn; delayMs: number }) {
  const [playing, setPlaying] = useState(false);
  const isAgent = turn.speaker === "agent";
  return (
    <div
      className={`flex w-full animate-in fade-in slide-in-from-bottom-1 duration-300 ${
        isAgent ? "justify-start" : "justify-end"
      }`}
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "both" }}
    >
      <div
        className={`flex max-w-[85%] flex-col gap-1.5 rounded-[10px] px-3 py-2 ${
          isAgent
            ? "bg-[#f4f6f7] text-[#212121] dark:bg-[#262b35] dark:text-[#e4e4e4]"
            : "bg-[#1976d2] text-white"
        }`}
      >
        <p className="text-[13px] leading-[18px] tracking-[-0.26px]">
          {turn.text}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause audio" : "Play audio"}
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
              isAgent
                ? "bg-white text-[#1976d2] hover:bg-[#eff6ff] dark:bg-[#1e2229] dark:text-[#93c5fd]"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {playing ? (
              <Pause className="h-2.5 w-2.5" />
            ) : (
              <Play className="h-2.5 w-2.5 translate-x-[1px]" />
            )}
          </button>
          <MiniWaveform active={playing} agent={isAgent} />
          <span
            className={`text-[10px] tabular-nums ${
              isAgent
                ? "text-[#6b7280] dark:text-[#9ba2b0]"
                : "text-white/75"
            }`}
          >
            0:0{Math.max(1, Math.round(turn.durationMs / 1000))}
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniWaveform({ active, agent }: { active: boolean; agent: boolean }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        delay: (i * 55) % 500,
        height: 35 + ((i * 53) % 55),
      })),
    [],
  );
  const color = agent ? "bg-[#1976d2] dark:bg-[#5580e0]" : "bg-white/80";
  return (
    <div className="flex h-3.5 flex-1 items-center gap-[2px] overflow-hidden">
      {bars.map((b, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full ${color} ${active ? "wave-bar" : "opacity-60"}`}
          style={
            {
              animationDelay: `${b.delay}ms`,
              "--wave-base": `${b.height}%`,
              height: active ? undefined : `${b.height}%`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function ChatComposer() {
  const [value, setValue] = useState("");
  return (
    <div className="border-t border-[#e5e9f0] p-3 dark:border-[#252b35]">
      <div className="flex items-center gap-2 rounded-full border border-[#e5e9f0] bg-white px-3 py-1.5 focus-within:border-[#1976d2] dark:border-[#333a47] dark:bg-[#262b35]">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Send a message to start a chat"
          className="min-w-0 flex-1 bg-transparent text-[13px] tracking-[-0.26px] text-[#212121] outline-none placeholder:text-[#9ba2b0] dark:text-[#e4e4e4]"
        />
        <button
          type="button"
          disabled={!value.trim()}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1976d2] transition-colors hover:bg-[#eff6ff] disabled:text-[#c4d5e9] disabled:hover:bg-transparent dark:text-[#5580e0] dark:hover:bg-[#1e293b]"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
