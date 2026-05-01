import type { Meta, StoryObj } from "@storybook/react";
import { PaymentsView } from "@/app/components/PaymentsView";

const meta: Meta<typeof PaymentsView> = {
  title: "App/Views/PaymentsView",
  component: PaymentsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Payments product view. Migrated from `UI-web-2.0/src/app/pages/payments/`. " +
          "Shows a donut summary (Requested / Received / Not paid / Refunded), " +
          "4 metric blocks (Available balance, Net earnings, Paid out, Monthly bill), " +
          "and a filterable transaction table with inline actions (cancel, mark-as-paid, refund, invoice sheet). " +
          "All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentsView>;

export const Default: Story = {};
