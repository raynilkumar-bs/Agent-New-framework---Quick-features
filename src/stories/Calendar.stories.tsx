import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";
import type { DateRange } from "react-day-picker";

const meta: Meta = {
  title: "UI/Calendar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col gap-4 items-start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border border-border"
        />
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="text-foreground font-medium">
            {date ? date.toLocaleDateString() : "None"}
          </span>
        </p>
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: undefined,
    });
    return (
      <div className="flex flex-col gap-4 items-start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          className="rounded-md border border-border"
        />
        <p className="text-sm text-muted-foreground">
          From:{" "}
          <span className="text-foreground font-medium">
            {range?.from ? range.from.toLocaleDateString() : "—"}
          </span>{" "}
          To:{" "}
          <span className="text-foreground font-medium">
            {range?.to ? range.to.toLocaleDateString() : "—"}
          </span>
        </p>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([]);
    return (
      <div className="flex flex-col gap-4 items-start">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-md border border-border"
        />
        <p className="text-sm text-muted-foreground">
          Selected {dates?.length ?? 0} date(s):{" "}
          <span className="text-foreground font-medium">
            {dates?.map((d) => d.toLocaleDateString()).join(", ") || "None"}
          </span>
        </p>
      </div>
    );
  },
};
