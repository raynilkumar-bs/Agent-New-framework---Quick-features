import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { CalendarDays, Settings2 } from "lucide-react";

const meta: Meta = {
  title: "UI/Popover",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-foreground">
            Review Request Status
          </h4>
          <p className="text-xs text-muted-foreground">
            Your last campaign reached 148 contacts with a 62% open rate and 18
            new reviews generated.
          </p>
          <Button size="sm" className="w-full">
            View Campaign Details
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DatePickerStyle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-48 justify-start gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Pick a date…</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-foreground">
            Select Report Date Range
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                className="text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                className="text-xs"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              Apply
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Settings: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" side="right">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-foreground">
            Widget Dimensions
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width" className="text-xs text-right">
                Width
              </Label>
              <Input
                id="width"
                defaultValue="320"
                className="col-span-2 h-8 text-xs"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height" className="text-xs text-right">
                Height
              </Label>
              <Input
                id="height"
                defaultValue="240"
                className="col-span-2 h-8 text-xs"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="max-reviews" className="text-xs text-right">
                Max Reviews
              </Label>
              <Input
                id="max-reviews"
                defaultValue="10"
                type="number"
                min={1}
                max={50}
                className="col-span-2 h-8 text-xs"
              />
            </div>
          </div>
          <Button size="sm" className="w-full">
            Save Settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
