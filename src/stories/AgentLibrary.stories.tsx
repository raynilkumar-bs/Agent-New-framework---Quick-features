import type { Meta, StoryObj } from "@storybook/react";
import { AgentLibraryView } from "@/app/components/AgentLibraryView";
import { APP_MAIN_CONTENT_SHELL_CLASS } from "@/app/components/layout/appShellClasses";

const meta: Meta<typeof AgentLibraryView> = {
  title: "App/Views/AgentLibrary",
  component: AgentLibraryView,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AgentLibraryView>;

export const Default: Story = {
  name: "Agent Library — all themes",
  render: () => (
    <div className={APP_MAIN_CONTENT_SHELL_CLASS} style={{ height: "100vh" }}>
      <AgentLibraryView />
    </div>
  ),
};

export const SingleTheme: Story = {
  name: "Agent Library — Reputation only",
  render: () => (
    <div className={APP_MAIN_CONTENT_SHELL_CLASS} style={{ height: "100vh" }}>
      <AgentLibraryView activeTheme="reputation" />
    </div>
  ),
};
