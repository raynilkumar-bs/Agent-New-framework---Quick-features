/** AgentLibraryView v1 — Jasper-style agent store with themed hero banners and card grid. */

import { useMemo } from "react";
import { agentThemes, BADGE_COLORS, type AgentCard, type AgentTheme, type BadgeType } from "@/app/data/agentLibrary";

/* ─── Badge pill ─── */
function Badge({ type }: { type: BadgeType }) {
  const c = BADGE_COLORS[type];
  return (
    <span
      className="inline-block px-2 py-[1px] rounded text-[10px] tracking-wide shrink-0"
      style={{ fontWeight: 400, backgroundColor: c.bg, color: c.text }}
    >
      <span className="dark:hidden">{type}</span>
      <span className="hidden dark:inline" style={{ backgroundColor: c.darkBg, color: c.darkText }}>{type}</span>
    </span>
  );
}

/* ─── Single agent card ─── */
function AgentCardItem({ agent, onClick }: { agent: AgentCard; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-[#93C5FD] hover:scale-[1.01] hover:shadow-sm cursor-pointer"
    >
      {/* Badges row */}
      <div className="flex flex-wrap gap-1.5">
        {agent.badges.map((b) => (
          <Badge key={b} type={b} />
        ))}
      </div>

      {/* Name */}
      <p className="text-sm text-foreground leading-snug" style={{ fontWeight: 400 }}>
        {agent.name}
      </p>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontWeight: 300 }}>
        {agent.description}
      </p>

      {/* Pipeline step */}
      {agent.pipelineStep && (
        <span
          className="text-[10px] px-2 py-0.5 rounded self-start"
          style={{ fontWeight: 400, backgroundColor: BADGE_COLORS.PIPELINE.bg, color: BADGE_COLORS.PIPELINE.text }}
        >
          {agent.pipelineStep}
        </span>
      )}

      {/* Social proof */}
      {agent.usedBy && (
        <p className="text-[11px] text-muted-foreground" style={{ fontWeight: 300 }}>
          Used by {agent.usedBy} businesses
        </p>
      )}
    </button>
  );
}

/* ─── Theme hero banner ─── */
function ThemeHero({ theme }: { theme: AgentTheme }) {
  return (
    <div
      className="rounded-lg px-6 py-5 mb-4"
      style={{ backgroundColor: theme.heroBg }}
    >
      {/* Dark mode overlay */}
      <div className="hidden dark:block absolute inset-0 rounded-lg" style={{ backgroundColor: theme.heroBgDark }} />
      <h2
        className="text-lg relative z-[1]"
        style={{ fontWeight: 400, color: theme.heroText }}
      >
        {theme.title}
      </h2>
      <p
        className="text-xs relative z-[1] mt-1 opacity-80"
        style={{ fontWeight: 300, color: theme.heroText }}
      >
        {theme.subtitle}
      </p>
    </div>
  );
}

/* ─── Main view ─── */
interface AgentLibraryViewProps {
  activeTheme?: string;
  onAgentClick?: (slug: string) => void;
}

export function AgentLibraryView({ activeTheme, onAgentClick }: AgentLibraryViewProps) {
  const themes = useMemo(() => {
    if (!activeTheme || activeTheme === "all") return agentThemes;
    return agentThemes.filter((t) => t.id === activeTheme);
  }, [activeTheme]);

  return (
    <div className="h-full min-h-0 overflow-hidden rounded-tl-lg bg-white dark:bg-[#1e2229]">
      <div className="h-full min-h-0 overflow-y-auto">
        <div className="px-6 py-8 flex flex-col gap-8">
          {/* Page header */}
          <div>
            <h1 className="text-2xl text-foreground" style={{ fontWeight: 300 }}>
              Agent Library
            </h1>
            <p className="text-sm text-muted-foreground mt-1" style={{ fontWeight: 400 }}>
              Deploy pre-built AI agents organized by business outcome
            </p>
          </div>

          {/* Themes */}
          {themes.map((theme) => (
            <div key={theme.id}>
              {/* Hero banner */}
              <div
                className="relative rounded-lg px-6 py-5 mb-4 overflow-hidden"
                style={{ backgroundColor: theme.heroBg }}
              >
                <div
                  className="hidden dark:block absolute inset-0"
                  style={{ backgroundColor: theme.heroBgDark }}
                />
                <h2
                  className="text-lg relative"
                  style={{ fontWeight: 400, color: theme.heroText }}
                >
                  {theme.title}
                </h2>
                <p
                  className="text-xs relative mt-1 opacity-80"
                  style={{ fontWeight: 300, color: theme.heroText }}
                >
                  {theme.subtitle}
                </p>
              </div>

              {/* Card grid */}
              <div className="grid grid-cols-3 gap-4">
                {theme.agents.map((agent) => (
                  <AgentCardItem
                    key={agent.slug}
                    agent={agent}
                    onClick={() => onAgentClick?.(agent.slug)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentLibraryView;
