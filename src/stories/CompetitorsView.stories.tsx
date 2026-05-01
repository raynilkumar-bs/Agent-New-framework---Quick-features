import type { Meta, StoryObj } from "@storybook/react";
import { CompetitorsView } from "@/app/components/CompetitorsView";

const meta: Meta<typeof CompetitorsView> = {
  title: "App/Views/CompetitorsView",
  component: CompetitorsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Competitors monitoring view. Built from Birdeye Competitors MFE product knowledge " +
          "(MFE repo access pending). Two-panel layout: left competitor list with star ratings and " +
          "trend indicators; right dashboard with rating comparison bar chart (Recharts), " +
          "6-month review volume line chart, sentiment breakdown cards (Positive/Neutral/Negative " +
          "vs top competitor), and recent competitor reviews table. All data is mocked.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CompetitorsView>;

export const Default: Story = {};
