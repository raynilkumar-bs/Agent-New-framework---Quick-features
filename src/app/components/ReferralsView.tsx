// Reference implementation preserved in ReferralsView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function ReferralsView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Referrals" activeL2Key={activeItem} />;
}
