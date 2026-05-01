import type { Meta, StoryObj } from "@storybook/react";
import { Message, MessageContent } from "@/app/components/ui/message";

const meta: Meta = {
  title: "UI/Message",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Same pattern as prompt-kit **MessageBasic**; import from `@/app/components/ui/message` in this repo.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  name: "Basic (user + assistant)",
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Message className="justify-end">
        <MessageContent>Hello! How can I help you today?</MessageContent>
      </Message>

      <Message className="justify-start">
        <MessageContent markdown className="bg-transparent p-0">
          I can help with a variety of tasks: answering questions, providing information, assisting with coding,
          generating creative content. What would you like help with today?
        </MessageContent>
      </Message>
    </div>
  ),
};
