// Reference implementation preserved in AgentsBuilderView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function AgentsBuilderView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Agents" activeL2Key={activeItem} />;
}
