// Reference implementation preserved in CompetitorsView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function CompetitorsView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Competitors" activeL2Key={activeItem} />;
}
