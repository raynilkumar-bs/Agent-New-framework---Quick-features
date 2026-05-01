/**
 * L2NavLayout — shared layout primitive for ALL L2 navigation panels.
 *
 * APP SHELL — L2 COLUMN (required for new products):
 *   The exported `PANEL` class string includes `rounded-tl-lg` (8px top-left) so the L2
 *   column matches the rest of the app below the top bar. Custom L2 sidebars (220px) must
 *   use `PANEL` or replicate the same radius and surface tokens — see Storybook:
 *   Design System → Tokens → Border Radius → App shell.
 *
 * DEFAULT EXPANSION RULE (applies to every panel automatically):
 *   • If a section named "Actions" exists → expand only that section.
 *   • If no "Actions" section exists → expand only the first section.
 *   • All other sections start collapsed.
 *
 * DEFAULT ACTIVE RULE:
 *   • If defaultActive is provided → use it.
 *   • Otherwise → auto-select the first child of the expanded section.
 *
 * To build a new product L2 nav, pass a config object — no styling decisions needed:
 *
 *   <L2NavLayout
 *     headerAction={{ label: "Send a review request" }}
 *     sections={[
 *       { label: "Actions", children: ["Reply manually", "Monitor agent replies"] },
 *       { label: "Reviews", children: ["All", "Google", "Yelp"] },
 *     ]}
 *     footerLink={{ label: "Reports", external: true }}
 *   />
 */

import { useState } from "react";
import { ChevronUp, ChevronDown, ExternalLink } from "lucide-react";
import { useL2NavBridgeSetter } from "@/app/context/L2NavBridgeContext";

/* ─────────────────────────────────────────────────────
   Design tokens — edit here to update every L2 panel
   ───────────────────────────────────────────────────── */
export const PANEL =
  "w-[220px] bg-[#f0f1f5] dark:bg-[#1e2229] border-r border-[#e5e9f0] dark:border-[#2e3340] rounded-tl-lg flex flex-col h-full overflow-hidden shrink-0 transition-colors duration-300";

// Shared row geometry — same for headers, children, footer
export const ROW =
  "flex items-center justify-between w-full px-[8px] py-[6px] text-[13px] rounded-[4px] transition-colors tracking-[-0.26px]";

export const HOVER = "hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340]";

export const SECTION_HEADER    = `${ROW} ${HOVER} text-[#212121] dark:text-[#e4e4e4]`;
export const CHILD_INACTIVE    = `${ROW} ${HOVER} text-left text-[#555] dark:text-[#9ba2b0]`;
export const CHILD_ACTIVE      = `${ROW} text-left text-[#212121] dark:text-[#e4e4e4] bg-[#dce5ff] dark:bg-[#1e2d5e]`;
export const FOOTER_ROW_CLS    = `${ROW} ${HOVER} text-[#212121] dark:text-[#e4e4e4]`;

/* ─────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────── */
/** String = label and key are the same (legacy panels). Object = visible label + stable key (e.g. conversation id). */
export type L2SectionChild = string | { label: string; key: string };

export interface L2Section {
  label: string;
  children: L2SectionChild[];
}

function l2ChildParts(c: L2SectionChild): { label: string; key: string } {
  return typeof c === "string" ? { label: c, key: c } : c;
}

export interface L2HeaderAction {
  label: string;
  onClick?: () => void;
}

