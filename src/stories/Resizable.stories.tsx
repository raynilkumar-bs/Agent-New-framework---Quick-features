import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";

const meta: Meta = {
  title: "UI/Resizable",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-48 max-w-xl rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="flex h-full items-center justify-center p-4 bg-muted text-muted-foreground text-sm">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={65} minSize={30}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Main Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-64 max-w-xl rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={40} minSize={20}>
        <div className="flex h-full items-center justify-center p-4 bg-muted text-muted-foreground text-sm">
          Review List
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={20}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Review Detail
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-64 max-w-2xl rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="flex h-full items-center justify-center p-4 bg-muted text-muted-foreground text-xs">
          Nav
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={55} minSize={30}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Reviews Feed
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4 bg-card text-muted-foreground text-xs border-l border-border">
          Details
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-48 max-w-xl rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={40} minSize={20}>
        <div className="flex h-full flex-col gap-2 p-4">
          <p className="text-xs font-medium text-foreground">Inbox</p>
          {["New review from Google", "Review request opened", "Campaign sent"].map(
            (item) => (
              <div
                key={item}
                className="rounded-md bg-muted px-4 py-2 text-xs text-muted-foreground"
              >
                {item}
              </div>
            )
          )}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={30}>
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Select a message to read
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
