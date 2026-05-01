import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@/app/components/ui/slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50], max: 100, step: 1, className: "w-72" },
};

export const Range: Story = {
  args: { defaultValue: [25, 75], max: 100, step: 1, className: "w-72" },
};

export const WithSteps: Story = {
  args: { defaultValue: [40], max: 100, step: 10, className: "w-72" },
};

export const Disabled: Story = {
  args: { defaultValue: [40], disabled: true, className: "w-72" },
};

export const Labeled: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      <div className="flex justify-between text-sm">
        <span>Volume</span>
        <span className="text-muted-foreground">70%</span>
      </div>
      <Slider defaultValue={[70]} max={100} step={1} />
    </div>
  ),
};
