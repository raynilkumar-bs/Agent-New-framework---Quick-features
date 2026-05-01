import type { Meta, StoryObj } from "@storybook/react";
import BusinessOverviewDashboard from "@/app/components/BusinessOverviewDashboard";

const meta: Meta<typeof BusinessOverviewDashboard> = {
  title: "App/Views/BusinessOverviewDashboard",
  component: BusinessOverviewDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BusinessOverviewDashboard>;

export const Default: Story = {};
