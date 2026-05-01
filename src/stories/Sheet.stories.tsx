import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

const meta: Meta = {
  title: "UI/Sheet",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Business Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Update your business information. Changes will appear on your public
            Birdeye profile within 24 hours.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="biz-name">Business Name</Label>
            <Input id="biz-name" defaultValue="Acme Coffee Roasters" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biz-phone">Phone</Label>
            <Input id="biz-phone" defaultValue="+1 (512) 555-0100" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biz-address">Address</Label>
            <Input
              id="biz-address"
              defaultValue="123 Main St, Austin, TX 78701"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biz-website">Website</Label>
            <Input
              id="biz-website"
              defaultValue="https://acmecoffee.com"
              type="url"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Navigation</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          {[
            "Dashboard",
            "Reviews",
            "Inbox",
            "Contacts",
            "Campaigns",
            "Reports",
            "Settings",
          ].map((item) => (
            <SheetClose key={item} asChild>
              <a
                href="#"
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {item}
              </a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View Notifications</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Recent Notifications</SheetTitle>
          <SheetDescription>
            You have 3 unread notifications.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {[
            {
              msg: "New 5-star review from Google",
              time: "2 minutes ago",
              type: "review",
            },
            {
              msg: "Review request campaign delivered to 48 contacts",
              time: "1 hour ago",
              type: "campaign",
            },
            {
              msg: "Monthly performance report is ready",
              time: "Yesterday",
              type: "report",
            },
          ].map((n) => (
            <div
              key={n.msg}
              className="flex items-start gap-4 rounded-md border border-border bg-muted px-4 py-2"
            >
              <div className="flex-1">
                <p className="text-sm text-foreground">{n.msg}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Bulk Actions</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bulk Review Actions</SheetTitle>
          <SheetDescription>
            Apply an action to all 14 selected reviews.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button variant="outline">Mark as Responded</Button>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Export Selected</Button>
          <Button variant="destructive">Delete Selected</Button>
        </div>
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
