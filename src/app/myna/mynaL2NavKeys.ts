import { L2_FLAT_NAV_KEY_PREFIX } from "@/app/components/L2NavLayout";
import type { MynaConversation } from "./mynaMockConversations";

const PLACEHOLDER_EMPTY_KEY = "__myna_ph_empty__";

/**
 * One row per conversation, newest first (same order as `conversations` array).
 * Empty state is a single non-action placeholder row.
 */
export function mynaFlatNavItemsForConversations(
  conversations: MynaConversation[],
): { label: string; key: string }[] {
  if (conversations.length === 0) {
    return [{ label: "No conversations yet", key: PLACEHOLDER_EMPTY_KEY }];
  }
  return conversations.map((c) => ({ label: c.title, key: c.id }));
}

export function conversationById(
  conversations: MynaConversation[],
  id: string,
): MynaConversation | undefined {
  return conversations.find((c) => c.id === id);
}

export function l2KeyFromConversation(conv: MynaConversation): string {
  return `${L2_FLAT_NAV_KEY_PREFIX}/${conv.id}`;
}

const PLACEHOLDER_KEYS = new Set([PLACEHOLDER_EMPTY_KEY, "—"]);

export function isMynaL2PlaceholderKey(id: string): boolean {
  return PLACEHOLDER_KEYS.has(id);
}
