import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { monitorActivities, type MonitorActivity } from "@/app/data/agentsMonitorMock";

export interface MonitorNotificationItem {
  id: string;
  agentName: string;
  summary: string;
  time: string;
  severity: "warning" | "error";
  activityRef: MonitorActivity;
  quickAction: string;
}

interface MonitorNotificationsContextValue {
  monitorActivities: MonitorActivity[];
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;
  notifPanelOpen: boolean;
  setNotifPanelOpen: (open: boolean) => void;
  notificationItems: MonitorNotificationItem[];
  unresolvedNotifs: MonitorNotificationItem[];
  unresolvedCount: number;
  resolvedNotifs: Set<string>;
  readNotifs: Set<string>;
  handleResolveNotif: (id: string) => void;
  handleNotifClick: (notif: MonitorNotificationItem) => void;
}

const MonitorNotificationsContext = createContext<MonitorNotificationsContextValue | null>(null);

export function MonitorNotificationsProvider({
  children,
  onNavigateToMonitor,
}: {
  children: ReactNode;
  onNavigateToMonitor: () => void;
}) {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [resolvedNotifs, setResolvedNotifs] = useState<Set<string>>(() => new Set());
  const [readNotifs, setReadNotifs] = useState<Set<string>>(() => new Set());

  const notificationItems = useMemo((): MonitorNotificationItem[] => {
    return monitorActivities
      .filter(a => a.status === "warning" || a.status === "error")
      .map(a => ({
        id: a.id,
        agentName: a.agentName,
        summary:
          a.status === "warning"
            ? a.hasDraft
              ? "Drafted response requires approval"
              : "Action flagged — requires review"
            : a.detail?.includes("token")
              ? "Post failed due to token expiration"
              : "Action failed — needs manual intervention",
        time: a.time,
        severity: a.status as "warning" | "error",
        activityRef: a,
        quickAction: a.status === "warning" ? (a.hasDraft ? "Review" : "Inspect") : "Fix connection",
      }));
  }, []);

  const unresolvedNotifs = useMemo(
    () => notificationItems.filter(n => !resolvedNotifs.has(n.id)),
    [notificationItems, resolvedNotifs],
  );
  const unresolvedCount = unresolvedNotifs.length;

  const handleResolveNotif = useCallback((id: string) => {
    setResolvedNotifs(prev => new Set(prev).add(id));
  }, []);

  const handleNotifClick = useCallback(
    (notif: MonitorNotificationItem) => {
      setReadNotifs(prev => new Set(prev).add(notif.id));
      onNavigateToMonitor();
      setSelectedActivityId(notif.id);
      setNotifPanelOpen(false);
    },
    [onNavigateToMonitor],
  );

  const value = useMemo(
    (): MonitorNotificationsContextValue => ({
      monitorActivities,
      selectedActivityId,
      setSelectedActivityId,
      notifPanelOpen,
      setNotifPanelOpen,
      notificationItems,
      unresolvedNotifs,
      unresolvedCount,
      resolvedNotifs,
      readNotifs,
      handleResolveNotif,
      handleNotifClick,
    }),
    [
      selectedActivityId,
      notifPanelOpen,
      notificationItems,
      unresolvedNotifs,
      unresolvedCount,
      resolvedNotifs,
      readNotifs,
      handleResolveNotif,
      handleNotifClick,
    ],
  );

  return (
    <MonitorNotificationsContext.Provider value={value}>
      {children}
    </MonitorNotificationsContext.Provider>
  );
}

export function useMonitorNotifications(): MonitorNotificationsContextValue {
  const ctx = useContext(MonitorNotificationsContext);
  if (!ctx) {
    throw new Error("useMonitorNotifications must be used within MonitorNotificationsProvider");
  }
  return ctx;
}
