// Reference implementation preserved in SurveysView.v1.tsx
import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function SurveysView() {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Surveys" activeL2Key={activeItem} />;
}
