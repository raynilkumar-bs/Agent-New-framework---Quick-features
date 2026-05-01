// Reference implementation preserved in ListingsView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function ListingsView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Listings" activeL2Key={activeItem} />;
}
