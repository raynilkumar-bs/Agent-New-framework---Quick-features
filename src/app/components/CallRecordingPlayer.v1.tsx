import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play, Pause, FastForward, Globe, TicketIcon,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
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
import { cn } from "@/app/components/ui/utils";

/* ─── Types ─── */
export type Language = "en" | "fr" | "es";

export interface CallTranscriptMessage {
  id: string;
  sender: "agent" | "customer";
  timestampSec: number;
  translations: Record<Language, string>;
}

/* ─── Transcript data ─── */
export const CALL_TRANSCRIPT: CallTranscriptMessage[] = [
  {
    id: "m1",
    sender: "customer",
    timestampSec: 0,
    translations: {
      en: "Hi, I recently placed an order for shoes in size 9 — order #58421 — but I received size 8 instead. This is quite frustrating.",
      fr: "Bonjour, j'ai commandé des chaussures en pointure 9 — commande n°58421 — mais j'ai reçu la pointure 8. C'est vraiment frustrant.",
      es: "Hola, hice un pedido de zapatos talla 9 — número de pedido 58421 — pero recibí talla 8. Esto es bastante frustrante.",
    },
  },
  {
    id: "m2",
    sender: "agent",
    timestampSec: 18,
    translations: {
      en: "I'm so sorry to hear that! Let me pull up your order right away. Just a moment, please.",
      fr: "Je suis vraiment désolé d'entendre cela ! Laissez-moi accéder à votre commande immédiatement.",
      es: "¡Lamento mucho escuchar eso! Déjame consultar tu pedido de inmediato.",
    },
  },
  {
    id: "m3",
    sender: "agent",
    timestampSec: 34,
    translations: {
      en: "I can see your order here. You ordered size 9, but our warehouse shipped size 8 by mistake. I sincerely apologize for this error on our end.",
      fr: "Je vois votre commande. Vous avez commandé la pointure 9 mais notre entrepôt a expédié la pointure 8 par erreur. Toutes mes excuses.",
      es: "Veo tu pedido aquí. Pediste talla 9, pero nuestro almacén envió talla 8 por error. Me disculpo sinceramente.",
    },
  },
  {
    id: "m4",
    sender: "customer",
    timestampSec: 52,
    translations: {
      en: "Yes, and I needed them for an event this weekend. I really can't show up without the right size.",
      fr: "Oui, et j'en avais besoin pour un événement ce week-end. Je ne peux pas me présenter sans la bonne pointure.",
      es: "Sí, los necesitaba para un evento este fin de semana. Realmente no puedo ir sin la talla correcta.",
    },
  },
  {
    id: "m5",
    sender: "agent",
    timestampSec: 68,
    translations: {
      en: "I completely understand the urgency. I'm flagging this as priority and arranging an expedited shipment of size 9 to arrive by Thursday. Would that work?",
      fr: "Je comprends tout à fait l'urgence. Je marque ceci comme prioritaire et j'organise un envoi accéléré de la pointure 9 pour jeudi.",
      es: "Entiendo completamente la urgencia. Estoy marcando esto como prioritario y organizando un envío urgente de la talla 9 para el jueves.",
    },
  },
  {
    id: "m6",
    sender: "customer",
    timestampSec: 88,
    translations: {
      en: "Thursday works. But do I need to send back the wrong pair before you ship the replacement?",
      fr: "Jeudi convient. Mais dois-je renvoyer la paire incorrecte avant que vous expédiiez le remplacement ?",
      es: "El jueves está bien. ¿Necesito devolver el par incorrecto antes de que envíen el reemplazo?",
    },
  },
  {
    id: "m7",
    sender: "agent",
    timestampSec: 104,
    translations: {
      en: "No, not at all! We'll ship the correct size immediately and include a prepaid return label for the size 8 pair.",
      fr: "Non, pas du tout ! Nous expédierons la bonne pointure immédiatement et inclurons une étiquette de retour prépayée.",
      es: "¡No, para nada! Enviaremos la talla correcta de inmediato e incluiremos una etiqueta de devolución prepagada.",
    },
  },
  {
    id: "m8",
    sender: "customer",
    timestampSec: 124,
    translations: {
      en: "That's great! Much easier. Thank you so much.",
      fr: "C'est super ! C'est beaucoup plus simple. Merci beaucoup.",
      es: "¡Genial! Es mucho más fácil. Muchas gracias.",
    },
  },
  {
    id: "m9",
    sender: "agent",
    timestampSec: 136,
    translations: {
      en: "Absolutely! I'm creating a priority exchange ticket now. You'll receive a confirmation email with tracking within 30 minutes.",
      fr: "Absolument ! Je crée un ticket d'échange prioritaire maintenant. Vous recevrez un e-mail de confirmation avec le suivi sous 30 minutes.",
      es: "¡Por supuesto! Estoy creando un ticket de intercambio prioritario ahora. Recibirás un correo con seguimiento en 30 minutos.",
    },
  },
  {
    id: "m10",
    sender: "customer",
    timestampSec: 158,
    translations: {
      en: "Perfect. I really appreciate how quickly you handled this.",
      fr: "Parfait. J'apprécie vraiment la rapidité avec laquelle vous avez géré cela.",
      es: "Perfecto. Realmente aprecio la rapidez con la que manejaste esto.",
    },
  },
  {
    id: "m11",
    sender: "agent",
    timestampSec: 172,
    translations: {
      en: "Of course — and I apologize again for the inconvenience. Is there anything else I can help you with today?",
      fr: "Bien sûr — et je m'excuse encore pour la gêne. Y a-t-il autre chose que je puisse faire pour vous ?",
      es: "Por supuesto — y me disculpo de nuevo por las molestias. ¿Hay algo más en lo que pueda ayudarte?",
    },
  },
  {
    id: "m12",
    sender: "customer",
    timestampSec: 188,
    translations: {
      en: "No, that's everything. Thanks again!",
      fr: "Non, c'est tout. Merci encore !",
      es: "No, eso es todo. ¡Gracias de nuevo!",
    },
  },
  {
    id: "m13",
    sender: "agent",
    timestampSec: 197,
    translations: {
      en: "Have a wonderful day and enjoy your event this weekend!",
      fr: "Passez une excellente journée et profitez de votre événement ce week-end !",
      es: "¡Que tenga un maravilloso día y disfrute de su evento este fin de semana!",
    },
  },
];

