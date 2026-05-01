import { Bell, CheckCircle2, X } from "lucide-react";
import { L1_STRIP_ICON_SIZE, L1_STRIP_ICON_STROKE_PX } from "@/app/components/l1StripIconTokens";
import { Button } from "@/app/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { cn } from "@/app/components/ui/utils";
import { useMonitorNotifications } from "@/app/context/MonitorNotificationsContext";

/**
 * L1 rail trigger + popover for agent monitor notifications.
 * Uses UI Popover (Radix) for anchoring to the right, focus, and dismiss behavior.
 */
export function MonitorNotificationsTrigger() {
  const {
    notifPanelOpen,
    setNotifPanelOpen,
    notificationItems,
    unresolvedCount,
    resolvedNotifs,
    handleResolveNotif,
    handleNotifClick,
  } = useMonitorNotifications();

  return (
    <Popover open={notifPanelOpen} onOpenChange={setNotifPanelOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Notifications"
          aria-label="Notifications"
          aria-expanded={notifPanelOpen}
          aria-haspopup="dialog"
          className={cn(
            "group relative shrink-0 rounded-[10px] transition-all duration-200 ease-out",
            "bg-transparent hover:bg-[#d4dae3] dark:hover:bg-[#282e3a] active:bg-[#c8d0dc] dark:active:bg-[#313845] hover:scale-110 active:scale-95",
            "focus-visible:ring-2 focus-visible:ring-[#1E44CC]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#e0e5eb] dark:focus-visible:ring-offset-[#181b22]",
            /* Open popover = same surface as L1 active item */
            "data-[state=open]:bg-[#d4dae3] dark:data-[state=open]:bg-[#282e3a] data-[state=open]:shadow-none",
          )}
        >
          <Bell
            width={L1_STRIP_ICON_SIZE}
            height={L1_STRIP_ICON_SIZE}
            strokeWidth={L1_STRIP_ICON_STROKE_PX}
            className={cn(
              "transition-all duration-200",
              "text-[#505050] dark:text-[#9ba2b0]",
              "group-hover:text-[#1E44CC] dark:group-hover:text-[#2952E3] group-active:text-[#1E44CC] dark:group-active:text-[#2952E3]",
              "group-data-[state=open]:text-[#1E44CC] dark:group-data-[state=open]:text-[#2952E3] group-hover:scale-110",
            )}
            aria-hidden
          />
          {unresolvedCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center px-0.5 bg-destructive text-destructive-foreground text-[9px] rounded-full tabular-nums"
              style={{ fontWeight: 400 }}
            >
              {unresolvedCount > 9 ? "9+" : unresolvedCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="end"
        sideOffset={8}
        aria-label="Notifications"
        className={cn(
          "w-[min(400px,calc(100vw-88px))] max-h-[min(480px,70vh)] p-0 flex flex-col overflow-hidden rounded-xl border-0 shadow-sm z-[100]",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <h4 className="text-[14px] tracking-[-0.28px]" style={{ fontWeight: 400 }}>
            Notifications
          </h4>
          <div className="flex items-center gap-2">
            {unresolvedCount > 0 && (
              <span
                className="text-[11px] text-muted-foreground px-2 py-0.5 bg-muted rounded-full"
                style={{ fontWeight: 300 }}
              >
                {unresolvedCount} unresolved
              </span>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setNotifPanelOpen(false)}
              className="shrink-0"
              aria-label="Close notifications"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-border">
          {notificationItems.filter(n => n.severity === "warning" && !resolvedNotifs.has(n.id)).length > 0 && (
            <div>
              <div className="px-4 py-2">
                <span
                  className="text-[10px] text-amber-700 dark:text-amber-400 tracking-[0.5px] uppercase"
                  style={{ fontWeight: 400 }}
                >
                  Requires review
                </span>
              </div>
              {notificationItems
                .filter(n => n.severity === "warning" && !resolvedNotifs.has(n.id))
                .map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleNotifClick(n)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/80 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-foreground truncate" style={{ fontWeight: 400 }}>
                        {n.agentName}
                      </p>
                      <p className="text-[12px] text-muted-foreground mt-0.5" style={{ fontWeight: 300 }}>
                        {n.summary}
                      </p>
                      <span className="text-[10px] text-muted-foreground tabular-nums" style={{ fontWeight: 300 }}>
                        {n.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      <span
                        className="text-[11px] text-primary hover:underline"
                        style={{ fontWeight: 400 }}
                      >
                        {n.quickAction}
                      </span>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); handleResolveNotif(n.id); }}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted transition-colors"
                        title="Mark as resolved"
                        aria-label="Mark as resolved"
                      >
                        <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {notificationItems.filter(n => n.severity === "error" && !resolvedNotifs.has(n.id)).length > 0 && (
            <div>
              <div className="px-4 py-2">
                <span className="text-[10px] text-destructive tracking-[0.5px] uppercase" style={{ fontWeight: 400 }}>
                  Failed actions
                </span>
              </div>
              {notificationItems
                .filter(n => n.severity === "error" && !resolvedNotifs.has(n.id))
                .map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleNotifClick(n)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/80 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-foreground truncate" style={{ fontWeight: 400 }}>
                        {n.agentName}
                      </p>
                      <p className="text-[12px] text-muted-foreground mt-0.5" style={{ fontWeight: 300 }}>
                        {n.summary}
                      </p>
                      <span className="text-[10px] text-muted-foreground tabular-nums" style={{ fontWeight: 300 }}>
                        {n.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      <span
                        className="text-[11px] text-primary hover:underline"
                        style={{ fontWeight: 400 }}
                      >
                        {n.quickAction}
                      </span>
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); handleResolveNotif(n.id); }}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted transition-colors"
                        title="Mark as resolved"
                        aria-label="Mark as resolved"
                      >
                        <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {notificationItems.filter(n => resolvedNotifs.has(n.id)).length > 0 && (
            <div>
              <div className="px-4 py-2">
                <span className="text-[10px] text-[#4caf50] tracking-[0.5px] uppercase" style={{ fontWeight: 400 }}>
                  Resolved
                </span>
              </div>
              {notificationItems
                .filter(n => resolvedNotifs.has(n.id))
                .map(n => (
                  <div key={n.id} className="flex items-center gap-3 px-4 py-2.5 opacity-60">
                    <span className="text-[10px] text-muted-foreground shrink-0 uppercase tracking-wide" style={{ fontWeight: 400 }}>
                      Done
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-muted-foreground truncate" style={{ fontWeight: 300 }}>
                        {n.agentName} — {n.summary}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums shrink-0" style={{ fontWeight: 300 }}>
                      {n.time}
                    </span>
                  </div>
                ))}
            </div>
          )}

          {unresolvedCount === 0 && notificationItems.filter(n => resolvedNotifs.has(n.id)).length === 0 && (
            <div className="py-8 px-4 text-center">
              <p className="text-[13px] text-muted-foreground" style={{ fontWeight: 300 }}>
                No notifications
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
