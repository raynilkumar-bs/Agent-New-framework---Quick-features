import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};

export const SwitchGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { id: "email", label: "Email notifications", defaultChecked: true },
        { id: "push", label: "Push notifications", defaultChecked: false },
        { id: "sms", label: "SMS alerts", defaultChecked: true },
        { id: "weekly", label: "Weekly digest", defaultChecked: false },
      ].map(({ id, label, defaultChecked }) => (
        <div key={id} className="flex items-center justify-between w-72">
          <Label htmlFor={id}>{label}</Label>
          <Switch id={id} defaultChecked={defaultChecked} />
        </div>
      ))}
    </div>
  ),
};