export interface L2FooterLink {
  label: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

/** Prefix for `flatNavItems` active keys: `flatNav/{key}`. */
export const L2_FLAT_NAV_KEY_PREFIX = "flatNav";

export interface L2NavLayoutProps {
  /** Top row with a + button (e.g. "Send a review request") */
  headerAction?: L2HeaderAction;
  /** Color of the + button in the headerAction. Defaults to "blue". */
  headerActionColor?: "blue" | "green";
  /** Flat clickable items rendered BEFORE sections (key = "standalone/{label}") */
  standaloneItems?: string[];
  /**
   * Flat rows with stable keys (no section header). Active key = `flatNav/{key}`.
   * Renders after standalone items and before collapsible sections.
   */
  flatNavItems?: { label: string; key: string }[];
  /** Collapsible sections */
  sections: L2Section[];
  /** Single bottom row, optionally with an external-link icon */
  footerLink?: L2FooterLink;
  /**
   * Initial active item in "Section/Child" format.
   * Defaults to the first child of the default-expanded section.
   */
  defaultActive?: string;
  /** Controlled active item (for Storybook stories / testing) */
  activeItem?: string;
  onActiveItemChange?: (key: string) => void;
  /** Section labels to expand on initial mount (overrides default expansion rule) */
  defaultExpandedSections?: string[];
  "data-no-print"?: boolean;
}

/* ─────────────────────────────────────────────────────
   Helper — resolve which section opens by default
   ───────────────────────────────────────────────────── */
function resolveDefaultExpanded(sections: L2Section[]): string {
  return sections.find(s => s.label === "Actions")?.label ?? sections[0]?.label ?? "";
}

/* ─────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────── */
export function L2NavLayout({
  headerAction,
  headerActionColor = "blue",
  standaloneItems,
  flatNavItems,
  sections,
  footerLink,
  defaultActive,
  activeItem: controlledActive,
  onActiveItemChange,
  defaultExpandedSections,
  "data-no-print": noprint,
}: L2NavLayoutProps) {

  // Expansion state — respects defaultExpandedSections if provided, else default rule
  const defaultExpandedLabel = resolveDefaultExpanded(sections);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.map(s => [
      s.label,
      defaultExpandedSections
        ? defaultExpandedSections.includes(s.label)
        : s.label === defaultExpandedLabel,
    ]))
  );

  // Active item — auto-resolve to first child of expanded section if not provided
  const defaultSection = sections.find(s => s.label === defaultExpandedLabel);
  const firstChild = defaultSection?.children[0];
  const firstKey = firstChild != null ? l2ChildParts(firstChild).key : null;
  const resolvedDefault =
    defaultActive ?? (firstKey != null ? `${defaultExpandedLabel}/${firstKey}` : "");

  const [internalActive, setInternalActive] = useState(resolvedDefault);
  const active = controlledActive ?? internalActive;

  // Publish to the module-level bridge so module views can react to L2 selections.
  const publishToBridge = useL2NavBridgeSetter();

  const toggle = (label: string) =>
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }));

  const activate = (key: string) => {
    setInternalActive(key);
    onActiveItemChange?.(key);
    publishToBridge(key);
  };

  const plusBg = headerActionColor === "green" ? "bg-[#4caf50]" : "bg-[#1E44CC]";

  return (
    <div className={PANEL} data-no-print={noprint}>
      <div className="flex-1 overflow-y-auto px-[8px] pt-3 pb-4">

        {/* Header action */}
        {headerAction && (
          <button
            type="button"
            onClick={headerAction.onClick}
            className={`${FOOTER_ROW_CLS} mb-[6px]`}
            style={{ fontSize: 14 }}
          >
            <span className="text-[14px]">{headerAction.label}</span>
            <div className={`w-[18px] h-[18px] ${plusBg} rounded-full flex items-center justify-center shrink-0`}>
              <span className="text-white text-[12px] leading-none select-none">+</span>
            </div>
          </button>
        )}

        {/* Standalone items (flat, before sections) */}
        {standaloneItems && standaloneItems.map(label => {
          const key = `standalone/${label}`;
          const isActive = active === key;
          return (
            <button
              key={label}
              onClick={() => activate(key)}
              className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
              style={{ fontWeight: isActive ? 400 : 300 }}
            >
              {label}
            </button>
          );
        })}

        {flatNavItems?.map(({ label: rowLabel, key: itemKey }) => {
          const compoundKey = `${L2_FLAT_NAV_KEY_PREFIX}/${itemKey}`;
          const isActive = active === compoundKey;
          return (
            <button
              key={itemKey}
              type="button"
              onClick={() => activate(compoundKey)}
              className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
              style={{ fontWeight: isActive ? 400 : 300 }}
            >
              {rowLabel}
            </button>
          );
        })}

        {/* Sections */}
        {sections.map(section => (
          <div key={section.label}>
            <button
              onClick={() => toggle(section.label)}
              className={SECTION_HEADER}
              style={{ fontWeight: 400 }}
            >
              <span>{section.label}</span>
              {expanded[section.label]
                ? <ChevronUp   className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
                : <ChevronDown className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
              }
            </button>

            {expanded[section.label] && section.children.map(child => {
              const { label: childLabel, key: childKey } = l2ChildParts(child);
              const compoundKey = `${section.label}/${childKey}`;
              const isActive = active === compoundKey;
              return (
                <button
                  key={`${section.label}/${childKey}`}
                  onClick={() => activate(compoundKey)}
                  className={isActive ? CHILD_ACTIVE : CHILD_INACTIVE}
                  style={{ fontWeight: isActive ? 400 : 300 }}
                >
                  {childLabel}
                </button>
              );
            })}
          </div>
        ))}

        {/* Footer link */}
        {footerLink && (
          <button
            className={`${FOOTER_ROW_CLS} mt-[2px]`}
            style={{ fontWeight: 400, opacity: footerLink.disabled ? 0.5 : 1 }}
            onClick={footerLink.onClick}
            disabled={footerLink.disabled}
          >
            <span>{footerLink.label}</span>
            {footerLink.external && !footerLink.disabled && (
              <ExternalLink className="w-3.5 h-3.5 text-[#888] dark:text-[#6b7280] shrink-0" />
            )}
          </button>
        )}

      </div>
    </div>
  );
}
