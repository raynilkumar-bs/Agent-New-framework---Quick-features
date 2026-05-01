import type { ReactNode } from "react";

interface ModuleHeaderProps {
  /** Main page title — shown large on the left */
  title: string;
  /** Optional subtitle shown below the title */
  subtitle?: string;
  /** Optional breadcrumb shown above the title */
  breadcrumb?: ReactNode;
  /** Buttons / controls shown on the right side */
  actions?: ReactNode;
  /** Tab bar shown below the title row (use <Tabs> from ui/tabs) */
  tabs?: ReactNode;
}

/**
 * Standard page header used by every feature module.
 *
 * Usage:
 * ```tsx
 * import { ModuleHeader } from "@/app/components/layout/ModuleHeader";
 *
 * <ModuleHeader
 *   title="Billing"
 *   subtitle="Manage your subscription and invoices"
 *   actions={<Button size="sm">Add payment method</Button>}
 *   tabs={<Tabs value="invoices">...</Tabs>}
 * />
 * ```
 */
export function ModuleHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  tabs,
}: ModuleHeaderProps) {
  return (
    <div className="shrink-0 border-b border-[#e5e9f0] dark:border-[#252b35] bg-white dark:bg-[#1e2229]">
      <div className="flex items-start justify-between px-6 pt-5 pb-4">
        <div className="flex flex-col gap-0.5">
          {breadcrumb && (
            <div className="text-xs text-[#6b7280] dark:text-[#9ca3af] mb-0.5">
              {breadcrumb}
            </div>
          )}
          <h1 className="text-[18px] font-normal text-[#111827] dark:text-[#f3f4f6] tracking-[-0.36px]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 ml-4 shrink-0 pt-0.5">
            {actions}
          </div>
        )}
      </div>
      {tabs && <div className="px-6 pb-0">{tabs}</div>}
    </div>
  );
}
