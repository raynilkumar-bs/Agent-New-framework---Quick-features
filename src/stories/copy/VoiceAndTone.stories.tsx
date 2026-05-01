import type { Meta, StoryObj } from "@storybook/react";
import {
  DocPage, Section, Rule, DoDont, DataTable, Callout,
} from "./DocComponents";

const meta: Meta = {
  title: "Content / Voice & Tone",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

/* ── 1. Voice Pillars ───────────────────────────────── */
export const VoicePillars: Story = {
  name: "Voice / Pillars",
  render: () => (
    <DocPage
      title="Voice Pillars"
      subtitle="Who we are — constant across every surface, module, and touchpoint."
    >
      <Section title="Our voice is…">
        <DataTable
          headers={["Pillar", "Description", "Example"]}
          rows={[
            ["Respectful & Helpful",    "We empower, not command.",                            "Need help getting started? Here's how."],
            ["Clear & Informative",     "We deliver the right info at the right moment.",       "Your request has been submitted. Expect an update soon."],
            ["Experienced & Action-Focused", "Confident, not superior.",                       "Complete onboarding to start collecting reviews."],
            ["Approachable & Inclusive","No slang, idioms, or culturally bound language.",      "Add an allowlist to manage visibility."],
            ["Celebratory (rarely)",    "Acknowledge genuine wins briefly and warmly.",         "Congrats! You reached 1,000+ reviews."],
          ]}
        />
      </Section>

      <Section title="What our voice is NOT">
        <div className="grid grid-cols-2 gap-4">
          {[
            ["Robotic or cold",         "System initialized. Select option."],
            ["Overly formal",           "Kindly be informed that your request has been executed."],
            ["Salesy or hype-driven",   "This AMAZING feature will TRANSFORM your business!"],
            ["Jargon-heavy",            "Authenticate your OAuth token to initialize the pipeline."],
            ["Blame-shifting",          "You entered an invalid value. Please fix your mistake."],
          ].map(([label, bad], i) => (
            <div
              key={i}
              className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-4 flex flex-col gap-1"
            >
              <span className="text-xs text-destructive uppercase tracking-wide">✕ {label}</span>
              <span className="text-sm text-muted-foreground">"{bad}"</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Consistency check">
        <Callout type="tip">
          Before publishing any copy, ask: <strong>Would a knowledgeable, caring colleague say this out loud?</strong> If not, rewrite it.
        </Callout>
      </Section>
    </DocPage>
  ),
};

/* ── 2. Tone Modes ──────────────────────────────────── */
export const ToneModes: Story = {
  name: "Tone / Modes",
  render: () => (
    <DocPage
      title="Tone Modes"
      subtitle="Tone adapts to context and user emotion — voice stays constant."
    >
      <Section title="Tone frequency map">
        <DataTable
          headers={["Tone", "When to use", "Frequency"]}
          rows={[
            ["Friendly",    "Everyday interactions",                    "Often"],
            ["Direct",      "Routine, neutral tasks",                   "Often"],
            ["Supportive",  "Errors, confusion, high-friction moments", "Sometimes"],
            ["Passionate",  "Significant user achievements",            "Rarely"],
          ]}
        />
      </Section>

      <Section title="Delightful — genuine achievements">
        <DoDont
          do="Great job — payments are set up."
          dont="Amazing!!! Everything is awesome!!!!"
        />
      </Section>

      <Section title="Aspirational — growth & opportunity">
        <DoDont
          do="Get more reviews and build trust faster."
          dont="Use this feature because we want you to."
        />
      </Section>

      <Section title="Educational — complex flows">
        <DoDont
          do="To reply to a review, follow these steps…"
          dont="The reply functionality operates by leveraging the review metadata object."
        />
      </Section>

      <Section title="Guided — needs direction">
        <DoDont
          do="You can set reminders to stay on track."
          dont="You must set reminders now."
        />
      </Section>

      <Section title="Supportive — errors & uncertainty">
        <DoDont
          do={["We're sorry — something went wrong.", "Check your details and try again."]}
          dont={["Invalid input.", "Error 422: Unprocessable entity."]}
        />
      </Section>

      <Section title="Emotional awareness map">
        <DataTable
          headers={["Scenario", "User emotion", "Tone to use"]}
          rows={[
            ["Empty state",  "Curious",              "Encouraging"],
            ["Error",        "Anxious / frustrated", "Supportive"],
            ["Success",      "Satisfied",            "Positive & calm"],
            ["Onboarding",   "Unsure",               "Guided & friendly"],
            ["Insights",     "Interested",           "Confident"],
          ]}
        />
      </Section>
    </DocPage>
  ),
};

/* ── 3. Word Choices ────────────────────────────────── */
export const WordChoices: Story = {
  name: "Tone / Word Choices",
  render: () => (
    <DocPage
      title="Word Choices"
      subtitle="Prefer plain, familiar words. If a simpler word exists, use it."
    >
      <Section title="Replacement word list">
        <DataTable
          headers={["Instead of…", "Use…"]}
          rows={[
            ["commence",     "start"],
            ["activate",     "turn on"],
            ["obtain",       "get"],
            ["query",        "question"],
            ["require",      "need"],
            ["furthermore",  "also"],
            ["therefore",    "so"],
            ["assist",       "help"],
            ["in order to",  "to"],
            ["please note",  "(remove — just state the fact)"],
            ["kindly",       "(remove)"],
          ]}
        />
      </Section>

      <Section title="Words we avoid entirely">
        <DataTable
          headers={["Category", "Examples"]}
          rows={[
            ["Slang",         "gonna, hang tight, heads up"],
            ["Idioms",        "break a leg, hit the ground running"],
            ["Blame phrasing","You failed to, you entered incorrectly, your mistake"],
            ["Tech jargon",   "initialize, execute, authenticate (use: set up, run, sign in)"],
            ["Filler phrases","please be informed that, kindly note that, it should be noted"],
          ]}
        />
      </Section>

      <Section title="Contractions — always use them">
        <Callout type="tip">
          Contractions make copy feel human. <strong>you're, it's, we'll, they're, can't, don't</strong> — use them everywhere except legal or very formal contexts.
        </Callout>
        <DoDont
          do={["You're all set.", "We'll update you soon.", "It's ready."]}
          dont={["You are all set.", "We will update you soon.", "It is ready."]}
        />
      </Section>
    </DocPage>
  ),
};
