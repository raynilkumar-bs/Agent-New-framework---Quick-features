import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Type your message here…" },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Write your message…" rows={4} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { placeholder: "Disabled textarea", disabled: true },
};

export const WithDefaultValue: Story = {
  args: { defaultValue: "This textarea has pre-filled content. You can edit it." },
};
