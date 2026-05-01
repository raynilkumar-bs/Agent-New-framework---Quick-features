import {
  IconStrip, L2NavPanel, ReviewsL2NavPanel, SocialL2NavPanel, SearchAIL2NavPanel,
  ContactsL2NavPanel, AgentsL2NavPanel, ListingsL2NavPanel, TicketingL2NavPanel,
  CampaignsL2NavPanel, SurveysL2NavPanel, InsightsL2NavPanel, CompetitorsL2NavPanel,
  ReferralsL2NavPanel, PaymentsL2NavPanel, AppointmentsL2NavPanel, InboxL2NavPanel, MynaConversationsL2NavPanel,
  BirdeyeAssistL2NavPanel,
} from "./components/Sidebar";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePersistedState } from "./hooks/usePersistedState";
import { Toaster } from "sonner";
import { MonitorNotificationsProvider } from "./context/MonitorNotificationsContext";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { SharedByMe } from "./components/SharedByMe";
import { InboxView } from "./components/InboxView";
import { ComponentShowcase } from "./components/ComponentShowcase";
import { ReviewsView } from "./components/ReviewsView";
import { SocialView } from "./components/SocialView";
import { SearchAIView } from "./components/SearchAIView";
import {
  ContactsView,
  CONTACTS_L2_KEY_ALL,
  type ContactsAppBridge,
  type ContactsSheetMode,
} from "./components/ContactsView";
import { ScheduledDeliveriesView } from "./components/ScheduledDeliveriesView";
import { AgentsMonitorView } from "./components/AgentsMonitorView";
import { AnalyzePerformanceView } from "./components/AnalyzePerformanceView";
import { AgentsBuilderView } from "./components/AgentsBuilderView";
import { AgentDetailView } from "./components/AgentDetailView";
import { AgentOnboardingView } from "./components/AgentOnboardingView";
import { ScheduleBuilderView } from "./components/ScheduleBuilderView";
import { BirdAIReportsView } from "./components/BirdAIReportsView";
import { BirdAIJourneysPlaceholderView } from "./components/BirdAIJourneysPlaceholderView";
import { ReferralsView } from "./components/ReferralsView";
import { PaymentsView } from "./components/PaymentsView";
import { AppointmentsView } from "./components/AppointmentsView";
import { SurveysView } from "./components/SurveysView";
import { TicketingView } from "./components/TicketingView";
import { ListingsView } from "./components/ListingsView";
import { CampaignsView } from "./components/CampaignsView";
import { CompetitorsView } from "./components/CompetitorsView";
import { type DraftReport } from "./components/draftStore";
import {
  APP_MAIN_CONTENT_SHELL_CLASS,
  APP_SHELL_BELOW_TOPBAR_CARD_CLASS,
  APP_SHELL_GUTTER_SURFACE_CLASS,
} from "./components/layout/appShellClasses";
import { ResizableRightChatPanel } from "./components/layout/ResizableRightChatPanel";
import { MynaChatPanel } from "./components/MynaChatPanel";
import BusinessOverviewDashboard from "./components/BusinessOverviewDashboard";
import {
  getAppViewTitle,
  LOGIN_TAB_TITLES,
  LOGIN_TAB_TITLE_COUNT,
} from "./appViewTitle";
import { l2KeyFromConversation } from "./myna/mynaL2NavKeys";
import { useMynaConversations } from "./myna/useMynaConversations";
import { ShortcutsModal } from "./shortcuts/ShortcutsModal";
import { useShortcuts } from "./shortcuts/useShortcuts";
import { ConversationStream } from "./components/ConversationStream";
import { BirdeyeAssistView } from "./components/BirdeyeAssistView";
import { BirdAILoginPage } from "./components/auth/BirdAILoginPage";
import { AppBootShimmer } from "./components/layout/AppBootShimmer";
import { SEARCH_AI_L2_DEFAULT_ACTIVE } from "./components/searchai/searchAIL2Keys";
import { UnwiredModuleView } from "./components/UnwiredModuleView";
import { L2NavBridgeProvider } from "./context/L2NavBridgeContext";
import { ChromeProvider } from "./context/ChromeContext";

