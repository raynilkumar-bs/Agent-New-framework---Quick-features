import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@/app/components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-72 flex flex-col gap-4">
      <p className="text-sm">Above the separator</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Below the separator</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm">Home</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Reviews</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Reports</span>
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div className="w-48 border rounded-xl p-2 flex flex-col gap-1">
      {["Dashboard", "Analytics"].map((item) => (
        <button key={item} className="text-left text-sm px-2 py-1 rounded-md hover:bg-accent">{item}</button>
      ))}
      <Separator className="my-1" />
      {["Settings", "Logout"].map((item) => (
        <button key={item} className="text-left text-sm px-2 py-1 rounded-md hover:bg-accent">{item}</button>
      ))}
    </div>
  ),
};
