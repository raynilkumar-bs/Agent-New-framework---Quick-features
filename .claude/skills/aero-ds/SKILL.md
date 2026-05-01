---
name: aero-ds
description: "Aero DS (Bird AI design system): Storybook + semantic tokens first. Use src/stories and src/tokens — never bundled CSV palettes. Triggers: UI, components, tokens, Storybook, layout, forms, dashboards, agents, settings."
---

# Aero DS — Storybook-mapped skill

This skill tells the agent **where truth lives** in the **aero-ds** repo: **Storybook**, **CSS tokens**, and **`src/app/components/ui/`** primitives. It replaces generic “design system from CSV” packs.

## Sources of truth (read these before writing UI)

| What | Where |
|------|--------|
| **Semantic colours, chart/sidebar tokens, radius, spacing** | Storybook **Design System/Tokens** → [`src/stories/DesignTokens.stories.tsx`](../../../src/stories/DesignTokens.stories.tsx) |
| **Typography / scale** | **Design System/Typography** → [`src/stories/Typography.stories.tsx`](../../../src/stories/Typography.stories.tsx) |
| **Icons reference** | **Design System/Icons** → [`src/stories/Icons.stories.tsx`](../../../src/stories/Icons.stories.tsx) |
| **Theme + dark mode + DESIGN_VERSION** | [`.storybook/preview.tsx`](../../../.storybook/preview.tsx) |
| **Global CSS utilities / animations** | [`src/tokens/theme.css`](../../../src/tokens/theme.css) |
| **Versioned design tokens (per `DESIGN_VERSION`)** | [`src/themes/`](../../../src/themes/) (e.g. `v1`–`v4` `tokens.css`) |
| **Primitives (Button, Card, Dialog, …)** | [`src/app/components/ui/`](../../../src/app/components/ui/) |
| **Spacing rhythm for stories** | Workspace rule **spacing-grid** (8px + 4px dense) |

**Validate visually:** `npm run storybook` → [http://localhost:6006](http://localhost:6006)

### Discover stories without maintaining a long list

Stories live under [`src/stories/`](../../../src/stories/). Sidebar groups include:

- **Design System/** — Tokens, Typography, Icons, BirdAI-specific specs
- **UI/** — Primitives (Button, Form, Table, …)
- **App/** — Shell and views (e.g. AppShell, Sidebar, Dashboard, Agents)

To list Storybook `title:` values from the repo root:

```bash
rg 'title: "' src/stories --glob '*.tsx'
```

## Scope (SaaS in-app, not marketing)

This design system targets **Bird AI / ShareConsolidated** in-app UI: dashboards, agents, tasks, settings, workflows, data views.

**Do not** default to hero-led marketing sites, campaign landings, or portfolio layouts unless the user explicitly asks for out-of-app marketing UI.

**Do not** suggest ad hoc hex colours for in-repo components. Use **Tailwind semantic classes** from tokens (`bg-primary`, `text-muted-foreground`, `border-border`, chart/sidebar classes) as shown in **Design System/Tokens**.

---

## Forbidden (nothing from old CSV/BM25 packs)

- Running **`search.py`**, **`--design-system`**, or any **bundled CSV** (`colors.csv`, `typography.csv`, `landing.csv`, stack CSVs) as **authoritative** for colours, typography, or layout for this repo.
- Inventing **hex palettes** instead of **`theme.css` / `src/themes/*/tokens.css`** and Storybook.
- Pulling **generic stack templates** (Vue/Svelte/mobile CSVs) for this **React + Storybook** codebase.
- Introducing **unrelated** components from external registries when an existing primitive or storied pattern exists—extend **`src/app/components/ui/`** and match **Storybook** first.

---

## Required workflow

1. Prefer **existing** components from [`src/app/components/ui/`](../../../src/app/components/ui/) and patterns from [`src/stories/`](../../../src/stories/).
2. Use **semantic tokens** from Storybook + CSS variables—not raw hex in JSX unless defining new tokens in theme files.
3. Ship **story updates** with **UI changes** when adding or changing visible behaviour (team convention).

---

## How it works (designers & PMs)

**What this skill does:** It steers the AI to **your** Storybook and token files so UI stays **on-brand** and **reviewable** in one place—not random palettes from the web or old CSV packs.

**Benefits:**

- Consistent **Aero DS** / Bird AI shell patterns.
- Fewer off-brand colours and one-off components.
- Clear **visual check**: run Storybook and compare to **Design System** stories.

**How to use it:** Open the **aero-ds** repo in Cursor (or run Claude Code in this directory). Enable or invoke the **Aero DS** skill when doing UI work. Ask in **plain language**; the agent should open the right **Design System** and **UI** stories before inventing styles.

**Example prompts:**

- *“Add a settings row using our Form + Input patterns—check Design System/Tokens for colours and the Form story in Storybook.”*
- *“Build a dashboard card using Card + existing spacing; use semantic classes only, no ad hoc hex.”*
- *“Match App Shell layout to the App/AppShell story and Sidebar story.”*
- *“Review this component against Design System/Typography and Tokens stories.”*

*(Invocation depends on your client: `@aero-ds`, skill picker, or Composer instructions.)*

---

## Compatibility — where this skill applies

| Context | Loads this skill? | Notes |
|--------|-------------------|--------|
| **Cursor** (this repo open) | **Yes**, when the **Aero DS** skill is matched or invoked; **workspace rules** apply when configured for this workspace. | Stub: [`.cursor/skills/aero-ds/SKILL.md`](../../../.cursor/skills/aero-ds/SKILL.md) points here. |
| **Claude Code** (terminal, cwd = `aero-ds`) | **Yes** — project skill at **`.claude/skills/aero-ds/SKILL.md`**. | Behaviour follows Claude Code’s skill discovery for this repo. |
| **Claude / API without project files** | **No** automatic skill file | Paste this file or key bullets manually. |
| **Hooks** (`.cursor/hooks.json`, etc.) | **Not the same as skills** | Hooks automate lifecycle events; they do **not** replace Storybook-first instructions. Use **alongside** this skill if you add automation. |

**One line:** This file is for **IDE/agent workflows that read project skills**; **Claude Code** uses **`.claude/skills/`** when you work in this repository; Cursor **rules** complement the skill.

---

## Quality checks (before delivery)

- No emoji as UI icons (use SVG / icon set from **Design System/Icons**).
- Interactive elements: `cursor-pointer`, visible focus, sensible transitions.
- Respect **`prefers-reduced-motion`** where motion is decorative.
- Light and dark: test with Storybook theme toolbar ([`.storybook/preview.tsx`](../../../.storybook/preview.tsx)).

---

## Optional scale (team)

- **Component + story in the same PR** when UI changes.
- **CI:** run `npm run build-storybook` on PRs so broken stories fail early.
- **Optional:** add `npm run storybook:index` later to generate `STORYBOOK_INDEX.md` from `title:` fields—only if manual discovery becomes painful.
