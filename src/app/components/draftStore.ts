/* ─── Draft Store ───
 * Simple localStorage-backed store for saving report drafts.
 * Both AICustomizePanel and SharedByMe import from here.
 */

export interface DraftReport {
  id: string;
  reportName: string;
  savedAt: string;
  updatedAt: string;
  // Customization state
  themeColor: string;
  selectedFont: string;
  fontScale: number;
  selectedLayout: string;
  selectedStyle: string;
  paddingSize: "compact" | "normal" | "spacious";
  textAlign: "left" | "center" | "right";
  showHeader: boolean;
  showFooter: boolean;
  showPageNumbers: boolean;
  headerText: string;
  showCoverPage: boolean;
  coverTitle: string;
  coverSubtitle: string;
  coverDate: string;
  showLogo: boolean;
  showSummaryPage: boolean;
}

const STORAGE_KEY = "birdeye_report_drafts";

let listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeDrafts(fn: () => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function getDrafts(): DraftReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDraft(draft: Omit<DraftReport, "id" | "savedAt" | "updatedAt">, existingId?: string): DraftReport {
  const drafts = getDrafts();
  const now = new Date().toISOString();

  if (existingId) {
    const idx = drafts.findIndex((d) => d.id === existingId);
    if (idx >= 0) {
      drafts[idx] = { ...drafts[idx], ...draft, updatedAt: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
      notify();
      return drafts[idx];
    }
  }

  const newDraft: DraftReport = {
    ...draft,
    id: `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: now,
    updatedAt: now,
  };
  drafts.unshift(newDraft);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  notify();
  return newDraft;
}

export function deleteDraft(id: string) {
  const drafts = getDrafts().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  notify();
}
