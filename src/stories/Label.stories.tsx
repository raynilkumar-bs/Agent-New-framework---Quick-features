import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";

const meta: Meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Label>Business Name</Label>,
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-64">
      <Label htmlFor="biz-name">Business Name</Label>
      <Input id="biz-name" placeholder="Acme Coffee Roasters" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="notify" />
      <Label htmlFor="notify">Notify me of new reviews</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-64">
      <Label htmlFor="required-email">
        Email Address{" "}
        <span className="text-destructive" aria-hidden>
          *
        </span>
      </Label>
      <Input id="required-email" type="email" placeholder="you@company.com" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-64">
      <Label htmlFor="disabled-input" className="text-muted-foreground">
        API Key (read-only)
      </Label>
      <Input
        id="disabled-input"
        value="sk-••••••••••••••••••••••••••••"
        disabled
        readOnly
      />
    </div>
  ),
};
