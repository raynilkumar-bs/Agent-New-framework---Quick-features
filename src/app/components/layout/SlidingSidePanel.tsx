import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import {
  SLIDE_MS,
  SLIDE_EASING,
  closedTransform,
} from "@/app/components/layout/slidePanelConstants";

export type SlidingSidePanelProps = {
  side: "left" | "right";
  open: boolean;
  /** Inner content width when open (px). */
  widthPx: number;
  children: ReactNode;
  className?: string;
  /** Classes on the sliding inner shell (borders, background). */
  innerClassName?: string;
};

/**
 * Fixed-width side column that slides in/out (same motion language as Myna chat dock).
 * No resize — use {@link ResizableRightChatPanel} when the handle is required.
 */
export function SlidingSidePanel({
  side,
  open,
  widthPx,
  children,
  className,
  innerClassName,
}: SlidingSidePanelProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const applyOuterWidth = useCallback(
    (px: number) => {
      const el = outerRef.current;
      if (el) el.style.width = `${px}px`;
    },
    [],
  );

  const applyInnerTransform = useCallback(
    (openState: boolean) => {
      const el = innerRef.current;
      if (el)
        el.style.transform = openState ? "translateX(0)" : closedTransform(side);
    },
    [side],
  );

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const w = open ? widthPx : 0;
    applyOuterWidth(w);
    applyInnerTransform(open);
  }, [open, widthPx, applyOuterWidth, applyInnerTransform]);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    outer.style.transition = `width ${SLIDE_MS}ms ${SLIDE_EASING}`;
    inner.style.transition = `transform ${SLIDE_MS}ms ${SLIDE_EASING}`;
  }, [open]);

  return (
    <div
      ref={outerRef}
      className={["relative shrink-0 overflow-hidden", className ?? ""].join(" ")}
      style={{ width: 0 }}
      aria-hidden={!open}
    >
      <div
        ref={innerRef}
        className={[
          "flex h-full min-h-0 flex-col bg-white dark:bg-[#1e2229]",
          innerClassName ?? "",
        ].join(" ")}
        style={{
          width: widthPx,
          transform: closedTransform(side),
        }}
      >
        {children}
      </div>
    </div>
  );
}
