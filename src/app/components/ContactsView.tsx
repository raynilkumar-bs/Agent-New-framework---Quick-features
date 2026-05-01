// Reference implementation preserved in ContactsView.v1.tsx
// These type/const exports are required by App.tsx — do not remove.
export { CONTACTS_L2_KEY_ALL } from "./ContactsView.v1";
export type { ContactsAppBridge, ContactsSheetMode } from "./ContactsView.v1";

import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
import { ModuleEmptyState } from "@/app/components/layout/ModuleEmptyState";

export function ContactsView(_props?: { app?: import("./ContactsView.v1").ContactsAppBridge }) {
  const activeItem = useActiveL2Item();
  return <ModuleEmptyState moduleName="Contacts" activeL2Key={activeItem} />;
}
