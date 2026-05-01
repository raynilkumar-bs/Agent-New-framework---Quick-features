import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { BirdAILoginPage } from "@/app/components/auth/BirdAILoginPage";
import { LoginMarketingPanel } from "@/app/components/auth/LoginMarketingPanel";

const meta: Meta<typeof BirdAILoginPage> = {
  title: "App/Auth/Login",
  component: BirdAILoginPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Birdeye login page. **Left:** email + password form with Google / Facebook / Microsoft / SSO social buttons. **Right:** Search AI marketing panel — light lavender blob background, cycling AI engine logo+name (ChatGPT → Gemini → Perplexity → Claude → Mistral AI, 2.6s interval), blue-to-purple gradient CTA.\n\n" +
          "Auth behaviour: fresh tab always shows login (opt-in `sessionStorage`); after sign-in always lands on **Reviews**. Session key: `birdai_demo_authenticated`.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BirdAILoginPage>;

export const Default: Story = {
  render: () => <BirdAILoginPage onAuthenticated={fn()} />,
};

export const MarketingPanel: Story = {
  name: "Right panel (Search AI)",
  parameters: { docs: { description: { story: "Isolated right-panel — cycling AI engine logos with blob background." } } },
  render: () => (
    <div className="h-screen w-screen flex bg-background">
      <LoginMarketingPanel className="flex w-full" />
    </div>
  ),
};
