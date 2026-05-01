import { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronLeft, Sparkles, ChevronDown, ChevronUp,
  Clock, Star, Share2, ClipboardList, Ticket,
  X, Play, Send, Plus, Check, FileText,
  Globe, Inbox, Users, Zap, Palette,
  ArrowDown, Maximize2, Settings, Eye, Save,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */
type BuilderMode = "ai" | "manual";
type WorkflowStepType = "trigger" | "reports" | "customize" | "summary" | "delivery";
type Frequency = "daily" | "weekly" | "monthly";
type OutputFormat = "PDF" | "XLS" | "PPT" | "PNG";

interface ReportModule {
  id: string;
  module: string;
  icon: typeof Star;
  reports: { id: string; label: string; selected: boolean }[];
}

interface WorkflowStep {
  id: string;
  type: WorkflowStepType;
  label: string;
  description: string;
  enabled: boolean;
  completed: boolean;
}

interface ScheduleConfig {
  name: string;
  frequency: Frequency;
  dayOfWeek: string;
  dayOfMonth: string;
  time: string;
  timezone: string;
}

interface DeliveryConfig {
  recipients: string[];
  subject: string;
  body: string;
  format: OutputFormat;
}

interface CustomizationConfig {
  theme: string;
  layout: string;
  pageCover: boolean;
  font: string;
  spacing: string;
  pageNumbers: boolean;
  generatedDate: boolean;
}

interface AiMessage {
  role: "user" | "assistant";
  text: string;
}

/* ═══════════════════════════════════════════
   Mock Data
   ═══════════════════════════════════════════ */
const reportModules: ReportModule[] = [
  {
    id: "reviews", module: "Reviews", icon: Star,
    reports: [
      { id: "reviews-ratings", label: "Reviews & ratings", selected: true },
      { id: "response-rate", label: "Response rate", selected: true },
      { id: "response-time", label: "Response time", selected: false },
      { id: "review-distribution", label: "Review distribution", selected: false },
    ],
  },
  {
    id: "social", module: "Social", icon: Share2,
    reports: [
      { id: "profile-performance", label: "Profile performance", selected: true },
      { id: "response-trends", label: "Response trends", selected: false },
      { id: "engagement-metrics", label: "Engagement metrics", selected: false },
    ],
  },
  {
    id: "inbox", module: "Inbox", icon: Inbox,
    reports: [
      { id: "message-volume", label: "Message volume", selected: false },
      { id: "response-times", label: "Response times", selected: false },
    ],
  },
  {
    id: "listings", module: "Listings", icon: Globe,
    reports: [
      { id: "listing-accuracy", label: "Listing accuracy", selected: false },
      { id: "listing-health", label: "Listing health", selected: false },
    ],
  },
  {
    id: "surveys", module: "Surveys", icon: ClipboardList,
    reports: [
      { id: "survey-nps", label: "Survey NPS", selected: false },
      { id: "survey-responses", label: "Survey responses", selected: false },
    ],
  },
  {
    id: "ticketing", module: "Ticketing", icon: Ticket,
    reports: [
      { id: "ticket-count", label: "Ticket count", selected: true },
      { id: "ticket-resolution", label: "Ticket resolution time", selected: false },
    ],
  },
  {
    id: "campaigns", module: "Campaigns", icon: Send,
    reports: [
      { id: "campaign-performance", label: "Campaign performance", selected: false },
      { id: "email-metrics", label: "Email metrics", selected: false },
    ],
  },
  {
    id: "contacts", module: "Contacts", icon: Users,
    reports: [
      { id: "lists-segments", label: "Lists & segments", selected: false },
      { id: "contact-growth", label: "Contact growth", selected: false },
    ],
  },
];

const defaultSteps: WorkflowStep[] = [
  { id: "s1", type: "trigger",    label: "Schedule trigger",     description: "Weekly, Monday, 8:00 AM IST", enabled: true, completed: true },
  { id: "s2", type: "reports",    label: "Select reports",       description: "4 reports across 3 modules", enabled: true, completed: true },
  { id: "s3", type: "customize",  label: "Custom Report Agent",  description: "Executive theme, comfortable spacing", enabled: true, completed: false },
  { id: "s4", type: "summary",    label: "Generate AI summary",  description: "Executive summary with key insights", enabled: true, completed: false },
  { id: "s5", type: "delivery",   label: "Send report",          description: "PDF to 3 recipients", enabled: true, completed: false },
];

const timezones = [
  "Asia/Kolkata", "America/New_York", "America/Chicago", "America/Los_Angeles",
  "Europe/London", "Europe/Berlin", "Asia/Tokyo", "Australia/Sydney",
];

const themes = ["Executive", "Modern", "Minimal", "Dark analytics", "Corporate", "Clean"];
const layouts = ["Standard", "Compact", "Presentation", "Dashboard"];
const fonts = ["Inter", "Roboto", "Helvetica", "Georgia", "Merriweather"];
const spacings = ["Comfortable", "Compact", "Spacious"];

/* ═══════════════════════════════════════════
   Select field (reusable)
   ═══════════════════════════════════════════ */
function SelectField({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] hover:border-[#c0c6d4] dark:hover:border-[#4d5568] transition-colors"
        style={{ fontWeight: 400 }}
      >
        <span>{value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] shadow-lg py-1 max-h-[180px] overflow-y-auto">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors ${opt === value ? "text-[#2552ED]" : "text-[#212121] dark:text-[#e4e4e4]"}`}
                style={{ fontWeight: 400 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Left Panel – AI Mode
   ═══════════════════════════════════════════ */
function AiChatPanel({ onApply }: { onApply: (text: string) => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AiMessage[]>([
    { role: "assistant", text: "I'll help you create a scheduled report. Describe what you'd like — which reports, how often, recipients, and any styling preferences." },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim() || isThinking) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      let response = "";
      const lower = userMsg.toLowerCase();
      if (lower.includes("weekly") || lower.includes("schedule") || lower.includes("create")) {
        response = "I've configured the schedule based on your request. Here's what I've set up:\n\n- **Trigger:** Weekly, Monday, 8:00 AM IST\n- **Reports:** Reviews & ratings, Response rate, Profile performance, Ticket count\n- **Theme:** Executive\n- **Format:** PDF\n- **Summary:** Executive summary enabled\n\nYou can review and adjust each step in the workflow canvas. Would you like to modify anything?";
      } else if (lower.includes("add") && (lower.includes("social") || lower.includes("survey"))) {
        response = "Done! I've added the Social analytics and Survey NPS reports to your schedule. The delivery configuration has been updated accordingly. Want me to adjust the theme or layout too?";
      } else if (lower.includes("theme") || lower.includes("style") || lower.includes("dark")) {
        response = "I've applied the Dark analytics theme with compact spacing. The report preview will update with the new styling. Would you like to adjust the font or add page numbers?";
      } else if (lower.includes("recipient") || lower.includes("send") || lower.includes("email")) {
        response = "I've updated the recipients list. The email subject and body have been auto-generated based on the selected reports. You can customize them in the delivery step.";
      } else {
        response = "I can help you with that. Try telling me:\n- Which reports to include (e.g., \"Add Reviews and Social reports\")\n- Schedule frequency (e.g., \"Weekly on Monday at 8 AM\")\n- Styling preferences (e.g., \"Use dark analytics theme\")\n- Recipients (e.g., \"Send to leadership@company.com\")\n\nWhat would you like to configure?";
      }
      setMessages(prev => [...prev, { role: "assistant", text: response }]);
      setIsThinking(false);
      onApply(userMsg);
    }, 1500);
  }, [input, isThinking, onApply]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[90%] px-3 py-2.5 rounded-[10px] text-[12px] ${
                msg.role === "user"
                  ? "bg-[#2552ED] text-white rounded-br-[3px]"
                  : "bg-[#f0f1f5] dark:bg-[#262b35] text-[#212121] dark:text-[#e4e4e4] rounded-bl-[3px]"
              }`}
              style={{ fontWeight: 300, lineHeight: "18px", whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:400">$1</strong>').replace(/\n/g, '<br/>') }}
            />
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-[#f0f1f5] dark:bg-[#262b35] px-3 py-2.5 rounded-[10px] rounded-bl-[3px] flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2552ED] animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2552ED] animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2552ED] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#e5e9f0] dark:border-[#2e3340] shrink-0">
        <div className="flex items-center gap-2 bg-[#f8f9fb] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] px-3 h-[38px]">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Describe your schedule..."
            className="flex-1 bg-transparent text-[12px] text-[#212121] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] outline-none"
            style={{ fontWeight: 300 }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="w-6 h-6 rounded-md bg-[#2552ED] hover:bg-[#1E44CC] disabled:opacity-30 flex items-center justify-center transition-colors shrink-0"
          >
            <Send className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Left Panel – Manual Toolbox
   ═══════════════════════════════════════════ */
function ManualToolbox() {
  const [triggerExpanded, setTriggerExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);
  const [modulesExpanded, setModulesExpanded] = useState(true);

  const triggers = [
    { label: "Schedule-based", icon: Clock },
  ];
  const tasks = [
    { label: "Generate report", icon: FileText },
    { label: "Custom Report Agent", icon: Palette },
    { label: "Generate summary", icon: Sparkles },
    { label: "Send report", icon: Send },
  ];
  const modules = reportModules.map(m => ({ label: m.module, icon: m.icon }));

  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
      {/* Triggers */}
      <div>
        <button onClick={() => setTriggerExpanded(!triggerExpanded)} className="flex items-center justify-between w-full px-2 py-1.5 text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>
          <span>Triggers</span>
          {triggerExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {triggerExpanded && triggers.map(t => (
          <div key={t.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] hover:bg-[#f0f1f5] dark:hover:bg-[#262b35] cursor-grab transition-colors">
            <div className="w-7 h-7 rounded-[6px] bg-[#f0f1f5] dark:bg-[#2a3040] flex items-center justify-center shrink-0">
              <t.icon className="w-3.5 h-3.5 text-[#2552ED]" />
            </div>
            <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div>
        <button onClick={() => setTasksExpanded(!tasksExpanded)} className="flex items-center justify-between w-full px-2 py-1.5 text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>
          <span>Tasks</span>
          {tasksExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {tasksExpanded && tasks.map(t => (
          <div key={t.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] hover:bg-[#f0f1f5] dark:hover:bg-[#262b35] cursor-grab transition-colors">
            <div className="w-7 h-7 rounded-[6px] bg-[#f0f1f5] dark:bg-[#2a3040] flex items-center justify-center shrink-0">
              <t.icon className="w-3.5 h-3.5 text-[#555] dark:text-[#9ba2b0]" />
            </div>
            <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Product modules */}
      <div>
        <button onClick={() => setModulesExpanded(!modulesExpanded)} className="flex items-center justify-between w-full px-2 py-1.5 text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>
          <span>Products</span>
          {modulesExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {modulesExpanded && modules.map(m => (
          <div key={m.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-[8px] hover:bg-[#f0f1f5] dark:hover:bg-[#262b35] cursor-grab transition-colors">
            <div className="w-7 h-7 rounded-[6px] bg-[#f0f1f5] dark:bg-[#2a3040] flex items-center justify-center shrink-0">
              <m.icon className="w-3.5 h-3.5 text-[#555] dark:text-[#9ba2b0]" />
            </div>
            <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Workflow Canvas (Center)
   ═══════════════════════════════════════════ */
function WorkflowCanvas({
  steps,
  activeStep,
  onSelectStep,
  onToggleStep,
}: {
  steps: WorkflowStep[];
  activeStep: string | null;
  onSelectStep: (id: string) => void;
  onToggleStep: (id: string) => void;
}) {
  const stepIcons: Record<WorkflowStepType, typeof Clock> = {
    trigger: Clock,
    reports: FileText,
    customize: Palette,
    summary: Sparkles,
    delivery: Send,
  };
  const stepColors: Record<WorkflowStepType, string> = {
    trigger: "#2552ED",
    reports: "#7b1fa2",
    customize: "#e65100",
    summary: "#9970D7",
    delivery: "#2e7d32",
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8 overflow-y-auto">
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => {
          const Icon = stepIcons[step.type];
          const color = stepColors[step.type];
          const isActive = activeStep === step.id;
          const isLast = i === steps.length - 1;

          return (
            <div key={step.id} className="flex flex-col items-center">
              {/* Node */}
              <button
                onClick={() => onSelectStep(step.id)}
                className={`relative w-[340px] border rounded-[12px] px-5 py-4 text-left transition-all ${
                  isActive
                    ? "border-[#2552ED] bg-white dark:bg-[#1e2229] shadow-[0_0_0_2px_rgba(37,82,237,0.15)]"
                    : step.enabled
                    ? "border-[#e5e9f0] dark:border-[#333a47] bg-white dark:bg-[#1e2229] hover:border-[#c0c6d4] dark:hover:border-[#4d5568]"
                    : "border-[#e5e9f0] dark:border-[#333a47] bg-[#fafbfc] dark:bg-[#1a1d24] opacity-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>
                          Step {i + 1}
                        </span>
                        {step.completed && (
                          <span className="w-4 h-4 rounded-full bg-[#e8f5e9] dark:bg-[#1a3328] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-[#2e7d32] dark:text-[#6fcf73]" />
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleStep(step.id); }}
                        className={`w-7 h-4 rounded-full relative transition-colors ${
                          step.enabled
                            ? "bg-[#2552ED]"
                            : "bg-[#d0d5dd] dark:bg-[#4d5568]"
                        }`}
                      >
                        <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${
                          step.enabled ? "left-3.5" : "left-0.5"
                        }`} />
                      </button>
                    </div>
                    <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] mt-1" style={{ fontWeight: 400 }}>
                      {step.label}
                    </p>
                    <p className="text-[11px] text-[#888] dark:text-[#6b7280] mt-0.5" style={{ fontWeight: 300 }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>

              {/* Connector */}
              {!isLast && (
                <div className="flex flex-col items-center py-1">
                  <div className="w-px h-6 bg-[#d0d5dd] dark:bg-[#333a47]" />
                  <ArrowDown className="w-3 h-3 text-[#d0d5dd] dark:text-[#333a47] -mt-1" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Right Panel – Step Configuration
   ═══════════════════════════════════════════ */
function TriggerConfig({ config, onChange }: { config: ScheduleConfig; onChange: (c: ScheduleConfig) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Schedule name</label>
        <input
          value={config.name}
          onChange={e => onChange({ ...config, name: e.target.value })}
          className="w-full px-3 py-2 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] outline-none focus:border-[#2552ED]"
          style={{ fontWeight: 400 }}
        />
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Frequency</label>
        <SelectField value={config.frequency.charAt(0).toUpperCase() + config.frequency.slice(1)} options={["Daily", "Weekly", "Monthly"]} onChange={v => onChange({ ...config, frequency: v.toLowerCase() as Frequency })} />
      </div>
      {config.frequency === "weekly" && (
        <div>
          <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Day of week</label>
          <SelectField value={config.dayOfWeek} options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} onChange={v => onChange({ ...config, dayOfWeek: v })} />
        </div>
      )}
      {config.frequency === "monthly" && (
        <div>
          <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Day of month</label>
          <SelectField value={config.dayOfMonth} options={["1st", "5th", "10th", "15th", "20th", "25th", "Last day"]} onChange={v => onChange({ ...config, dayOfMonth: v })} />
        </div>
      )}
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Time</label>
        <SelectField value={config.time} options={["6:00 AM", "7:00 AM", "7:30 AM", "8:00 AM", "9:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "5:00 PM"]} onChange={v => onChange({ ...config, time: v })} />
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Timezone</label>
        <SelectField value={config.timezone} options={timezones} onChange={v => onChange({ ...config, timezone: v })} />
      </div>
    </div>
  );
}

function ReportSelector({ modules, onToggle }: { modules: ReportModule[]; onToggle: (moduleId: string, reportId: string) => void }) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    modules.forEach(m => { if (m.reports.some(r => r.selected)) init[m.id] = true; });
    return init;
  });

  const selectedCount = modules.reduce((sum, m) => sum + m.reports.filter(r => r.selected).length, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>Select reports</span>
        <span className="text-[11px] text-[#2552ED] dark:text-[#6b9bff]" style={{ fontWeight: 400 }}>{selectedCount} selected</span>
      </div>
      <div className="space-y-1">
        {modules.map(mod => {
          const isExpanded = expandedModules[mod.id];
          const modSelectedCount = mod.reports.filter(r => r.selected).length;
          return (
            <div key={mod.id} className="border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] overflow-hidden">
              <button
                onClick={() => setExpandedModules(p => ({ ...p, [mod.id]: !p[mod.id] }))}
                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#f8f9fb] dark:hover:bg-[#232830] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <mod.icon className="w-3.5 h-3.5 text-[#555] dark:text-[#9ba2b0]" />
                  <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{mod.module}</span>
                  {modSelectedCount > 0 && (
                    <span className="text-[10px] text-[#2552ED] dark:text-[#6b9bff] bg-[#e8effe] dark:bg-[#1e2d5e] px-1.5 py-0.5 rounded-full">{modSelectedCount}</span>
                  )}
                </div>
                {isExpanded ? <ChevronUp className="w-3 h-3 text-[#888] dark:text-[#6b7280]" /> : <ChevronDown className="w-3 h-3 text-[#888] dark:text-[#6b7280]" />}
              </button>
              {isExpanded && (
                <div className="border-t border-[#e5e9f0] dark:border-[#333a47] px-3 py-1.5 space-y-0.5">
                  {mod.reports.map(report => (
                    <button
                      key={report.id}
                      onClick={() => onToggle(mod.id, report.id)}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-[6px] hover:bg-[#f0f1f5] dark:hover:bg-[#262b35] transition-colors text-left"
                    >
                      <div className={`w-4 h-4 rounded-[3px] border-2 flex items-center justify-center shrink-0 transition-all ${
                        report.selected ? "bg-[#2552ED] border-[#2552ED]" : "border-[#d0d5dd] dark:border-[#4d5568]"
                      }`}>
                        {report.selected && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-[12px] ${report.selected ? "text-[#212121] dark:text-[#e4e4e4]" : "text-[#555] dark:text-[#9ba2b0]"}`} style={{ fontWeight: report.selected ? 400 : 300 }}>
                        {report.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CustomizeConfig({ config, onChange }: { config: CustomizationConfig; onChange: (c: CustomizationConfig) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Theme</label>
        <SelectField value={config.theme} options={themes} onChange={v => onChange({ ...config, theme: v })} />
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Layout</label>
        <SelectField value={config.layout} options={layouts} onChange={v => onChange({ ...config, layout: v })} />
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Font</label>
        <SelectField value={config.font} options={fonts} onChange={v => onChange({ ...config, font: v })} />
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Spacing</label>
        <SelectField value={config.spacing} options={spacings} onChange={v => onChange({ ...config, spacing: v })} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Page cover</span>
        <button onClick={() => onChange({ ...config, pageCover: !config.pageCover })} className={`w-8 h-[18px] rounded-full relative transition-colors ${config.pageCover ? "bg-[#2552ED]" : "bg-[#d0d5dd] dark:bg-[#4d5568]"}`}>
          <span className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all ${config.pageCover ? "left-[15px]" : "left-[2px]"}`} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Page numbers</span>
        <button onClick={() => onChange({ ...config, pageNumbers: !config.pageNumbers })} className={`w-8 h-[18px] rounded-full relative transition-colors ${config.pageNumbers ? "bg-[#2552ED]" : "bg-[#d0d5dd] dark:bg-[#4d5568]"}`}>
          <span className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all ${config.pageNumbers ? "left-[15px]" : "left-[2px]"}`} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Generated date</span>
        <button onClick={() => onChange({ ...config, generatedDate: !config.generatedDate })} className={`w-8 h-[18px] rounded-full relative transition-colors ${config.generatedDate ? "bg-[#2552ED]" : "bg-[#d0d5dd] dark:bg-[#4d5568]"}`}>
          <span className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all ${config.generatedDate ? "left-[15px]" : "left-[2px]"}`} />
        </button>
      </div>
    </div>
  );
}

function SummaryConfig() {
  const [summaryType, setSummaryType] = useState("Executive");
  return (
    <div className="space-y-4">
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Summary type</label>
        <SelectField value={summaryType} options={["Executive", "Detailed", "Key metrics only", "Custom"]} onChange={setSummaryType} />
      </div>
      <div className="bg-[#f8f9fb] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-[#9970D7]" />
          <span className="text-[11px] text-[#9970D7]" style={{ fontWeight: 400 }}>AI-generated preview</span>
        </div>
        <p className="text-[11px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 300, lineHeight: "16px" }}>
          This week's performance overview highlights a 12% increase in review volume, with an average rating of 4.3 stars across all locations. Social engagement rose 8%, driven by Instagram stories. Ticket resolution maintained a 95% SLA compliance rate.
        </p>
      </div>
    </div>
  );
}

function DeliveryConfig({ config, onChange }: { config: DeliveryConfig; onChange: (c: DeliveryConfig) => void }) {
  const [recipientInput, setRecipientInput] = useState("");

  const addRecipient = () => {
    if (recipientInput.trim() && recipientInput.includes("@")) {
      onChange({ ...config, recipients: [...config.recipients, recipientInput.trim()] });
      setRecipientInput("");
    }
  };

  const removeRecipient = (email: string) => {
    onChange({ ...config, recipients: config.recipients.filter(r => r !== email) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Output format</label>
        <div className="flex gap-2">
          {(["PDF", "XLS", "PPT", "PNG"] as OutputFormat[]).map(fmt => (
            <button
              key={fmt}
              onClick={() => onChange({ ...config, format: fmt })}
              className={`px-3 py-1.5 rounded-[8px] border text-[12px] transition-all ${
                config.format === fmt
                  ? "border-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] dark:text-[#6b9bff]"
                  : "border-[#e5e9f0] dark:border-[#333a47] text-[#555] dark:text-[#9ba2b0] hover:border-[#c0c6d4] dark:hover:border-[#4d5568]"
              }`}
              style={{ fontWeight: 400 }}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Recipients</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {config.recipients.map(r => (
            <span key={r} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] bg-[#f0f1f5] dark:bg-[#262b35] text-[#212121] dark:text-[#e4e4e4] border border-[#e5e9f0] dark:border-[#333a47]" style={{ fontWeight: 300 }}>
              {r}
              <button onClick={() => removeRecipient(r)} className="text-[#888] dark:text-[#6b7280] hover:text-[#c62828]">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input
            value={recipientInput}
            onChange={e => setRecipientInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addRecipient()}
            placeholder="Add email address"
            className="flex-1 px-3 py-2 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] outline-none focus:border-[#2552ED]"
            style={{ fontWeight: 300 }}
          />
          <button onClick={addRecipient} className="px-2.5 py-2 bg-[#f0f1f5] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors">
            <Plus className="w-3.5 h-3.5 text-[#555] dark:text-[#9ba2b0]" />
          </button>
        </div>
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Subject</label>
        <input
          value={config.subject}
          onChange={e => onChange({ ...config, subject: e.target.value })}
          className="w-full px-3 py-2 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] outline-none focus:border-[#2552ED]"
          style={{ fontWeight: 400 }}
        />
      </div>
      <div>
        <label className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px] mb-1.5 block" style={{ fontWeight: 400 }}>Email body</label>
        <textarea
          value={config.body}
          onChange={e => onChange({ ...config, body: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 bg-white dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#212121] dark:text-[#e4e4e4] outline-none focus:border-[#2552ED] resize-none"
          style={{ fontWeight: 300 }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
interface ScheduleBuilderViewProps {
  onBack: () => void;
}

export function ScheduleBuilderView({ onBack }: ScheduleBuilderViewProps) {
  const [mode, setMode] = useState<BuilderMode>("manual");
  const [steps, setSteps] = useState<WorkflowStep[]>(defaultSteps);
  const [activeStep, setActiveStep] = useState<string | null>("s1");
  const [modules, setModules] = useState<ReportModule[]>(reportModules);

  const [scheduleConfig, setScheduleConfig] = useState<ScheduleConfig>({
    name: "Weekly executive digest",
    frequency: "weekly",
    dayOfWeek: "Monday",
    dayOfMonth: "1st",
    time: "8:00 AM",
    timezone: "Asia/Kolkata",
  });

  const [customConfig, setCustomConfig] = useState<CustomizationConfig>({
    theme: "Executive",
    layout: "Presentation",
    pageCover: true,
    font: "Inter",
    spacing: "Comfortable",
    pageNumbers: true,
    generatedDate: true,
  });

  const [deliveryConfig, setDeliveryConfig] = useState<DeliveryConfig>({
    recipients: ["leadership@company.com", "sarah.chen@company.com", "balaji@company.com"],
    subject: "Scheduled report: Weekly executive digest - Last 7 days",
    body: "Your scheduled report combining Reviews, Social, and Ticketing is ready for review. Key highlights and AI-generated insights are included.",
    format: "PDF",
  });

  const toggleReport = useCallback((moduleId: string, reportId: string) => {
    setModules(prev => prev.map(m =>
      m.id === moduleId
        ? { ...m, reports: m.reports.map(r => r.id === reportId ? { ...r, selected: !r.selected } : r) }
        : m
    ));
  }, []);

  const toggleStep = useCallback((id: string) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  }, []);

  const handleAiApply = useCallback((_: string) => {
    // In real app, AI would update the config based on parsed intent
  }, []);

  const handleSave = useCallback((activate: boolean) => {
    const selectedReports = modules.flatMap(m => m.reports.filter(r => r.selected));
    if (selectedReports.length === 0) {
      toast.error("Select at least one report");
      return;
    }
    if (deliveryConfig.recipients.length === 0) {
      toast.error("Add at least one recipient");
      return;
    }
    if (activate) {
      toast.success(`"${scheduleConfig.name}" activated! Next run: ${scheduleConfig.dayOfWeek}, ${scheduleConfig.time} ${scheduleConfig.timezone}`);
    } else {
      toast.success(`"${scheduleConfig.name}" saved as draft`);
    }
    setTimeout(() => onBack(), 800);
  }, [modules, deliveryConfig, scheduleConfig, onBack]);

  // Update step descriptions based on config
  const selectedReportCount = modules.reduce((sum, m) => sum + m.reports.filter(r => r.selected).length, 0);
  const selectedModuleCount = modules.filter(m => m.reports.some(r => r.selected)).length;
  const dynamicSteps = steps.map(s => {
    if (s.type === "trigger") return { ...s, description: `${scheduleConfig.frequency.charAt(0).toUpperCase() + scheduleConfig.frequency.slice(1)}, ${scheduleConfig.frequency === "weekly" ? scheduleConfig.dayOfWeek : scheduleConfig.dayOfMonth}, ${scheduleConfig.time} ${scheduleConfig.timezone.split("/")[1]}` };
    if (s.type === "reports") return { ...s, description: `${selectedReportCount} reports across ${selectedModuleCount} modules` };
    if (s.type === "customize") return { ...s, description: `${customConfig.theme} theme, ${customConfig.spacing.toLowerCase()} spacing` };
    if (s.type === "delivery") return { ...s, description: `${deliveryConfig.format} to ${deliveryConfig.recipients.length} recipients` };
    return s;
  });

  const currentStep = dynamicSteps.find(s => s.id === activeStep);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300">
      {/* Header */}
      <div className="shrink-0 h-[52px] flex items-center justify-between px-4 border-b border-[#eaeaea] dark:border-[#2e3340]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-7 h-7 rounded-[6px] border border-[#e5e9f0] dark:border-[#333a47] flex items-center justify-center hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#555] dark:text-[#8b92a5]" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#2552ED]" />
            <span className="text-[14px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.28px]" style={{ fontWeight: 400 }}>
              {scheduleConfig.name || "New scheduled agent"}
            </span>
          </div>
          <span className="text-[10px] text-[#888] dark:text-[#6b7280] bg-[#f0f1f5] dark:bg-[#262b35] px-2 py-0.5 rounded-full uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>
            Draft
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            className="h-[32px] px-3 border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] text-[12px] text-[#555] dark:text-[#9ba2b0] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors flex items-center gap-1.5"
            style={{ fontWeight: 400 }}
          >
            <Save className="w-3.5 h-3.5" />
            Save draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="h-[32px] px-4 bg-[#2552ED] hover:bg-[#1E44CC] text-white rounded-[8px] text-[12px] transition-colors flex items-center gap-1.5"
            style={{ fontWeight: 400 }}
          >
            <Play className="w-3 h-3" />
            Activate
          </button>
        </div>
      </div>

      {/* Three-panel layout */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[260px] border-r border-[#e5e9f0] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] flex flex-col shrink-0 overflow-hidden">
          {/* Mode toggle */}
          <div className="px-4 pt-4 pb-3 shrink-0">
            <div className="inline-flex bg-[#f0f1f5] dark:bg-[#262b35] rounded-full p-[2px]">
              <button
                onClick={() => setMode("ai")}
                className={`flex items-center justify-center gap-1 px-3 py-[5px] rounded-full text-[12px] transition-all duration-200 ${
                  mode === "ai"
                    ? "bg-white dark:bg-[#333a47] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#212121] dark:text-[#e4e4e4]"
                    : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4]"
                }`}
                style={{ fontWeight: 400 }}
              >
                <Sparkles className="w-3 h-3 text-[#6834B7]" />
                AI
              </button>
              <button
                onClick={() => setMode("manual")}
                className={`flex items-center justify-center px-3 py-[5px] rounded-full text-[12px] transition-all duration-200 ${
                  mode === "manual"
                    ? "bg-white dark:bg-[#333a47] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#212121] dark:text-[#e4e4e4]"
                    : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4]"
                }`}
                style={{ fontWeight: 400 }}
              >
                Manual
              </button>
            </div>
          </div>

          {/* Panel content */}
          {mode === "ai" ? (
            <AiChatPanel onApply={handleAiApply} />
          ) : (
            <ManualToolbox />
          )}
        </div>

        {/* Center – Workflow Canvas */}
        <div className="flex-1 bg-[#fafbfc] dark:bg-[#13161b] overflow-hidden flex flex-col">
          {/* Canvas header */}
          <div className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#eaeaea] dark:border-[#2e3340]">
            <span className="text-[11px] text-[#888] dark:text-[#6b7280] uppercase tracking-[0.5px]" style={{ fontWeight: 400 }}>
              Workflow
            </span>
            <div className="flex items-center gap-1.5">
              <Button type="button" variant="outline" size="icon" className="rounded-[6px]" title="Preview">
                <Eye className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
              </Button>
              <Button type="button" variant="outline" size="icon" className="rounded-[6px]" title="Full screen">
                <Maximize2 className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
              </Button>
            </div>
          </div>
          <WorkflowCanvas
            steps={dynamicSteps}
            activeStep={activeStep}
            onSelectStep={setActiveStep}
            onToggleStep={toggleStep}
          />
        </div>

        {/* Right Panel – Configuration */}
        <div className="w-[300px] border-l border-[#e5e9f0] dark:border-[#2e3340] bg-white dark:bg-[#1e2229] flex flex-col shrink-0 overflow-hidden">
          <div className="shrink-0 px-4 py-3 border-b border-[#eaeaea] dark:border-[#2e3340] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentStep && (
                <>
                  {currentStep.type === "trigger" && <Clock className="w-3.5 h-3.5 text-[#2552ED]" />}
                  {currentStep.type === "reports" && <FileText className="w-3.5 h-3.5 text-[#7b1fa2]" />}
                  {currentStep.type === "customize" && <Palette className="w-3.5 h-3.5 text-[#e65100]" />}
                  {currentStep.type === "summary" && <Sparkles className="w-3.5 h-3.5 text-[#9970D7]" />}
                  {currentStep.type === "delivery" && <Send className="w-3.5 h-3.5 text-[#2e7d32]" />}
                </>
              )}
              <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>
                {currentStep?.label || "Select a step"}
              </span>
            </div>
            {activeStep && (
              <button onClick={() => setActiveStep(null)} className="text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#e4e4e4]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!activeStep && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Settings className="w-8 h-8 text-[#d0d5dd] dark:text-[#333a47] mb-3" />
                <p className="text-[13px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 400 }}>
                  Select a workflow step to configure
                </p>
              </div>
            )}
            {currentStep?.type === "trigger" && (
              <TriggerConfig config={scheduleConfig} onChange={setScheduleConfig} />
            )}
            {currentStep?.type === "reports" && (
              <ReportSelector modules={modules} onToggle={toggleReport} />
            )}
            {currentStep?.type === "customize" && (
              <CustomizeConfig config={customConfig} onChange={setCustomConfig} />
            )}
            {currentStep?.type === "summary" && (
              <SummaryConfig />
            )}
            {currentStep?.type === "delivery" && (
              <DeliveryConfig config={deliveryConfig} onChange={setDeliveryConfig} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}