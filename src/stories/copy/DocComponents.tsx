/**
 * Shared display primitives for Copy Guidelines stories.
 * These are render-only — they carry no Storybook metadata.
 */

import React from "react";

/* ── Page shell ─────────────────────────────────────── */
export function DocPage({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl text-foreground mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>}
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────── */
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base text-foreground border-b border-border pb-2">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

/* ── Rule card ───────────────────────────────────────── */
export function Rule({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <div className="text-sm text-foreground leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Do / Don't pair ─────────────────────────────────── */
export function DoDont({ do: doText, dont }: { do: string | string[]; dont: string | string[] }) {
  const dos = Array.isArray(doText) ? doText : [doText];
  const donts = Array.isArray(dont) ? dont : [dont];
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card p-4 flex flex-col gap-2">
        <span className="text-xs font-medium text-[#2da44e] dark:text-[#3fb950] uppercase tracking-wide">✔ Do</span>
        {dos.map((t, i) => (
          <p key={i} className="text-sm text-foreground">"{t}"</p>
        ))}
      </div>
      <div className="rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card p-4 flex flex-col gap-2">
        <span className="text-xs font-medium text-destructive uppercase tracking-wide">✕ Don't</span>
        {donts.map((t, i) => (
          <p key={i} className="text-sm text-muted-foreground line-through decoration-destructive/60">"{t}"</p>
        ))}
      </div>
    </div>
  );
}

/* ── Example pill list ───────────────────────────────── */
export function Examples({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-2 py-1 rounded-full text-sm bg-secondary text-secondary-foreground border border-border"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/* ── Anatomy block ───────────────────────────────────── */
export function Anatomy({ parts }: { parts: { label: string; text: string; optional?: boolean }[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
      {parts.map((p, i) => (
        <div key={i} className="flex items-start gap-4">
          <span className="mt-0.5 w-2 h-2 rounded-full bg-primary shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {p.label}{p.optional && <span className="ml-1 opacity-60">(optional)</span>}
            </span>
            <span className="text-sm text-foreground italic">"{p.text}"</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Data table ──────────────────────────────────────── */
export function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2 text-xs text-muted-foreground uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Callout ─────────────────────────────────────────── */
export function Callout({ type = "info", children }: {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info:    "bg-secondary text-secondary-foreground border-border",
    warning: "bg-destructive/10 text-destructive border-destructive/30",
    tip:     "bg-[#e8f5e9] dark:bg-[#1b2e1e] text-[#2da44e] dark:text-[#3fb950] border-[#c8e6c9] dark:border-[#2da44e]/30",
  };
  const icons = { info: "ℹ", warning: "⚠", tip: "💡" };
  return (
    <div className={`rounded-lg border px-4 py-4 flex gap-4 text-sm ${styles[type]}`}>
      <span className="shrink-0">{icons[type]}</span>
      <span>{children}</span>
    </div>
  );
}

/* ── Structure template ──────────────────────────────── */
export function StructureTemplate({ template, example }: { template: string; example: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg bg-muted px-4 py-4 font-mono text-xs text-muted-foreground whitespace-pre-wrap">
        {template}
      </div>
      <div className="rounded-lg border border-border bg-card px-4 py-4 text-sm text-foreground">
        <span className="text-xs text-muted-foreground block mb-1">Example</span>
        {example}
      </div>
    </div>
  );
}
