# Aero DS → Standalone App: Implementation Plan

**Goal:** Convert the Aero DS Storybook repo into a runnable Vite app your team can clone, `npm install`, and `npm run dev` to get the full Birdeye shell (L1 strip, L2 panel, TopBar, module views) — and use as a base to build new features.

---

## Current State (What You Already Have)

The good news: **the app already exists inside this repo.** `src/app/App.tsx` is a complete, wired-up Birdeye shell with:

- **L1 Navigation** — `IconStrip` (left icon rail, all product modules)
- **L2 Navigation** — per-module panels (`ReviewsL2NavPanel`, `ContactsL2NavPanel`, `AgentsL2NavPanel`, etc.)
- **TopBar** — spans full width above L2 + content, shows current module title + BirdAI toggle
- **Module Views** — 25+ views (`ReviewsView`, `ContactsView`, `SocialView`, `TicketingView`, etc.)
- **Auth shell** — login page, post-login boot shimmer
- **Myna chat panel** — resizable right-side AI chat
- **Theming** — v1–v4 design tokens, dark mode support

What's **missing** is the scaffolding to run it as a standalone Vite app (4 files total).

---

## Phase 1 — Wire Up the Vite App Entry (4 files, ~1 hour)

### 1.1 — Add `vite.config.ts` (root)

Create `/vite.config.ts` (not inside `.storybook`):

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Stub out Figma asset imports (used in some components)
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "figma-asset-stub",
      enforce: "pre",
      resolveId(id) {
        if (id.startsWith("figma:asset/")) return id;
      },
      load(id) {
        if (id.startsWith("figma:asset/")) return 'export default ""';
      },
    },
  ],
});
```

### 1.2 — Add `index.html` (root)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Birdeye</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 1.3 — Add `src/main.tsx`

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./themes/index.css";
import "./themes/tailwind.css";
import "./themes/theme.css";
import "./themes/fonts.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 1.4 — Update `package.json` scripts + promote React to deps

Add `dev`, `build:app`, and `preview` scripts. Move `react` and `react-dom` from `peerDependencies` to `dependencies` so they install automatically:

```json
"scripts": {
  "dev": "vite",
  "build:app": "vite build",
  "preview": "vite preview",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "build": "tsc -p tsconfig.build.json"
},
"dependencies": {
  "react": "18.3.1",
  "react-dom": "18.3.1",
  // ... all existing deps
}
```

After these 4 changes, the team can run:
```bash
git clone <repo>
npm install
npm run dev   # → opens at http://localhost:5173
```

---

## Phase 2 — Repo Structure for Feature Teams

Once the app runs, establish where each team adds their work. Recommended structure:

```
src/
├── app/
│   ├── App.tsx                    ← Route registry & shell wiring
│   ├── appViewTitle.ts            ← Module title map (add your module here)
│   ├── components/
│   │   ├── ui/                    ← Base components (Button, Input, etc.) — don't edit
│   │   ├── layout/                ← Shell chrome — don't edit
│   │   ├── Sidebar.tsx            ← L1 icon strip & all L2 panel exports
│   │   ├── TopBar.tsx             ← TopBar — don't edit
│   │   │
│   │   ├── ReviewsView.tsx        ← Feature module: Reviews
│   │   ├── ContactsView.tsx       ← Feature module: Contacts
│   │   ├── [YourFeature]View.tsx  ← ← ← ADD YOUR MODULE HERE
│   │   └── ...
│   └── hooks/
│       └── usePersistedState.ts   ← LocalStorage-backed state for nav
├── stories/                       ← Storybook stories (parallel, optional)
├── themes/                        ← Design tokens & CSS vars
└── config/
    └── designVersion.ts           ← Current design version (v1–v4)
```

**The team's "golden path" for a new feature module involves touching exactly 5 files** (see Phase 3).

---

## Phase 3 — Adding a New Feature Module (Team Playbook)

Every Birdeye module follows the same 5-step pattern. Here's the playbook for adding, e.g., a new **"Billing"** module:

### Step 1 — Declare the route in `App.tsx`

Add `"billing"` to the `AppView` union type:

```ts
// src/app/App.tsx
export type AppView =
  | "reviews"
  | "contacts"
  | "billing"   // ← add this
  | ...;
```

### Step 2 — Register the title in `appViewTitle.ts`

```ts
// src/app/appViewTitle.ts
case "billing":
  return "Billing";
