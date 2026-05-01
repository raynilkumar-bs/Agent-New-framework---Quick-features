import type { Meta, StoryObj } from "@storybook/react";
import {
  DocPage, Section, DoDont, DataTable, Callout, Rule,
} from "./DocComponents";

const meta: Meta = {
  title: "Content / Grammar & Style",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

/* ── 1. Core Rules ──────────────────────────────────── */
export const CoreRules: Story = {
  name: "Grammar / Core Rules",
  render: () => (
    <DocPage
      title="Core Grammar Rules"
      subtitle="American English · Sentence case · Active voice · Simple words."
    >
      <Section title="Language standard — American English">
        <DataTable
          headers={["British (avoid)", "American (use)"]}
          rows={[
            ["organise", "organize"],
            ["colour",   "color"],
            ["centre",   "center"],
            ["programme","program"],
            ["grey",     "gray"],
          ]}
        />
      </Section>

      <Section title="Active voice — always">
        <DoDont
          do={["Update your profile.", "Add your business details.", "Select a template."]}
          dont={["Your profile should be updated.", "Business details should be added.", "A template should be selected."]}
        />
      </Section>

      <Section title="Remove filler phrases">
        <DataTable
          headers={["Remove this…", "Replace with…"]}
          rows={[
            ["in order to",             "to"],
            ["please be informed that", "(delete — just state the fact)"],
            ["kindly note",             "(delete)"],
            ["it should be noted that", "(delete)"],
            ["at this point in time",   "now"],
          ]}
        />
      </Section>

      <Section title="Accessibility — aim for Grade 6–8 readability">
        <Callout type="tip">
          Short sentences. Simple verbs. One idea per sentence. If a user has to re-read something twice, simplify it.
        </Callout>
        <DoDont
          do="Check your email to verify your account."
          dont="In order to complete the verification procedure, please ensure that your email address has been confirmed via the link sent to your inbox."
        />
      </Section>
    </DocPage>
  ),
};

/* ── 2. Capitalization ──────────────────────────────── */
export const Capitalization: Story = {
  name: "Grammar / Capitalization",
  render: () => (
    <DocPage
      title="Capitalization"
      subtitle="Birdeye uses sentence case everywhere — not title case."
    >
      <Section title="Sentence case — applies to all UI surfaces">
        <DataTable
          headers={["Surface", "Correct (sentence case)", "Incorrect (title case)"]}
          rows={[
            ["Page title",  "Manage your reviews",      "Manage Your Reviews"],
            ["Button",      "Save changes",              "Save Changes"],
            ["Heading",     "Connect your listings",     "Connect Your Listings"],
            ["Toast",       "Settings updated",          "Settings Updated"],
            ["Tooltip",     "Shows data from connected listings only.", "Shows Data From Connected Listings Only."],
            ["Error",       "We couldn't save your changes.", "We Couldn't Save Your Changes."],
          ]}
        />
      </Section>

      <Section title="Exceptions — always capitalize">
        <DataTable
          headers={["Item", "Rule"]}
          rows={[
            ["Proper nouns",   "Birdeye, Google, Facebook, WhatsApp"],
            ["Acronyms",       "API, SMS, URL, CTA"],
            ["Sentence start", "First word of any sentence is always capitalized"],
          ]}
        />
      </Section>

      <Callout type="warning">
        Never use ALL CAPS for emphasis. Use <strong>bold</strong> instead. All caps reads as shouting and fails accessibility checks.
      </Callout>
    </DocPage>
  ),
};

/* ── 3. Punctuation ─────────────────────────────────── */
export const Punctuation: Story = {
  name: "Grammar / Punctuation",
  render: () => (
    <DocPage
      title="Punctuation Rules"
      subtitle="Punctuation should reduce friction — not add visual noise."
    >
      <Section title="Periods — where to use and where not to">
        <DataTable
          headers={["Surface", "Use period?", "Reason"]}
          rows={[
            ["Button labels",        "No",  "Buttons are actions, not sentences"],
            ["Headings",             "No",  "Headings scan better without periods"],
            ["Toast messages",       "No",  "Toasts are brief; period adds weight"],
            ["Tooltip (1 sentence)", "No",  "Single-sentence tooltips don't need one"],
            ["Tooltip (2+ sentences)","Yes","Full stops separate sentences"],
            ["Error messages",       "Yes", "Full sentences require periods"],
            ["Body / helper text",   "Yes", "Full sentences require periods"],
          ]}
        />
      </Section>

      <Section title="Oxford comma — always">
        <DoDont
          do="Email, SMS, and WhatsApp messages"
          dont="Email, SMS and WhatsApp messages"
        />
      </Section>

      <Section title="Exclamation marks — use sparingly">
        <Callout type="warning">
          Never use exclamation marks in errors, warnings, or sensitive user moments. Limit to one per genuine achievement — never stack them.
        </Callout>
        <DoDont
          do={["Great job — payments are set up.", "You reached 1,000 reviews."]}
          dont={["Amazing!!! Everything is awesome!!!!", "Error occurred! Please fix!!!"]}
        />
      </Section>

      <Section title="Ampersands — only in space-constrained UI">
        <DoDont
          do={["Reviews and Listings", "Reports & Analytics (icon label only)"]}
          dont={["Configure settings & preferences & notifications"]}
        />
      </Section>

      <Section title="Ellipses — avoid unless truly needed">
        <DoDont
          do="Processing request"
          dont="Processing…"
        />
      </Section>
    </DocPage>
  ),
};

/* ── 4. Numbers & Dates ─────────────────────────────── */
export const NumbersAndDates: Story = {
  name: "Grammar / Numbers & Dates",
  render: () => (
    <DocPage
      title="Numbers, Dates & Time"
      subtitle="Consistent formatting builds trust and reduces cognitive load."
    >
      <Section title="Numbers">
        <DataTable
          headers={["Rule", "Correct", "Incorrect"]}
          rows={[
            ["Spell out at sentence start", "One file is ready.",     "1 file is ready."],
            ["Use numerals in UI",          "You have 3 tasks left.", "You have three tasks left."],
            ["Commas for thousands",        "1,200 · 32,850",        "1200 · 32850"],
            ["Hyphen with unit adjective",  "30-min session",         "30 min session"],
            ["Unit in sentence",            "This session is 30 min.","This session is 30-min."],
          ]}
        />
      </Section>

      <Section title="Dates">
        <DoDont
          do="Jan 15, 2025"
          dont={["15 Jan 2025", "2025-01-15", "January 15th, 2025"]}
        />
      </Section>

      <Section title="Time">
        <DoDont
          do={["9 am", "2:30 pm", "12 pm"]}
          dont={["9 AM", "14:30", "2:30 PM"]}
        />
      </Section>

      <Section title="Abbreviations & acronyms">
        <Callout type="tip">
          Always expand on first mention: "API (Application Programming Interface)" — then use "API" throughout. Avoid Latin abbreviations — write "for example" not "e.g.", "that is" not "i.e."
        </Callout>
        <DataTable
          headers={["Avoid", "Use instead"]}
          rows={[
            ["e.g.",  "for example"],
            ["i.e.",  "that is"],
            ["etc.",  "and so on"],
            ["vs.",   "versus (or just rewrite the sentence)"],
          ]}
        />
      </Section>
    </DocPage>
  ),
};

/* ── 5. Bold, Italics & Lists ───────────────────────── */
export const FormattingRules: Story = {
  name: "Grammar / Formatting",
  render: () => (
    <DocPage
      title="Formatting: Bold, Italics & Lists"
      subtitle="Formatting guides attention — use it sparingly and deliberately."
    >
      <Section title="Bold — for emphasis only">
        <DataTable
          headers={["Use bold for…", "Don't bold…"]}
          rows={[
            ["Key terms the user must act on",   "Entire paragraphs"],
            ["Feature names on first mention",   "Decorative or aesthetic emphasis"],
            ["Critical values or thresholds",    "Regular body text"],
          ]}
        />
      </Section>

      <Section title="Italics — light emphasis only">
        <DataTable
          headers={["Use italics for…", "Don't italicize…"]}
          rows={[
            ["Document or product names",  "Links"],
            ["New concepts (first use)",   "Warnings or errors"],
            ["Light tonal emphasis",       "Full sentences"],
          ]}
        />
      </Section>

      <Section title="Lists — when to use them">
        <DataTable
          headers={["Use a list when…", "Don't use a list when…"]}
          rows={[
            ["Showing sequential steps",    "You have only 1–2 items"],
            ["Presenting multiple options", "Items don't share the same structure"],
            ["Explaining parallel conditions","Prose reads more naturally"],
          ]}
        />
      </Section>

      <Section title="List formatting rules">
        <Callout type="tip">
          Use numbered lists for steps, bullet lists for options. Keep items parallel in structure. End each item consistently (all with periods or none).
        </Callout>
        <DoDont
          do={[
            "1. Verify your email  2. Add business details  3. Connect your listings",
          ]}
          dont={[
            "1. First you should verify your email address  2. Business details  3. Connecting listings is next",
          ]}
        />
      </Section>

      <Section title="Avoid directional UI language">
        <Callout type="warning">
          Never reference screen positions — layouts change for responsive and accessibility contexts.
        </Callout>
        <DoDont
          do={["Select a template.", "Choose a file.", "Open the settings."]}
          dont={["Click the button on the left.", "See the panel at the top.", "Use the icon on the right."]}
        />
      </Section>
    </DocPage>
  ),
};
