import type { Meta, StoryObj } from "@storybook/react";
import { ReferralsView } from "@/app/components/ReferralsView";

const meta: Meta<typeof ReferralsView> = {
  title: "App/Views/ReferralsView",
  component: ReferralsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Referrals product view. Migrated from `UI-web-2.0/src/app/pages/referral/`. " +
          "Shows sent/shared/leads tabs with stat cards, channel breakdown bars, sortable tables, " +
          "and a lead detail Sheet. All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReferralsView>;

export const Default: Story = {};
export const SentTab: Story = { name: "Sent tab (default)" };
