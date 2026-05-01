import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { Card, CardContent } from "@/app/components/ui/card";

const meta: Meta = {
  title: "UI/Carousel",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const cardColors = [
  "bg-primary/10 text-primary",
  "bg-secondary text-secondary-foreground",
  "bg-muted text-muted-foreground",
  "bg-card text-foreground border border-border",
  "bg-destructive/10 text-destructive",
];

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm mx-auto">
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i}>
              <Card>
                <CardContent
                  className={`flex aspect-square items-center justify-center p-6 rounded-md ${cardColors[i]}`}
                >
                  <span className="text-4xl font-light">{i + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-xs mx-auto">
      <Carousel orientation="vertical" className="max-h-64">
        <CarouselContent className="-mt-1 h-64">
          {Array.from({ length: 5 }, (_, i) => (
            <CarouselItem key={i} className="pt-1 basis-1/2">
              <Card>
                <CardContent
                  className={`flex items-center justify-center p-4 rounded-md ${cardColors[i]}`}
                >
                  <span className="text-xl font-light">Review {i + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const AutoSize: Story = {
  render: () => {
    const items = [
      {
        title: "Manage Reviews",
        body: "Respond to customer reviews across all platforms from one place.",
      },
      {
        title: "Send Campaigns",
        body: "Reach customers with targeted messaging.",
      },
      {
        title: "Track Reputation",
        body: "Monitor your star rating across Google, Yelp, Facebook, and more with real-time alerts and insights.",
      },
      {
        title: "Collect Feedback",
        body: "Send automated review request surveys after every interaction.",
      },
      {
        title: "View Analytics",
        body: "Deep-dive into review trends with customizable reports.",
      },
    ];
    return (
      <div className="w-full max-w-md mx-auto">
        <Carousel>
          <CarouselContent>
            {items.map((item, i) => (
              <CarouselItem key={i}>
                <div className="p-4 rounded-md border border-border bg-card">
                  <h3 className="font-medium text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },
};
