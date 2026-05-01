"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, SendHorizontal } from "lucide-react";
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/app/components/ui/prompt-input";
import { MYNA_CHAT_HEADER_TITLE } from "@/app/myna/mynaChatChrome";

export interface MynaNewChatOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  screenTitle: string;
  onSubmitFirstMessage: (text: string) => void;
}

/** Centered composer (ChatGPT-style). z-index above app shell; `data-no-print` for printouts. */
export function MynaNewChatOverlay({
  open,
  onOpenChange,
  screenTitle,
  onSubmitFirstMessage,
}: MynaNewChatOverlayProps) {
  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) {
      setDraft("");
      return;
    }
    const t = requestAnimationFrame(() => textareaRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const submit = () => {
    const t = draft.trim();
    if (!t) return;
    onSubmitFirstMessage(t);
    onOpenChange(false);
    setDraft("");
  };

  if (!open) return null;

  const tree = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      data-no-print
      data-myna-new-chat-overlay
    >
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-black/50 dark:bg-black/60"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="myna-new-chat-title"
        className="relative z-[101] w-full max-w-xl rounded-xl border border-[#e5e9f0] bg-white p-6 shadow-xl dark:border-[#333a47] dark:bg-[#1a1d24]"
        data-shortcuts-ignore
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="myna-new-chat-title" className="text-[16px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 500 }}>
              {MYNA_CHAT_HEADER_TITLE}
            </h2>
            <p className="mt-2 text-[13px] text-[#555] dark:text-[#8b92a5]">
              Context: <span className="text-[#212121] dark:text-[#e4e4e4]">{screenTitle}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg p-2 text-[#555] hover:bg-[#f0f1f5] dark:text-[#8b92a5] dark:hover:bg-[#2e3340]"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <PromptInput onSubmit={submit} className="rounded-xl">
          <PromptInputTextarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask anything…"
            className="min-h-[120px] text-[15px]"
          />
          <PromptInputActions className="justify-end p-2">
            <button
              type="button"
              onClick={submit}
              className="inline-flex size-10 items-center justify-center rounded-lg bg-[#2552ED] text-white hover:opacity-90"
              aria-label="Start chat"
            >
              <SendHorizontal className="size-4" />
            </button>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(tree, document.body) : null;
}