```

### Step 3 — Add the L1 icon to `Sidebar.tsx`

Find the `IconStrip` component in `Sidebar.tsx` (or the relevant versioned file). Add an icon entry for your module — follow the existing `l1Icons.tsx` pattern:

```tsx
// src/app/components/l1Icons.tsx  (or Sidebar.tsx)
{ view: "billing", icon: <CreditCard size={20} />, label: "Billing" },
```

### Step 4 — Create the L2 nav panel (if your module needs one)

```tsx
// src/app/components/BillingL2NavPanel.tsx
export function BillingL2NavPanel() {
  return (
    <div className="w-[220px] flex flex-col shrink-0 border-r border-[#e5e9f0] dark:border-[#252b35]">
      <div className="px-4 py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wide">
        Billing
      </div>
      {/* L2 nav items */}
    </div>
  );
}
```

Export it from `Sidebar.tsx`:
```tsx
export { BillingL2NavPanel } from "./BillingL2NavPanel";
```

Wire it in `App.tsx` in the L2 render section (follow the existing `currentView === "reviews"` pattern).

### Step 5 — Create the Module View with a standard header

```tsx
// src/app/components/BillingView.tsx
import { ModuleHeader } from "./layout/ModuleHeader";  // (new shared component — see Phase 4)

export function BillingView() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <ModuleHeader
        title="Billing"
        subtitle="Manage your subscription and payment methods"
        actions={
          <Button size="sm">Add payment method</Button>
        }
      />
      <div className="flex-1 overflow-auto p-6">
        {/* Your feature content */}
      </div>
    </div>
  );
}
```

Wire the view in `App.tsx` in the main content `if/else` chain:
```tsx
} : currentView === "billing" ? (
  <BillingView />
) : ...
```

---

## Phase 4 — `ModuleHeader` Shared Component (Recommended Addition)

Currently each module has its own header pattern. Standardize it with one shared component so all modules look consistent:

```tsx
// src/app/components/layout/ModuleHeader.tsx
interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
}

export function ModuleHeader({ title, subtitle, breadcrumb, actions, tabs }: ModuleHeaderProps) {
  return (
    <div className="shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35] bg-white dark:bg-[#1e2229]">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div className="flex flex-col gap-0.5">
          {breadcrumb && <div className="text-xs text-[#6b7280]">{breadcrumb}</div>}
          <h1 className="text-[20px] font-semibold text-[#111827] dark:text-[#f3f4f6] tracking-[-0.4px]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>
      {tabs && <div className="px-6 pb-0">{tabs}</div>}
    </div>
  );
}
```

**Usage across all modules:**
```tsx
<ModuleHeader
  title="Reviews"
  actions={<Button>Request reviews</Button>}
  tabs={<Tabs value="all">...</Tabs>}
/>
```

---

## Phase 5 — Recommended `package.json` Dev Tooling Additions

Add these for a clean team DX:

```json
"scripts": {
  "dev": "vite",
  "build:app": "vite build",
  "preview": "vite preview",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "build:lib": "tsc -p tsconfig.build.json",
  "typecheck": "tsc --noEmit",
  "lint": "eslint src --ext ts,tsx"
}
```

Consider adding:
- **ESLint + Prettier** (`.eslintrc`, `.prettierrc`) — consistent code style across the team
- **`.env.example`** — document any env vars (API keys, feature flags, etc.)
- **`CONTRIBUTING.md`** — link to this plan, explain the 5-step module playbook

---

## Summary: What to Execute

| Priority | Action | File(s) | Time |
|----------|--------|---------|------|
| 🔴 Must | Add Vite config | `vite.config.ts` | 10 min |
| 🔴 Must | Add HTML entry | `index.html` | 5 min |
| 🔴 Must | Add React entry | `src/main.tsx` | 5 min |
| 🔴 Must | Add dev script + promote React deps | `package.json` | 10 min |
| 🟡 High | Add `ModuleHeader` shared component | `src/app/components/layout/ModuleHeader.tsx` | 30 min |
| 🟡 High | Update `README.md` with team playbook | `README.md` | 20 min |
| 🟢 Nice | Add ESLint + Prettier configs | `.eslintrc`, `.prettierrc` | 30 min |
| 🟢 Nice | Add `CONTRIBUTING.md` (5-step guide) | `CONTRIBUTING.md` | 20 min |

**Total for MVP (just running the app):** ~30 minutes  
**Total for team-ready base:** ~2 hours

---

## Notes on the Existing Architecture

- **Versioned components** (`Sidebar.tsx` re-exports from `Sidebar.v1.tsx`, etc.): The team should keep adding to the latest version file and update the re-export. This allows easy rollback comparison.
- **`usePersistedState`**: The nav state (L1/L2 active items) persists in `sessionStorage`. This is intentional — refreshing the page keeps you on the same module.
- **Storybook stays**: The `npm run storybook` script stays intact. Stories are a great way to develop components in isolation before wiring them into the app shell.
- **Design tokens**: All colors, spacing, and typography live in `src/themes/`. Prefer using the CSS vars (e.g., `bg-[var(--surface-primary)]`) over hardcoded hex values in new feature work.
