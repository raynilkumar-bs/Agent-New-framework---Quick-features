# Birdeye Design System — Claude Code Instructions

## Setup (first time)

```bash
npm install
npm run dev        # → http://localhost:5173
npm run storybook  # → http://localhost:6006 (component browser)
```

## What this repo is

A fully working Birdeye product shell your team uses as a base to build features. It includes:
- **L1 navigation** (left icon strip) — `src/app/components/Sidebar.v2.tsx`
- **L2 navigation** (per-module side panel) — `src/app/components/Sidebar.v2.tsx`
- **TopBar** — `src/app/components/TopBar.tsx`
- **25+ reference module views** (Reviews, Contacts, Agents, Social, etc.) — `src/app/components/`
- **All UI primitives** — `src/app/components/ui/` (Button, Card, Table, Input, Dialog, etc.)

## NON-NEGOTIABLE RULES — read before writing a single line

### 1. Reference images are for structure only — NEVER copy their styling
If a user provides a screenshot or design image:
- **Use it only** to understand layout structure, sections, and data fields.
- **Never replicate** colors, fonts, spacing, borders, shadows, navigation styles, or any visual treatment shown in the image.
- **Always apply** this design system's tokens, components, and patterns instead.
- A reference image showing a blue sidebar, custom nav, or half-width card is **describing intent** — not dictating implementation.

### 2. Never touch the chrome — L1, L2, and TopBar are frozen
- **L1 navigation** (`Sidebar.v2.tsx` → `iconStripItems`, click handlers, `useLayoutEffect`) — **do not modify**.
- **L2 navigation panels** (all `*L2NavPanel` exports in `Sidebar.v2.tsx`) — **do not modify**.
- **TopBar** (`TopBar.tsx`) — **do not modify**.
These are shared infrastructure. Your work lives entirely inside the module view component.

### 3. Content must always be full-width
- Your module view receives 100% of the available content area.
- **Never** render content in a half-width, centered-column, or constrained-width layout unless the user explicitly asks for it.
- Correct: `<div className="flex flex-col flex-1 min-h-0">` — fills the area.
- Wrong: `<div className="max-w-2xl mx-auto">` — shrinks to a column.

