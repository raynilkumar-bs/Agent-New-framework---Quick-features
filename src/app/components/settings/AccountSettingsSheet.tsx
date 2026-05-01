import { useRef, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import {
  Sheet,
  SheetContent,
  type SheetFloatingSize,
} from "@/app/components/ui/sheet";
import {
  FLOATING_SHEET_FRAME_CONTENT_CLASS,
  FloatingSheetFrame,
} from "@/app/components/layout/FloatingSheetFrame";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/app/components/ui/utils";

export type AccountSettingsSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Shown in the avatar circle; updates when the user picks a new image if `onAvatarUpload` is provided. */
  avatarUrl: string;
  /** Persist avatar (e.g. parent updates state + `localStorage`). */
  onAvatarUpload?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultFirstName?: string;
  defaultLastName?: string;
  defaultEmail?: string;
  className?: string;
  /** Floating panel width; account settings use **medium** (480px) in product. */
  floatingSize?: SheetFloatingSize;
};

/**
 * Account settings (profile + password) in a right-side floating sheet, using design tokens for
 * light/dark. **`FloatingSheetFrame`** keeps the header and footer fixed; the form scrolls in the body.
 */
export function AccountSettingsSheet({
  open,
  onOpenChange,
  avatarUrl,
  onAvatarUpload,
  defaultFirstName = "John",
  defaultLastName = "Doe",
  defaultEmail = "john.doe@acmecorp.com",
  className,
  floatingSize = "md",
}: AccountSettingsSheetProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        inset="floating"
        floatingSize={floatingSize}
        className={cn(FLOATING_SHEET_FRAME_CONTENT_CLASS, className)}
      >
        <FloatingSheetFrame
          title="Account"
          description="Update your profile and personal details here"
          primaryAction={{ label: "Change password" }}
        >
          <div className="flex flex-col gap-8 pb-4">
            <section className="flex flex-col gap-6" aria-labelledby="account-profile-heading">
              <h2
                id="account-profile-heading"
                className="text-base font-semibold text-foreground"
              >
                Profile
              </h2>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Avatar</Label>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                    <img
                      src={avatarUrl}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={onAvatarUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      className="w-fit"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Upload className="size-4" aria-hidden />
                      Upload
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      For best results, upload an image 512×512 or larger.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="account-first-name">First name</Label>
                  <Input
                    id="account-first-name"
                    name="firstName"
                    autoComplete="given-name"
                    defaultValue={defaultFirstName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="account-last-name">Last name</Label>
                  <Input
                    id="account-last-name"
                    name="lastName"
                    autoComplete="family-name"
                    defaultValue={defaultLastName}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="account-email">Email</Label>
                <Input
                  id="account-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={defaultEmail}
                />
              </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-6" aria-labelledby="account-password-heading">
              <h2
                id="account-password-heading"
                className="text-base font-semibold text-foreground"
              >
                Password
              </h2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="account-current-password">Current password</Label>
                  <Input
                    id="account-current-password"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="account-new-password">New password</Label>
                  <Input
                    id="account-new-password"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your password must have at least 8 characters, include one
                    uppercase letter, and one number.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="account-confirm-password">
                    Re-type new password
                  </Label>
                  <Input
                    id="account-confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Re-type new password"
                  />
                </div>

              </div>
            </section>
          </div>
        </FloatingSheetFrame>
      </SheetContent>
    </Sheet>
  );
}
