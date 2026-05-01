import type { Meta, StoryObj } from "@storybook/react";
import { ContactsView } from "@/app/components/ContactsView";

const meta: Meta<typeof ContactsView> = {
  title: "App/Views/ContactsView",
  component: ContactsView,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ContactsView>;

export const Default: Story = {};
