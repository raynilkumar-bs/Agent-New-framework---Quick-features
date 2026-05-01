import type { Meta, StoryObj } from "@storybook/react";
import { AccountSettingsSheet } from "@/app/components/settings/AccountSettingsSheet";
import { AccountSettingsSheetStoryDemo } from "@/stories/App/Settings/AccountSettingsSheetStoryDemo";

const meta: Meta<typeof AccountSettingsSheet> = {
  title: "App/Settings/Account settings",
  component: AccountSettingsSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shared **account** surface: profile and password fields in a **floating** right **Sheet** at **medium** width (480px), inset from the viewport with rounded corners. Open from **My profile** on the L1 profile menu. Size presets: **UI/Sheet**. Use the Storybook **Theme** toolbar for light/dark checks.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AccountSettingsSheet>;

export const Default: Story = {
  render: () => <AccountSettingsSheetStoryDemo />,
};
