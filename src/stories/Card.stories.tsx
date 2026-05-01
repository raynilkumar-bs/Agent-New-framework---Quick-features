import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A brief description of this card's content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Some content goes here. You can put any React content inside a card.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Your report for this week</CardDescription>
        <CardAction>
          <Badge variant="secondary">+12%</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-medium">4,231</p>
        <p className="text-sm text-muted-foreground">Total visitors</p>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="pt-6">
        <p className="text-sm">Simple card with only content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {["Reviews", "Contacts", "Reports"].map((title, i) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Manage your {title.toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-medium">{(i + 1) * 128}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">View all →</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
