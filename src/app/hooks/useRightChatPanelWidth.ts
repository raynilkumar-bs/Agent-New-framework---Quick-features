import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "myna-chat-panel-width";

export const PANEL_WIDTH_DEFAULT = 380;
export const PANEL_WIDTH_MIN = 380;
export const PANEL_WIDTH_MAX = 600;

function readStoredWidth(): number {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const n = raw ? Number(raw) : NaN;
    if (!Number.isFinite(n)) return PANEL_WIDTH_DEFAULT;
    return Math.min(PANEL_WIDTH_MAX, Math.max(PANEL_WIDTH_MIN, n));
  } catch {
    return PANEL_WIDTH_DEFAULT;
  }
}

function persistWidth(w: number) {
  try {
    sessionStorage.setItem(STORAGE_KEY, String(Math.round(w)));
  } catch {
    /* ignore */
  }
}

/** Max panel width so main column keeps ~60% (and at least 280px) when possible. */
export function maxPanelWidthForRow(rowWidth: number): number {
  if (rowWidth <= 0) return PANEL_WIDTH_MIN;
  const mainReserved = Math.max(280, rowWidth * 0.6);
  return Math.min(PANEL_WIDTH_MAX, Math.max(0, rowWidth - mainReserved));
}

export function clampPanelWidth(w: number, rowWidth: number): number {
  const maxP = maxPanelWidthForRow(rowWidth);
  if (maxP <= 0) return 0;
  const minP = maxP >= PANEL_WIDTH_MIN ? PANEL_WIDTH_MIN : Math.min(PANEL_WIDTH_MIN, maxP);
  return Math.min(Math.max(w, minP), Math.max(minP, maxP));
}

export function useRightChatPanelWidth(rowWidth: number) {
  const [width, setWidthState] = useState(readStoredWidth);
  const widthRef = useRef(width);
  widthRef.current = width;

  const setWidth = useCallback(
    (next: number | ((prev: number) => number)) => {
      setWidthState((prev) => {
        const raw = typeof next === "function" ? (next as (p: number) => number)(prev) : next;
        const clamped = clampPanelWidth(raw, rowWidth);
        persistWidth(clamped);
        return clamped;
      });
    },
    [rowWidth]
  );

  useEffect(() => {
    setWidthState((prev) => {
      const clamped = clampPanelWidth(prev, rowWidth);
      if (clamped !== prev) persistWidth(clamped);
      return clamped;
    });
  }, [rowWidth]);

  return { width, setWidth, widthRef };
}
