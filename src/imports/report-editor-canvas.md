# Report Editor Canvas — Implementation Spec

A Birdeye-style report editor experience modeled after Pitch, Canva, Figma, and Google Slides, built with React, Tailwind CSS v4, and Recharts.

---

## Architecture

### 3-Panel Layout

| Panel | Width | Purpose |
|-------|-------|---------|
| **Left** | 300px fixed | AI chat / Manual customization, mode toggle at top |
| **Center** | Flex fill | Zoomable scrollable document canvas with floating toolbar |
| **Right** | 120px fixed | Gamma-style page thumbnail navigator |

### Entry Point

- `AICustomizePanel.tsx` — main editor component
- Receives `themeColor`, `onThemeColorChange`, `showSummaryPage`, `onToggleSummaryPage`, optional `editingDraft`
- Header bar (56px) with Back, title, Print, Save Draft, and Share buttons

---

## Center Canvas — Zoomable Document Editor

### Canvas Structure

```
viewport (flex-1, bg-[#f2f4f7])
  └── floating toolbar (top center, pill bar)
  └── scrollable container (ref: previewContainerRef)
      └── pages wrapper (transform: scale(zoomPercent / 100), transformOrigin: top center)
          └── page elements (stacked vertically or flex-wrap for two-page view)
```

### Page Rendering

Pages are rendered at a fixed base size determined by the selected layout:

- **Portrait layouts** (A4, 4:3, Letter): `pageW = 240px`, `pageH = 240 × ratio`
- **Landscape layouts** (16:9): `pageW = 240 / ratio`, `pageH = 240px`

CSS `transform: scale()` handles all zoom — pages are never resized via width/max-width.

### Page Types (in order)

1. **Cover page** (optional, toggle via `showCoverPage`)
   - Background: cover image at 8% opacity
   - Center-aligned: Birdeye full wordmark logo (SVG, colored with `themeColor`), title, subtitle, date, location count
   - Custom logo support: upload from device or fetch by domain (Clearbit → Google favicon fallback)
   - Footer: report name + "Cover" label

2. **Summary page** (optional, toggle via `showSummaryPage`)
   - Top accent border (`2px solid themeColor`)
   - Birdeye icon + text header
   - "Executive Summary" title + description paragraph
   - 2×2 metrics grid: Impressions (1.1K, +4.8%), Engagement (143, +98.6%), Eng. Rate (13.2%, +6.3%), Link Clicks (0)
   - "Key Insights" section with 3 bullet points (accent-colored dots)
   - Footer with page number

3. **Report pages** (pages 3–10, always shown)
   - **Default theme**: 8 static Figma-imported images (`imgChart`, `imgTable1`–`imgTable7`)
   - **All other themes**: 8 live Recharts components from `ReportPages.tsx`, receiving full `ReportPageProps`
   - Each page has: accent top border, content area with configurable padding, optional footer with page number

### View Modes

- **Single-page**: pages stacked vertically, centered (`flex-col items-center gap-6`)
- **Two-page**: pages wrapped side-by-side (`flex flex-wrap justify-center gap-6`)

---

## Zoom System

### Floating Toolbar (top center, pill bar)

Components in order, separated by thin dividers:

1. **View mode** — Single page / Two-page toggle buttons with custom SVG icons
2. **Zoom controls** — Zoom out (−10) · Percentage dropdown · Zoom in (+10)
3. **Undo / Redo** — History-based with custom SVG icons

### Zoom Dropdown Presets

| Label | Behavior |
|-------|----------|
| Fit Width | Auto-fit mode: ResizeObserver calculates zoom to fill available width minus 48px margin |
| Fit Page | Calculate zoom so full page height fits in container height minus 48px |
| _(divider)_ | — |
| 25% | Fixed zoom |
| 50% | Fixed zoom |
| 75% | Fixed zoom |
| 100% | Fixed zoom (comfortable reading) |
| 125% | Fixed zoom |
| 150% | Fixed zoom |
| 200% | Fixed zoom (max, page fills viewport) |

### Zoom Behavior

