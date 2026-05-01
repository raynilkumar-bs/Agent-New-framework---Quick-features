---
name: aero-ds
description: “Birdeye Design System: internal team base for building features. ALL UI must use ONLY existing Storybook components from src/app/components/ui/ and src/stories/. No new libraries, no invented styles, no raw hex. Triggers: UI, components, feature, table, button, card, form, layout, dashboard, module, page.”
---

# Birdeye Design System — Team Skill

## PURPOSE OF THIS REPO

This repo is the **single shared base** for all internal Birdeye product teams. Its goal is simple: **clone it, run `npm run dev`, and build your feature on top of what’s already here.**

Every table, button, card, form, input, modal, nav panel, and layout pattern your team needs **already exists** in this repo. The AI’s job is to find and use those existing pieces — not invent new ones.

---

## THE #1 RULE — STORYBOOK COMPONENTS ONLY

**When anyone on any team asks the AI to build any UI, the AI MUST:**

1. First look in [`src/app/components/ui/`](../../../src/app/components/ui/) for the component
2. Then check [`src/stories/`](../../../src/stories/) to see how it’s used
3. Use that component exactly as-is — same props, same styling, same interactions
4. Never substitute it with an external library or a hand-rolled version

This is non-negotiable. If a Button exists in the design system, every button in every feature must use that Button. If a Table exists, every table uses that Table. No exceptions.

---

## SOURCES OF TRUTH

| What you need | Where to find it |
|---------------|-----------------|
| **All UI primitives** (Button, Card, Input, Table, Dialog, Badge, Tabs, Select, Checkbox, etc.) | [`src/app/components/ui/`](../../../src/app/components/ui/) |
| **How each component is used** | [`src/stories/`](../../../src/stories/) — find the matching `.stories.tsx` file |
| **Colors, spacing, radius, shadows** | [`src/tokens/theme.css`](../../../src/tokens/theme.css) + [`src/themes/v2/tokens.css`](../../../src/themes/v2/tokens.css) |
| **Typography (font, sizes, weights)** | [`src/stories/Typography.stories.tsx`](../../../src/stories/Typography.stories.tsx) |
| **Icons** | [`src/stories/Icons.stories.tsx`](../../../src/stories/Icons.stories.tsx) — Phosphor + Lucide only |
| **App shell (L1, L2, TopBar, Module Header)** | [`src/app/App.tsx`](../../../src/app/App.tsx) + [`src/app/components/layout/`](../../../src/app/components/layout/) |
| **Full module examples** (Reviews, Contacts, Agents, Social, etc.) | [`src/app/components/`](../../../src/app/components/) — each `*View.tsx` is a reference |
| **How to add a new module** | [`AERO_DS_APP_PLAN.md`](../../../AERO_DS_APP_PLAN.md) — Phase 3, the 5-step playbook |

---

## WHAT “CONSISTENT” MEANS

Every feature built in this repo must match:

- **Same fonts** — Inter, weights and sizes from Typography story only
- **Same colors** — CSS token variables from `theme.css` only (`bg-primary`, `text-muted-foreground`, `border-border`, etc.)
- **Same spacing** — 8px grid (multiples of 2, 4, 8, 16, 24, 32...)
- **Same interactions** — hover states, focus rings, transitions exactly as in existing components
- **Same component anatomy** — if a Card has a header + body + footer pattern, your card uses that pattern
- **Same dark/light behaviour** — components already handle both; do not override theme vars

---

## HOW TO START A NEW FEATURE MODULE

Follow the 5-step playbook in [`AERO_DS_APP_PLAN.md`](../../../AERO_DS_APP_PLAN.md):

1. Add your route to `AppView` in `src/app/App.tsx`
2. Register the title in `src/app/appViewTitle.ts`
3. Add your L1 icon to `src/app/components/Sidebar.tsx`
4. Create your L2 nav panel (if needed)
5. Create your module view using `ModuleHeader` + components from `src/app/components/ui/`

Always run `npm run dev` and verify your module loads in the shell before calling it done.

---

## STRICTLY FORBIDDEN

- Installing a new UI library (shadcn re-installs, MUI overrides, Ant Design, Chakra, etc.) when the component already exists here
- Writing raw hex colors (`#1a2b3c`) in JSX or TSX files — use CSS token classes
- Copy-pasting styles from Tailwind component sites (Tailwind UI, Flowbite, daisyUI, etc.)
- Creating a new Button, Card, Table, Input, Modal, Dropdown, or Badge from scratch — look in `ui/` first
- Importing icons from any source other than `@phosphor-icons/react` or `lucide-react`
- Overriding font-family, font-size, or line-height inline — use the typography scale
- Using `style={{ }}` for colors, spacing, or typography — use Tailwind token classes

---

## REQUIRED WORKFLOW FOR EVERY UI TASK

```
1. Read the relevant story in src/stories/ to understand the component
2. Import the component from src/app/components/ui/
3. Use token classes for all styling (no raw hex, no arbitrary Tailwind values for color/font)
4. Wire it into the app shell via App.tsx (for new modules)
5. Test in npm run dev — verify light mode looks correct
```

---

## QUICK COMPONENT REFERENCE

| Need | Import from |
|------|-------------|
| Button, Badge, Card | `@/app/components/ui/button`, `badge`, `card` |
| Table, TableRow, TableHead | `@/app/components/ui/table` |
| Input, Textarea, Select | `@/app/components/ui/input`, `textarea`, `select` |
| Dialog, Sheet, Drawer | `@/app/components/ui/dialog`, `sheet`, `drawer` |
| Tabs, Accordion, Collapsible | `@/app/components/ui/tabs`, `accordion`, `collapsible` |
| Dropdown, Context Menu | `@/app/components/ui/dropdown-menu`, `context-menu` |
| Avatar, Skeleton, Progress | `@/app/components/ui/avatar`, `skeleton`, `progress` |
| Form + validation | `@/app/components/ui/form` (react-hook-form based) |
| Charts | `@/app/components/ui/chart` (Recharts based) |
| Toast / notifications | `sonner` via `@/app/components/ui/sonner` |

---

## EXAMPLE PROMPTS FOR TEAM MEMBERS

- *”Add a Billing module with a table of invoices”* → AI must use `Table` from `ui/table`, `Badge` for status, `Button` for actions, and `ModuleHeader` for the page header
- *”Create a settings form for notifications”* → AI must use `Form`, `Switch`, `Select`, `Button` from `ui/` — not build new form elements
- *”Build a contacts detail panel”* → AI must reference `ContactsView.tsx` for the pattern and `Sheet` or `Dialog` from `ui/` for the panel

---

## QUALITY CHECKLIST (before any PR)

- Every component imported from `src/app/components/ui/` — no hand-rolled replacements
- No raw hex values in any `.tsx` file
- No new external UI packages added to `package.json`
- Module loads correctly in `npm run dev` with L1 + L2 + TopBar visible
- Light mode looks correct (default)
- No inline `style={{ fontFamily, fontSize, color }}` overrides
