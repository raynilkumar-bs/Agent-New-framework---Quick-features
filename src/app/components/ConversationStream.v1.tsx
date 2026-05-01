import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play, Pause, FastForward, Globe, TicketIcon,
  PhoneCall, User, Headphones,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
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
import { cn } from "@/app/components/ui/utils";
import { Textarea } from "@/app/components/ui/textarea";

/* ─── Types ─── */
type Language = "en" | "fr" | "es";
type Speaker = "support" | "customer";

interface ConversationMessage {
  id: string;
  speaker: Speaker;
  timestampSec: number;
  translations: Record<Language, string>;
}

/* ─── Dummy transcript data ─── */
const MESSAGES: ConversationMessage[] = [
  {
    id: "m1",
    speaker: "customer",
    timestampSec: 0,
    translations: {
      en: "Hi, I recently placed an order for shoes in size 9 — order number 58421 — but I received size 8 instead. This is quite frustrating.",
      fr: "Bonjour, j'ai récemment passé une commande de chaussures en pointure 9 — numéro de commande 58421 — mais j'ai reçu une pointure 8 à la place. C'est vraiment frustrant.",
      es: "Hola, recientemente hice un pedido de zapatos talla 9 — número de pedido 58421 — pero recibí talla 8 en su lugar. Esto es bastante frustrante.",
    },
  },
  {
    id: "m2",
    speaker: "support",
    timestampSec: 18,
    translations: {
      en: "I'm so sorry to hear that! Let me pull up your order right away. Just a moment, please.",
      fr: "Je suis vraiment désolé d'entendre cela ! Laissez-moi accéder à votre commande immédiatement. Un instant, s'il vous plaît.",
      es: "¡Lamento mucho escuchar eso! Déjame consultar tu pedido de inmediato. Solo un momento, por favor.",
    },
  },
  {
    id: "m3",
    speaker: "support",
    timestampSec: 34,
    translations: {
      en: "I can see your order here. You ordered size 9, but our warehouse shipped size 8 by mistake. I sincerely apologize for this error on our end.",
      fr: "Je vois votre commande ici. Vous avez commandé une pointure 9, mais notre entrepôt a expédié une pointure 8 par erreur. Je vous présente mes sincères excuses pour cette erreur de notre part.",
      es: "Puedo ver tu pedido aquí. Pediste talla 9, pero nuestro almacén envió talla 8 por error. Me disculpo sinceramente por este error de nuestra parte.",
    },
  },
  {
    id: "m4",
    speaker: "customer",
    timestampSec: 52,
    translations: {
      en: "Yes, and I needed them for an event this weekend. I really can't show up without the right size.",
      fr: "Oui, et j'en avais besoin pour un événement ce week-end. Je ne peux vraiment pas me présenter sans la bonne pointure.",
      es: "Sí, y los necesitaba para un evento este fin de semana. Realmente no puedo presentarme sin la talla correcta.",
    },
  },
  {
    id: "m5",
    speaker: "support",
    timestampSec: 68,
    translations: {
      en: "I completely understand the urgency. I'm going to flag this as priority and arrange an expedited shipment of size 9 to arrive by Thursday. Would that work for you?",
      fr: "Je comprends tout à fait l'urgence. Je vais marquer ceci comme prioritaire et organiser une expédition accélérée de la pointure 9 pour arriver d'ici jeudi. Cela vous conviendrait-il ?",
      es: "Entiendo completamente la urgencia. Voy a marcar esto como prioritario y organizar un envío urgente de la talla 9 para que llegue antes del jueves. ¿Eso te funcionaría?",
    },
  },
  {
    id: "m6",
    speaker: "customer",
    timestampSec: 88,
    translations: {
      en: "Thursday would work. But do I need to send back the wrong pair before you ship the replacement?",
      fr: "Jeudi conviendrait. Mais dois-je renvoyer la paire incorrecte avant que vous expédiez le remplacement ?",
      es: "El jueves estaría bien. Pero, ¿necesito devolver el par incorrecto antes de que envíes el reemplazo?",
    },
  },
  {
    id: "m7",
    speaker: "support",
    timestampSec: 104,
    translations: {
      en: "No, not at all! We'll ship the correct size immediately and include a prepaid return label in the package for the size 8. You can drop it off at your convenience.",
      fr: "Non, pas du tout ! Nous expédierons la bonne pointure immédiatement et inclurons une étiquette de retour prépayée dans le colis pour la pointure 8. Vous pourrez la déposer à votre convenance.",
      es: "¡No, para nada! Enviaremos la talla correcta de inmediato e incluiremos una etiqueta de devolución prepagada en el paquete para la talla 8. Puedes entregarla cuando te sea conveniente.",
    },
  },
  {
    id: "m8",
    speaker: "customer",
    timestampSec: 124,
    translations: {
      en: "Oh that's great! That's much easier. Thank you so much.",
      fr: "Oh, c'est super ! C'est beaucoup plus simple. Merci beaucoup.",
      es: "¡Oh, eso es genial! Es mucho más fácil. Muchas gracias.",
    },
  },
  {
    id: "m9",
    speaker: "support",
    timestampSec: 136,
    translations: {
      en: "Absolutely! I'm creating a priority exchange ticket now. You'll receive a confirmation email with your new tracking number within the next 30 minutes.",
      fr: "Absolument ! Je crée maintenant un ticket d'échange prioritaire. Vous recevrez un e-mail de confirmation avec votre nouveau numéro de suivi dans les 30 prochaines minutes.",
      es: "¡Por supuesto! Estoy creando un ticket de intercambio prioritario ahora. Recibirás un correo electrónico de confirmación con tu nuevo número de seguimiento en los próximos 30 minutos.",
    },
  },
  {
    id: "m10",
    speaker: "customer",
    timestampSec: 158,
    translations: {
      en: "Perfect. I really appreciate how quickly you handled this.",
      fr: "Parfait. J'apprécie vraiment la rapidité avec laquelle vous avez géré cela.",
      es: "Perfecto. Realmente aprecio la rapidez con la que manejaste esto.",
    },
  },
  {
    id: "m11",
    speaker: "support",
    timestampSec: 172,
    translations: {
      en: "Of course, and I apologize again for the inconvenience. Is there anything else I can help you with today?",
      fr: "Bien sûr, et je m'excuse encore pour la gêne occasionnée. Y a-t-il autre chose que je puisse faire pour vous aujourd'hui ?",
      es: "Por supuesto, y me disculpo nuevamente por las molestias. ¿Hay algo más en lo que pueda ayudarte hoy?",
    },
  },
  {
    id: "m12",
    speaker: "customer",
    timestampSec: 188,
    translations: {
      en: "No, that's everything. Thanks again!",
      fr: "Non, c'est tout. Merci encore !",
      es: "No, eso es todo. ¡Gracias de nuevo!",
    },
  },
  {
    id: "m13",
    speaker: "support",
    timestampSec: 197,
    translations: {
      en: "Have a wonderful day and enjoy your event this weekend!",
      fr: "Passez une excellente journée et profitez bien de votre événement ce week-end !",
      es: "¡Que tenga un maravilloso día y disfrute de su evento este fin de semana!",
    },
  },
];