const TOTAL_DURATION = 210;

const SPEED_OPTIONS = [
  { label: "1×", value: 1 },
  { label: "2.5×", value: 2.5 },
  { label: "3×", value: 3 },
];

const LANGUAGE_OPTIONS: { label: string; value: Language }[] = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getActiveIdx(t: number) {
  let idx = 0;
  for (let i = 0; i < CALL_TRANSCRIPT.length; i++) {
    if (CALL_TRANSCRIPT[i].timestampSec <= t) idx = i;
    else break;
  }
  return idx;
}

/* ─── Create Ticket Sheet ─── */
function CreateTicketSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [subject, setSubject] = useState("Wrong shoe size delivered — Order #58421");
  const [description, setDescription] = useState(
    "Customer ordered size 9 but received size 8. Expedited replacement requested for Thursday delivery. Prepaid return label to be included.",
  );
  const [priority, setPriority] = useState("high");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        inset="floating"
        floatingSize="md"
        className={FLOATING_SHEET_FRAME_CONTENT_CLASS}
      >
        <FloatingSheetFrame
          title="Create Support Ticket"
          description="Pre-filled from this call recording"
          primaryAction={
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Creating…" : "Create Ticket"}
            </Button>
          }
          secondaryAction={
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
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
                <SelectTrigger size="default">
                  <SelectValue />
                </SelectTrigger>
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
              <Input placeholder="Search team members…" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <Input defaultValue="wrong-item, expedited-shipping, size-issue" />
            </div>
          </div>
        </FloatingSheetFrame>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Single transcript bubble — matches InboxView ChatBubble exactly ─── */
function TranscriptBubble({
  msg,
  language,
  isActive,
  bubbleRef,
}: {
  msg: CallTranscriptMessage;
  language: Language;
  isActive: boolean;
  bubbleRef?: React.Ref<HTMLDivElement>;
}) {
  const isAgent = msg.sender === "agent";

  return (
    <div
      ref={bubbleRef}
      className={`flex flex-col ${isAgent ? "items-end" : "items-start"} mb-2`}
    >
      <div
        className={cn(
          "max-w-[420px] px-4 py-3 rounded-2xl text-[14px] leading-relaxed transition-all duration-200",
          isAgent
            ? "bg-[#e3f0ff] dark:bg-[#1e3a5f] text-[#212121] dark:text-[#e4e4e4] rounded-br-md"
            : "bg-white dark:bg-[#262b35] text-[#212121] dark:text-[#e4e4e4] rounded-bl-md",
          isActive && "ring-2 ring-[#2552ED]/40 ring-offset-1",
        )}
        style={{ fontWeight: 400 }}
      >
        {msg.translations[language]}
      </div>
      <div className="flex items-center gap-2 mt-1.5 px-1">
        <span className="text-[11px] text-[#b0b0b0] dark:text-[#5a6170] italic" style={{ fontWeight: 400 }}>
          {isAgent ? "Sarah M." : "Alex K."}
        </span>
        <span className="text-[11px] text-[#999] dark:text-[#5a6170]" style={{ fontWeight: 400 }}>
          {formatTime(msg.timestampSec)}
        </span>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export function CallRecordingPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [language, setLanguage] = useState<Language>("en");
  const [ticketSheetOpen, setTicketSheetOpen] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIdx = getActiveIdx(currentTime);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.1 * speed;
        if (next >= TOTAL_DURATION) {
          clearTimer();
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 100);
  }, [speed, clearTimer]);

  useEffect(() => {
    if (isPlaying) startTimer();
    else clearTimer();
    return clearTimer;
  }, [isPlaying, startTimer, clearTimer]);

  // Scroll active bubble into view during playback
  useEffect(() => {
    if (!isPlaying) return;
    bubbleRefs.current[activeIdx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeIdx, isPlaying]);

  const handlePlayPause = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  return (
    <>
      {/* ── Sticky audio player bar ── */}
      <div className="sticky top-0 z-10 bg-[#f5f6f8] dark:bg-[#13161b] border-b border-[#eaeaea] dark:border-[#333a47] px-6 py-3 transition-colors duration-300">
        {/* Top row: call meta + controls */}
        <div className="flex items-center gap-3 mb-2.5">
          {/* Play/pause */}
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#2552ED] text-white transition-colors hover:bg-[#1E44CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2552ED]/50"
          >
            {isPlaying ? (
              <Pause className="size-3.5 fill-current" />
            ) : (
              <Play className="size-3.5 fill-current" />
            )}
          </button>

          {/* Skip forward */}
          <button
            onClick={() => setCurrentTime((t) => Math.min(t + 15, TOTAL_DURATION))}
            aria-label="Skip forward 15 seconds"
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-[#555] transition-colors hover:bg-[#eaeaea] dark:text-[#8b92a5] dark:hover:bg-[#2e3340]"
          >
            <FastForward className="size-3.5" />
          </button>

          {/* Time */}
          <span className="tabular-nums text-[12px] text-[#999] dark:text-[#6b7280] shrink-0" style={{ fontWeight: 400 }}>
            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
          </span>

          {/* Speed buttons */}
          <div className="flex items-center gap-0.5 ml-1">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSpeed(opt.value)}
                className={cn(
                  "cursor-pointer rounded px-2 py-0.5 text-[11px] transition-colors duration-150",
                  speed === opt.value
                    ? "bg-[#2552ED] text-white"
                    : "text-[#555] dark:text-[#8b92a5] hover:bg-[#eaeaea] dark:hover:bg-[#2e3340]",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Language select */}
            <div className="flex items-center gap-1">
              <Globe className="size-3.5 text-[#999] dark:text-[#6b7280] shrink-0" />
              <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                <SelectTrigger size="sm" className="h-7 w-24 text-[12px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Create ticket */}
            <button
              onClick={() => setTicketSheetOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#e5e9f0] bg-white px-2.5 py-1 text-[12px] text-[#212121] transition-colors hover:bg-[#f5f5f5] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:hover:bg-[#2e3340]"
              style={{ fontWeight: 400 }}
            >
              <TicketIcon className="size-3" />
              Create Ticket
            </button>
          </div>
        </div>

        {/* Scrubber */}
        <Slider
          min={0}
          max={TOTAL_DURATION}
          step={0.1}
          value={[currentTime]}
          onValueChange={([v]) => setCurrentTime(v)}
          className="[&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:size-2.5"
        />
      </div>

      {/* ── Transcript ── */}
      <div className="px-6 py-5">
        <div className="mb-4 flex justify-center">
          <span
            className="relative z-10 bg-[#f5f6f8] px-3 text-[12px] text-[#999] dark:bg-[#13161b] dark:text-[#6b7280]"
            style={{ fontWeight: 400 }}
          >
            Today · Call Recording · 3:30
          </span>
        </div>

        {CALL_TRANSCRIPT.map((msg, i) => (
          <TranscriptBubble
            key={msg.id}
            msg={msg}
            language={language}
            isActive={i === activeIdx}
            bubbleRef={(el) => { bubbleRefs.current[i] = el; }}
          />
        ))}
      </div>

      <CreateTicketSheet open={ticketSheetOpen} onOpenChange={setTicketSheetOpen} />
    </>
  );
}
