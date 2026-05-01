import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InlineSelectField } from "@/app/components/ui/inline-select-field";

const meta: Meta<typeof InlineSelectField> = {
  title: "UI/InlineSelectField",
  component: InlineSelectField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "App-shell custom selects (Agents / Schedule builders, schedule modal). The list uses the same floating panel shell as the L1 profile menu and is **portaled** to `document.body` with `position: fixed` so options stay readable inside `overflow-hidden` rails (e.g. 340px agent config column).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineSelectField>;

function NarrowOverflowShell(props: { size?: "sm" | "md" }) {
  const [value, setValue] = useState("Review source");
  const options = ["Review source", "Review rating", "Review text", "Reviewer name", "Location"];
  return (
    <div className="w-[340px] overflow-hidden rounded-lg border border-border bg-card p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Wrapper is <code className="text-xs">overflow-hidden</code> like the agent builder rail — each option should be its own row.
      </p>
      <InlineSelectField size={props.size} value={value} options={options} onChange={setValue} />
    </div>
  );
}

/** Matches Agents builder / schedule builder condition fields. */
export const SmallInOverflowHiddenRail: Story = {
  render: () => <NarrowOverflowShell />,
};

/** Matches Schedule report modal stacked fields. */
export const MediumWithLabel: Story = {
  render: () => {
    const [value, setValue] = useState("Weekly");
    return (
      <div className="w-[520px] max-w-full space-y-4 p-4">
        <InlineSelectField
          size="md"
          label="Frequency"
          value={value}
          options={["Daily", "Weekly", "Monthly"]}
          onChange={setValue}
        />
      </div>
    );
  },
};
