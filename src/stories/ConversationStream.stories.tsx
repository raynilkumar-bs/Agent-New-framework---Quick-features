import type { Meta, StoryObj } from "@storybook/react";
import { ConversationStream } from "@/app/components/ConversationStream";

const meta: Meta<typeof ConversationStream> = {
  title: "App/Views/ConversationStream",
  component: ConversationStream,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Call recording transcript viewer with simulated audio playback. " +
          "Features play/pause, 15-second skip forward, variable speed (1×/2.5×/3×), " +
          "multi-language translation (English/French/Spanish), and a Create Ticket sheet. " +
          "Dummy transcript: customer support resolving a shoe size dispute (ordered 9, received 8).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConversationStream>;

export const Default: Story = {};
