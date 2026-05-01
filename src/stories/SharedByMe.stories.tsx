import type { Meta, StoryObj } from "@storybook/react";
import { SharedByMe } from "@/app/components/SharedByMe";

const meta: Meta<typeof SharedByMe> = {
  title: "App/Views/SharedByMe",
  component: SharedByMe,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SharedByMe>;

export const Default: Story = {
  args: { onViewChange: () => {} },
};
