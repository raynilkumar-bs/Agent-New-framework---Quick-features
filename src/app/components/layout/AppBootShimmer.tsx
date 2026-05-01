import {
  APP_MAIN_CONTENT_SHELL_CLASS,
  APP_SHELL_BELOW_TOPBAR_CARD_CLASS,
  APP_SHELL_GUTTER_SURFACE_CLASS,
  APP_SHELL_RAIL_SURFACE_CLASS,
} from "./appShellClasses";

/**
 * Minimal post-login shell placeholder — light chrome outline + soft content block.
 */
export function AppBootShimmer() {
  return (
    <div
      className={`flex h-screen w-screen overflow-hidden ${APP_SHELL_GUTTER_SURFACE_CLASS}`}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading workspace</span>

      {/* L1 rail */}
      <div className={`flex w-[66px] shrink-0 flex-col items-center ${APP_SHELL_RAIL_SURFACE_CLASS}`}>
        <div className="flex h-[48px] w-[55px] shrink-0 items-center justify-center">
          <div className="size-[18px] rounded-sm bg-[#2552ED]/30" aria-hidden />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 px-2 pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="size-8 shrink-0 rounded-[10px] bg-black/[0.07] dark:bg-white/[0.07]"
              aria-hidden
            />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div
          className={`flex h-[48px] shrink-0 items-center justify-between rounded-tr-lg px-4 ${APP_SHELL_RAIL_SURFACE_CLASS}`}
        >
          <div className="h-4 w-36 max-w-[50%] rounded-md bg-black/[0.08] dark:bg-white/[0.08]" />
          <div className="h-[30px] w-20 shrink-0 rounded-lg bg-black/[0.07] dark:bg-white/[0.07]" />
        </div>

        <div
          className={`flex min-h-0 flex-1 overflow-hidden pl-0 pr-[10px] pb-[10px] ${APP_SHELL_GUTTER_SURFACE_CLASS}`}
        >
          <div className={APP_SHELL_BELOW_TOPBAR_CARD_CLASS}>
            {/* L2 */}
            <div className="flex h-full w-[220px] shrink-0 flex-col gap-2 rounded-bl-lg rounded-tl-lg border-r border-app-shell-border bg-app-shell-l2-surface p-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-black/[0.06] dark:bg-white/[0.06]"
                  style={{ width: `${72 + (i % 3) * 8}%` }}
                />
              ))}
            </div>

            <div className={`${APP_MAIN_CONTENT_SHELL_CLASS} min-h-0`}>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-6">
                <div className="mb-4 h-5 w-44 max-w-[60%] rounded-md bg-black/[0.07] dark:bg-white/[0.08]" />
                <div className="min-h-0 flex-1 rounded-lg bg-black/[0.04] animate-pulse dark:bg-white/[0.05]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
