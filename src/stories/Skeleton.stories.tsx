import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/app/components/ui/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72 p-4 border rounded-xl">
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-full max-w-xl">
      <div className="flex gap-4 pb-2 border-b">
        {["Name", "Status", "Date"].map((h) => (
          <Skeleton key={h} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  ),
};
