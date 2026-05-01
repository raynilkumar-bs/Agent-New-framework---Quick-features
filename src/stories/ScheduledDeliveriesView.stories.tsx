import type { Meta, StoryObj } from "@storybook/react";
import { ScheduledDeliveriesView } from "@/app/components/ScheduledDeliveriesView";

const meta: Meta<typeof ScheduledDeliveriesView> = {
  title: "App/Views/ScheduledDeliveriesView",
  component: ScheduledDeliveriesView,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ScheduledDeliveriesView>;

export const Default: Story = {
  args: { onViewChange: () => {} },
};
