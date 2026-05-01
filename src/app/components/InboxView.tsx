// Reference implementation preserved in InboxView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function InboxView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Inbox" activeL2Key={activeItem} />;
}
