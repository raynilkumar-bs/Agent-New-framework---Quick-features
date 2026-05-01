import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/app/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge>New</Badge>
      <Badge variant="secondary">12</Badge>
      <Badge variant="destructive">99+</Badge>
      <Badge variant="outline">Beta</Badge>
    </div>
  ),
};
