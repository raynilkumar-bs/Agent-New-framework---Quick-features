import type { Meta, StoryObj } from "@storybook/react";
import { SurveysView } from "@/app/components/SurveysView";

const meta: Meta<typeof SurveysView> = {
  title: "App/Views/SurveysView",
  component: SurveysView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Surveys product view. Migrated from `UI-web-2.0/src/app/pages/surveys/`. " +
          "Survey listing table (name, type badge, status, sent, responses, completion bar, NPS score, " +
          "last updated, owner, ⋯ actions). Clicking a row or 'View reports' opens a detail Sheet " +
          "with summary stats, NPS breakdown bars, per-question distributions, and recent responses. " +
          "All data is mocked for prototype use.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SurveysView>;

export const Default: Story = {};
