import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly" className="flex flex-col gap-4">
      {[
        { value: "monthly", label: "Monthly", desc: "$9/month, billed monthly" },
        { value: "annual", label: "Annual", desc: "$90/year, save 17%" },
        { value: "enterprise", label: "Enterprise", desc: "Custom pricing" },
      ].map(({ value, label, desc }) => (
        <div key={value} className="flex items-start gap-4">
          <RadioGroupItem value={value} id={value} className="mt-0.5" />
          <div className="flex flex-col">
            <Label htmlFor={value}>{label}</Label>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  ),
};
