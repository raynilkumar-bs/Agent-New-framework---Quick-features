import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";
import { Info } from "lucide-react";

const meta: Meta = {
  title: "UI/Tooltip",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        {[
          { label: "Edit", tip: "Edit this item" },
          { label: "Share", tip: "Share with team" },
          { label: "Delete", tip: "Delete permanently" },
        ].map(({ label, tip }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">{label}</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};
