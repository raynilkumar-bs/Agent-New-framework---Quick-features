// Reference implementation preserved in PaymentsView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function PaymentsView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Payments" activeL2Key={activeItem} />;
}
