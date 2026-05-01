import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "@/app/components/Dashboard";

const meta: Meta<typeof Dashboard> = {
  title: "App/Views/Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  args: {
    aiPanelOpen: false,
    onAiPanelChange: () => {},
    editingDraft: null,
  },
};

export const WithAIPanel: Story = {
  args: {
    aiPanelOpen: true,
    onAiPanelChange: () => {},
    editingDraft: null,
  },
};
