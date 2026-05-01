import type { Meta, StoryObj } from "@storybook/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { CalendarDays, MapPin, Star } from "lucide-react";

const meta: Meta = {
  title: "UI/HoverCard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-8">
      <span className="text-sm text-muted-foreground">Reviewed by</span>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="px-0 text-sm h-auto">
            @sarah_m
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Sarah M." />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">Sarah Mitchell</h4>
              <p className="text-xs text-muted-foreground">
                Loyal customer since 2021. Has left 12 reviews across your locations.
              </p>
              <div className="flex items-center gap-1 pt-1">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground ml-1">avg. 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3" />
                <span>Last review: 3 days ago</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const SocialProfile: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-8">
      <span className="text-sm text-muted-foreground">Shared by</span>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="px-0 text-sm h-auto font-medium">
            @birdeye_hq
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="size-12">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  BE
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-foreground">Birdeye HQ</h4>
                <p className="text-xs text-muted-foreground">@birdeye_hq</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  <span>Dallas, TX</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-foreground">
              Helping local businesses grow through reviews, messaging, and AI.
              The #1 reputation platform trusted by 150,000+ businesses.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>
                <strong className="text-foreground">12.4K</strong> Followers
              </span>
              <span>
                <strong className="text-foreground">842</strong> Following
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
