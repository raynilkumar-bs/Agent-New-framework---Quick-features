import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const meta: Meta = {
  title: "UI/InputOTP",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-1 text-center">
          <p className="text-sm font-medium text-foreground">
            Verification Code
          </p>
          <p className="text-xs text-muted-foreground">
            Enter the 6-digit code sent to your email.
          </p>
        </div>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs text-muted-foreground">
          Entered: <span className="font-mono text-foreground">{value || "—"}</span>
        </p>
      </div>
    );
  },
};

export const WithSeparator: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Phone verification — 6 digits with dash separator
        </p>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  },
};

export const FourDigit: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          4-digit PIN for quick access
        </p>
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">Disabled OTP Input</p>
      <InputOTP maxLength={6} value="123456" disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
};
