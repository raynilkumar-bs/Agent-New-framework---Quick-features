import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";
import { Button } from "@/app/components/ui/button";
import { ExternalLink } from "lucide-react";

const meta: Meta = {
  title: "UI/Sonner",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster richColors position="bottom-right" />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast("Review request sent to 48 contacts.")}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Review published successfully.")
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Failed to send campaign. Please try again.")
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Your plan allows up to 500 review requests per month.")
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Your monthly report is being generated.")
        }
      >
        Info
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast("Review response drafted.", {
            action: {
              label: "View Draft",
              onClick: () => alert("Opening draft…"),
            },
          })
        }
      >
        Toast with Action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Campaign sent to 200 contacts.", {
            description: "You can monitor delivery in the Campaigns tab.",
            action: {
              label: "Open Campaigns",
              onClick: () => alert("Navigating to Campaigns…"),
            },
          })
        }
      >
        Success with Description
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Could not connect to Google Business.", {
            description: "Check your integration settings.",
            action: {
              label: "Fix Now",
              onClick: () => alert("Opening settings…"),
            },
          })
        }
      >
        Error with Action
      </Button>
    </div>
  ),
};

export const Promise: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => {
          const promise = new Promise<{ count: number }>((resolve, reject) => {
            setTimeout(() => resolve({ count: 12 }), 2000);
          });
          toast.promise(promise, {
            loading: "Sending review requests…",
            success: (data) =>
              `${data.count} review requests delivered successfully.`,
            error: "Failed to send review requests.",
          });
        }}
      >
        Promise (success)
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const promise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Network error")), 2000);
          });
          toast.promise(promise, {
            loading: "Generating report…",
            success: "Report ready for download.",
            error: "Report generation failed. Please retry.",
          });
        }}
      >
        Promise (error)
      </Button>
    </div>
  ),
};
