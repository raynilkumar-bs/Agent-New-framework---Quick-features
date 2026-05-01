import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@/app/components/ui/toggle";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="size-4" />
    </Toggle>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-center gap-1">
        <Toggle variant="default" aria-label="Default bold">
          <Bold className="size-4" />
        </Toggle>
        <span className="text-xs text-muted-foreground">default</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Toggle variant="outline" aria-label="Outline bold">
          <Bold className="size-4" />
        </Toggle>
        <span className="text-xs text-muted-foreground">outline</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col items-center gap-1">
        <Toggle size="sm" aria-label="Small">
          <Bold className="size-3" />
        </Toggle>
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Toggle size="default" aria-label="Default">
          <Bold className="size-4" />
        </Toggle>
        <span className="text-xs text-muted-foreground">default</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Toggle size="lg" aria-label="Large">
          <Bold className="size-5" />
        </Toggle>
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-1 items-center">
      <Toggle aria-label="Toggle bold" defaultPressed>
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="size-4" />
      </Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Bold disabled" disabled>
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Italic disabled" disabled defaultPressed>
        <Italic className="size-4" />
      </Toggle>
    </div>
  ),
};
