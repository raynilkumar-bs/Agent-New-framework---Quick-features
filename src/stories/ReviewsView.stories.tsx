import type { Meta, StoryObj } from "@storybook/react";
import { ReviewsView } from "@/app/components/ReviewsView";

const meta: Meta<typeof ReviewsView> = {
  title: "App/Views/ReviewsView",
  component: ReviewsView,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ReviewsView>;

export const Default: Story = {};
