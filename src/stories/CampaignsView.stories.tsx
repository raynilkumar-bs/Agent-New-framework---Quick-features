import type { Meta, StoryObj } from "@storybook/react";
import { CampaignsView } from "@/app/components/CampaignsView";

const meta: Meta<typeof CampaignsView> = {
  title: "App/Views/CampaignsView",
  component: CampaignsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Campaigns product view. Migrated from `UI-web-2.0/src/app/pages/campaigns/`. " +
          "Two tabs: Campaigns (manual/one-time) and Automations (triggered/recurring). " +
          "Table columns: name + medium badge, type badge, status badge, contacts, opened %, clicked %, last run, created by, ⋯ actions. " +
          "Row click opens a detail Sheet with 4 stat tiles, timeline, and recent recipient activity. " +
          "All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CampaignsView>;

export const Default: Story = {};
