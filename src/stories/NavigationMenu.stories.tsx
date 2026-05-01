import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import { cn } from "@/app/components/ui/utils";

const meta: Meta = {
  title: "UI/NavigationMenu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ListItem = ({
  className,
  title,
  children,
  href = "#",
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href?: string;
}) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
          className
        )}
      >
        <div className="text-sm font-medium text-foreground leading-none">
          {title}
        </div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
);

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-primary-foreground">
                      Birdeye Dashboard
                    </div>
                    <p className="text-sm leading-tight text-primary-foreground/80">
                      Monitor your reputation, respond to reviews, and grow your
                      business — all in one place.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem title="Star Rating">
                Your live average across all connected platforms.
              </ListItem>
              <ListItem title="Review Volume">
                Track how many reviews you receive each week.
              </ListItem>
              <ListItem title="Response Rate">
                See how quickly your team responds to reviews.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2">
              <ListItem title="Performance Report">
                Monthly summary of review activity and sentiment trends.
              </ListItem>
              <ListItem title="Competitor Analysis">
                Compare your ratings against local competitors.
              </ListItem>
              <ListItem title="Campaign Results">
                Measure the success of your review request campaigns.
              </ListItem>
              <ListItem title="Response Audit">
                Review your team's response quality and timeliness.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Reviews
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        {["Dashboard", "Reviews", "Campaigns", "Contacts", "Reports"].map(
          (item) => (
            <NavigationMenuItem key={item}>
              <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                {item}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