const TOTAL_DURATION = 210; // seconds

const SPEED_OPTIONS: { label: string; value: number }[] = [
  { label: "1×", value: 1 },
  { label: "2.5×", value: 2.5 },
  { label: "3×", value: 3 },
];

const LANGUAGE_OPTIONS: { label: string; value: Language }[] = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
];

/* ─── Helpers ─── */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getActiveMessageIndex(currentTime: number): number {
  let active = 0;
  for (let i = 0; i < MESSAGES.length; i++) {
    if (MESSAGES[i].timestampSec <= currentTime) active = i;
    else break;
  }
  return active;
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
          description="Pre-filled from this conversation"
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
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
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
              <Textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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

/* ─── Message Bubble ─── */
function MessageBubble({
  message,
  language,
  isActive,
  bubbleRef,
}: {
  message: ConversationMessage;
  language: Language;
  isActive: boolean;
  bubbleRef?: React.Ref<HTMLDivElement>;
}) {
  const isSupport = message.speaker === "support";

  return (
    <div
      ref={bubbleRef}
      className={cn(
        "flex gap-3 transition-all duration-200",
        isSupport ? "flex-row" : "flex-row-reverse",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full mt-0.5",
          isSupport
            ? "bg-primary/10 text-primary"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {isSupport ? (
          <Headphones className="size-4" />
        ) : (
          <User className="size-4" />
        )}
      </div>

      {/* Bubble */}
      <div className={cn("flex max-w-[72%] flex-col gap-1", isSupport ? "items-start" : "items-end")}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {isSupport ? "Support Agent" : "Customer"}
          </span>
          <span className="text-xs text-muted-foreground/60">
            {formatTime(message.timestampSec)}
          </span>
        </div>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-colors duration-200",
            isSupport
              ? "bg-card border border-border text-foreground rounded-tl-sm"
              : "bg-primary text-primary-foreground rounded-tr-sm",
            isActive && isSupport && "border-primary/40 bg-primary/5",
            isActive && !isSupport && "ring-2 ring-primary/30 ring-offset-1",
          )}
        >
          {message.translations[language]}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function ConversationStream() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [language, setLanguage] = useState<Language>("en");
  const [ticketSheetOpen, setTicketSheetOpen] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeMessageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const activeIdx = getActiveMessageIndex(currentTime);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
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
    if (isPlaying) {
      startTimer();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isPlaying, startTimer, clearTimer]);

  // Auto-scroll active message into view
  useEffect(() => {
    const el = activeMessageRefs.current[activeIdx];
    if (el && isPlaying) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIdx, isPlaying]);

  const handlePlayPause = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const handleSkipForward = () => {
    setCurrentTime((t) => Math.min(t + 15, TOTAL_DURATION));
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const progress = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-app-shell-main">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <PhoneCall className="size-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Call Recording</h1>
            <p className="text-xs text-muted-foreground">
              Customer Support · Order #58421 · Shoe Size Dispute
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="flex items-center gap-1.5">
            <Globe className="size-4 text-muted-foreground" />
            <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
              <SelectTrigger size="sm" className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setTicketSheetOpen(true)}
          >
            <TicketIcon className="size-3.5" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Participants */}
      <div className="flex items-center gap-4 border-b border-border/60 bg-card/40 px-6 py-2.5">
        <div className="flex items-center gap-1.5">
          <Badge variant="secondary" className="gap-1 text-xs font-normal">
            <Headphones className="size-3" />
            Support Agent
          </Badge>
          <span className="text-xs text-muted-foreground">Sarah M.</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="gap-1 text-xs font-normal">
            <User className="size-3" />
            Customer
          </Badge>
          <span className="text-xs text-muted-foreground">Alex K.</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Duration:</span>
          <span className="text-xs font-medium text-foreground">{formatTime(TOTAL_DURATION)}</span>
        </div>
      </div>

      {/* Transcript */}
      <div
        ref={transcriptRef}
        className="flex-1 overflow-y-auto px-6 py-5"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {MESSAGES.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              language={language}
              isActive={i === activeIdx}
              bubbleRef={(el) => {
                activeMessageRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* Audio Player */}
      <div className="border-t border-border bg-card/60 px-6 py-4 backdrop-blur-sm">
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            min={0}
            max={TOTAL_DURATION}
            step={0.1}
            value={[currentTime]}
            onValueChange={handleSeek}
            className="[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-thumb]]:size-3"
          />
          <div className="mt-1.5 flex justify-between">
            <span className="text-xs tabular-nums text-muted-foreground">{formatTime(currentTime)}</span>
            <span className="text-xs tabular-nums text-muted-foreground">{formatTime(TOTAL_DURATION)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <Button
              size="icon"
              variant="default"
              className="size-9 rounded-full"
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
            </Button>

            {/* Skip forward 15s */}
            <Button
              size="icon"
              variant="ghost"
              className="size-9 cursor-pointer"
              onClick={handleSkipForward}
              aria-label="Skip forward 15 seconds"
            >
              <FastForward className="size-4" />
            </Button>
          </div>

          {/* Center: currently speaking */}
          <div className="hidden items-center gap-1.5 sm:flex">
            {activeIdx < MESSAGES.length && (
              <span className="text-xs text-muted-foreground">
                {MESSAGES[activeIdx].speaker === "support" ? "Sarah M." : "Alex K."} speaking
              </span>
            )}
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-1">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSpeed(opt.value)}
                className={cn(
                  "cursor-pointer rounded px-2.5 py-1 text-xs font-medium transition-colors duration-150",
                  speed === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CreateTicketSheet
        open={ticketSheetOpen}
        onOpenChange={setTicketSheetOpen}
      />
    </div>
  );
}
