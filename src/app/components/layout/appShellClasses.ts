/**
 * App shell chrome — shared by `App.tsx` and App Shell stories so corners stay consistent.
 * L2 column: top-left 8px — `PANEL` in `L2NavLayout.tsx` (`rounded-tl-lg`).
 * Top bar: top-right 8px — `TopBar.tsx` (`rounded-tr-lg`).
 * Main canvas: white fill, top-right 8px (`rounded-tr-lg`) via overflow clip.
 */
export const APP_MAIN_CONTENT_SHELL_CLASS =
  "flex-1 flex flex-col min-w-0 overflow-hidden rounded-tr-lg bg-white dark:bg-[#1e2229]";

/** Gutter surface used as a wrapper in scorecard / report stories. */
export const APP_SHELL_GUTTER_SURFACE_CLASS =
  "bg-[#e0e5eb] dark:bg-[#13161b]";

/** Below-top-bar card shell used in full-bleed panel stories. */
export const APP_SHELL_BELOW_TOPBAR_CARD_CLASS =
  "flex-1 flex min-h-0 overflow-hidden rounded-lg bg-white dark:bg-[#1e2229]";

/** L1 rail + TopBar surface — matches the outer gutter colour. */
export const APP_SHELL_RAIL_SURFACE_CLASS =
  "bg-[#e0e5eb] dark:bg-[#181b22]";
