// Reference implementation preserved in SearchAIView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

// l2ActiveItem prop kept for backward compat but superseded by useActiveL2Item()
export function SearchAIView(_props?: { l2ActiveItem?: string }) {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Search AI" activeL2Key={activeItem} />;
}
