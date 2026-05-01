import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";

const meta: Meta = {
  title: "UI/ContextMenu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground select-none cursor-default">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          Edit Review Response
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy Link
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Flag for Follow-up</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive focus:text-destructive">
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground select-none cursor-default">
        Right-click for share options
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>View Review Details</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share Review</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Copy Public Link</ContextMenuItem>
            <ContextMenuItem>Share to Facebook</ContextMenuItem>
            <ContextMenuItem>Share to Twitter / X</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Download as Image</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Request Removal</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Mark as Responded</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showRating, setShowRating] = useState(true);
    const [showDate, setShowDate] = useState(true);
    const [showSource, setShowSource] = useState(false);
    const [view, setView] = useState("list");
    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-40 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground select-none cursor-default">
          Right-click to configure view
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>Review Columns</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={showRating}
            onCheckedChange={setShowRating}
          >
            Star Rating
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showDate}
            onCheckedChange={setShowDate}
          >
            Review Date
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={showSource}
            onCheckedChange={setShowSource}
          >
            Platform Source
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Layout</ContextMenuLabel>
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="compact">Compact View</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
