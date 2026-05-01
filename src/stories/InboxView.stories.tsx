import type { Meta, StoryObj } from "@storybook/react";
import { InboxView } from "@/app/components/InboxView";

const meta: Meta<typeof InboxView> = {
  title: "App/Views/InboxView",
  component: InboxView,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof InboxView>;

export const Default: Story = {};
