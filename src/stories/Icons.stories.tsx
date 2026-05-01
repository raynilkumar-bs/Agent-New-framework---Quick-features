/**
 * Icon Browser — browse every icon used in the product.
 * Click any icon to copy its import snippet to the clipboard.
 * To swap an icon: find the component using it below, replace the
 * icon name in the source file with any name from this catalogue.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as Ph from "@phosphor-icons/react";
import {
  Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Settings, User, LogOut, Camera, Moon, Sun, Monitor,
  Share2, Palette, Clock, Sparkles, ExternalLink,
  MoreVertical, Star, Filter,
} from "lucide-react";

const meta: Meta = {
  title: "Design System/Icons",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

/* ── Copy-to-clipboard chip ─────────────────────────────── */
function IconTile({
  name,
  children,
  source,
  usedIn,
  weight = "regular",
}: {
  name: string;
  children: React.ReactNode;
  source: "phosphor" | "lucide" | "custom";
  usedIn?: string;
  weight?: string;
}) {
  const [copied, setCopied] = useState(false);

  const snippet =
    source === "phosphor"
      ? `import { ${name} } from "@phosphor-icons/react";`
      : source === "lucide"
      ? `import { ${name} } from "lucide-react";`
      : `// custom SVG — see source file`;

  const copy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const sourceBadge: Record<string, string> = {
    phosphor: "bg-[#dce5ff] text-[#1E44CC]",
    lucide:   "bg-[#e9f5e9] text-[#2da44e]",
    custom:   "bg-muted text-muted-foreground",
  };

  return (
    <button
      onClick={copy}
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group relative"
      title={`Click to copy: ${snippet}`}
    >
      {/* Icon */}
      <div className="w-8 h-8 flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
        {children}
      </div>
      {/* Name */}
      <p className="text-[11px] text-foreground text-center leading-tight" style={{ fontWeight: 400 }}>{name}</p>
      {/* Source badge */}
      <span className={`text-[9px] px-1 py-0.5 rounded-full ${sourceBadge[source]}`} style={{ fontWeight: 300 }}>
        {source}
      </span>
      {/* Used in */}
      {usedIn && (
        <p className="text-[10px] text-muted-foreground text-center" style={{ fontWeight: 300 }}>{usedIn}</p>
      )}
      {/* Copied toast */}
      {copied && (
        <div className="absolute inset-0 rounded-xl bg-primary/10 flex items-center justify-center">
          <span className="text-[11px] text-primary" style={{ fontWeight: 400 }}>Copied!</span>
        </div>
      )}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm text-foreground border-b border-border pb-2" style={{ fontWeight: 400 }}>{title}</h3>
      <div className="grid grid-cols-6 gap-4 sm:grid-cols-8 md:grid-cols-10">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   STORY 1 — L1 Navigation Icons
   ════════════════════════════════════════════════════════ */
export const L1Navigation: Story = {
  name: "L1 Navigation Icons",
  render: () => (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground" style={{ fontWeight: 300 }}>
        These are the 16 Phosphor icons used in the L1 icon strip (<code className="font-mono text-xs">Sidebar.tsx</code>).
        Click any icon to copy its import statement. To swap, replace the icon name in the <code className="font-mono text-xs">iconStripItems</code> array.
      </div>
      <Section title="L1 Icon Strip — Phosphor Regular / Fill on active">
        {[
          { name: "Sparkle",          label: "Agents (BirdAI)" },
          { name: "House",            label: "Home" },
          { name: "ChatDots",         label: "Inbox" },
          { name: "MapPin",           label: "Listings" },
          { name: "Star",             label: "Reviews" },
          { name: "Gift",             label: "Referrals" },
          { name: "CurrencyDollar",   label: "Payments" },
          { name: "CalendarDots",     label: "Appointments" },
          { name: "Graph",            label: "Social" },
          { name: "ClipboardText",    label: "Surveys" },
          { name: "Ticket",           label: "Ticketing" },
          { name: "Users",            label: "Contacts" },
          { name: "MegaphoneSimple",  label: "Campaigns" },
          { name: "Globe",            label: "Reports" },
          { name: "Lightbulb",        label: "Insights" },
          { name: "ChartBar",         label: "Competitors" },
        ].map(({ name, label }) => {
          const Icon = (Ph as any)[name];
          return Icon ? (
            <IconTile key={name} name={name} source="phosphor" usedIn={label}>
              <Icon size={22} />
            </IconTile>
          ) : null;
        })}
      </Section>
      <Section title="L1 Bottom Controls — Lucide">
        <IconTile name="Sparkles" source="lucide" usedIn="Agent setup">
          <Sparkles className="w-5 h-5" />
        </IconTile>
        <IconTile name="Settings" source="lucide" usedIn="Settings">
          <Settings className="w-5 h-5" />
        </IconTile>
      </Section>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════
   STORY 2 — UI / Product Icons
   ════════════════════════════════════════════════════════ */
export const ProductIcons: Story = {
  name: "Product Icons",
  render: () => (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground" style={{ fontWeight: 300 }}>
        Icons used across product views. Click to copy import.
      </div>

      <Section title="Reviews module — Phosphor + Lucide">
        <IconTile name="FunnelSimple" source="phosphor" usedIn="Filter button">
          <Ph.FunnelSimple size={22} />
        </IconTile>
        <IconTile name="Star" source="lucide" usedIn="Star ratings">
          <Star className="w-5 h-5" />
        </IconTile>
        <IconTile name="Search" source="lucide" usedIn="Search input">
          <Search className="w-5 h-5" />
        </IconTile>
        <IconTile name="ChevronDown" source="lucide" usedIn="Dropdowns">
          <ChevronDown className="w-5 h-5" />
        </IconTile>
        <IconTile name="MoreVertical" source="lucide" usedIn="More actions">
          <MoreVertical className="w-5 h-5" />
        </IconTile>
        <IconTile name="ChevronLeft" source="lucide" usedIn="Carousel prev">
          <ChevronLeft className="w-5 h-5" />
        </IconTile>
        <IconTile name="ChevronRight" source="lucide" usedIn="Carousel next">
          <ChevronRight className="w-5 h-5" />
        </IconTile>
      </Section>

      <Section title="Navigation / Layout — Lucide">
        <IconTile name="ChevronUp" source="lucide" usedIn="Collapse section">
          <ChevronUp className="w-5 h-5" />
        </IconTile>
        <IconTile name="ExternalLink" source="lucide" usedIn="Reports footer link">
          <ExternalLink className="w-5 h-5" />
        </IconTile>
        <IconTile name="Share2" source="lucide" usedIn="Shared by me">
          <Share2 className="w-5 h-5" />
        </IconTile>
        <IconTile name="Clock" source="lucide" usedIn="Scheduled deliveries">
          <Clock className="w-5 h-5" />
        </IconTile>
        <IconTile name="Palette" source="lucide" usedIn="Component showcase">
          <Palette className="w-5 h-5" />
        </IconTile>
      </Section>

      <Section title="Profile / Account — Lucide">
        <IconTile name="User" source="lucide" usedIn="My profile">
          <User className="w-5 h-5" />
        </IconTile>
        <IconTile name="LogOut" source="lucide" usedIn="Sign out">
          <LogOut className="w-5 h-5" />
        </IconTile>
        <IconTile name="Camera" source="lucide" usedIn="Avatar upload">
          <Camera className="w-5 h-5" />
        </IconTile>
        <IconTile name="Moon" source="lucide" usedIn="Dark mode">
          <Moon className="w-5 h-5" />
        </IconTile>
        <IconTile name="Sun" source="lucide" usedIn="Light mode">
          <Sun className="w-5 h-5" />
        </IconTile>
        <IconTile name="Monitor" source="lucide" usedIn="System mode">
          <Monitor className="w-5 h-5" />
        </IconTile>
      </Section>
    </div>
  ),
};

/* ════════════════════════════════════════════════════════
   STORY 3 — Full Phosphor Catalogue (filter variants)
   ════════════════════════════════════════════════════════ */
export const FilterIconVariants: Story = {
  name: "Filter Icon Variants",
  render: () => (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground" style={{ fontWeight: 300 }}>
        All available filter / sort icons. <strong style={{ fontWeight: 400 }}>FunnelSimple</strong> is currently used as the filter button.
        To swap, replace <code className="font-mono text-xs">FunnelSimple</code> in <code className="font-mono text-xs">ReviewsView.tsx</code> with any icon below.
      </div>
      <Section title="Currently active">
        <IconTile name="FunnelSimple" source="phosphor" usedIn="✓ Active — Reviews filter">
          <Ph.FunnelSimple size={22} />
        </IconTile>
      </Section>
      <Section title="Alternative filter / sort icons — Phosphor">
        {[
          "Funnel", "FunnelX", "FunnelSimpleX",
          "SlidersHorizontal", "Sliders",
          "SortAscending", "SortDescending",
        ].map(name => {
          const Icon = (Ph as any)[name];
          return Icon ? (
            <IconTile key={name} name={name} source="phosphor">
              <Icon size={22} />
            </IconTile>
          ) : null;
        })}
      </Section>
      <Section title="Alternative filter / sort icons — Lucide">
        <IconTile name="Filter" source="lucide" usedIn="Old filter icon">
          <Filter className="w-5 h-5" />
        </IconTile>
        <IconTile name="SlidersHorizontal" source="lucide" usedIn="">
          {/* Lucide SlidersHorizontal */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="21" y1="4" x2="14" y2="4"/>
            <line x1="10" y1="4" x2="3" y2="4"/>
            <line x1="21" y1="12" x2="12" y2="12"/>
            <line x1="8" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="20" x2="16" y2="20"/>
            <line x1="12" y1="20" x2="3" y2="20"/>
            <line x1="14" y1="2" x2="14" y2="6"/>
            <line x1="8" y1="10" x2="8" y2="14"/>
            <line x1="16" y1="18" x2="16" y2="22"/>
          </svg>
        </IconTile>
      </Section>
    </div>
  ),
};
