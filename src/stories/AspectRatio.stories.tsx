import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "@/app/components/ui/aspect-ratio";

const meta: Meta = {
  title: "UI/AspectRatio",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Widescreen: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm font-medium">
          16 / 9 — Dashboard Preview
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={1 / 1}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-secondary text-secondary-foreground text-sm font-medium">
          1 / 1 — Business Logo
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={3 / 4}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm font-medium">
          3 / 4 — Profile Photo
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
      {["Review #1", "Review #2", "Review #3", "Review #4"].map((label, i) => (
        <AspectRatio key={i} ratio={4 / 3}>
          <div
            className="flex h-full w-full items-center justify-center rounded-md text-sm font-medium"
            style={{
              backgroundColor: `hsl(${i * 60 + 200} 60% 88%)`,
              color: `hsl(${i * 60 + 200} 60% 30%)`,
            }}
          >
            {label}
          </div>
        </AspectRatio>
      ))}
    </div>
  ),
};
