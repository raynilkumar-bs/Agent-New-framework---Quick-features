# Birdeye Design System

The internal team base for building Birdeye product features. Clone it, run it, and build your feature on top — everything you need is already here.

## Quick start

```bash
git clone https://github.com/hareshrajamannar-creator/Birdeye-Design-sysytem.git
cd Birdeye-Design-sysytem
npm install
npm run dev        # → http://localhost:5173  (full product shell)
npm run storybook  # → http://localhost:6006  (component browser)
```

## Building a new feature

### 1. Create your branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Copy the template module

```bash
cp src/app/components/TemplateModuleView.tsx src/app/components/YourFeatureView.tsx
```

Open the new file — every step is annotated inside it.

### 3. Wire it up (5 steps)

| Step | File | What to do |
|------|------|-----------|
| 1 | `src/app/App.tsx` | Add `"your-feature"` to the `AppView` union type |
| 2 | `src/app/appViewTitle.ts` | Add `case "your-feature": return "Your Feature";` |
| 3 | `src/app/components/Sidebar.v2.tsx` | Add your L1 icon entry |
| 4 | `src/app/components/YourFeatureL2NavPanel.tsx` | Create L2 nav panel (if needed) |
| 5 | `src/app/App.tsx` | Add render case + import your view |

Full walkthrough: see `AERO_DS_APP_PLAN.md`.

### 4. Open your PR

```bash
git push origin feature/your-feature-name
# Open a PR against main on GitHub
```

## The one rule

**Every UI element must come from `src/app/components/ui/`.**

```
Button       → src/app/components/ui/button.tsx
Card         → src/app/components/ui/card.tsx
Table        → src/app/components/ui/table.tsx
Input        → src/app/components/ui/input.tsx
Dialog       → src/app/components/ui/dialog.tsx
Badge        → src/app/components/ui/badge.tsx
Select       → src/app/components/ui/select.tsx
Tabs         → src/app/components/ui/tabs.tsx
Sheet        → src/app/components/ui/sheet.tsx
Checkbox     → src/app/components/ui/checkbox.tsx
Switch       → src/app/components/ui/switch.tsx
Dropdown     → src/app/components/ui/dropdown-menu.tsx
Avatar       → src/app/components/ui/avatar.tsx
Skeleton     → src/app/components/ui/skeleton.tsx
Chart        → src/app/components/ui/chart.tsx
Form         → src/app/components/ui/form.tsx
```

Never install a new UI library. Never write a component from scratch if it exists above.

## Using with Claude Code / Cursor / VS Code + AI

This repo includes a `CLAUDE.md` file that automatically gives Claude Code full context about the project structure, component rules, and wiring instructions. When you open this repo in Claude Code and ask it to build a feature, it will:

- Use the correct components from `src/app/components/ui/`
- Follow the 5-step module wiring pattern
- Use the `TemplateModuleView.tsx` as the starting point
- Never invent new styles or install new packages

**Recommended workflow:**
```
1. git checkout -b feature/your-feature
2. Open repo in Cursor or run `claude` in terminal
3. Ask: "Build a [your feature] module using the template"
4. Review the output, make tweaks, push PR
```

## Project structure

```
src/
├── app/
│   ├── App.tsx                          ← Route registry + shell wiring
│   ├── appViewTitle.ts                  ← Module title map
│   ├── components/
│   │   ├── ui/                          ← ALL UI primitives — use these
│   │   ├── layout/
│   │   │   ├── ModuleHeader.tsx         ← Shared page header for all modules
│   │   │   └── ...
│   │   ├── TemplateModuleView.tsx       ← Copy this to start a new feature
│   │   ├── Sidebar.tsx                  ← L1 strip + all L2 panel exports
│   │   ├── TopBar.tsx                   ← Top bar (don't edit)
│   │   ├── ReviewsView.tsx              ← Reference: simple list view
│   │   ├── ContactsView.tsx             ← Reference: data table view
│   │   ├── BusinessOverviewDashboard.tsx← Reference: charts + dashboard
│   │   └── ...                          ← All other module views
│   └── hooks/
├── stories/                             ← Storybook stories for all components
├── themes/                              ← Design tokens (v1–v4)
└── tokens/                              ← Base CSS (fonts, tailwind, theme)
```

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the app at localhost:5173 |
| `npm run build:app` | Production build of the app |
| `npm run storybook` | Browse all components at localhost:6006 |
| `npm run typecheck` | TypeScript check with no emit |

## Questions?

Ping the design systems team or refer to `AERO_DS_APP_PLAN.md` for the full technical plan.
