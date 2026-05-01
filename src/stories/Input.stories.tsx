import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Search, Mail } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "search"] },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text…" },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search…" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { placeholder: "Disabled input", disabled: true },
};

export const WithDefaultValue: Story = {
  args: { defaultValue: "Pre-filled value" },
};
