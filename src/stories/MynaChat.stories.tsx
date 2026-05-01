import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MynaChatPanel } from "@/app/components/MynaChatPanel";
import { MynaConversationsL2NavPanel } from "@/app/components/MynaConversationsL2NavPanel";
import { MynaNewChatOverlay } from "@/app/components/MynaNewChatOverlay";
import { L2NavLayout } from "@/app/components/L2NavLayout";
import { l2KeyFromConversation } from "@/app/myna/mynaL2NavKeys";
import { MYNA_SEED_CONVERSATIONS } from "@/app/myna/mynaMockConversations";

const meta = {
  title: "Design System / BirdAI",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "BirdAI chat surfaces. Spacing follows the **8px + 4px dense** grid; see **Design System → Tokens → Spacing**.",
      },
    },
  },
} satisfies Meta;

export default meta;

export const ChatPanelExpandedEmpty: StoryObj = {
  name: "Chat panel (expanded — ChatGPT-style home)",
  parameters: { layout: "fullscreen" },
  render: function Render() {
    return (
      <div className="flex h-[min(720px,100vh)] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-[#e5e9f0] bg-[#f7f7f8] shadow-sm dark:border-[#333a47] dark:bg-[#212121]">
        <MynaChatPanel
          messages={[]}
          onSend={() => {}}
          onClose={() => {}}
          expanded
          onToggleExpand={() => {}}
          conversations={MYNA_SEED_CONVERSATIONS}
          activeConversationId={MYNA_SEED_CONVERSATIONS[0]?.id ?? ""}
          onSelectConversation={() => {}}
          onOpenNewChat={() => {}}
        />
      </div>
    );
  },
};

export const ChatPanelDocked: StoryObj = {
  name: "Chat panel (docked width)",
  render: function Render() {
    const [id, setId] = useState(MYNA_SEED_CONVERSATIONS[0].id);
    const conv = MYNA_SEED_CONVERSATIONS.find((c) => c.id === id) ?? MYNA_SEED_CONVERSATIONS[0];
    return (
      <div className="flex h-[640px] w-[400px] flex-col overflow-hidden rounded-lg border border-[#e5e9f0] bg-white shadow-sm dark:border-[#333a47] dark:bg-[#1a1d24]">
        <MynaChatPanel
          messages={conv.messages}
          onSend={() => {}}
          onClose={() => {}}
          expanded={false}
          onToggleExpand={() => {}}
          conversations={MYNA_SEED_CONVERSATIONS}
          activeConversationId={id}
          onSelectConversation={setId}
          onOpenNewChat={() => {}}
        />
      </div>
    );
  },
};

export const ConversationsL2Nav: StoryObj = {
  name: "Conversations L2 nav",
  render: function Render() {
    const [id, setId] = useState(MYNA_SEED_CONVERSATIONS[0].id);
    const conv = MYNA_SEED_CONVERSATIONS.find((c) => c.id === id) ?? MYNA_SEED_CONVERSATIONS[0];
    const activeItem = l2KeyFromConversation(conv);
    return (
      <div className="flex h-[520px] rounded-lg border border-[#e5e9f0] bg-[#e0e5eb] dark:border-[#333a47] dark:bg-[#13161b]">
        <MynaConversationsL2NavPanel
          conversations={MYNA_SEED_CONVERSATIONS}
          activeItem={activeItem}
          onSelectConversation={setId}
          onCreateNewChat={() => {}}
        />
      </div>
    );
  },
};

export const NewChatOverlay: StoryObj = {
  name: "New chat overlay",
  parameters: { layout: "fullscreen" },
  render: function Render() {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-[480px] bg-[#e0e5eb] dark:bg-[#13161b]">
        <p className="p-4 text-[13px] text-[#555] dark:text-[#8b92a5]">
          Overlay uses <code className="text-[12px]">fixed</code> positioning (z-index 100). Close with the button or Escape.
        </p>
        <button
          type="button"
          className="ml-4 rounded-lg border border-[#e5e9f0] px-4 py-2 text-[13px] dark:border-[#333a47]"
          onClick={() => setOpen(true)}
        >
          Open overlay
        </button>
        <MynaNewChatOverlay
          open={open}
          onOpenChange={setOpen}
          screenTitle="BirdAI"
          onSubmitFirstMessage={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const L2NavLayoutHeaderActionClickable: StoryObj = {
  name: "L2 nav — header action onClick",
  render: function Render() {
    const [log, setLog] = useState<string>("");
    return (
      <div className="flex flex-col gap-4">
        <div className="h-[360px] w-[220px] overflow-hidden rounded-tl-lg">
          <L2NavLayout
            headerAction={{
              label: "Create item",
              onClick: () => setLog("headerAction clicked"),
            }}
            sections={[
              { label: "Actions", children: ["One", "Two"] },
              { label: "More", children: ["Three"] },
            ]}
          />
        </div>
        <p className="max-w-[220px] text-[13px] text-[#555] dark:text-[#8b92a5]" data-testid="l2-header-log">
          {log || "Click the header row to verify onClick."}
        </p>
      </div>
    );
  },
};
