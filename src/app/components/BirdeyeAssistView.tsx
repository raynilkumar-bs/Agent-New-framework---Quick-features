// Reference implementation preserved in BirdeyeAssistView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function BirdeyeAssistView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Birdeye Assist" activeL2Key={activeItem} />;
}
