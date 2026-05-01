import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  clampPanelWidth,
  maxPanelWidthForRow,
  PANEL_WIDTH_DEFAULT,
  PANEL_WIDTH_MIN,
  useRightChatPanelWidth,
} from "@/app/hooks/useRightChatPanelWidth";
import { HorizontalResizeHandle } from "@/app/components/layout/HorizontalResizeHandle";

const SLIDE_MS = 280;
const SLIDE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

export type ResizableRightChatPanelProps = {
  open: boolean;
  children: ReactNode;
  /** Row width (L2 + main + panel flex area) for clamping */
  layoutRowWidth: number;
  className?: string;
  /**
   * When true, the panel fills the chat row (expanded Myna workspace). Same React subtree as docked
   * mode so the chat panel does not remount when switching layouts.
   */
  workspaceExpanded?: boolean;
};

/**
 * Right-anchored column: open/close uses width + translateX on inner shell.
 * Resize handle updates width via ref during drag; React state commits on pointerup.
 */
export function ResizableRightChatPanel({
  open,
  children,
  layoutRowWidth,
  className,
  workspaceExpanded = false,
}: ResizableRightChatPanelProps) {
  const { width, setWidth, widthRef } = useRightChatPanelWidth(layoutRowWidth);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startPointerXRef = useRef(0);
  const startWidthRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const applyOuterWidth = useCallback((px: number) => {
    const el = outerRef.current;
    if (el) el.style.width = `${px}px`;
  }, []);

  const applyInnerTransform = useCallback((openState: boolean) => {
    const el = innerRef.current;
    if (el) el.style.transform = openState ? "translateX(0)" : "translateX(100%)";
  }, []);

  useLayoutEffect(() => {
    if (draggingRef.current) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    if (workspaceExpanded) {
      outer.style.flex = "1 1 0%";
      outer.style.minWidth = "0";
      outer.style.width = "";
      inner.style.transform = "translateX(0)";
      return;
    }

    outer.style.flex = "";
    outer.style.minWidth = "";
    const w = open ? widthRef.current : 0;
    applyOuterWidth(w);
    applyInnerTransform(open);
  }, [open, width, workspaceExpanded, applyOuterWidth, applyInnerTransform]);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (draggingRef.current) return;

    if (workspaceExpanded) {
      outer.style.transition = "none";
      inner.style.transition = "none";
      return;
    }

    const t = isDragging ? "none" : `width ${SLIDE_MS}ms ${SLIDE_EASING}`;
    const t2 = isDragging ? "none" : `transform ${SLIDE_MS}ms ${SLIDE_EASING}`;
    outer.style.transition = t;
    inner.style.transition = t2;
  }, [open, isDragging, workspaceExpanded]);

  const onResizePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!open || workspaceExpanded) return;
      e.preventDefault();
      e.stopPropagation();
      draggingRef.current = true;
      setIsDragging(true);
      startPointerXRef.current = e.clientX;
      startWidthRef.current = widthRef.current;
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (outer) outer.style.transition = "none";
      if (inner) inner.style.transition = "none";
      e.currentTarget.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        if (!draggingRef.current) return;
        const delta = startPointerXRef.current - ev.clientX;
        const rowW = layoutRowWidth || outerRef.current?.parentElement?.clientWidth || 0;
        const next = clampPanelWidth(startWidthRef.current + delta, rowW);
        widthRef.current = next;
        applyOuterWidth(next);
      };

      const onUp = (ev: PointerEvent) => {
        draggingRef.current = false;
        setIsDragging(false);
        try {
          e.currentTarget.releasePointerCapture(ev.pointerId);
        } catch {
          /* ignore */
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        const rowW = layoutRowWidth || outerRef.current?.parentElement?.clientWidth || 0;
        const finalW = clampPanelWidth(widthRef.current, rowW);
        widthRef.current = finalW;
        setWidth(finalW);
        applyOuterWidth(open ? finalW : 0);
        const o = outerRef.current;
        const i = innerRef.current;
        if (o)
          o.style.transition = open ? `width ${SLIDE_MS}ms ${SLIDE_EASING}` : "none";
        if (i)
          i.style.transition = open ? `transform ${SLIDE_MS}ms ${SLIDE_EASING}` : "none";
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [open, workspaceExpanded, applyOuterWidth, layoutRowWidth, setWidth, widthRef]
  );

  const onHandleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (workspaceExpanded) return;
      const rowW = layoutRowWidth || outerRef.current?.parentElement?.clientWidth || 0;
      const target = clampPanelWidth(PANEL_WIDTH_DEFAULT, rowW);
      widthRef.current = target;
      setWidth(target);
      if (open) applyOuterWidth(target);
    },
    [applyOuterWidth, layoutRowWidth, open, setWidth, widthRef, workspaceExpanded]
  );

  const maxW = maxPanelWidthForRow(layoutRowWidth);

  return (
    <div
      ref={outerRef}
      className={[
        "relative",
        workspaceExpanded ? "min-w-0 flex-1" : "shrink-0 overflow-hidden",
        className ?? "",
      ].join(" ")}
      style={{ width: workspaceExpanded ? undefined : 0 }}
      aria-hidden={!open && !workspaceExpanded}
    >
      {/* Resize handle lives on the outer div so overflow-hidden on outer doesn't clip it */}
      {!workspaceExpanded ? (
        <HorizontalResizeHandle
          aria-label="Resize chat panel"
          aria-valuenow={Math.round(width)}
          aria-valuemin={PANEL_WIDTH_MIN}
          aria-valuemax={Math.round(maxW)}
          onPointerDown={onResizePointerDown}
          onDoubleClick={onHandleDoubleClick}
        />
      ) : null}
      <div
        ref={innerRef}
        className={[
          "flex h-full min-h-0 w-full flex-col bg-white dark:bg-[#1a1d24]",
          workspaceExpanded
            ? ""
            : "rounded-tl-lg border-l border-t border-[#e5e9f0] dark:border-[#333a47]",
        ].join(" ")}
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
