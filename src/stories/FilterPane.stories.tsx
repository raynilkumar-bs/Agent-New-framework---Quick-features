import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  FilterPane,
  FilterPaneTriggerButton,
} from "@/app/components/FilterPane";
import type { FilterItem } from "@/app/components/FilterPanel.v1";
import {
  agentsMonitorFilterItems,
  createInitialAgentsMonitorFilters,
} from "@/app/data/agentsMonitorFilters";
import {
  createInitialReviewsFilters,
  reviewsFilterItems,
} from "@/app/data/reviewsFilters";

const meta: Meta = {
  title: "App/Filter pane",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

function PlaygroundShell({
  initialFilters,
  motion,
  dock,
}: {
  initialFilters: FilterItem[];
  motion: "static" | "slide";
  dock: "left" | "right";
}) {
  const [open, setOpen] = useState(true);
  const [filters, setFilters] = useState<FilterItem[]>(() =>
    initialFilters.map((f) => ({ ...f })),
  );

  return (
    <div className="flex h-[520px] min-h-0 flex-col overflow-hidden rounded-lg border border-[#e5e9f0] bg-white dark:border-[#333a47] dark:bg-[#13161b]">
      <div className="flex shrink-0 items-center justify-end gap-2 border-b border-[#e5e9f0] px-4 py-3 dark:border-[#333a47]">
        <FilterPaneTriggerButton open={open} onOpenChange={setOpen} />
      </div>
      <div className="flex min-h-0 flex-1 flex-row overflow-hidden">
        {motion === "slide" && dock === "left" ? (
          <FilterPane
            initialFilters={filters}
            open={open}
            onOpenChange={setOpen}
            onFiltersChange={setFilters}
            motion="slide"
            dock="left"
          />
        ) : null}
        <div className="min-h-0 flex-1 overflow-auto p-6 text-[13px] text-[#555] dark:text-[#8b92a5]">
          <p className="mb-2 text-[#212121] dark:text-[#e4e4e4]">
            Main content area
          </p>
          <p>
            Use the funnel control to toggle the filter pane. This story uses{" "}
            <code className="text-[12px]">motion=&quot;{motion}&quot;</code> and{" "}
            <code className="text-[12px]">dock=&quot;{dock}&quot;</code>.
          </p>
        </div>
        {motion === "static" && dock === "right" ? (
          <FilterPane
            initialFilters={filters}
            open={open}
            onOpenChange={setOpen}
            onFiltersChange={setFilters}
            motion="static"
            dock="right"
          />
        ) : null}
        {motion === "slide" && dock === "right" ? (
          <FilterPane
            initialFilters={filters}
            open={open}
            onOpenChange={setOpen}
            onFiltersChange={setFilters}
            motion="slide"
            dock="right"
          />
        ) : null}
      </div>
    </div>
  );
}

/** Arbitrary filters — edit `initialFilters` in the story source to experiment. */
export const Playground: Story = {
  render: () => (
    <div className="p-6">
      <PlaygroundShell
        initialFilters={[
          { id: "a", label: "Option A", options: ["All", "One", "Two"] },
          { id: "b", label: "Option B", options: ["Any", "Yes", "No"] },
        ]}
        motion="static"
        dock="right"
      />
    </div>
  ),
};

/** Same preset as Agents Monitor — slide in from the left (Monitor layout). */
export const AgentsMonitorPreset: Story = {
  render: () => (
    <div className="p-6">
      <PlaygroundShell
        initialFilters={agentsMonitorFilterItems}
        motion="slide"
        dock="left"
      />
    </div>
  ),
};

/** Same preset as Reviews — static column on the right. */
export const ReviewsPreset: Story = {
  render: () => (
    <div className="p-6">
      <PlaygroundShell
        initialFilters={reviewsFilterItems}
        motion="static"
        dock="right"
      />
    </div>
  ),
};

/** Slide from the right (e.g. alternate product layout). */
export const SlideFromRight: Story = {
  render: () => (
    <div className="p-6">
      <PlaygroundShell
        initialFilters={createInitialAgentsMonitorFilters()}
        motion="slide"
        dock="right"
      />
    </div>
  ),
};

function ClosedInitiallyShell() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(() => createInitialReviewsFilters());

  return (
    <div className="p-6">
      <div className="flex h-[480px] min-h-0 flex-col overflow-hidden rounded-lg border border-[#e5e9f0] bg-white dark:border-[#333a47] dark:bg-[#13161b]">
        <div className="flex shrink-0 items-center justify-end gap-2 border-b border-[#e5e9f0] px-4 py-3 dark:border-[#333a47]">
          <FilterPaneTriggerButton open={open} onOpenChange={setOpen} />
        </div>
        <div className="flex min-h-0 flex-1 flex-row overflow-hidden">
          <div className="min-h-0 flex-1 p-6 text-[13px] text-[#555] dark:text-[#8b92a5]">
            Closed by default — open the funnel to reveal filters.
          </div>
          <FilterPane
            initialFilters={filters}
            open={open}
            onOpenChange={setOpen}
            onFiltersChange={setFilters}
            motion="static"
            dock="right"
          />
        </div>
      </div>
    </div>
  );
}

export const ClosedInitially: Story = {
  render: () => <ClosedInitiallyShell />,
};
