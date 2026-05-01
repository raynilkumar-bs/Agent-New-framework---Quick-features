import type { Meta, StoryObj } from "@storybook/react";
import {
  DocPage, Section, DoDont, DataTable, Callout, Anatomy, Examples, StructureTemplate,
} from "./DocComponents";

const meta: Meta = {
  title: "Content / Microcopy Patterns",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

/* ── 1. Error Messages ──────────────────────────────── */
export const ErrorMessages: Story = {
  name: "Patterns / Error Messages",
  render: () => (
    <DocPage
      title="Error Messages"
      subtitle="Help users recover quickly — without blame, jargon, or alarm."
    >
      <Section title="Structure">
        <StructureTemplate
          template={"[Clear issue]\n+ [Optional context]\n+ [Actionable next step]\n+ [Optional reassurance]"}
          example="We couldn't process your request. Check your details and try again."
        />
      </Section>

      <Section title="Writing rules">
        <DataTable
          headers={["Rule", "Why it matters"]}
          rows={[
            ["Be calm and supportive",    "Errors are stressful — tone should reduce tension, not add to it"],
            ["Be brief but useful",       "One sentence is usually enough"],
            ["Always provide a solution", "Tell the user exactly what to do next"],
            ["Avoid technical jargon",    "No system codes, no stack traces, no engineering terms"],
            ["Avoid blame",               "The problem is with the system or the input — not the user"],
            ["Use contractions",          "Keeps tone natural: 'We couldn't' not 'We could not'"],
            ["Never use exclamation marks","Errors must not feel alarming or emotional"],
          ]}
        />
      </Section>

      <Section title="Form errors">
        <DoDont
          do={[
            "We couldn't process this request. Check your details and try again.",
            "This field can't be empty. Add a value to continue.",
          ]}
          dont={[
            "Error: Invalid input.",
            "You failed to complete the action.",
          ]}
        />
      </Section>

      <Section title="Input errors">
        <DoDont
          do={[
            "This email doesn't look right. Use a valid email to continue.",
            "This value doesn't look correct.",
          ]}
          dont={[
            "You entered the wrong email.",
            "Invalid field value. Please fix.",
          ]}
        />
      </Section>

      <Section title="System & network errors">
        <DoDont
          do={[
            "Something went wrong. Try again in a moment.",
            "We're having trouble connecting. Check your internet and try again.",
          ]}
          dont={[
            "Error 500: Internal server error.",
            "Network request failed.",
          ]}
        />
      </Section>

      <Section title="Authentication errors">
        <DoDont
          do="This password doesn't match our records. Try again or reset your password."
          dont="Incorrect password. Authentication failed."
        />
      </Section>

      <Section title="Permission errors">
        <DoDont
          do="You don't have access to this feature. Contact your admin if you need it."
          dont="403: Access denied. Insufficient permissions."
        />
      </Section>
    </DocPage>
  ),
};

/* ── 2. Toasts ──────────────────────────────────────── */
export const ToastMessages: Story = {
  name: "Patterns / Toast Messages",
  render: () => (
    <DocPage
      title="Toast Messages"
      subtitle="Brief, passive, non-interruptive confirmations. 8–12 words max."
    >
      <Section title="Structure">
        <StructureTemplate
          template={"[Action result]\n+ [Optional context]"}
          example="Changes saved"
        />
      </Section>

      <Section title="Rules at a glance">
        <DataTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Max length",         "8–12 words — shorter is better"],
            ["Periods",            "Avoid unless absolutely necessary"],
            ["Exclamation marks",  "Never"],
            ["Links or buttons",   "Never — toasts require no action"],
            ["Error messages",     "Never — errors need their own persistent UI"],
            ["Contractions",       "Yes — 'You're all set', 'It's updated'"],
          ]}
        />
      </Section>

      <Section title="Success confirmations">
        <Examples items={[
          "Changes saved",
          "Settings updated",
          "Profile updated successfully",
          "Payment added",
          "Form submitted",
          "File uploaded successfully",
        ]} />
      </Section>

      <Section title="Scheduled & async actions">
        <Examples items={[
          "Message scheduled",
          "Request received",
          "Sync started",
          "Backup complete",
          "Report generated",
        ]} />
      </Section>

      <Section title="Do & Don't">
        <DoDont
          do={[
            "Report generated",
            "Settings updated",
            "File uploaded successfully",
          ]}
          dont={[
            "Your report has been generated successfully!!!",
            "Click here to download your report",
            "Error while generating report",
          ]}
        />
      </Section>

      <Callout type="tip">
        If a message requires an action or contains critical information, it should <strong>not</strong> be a toast. Use an inline alert, dialog, or persistent banner instead.
      </Callout>
    </DocPage>
  ),
};

