import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/components/ui/command";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Star,
  MessageSquare,
  BarChart2,
  Settings,
  Users,
  Send,
  Bell,
} from "lucide-react";

const meta: Meta = {
  title: "UI/Command",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Command className="rounded-lg border border-border shadow-sm">
        <CommandInput placeholder="Search features, settings, contacts…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Star className="mr-2 size-4 text-muted-foreground" />
              <span>View Reviews</span>
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Send className="mr-2 size-4 text-muted-foreground" />
              <span>Send Review Request</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <MessageSquare className="mr-2 size-4 text-muted-foreground" />
              <span>Open Inbox</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <BarChart2 className="mr-2 size-4 text-muted-foreground" />
              <span>Analytics Dashboard</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Settings className="mr-2 size-4 text-muted-foreground" />
              <span>Account Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Users className="mr-2 size-4 text-muted-foreground" />
              <span>Manage Team</span>
            </CommandItem>
            <CommandItem>
              <Bell className="mr-2 size-4 text-muted-foreground" />
              <span>Notification Preferences</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <span>Search…</span>
          <Badge variant="secondary" className="font-mono text-xs">
            ⌘K
          </Badge>
        </Button>
        <p className="text-xs text-muted-foreground">
          Press{" "}
          <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-xs">
            ⌘K
          </kbd>{" "}
          to open the command palette.
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search features, contacts, settings…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <Star className="mr-2 size-4 text-muted-foreground" />
                <span>View All Reviews</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Send className="mr-2 size-4 text-muted-foreground" />
                <span>New Review Request</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <BarChart2 className="mr-2 size-4 text-muted-foreground" />
                <span>Analytics</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                <Settings className="mr-2 size-4 text-muted-foreground" />
                <span>Account Settings</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};
