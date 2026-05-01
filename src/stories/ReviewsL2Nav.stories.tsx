/**
 * Reviews L2 Nav — stories
 *
 * The panel is driven by L2NavLayout (the shared primitive).
 * Default rule: "Actions" section is the only one expanded on load.
 * Default active: first child of Actions = "Actions/Reply manually".
 *
 * Stories capture every useful state for design review and QA.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { L2NavLayout, type L2NavLayoutProps } from "@/app/components/L2NavLayout";

/* ── Reviews nav config (single source — mirrors Sidebar.tsx) ── */
const reviewsConfig: L2NavLayoutProps = {
  headerAction: { label: "Send a review request" },
  sections: [
    {
      label: "Actions",
      children: ["Reply manually", "Monitor agent replies"],
    },
    {
      label: "Reviews",
      children: [
        "All",
        "Google",
        "Yelp",
        "This month",
        "Last 30 days",
        "Last 7 days",
        "High rated (4, 5 stars)",
        "Low rated (1, 2, 3 stars)",
        "Archived",
      ],
    },
    {
      label: "Competitors",
      children: ["Benchmarking", "Head to head", "Reviews"],
    },
    {
      label: "Agents",
      children: [
        "Review generation agents",
        "Review response agents",
        "Review monitoring agents",
        "Review marketing agents",
      ],
    },
    {
      label: "Libraries",
      children: ["Request templates", "Response templates", "QR codes", "Widgets"],
    },
  ],
  footerLink: { label: "Reports", external: true },
};

/* ── Wrapper ────────────────────────────────────────── */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#e0e5eb] dark:bg-[#13161b] transition-colors duration-300">
      {children}
    </div>
  );
}

const meta: Meta = {
  title: "App/Reviews L2 Nav",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

/* ══════════════════════════════════════════════════════
   DEFAULT STATE
   ══════════════════════════════════════════════════════ */

/**
 * Default load state.
 * Only "Actions" is expanded. Active = first child of Actions.
 */
export const Default: Story = {
  name: "State / Default",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} />
    </Frame>
  ),
};

/* ══════════════════════════════════════════════════════
   ACTIVE ITEM STATES — Reviews section
   ══════════════════════════════════════════════════════ */

export const ReviewsAll: Story = {
  name: "Active / Reviews — All",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Reviews/All" />
    </Frame>
  ),
};

export const ReviewsGoogle: Story = {
  name: "Active / Reviews — Google",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Reviews/Google" />
    </Frame>
  ),
};

export const ReviewsYelp: Story = {
  name: "Active / Reviews — Yelp",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Reviews/Yelp" />
    </Frame>
  ),
};

export const ReviewsHighRated: Story = {
  name: "Active / Reviews — High rated",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Reviews/High rated (4, 5 stars)" />
    </Frame>
  ),
};

export const ReviewsLowRated: Story = {
  name: "Active / Reviews — Low rated",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Reviews/Low rated (1, 2, 3 stars)" />
    </Frame>
  ),
};

export const ReviewsArchived: Story = {
  name: "Active / Reviews — Archived",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Reviews/Archived" />
    </Frame>
  ),
};

/* ══════════════════════════════════════════════════════
   ACTIVE ITEM STATES — other sections
   ══════════════════════════════════════════════════════ */

export const CompetitorsBenchmarking: Story = {
  name: "Active / Competitors — Benchmarking",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Competitors/Benchmarking" />
    </Frame>
  ),
};

export const AgentsGeneration: Story = {
  name: "Active / Agents — Review generation",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Agents/Review generation agents" />
    </Frame>
  ),
};

export const LibrariesTemplates: Story = {
  name: "Active / Libraries — Request templates",
  render: () => (
    <Frame>
      <L2NavLayout {...reviewsConfig} defaultActive="Libraries/Request templates" />
    </Frame>
  ),
};

/* ══════════════════════════════════════════════════════
   EXPAND / COLLAPSE STATES
   ══════════════════════════════════════════════════════ */

/** All sections collapsed — only headers visible */
export const AllCollapsed: Story = {
  name: "Expand / All collapsed",
  render: () => {
    // Override default by controlling activeItem externally with no section open
    const [active, setActive] = useState("Actions/Reply manually");
    return (
      <Frame>
        <L2NavLayout
          {...reviewsConfig}
          // Render with no section expanded by using sections with defaultCollapsed
          sections={reviewsConfig.sections.map(s => ({ ...s, defaultCollapsed: true } as any))}
          activeItem={active}
          onActiveItemChange={setActive}
        />
      </Frame>
    );
  },
};

/** Interactive — all sections start expanded for full overview */
export const AllExpanded: Story = {
  name: "Expand / All expanded",
  render: () => {
    const [active, setActive] = useState("Actions/Reply manually");
    // Pre-open every section by setting defaultActive per section
    return (
      <Frame>
        <div className="flex h-screen bg-[#e0e5eb] dark:bg-[#13161b] transition-colors duration-300">
          {/* Use a custom wrapper that forces all expanded */}
          <AllExpandedPanel active={active} onActive={setActive} />
        </div>
      </Frame>
    );
  },
};

/* Helper: renders the Reviews panel with all sections forced open */
function AllExpandedPanel({ active, onActive }: { active: string; onActive: (k: string) => void }) {
  const { ChevronUp, ChevronDown, ExternalLink } = require("lucide-react");

  const PANEL =
    "w-[220px] bg-[#f0f1f5] dark:bg-[#1e2229] border-r border-[#e5e9f0] dark:border-[#2e3340] rounded-tl-lg flex flex-col h-full overflow-hidden shrink-0 transition-colors duration-300";
  const ROW = "flex items-center justify-between w-full px-[8px] py-[6px] text-[13px] rounded-[4px] transition-colors tracking-[-0.26px]";
  const HOVER = "hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340]";

  return (
    <div className={PANEL}>
      <div className="flex-1 overflow-y-auto px-[8px] pt-3 pb-4">
        <button className={`${ROW} ${HOVER} text-[#212121] dark:text-[#e4e4e4] mb-[6px]`} style={{ fontSize: 14 }}>
          <span className="text-[14px]">Send a review request</span>
          <div className="w-[18px] h-[18px] bg-[#1E44CC] rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-[12px] leading-none select-none">+</span>
          </div>
        </button>
        {reviewsConfig.sections.map(section => (
          <div key={section.label}>
            <div className={`${ROW} ${HOVER} text-[#212121] dark:text-[#e4e4e4]`} style={{ fontWeight: 400 }}>
              <span>{section.label}</span>
              <ChevronUp className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
            </div>
            {section.children.map(child => {
              const key = `${section.label}/${child}`;
              const isActive = active === key;
              return (
                <button
                  key={child}
                  onClick={() => onActive(key)}
                  className={`${ROW} text-left ${isActive ? "text-[#1E44CC] dark:text-[#7fa8ff] bg-[#dce5ff] dark:bg-[#1e2d5e]" : `${HOVER} text-[#555] dark:text-[#9ba2b0]`}`}
                  style={{ fontWeight: isActive ? 400 : 300 }}
                >
                  {child}
                </button>
              );
            })}
          </div>
        ))}
        <button className={`${ROW} ${HOVER} text-[#212121] dark:text-[#e4e4e4] mt-[2px]`} style={{ fontWeight: 400 }}>
          <span>Reports</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280]" />
        </button>
      </div>
    </div>
  );
}
