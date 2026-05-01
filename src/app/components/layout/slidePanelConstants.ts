/** Shared motion for Myna chat dock and filter pane slide. */
export const SLIDE_MS = 280;
export const SLIDE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

export function closedTransform(side: "left" | "right"): string {
  return side === "right" ? "translateX(100%)" : "translateX(-100%)";
}
