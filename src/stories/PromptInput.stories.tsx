import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "@/app/components/ui/prompt-input";
import { Button } from "@/app/components/ui/button";
import { ArrowUp, Paperclip, Mic, Square, Send } from "lucide-react";

const meta: Meta = {
  title: "UI/PromptInput",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
      if (value.trim()) {
        alert(`Submitted: ${value}`);
        setValue("");
      }
    };

    return (
      <div className="w-full max-w-lg">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            placeholder="Ask about your reviews, request a report…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <PromptInputActions>
            <div />
            <PromptInputAction
              tooltip="Send"
              onClick={handleSubmit}
              disabled={!value.trim()}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 p-2 disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Press Enter to send, Shift+Enter for new line.
        </p>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-full max-w-lg">
        <PromptInput>
          <PromptInputTextarea
            placeholder="Message Birdeye AI — ask anything about your reputation…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <PromptInputActions>
            <div className="flex items-center gap-1">
              <PromptInputAction tooltip="Attach file">
                <Paperclip className="size-4" />
              </PromptInputAction>
              <PromptInputAction tooltip="Voice input">
                <Mic className="size-4" />
              </PromptInputAction>
            </div>
            <PromptInputAction
              tooltip="Send message"
              disabled={!value.trim()}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 p-2 disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className="w-full max-w-lg space-y-4">
        <PromptInput isLoading={isLoading}>
          <PromptInputTextarea
            placeholder="Generating your review summary…"
            value="Summarize all 1-star reviews from the past 30 days"
            readOnly
          />
          <PromptInputActions>
            <div className="flex items-center gap-2 px-1">
              <span className="text-xs text-muted-foreground animate-pulse">
                Generating…
              </span>
            </div>
            <PromptInputAction
              tooltip="Stop generation"
              onClick={() => setIsLoading(false)}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 p-2"
            >
              <Square className="size-3 fill-current" />
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsLoading((v) => !v)}
        >
          Toggle Loading: {isLoading ? "On" : "Off"}
        </Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <PromptInput disabled>
        <PromptInputTextarea
          placeholder="AI responses are disabled on your current plan."
          disabled
        />
        <PromptInputActions>
          <div />
          <PromptInputAction
            tooltip="Send"
            disabled
            className="rounded-full bg-primary text-primary-foreground p-2 opacity-40 cursor-not-allowed"
          >
            <ArrowUp className="size-4" />
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
      <p className="mt-2 text-xs text-muted-foreground text-center">
        Upgrade your plan to enable AI-powered responses.
      </p>
    </div>
  ),
};
