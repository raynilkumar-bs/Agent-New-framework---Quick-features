import { Sheet, SheetContent } from "@/app/components/ui/sheet";
import { cn } from "@/app/components/ui/utils";
import {
  FLOATING_SHEET_FRAME_CONTENT_CLASS,
  FloatingSheetFrame,
} from "@/app/components/layout/FloatingSheetFrame";
import {
  type SocialCalendarPost,
  SocialPostPreviewBody,
  socialPostPlatformLabel,
} from "@/app/components/social/socialPostShared";

/** Visual hierarchy and labels: align with Figma Social-SFDC (node 3515-3524). */
export type SocialPostPreviewSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: SocialCalendarPost | null;
  /** Optional — prototype logs only */
  onEdit?: () => void;
};

/**
 * Floating **medium** sheet: full post copy + media + AI schedule (prototype).
 * Shell matches Storybook UI/Sheet Medium + FloatingSheetFrame.
 */
export function SocialPostPreviewSheet({
  open,
  onOpenChange,
  post,
  onEdit,
}: SocialPostPreviewSheetProps) {
  const handleClose = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        inset="floating"
        floatingSize="md"
        className={cn(FLOATING_SHEET_FRAME_CONTENT_CLASS)}
      >
        {post ? (
          <FloatingSheetFrame
            title="Post"
            description={`${socialPostPlatformLabel(post.platform)} · ${post.time}`}
            primaryAction={{
              label: "Edit post",
              onClick: () => {
                onEdit?.();
              },
            }}
            secondaryAction={{
              label: "Close",
              onClick: handleClose,
            }}
          >
            <SocialPostPreviewBody post={post} variant="drawer" />
          </FloatingSheetFrame>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
