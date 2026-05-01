import type { Meta, StoryObj } from "@storybook/react";
import { ListingsView } from "@/app/components/ListingsView";

const meta: Meta<typeof ListingsView> = {
  title: "App/Views/ListingsView",
  component: ListingsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Listings product view. Migrated from `UI-web-2.0/src/app/pages/listingsV2/`. " +
          "Summary tiles (Synced / With errors / Needs update / Not listed) + two-tab table: " +
          "Locations tab (per-location overall status, avg field-accuracy bar, synced count, issue count) " +
          "and Sites tab (directory coverage bar, avg accuracy, last synced). " +
          "Clicking a location row opens a per-site breakdown Sheet with issue details and fix CTAs. " +
          "All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListingsView>;

export const Default: Story = {};
