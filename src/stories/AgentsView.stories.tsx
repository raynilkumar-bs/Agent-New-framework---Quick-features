import type { Meta, StoryObj } from "@storybook/react";
import { AgentsMonitorView } from "@/app/components/AgentsMonitorView";
import { AgentsBuilderView } from "@/app/components/AgentsBuilderView";
import { APP_MAIN_CONTENT_SHELL_CLASS } from "@/app/components/layout/appShellClasses";
import { MonitorNotificationsProvider } from "@/app/context/MonitorNotificationsContext";

const viewMeta: Meta = {
  title: "App/Views/Agents",
  parameters: { layout: "fullscreen" },
};

export default viewMeta;
type Story = StoryObj;

function MonitorShell() {
  return (
    <MonitorNotificationsProvider onNavigateToMonitor={() => {}}>
      <div className="h-screen flex flex-col min-h-0 overflow-hidden bg-[#e0e5eb] dark:bg-[#13161b] transition-colors duration-300">
        <div className={APP_MAIN_CONTENT_SHELL_CLASS}>
          <AgentsMonitorView onBack={() => {}} />
        </div>
      </div>
    </MonitorNotificationsProvider>
  );
}

export const AgentsMonitor: Story = {
  render: () => <MonitorShell />,
};

export const AgentsBuilder: Story = {
  render: () => (
    <div className="h-screen flex flex-col min-h-0 overflow-hidden bg-[#e0e5eb] dark:bg-[#13161b] transition-colors duration-300">
      <div className={APP_MAIN_CONTENT_SHELL_CLASS}>
        <AgentsBuilderView onBack={() => {}} />
      </div>
    </div>
  ),
};
