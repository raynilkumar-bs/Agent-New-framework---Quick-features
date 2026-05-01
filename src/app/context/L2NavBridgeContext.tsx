/**
 * L2NavBridgeContext
 *
 * Connects every L2 navigation panel to the module view currently on screen.
 * When a user clicks any L2 item, that key is broadcast through this context.
 * Module views subscribe with useActiveL2Item() to render the right content
 * — or show a clear ModuleEmptyState when no content has been built yet.
 *
 * USAGE IN MODULE VIEWS:
 *
 *   import { useActiveL2Item } from "@/app/context/L2NavBridgeContext";
 *
 *   export function InventoryView() {
 *     const activeItem = useActiveL2Item(); // e.g. "Actions/Stock levels"
 *     const [section, item] = activeItem.split("/");
 *
 *     if (section === "Actions" && item === "Stock levels") {
 *       return <StockLevelsContent />;
 *     }
 *     // Default → clear empty state for any unbuilt section
 *     return <ModuleEmptyState moduleName="Inventory" activeL2Key={activeItem} />;
 *   }
 *
 * WIRING (already done in App.tsx):
 *   <L2NavBridgeProvider onViewChange={currentView}>
 *     {children}
 *   </L2NavBridgeProvider>
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface L2NavBridgeValue {
  activeItem: string;
  setActiveItem: (key: string) => void;
}

const L2NavBridgeContext = createContext<L2NavBridgeValue>({
  activeItem: "",
  setActiveItem: () => {},
});

interface L2NavBridgeProviderProps {
  /** Pass currentView so the active item resets whenever the user switches modules. */
  currentView: string;
  children: ReactNode;
}

export function L2NavBridgeProvider({ currentView, children }: L2NavBridgeProviderProps) {
  const [activeItem, setActiveItemState] = useState("");

  // Reset when the top-level view changes so stale L2 state never bleeds across modules.
  useEffect(() => {
    setActiveItemState("");
  }, [currentView]);

  const setActiveItem = useCallback((key: string) => {
    setActiveItemState(key);
  }, []);

  return (
    <L2NavBridgeContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </L2NavBridgeContext.Provider>
  );
}

/**
 * Returns the currently-active L2 nav key for the visible module.
 * Key format is either "SectionLabel/ItemLabel" (collapsible sections)
 * or "standalone/ItemLabel" (flat standalone items).
 *
 * Empty string means no L2 item has been clicked yet in this module.
 */
export function useActiveL2Item(): string {
  return useContext(L2NavBridgeContext).activeItem;
}

/** Internal — used only by L2NavLayout to publish its active item. */
export function useL2NavBridgeSetter(): (key: string) => void {
  return useContext(L2NavBridgeContext).setActiveItem;
}
