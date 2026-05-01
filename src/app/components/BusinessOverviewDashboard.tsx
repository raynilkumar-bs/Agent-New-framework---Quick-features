// Reference implementation preserved in BusinessOverviewDashboard.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function BusinessOverviewDashboard() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Home" activeL2Key={activeItem} />;
}

export default BusinessOverviewDashboard;
