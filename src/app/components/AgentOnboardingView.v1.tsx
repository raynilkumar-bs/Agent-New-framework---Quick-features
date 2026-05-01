import { useState, useCallback } from "react";
import {
  MessageSquare, Share2, Tag, Ticket, BarChart3, Globe, Send,
  CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Play,
  Star, Zap, ArrowRight, X, Bot,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

/* ═══════════════════════════════════════════
   Types & Data
   ═══════════════════════════════════════════ */
type OnboardingStep = "welcome" | "choose" | "context" | "recommend" | "test" | "done";

interface ProblemOption {
  id: string;
  label: string;
  description: string;
  icon: typeof MessageSquare;
  agentName: string;
  agentSlug: string;
}

interface ContextQuestion {
  problemId: string;
  question: string;
  options: { id: string; label: string }[];
}

interface ConfiguredAgent {
  id: string;
  name: string;
  description: string;
  icon: typeof MessageSquare;
  slug: string;
  settings: string[];
  enabled: boolean;
  tested: boolean;
}

const problems: ProblemOption[] = [
  { id: "respond-reviews", label: "Respond to customer reviews", description: "Automatically reply to reviews across all platforms with context-aware responses", icon: MessageSquare, agentName: "Review response agent", agentSlug: "review-response" },
  { id: "generate-reviews", label: "Generate review requests", description: "Send timely review requests to customers after visits or transactions", icon: Star, agentName: "Review generation agent", agentSlug: "review-generation" },
  { id: "social-publishing", label: "Manage social publishing", description: "Schedule and publish social media posts across all your channels", icon: Share2, agentName: "Social publishing agent", agentSlug: "social-publishing" },
  { id: "social-engagement", label: "Respond to social comments", description: "Engage with comments and messages on your social channels automatically", icon: Send, agentName: "Social engagement agent", agentSlug: "social-engagement" },
  { id: "optimize-listings", label: "Optimize business listings", description: "Keep your listings accurate and complete across all directories", icon: Globe, agentName: "Listing optimization agent", agentSlug: "listing-optimization" },
  { id: "handle-tickets", label: "Handle support tickets", description: "Triage, route, and resolve incoming support tickets intelligently", icon: Ticket, agentName: "Ticketing agent", agentSlug: "ticket-resolution" },
  { id: "send-reports", label: "Send automated reports", description: "Generate and deliver recurring performance reports to stakeholders", icon: BarChart3, agentName: "Reporting agent", agentSlug: "scheduled-reports" },
];

const contextQuestions: ContextQuestion[] = [
  {
    problemId: "respond-reviews",
    question: "How should AI respond to reviews?",
    options: [
      { id: "auto-all", label: "Automatically respond to all" },
      { id: "draft-approval", label: "Draft responses for approval" },
      { id: "negative-only", label: "Only respond to negative reviews" },
    ],
  },
  {
    problemId: "generate-reviews",
    question: "When should review requests be sent?",
    options: [
      { id: "after-visit", label: "After each visit or transaction" },
      { id: "weekly-batch", label: "Weekly batch requests" },
      { id: "smart-timing", label: "AI-optimized timing per customer" },
    ],
  },
  {
    problemId: "social-publishing",
    question: "How often do you post on social media?",
    options: [
      { id: "daily", label: "Daily" },
      { id: "weekly", label: "Weekly" },
      { id: "occasionally", label: "Occasionally" },
    ],
  },
  {
    problemId: "social-engagement",
    question: "How should AI handle social interactions?",
    options: [
      { id: "auto-respond", label: "Auto-respond to all comments" },
      { id: "positive-only", label: "Auto-respond to positive, flag negative" },
      { id: "draft-all", label: "Draft all responses for review" },
    ],
  },
  {
    problemId: "optimize-listings",
    question: "Which platforms matter most?",
    options: [
      { id: "google", label: "Google Business Profile" },
      { id: "all-major", label: "All major directories" },
      { id: "custom", label: "Custom platform selection" },
    ],
  },
  {
    problemId: "handle-tickets",
    question: "How should AI help with support tickets?",
    options: [
      { id: "auto-route", label: "Auto-route tickets" },
      { id: "suggest-responses", label: "Suggest responses" },
      { id: "escalate-urgent", label: "Escalate urgent tickets" },
    ],
  },
  {
    problemId: "send-reports",
    question: "How often would you like reports?",
    options: [
      { id: "weekly", label: "Weekly" },
      { id: "monthly", label: "Monthly" },
      { id: "custom", label: "Custom schedule" },
    ],
  },
];

const sampleReview = {
  platform: "Google",
  rating: 2,
  author: "Sarah M.",
  text: "The service was slow and I had to wait 30 minutes past my appointment time. Staff were nice though.",
  aiResponse: "Hi Sarah, thank you for sharing your experience. We sincerely apologize for the wait — that's not the standard we hold ourselves to. We're reviewing our scheduling process to ensure this doesn't happen again. We're glad our staff made a positive impression, and we'd love the chance to provide a better experience next time. Please reach out to us directly so we can make it right.",
};

/* ═══════════════════════════════════════════
   L2 Sidebar – Step Indicator Panel
   ═══════════════════════════════════════════ */
const stepOrder: OnboardingStep[] = ["welcome", "choose", "context", "recommend", "test", "done"];
const stepLabels: Record<OnboardingStep, string> = {
  welcome: "Welcome",
  choose: "Choose",
  context: "Configure",
  recommend: "Review",
  test: "Test",
  done: "Done",
};

function OnboardingSidebar({ current }: { current: OnboardingStep }) {
  const currentIdx = stepOrder.indexOf(current);

  return (
    <div className="w-[220px] bg-[#f0f1f5] dark:bg-[#1e2229] border-r border-[#f0f1f5] dark:border-[#2e3340] rounded-tl-lg flex flex-col h-full shrink-0 transition-colors duration-300">
      <div className="flex flex-col gap-2 px-6 pt-7">
        {/* Title */}
        <p className="text-[14px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.28px] mb-1" style={{ fontWeight: 400 }}>
          Agent setup
        </p>

        {/* Steps */}
        {stepOrder.map((step, i) => {
          const isCompleted = i < currentIdx;
          const isCurrent = i === currentIdx;

          return (
            <div key={step} className="flex items-center gap-1.5 h-[24px]">
              {/* Number circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 transition-all ${
                  isCompleted
                    ? "bg-[#2552ED] text-white"
                    : isCurrent
                    ? "border-2 border-[#2552ED] text-[#6b9bff]"
                    : "border border-[#d0d5dd] dark:border-[#333a47] text-[#999] dark:text-[#6b7280]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {/* Label */}
              <span
                className={`text-[12px] transition-colors ${
                  isCurrent
                    ? "text-[#212121] dark:text-[#e4e4e4]"
                    : isCompleted
                    ? "text-[#2552ED] dark:text-[#6b9bff]"
                    : "text-[#999] dark:text-[#6b7280]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {stepLabels[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Welcome Step
   ═══════════════════════════════════════════ */
function WelcomeStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  const capabilities = [
    "Reply to reviews automatically",
    "Publish social posts on schedule",
    "Manage and route support tickets",
    "Optimize your business listings",
    "Send scheduled performance reports",
  ];

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="w-[400px]">
        {/* AI sparkle icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-[16px] flex items-center justify-center border border-[#2552ED]/20"
            style={{ background: "linear-gradient(135deg, rgba(37, 82, 237, 0.2) 0%, rgba(37, 82, 237, 0.05) 100%)" }}
          >
            <Sparkles className="w-7 h-7 text-[#2552ED]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[24px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.5px] text-center mb-2" style={{ fontWeight: 400 }}>
          Meet your AI agents
        </h1>
        <p className="text-[15px] text-[#888] dark:text-[#8b92a5] text-center mb-8 mx-auto max-w-[366px]" style={{ fontWeight: 300 }}>
          Tell us what you'd like help with, and we'll set up the right agents for you.
        </p>

        {/* Capabilities card */}
        <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-6 pt-5 pb-5 mb-8">
          <p className="text-[13px] text-[#888] dark:text-[#8b92a5] mb-3" style={{ fontWeight: 400 }}>
            These agents can:
          </p>
          <div className="flex flex-col gap-2.5">
            {capabilities.map((cap) => (
              <div key={cap} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#2552ED]/20 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5" stroke="#2552ED" strokeWidth="1" />
                    <path d="M4.5 6L5.5 7L7.5 5" stroke="#2552ED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                  </svg>
                </div>
                <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 300 }}>
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <Button
            type="button"
            onClick={onNext}
            className="w-full gap-2 rounded-[8px] bg-[#2552ED] hover:bg-[#1E44CC] text-[14px] text-white"
            style={{ fontWeight: 400 }}
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            className="text-[13px] text-[#999] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#8b92a5] hover:bg-transparent"
            style={{ fontWeight: 300 }}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Choose Problems Step
   ═══════════════════════════════════════════ */
function ChooseStep({
  selected,
  onToggle,
  onNext,
  onBack,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center overflow-y-auto px-6 py-8">
      <div className="max-w-[640px] w-full">
        <h1 className="text-[22px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.44px] mb-1" style={{ fontWeight: 400 }}>
          What would you like AI to help with?
        </h1>
        <p className="text-[14px] text-[#888] dark:text-[#8b92a5] mb-6" style={{ fontWeight: 300 }}>
          Select the areas where you'd like to deploy agents. You can change this later.
        </p>

        <div className="space-y-3 mb-8">
          {problems.map((p) => {
            const isSelected = selected.has(p.id);
            return (
              <button
                key={p.id}
                onClick={() => onToggle(p.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[10px] border text-left transition-all ${
                  isSelected
                    ? "border-[#2552ED] bg-[#2552ED]/5 dark:bg-[#2552ED]/10"
                    : "border-[#E5E7EB] dark:border-[#2e3340] hover:border-[#c0c6d4] dark:hover:border-[#4d5568] bg-white dark:bg-[#1e2229]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#2552ED]/10 dark:bg-[#2552ED]/20"
                      : "bg-[#f0f1f5] dark:bg-[#262b35]"
                  }`}
                >
                  <p.icon className={`w-4 h-4 ${isSelected ? "text-[#2552ED]" : "text-[#888] dark:text-[#6b7280]"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[14px] tracking-[-0.28px] ${isSelected ? "text-[#2552ED] dark:text-[#6b9bff]" : "text-[#212121] dark:text-[#e4e4e4]"}`} style={{ fontWeight: 400 }}>
                    {p.label}
                  </p>
                  <p className="text-[12px] text-[#888] dark:text-[#6b7280] mt-0.5" style={{ fontWeight: 300 }}>
                    {p.description}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? "bg-[#2552ED] border-[#2552ED]"
                      : "border-[#d0d5dd] dark:border-[#4d5568]"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-1.5 rounded-[8px] px-4 text-[13px] text-[#555] dark:text-[#8b92a5]"
            style={{ fontWeight: 400 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={selected.size === 0}
            className="gap-1.5 rounded-[8px] px-5 bg-[#2552ED] hover:bg-[#1E44CC] text-[13px] text-white disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontWeight: 400 }}
          >
            Continue
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Context Questions Step
   ═══════════════════════════════════════════ */
function ContextStep({
  selectedProblems,
  answers,
  onAnswer,
  onNext,
  onBack,
}: {
  selectedProblems: Set<string>;
  answers: Record<string, string>;
  onAnswer: (problemId: string, answerId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const relevantQuestions = contextQuestions.filter((q) => selectedProblems.has(q.problemId));
  const allAnswered = relevantQuestions.every((q) => answers[q.problemId]);

  return (
    <div className="flex-1 flex flex-col items-center overflow-y-auto px-6 py-8">
      <div className="max-w-[580px] w-full">
        <h1 className="text-[22px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.44px] mb-1" style={{ fontWeight: 400 }}>
          A few quick questions
        </h1>
        <p className="text-[14px] text-[#888] dark:text-[#8b92a5] mb-6" style={{ fontWeight: 300 }}>
          Help us configure the right settings for your agents.
        </p>

        <div className="space-y-6 mb-8">
          {relevantQuestions.map((q) => {
            const problem = problems.find((p) => p.id === q.problemId);
            return (
              <div
                key={q.problemId}
                className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {problem && <problem.icon className="w-3.5 h-3.5 text-[#2552ED]" />}
                  <span className="text-[12px] text-[#2552ED] dark:text-[#6b9bff]" style={{ fontWeight: 400 }}>
                    {problem?.agentName}
                  </span>
                </div>
                <p className="text-[14px] text-[#212121] dark:text-[#e4e4e4] mb-3 tracking-[-0.28px]" style={{ fontWeight: 400 }}>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.problemId] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => onAnswer(q.problemId, opt.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border text-left transition-all ${
                          isSelected
                            ? "border-[#2552ED] bg-[#2552ED]/5 dark:bg-[#2552ED]/10"
                            : "border-[#E5E7EB] dark:border-[#2e3340] hover:border-[#c0c6d4] dark:hover:border-[#4d5568]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? "border-[#2552ED]" : "border-[#d0d5dd] dark:border-[#4d5568]"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#2552ED]" />}
                        </div>
                        <span
                          className={`text-[13px] ${isSelected ? "text-[#212121] dark:text-[#e4e4e4]" : "text-[#555] dark:text-[#8b92a5]"}`}
                          style={{ fontWeight: 300 }}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-1.5 rounded-[8px] px-4 text-[13px] text-[#555] dark:text-[#8b92a5]"
            style={{ fontWeight: 400 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={!allAnswered}
            className="gap-1.5 rounded-[8px] px-5 bg-[#2552ED] hover:bg-[#1E44CC] text-[13px] text-white disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontWeight: 400 }}
          >
            Continue
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Recommend Step
   ═══════════════════════════════════════════ */
function RecommendStep({
  agents,
  onToggleAgent,
  onNext,
  onBack,
}: {
  agents: ConfiguredAgent[];
  onToggleAgent: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const enabledCount = agents.filter((a) => a.enabled).length;

  return (
    <div className="flex-1 flex flex-col items-center overflow-y-auto px-6 py-8">
      <div className="max-w-[640px] w-full">
        <h1 className="text-[22px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.44px] mb-1" style={{ fontWeight: 400 }}>
          We've prepared these agents for you
        </h1>
        <p className="text-[14px] text-[#888] dark:text-[#8b92a5] mb-6" style={{ fontWeight: 300 }}>
          Review your configured agents and enable the ones you'd like to activate.
        </p>

        <div className="space-y-3 mb-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`border rounded-[12px] px-5 py-4 transition-all ${
                agent.enabled
                  ? "border-[#2552ED]/40 bg-[#2552ED]/[0.03] dark:bg-[#2552ED]/[0.06]"
                  : "border-[#E5E7EB] dark:border-[#2e3340] bg-white dark:bg-[#1e2229]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${
                    agent.enabled ? "bg-[#2552ED]/10 dark:bg-[#2552ED]/20" : "bg-[#f0f1f5] dark:bg-[#262b35]"
                  }`}
                >
                  <agent.icon className={`w-4 h-4 ${agent.enabled ? "text-[#2552ED]" : "text-[#888] dark:text-[#6b7280]"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[14px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.28px]" style={{ fontWeight: 400 }}>
                      {agent.name}
                    </h3>
                    <Button
                      type="button"
                      size="sm"
                      variant={agent.enabled ? "default" : "outline"}
                      onClick={() => onToggleAgent(agent.id)}
                      className={`rounded-[6px] px-3 text-[12px] ${
                        agent.enabled
                          ? "bg-[#2552ED] border-[#2552ED] text-white hover:bg-[#1E44CC]"
                          : "text-[#555] dark:text-[#8b92a5]"
                      }`}
                      style={{ fontWeight: 400 }}
                    >
                      {agent.enabled ? "Enabled" : "Enable"}
                    </Button>
                  </div>
                  <p className="text-[12px] text-[#888] dark:text-[#6b7280] mb-2.5" style={{ fontWeight: 300 }}>
                    {agent.description}
                  </p>
                  {agent.settings.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {agent.settings.map((s, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[#f5f5f5] dark:bg-[#262b35] text-[#555] dark:text-[#8b92a5] border border-[#e5e9f0] dark:border-[#333a47]"
                          style={{ fontWeight: 300 }}
                        >
                          <Zap className="w-2.5 h-2.5" />
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-1.5 rounded-[8px] px-4 text-[13px] text-[#555] dark:text-[#8b92a5]"
            style={{ fontWeight: 400 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
              {enabledCount} of {agents.length} enabled
            </span>
            <Button
              type="button"
              onClick={onNext}
              disabled={enabledCount === 0}
              className="gap-1.5 rounded-[8px] px-5 bg-[#2552ED] hover:bg-[#1E44CC] text-[13px] text-white disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontWeight: 400 }}
            >
              Continue
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Test Step
   ═══════════════════════════════════════════ */
function TestStep({
  agents,
  onNext,
  onBack,
}: {
  agents: ConfiguredAgent[];
  onNext: () => void;
  onBack: () => void;
}) {
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const reviewAgent = agents.find((a) => a.slug === "review-response" && a.enabled);

  const handleTest = useCallback(() => {
    setIsGenerating(true);
    setShowAiResponse(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowAiResponse(true);
    }, 1800);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center overflow-y-auto px-6 py-8">
      <div className="max-w-[580px] w-full">
        <h1 className="text-[22px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.44px] mb-1" style={{ fontWeight: 400 }}>
          Test your agents
        </h1>
        <p className="text-[14px] text-[#888] dark:text-[#8b92a5] mb-6" style={{ fontWeight: 300 }}>
          See how your agents respond in real scenarios before going live.
        </p>

        {reviewAgent ? (
          <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-[6px] bg-[#2552ED]/10 dark:bg-[#2552ED]/20 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-[#2552ED]" />
              </div>
              <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>
                Review response agent
              </span>
            </div>

            <div className="bg-[#fafbfc] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[12px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>
                  {sampleReview.platform}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < sampleReview.rating ? "text-[#F59E0B] fill-[#F59E0B]" : "text-[#d0d5dd] dark:text-[#333a47]"}`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
                  — {sampleReview.author}
                </span>
              </div>
              <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 300 }}>
                "{sampleReview.text}"
              </p>
            </div>

            {!showAiResponse && !isGenerating && (
              <Button
                type="button"
                variant="outline"
                onClick={handleTest}
                className="gap-2 rounded-[8px] px-4 bg-white dark:bg-[#262b35] text-[13px] text-[#212121] dark:text-[#e4e4e4]"
                style={{ fontWeight: 400 }}
              >
                <Play className="w-3.5 h-3.5 text-[#2552ED]" />
                Test with this review
              </Button>
            )}

            {isGenerating && (
              <div className="flex items-center gap-2 py-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2552ED] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2552ED] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2552ED] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-[12px] text-[#888] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
                  Generating response...
                </span>
              </div>
            )}

            {showAiResponse && (
              <div className="border border-[#2552ED]/30 bg-[#2552ED]/[0.03] dark:bg-[#2552ED]/[0.06] rounded-[8px] p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3 h-3 text-[#2552ED]" />
                  <span className="text-[11px] text-[#2552ED] dark:text-[#6b9bff]" style={{ fontWeight: 400 }}>
                    AI-generated response
                  </span>
                </div>
                <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 300 }}>
                  {sampleReview.aiResponse}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-8 mb-5 text-center">
            <Bot className="w-8 h-8 text-[#888] dark:text-[#6b7280] mx-auto mb-3" />
            <p className="text-[14px] text-[#555] dark:text-[#8b92a5] mb-1" style={{ fontWeight: 400 }}>
              Agent testing available after deployment
            </p>
            <p className="text-[12px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
              Your enabled agents will begin processing tasks as soon as they're activated.
            </p>
          </div>
        )}

        {agents.filter((a) => a.enabled && a.slug !== "review-response").length > 0 && (
          <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 mb-8">
            <p className="text-[12px] text-[#888] dark:text-[#6b7280] mb-3" style={{ fontWeight: 400 }}>
              Other agents ready to activate
            </p>
            <div className="space-y-2">
              {agents
                .filter((a) => a.enabled && a.slug !== "review-response")
                .map((a) => (
                  <div key={a.id} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-[6px] bg-[#f0f1f5] dark:bg-[#262b35] flex items-center justify-center">
                      <a.icon className="w-3 h-3 text-[#2552ED]" />
                    </div>
                    <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 300 }}>
                      {a.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4caf50] ml-auto" />
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-1.5 rounded-[8px] px-4 text-[13px] text-[#555] dark:text-[#8b92a5]"
            style={{ fontWeight: 400 }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            className="gap-1.5 rounded-[8px] px-5 bg-[#2552ED] hover:bg-[#1E44CC] text-[13px] text-white"
            style={{ fontWeight: 400 }}
          >
            Activate agents
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Done Step
   ═══════════════════════════════════════════ */
function DoneStep({
  agents,
  onGoToMonitor,
}: {
  agents: ConfiguredAgent[];
  onGoToMonitor: () => void;
}) {
  const enabledAgents = agents.filter((a) => a.enabled);

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-[480px] text-center">
        <div className="w-16 h-16 rounded-full bg-[#e8f5e9] dark:bg-[#1b3a2a] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#4caf50]" />
        </div>

        <h1 className="text-[24px] text-[#212121] dark:text-[#e4e4e4] tracking-[-0.5px] mb-2" style={{ fontWeight: 400 }}>
          Your AI team is ready
        </h1>
        <p className="text-[14px] text-[#888] dark:text-[#8b92a5] mb-8" style={{ fontWeight: 300 }}>
          {enabledAgents.length} agent{enabledAgents.length !== 1 ? "s" : ""} activated and running. You'll see activity in the monitor shortly.
        </p>

        <div className="bg-white dark:bg-[#1e2229] border border-[#E5E7EB] dark:border-[#2e3340] rounded-[12px] px-5 py-4 mb-8 text-left">
          <div className="space-y-2.5">
            {enabledAgents.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4caf50] shrink-0" />
                <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>
                  {a.name}
                </span>
                <span className="text-[11px] text-[#4caf50] ml-auto" style={{ fontWeight: 300 }}>
                  Enabled
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button
            type="button"
            onClick={onGoToMonitor}
            className="gap-2 rounded-[8px] px-6 bg-[#2552ED] hover:bg-[#1E44CC] text-[14px] text-white"
            style={{ fontWeight: 400 }}
          >
            Go to monitor
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Onboarding View
   ═══════════════════════════════════════════ */
interface AgentOnboardingViewProps {
  onComplete: () => void;
  onSkip: () => void;
  onGoToMonitor: () => void;
}

export function AgentOnboardingView({ onComplete, onSkip, onGoToMonitor }: AgentOnboardingViewProps) {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [selectedProblems, setSelectedProblems] = useState<Set<string>>(new Set());
  const [contextAnswers, setContextAnswers] = useState<Record<string, string>>({});
  const [configuredAgents, setConfiguredAgents] = useState<ConfiguredAgent[]>([]);

  const toggleProblem = useCallback((id: string) => {
    setSelectedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleContextAnswer = useCallback((problemId: string, answerId: string) => {
    setContextAnswers((prev) => ({ ...prev, [problemId]: answerId }));
  }, []);

  const buildAgents = useCallback(() => {
    const built: ConfiguredAgent[] = [];
    selectedProblems.forEach((pid) => {
      const problem = problems.find((p) => p.id === pid);
      if (!problem) return;
      const answer = contextAnswers[pid];
      const question = contextQuestions.find((q) => q.problemId === pid);
      const chosenOption = question?.options.find((o) => o.id === answer);
      built.push({
        id: pid,
        name: problem.agentName,
        description: problem.description,
        icon: problem.icon,
        slug: problem.agentSlug,
        settings: chosenOption ? [chosenOption.label] : [],
        enabled: true,
        tested: false,
      });
    });
    setConfiguredAgents(built);
  }, [selectedProblems, contextAnswers]);

  const toggleAgent = useCallback((id: string) => {
    setConfiguredAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }, []);

  const goToStep = useCallback(
    (s: OnboardingStep) => {
      if (s === "recommend") buildAgents();
      setStep(s);
    },
    [buildAgents]
  );

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* L2 Sidebar with step indicator */}
      <OnboardingSidebar current={step} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300">
        {/* Minimal header with close button */}
        <div className="shrink-0 h-[61px] flex items-center justify-end px-6">
          {step !== "done" && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onSkip}
              className="rounded-[6px] text-[#888] dark:text-[#6b7280]"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Step content */}
        {step === "welcome" && (
          <WelcomeStep onNext={() => goToStep("choose")} onSkip={onSkip} />
        )}
        {step === "choose" && (
          <ChooseStep
            selected={selectedProblems}
            onToggle={toggleProblem}
            onNext={() => goToStep("context")}
            onBack={() => goToStep("welcome")}
          />
        )}
        {step === "context" && (
          <ContextStep
            selectedProblems={selectedProblems}
            answers={contextAnswers}
            onAnswer={handleContextAnswer}
            onNext={() => goToStep("recommend")}
            onBack={() => goToStep("choose")}
          />
        )}
        {step === "recommend" && (
          <RecommendStep
            agents={configuredAgents}
            onToggleAgent={toggleAgent}
            onNext={() => goToStep("test")}
            onBack={() => goToStep("context")}
          />
        )}
        {step === "test" && (
          <TestStep
            agents={configuredAgents}
            onNext={() => goToStep("done")}
            onBack={() => goToStep("recommend")}
          />
        )}
        {step === "done" && (
          <DoneStep
            agents={configuredAgents}
            onGoToMonitor={onGoToMonitor}
          />
        )}
      </div>
    </div>
  );
}
