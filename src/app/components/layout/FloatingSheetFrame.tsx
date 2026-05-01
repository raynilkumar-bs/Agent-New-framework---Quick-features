"use client";

import * as React from "react";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/components/ui/utils";

/** Mild edge shadow when body content tucks under header/footer (scroll-linked). */
const headerEdgeShadowClass =
  "shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.32)]";
const footerEdgeShadowClass =
  "shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_14px_-4px_rgba(0,0,0,0.32)]";

/**
 * Pass on `SheetContent` when using this frame inside a **floating** sheet so only the body
 * scrolls (overrides the default `overflow-y-auto` on floating panels).
 */
export const FLOATING_SHEET_FRAME_CONTENT_CLASS =
  "min-h-0 gap-0 overflow-hidden p-0";

export type FloatingSheetAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type FloatingSheetFrameProps = {
  /** Header title — typography aligned with app TopBar page label (16px, -0.31px tracking). */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Scrollable main content only. */
  children: React.ReactNode;
  /** Primary CTA (default variant), rightmost in the footer. */
  primaryAction?: FloatingSheetAction;
  /** Secondary CTA (outline), to the left of primary. */
  secondaryAction?: FloatingSheetAction;
  /** When true, secondary button is wrapped in `SheetClose` (avoid if the sheet already has only the top-right dismiss). */
  secondaryUsesSheetClose?: boolean;
  /** If set, replaces the default primary/secondary footer row. */
  footer?: React.ReactNode;
  classNames?: {
    root?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
};

/**
 * Standard layout for **floating** `SheetContent`: edging header, scrollable body, sticky footer
 * with primary + secondary actions (bottom-right). No static header/footer rules; after the body
 * scrolls, a mild drop shadow appears under the header when content tucks upward and above the
 * footer when more content sits below the fold. Use with `SheetContent` +
 * {@link FLOATING_SHEET_FRAME_CONTENT_CLASS}.
 */
export function FloatingSheetFrame({
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  secondaryUsesSheetClose = false,
  footer,
  classNames,
}: FloatingSheetFrameProps) {
  const secondaryButton = secondaryAction ? (
    secondaryUsesSheetClose ? (
      <SheetClose asChild>
        <Button
          type="button"
          variant="outline"
          disabled={secondaryAction.disabled}
          onClick={secondaryAction.onClick}
        >
          {secondaryAction.label}
        </Button>
      </SheetClose>
    ) : (
      <Button
        type="button"
        variant="outline"
        disabled={secondaryAction.disabled}
        onClick={secondaryAction.onClick}
      >
        {secondaryAction.label}
      </Button>
    )
  ) : null;

  const primaryButton = primaryAction ? (
    <Button
      type="button"
      disabled={primaryAction.disabled}
      onClick={primaryAction.onClick}
    >
      {primaryAction.label}
    </Button>
  ) : null;

  const bodyRef = React.useRef<HTMLDivElement>(null);
  const bodyContentRef = React.useRef<HTMLDivElement>(null);
  const [scrollEdges, setScrollEdges] = React.useState({
    underHeader: false,
    aboveFooter: false,
  });
  const [bodyHasScrolled, setBodyHasScrolled] = React.useState(false);

  const updateScrollEdges = React.useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const eps = 2;
    setScrollEdges({
      underHeader: scrollTop > eps,
      aboveFooter: scrollTop + clientHeight < scrollHeight - eps,
    });
  }, []);

  const onBodyScroll = React.useCallback(() => {
    setBodyHasScrolled(true);
    updateScrollEdges();
  }, [updateScrollEdges]);

  React.useLayoutEffect(() => {
    updateScrollEdges();
  }, [updateScrollEdges, children]);

  React.useEffect(() => {
    const scrollEl = bodyRef.current;
    const contentEl = bodyContentRef.current;
    if (!scrollEl) return;
    const ro = new ResizeObserver(() => {
      updateScrollEdges();
    });
    ro.observe(scrollEl);
    if (contentEl) ro.observe(contentEl);
    return () => ro.disconnect();
  }, [updateScrollEdges]);

  const showFooter =
    footer !== undefined || primaryAction || secondaryAction;

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col gap-0",
        classNames?.root,
      )}
    >
      <header
        className={cn(
          "relative z-[1] flex shrink-0 flex-col gap-2 bg-background px-6 py-4 pr-14 text-left transition-shadow duration-200 ease-out",
          bodyHasScrolled && scrollEdges.underHeader && headerEdgeShadowClass,
          classNames?.header,
        )}
      >
        <SheetTitle
          className="text-left text-[16px] font-normal tracking-[-0.31px] text-foreground"
          style={{ fontWeight: 400 }}
        >
          {title}
        </SheetTitle>
        {description ? (
          <SheetDescription className="text-left">{description}</SheetDescription>
        ) : null}
      </header>

      <div
        ref={bodyRef}
        onScroll={onBodyScroll}
        className={cn(
          "relative z-0 min-h-0 flex-1 overflow-y-auto px-6 py-4",
          classNames?.body,
        )}
      >
        <div ref={bodyContentRef}>{children}</div>
      </div>

      {showFooter ? (
        <SheetFooter
          className={cn(
            "relative z-[1] mt-auto shrink-0 flex-row justify-end gap-2 bg-background px-6 py-4 transition-shadow duration-200 ease-out",
            bodyHasScrolled && scrollEdges.aboveFooter && footerEdgeShadowClass,
            classNames?.footer,
          )}
        >
          {footer !== undefined ? footer : (
            <>
              {secondaryButton}
              {primaryButton}
            </>
          )}
        </SheetFooter>
      ) : null}
    </div>
  );
}
