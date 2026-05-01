import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/app/components/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const Stages: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {[10, 33, 66, 90, 100].map((value) => (
        <div key={value} className="flex flex-col gap-1">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  ),
};
