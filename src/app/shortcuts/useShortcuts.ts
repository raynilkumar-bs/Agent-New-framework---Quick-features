import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { AppView } from "@/app/App";
import {
  dispatchInboxShortcut,
  dispatchReviewsShortcut,
} from "./events";
import { shortcutScopeFromView } from "./shortcuts";

const G_CHORD_MS = 900;

function isTypingTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return el.closest("[data-shortcuts-ignore]") != null;
}

const goChordMap: Record<string, AppView> = {
  t: "ticketing",
  v: "reviews",
  m: "agents-monitor",
  p: "shared-by-me",
  o: "business-overview",
};

export interface UseShortcutsOptions {
  currentView: AppView;
  onNavigate: (view: AppView, agentSlug?: string) => void;
  mynaChatOpen: boolean;
  onMynaChatOpenChange: (open: boolean) => void;
  aiPanelOpen?: boolean;
  /** When true, Escape closes this overlay before closing the Myna panel. */
  mynaNewChatOverlayOpen?: boolean;
  onMynaNewChatOverlayOpenChange?: (open: boolean) => void;
}

export function useShortcuts({
  currentView,
  onNavigate,
  mynaChatOpen,
  onMynaChatOpenChange,
  aiPanelOpen = false,
  mynaNewChatOverlayOpen = false,
  onMynaNewChatOverlayOpenChange,
}: UseShortcutsOptions) {
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const gChordRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingGRef = useRef(false);
  const modalOpenRef = useRef(shortcutsModalOpen);

  modalOpenRef.current = shortcutsModalOpen;

  const clearGChord = useCallback(() => {
    pendingGRef.current = false;
    if (gChordRef.current) {
      clearTimeout(gChordRef.current);
      gChordRef.current = null;
    }
  }, []);

  const startGChord = useCallback(() => {
    clearGChord();
    pendingGRef.current = true;
    gChordRef.current = setTimeout(() => {
      pendingGRef.current = false;
      gChordRef.current = null;
    }, G_CHORD_MS);
  }, [clearGChord]);

  useEffect(() => {
    if (shortcutsModalOpen) clearGChord();
  }, [shortcutsModalOpen, clearGChord]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = isTypingTarget(target);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShortcutsModalOpen((o) => !o);
        return;
      }

      if (modalOpenRef.current) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShortcutsModalOpen(false);
        }
        return;
      }

      if (e.key === "Escape") {
        if (mynaNewChatOverlayOpen) {
          e.preventDefault();
          onMynaNewChatOverlayOpenChange?.(false);
          return;
        }
        if (mynaChatOpen) {
          e.preventDefault();
          onMynaChatOpenChange(false);
        }
        return;
      }

      if (typing && !(e.metaKey || e.ctrlKey)) {
        return;
      }

      if (!typing && (e.key === "?" || (e.shiftKey && e.key === "/"))) {
        e.preventDefault();
        setShortcutsModalOpen(true);
        return;
      }

      if (aiPanelOpen) {
        clearGChord();
        return;
      }

      if (pendingGRef.current) {
        const k = e.key.toLowerCase();
        const next = goChordMap[k];
        clearGChord();
        if (next) {
          e.preventDefault();
          onNavigate(next);
        }
        return;
      }

      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === "g") {
        e.preventDefault();
        startGChord();
        return;
      }

      if (typing) return;

      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
      const scope = shortcutScopeFromView(currentView);

      if (scope === "reviews") {
        if (k === "/") {
          e.preventDefault();
          dispatchReviewsShortcut("focus-search");
          return;
        }
        if (k === "f") {
          e.preventDefault();
          dispatchReviewsShortcut("toggle-filters");
          return;
        }
        if (k === "c") {
          e.preventDefault();
          dispatchReviewsShortcut("focus-ai-reply");
          return;
        }
      }

      if (scope === "inbox") {
        if (k === "c") {
          e.preventDefault();
          dispatchInboxShortcut("focus-compose");
          return;
        }
        if (k === "r") {
          e.preventDefault();
          dispatchInboxShortcut("focus-search");
          return;
        }
      }

      if (scope === "agents") {
        if (k === "b") {
          e.preventDefault();
          onNavigate("agents-builder");
          return;
        }
        if (k === "h") {
          e.preventDefault();
          onNavigate("agents-monitor");
          return;
        }
      }

      if (scope === "social" && k === "n") {
        e.preventDefault();
        toast.message("New post", { description: "Shortcut reserved; UI not wired yet." });
        return;
      }

      if (scope === "dashboard" && k === "r") {
        e.preventDefault();
        toast.message("Refresh reports", { description: "Shortcut reserved; UI not wired yet." });
        return;
      }

      if (scope === "ticketing" && k === "n") {
        e.preventDefault();
        toast.message("New ticket", { description: "Shortcut reserved; UI not wired yet." });
        return;
      }

      if (scope === "surveys" && k === "n") {
        e.preventDefault();
        toast.message("New survey", { description: "Shortcut reserved; UI not wired yet." });
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearGChord();
    };
  }, [
    aiPanelOpen,
    clearGChord,
    currentView,
    mynaChatOpen,
    mynaNewChatOverlayOpen,
    onMynaChatOpenChange,
    onMynaNewChatOverlayOpenChange,
    onNavigate,
    startGChord,
  ]);

  return { shortcutsModalOpen, setShortcutsModalOpen };
}
