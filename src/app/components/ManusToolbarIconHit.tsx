import * as React from "react";

import { HOVER } from "@/app/components/L2NavLayout";
import { cn } from "@/app/components/ui/utils";

type ManusToolbarIconHitProps = React.ComponentProps<"button">;

/**
 * **32×32** icon tile: **hover / pressed overlays** use the same washes as **L2 navigation**
 * (`L2NavLayout` `HOVER` + selected-row gray). Stroke still pairs with `L1_STRIP_ICON_*` on Lucide.
 * Focus ring uses semantic `ring-primary`.
 */
export function ManusToolbarIconHit({ className, type = "button", ...props }: ManusToolbarIconHitProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-[10px] outline-none",
        "transition-all duration-200 ease-out",
        HOVER,
        "text-muted-foreground hover:text-foreground active:bg-app-shell-l2-row-active active:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}
