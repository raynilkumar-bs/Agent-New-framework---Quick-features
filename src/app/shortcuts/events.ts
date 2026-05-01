/** DOM events so views can react without tight coupling to the shortcuts hook. */

export const REVIEWS_SHORTCUT_EVENT = "birdeye-shortcut:reviews";
export const INBOX_SHORTCUT_EVENT = "birdeye-shortcut:inbox";

export type ReviewsShortcutAction = "focus-search" | "toggle-filters" | "focus-ai-reply";

export type InboxShortcutAction = "focus-compose" | "focus-search";

export function dispatchReviewsShortcut(action: ReviewsShortcutAction) {
  window.dispatchEvent(new CustomEvent(REVIEWS_SHORTCUT_EVENT, { detail: { action } }));
}

export function dispatchInboxShortcut(action: InboxShortcutAction) {
  window.dispatchEvent(new CustomEvent(INBOX_SHORTCUT_EVENT, { detail: { action } }));
}