/* ── 3. Tooltips ────────────────────────────────────── */
export const Tooltips: Story = {
  name: "Patterns / Tooltips",
  render: () => (
    <DocPage
      title="Tooltips"
      subtitle="Contextual clarity at the moment of hesitation. 15–20 words max."
    >
      <Section title="Structure">
        <StructureTemplate
          template={"[What this is]\n+ [Why it matters — optional]\n+ [Impact or guidance — optional]"}
          example="Shows how your business appears across major directories."
        />
      </Section>

      <Section title="Rules">
        <DataTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Max length",              "15–20 words — one idea only"],
            ["Repeat the label",        "Never — don't restate what's already visible"],
            ["Directional language",    "Never — 'click the icon on the right' breaks on mobile"],
            ["Humor or emojis",         "Never — tooltips are functional, not decorative"],
            ["Exclamation marks",       "Never"],
            ["Jargon",                  "Never — plain language only"],
          ]}
        />
      </Section>

      <Section title="Pattern: clarify what it is">
        <Examples items={[
          "Shows how your business appears across major directories.",
          "Displays data from connected listings only.",
          "Controls who can view these reports.",
        ]} />
      </Section>

      <Section title="Pattern: explain value or impact">
        <Examples items={[
          "This helps customers identify your primary contact number.",
          "Turning this on lets you send automated follow-ups.",
          "Select how often reminders should be sent.",
        ]} />
      </Section>

      <Section title="Do & Don't">
        <DoDont
          do={[
            "Choose how often alerts are sent.",
            "This helps verify your business information.",
            "Shows data from connected listings only.",
          ]}
          dont={[
            "Click the icon on the right to learn more.",
            "This is the search radius field.",
            "Initializing directory sync protocol…",
          ]}
        />
      </Section>
    </DocPage>
  ),
};

/* ── 4. Empty States ────────────────────────────────── */
export const EmptyStates: Story = {
  name: "Patterns / Empty States",
  render: () => (
    <DocPage
      title="Empty States"
      subtitle="Turn 'nothing here' into a moment of guidance and progress."
    >
      <Section title="Structure">
        <StructureTemplate
          template={"[Short, clear headline]\n+ [Body: why it's empty + what it unlocks — optional]\n+ [Primary CTA — verb-led]\n+ [Visual — optional]"}
          example={"Headline: No reviews yet\nBody: Invite customers to leave reviews and build trust.\nCTA: Request reviews"}
        />
      </Section>

      <Section title="Rules">
        <DataTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Headline",        "Short, sentence case, no puns, no exclamation marks"],
            ["Body text",       "1–2 sentences max — explain why it's empty and what changes"],
            ["CTA",             "Always verb-led: 'Create form', 'Upload file', 'Invite customers'"],
            ["Blame",           "Never — 'You haven't added anything' → 'No items added yet'"],
            ["Visuals",         "Optional — only use if they support understanding, not decoration"],
          ]}
        />
      </Section>

      <Section title="By pattern type">
        <DataTable
          headers={["Type", "Headline", "Body (optional)", "CTA"]}
          rows={[
            ["Generic",          "No data yet",            "Start by creating your first item.",                       "Create item"],
            ["All clear",        "All caught up",           "You don't have any pending items right now.",              "—"],
            ["No reviews",       "No reviews yet",          "Invite customers to leave reviews and build trust.",        "Request reviews"],
            ["No messages",      "No new messages",         "You're all caught up. New messages will appear here.",     "—"],
            ["No files",         "No files uploaded",       "Upload documents to get started.",                         "Upload file"],
            ["No leads",         "No leads captured yet",   "Start collecting leads by setting up your forms.",         "Create form"],
            ["No payments",      "No payments yet",         "Start accepting payments directly through Birdeye.",        "Set up payments"],
            ["Search — no match","No results found",        "Try adjusting your filters or search terms.",              "Reset filters"],
            ["Nothing selected", "Nothing selected",        "Choose items to see them here.",                           "—"],
          ]}
        />
      </Section>

      <Section title="Do & Don't">
        <DoDont
          do={[
            "No reviews yet — Invite customers to get started.",
            "Upload a file to get started.",
            "Start by connecting your account.",
          ]}
          dont={[
            "Oops! Nothing here!",
            "You forgot to add content.",
            "Please populate your data store.",
          ]}
        />
      </Section>
    </DocPage>
  ),
};

/* ── 5. Confirmations ───────────────────────────────── */
export const Confirmations: Story = {
  name: "Patterns / Confirmations",
  render: () => (
    <DocPage
      title="Confirmation Messages"
      subtitle="Acknowledge completion — briefly, warmly, and without interrupting flow."
    >
      <Section title="Structure">
        <StructureTemplate
          template={"[Clear confirmation]\n+ [Optional context or detail]\n+ [Optional next step]"}
          example="Your changes have been saved. You can update more details anytime."
        />
      </Section>

      <Section title="Rules">
        <DataTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Length",          "One line is usually enough"],
            ["Tone",            "Warm but not celebratory — no exaggerated language"],
            ["Next step",       "Include only when genuinely useful ('Download receipt', 'View details')"],
            ["Sentence case",   "Always — 'Your request has been submitted'"],
            ["Exclamation marks","Avoid — positive but calm"],
            ["Emojis",          "Never in confirmations"],
          ]}
        />
      </Section>

      <Section title="Pattern library">
        <DataTable
          headers={["Type", "Message"]}
          rows={[
            ["Generic",                "Your changes have been saved."],
            ["Settings",               "Your settings are updated."],
            ["Submission",             "Request submitted. We'll update you soon."],
            ["Payment",                "Payment received. Your receipt has been emailed."],
            ["Profile / account",      "Profile updated successfully."],
            ["Setup complete",         "You're all set. Everything is ready to go."],
            ["With next step",         "Your report is ready. Download it now."],
          ]}
        />
      </Section>

      <Section title="Do & Don't">
        <DoDont
          do={[
            "Your settings have been updated.",
            "We've saved your changes.",
            "Your form has been submitted.",
          ]}
          dont={[
            "Your settings have been updated!!!",
            "Changes saved successfully!!! 🎉",
            "Your submission has been executed.",
          ]}
        />
      </Section>
    </DocPage>
  ),
};