### 4. Check Storybook before writing any component
Run `npm run storybook` (→ http://localhost:6006) and search before building.
- If a component exists there → **import and use it**. Do not recreate it.
- If it doesn't exist → build it from the primitives in `src/app/components/ui/`.
- **Never** install a new UI library or write raw HTML elements when a system component exists.

---

## THE ONE RULE — read before writing any UI

**Every UI element must come from `src/app/components/ui/`.**

Before writing any component, check if it already exists:
```
src/app/components/ui/button.tsx        ← all buttons
src/app/components/ui/card.tsx          ← all cards
src/app/components/ui/table.tsx         ← all tables
src/app/components/ui/input.tsx         ← all inputs
src/app/components/ui/dialog.tsx        ← all modals/dialogs
src/app/components/ui/sheet.tsx         ← all slide-over panels
src/app/components/ui/tabs.tsx          ← all tabs
src/app/components/ui/badge.tsx         ← all status badges
src/app/components/ui/select.tsx        ← all dropdowns
src/app/components/ui/form.tsx          ← all forms (react-hook-form)
src/app/components/ui/chart.tsx         ← all charts (Recharts)
src/app/components/ui/avatar.tsx        ← all avatars
src/app/components/ui/checkbox.tsx      ← all checkboxes
src/app/components/ui/switch.tsx        ← all toggles
src/app/components/ui/skeleton.tsx      ← all loading states
src/app/components/ui/dropdown-menu.tsx ← all dropdown menus
src/app/components/ui/tooltip.tsx       ← all tooltips
src/app/components/ui/sonner.tsx        ← all toasts/notifications
```

**Never install a new UI library. Never write a component from scratch if it exists above.**

---

## How to add a new feature module (5 steps)

### Step 1 — Copy the template
```bash
cp src/app/components/TemplateModuleView.tsx src/app/components/InventoryView.tsx
```
Open the new file — every step is annotated inside it.

### Step 2 — Add your route to AppView
In `src/app/App.tsx`, add your module name to the `AppView` union:
```ts
export type AppView =
  | "reviews"
  | "contacts"
  | "inventory"   // ← add this
  | ...
```

### Step 3 — Register the title
In `src/app/appViewTitle.ts`:
```ts
case "inventory":
  return "Inventory";
```

### Step 4 — Add L1 icon + L2 panel
In `src/app/components/Sidebar.v2.tsx`:

**L1 icon** — add an entry to `iconStripItems`:
```ts
{ label: "Inventory", Icon: Package },
```

**Click handler** — in the `onClick` of `IconStrip`:
```ts
else if (label === "Inventory") onViewChange("inventory");
```

**useLayoutEffect highlight** — add:
```ts
else if (currentView === "inventory") setActiveIcon("Inventory");
```

**L2 nav panel** — copy an existing panel config and create:
```ts
const inventoryConfig = {
  sections: [
    { label: "Actions",  children: ["Stock levels", "Reorder alerts"] },
    { label: "Reports",  children: ["Overview", "Trends"] },
    { label: "Settings", children: ["Locations", "Suppliers"] },
  ],
};

export function InventoryL2NavPanel() {
  return <L2NavLayout {...inventoryConfig} data-no-print />;
}
```

### Step 5 — Wire view and L2 panel in App.tsx

**Import the L2 panel** at the top:
```ts
import { ..., InventoryL2NavPanel } from "./components/Sidebar";
```

**Add to `hasOwnL2Panel`:**
```ts
v === "inventory" ||
```

**Render the L2 panel** (near the other L2 panel blocks):
```tsx
{!aiPanelOpen && !mynaWorkspaceExpanded && currentView === "inventory" && (
  <InventoryL2NavPanel />
)}
```

**Import and render the view:**
```ts
import { InventoryView } from "./components/InventoryView";
```
```tsx
} : currentView === "inventory" ? (
  <InventoryView />
) : (
```

---

## L2 navigation → content routing (THE NEW PATTERN)

Every module view receives the active L2 item automatically via `useActiveL2Item()`.
This is provided by `L2NavBridgeContext` — already wired in `App.tsx`. You do not need to touch App.tsx to get L2 routing working inside your view.

### Pattern:

```tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function InventoryView() {
  const activeItem = useActiveL2Item();
  // activeItem format: "SectionLabel/ItemLabel"  e.g. "Actions/Stock levels"
  //                    "standalone/ItemLabel"     e.g. "standalone/All contacts"
  //                    ""                         (nothing clicked yet)

  // Route each L2 item to real content:
  if (activeItem === "Actions/Stock levels")   return <StockLevelsContent />;
  if (activeItem === "Actions/Reorder alerts") return <ReorderAlertsContent />;

  // Everything else → intentional empty state (never blank):
  return <ModuleEmptyState moduleName="Inventory" activeL2Key={activeItem} />;
}
```

### Why this guarantees no blank screens:
- Every unbuilt section falls through to `ModuleEmptyState` automatically
- `ModuleEmptyState` shows the section name + build instructions
- As you add real content components, they take over naturally

---

## Shared layout components

```
src/app/components/layout/ModuleHeader.tsx      ← page header for all modules
src/app/components/layout/ModuleEmptyState.tsx  ← intentional empty state
```

```tsx
import { ModuleHeader } from "@/app/components/layout/ModuleHeader";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

<ModuleHeader
  title="Inventory"
  subtitle="Optional description"
  actions={<Button size="sm">Add item</Button>}
/>

<ModuleEmptyState
  moduleName="Inventory"
  activeL2Key={activeItem}   // from useActiveL2Item()
/>
```

---

## Reference modules to read before building

| What you're building | Best reference |
|---------------------|---------------|
| Any new module      | `TemplateModuleView.tsx` ← start here |
| Simple list view    | `ReviewsView.v1.tsx` |
| Data table view     | `ContactsView.v1.tsx` |
| Dashboard + charts  | `BusinessOverviewDashboard.tsx` |
| Form-heavy view     | `ScheduleBuilderView.tsx` |

---

## Styling rules

- **Colors**: Tailwind token classes only — `bg-white`, `text-[#111827]`, `border-[#e5e9f0]`, `dark:bg-[#1e2229]`
- **Never** use `style={{ color: '#...' }}` inline hex
- **Spacing**: Multiples of 4px — `p-4`, `gap-2`, `px-6`, `py-3`
- **Font**: Already loaded via `src/tokens/fonts.css` — do not import fonts manually
- **Icons**: Import from `lucide-react` or `@phosphor-icons/react` only

---

## Common mistakes that cause blank screens

1. **Forgot to add render case in App.tsx** — the `currentView === "your-module"` branch must exist
2. **Forgot to add to `hasOwnL2Panel`** — the L2 panel won't render without this
3. **Forgot to import the component** — double-check the import path uses `@/app/components/`
4. **Using `style={}` instead of Tailwind** — classes are case-sensitive
5. **Missing export** — use `export function YourView()` not `function YourView()`

> Any route in AppView that isn't wired up shows `UnwiredModuleView` with exact fix instructions.

---

## Design version

Current: `v2` (set in `src/config/designVersion.ts`). Do not change this.
