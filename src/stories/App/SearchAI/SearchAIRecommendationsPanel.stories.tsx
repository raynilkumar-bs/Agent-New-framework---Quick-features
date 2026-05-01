import type { Meta, StoryObj } from "@storybook/react";
import { SearchAIRecommendationsPanel } from "@/app/components/searchai/SearchAIRecommendationsPanel";

const meta: Meta<typeof SearchAIRecommendationsPanel> = {
  title: "App/Search AI/Recommendations",
  component: SearchAIRecommendationsPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Search AI **Recommendations 2.0** prototype. Compare to Figma [Recommendations 2.0 — node 86-40295](https://www.figma.com/design/h2UBW91Ecj9rwQHMJfZHE4/Recommendations-2.0?node-id=86-40295). Verify semantic tokens and spacing under **Design System → Tokens**; use the Storybook theme toolbar for light/dark.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchAIRecommendationsPanel>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[720px] min-h-[480px] w-full max-w-5xl flex-col border border-border bg-background">
      <SearchAIRecommendationsPanel />
    </div>
  ),
};