/* ── 6. Buttons & Action Labels ─────────────────────── */
export const ActionLabels: Story = {
  name: "Patterns / Action Labels & Buttons",
  render: () => (
    <DocPage
      title="Action Labels & Buttons"
      subtitle="Start with a verb. Keep it to 1–3 words. Be specific."
    >
      <Section title="Rules">
        <DataTable
          headers={["Rule", "Correct", "Incorrect"]}
          rows={[
            ["Start with a verb",         "Save changes",       "Changes saved"],
            ["1–3 words max",             "Download report",    "Click here to download the report"],
            ["Sentence case",             "Create form",        "Create Form"],
            ["No punctuation",            "Connect account",    "Connect account."],
            ["Be specific — no 'click here'","View details",   "Click here"],
            ["Match the outcome",         "Delete account",     "Proceed"],
          ]}
        />
      </Section>

      <Section title="Common verb-led patterns">
        <Examples items={[
          "Save changes",
          "Create form",
          "Download report",
          "Connect account",
          "Request reviews",
          "Upload file",
          "Set up payments",
          "View details",
          "Add business",
          "Reset filters",
          "Send invite",
          "Confirm",
          "Cancel",
          "Try again",
          "Get started",
        ]} />
      </Section>

      <Section title="Destructive actions — be explicit">
        <DoDont
          do={["Delete account", "Remove listing", "Cancel subscription"]}
          dont={["Proceed", "Submit", "OK"]}
        />
        <Callout type="warning">
          Destructive CTAs must describe the consequence, not just confirm it. Pair with a confirmation dialog that restates the impact.
        </Callout>
      </Section>

      <Section title="Cancel vs. Close">
        <DataTable
          headers={["Word", "When to use"]}
          rows={[
            ["Cancel",  "User is abandoning an action mid-flow (e.g., mid-form) — implies undoing intent"],
            ["Close",   "User is dismissing a modal, panel, or drawer that was informational"],
            ["Dismiss", "User is closing a notification, alert, or toast"],
            ["Done",    "User has completed a flow and is returning to the previous context"],
          ]}
        />
      </Section>
    </DocPage>
  ),
};

/* ── 7. Input Hints & Helper Text ───────────────────── */
export const HelperText: Story = {
  name: "Patterns / Input Hints & Helper Text",
  render: () => (
    <DocPage
      title="Input Hints & Helper Text"
      subtitle="Reduce errors before they happen. Answer the question the user is about to ask."
    >
      <Section title="Structure">
        <StructureTemplate
          template={"[Short clarity message]\n+ [Optional format example]"}
          example="Enter the email you use for your business. For example: you@company.com"
        />
      </Section>

      <Section title="Rules">
        <DataTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Be proactive",         "Explain what format or value is expected before the user guesses"],
            ["Length",               "1 sentence max — ideally under 10 words"],
            ["Avoid redundancy",     "Don't repeat the label: if label says 'Email', hint shouldn't say 'Enter your email'"],
            ["Provide an example",   "Format hints are especially helpful: 'e.g., +1 (555) 123-4567'"],
            ["Sentence case",        "Always"],
            ["Period",               "Use if it's a full sentence"],
          ]}
        />
      </Section>

      <Section title="Examples by input type">
        <DataTable
          headers={["Input", "Good helper text"]}
          rows={[
            ["Email",           "Enter the email you use for your business."],
            ["Phone",           "Include country code. For example: +1 (555) 123-4567"],
            ["Website URL",     "Include https://. For example: https://yoursite.com"],
            ["Business name",   "Use the name customers see online."],
            ["Password",        "At least 8 characters, including one number."],
            ["Date range",      "Select a start and end date for your report."],
            ["Search",          "Search by name, email, or phone number."],
          ]}
        />
      </Section>

      <Section title="Do & Don't">
        <DoDont
          do={[
            "Include country code. For example: +1 (555) 123-4567",
            "At least 8 characters, including one number.",
          ]}
          dont={[
            "Enter your phone number in this field.",
            "Password must conform to security policy guidelines.",
          ]}
        />
      </Section>
    </DocPage>
  ),
};
