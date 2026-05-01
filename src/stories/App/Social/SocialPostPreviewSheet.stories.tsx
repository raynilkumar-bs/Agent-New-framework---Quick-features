import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { SocialPostPreviewSheet } from "@/app/components/social/SocialPostPreviewSheet";
import type { SocialCalendarPost } from "@/app/components/social/socialPostShared";

/** Matches calendar mock tone — compare to Figma Social-SFDC node 3515-3524. */
const MOCK_SOCIAL_POST: SocialCalendarPost = {
  id: "story-preview-1",
  time: "12:48 PM",
  platform: "facebook",
  text:
    "McDonald's meals in every celebration that brings smiles, happiness, and togetherness. Enjoy this festive season with your loved ones at a McDonald's store or download the McDelivery App to order online.",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&auto=format",
  aiScheduled: [{ time: "6:48 PM" }, { time: "10:48 PM" }],
};

function SocialPostPreviewSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <p className="max-w-md text-sm text-muted-foreground">
        Floating <strong>medium</strong> sheet (480px) with <strong>FloatingSheetFrame</strong> — same shell as{" "}
        <strong>UI/Sheet → Medium</strong> and <strong>App/Settings/Account settings</strong>.
      </p>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Open post preview
      </Button>
      <SocialPostPreviewSheet open={open} onOpenChange={setOpen} post={MOCK_SOCIAL_POST} />
    </div>
  );
}

const meta: Meta<typeof SocialPostPreviewSheet> = {
  title: "App/Social/Post preview sheet",
  component: SocialPostPreviewSheet,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Prototype **post preview** drawer for Social calendar cards. Uses **Sheet** `floatingSize=\"md\"` + **FloatingSheetFrame** per Aero DS floating drawer pattern. Refine copy and section order against Figma **Social-SFDC** (node `3515-3524`).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SocialPostPreviewSheet>;

export const Default: Story = {
  render: () => <SocialPostPreviewSheetDemo />,
};
