"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, History, Maximize2, Mic, Paperclip, Plus, Square, X } from "lucide-react";
import {
  ChatContainerContent,
  ChatContainerRoot,
  ChatContainerScrollAnchor,
} from "@/app/components/ui/chat-container";
import { Message, MessageContent } from "@/app/components/ui/message";
import {
  PROMPT_INPUT_PRIMARY_ICON_SEND_CLASSNAME,
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/app/components/ui/prompt-input";
import { Button } from "@/app/components/ui/button";
import { PromptSuggestion } from "@/app/components/ui/prompt-suggestion";
import { ScrollButton } from "@/app/components/ui/scroll-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { cn } from "@/lib/utils";
import type { MynaChatMessage, MynaConversation } from "@/app/myna/mynaMockConversations";
import {
  MYNA_CHAT_HEADER_TITLE,
  MYNA_EXPANDED_EMPTY_HEADLINE,
} from "@/app/myna/mynaChatChrome";

export interface MynaChatPanelProps {
  messages: MynaChatMessage[];
  onSend: (text: string) => void;
  onClose: () => void;
  expanded: boolean;
  onToggleExpand: () => void;
  conversations: MynaConversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onOpenNewChat: () => void;
  /** Incremented when starting a new chat so the bottom composer is focused (ChatGPT-style). */
  composerFocusNonce?: number;
}

export function MynaChatPanel({
  messages,
  onSend,
  onClose,
  expanded,
  onToggleExpand,
  conversations,
  activeConversationId,
  onSelectConversation,
  onOpenNewChat,
  composerFocusNonce = 0,
}: MynaChatPanelProps) {
  const [draft, setDraft] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const sendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const expandedEmpty = expanded && messages.length === 0;
  const expandedThread = expanded && messages.length > 0;

  useEffect(() => {
    if (composerFocusNonce < 1) return;
    const id = requestAnimationFrame(() => composerRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [composerFocusNonce]);

  useEffect(
    () => () => {
      if (sendingTimeoutRef.current) clearTimeout(sendingTimeoutRef.current);
    },
    [],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files;
    if (!list?.length) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
    event.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef.current) uploadInputRef.current.value = "";
  };

  const stopSending = () => {
    if (sendingTimeoutRef.current) {
      clearTimeout(sendingTimeoutRef.current);
      sendingTimeoutRef.current = null;
    }
    setIsSending(false);
  };

  const send = () => {
    if (isSending) return;
    const t = draft.trim();
    const hasFiles = files.length > 0;
    if (!t && !hasFiles) return;
    const message =
      t || (hasFiles ? `Attached: ${files.map((f) => f.name).join(", ")}` : "");
    onSend(message);
    setDraft("");
    setFiles([]);
    if (uploadInputRef.current) uploadInputRef.current.value = "";
    setIsSending(true);
    sendingTimeoutRef.current = window.setTimeout(() => {
      setIsSending(false);
      sendingTimeoutRef.current = null;
    }, 600);
  };

  const headerIconBtnTone = expanded
    ? "text-[#6b6b6b] hover:bg-black/[0.06] dark:text-[#a8a8a8] dark:hover:bg-white/[0.08]"
    : "text-[#555] hover:bg-[#f0f1f5] dark:text-[#8b92a5] dark:hover:bg-[#2e3340]";

  const renderComposer = (variant: "docked" | "expanded") => {
    const expandedShell = variant === "expanded";
    return (
      <PromptInput
        onSubmit={send}
        isLoading={isSending}
        className={cn(
          expandedShell &&
            "rounded-3xl border-0 bg-[#ececec] shadow-none dark:bg-[#2f2f2f] dark:focus-within:border-transparent dark:focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.12)] focus-within:border-transparent focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.08)] hover:border-transparent dark:hover:border-transparent",
          !expandedShell && "rounded-lg",
        )}
      >
        <input
          ref={uploadInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          aria-hidden
        />
        {files.length > 0 ? (
          <div
            className={cn(
              "flex flex-wrap gap-2 border-b px-4 py-2",
              expandedShell
                ? "border-black/[0.06] dark:border-white/[0.08]"
                : "border-[#e5e9f0] dark:border-[#333a47]",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className={cn(
                  "flex max-w-full items-center gap-2 rounded-lg px-4 py-2 text-[13px]",
                  expandedShell
                    ? "bg-white/80 text-[#0d0d0d] dark:bg-black/20 dark:text-[#e4e4e4]"
                    : "bg-[#f0f1f5] text-[#212121] dark:bg-[#2e3340] dark:text-[#e4e4e4]",
                )}
              >
                <Paperclip className="size-4 shrink-0 text-[#555] dark:text-[#8b92a5]" aria-hidden />
                <span className="max-w-[140px] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="rounded-full p-1 text-[#555] hover:bg-[#e4e6ea] dark:text-[#8b92a5] dark:hover:bg-[#333a47]"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <PromptInputTextarea
          ref={composerRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={expandedShell ? "Ask anything" : "Ask Myna anything…"}
          className={cn(
            "text-[13px]",
            expandedShell && "text-[15px] leading-6 placeholder:text-[#71717a] dark:placeholder:text-[#8e8e8e]",
          )}
        />
        <PromptInputActions className={cn("pt-2", expandedShell && "pb-2")}>
          <PromptInputAction
            tooltip="Attach files"
            aria-label="Attach files"
            onClick={() => uploadInputRef.current?.click()}
            className={expandedShell ? "text-[#6b6b6b] dark:text-[#b4b4b4]" : undefined}
          >
            {expandedShell ? (
              <Plus className="size-4" />
            ) : (
              <Paperclip className="size-4" />
            )}
          </PromptInputAction>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
            {expandedShell ? (
              <PromptInputAction
                tooltip="Voice input"
                aria-label="Voice input (not available)"
                disabled
                className="opacity-40"
              >
                <Mic className="size-4" />
              </PromptInputAction>
            ) : null}
            <Button
              type="button"
              variant="default"
              size="icon"
              title={isSending ? "Stop" : "Send message"}
              aria-label={isSending ? "Stop" : "Send message"}
              disabled={!isSending && !draft.trim() && files.length === 0}
              className={cn(PROMPT_INPUT_PRIMARY_ICON_SEND_CLASSNAME, "[&_svg]:size-4")}
              onClick={isSending ? stopSending : send}
            >
              {isSending ? <Square className="size-4 fill-current" /> : <ArrowUp className="size-4" />}
            </Button>
          </div>
        </PromptInputActions>
      </PromptInput>
    );
  };

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col",
        expanded && "bg-[#f7f7f8] dark:bg-[#212121]",
      )}
    >
      <div className="flex shrink-0 flex-col">
        <div
          className={cn(
            "flex items-center px-4 py-2",
            expanded ? "justify-end" : "justify-between",
          )}
        >
          {!expanded ? (
            <div className="flex min-w-0 items-center gap-1">
              <p
                className="truncate text-[14px] text-[#212121] dark:text-[#e4e4e4]"
                style={{ fontWeight: 500 }}
              >
                {MYNA_CHAT_HEADER_TITLE}
              </p>
            </div>
          ) : null}
          <div className="flex shrink-0 items-center gap-0">
            {!expanded ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onOpenNewChat}
                  className={cn("rounded-lg transition-colors", headerIconBtnTone)}
                  aria-label="New chat"
                >
                  <Plus className="size-4" />
                </Button>
                <Popover open={historyOpen} onOpenChange={setHistoryOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={cn("rounded-lg transition-colors", headerIconBtnTone)}
                      aria-label="Chat history"
                      aria-expanded={historyOpen}
                      aria-haspopup="dialog"
                    >
                      <History className="size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    side="bottom"
                    sideOffset={8}
                    className="z-[60] w-72 max-w-[min(18rem,calc(100vw-2rem))] border-0 bg-white p-0 shadow-sm outline-none dark:bg-[#1a1d24]"
                  >
                    <div className="px-4 pt-3 pb-2">
                      <p
                        className="text-[14px] text-[#212121] dark:text-[#e4e4e4]"
                        style={{ fontWeight: 500 }}
                      >
                        History
                      </p>
                    </div>
                    <div className="flex max-h-[min(16rem,40vh)] flex-col gap-2 overflow-y-auto px-4 pb-4 pt-0">
                      {conversations.length === 0 ? (
                        <p className="text-[12px] leading-4 text-[#555] dark:text-[#8b92a5]">
                          No conversations yet.
                        </p>
                      ) : (
                        conversations.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              onSelectConversation(c.id);
                              setHistoryOpen(false);
                            }}
                            className={cn(
                              "w-full min-w-0 rounded-lg px-2 py-2 text-left text-[12px] leading-4 transition-colors",
                              c.id === activeConversationId
                                ? "bg-[#eef2ff] text-[#212121] dark:bg-[#1e2d5e] dark:text-[#e4e4e4]"
                                : "text-[#212121] hover:bg-[#f0f1f5] dark:text-[#e4e4e4] dark:hover:bg-[#2e3340]",
                            )}
                          >
                            <span className="line-clamp-2 break-words">{c.title}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onToggleExpand}
                  className={cn("rounded-lg transition-colors", headerIconBtnTone)}
                  aria-label="Expand chat workspace"
                >
                  <Maximize2 className="size-4" />
                </Button>
              </>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={cn("rounded-lg transition-colors", headerIconBtnTone)}
              aria-label="Close chat"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {expandedEmpty ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-16 pt-4">
          <h1 className="mb-8 max-w-xl text-center text-2xl font-normal leading-8 tracking-tight text-[#0d0d0d] dark:text-white sm:text-[32px] sm:leading-10">
            {MYNA_EXPANDED_EMPTY_HEADLINE}
          </h1>
          <div className="w-full max-w-3xl">{renderComposer("expanded")}</div>
        </div>
      ) : (
        <>
          <ChatContainerRoot className="relative min-h-0 flex-1">
            <ChatContainerContent
              className={cn(
                "gap-4 px-4 pb-4 pt-2",
                expandedThread && "mx-auto w-full max-w-3xl",
              )}
            >
              {messages.length === 0 ? (
                <p className="text-[13px] text-[#555] dark:text-[#8b92a5]">No messages yet.</p>
              ) : (
                messages.map((msg) =>
                  msg.role === "assistant" ? (
                    <Message key={msg.id} className="justify-start">
                      <MessageContent markdown className="bg-transparent p-0">
                        {msg.text}
                      </MessageContent>
                    </Message>
                  ) : (
                    <Message key={msg.id} className="justify-end">
                      <MessageContent
                        className={cn(
                          expandedThread &&
                            "border-0 bg-[#ececec] dark:bg-[#2f2f2f]",
                        )}
                      >
                        {msg.text}
                      </MessageContent>
                    </Message>
                  ),
                )
              )}
              <ChatContainerScrollAnchor />
            </ChatContainerContent>
            <div className="pointer-events-none absolute bottom-24 left-1/2 z-10 -translate-x-1/2">
              <ScrollButton type="button" className="pointer-events-auto shadow-md" />
            </div>
          </ChatContainerRoot>

          <div
            className={cn(
              "min-w-0 shrink-0 px-4 pt-2 pb-4",
              expandedThread && "w-full bg-[#f7f7f8] dark:bg-[#212121]",
            )}
          >
            {!expanded && messages.length === 0 ? (
              <div className="mb-2 flex flex-wrap gap-2">
                {["Summarize last week", "Draft a report email", "Explain this view"].map((label) => (
                  <PromptSuggestion
                    key={label}
                    variant="outline"
                    size="sm"
                    className="rounded-lg text-[12px]"
                    type="button"
                    onClick={() => setDraft(label)}
                  >
                    {label}
                  </PromptSuggestion>
                ))}
              </div>
            ) : null}
            <div className={expandedThread ? "mx-auto w-full max-w-3xl" : undefined}>
              {renderComposer(expandedThread ? "expanded" : "docked")}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
