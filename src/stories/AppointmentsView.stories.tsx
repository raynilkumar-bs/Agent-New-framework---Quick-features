import type { Meta, StoryObj } from "@storybook/react";
import { AppointmentsView } from "@/app/components/AppointmentsView";

const meta: Meta<typeof AppointmentsView> = {
  title: "App/Views/AppointmentsView",
  component: AppointmentsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Appointments product view. Migrated from `UI-web-2.0/src/app/pages/appointments/`. " +
          "Two modes: Calendar (day/week grid with time-positioned appointment cards per provider) " +
          "and Schedule (sortable list table). Clicking any appointment opens a detail Sheet. " +
          "All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppointmentsView>;

export const Default: Story = {};
export const WeekCalendar: Story = { name: "Week calendar (default)" };
