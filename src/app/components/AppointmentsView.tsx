// Reference implementation preserved in AppointmentsView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function AppointmentsView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Appointments" activeL2Key={activeItem} />;
}
