import type { Meta, StoryObj } from "@storybook/react";
import { TicketingView } from "@/app/components/TicketingView";

const meta: Meta<typeof TicketingView> = {
  title: "App/Views/TicketingView",
  component: TicketingView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Ticketing (Service) product view. Migrated from `UI-web-2.0/src/app/pages/ticketing/`. " +
          "Inbox-style ticket feed with priority colour-coded left borders, status badges, " +
          "source icons (email/phone/Google/Yelp/web form/Facebook), assignee, tags, and reply count. " +
          "Supports bulk selection with resolve/assign/close actions. " +
          "Clicking a ticket opens a full conversation thread Sheet with reply composer. " +
          "All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TicketingView>;

export const Default: Story = {};
