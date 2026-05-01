import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Typography",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

/* ── shared divider ─────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 mt-0">
      {children}
    </p>
  );
}

function Rule() {
  return <hr className="border-border my-8" />;
}

/* ══════════════════════════════════════════════════════
   1. FONT FAMILY
   ══════════════════════════════════════════════════════ */
export const FontFamily: Story = {
  name: "Font / Family",
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      {/* Specimen */}
      <div className="rounded-xl border border-border bg-card p-8 flex flex-col gap-2">
        <p className="text-5xl leading-tight tracking-tight">
          Inter
        </p>
        <p className="text-2xl text-muted-foreground">
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="text-sm text-muted-foreground mt-2 font-mono">
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif
        </p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Font</p>
          <p className="text-sm">Inter</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Source</p>
          <p className="text-sm">Google Fonts</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Loaded weights</p>
          <p className="text-sm">300, 400</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Base size</p>
          <p className="text-sm">13px</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">Base line height</p>
          <p className="text-sm">1.5</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">CSS variable</p>
          <p className="text-sm font-mono text-xs">--font-sans</p>
        </div>
      </div>

      {/* Alphabet */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
        <Label>Glyphs</Label>
        <p className="text-xl leading-loose tracking-wide text-foreground">
          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
        </p>
        <p className="text-xl leading-loose tracking-wide text-muted-foreground">
          a b c d e f g h i j k l m n o p q r s t u v w x y z
        </p>
        <p className="text-xl leading-loose tracking-wide text-foreground">
          0 1 2 3 4 5 6 7 8 9
        </p>
        <p className="text-xl leading-loose tracking-wide text-muted-foreground">
          ! @ # $ % ^ & * ( ) _ + - = [ ] {'{ }'} | ; ' : " , . / {'< > ?'}
        </p>
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════════
   2. TYPE SCALE
   ══════════════════════════════════════════════════════ */
export const TypeScale: Story = {
  name: "Font / Scale",
  render: () => {
    const scale = [
      { token: "text-xs",   size: "12px", sample: "Extra small — labels, captions, metadata" },
      { token: "text-sm",   size: "14px", sample: "Small — secondary text, table cells, helper text" },
      { token: "text-base", size: "13px", sample: "Base — body copy, default input text" },
      { token: "text-lg",   size: "18px", sample: "Large — section headings (h3)" },
      { token: "text-xl",   size: "20px", sample: "Extra large — page sub-headings (h2)" },
      { token: "text-2xl",  size: "24px", sample: "2XL — page titles (h1)" },
      { token: "text-3xl",  size: "30px", sample: "3XL — hero headings, large stats" },
      { token: "text-4xl",  size: "36px", sample: "4XL — display, splash screens" },
    ];

    return (
      <div className="flex flex-col max-w-3xl">
        <Label>Type scale — Tailwind tokens</Label>
        <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
          {scale.map(({ token, size, sample }) => (
            <div
              key={token}
              className="flex items-baseline gap-6 px-6 py-4 bg-card hover:bg-muted/40 transition-colors"
            >
              {/* Token + size */}
              <div className="w-28 shrink-0 flex flex-col gap-0.5">
                <span className="font-mono text-xs text-muted-foreground">{token}</span>
                <span className="font-mono text-xs text-muted-foreground/60">{size}</span>
              </div>
              {/* Live specimen */}
              <span className={`${token} text-foreground leading-tight flex-1`}>
                {sample}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/* ══════════════════════════════════════════════════════
   3. FONT WEIGHTS
   ══════════════════════════════════════════════════════ */
export const FontWeights: Story = {
  name: "Font / Weights",
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      <Label>Available weights — only 300 and 400 are loaded</Label>

      {/* The two real weights */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            weight: "300",
            name: "Light",
            cls: "font-light",
            token: "font-light",
            desc: "De-emphasised text, secondary labels, muted copy",
            sample: "The quick brown fox",
          },
          {
            weight: "400",
            name: "Regular",
            cls: "font-normal",
            token: "font-normal / font-medium / font-semibold / font-bold",
            desc: "All primary text — headings, body, buttons, inputs",
            sample: "The quick brown fox",
          },
        ].map(({ weight, name, cls, token, desc, sample }) => (
          <div
            key={weight}
            className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4"
          >
            <div className="flex items-baseline justify-between">
              <span className={`text-3xl ${cls} text-foreground`}>{name}</span>
              <span className="font-mono text-xs text-muted-foreground">{weight}</span>
            </div>
            <p className={`text-xl ${cls} text-foreground`}>{sample}</p>
            <p className={`text-base ${cls} text-foreground`}>
              Aa Bb Cc Dd Ee 0123 !@#$
            </p>
            <div className="pt-2 border-t border-border flex flex-col gap-1">
              <p className="font-mono text-[10px] text-muted-foreground">{token}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Weight clamping table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-4 bg-muted/50 border-b border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Weight clamping — all Tailwind utilities resolve to 300 or 400
          </p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-2 text-xs text-muted-foreground">Tailwind class</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground">Resolves to</th>
              <th className="text-left px-4 py-2 text-xs text-muted-foreground">Live preview</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["font-thin",      "300", "font-thin"],
              ["font-extralight","300", "font-extralight"],
              ["font-light",     "300", "font-light"],
              ["font-normal",    "300", "font-normal"],
              ["font-medium",    "400", "font-medium"],
              ["font-semibold",  "400", "font-semibold"],
              ["font-bold",      "400", "font-bold"],
              ["font-extrabold", "400", "font-extrabold"],
              ["font-black",     "400", "font-black"],
            ].map(([cls, resolves, applyClass]) => (
              <tr key={cls} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2 font-mono text-xs text-foreground">{cls}</td>
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{resolves}</td>
                <td className={`px-4 py-2 text-sm text-foreground ${applyClass}`}>
                  Birdeye
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════════
   4. HEADINGS
   ══════════════════════════════════════════════════════ */
export const Headings: Story = {
  name: "Font / Headings",
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <Label>Heading styles — HTML elements h1 – h4</Label>
      <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
        {[
          { tag: "h1", size: "text-2xl", weight: "400", lh: "1.5", label: "Page title" },
          { tag: "h2", size: "text-xl",  weight: "400", lh: "1.5", label: "Section heading" },
          { tag: "h3", size: "text-lg",  weight: "400", lh: "1.5", label: "Sub-section heading" },
          { tag: "h4", size: "text-base",weight: "400", lh: "1.5", label: "Card / panel title" },
        ].map(({ tag, size, weight, lh, label }) => {
          const Tag = tag as keyof JSX.IntrinsicElements;
          return (
            <div key={tag} className="flex items-center gap-6 px-6 py-6 bg-card hover:bg-muted/40 transition-colors">
              <div className="w-8 shrink-0">
                <span className="font-mono text-xs text-muted-foreground">{tag}</span>
              </div>
              <div className="flex-1">
                <Tag>Get more reviews and build trust faster</Tag>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-0.5">
                <span className="font-mono text-[10px] text-muted-foreground">{size}</span>
                <span className="font-mono text-[10px] text-muted-foreground">weight {weight}</span>
                <span className="font-mono text-[10px] text-muted-foreground">lh {lh}</span>
                <span className="text-[10px] text-muted-foreground/60">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════════
   5. BODY & UI TEXT
   ══════════════════════════════════════════════════════ */
export const BodyAndUIText: Story = {
  name: "Font / Body & UI Text",
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">

      {/* Body text */}
      <div className="flex flex-col gap-4">
        <Label>Body text</Label>
        <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
          {[
            { cls: "text-base text-foreground",           label: "text-base",           note: "Primary body copy" },
            { cls: "text-base text-muted-foreground",     label: "text-base + muted",   note: "Secondary / supporting copy" },
            { cls: "text-sm text-foreground",             label: "text-sm",             note: "Table cells, list items" },
            { cls: "text-sm text-muted-foreground",       label: "text-sm + muted",     note: "Helper text, captions" },
            { cls: "text-xs text-foreground",             label: "text-xs",             note: "Labels, badges, metadata" },
            { cls: "text-xs text-muted-foreground",       label: "text-xs + muted",     note: "Timestamps, tooltips" },
          ].map(({ cls, label, note }) => (
            <div key={label} className="flex items-center gap-6 px-6 py-4 bg-card hover:bg-muted/40 transition-colors">
              <div className="flex-1">
                <span className={cls}>
                  Invite customers to leave reviews and build trust.
                </span>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-[10px] text-muted-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground/60">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UI element text */}
      <div className="flex flex-col gap-4">
        <Label>UI element defaults</Label>
        <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
          {[
            { el: "button", cls: "text-base font-medium", note: "Buttons — text-base, weight 400" },
            { el: "label",  cls: "text-base font-medium", note: "Labels — text-base, weight 400" },
            { el: "input",  cls: "text-base font-normal", note: "Inputs — text-base, weight 300" },
          ].map(({ el, cls, note }) => (
            <div key={el} className="flex items-center gap-6 px-6 py-4 bg-card hover:bg-muted/40 transition-colors">
              <span className="font-mono text-xs text-muted-foreground w-14 shrink-0">{`<${el}>`}</span>
              <span className={`flex-1 ${cls} text-foreground`}>
                Save changes
              </span>
              <p className="text-[10px] text-muted-foreground/60 shrink-0">{note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Paragraph */}
      <div className="flex flex-col gap-4">
        <Label>Paragraph — line height 1.5</Label>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-base text-foreground leading-normal max-w-prose">
            Birdeye helps businesses collect reviews, manage their online
            reputation, and connect with customers across every channel.
            Our platform brings your customer experience data together so
            you can make smarter decisions faster.
          </p>
        </div>
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════════
   6. FULL SPECIMEN
   ══════════════════════════════════════════════════════ */
export const Specimen: Story = {
  name: "Font / Full Specimen",
  render: () => (
    <div className="flex flex-col gap-10 max-w-3xl">
      <Label>Full type specimen — Inter 300 & 400</Label>

      {/* Large display */}
      <div className="flex flex-col gap-1">
        <p className="text-4xl text-foreground leading-tight">
          Build trust with every customer
        </p>
        <p className="text-4xl font-light text-muted-foreground leading-tight">
          Build trust with every customer
        </p>
      </div>

      <Rule />

      {/* Scale waterfall */}
      <div className="flex flex-col gap-2">
        {[
          "text-3xl", "text-2xl", "text-xl",
          "text-lg", "text-base", "text-sm", "text-xs",
        ].map((size) => (
          <p key={size} className={`${size} text-foreground leading-snug`}>
            Get more reviews and build lasting trust — {size}
          </p>
        ))}
      </div>

      <Rule />

      {/* Light vs Regular side by side */}
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <Label>Light — 300</Label>
          <p className="text-2xl font-light text-foreground">Display heading</p>
          <p className="text-lg font-light text-foreground">Section heading</p>
          <p className="text-base font-light text-foreground">Body paragraph text</p>
          <p className="text-sm font-light text-muted-foreground">Supporting caption text</p>
          <p className="text-xs font-light text-muted-foreground">Metadata and labels</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Regular — 400</Label>
          <p className="text-2xl font-normal text-foreground">Display heading</p>
          <p className="text-lg font-normal text-foreground">Section heading</p>
          <p className="text-base font-normal text-foreground">Body paragraph text</p>
          <p className="text-sm font-normal text-muted-foreground">Supporting caption text</p>
          <p className="text-xs font-normal text-muted-foreground">Metadata and labels</p>
        </div>
      </div>

      <Rule />

      {/* Real UI strings */}
      <div className="flex flex-col gap-4">
        <Label>Real product copy — in context</Label>
        <div className="flex flex-col gap-4">
          {[
            { text: "No reviews yet",                                    cls: "text-base text-foreground" },
            { text: "Invite customers to leave reviews and build trust.", cls: "text-sm text-muted-foreground" },
            { text: "We couldn't process your request. Try again.",       cls: "text-sm text-destructive" },
            { text: "Your changes have been saved.",                      cls: "text-sm text-foreground" },
            { text: "Shows how your business appears across directories.",cls: "text-xs text-muted-foreground" },
            { text: "Save changes",                                       cls: "text-base font-medium text-foreground" },
            { text: "Jan 15, 2025 · 9 am",                               cls: "text-xs font-mono text-muted-foreground" },
          ].map(({ text, cls }) => (
            <p key={text} className={cls}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  ),
};
