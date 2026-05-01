// Reference implementation preserved in AgentLibraryView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function AgentLibraryView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Agents" activeL2Key={activeItem} />;
}

export default AgentLibraryView;