- **Auto-fit** (default): `ResizeObserver` on `previewContainerRef` recalculates zoom on container resize
- **Manual zoom**: disables auto-fit; buttons increment/decrement by 10
- **Mouse wheel zoom**: `Ctrl/Cmd + scroll` adjusts zoom by ±10, disables auto-fit
- Range: 25%–200%
- Transform origin: `top center`
- `minHeight: ${100 / (zoomPercent / 100)}%` ensures scroll area scales correctly
- Zoom preserves page proportions, does not crop, does not lock to container width

### Zoom UX

- At 25–50%: multiple pages visible, overview mode
- At 75–100%: comfortable reading, single page fills most of width
- At 125–150%: detailed inspection
- At 200%: maximum detail, page extends beyond viewport with scrolling

---

## Right Panel — Page Thumbnail Navigator

Gamma-style page navigation (120px width, white bg, border-left):

### Structure

- **Panel header**: "PAGES" label (10px uppercase, #999)
- **Scrollable thumbnail list**: vertical, 2.5 spacing

### Thumbnail Design

Each thumbnail is a clickable button that scrolls to the corresponding page:

- Aspect ratio matches selected layout (`1 / currentLayout.ratio`)
- Background matches current style theme
- Border: 2px, transitions to blue on hover
- Subtle shadow with hover elevation
- Bottom-left: page number badge (white bg, shadow, 8px text)
- Below thumbnail: page label (9px, truncated)

### Thumbnail Content

- **Cover**: Birdeye icon thumb (28px SVG), decorative lines, cover image at 5% opacity
- **Summary**: accent top border, "Summary" text, mini metric placeholders (4 colored dots), decorative lines
- **Report pages (Default)**: accent border, mini version of static report image
- **Report pages (Other themes)**: accent border, mini Recharts bar chart, decorative content lines

---

## Left Panel — AI Chat & Manual Customization

### Mode Toggle

Segmented control at top: "Create with AI" (with purple Sparkles icon) / "Manually"

### AI Chat Mode

- Message history with assistant (gradient avatar) and user (right-aligned, grey bubble) messages
- Color suggestion chips: circular swatches, clickable to apply theme color
- Typing indicator: 3 bouncing dots
- Bottom input: Prompt Kit compound components (`PromptInput`, `PromptInputTextarea`, `PromptInputActions`)
  - Actions: Attach file (Paperclip), Voice input (Mic), Send/Stop button
  - Send: blue rounded button when input present; Stop: dark rounded button with square icon when typing

### AI Command Processing

Recognizes natural language for: color/theme changes, summary page toggle, page additions, font/typography, dark mode

### Manual Customization Mode

Scrollable accordion sections with `SectionHeader` components (icon + label + chevron):

#### 1. Theme (Palette icon)
- Description text + "View more" button (Sparkles icon, blue text)
- 2×2 grid of 6 style presets: Default, Executive, Presentation, Insight, Minimal, Dark Analytics
- Each preset card: mini chart SVG illustration on gradient header bg, style name with checkmark when selected
- Selected: blue border + blue shadow ring

#### 2. Layout (Maximize icon)
- 2×2 grid of layout options: A4 Portrait (1.4142), 16:9 Landscape (0.5625), 4:3 Portrait (1.333), US Letter (1.2941)
- Text alignment: segmented control (Left / Center / Right)

#### 3. Page Cover (BookOpen icon)
- Show cover page toggle
- When visible: Title, Subtitle, Date text inputs
- Show logo toggle → custom logo section: upload button, domain search with Clearbit/Google favicon
- Summary page toggle

#### 4. Colors (Palette icon)
- Accent color: 8 circular swatches (Blue, Purple, Teal, Orange, Red, Green, Indigo, Pink)
- Theme presets: 6 clickable rows with 3-dot color preview (primary, secondary, accent)

#### 5. Font Type (Type icon)
- Font size: slider 75%–150% with −/+ buttons, percentage display, reset link
- Font family: 6 options (Roboto, Inter, Georgia, Playfair Display, Montserrat, Source Sans 3) with live font preview

#### 6. Padding & Spacing (Maximize icon)
- Segmented control: Compact (8px) / Normal (12px) / Spacious (18px)
- Inner padding display badge

#### 7. Headers & Footers (FileEdit icon)
- Show header / Show footer / Page numbers toggles
- Footer text input

---

## Style Presets

Each preset defines a complete color system applied to all pages:

| Preset | bg | cardBg | titleColor | bodyColor | linkColor | borderColor | headerBg |
|--------|-----|--------|------------|-----------|-----------|-------------|----------|
| Default | #fff | #f5f5f5 | #1a1a1a | #666 | #1976d2 | #e0e0e0 | grey gradient |
| Executive | #fff | #f8f9fb | #1a1f36 | #4f566b | #635bff | #e3e8ee | blue-grey gradient |
| Presentation | #fff | #f7f8fc | #0d1b3e | #5a6478 | #3b82f6 | #e2e6f0 | indigo gradient |
| Insight | #fff | #fafbfc | #1e293b | #64748b | #0ea5e9 | #e2e8f0 | sky gradient |
| Minimal | #fff | #fafafa | #171717 | #737373 | #18181b | #e5e5e5 | neutral gradient |
| Dark Analytics | #0f172a | #1e293b | #f1f5f9 | #94a3b8 | #38bdf8 | #334155 | slate gradient |

**Default theme** renders static Figma images; all other themes switch to live Recharts pages.

---

## Share Modal (`ShareModal.tsx`)

Compact two-column SaaS modal (~920px × 68vh, ~25% smaller than standard):

### Left Panel (45%)

- **Header**: "Share" title + close button
- **Tabs**: pill-style Share / Export / Email toggle
- **Share tab**: share link with copy button (checkmark feedback), "Who can access" dropdown (Only invited / Anyone with link / Public), invite search input
- **Export tab**: 4 format rows (PDF, XLS, PPT, PNG) with colored icon badges + download arrow
- **Email tab**: recipients, subject, message (optional) inputs
- **Footer bar**: "Customise with BirdAI" link (gradient AI icon + purple text) + Cancel / action button

### Right Panel (55%)

Light grey `#f2f4f7` preview canvas with scrollable A4-ratio page thumbnails:

- **Preview header**: "PREVIEW" label + page count
- **Cover page**: Birdeye full wordmark SVG, title, subtitle, date, cover background at 6% opacity, "Cover" footer
- **Summary page** (when enabled): accent top border, Birdeye icon header, Executive Summary title, description, 2×2 metrics grid, Key Insights bullets, numbered footer
- **Report image pages**: accent top border, report image content (no extra header — images contain their own), numbered footer
- Each page: white bg, rounded corners, soft composite shadow (`0 2px 8px rgba(0,0,0,0.06)`)

### Modes

- `hidePreview` prop: renders left panel only at 380px width (used when opened from within AICustomizePanel)
- Accent color follows `themeColor` prop

---

## State Management

### Undo/Redo History

- `Snapshot` type captures: themeColor, showCoverPage, showSummaryPage, selectedFont, selectedLayout, paddingSize, coverTitle, coverSubtitle, showHeader, showFooter, showPageNumbers, headerText
- Pushes to history array on any state change (JSON comparison prevents duplicates)
- `canUndo` / `canRedo` derived from history index

### Draft Persistence

- `draftStore.ts`: localStorage-backed CRUD with pub/sub pattern
- Save Draft button in header bar creates/updates draft
- Saved confirmation tooltip: green checkmark + "Draft saved" (2.5s auto-dismiss)
- `editingDraft` prop restores all customization state on mount

### Font Scale System

- `fs(base)` helper: `Math.round(base * 0.5 * fontScale / 100)`
- Applied to all text elements in cover and summary pages
- Range: 75%–150%, default 100%

---

## Print Support

- `data-print-root`, `data-no-print`, `data-print-page`, `data-print-pages-container` attributes
- Dynamic `@page` CSS rule injection for correct paper size/orientation
- Hides non-print elements (panels, toolbar) via attribute selectors

---

## Known Issues (Resolved)

- **`pageW` initialization order bug** (fixed twice): `currentLayout`, `pageW`, `pageH`, and `pagePadding` declarations must appear above any `useEffect` that references them. Moving declarations above the relevant effects resolved stale-closure issues.

---

## Planned Features

- **"View more" themes**: expand the 6-preset grid with a button that reveals 6 additional theme presets (proposed, not yet implemented)
- Pass `selectedStyle` / `selectedFont` from AICustomizePanel into ShareModal so preview reflects active customization
- Mini page-number strip or thumbnail sidebar in Share modal preview panel
