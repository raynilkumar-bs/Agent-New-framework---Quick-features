import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { cn } from "@/app/components/ui/utils";
import type { AppView } from "@/app/App";
import {
  shortcutScopeFromView,
  shortcutsForModal,
  type ShortcutScope,
} from "./shortcuts";

function modifierLabel(): string {
  if (typeof navigator === "undefined") return "⌘";
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "⌘" : "Ctrl";
}

function KeyChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-6 min-w-6 select-none items-center justify-center rounded border border-border bg-muted px-2 font-mono text-[11px] font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

function KeySequence({ keys }: { keys: string[] }) {
  const mod = modifierLabel();
  return (
    <span className="flex flex-wrap items-center gap-1">
      {keys.map((k, i) => (
        <span key={`${k}-${i}`} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground text-xs">+</span>}
          <KeyChip>{k === "⌘" ? mod : k}</KeyChip>
        </span>
      ))}
    </span>
  );
}

const scopeLabel: Record<ShortcutScope, string> = {
  global: "Everywhere",
  reviews: "Reviews",
  inbox: "Inbox",
  agents: "BirdAI",
  social: "Social",
  dashboard: "Reports & dashboards",
  ticketing: "Ticketing",
  surveys: "Surveys",
  default: "This view",
};

interface ShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentView: AppView;
}

export function ShortcutsModal({ open, onOpenChange, currentView }: ShortcutsModalProps) {
  const scope = shortcutScopeFromView(currentView);
  const rows = shortcutsForModal(scope);

  let lastSection: ShortcutScope | "global" | null = null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(560px,85vh)] gap-0 overflow-hidden p-0 sm:max-w-lg"
        data-shortcuts-ignore
      >
        <DialogHeader className="border-b border-border px-6 py-4 text-left">
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription className="text-left">
            Press <KeySequence keys={["?"]} /> or <KeySequence keys={["⌘", "K"]} /> anytime to open this
            panel. <span className="text-foreground/80">G</span> then a letter jumps to a main area.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[min(420px,65vh)] overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-2">
            {rows.map((row) => {
              const section = row.scope === "global" ? "global" : row.scope;
              const showHeading = section !== lastSection;
              lastSection = section;
              const heading =
                section === "global"
                  ? scopeLabel.global
                  : scopeLabel[row.scope as ShortcutScope] ?? row.scope;
              return (
                <li key={row.id}>
                  {showHeading && (
                    <p className="text-muted-foreground mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wide first:mt-0">
                      {heading}
                    </p>
                  )}
                  <div className="flex items-start justify-between gap-4 py-1">
                    <span className="text-foreground text-sm">{row.description}</span>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {row.keys.length > 1 && row.id.startsWith("go-") ? (
                        <span className="flex items-center gap-1">
                          <KeyChip>G</KeyChip>
                          <span className="text-muted-foreground text-xs">then</span>
                          <KeyChip>{row.keys[1]}</KeyChip>
                        </span>
                      ) : (
                        <KeySequence keys={row.keys} />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
