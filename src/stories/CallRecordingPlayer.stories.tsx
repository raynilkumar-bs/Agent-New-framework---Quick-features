import type { Meta, StoryObj } from "@storybook/react";
import { CallRecordingPlayer } from "@/app/components/CallRecordingPlayer";
import {
  CALL_ALEX_K, CALL_MARIA_TORRES, CALL_JAMES_CHEN, CALL_SARAH_WILLIAMS,
} from "@/app/components/callRecordingData";

/** Wraps the player in the same inbox detail-panel shell */
function InboxShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f5f6f8] dark:bg-[#13161b] transition-colors duration-300">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {children}
      </div>
      <div className="shrink-0 bg-transparent px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl border border-[#eaeaea] dark:border-[#333a47] bg-white dark:bg-[#262b35] px-4 py-3">
          <span className="flex-1 text-[14px] text-[#b0b0b0] dark:text-[#4d5568]" style={{ fontWeight: 400 }}>
            Send a follow-up message…
          </span>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof CallRecordingPlayer> = {
  title: "App/Views/CallRecordingPlayer",
  component: CallRecordingPlayer,
  decorators: [
    (Story) => (
      <InboxShell>
        <Story />
      </InboxShell>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Decagon-inspired call recording player embedded inside the Inbox detail panel. " +
          "Features: real SpeechSynthesis audio (different voices per speaker), waveform scrubber, " +
          "colour-coded hover markers (problem / info / escalation / resolution) with jump-to cards, " +
          "AI summary with checkable action items, full transcript with seek-on-hover, " +
          "language switcher (EN / FR / ES), speed control (1× / 2.5× / 3×), mute, and Create Ticket sheet.",
      },
    },
  },
  argTypes: {
    record: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof CallRecordingPlayer>;

export const WrongShoeSize: Story = {
  name: "Alex K. — Wrong shoe size (Resolved)",
  args: { record: CALL_ALEX_K },
};

export const DoubleBilling: Story = {
  name: "Maria Torres — Double billing (Resolved)",
  args: { record: CALL_MARIA_TORRES },
};

export const ReturnNotProcessed: Story = {
  name: "James Chen — Return missing (Escalated)",
  args: { record: CALL_JAMES_CHEN },
};

export const LateDelivery: Story = {
  name: "Sarah Williams — Order never arrived (Follow-up)",
  args: { record: CALL_SARAH_WILLIAMS },
};
