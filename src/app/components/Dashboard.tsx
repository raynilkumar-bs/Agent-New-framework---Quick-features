// Reference implementation preserved in Dashboard.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function Dashboard() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Reports" activeL2Key={activeItem} />;
}