const AUTH_STORAGE_KEY = "birdai_demo_authenticated";
const LOGIN_TAB_TITLE_INDEX_KEY = "auth:login_tab_title_index";

function parseStoredLoginTabIndex(raw: string | null): number {
  if (raw === null) return 0;
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) return 0;
  return ((n % LOGIN_TAB_TITLE_COUNT) + LOGIN_TAB_TITLE_COUNT) % LOGIN_TAB_TITLE_COUNT;
}

function readDemoAuthenticated(): boolean {
  // Skip login — always start authenticated for local dev
  return true;
}

export type AppView =
  | "business-overview"
  | "dashboard"
  | "shared-by-me"
  | "inbox"
  | "storybook"
  | "reviews"
  | "social"
  | "searchai"
  | "contacts"
  | "scheduled-deliveries"
  | "agents-monitor"
  | "agents-analyze-performance"
  | "agents-builder"
  | "agent-detail"
  | "agents-onboarding"
  | "schedule-builder"
  | "birdai-reports"
  | "birdai-journeys"
  | "listings"
  | "surveys"
  | "ticketing"
  | "campaigns"
  | "insights"
  | "competitors"
  | "referrals"
  | "payments"
  | "appointments"
  | "conversation-stream"
  | "birdeye-assist";

/** Brief shell shimmer after login so the first paint mirrors real app loading. */
const POST_LOGIN_BOOT_MS = 1200;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => readDemoAuthenticated());
  const [postLoginBoot, setPostLoginBoot] = useState(false);

  const signIn = useCallback(() => {
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      // Always land on Reviews after login
      sessionStorage.setItem("nav:l1:v2", JSON.stringify("business-overview"));
    } catch {
      /* ignore */
    }
    setIsAuthenticated(true);
    setPostLoginBoot(true);
  }, []);

  useEffect(() => {
    if (!postLoginBoot) return;
    const t = window.setTimeout(() => setPostLoginBoot(false), POST_LOGIN_BOOT_MS);
    return () => window.clearTimeout(t);
  }, [postLoginBoot]);

  const signOut = useCallback(() => {
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "false");
      const cur = parseStoredLoginTabIndex(sessionStorage.getItem(LOGIN_TAB_TITLE_INDEX_KEY));
      sessionStorage.setItem(
        LOGIN_TAB_TITLE_INDEX_KEY,
        String((cur + 1) % LOGIN_TAB_TITLE_COUNT),
      );
      // Clear nav state so next session starts fresh
      Object.keys(sessionStorage)
        .filter((k) => k.startsWith("nav:"))
        .forEach((k) => sessionStorage.removeItem(k));
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false);
  }, []);

  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [chromeless, setChromeless] = useState(false);
  const [currentView, setCurrentView] = usePersistedState<AppView>("nav:l1:v2", "business-overview");
  const [editingDraft, setEditingDraft] = useState<DraftReport | null>(null);
  const [selectedAgentSlug, setSelectedAgentSlug] = usePersistedState<string>("nav:l2:agents", "");
  const [selectedAnalyzeItem, setSelectedAnalyzeItem] = usePersistedState<string>("nav:l2:agents:analyze", "overview");
  /** Journeys L2 compound key — synced when navigating via `l2:` slug prefix in handleViewChange. */
  const [journeysL2ActiveKey, setJourneysL2ActiveKey] = usePersistedState<string>(
    "nav:journeys-l2-key",
    "Agents/workflow",
  );

  const [contactsL2Active, setContactsL2Active] = usePersistedState("nav:l2:contacts", CONTACTS_L2_KEY_ALL);
  const [contactsSheetMode, setContactsSheetMode] = useState<ContactsSheetMode>("none");
  const [contactsDetailId, setContactsDetailId] = useState<number | null>(null);
  const [contactsQuickViewId, setContactsQuickViewId] = useState<number | null>(null);

  const handleContactsL2Change = useCallback((key: string) => {
    setContactsL2Active(key);
    setContactsDetailId(null);
    setContactsSheetMode("none");
    setContactsQuickViewId(null);
  }, []);

  const handleContactsAddContact = useCallback(() => {
    setContactsSheetMode("addContact");
    setContactsQuickViewId(null);
  }, []);

  const contactsApp = useMemo<ContactsAppBridge>(
    () => ({
      l2ActiveItem: contactsL2Active,
      onL2ActiveItemChange: handleContactsL2Change,
      sheetMode: contactsSheetMode,
      onSheetModeChange: setContactsSheetMode,
      detailContactId: contactsDetailId,
      onDetailContactIdChange: setContactsDetailId,
      quickViewContactId: contactsQuickViewId,
      onQuickViewContactIdChange: setContactsQuickViewId,
    }),
    [
      contactsL2Active,
      handleContactsL2Change,
      contactsSheetMode,
      contactsDetailId,
      contactsQuickViewId,
    ],
  );

  useEffect(() => {
    if (currentView !== "contacts") {
      setContactsL2Active(CONTACTS_L2_KEY_ALL);
      setContactsSheetMode("none");
      setContactsDetailId(null);
      setContactsQuickViewId(null);
    }
  }, [currentView]);

  const [searchAIL2Active, setSearchAIL2Active] = usePersistedState("nav:l2:searchai", SEARCH_AI_L2_DEFAULT_ACTIVE);
  const handleSearchAIL2Change = useCallback((key: string) => {
    setSearchAIL2Active(key);
  }, []);

  useEffect(() => {
    if (currentView !== "searchai") {
      setSearchAIL2Active(SEARCH_AI_L2_DEFAULT_ACTIVE);
    }
  }, [currentView]);

  const handleViewChange = useCallback((view: AppView, slug?: string) => {
    if (view !== currentView) {
      setMynaChatExpanded(false);
    }
    if (slug?.startsWith("l2:")) {
      setJourneysL2ActiveKey(slug.slice(3));
      setCurrentView(view);
      return;
    }
    setCurrentView(view);
    if (slug) {
      if (view === "agents-analyze-performance") {
        setSelectedAnalyzeItem(slug);
      } else {
        setSelectedAgentSlug(slug);
      }
    }
  }, [currentView]);

  const handleEditDraft = (draft: DraftReport) => {
    setEditingDraft(draft);
    setMynaChatExpanded(false);
    setCurrentView("dashboard");
    setAiPanelOpen(true);
  };

  const handleViewReport = (_reportName: string) => {
    setEditingDraft(null);
    setMynaChatExpanded(false);
    setCurrentView("dashboard");
    setAiPanelOpen(true);
  };

  const handleAiPanelChange = (open: boolean) => {
    setAiPanelOpen(open);
    if (!open) setEditingDraft(null);
  };

  const [mynaChatOpen, setMynaChatOpen] = useState(false);
  const [mynaChatExpanded, setMynaChatExpanded] = useState(false);
  const [mynaComposerFocusNonce, setMynaComposerFocusNonce] = useState(0);

  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    activeConversation,
    screenTitle,
    appendUserAndAssistant,
    createEmptyConversation,
  } = useMynaConversations(getAppViewTitle(currentView));

  useEffect(() => {
    if (aiPanelOpen) setMynaChatExpanded(false);
  }, [aiPanelOpen]);

  useEffect(() => {
    if (!mynaChatOpen) setMynaChatExpanded(false);
  }, [mynaChatOpen]);

  useEffect(() => {
    if (!isAuthenticated) {
      const idx = parseStoredLoginTabIndex(sessionStorage.getItem(LOGIN_TAB_TITLE_INDEX_KEY));
      document.title = LOGIN_TAB_TITLES[idx];
      return;
    }
    document.title = `${getAppViewTitle(currentView)} – Birdeye`;
  }, [isAuthenticated, currentView]);

  const mynaWorkspaceExpanded = mynaChatOpen && mynaChatExpanded && !aiPanelOpen;

  const activeL2NavKey = useMemo(() => {
    if (!activeConversation) return "";
    return l2KeyFromConversation(activeConversation);
  }, [activeConversation]);

  const { shortcutsModalOpen, setShortcutsModalOpen } = useShortcuts({
    currentView,
    onNavigate: handleViewChange,
    mynaChatOpen,
    onMynaChatOpenChange: setMynaChatOpen,
    aiPanelOpen,
  });

  /** ChatGPT-style: new thread opens in the side panel composer — no modal. */
  const startNewMynaChat = useCallback(() => {
    setMynaChatOpen(true);
    createEmptyConversation();
    setMynaComposerFocusNonce((n) => n + 1);
  }, [createEmptyConversation]);

  const mynaChatPanelEl = (
    <MynaChatPanel
      messages={activeConversation?.messages ?? []}
      onSend={appendUserAndAssistant}
      onClose={() => setMynaChatOpen(false)}
      expanded={mynaChatExpanded}
      onToggleExpand={() => setMynaChatExpanded((e) => !e)}
      conversations={conversations}
      activeConversationId={activeConversationId}
      onSelectConversation={setActiveConversationId}
      onOpenNewChat={startNewMynaChat}
      composerFocusNonce={mynaComposerFocusNonce}
    />
  );

  const chatLayoutRef = useRef<HTMLDivElement>(null);
  const [chatLayoutWidth, setChatLayoutWidth] = useState(0);

  useLayoutEffect(() => {
    const el = chatLayoutRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setChatLayoutWidth(el.clientWidth);
    });
    ro.observe(el);
    setChatLayoutWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Views that have their own L2 panels (not the default Reports L2NavPanel)
  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <BirdAILoginPage onAuthenticated={signIn} />
      </>
    );
  }

  if (postLoginBoot) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <AppBootShimmer />
      </>
    );
  }

  const hasOwnL2Panel = (v: AppView) =>
    v === "business-overview" ||
    v === "inbox" ||
    v === "storybook" ||
    v === "reviews" ||
    v === "social" ||
    v === "searchai" ||
    v === "contacts" ||
    v === "scheduled-deliveries" ||
    v === "agents-monitor" ||
    v === "agents-analyze-performance" ||
    v === "agents-builder" ||
    v === "agent-detail" ||
    v === "agents-onboarding" ||
    v === "birdai-reports" ||
    v === "birdai-journeys" ||
    v === "listings" ||
    v === "surveys" ||
    v === "ticketing" ||
    v === "campaigns" ||
    v === "insights" ||
    v === "competitors" ||
    v === "referrals" ||
    v === "payments" ||
    v === "appointments" ||
    v === "birdeye-assist";

  return (
    <L2NavBridgeProvider currentView={currentView}>
    <ChromeProvider chromeless={chromeless} setChromeless={setChromeless}>
    <MonitorNotificationsProvider
      onNavigateToMonitor={() => {
        setMynaChatExpanded(false);
        setCurrentView("agents-monitor");
      }}
    >
    <div className="h-screen w-screen flex overflow-hidden">
      <ShortcutsModal
        open={shortcutsModalOpen}
        onOpenChange={setShortcutsModalOpen}
        currentView={currentView}
      />
      <Toaster position="top-center" richColors />

      {/* L1 icon strip – full height on the far left */}
      <IconStrip
        currentView={currentView}
        onViewChange={handleViewChange}
        onOpenKeyboardShortcuts={() => setShortcutsModalOpen(true)}
        onSignOut={signOut}
      />

      {/* Everything to the right of the icon strip */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopBar spans above both L2 nav and content */}
        <TopBar
          currentView={currentView}
          onViewChange={handleViewChange}
          mynaChatOpen={mynaChatOpen}
          onToggleMynaChat={() => setMynaChatOpen((o) => !o)}
        />

        {/* Below TopBar: L2 nav + main content side by side */}
        <div
          className={`flex-1 flex min-h-0 overflow-hidden pr-[10px] pb-[10px] pl-0 ${APP_SHELL_GUTTER_SURFACE_CLASS}`}
        >
          <div className={APP_SHELL_BELOW_TOPBAR_CARD_CLASS}>

          {/* Myna fullscreen: conversation L2 replaces product L2 */}
          {mynaWorkspaceExpanded && (
            <MynaConversationsL2NavPanel
              conversations={conversations}
              activeItem={activeL2NavKey}
              onSelectConversation={setActiveConversationId}
              onCreateNewChat={startNewMynaChat}
            />
          )}

          {/* Default Reports L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && !hasOwnL2Panel(currentView) && (
            <L2NavPanel currentView={currentView} onViewChange={handleViewChange} />
          )}

          {/* Reviews L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "reviews" && (
            <ReviewsL2NavPanel />
          )}
          {/* Social L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "social" && (
            <SocialL2NavPanel />
          )}
          {/* Search AI L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "searchai" && (
            <SearchAIL2NavPanel
              activeItem={searchAIL2Active}
              onActiveItemChange={handleSearchAIL2Change}
            />
          )}
          {/* Contacts L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "contacts" && (
            <ContactsL2NavPanel
              activeItem={contactsL2Active}
              onActiveItemChange={handleContactsL2Change}
              onAddContact={handleContactsAddContact}
            />
          )}
          {/* Listings L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "listings" && (
            <ListingsL2NavPanel />
          )}
          {/* Surveys L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "surveys" && (
            <SurveysL2NavPanel />
          )}
          {/* Ticketing L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "ticketing" && (
            <TicketingL2NavPanel />
          )}
          {/* Campaigns L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "campaigns" && (
            <CampaignsL2NavPanel />
          )}
          {/* Insights L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "insights" && (
            <InsightsL2NavPanel />
          )}
          {/* Competitors L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "competitors" && (
            <CompetitorsL2NavPanel />
          )}
          {/* Referrals L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "referrals" && (
            <ReferralsL2NavPanel />
          )}
          {/* Payments L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "payments" && (
            <PaymentsL2NavPanel />
          )}
          {/* Appointments L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "appointments" && (
            <AppointmentsL2NavPanel />
          )}
          {/* Birdeye Assist L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "birdeye-assist" && (
            <BirdeyeAssistL2NavPanel />
          )}
          {/* Inbox L2 nav panel */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && currentView === "inbox" && (
            <InboxL2NavPanel />
          )}
          {/* Agents L2 nav panel — suppressed for agents-builder (creation layout takes full width) */}
          {!chromeless && !aiPanelOpen && !mynaWorkspaceExpanded && (currentView === "agents-monitor" || currentView === "agents-analyze-performance" || currentView === "agents-onboarding" || currentView === "agent-detail" || currentView === "birdai-reports" || currentView === "birdai-journeys") && (
            <AgentsL2NavPanel
              currentView={currentView}
              onViewChange={handleViewChange}
              selectedAgentSlug={selectedAgentSlug}
              selectedAnalyzeItem={selectedAnalyzeItem}
              journeysL2ActiveKey={journeysL2ActiveKey}
            />
          )}

          {/* Main content + optional Myna chat (flex row, main keeps ≥60% when possible) */}
          <div
            ref={chatLayoutRef}
            className="flex min-h-0 min-w-0 flex-1 overflow-hidden"
          >
            {!mynaWorkspaceExpanded ? (
            <div
              className={`${APP_MAIN_CONTENT_SHELL_CLASS} min-h-0 min-w-[60%]`}
            >
            {currentView === "business-overview" ? (
              <BusinessOverviewDashboard />
            ) : currentView === "shared-by-me" ? (
              <SharedByMe onEditDraft={handleEditDraft} onViewReport={handleViewReport} />
            ) : currentView === "inbox" ? (
              <InboxView />
            ) : currentView === "storybook" ? (
              <ComponentShowcase />
            ) : currentView === "reviews" ? (
              <ReviewsView />
            ) : currentView === "social" ? (
              <SocialView />
            ) : currentView === "searchai" ? (
              <SearchAIView l2ActiveItem={searchAIL2Active} />
            ) : currentView === "contacts" ? (
              <ContactsView app={contactsApp} />
            ) : currentView === "scheduled-deliveries" ? (
              <ScheduledDeliveriesView onCreateSchedule={() => handleViewChange("schedule-builder")} />
            ) : currentView === "agents-monitor" ? (
              <AgentsMonitorView
                onBack={() => setCurrentView("agents-monitor")}
                onNavigateToReviews={() => handleViewChange("reviews")}
              />
            ) : currentView === "agents-analyze-performance" ? (
              <AnalyzePerformanceView selectedItem={selectedAnalyzeItem} />
            ) : currentView === "agents-builder" ? (
              <AgentsBuilderView onBack={() => handleViewChange("agents-monitor")} />
            ) : currentView === "agent-detail" ? (
              <AgentDetailView
                agentSlug={selectedAgentSlug}
                onOpenBuilder={(_templateName) => {
                  if (selectedAgentSlug === "scheduled-reports") {
                    handleViewChange("schedule-builder");
                  } else {
                    handleViewChange("agents-builder");
                  }
                }}
              />
            ) : currentView === "agents-onboarding" ? (
              <AgentOnboardingView
                onComplete={() => handleViewChange("agents-monitor")}
                onSkip={() => handleViewChange("agents-monitor")}
                onGoToMonitor={() => handleViewChange("agents-monitor")}
              />
            ) : currentView === "schedule-builder" ? (
              <ScheduleBuilderView onBack={() => handleViewChange("agent-detail", "scheduled-reports")} />
            ) : currentView === "birdai-reports" ? (
              <BirdAIReportsView />
            ) : currentView === "birdai-journeys" ? (
              <BirdAIJourneysPlaceholderView journeysL2Key={journeysL2ActiveKey} />
            ) : currentView === "listings" ? (
              <ListingsView />
            ) : currentView === "surveys" ? (
              <SurveysView />
            ) : currentView === "ticketing" ? (
              <TicketingView />
            ) : currentView === "campaigns" ? (
              <CampaignsView />
            ) : currentView === "insights" ? (
              <Dashboard
                aiPanelOpen={aiPanelOpen}
                onAiPanelChange={handleAiPanelChange}
                editingDraft={editingDraft}
              />
            ) : currentView === "competitors" ? (
              <CompetitorsView />
            ) : currentView === "referrals" ? (
              <ReferralsView />
            ) : currentView === "payments" ? (
              <PaymentsView />
            ) : currentView === "appointments" ? (
              <AppointmentsView />
            ) : currentView === "conversation-stream" ? (
              <ConversationStream />
            ) : currentView === "birdeye-assist" ? (
              <BirdeyeAssistView />
            ) : (
              // Any route added to AppView but not yet wired up shows a
              // helpful placeholder instead of a blank screen.
              <UnwiredModuleView currentView={currentView} />
            )}
            </div>
            ) : null}
            <ResizableRightChatPanel
              open={mynaChatOpen}
              workspaceExpanded={mynaWorkspaceExpanded}
              layoutRowWidth={chatLayoutWidth}
            >
              {mynaChatPanelEl}
            </ResizableRightChatPanel>
          </div>
          </div>
        </div>
      </div>
    </div>
    </MonitorNotificationsProvider>
    </ChromeProvider>
    </L2NavBridgeProvider>
  );
}
