import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const meta: Meta = {
  title: "UI/ToggleGroup",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Alignment: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-muted-foreground">sm</span>
        <ToggleGroup type="multiple" size="sm" aria-label="Small formatting">
          <ToggleGroupItem value="bold">
            <Bold className="size-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic className="size-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline className="size-3" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-muted-foreground">default</span>
        <ToggleGroup type="multiple" size="default" aria-label="Default formatting">
          <ToggleGroupItem value="bold">
            <Bold className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-muted-foreground">lg</span>
        <ToggleGroup type="multiple" size="lg" aria-label="Large formatting">
          <ToggleGroupItem value="bold">
            <Bold className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Italic className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Underline className="size-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};
