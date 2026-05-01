import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

const meta: Meta = {
  title: "UI/Drawer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Review Request</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>New Review Request</DrawerTitle>
            <DrawerDescription>
              Send a review request to a customer via SMS or email.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" placeholder="Jane Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email Address</Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="jane@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone">Phone Number</Label>
              <Input
                id="customer-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button>Send Request</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const Right: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open Side Panel</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Review Details</DrawerTitle>
            <DrawerDescription>
              Full review information and response options.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 space-y-4">
            <div className="rounded-md bg-muted p-4 text-sm text-foreground">
              "Excellent service! The staff was incredibly helpful and went above
              and beyond to ensure our satisfaction. Will definitely return."
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>★★★★★</span>
              <span>·</span>
              <span>Google</span>
              <span>·</span>
              <span>2 days ago</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply">Your Reply</Label>
              <textarea
                id="reply"
                className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Thank you for your kind words…"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button>Post Reply</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const Top: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Show Announcement</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>New Feature: AI Response Suggestions</DrawerTitle>
            <DrawerDescription>
              Birdeye now suggests AI-powered replies to help you respond to
              reviews faster and more consistently.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex-row justify-end gap-2">
            <DrawerClose asChild>
              <Button variant="outline">Dismiss</Button>
            </DrawerClose>
            <Button>Learn More</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
