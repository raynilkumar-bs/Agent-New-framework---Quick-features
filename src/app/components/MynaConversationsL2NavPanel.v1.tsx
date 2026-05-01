"use client";

import { L2_FLAT_NAV_KEY_PREFIX, L2NavLayout } from "@/app/components/L2NavLayout";
import {
  conversationById,
  isMynaL2PlaceholderKey,
  mynaFlatNavItemsForConversations,
} from "@/app/myna/mynaL2NavKeys";
import type { MynaConversation } from "@/app/myna/mynaMockConversations";

export interface MynaConversationsL2NavPanelProps {
  conversations: MynaConversation[];
  activeItem: string;
  onSelectConversation: (conversationId: string) => void;
  onCreateNewChat: () => void;
}

export function MynaConversationsL2NavPanel({
  conversations,
  activeItem,
  onSelectConversation,
  onCreateNewChat,
}: MynaConversationsL2NavPanelProps) {
  /** Omit empty threads so “New chat” only appears once (header action), not per draft row. */
  const conversationsWithHistory = conversations.filter((c) => c.messages.length > 0);
  const flatNavItems = mynaFlatNavItemsForConversations(conversationsWithHistory);

  return (
    <L2NavLayout
      data-no-print
      headerAction={{ label: "New chat", onClick: onCreateNewChat }}
      flatNavItems={flatNavItems}
      sections={[]}
      activeItem={activeItem}
      onActiveItemChange={(key) => {
        const prefix = `${L2_FLAT_NAV_KEY_PREFIX}/`;
        if (!key.startsWith(prefix)) return;
        const itemKey = key.slice(prefix.length);
        if (isMynaL2PlaceholderKey(itemKey)) return;
        const conv = conversationById(conversationsWithHistory, itemKey);
        if (conv) onSelectConversation(conv.id);
      }}
    />
  );
}
