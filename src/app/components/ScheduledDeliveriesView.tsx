// Reference implementation preserved in ScheduledDeliveriesView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function ScheduledDeliveriesView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Campaigns" activeL2Key={activeItem} />;
}
