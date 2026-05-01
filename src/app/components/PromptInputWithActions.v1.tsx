"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ArrowUp, Mic, Paperclip, Plus, Square, X } from "lucide-react";
import {
  PROMPT_INPUT_PRIMARY_ICON_SEND_CLASSNAME,
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/app/components/ui/prompt-input";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export function PromptInputWithActions() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!input.trim() && files.length === 0) return;
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      setInput("");
      setFiles([]);
      if (uploadInputRef.current) uploadInputRef.current.value = "";
    }, 2000);
  };

  const handleStop = () => {
    setIsLoading(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files;
    if (!list?.length) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
    event.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef.current) uploadInputRef.current.value = "";
  };

  return (
    <PromptInput
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl"
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
        <div className="flex flex-wrap gap-2 px-4 pt-3 pb-0" onClick={(e) => e.stopPropagation()}>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="bg-secondary flex max-w-full items-center gap-2 rounded-lg px-4 py-2 text-sm"
            >
              <Paperclip className="size-4 shrink-0 opacity-70" aria-hidden />
              <span className="max-w-[120px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="hover:bg-secondary/50 rounded-full p-1"
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <PromptInputTextarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything"
      />

      <PromptInputActions className="items-center justify-between gap-2 pt-2">
        <PromptInputAction
          tooltip="Attach files"
          aria-label="Attach files"
          onClick={() => uploadInputRef.current?.click()}
        >
          <Plus className="size-4" />
        </PromptInputAction>

        <div className="flex shrink-0 items-center gap-1">
          <PromptInputAction
            tooltip="Voice input"
            aria-label="Voice input (not available)"
            disabled
            className="opacity-40"
          >
            <Mic className="size-4" />
          </PromptInputAction>
          <Button
            type="button"
            variant="default"
            size="icon"
            title={isLoading ? "Stop generation" : "Send message"}
            aria-label={isLoading ? "Stop generation" : "Send message"}
            disabled={!isLoading && !input.trim() && files.length === 0}
            className={cn(PROMPT_INPUT_PRIMARY_ICON_SEND_CLASSNAME, "[&_svg]:size-4")}
            onClick={isLoading ? handleStop : handleSubmit}
          >
            {isLoading ? (
              <Square className="size-4 fill-current" />
            ) : (
              <ArrowUp className="size-4" />
            )}
          </Button>
        </div>
      </PromptInputActions>
    </PromptInput>
  );
}
