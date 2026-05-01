import { useState, type ChangeEvent } from "react";
import { AccountSettingsSheet } from "@/app/components/settings/AccountSettingsSheet";
import { Button } from "@/app/components/ui/button";
import type { SheetFloatingSize } from "@/app/components/ui/sheet";

export const ACCOUNT_SETTINGS_DEMO_AVATAR =
  "https://images.unsplash.com/photo-1617853701628-bfcf8b81d13d?w=512&h=512&fit=crop";

export type AccountSettingsSheetStoryDemoProps = {
  /** Override panel width for Storybook; product default is **md**. */
  floatingSize?: SheetFloatingSize;
};

export function AccountSettingsSheetStoryDemo({
  floatingSize,
}: AccountSettingsSheetStoryDemoProps = {}) {
  const [open, setOpen] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(ACCOUNT_SETTINGS_DEMO_AVATAR);

  const onAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Open account settings
      </Button>
      <AccountSettingsSheet
        open={open}
        onOpenChange={setOpen}
        avatarUrl={avatarUrl}
        onAvatarUpload={onAvatarUpload}
        defaultFirstName="Josef"
        defaultLastName="Albers"
        defaultEmail="josef@subframe.com"
        {...(floatingSize !== undefined ? { floatingSize } : {})}
      />
    </div>
  );
}
