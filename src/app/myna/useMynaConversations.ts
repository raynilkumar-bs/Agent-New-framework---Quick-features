import { useCallback, useEffect, useMemo, useState } from "react";
import {
  mockAssistantReply,
  MYNA_SEED_CONVERSATIONS,
  type MynaChatMessage,
  type MynaConversation,
} from "./mynaMockConversations";

const STORAGE_KEY = "myna-mock-chats-v2";

function cloneSeeds(): MynaConversation[] {
  return MYNA_SEED_CONVERSATIONS.map((c) => ({
    ...c,
    messages: c.messages.map((m) => ({ ...m })),
  }));
}

function loadStored(): MynaConversation[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MynaConversation[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveStored(conversations: MynaConversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    /* ignore quota */
  }
}

/** Pass `getAppViewTitle(currentView)` from the shell so this hook does not import `App` (avoids circular deps). */
export function useMynaConversations(screenTitle: string) {

  const [conversations, setConversations] = useState<MynaConversation[]>(() => {
    if (typeof window === "undefined") return cloneSeeds();
    return loadStored() ?? cloneSeeds();
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(
    () => MYNA_SEED_CONVERSATIONS[0]?.id ?? "",
  );

  useEffect(() => {
    saveStored(conversations);
  }, [conversations]);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId),
    [conversations, activeConversationId],
  );

  const ensureActiveConversation = useCallback(() => {
    if (!conversations.some((c) => c.id === activeConversationId) && conversations[0]) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  useEffect(() => {
    ensureActiveConversation();
  }, [ensureActiveConversation]);

  const setMessagesForActive = useCallback(
    (updater: (prev: MynaChatMessage[]) => MynaChatMessage[]) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId ? { ...c, messages: updater(c.messages) } : c,
        ),
      );
    },
    [activeConversationId],
  );

  const appendUserAndAssistant = useCallback(
    (userText: string) => {
      const uid = `u-${Date.now()}`;
      const aid = `a-${Date.now()}`;
      setMessagesForActive((m) => [
        ...m,
        { id: uid, role: "user", text: userText },
        { id: aid, role: "assistant", text: mockAssistantReply(screenTitle) },
      ]);
    },
    [setMessagesForActive, screenTitle],
  );

  const createConversationWithFirstMessage = useCallback(
    (firstUserMessage: string) => {
      const id = `myna-new-${Date.now()}`;
      const title =
        firstUserMessage.length > 42 ? `${firstUserMessage.slice(0, 40)}…` : firstUserMessage || "New chat";
      const next: MynaConversation = {
        id,
        title,
        conversationType: "general",
        screenLabel: screenTitle,
        messages: [
          { id: `u-${id}`, role: "user", text: firstUserMessage },
          {
            id: `a-${id}`,
            role: "assistant",
            text: mockAssistantReply(screenTitle),
          },
        ],
      };
      setConversations((c) => [next, ...c]);
      setActiveConversationId(id);
    },
    [screenTitle],
  );

  const createEmptyConversation = useCallback(() => {
    const id = `myna-new-${Date.now()}`;
    const next: MynaConversation = {
      id,
      title: "New chat",
      conversationType: "general",
      screenLabel: screenTitle,
      messages: [],
    };
    setConversations((c) => {
      const withoutStaleEmpty = c.filter((x) => x.messages.length > 0);
      return [next, ...withoutStaleEmpty];
    });
    setActiveConversationId(id);
  }, [screenTitle]);

  return {
    conversations,
    setConversations,
    activeConversationId,
    setActiveConversationId,
    activeConversation,
    screenTitle,
    setMessagesForActive,
    appendUserAndAssistant,
    createConversationWithFirstMessage,
    createEmptyConversation,
  };
}
