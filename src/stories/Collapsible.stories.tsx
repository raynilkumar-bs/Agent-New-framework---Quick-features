import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import { Button } from "@/app/components/ui/button";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

const meta: Meta = {
  title: "UI/Collapsible",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-80 space-y-2">
        <div className="flex items-center justify-between px-4 py-2 rounded-md border border-border bg-card">
          <span className="text-sm font-medium text-foreground">
            Recent Notifications
          </span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown className="size-4 text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
            New 5-star review from Sarah M.
          </div>
          <div className="rounded-md border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
            Review request sent to 24 contacts.
          </div>
          <div className="rounded-md border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
            Monthly report is ready to download.
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      {
        q: "How do I request reviews from customers?",
        a: "Go to Reputation → Review Requests and choose to send via SMS or email. You can upload a contact list or send individually.",
      },
      {
        q: "Can I respond to reviews from the dashboard?",
        a: "Yes. Navigate to Reputation → Reviews, find the review you want to respond to, and click 'Reply'. Your response will be published publicly.",
      },
      {
        q: "How is my average star rating calculated?",
        a: "Your rating is the weighted average of all verified reviews across connected platforms, updated every 24 hours.",
      },
    ];
    return (
      <div className="w-full max-w-lg space-y-2">
        {faqs.map((faq, i) => {
          const [open, setOpen] = useState(false);
          return (
            <Collapsible key={i} open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-4 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors">
                {faq.q}
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-4 text-sm text-muted-foreground border border-t-0 border-border rounded-b-md bg-muted">
                {faq.a}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    );
  },
};

export const Settings: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Collapsible open={open} onOpenChange={setOpen} className="w-80">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-4 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          Notification Preferences
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 rounded-md border border-border bg-card divide-y divide-border">
          {["New review alerts", "Weekly digest", "Campaign results", "Low rating alerts"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-muted transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-primary"
                />
                <span className="text-sm text-foreground">{item}</span>
              </label>
            )
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
