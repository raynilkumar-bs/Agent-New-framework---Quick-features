import { useState, useRef, useEffect, type RefObject } from "react";
import { Button } from "@/app/components/ui/button";
import {
  INBOX_SHORTCUT_EVENT,
  type InboxShortcutAction,
} from "@/app/shortcuts/events";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Smile,
  Paperclip,
  Image as ImageIcon,
  Reply,
  AlignLeft,
  MessageSquarePlus,
  Mail,
} from "lucide-react";

/* ─── Types ─── */
interface Conversation {
  id: string;
  name: string;
  preview: string;
  lastMessage: string;
  date: string;
  location: string;
  team: string;
  teamIcon: "us" | "kelsy";
  unread: boolean;
  hasReply?: boolean;
  replyTime?: string;
}

interface ChatMessage {
  id: string;
  sender: "customer" | "agent";
  text: string;
  time: string;
  sentVia?: string;
}

interface ConversationDetail {
  contactName: string;
  assignedTo: string;
  assignedAvatar: string;
  dateSeparator: string;
  messages: ChatMessage[];
}

/* ─── Mock data ─── */
const conversations: Conversation[] = [
  {
    id: "1",
    name: "Annette Black",
    preview: "Kelsy Hiltz: yes",
    lastMessage: "Kelsy Hiltz: yes",
    date: "Dec 31, 2022",
    location: "San Francisco",
    team: "Kelsy Hiltz",
    teamIcon: "kelsy",
    unread: false,
  },
  {
    id: "2",
    name: "Wade Warren",
    preview: "Robin: Was your question answered?",
    lastMessage: "Robin: Was your question answered?",
    date: "Dec 11, 2022",
    location: "San Francisco",
    team: "USA - Sales",
    teamIcon: "us",
    unread: false,
  },
  {
    id: "3",
    name: "Cameron Williamson",
    preview: "You can find more details here: https://birdeye.com",
    lastMessage: "You can find more details here: https://birdeye.com",
    date: "",
    location: "Austin",
    team: "Savannah",
    teamIcon: "kelsy",
    unread: false,
    hasReply: true,
    replyTime: "03:25 PM",
  },
  {
    id: "4",
    name: "Floyd Miles",
    preview: "Robin: Was your question answered?",
    lastMessage: "Robin: Was your question answered?",
    date: "Dec 11, 2022",
    location: "San Francisco",
    team: "USA - Sales",
    teamIcon: "us",
    unread: false,
  },
  {
    id: "5",
    name: "Brooklyn Simmons",
    preview: "Robin: Was your question answered?",
    lastMessage: "Robin: Was your question answered?",
    date: "Dec 11, 2022",
    location: "San Francisco",
    team: "USA - Sales",
    teamIcon: "us",
    unread: false,
  },
  {
    id: "6",
    name: "Marvin McKinney",
    preview: "Robin: Was your question answered?",
    lastMessage: "Robin: Was your question answered?",
    date: "Dec 11, 2022",
    location: "San Francisco",
    team: "USA - Sales",
    teamIcon: "us",
    unread: false,
  },
  {
    id: "7",
    name: "Floyd Miles",
    preview: "please don't hesitate to reach out to us",
    lastMessage: "please don't hesitate to reach out to us",
    date: "Dec 11, 2022",
    location: "San Francisco",
    team: "USA - Sales",
    teamIcon: "us",
    unread: true,
  },
  {
    id: "8",
    name: "Jerome Bell",
    preview: "Robin: Was your question answered?",
    lastMessage: "Robin: Was your question answered?",
    date: "Dec 11, 2022",
    location: "San Francisco",
    team: "USA - Sales",
    teamIcon: "us",
    unread: false,
  },
];

const conversationDetails: Record<string, ConversationDetail> = {
  "3": {
    contactName: "Cameron Williamson",
    assignedTo: "Savannah",
    assignedAvatar:
      "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjE3MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dateSeparator: "Thu • Dec 17",
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "I've sent you my preferred date and time through the appointment scheduling tool. Additionally, can you guide me through the payment options available?",
        time: "09:12 PM",
      },
      {
        id: "m2",
        sender: "agent",
        text: "No problem! I have sent the survey link to your email address. Your feedback is very valuable to us, and we appreciate you taking the time to share it. If you have any further questions or concerns, please don't hesitate to reach out to us. Have a great day!",
        time: "09:12 PM",
        sentVia: "Sent via Birdeye",
      },
    ],
  },
  "1": {
    contactName: "Annette Black",
    assignedTo: "Kelsy Hiltz",
    assignedAvatar:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzIwNDIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dateSeparator: "Fri • Dec 30",
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hi, I'd like to check on the status of my recent order. Can you help me with that?",
        time: "10:30 AM",
      },
      {
        id: "m2",
        sender: "agent",
        text: "Of course! Let me pull up your order details. Could you provide me with your order number?",
        time: "10:32 AM",
      },
      {
        id: "m3",
        sender: "customer",
        text: "Yes, it's #ORD-2847391. I placed it last week.",
        time: "10:33 AM",
      },
      {
        id: "m4",
        sender: "agent",
        text: "I found your order. It's currently being processed and should ship within the next 24 hours. You'll receive a tracking number via email once it's dispatched.",
        time: "10:35 AM",
        sentVia: "Sent via Birdeye",
      },
      {
        id: "m5",
        sender: "customer",
        text: "yes",
        time: "10:45 AM",
      },
    ],
  },
};

// Generate default detail for conversations without specific detail
function getDetail(id: string): ConversationDetail {
  if (conversationDetails[id]) return conversationDetails[id];
  const conv = conversations.find((c) => c.id === id);
  return {
    contactName: conv?.name ?? "Unknown",
    assignedTo: "Robin",
    assignedAvatar:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzIwNDIwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dateSeparator: "Mon • Dec 11",
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hi, I have a question about your services. Could you help me understand the different plans available?",
        time: "02:15 PM",
      },
      {
        id: "m2",
        sender: "agent",
        text: "Was your question answered? Please let us know if you need any further assistance.",
        time: "02:45 PM",
        sentVia: "Sent via Birdeye",
      },
    ],
  };
}

/* ═════════════════════════════════════
   Conversation List Item
   ═════════════════════════════════════ */
function ConversationItem({
  conv,
  isSelected,
  onClick,
}: {
  conv: Conversation;
  isSelected: boolean;
  onClick: () => void;
}) {
  const isHighlighted = conv.id === "3" && isSelected;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 transition-colors duration-150 relative group ${
        isHighlighted
          ? "bg-[#d9ebfd] dark:bg-[#1e2d5e]"
          : isSelected
          ? "bg-[#f0f4ff] dark:bg-[#252a3a]"
          : "bg-white dark:bg-[#1e2229] hover:bg-[#f8f9fc] dark:hover:bg-[#262b35]"
      }`}
    >
      {/* Unread dot */}
      {conv.unread && (
        <span className="absolute left-1.5 top-[22px] w-[6px] h-[6px] rounded-full bg-[#1876D1]" />
      )}

      <div className="flex flex-col gap-1.5">
        {/* Row 1: Name + date/reply */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[14px] text-[#212121] dark:text-[#e4e4e4] truncate ${
              conv.unread ? "" : ""
            }`}
            style={{ fontWeight: 400 }}
          >
            {conv.name}
          </span>
          <span className="flex items-center gap-1.5 shrink-0 ml-2">
            {conv.hasReply && (
              <Reply className="w-3 h-3 text-[#909090] dark:text-[#6b7280] -scale-x-100" />
            )}
            <span
              className="text-[12px] text-[#212121]/50 dark:text-[#e4e4e4]/50 whitespace-nowrap"
              style={{ fontWeight: 400 }}
            >
              {conv.hasReply ? conv.replyTime : conv.date}
            </span>
          </span>
        </div>

        {/* Row 2: Preview text */}
        <p
          className="text-[13px] text-[#212121] dark:text-[#c0c6d4] truncate"
          style={{ fontWeight: 400 }}
        >
          {conv.preview}
        </p>

        {/* Row 3: Location + team */}
        <div className="flex items-center gap-1 text-[12px] text-[#8a898e] dark:text-[#6b7280]">
          <span style={{ fontWeight: 400 }}>{conv.location}</span>
          <span>•</span>
          {conv.teamIcon === "us" && (
            <span className="inline-flex items-center gap-1">
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                className="opacity-80"
              >
                <rect width="12" height="9" rx="1" fill="#B22234" />
                <rect y="1.29" width="12" height="0.69" fill="white" />
                <rect y="2.57" width="12" height="0.69" fill="white" />
                <rect y="3.86" width="12" height="0.69" fill="white" />
                <rect y="5.14" width="12" height="0.69" fill="white" />
                <rect y="6.43" width="12" height="0.69" fill="white" />
                <rect y="7.71" width="12" height="0.69" fill="white" />
                <rect width="5" height="4.5" fill="#3C3B6E" />
              </svg>
              <span style={{ fontWeight: 400 }}>{conv.team}</span>
            </span>
          )}
          {conv.teamIcon === "kelsy" && (
            <span className="inline-flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#e0e5eb] dark:bg-[#3d4555] inline-block"
                aria-hidden
              />
              <span style={{ fontWeight: 400 }}>{conv.team}</span>
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ═════════════════════════════════════
   Chat Bubble
   ═════════════════════════════════════ */
function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isAgent = msg.sender === "agent";

  return (
    <div
      className={`flex flex-col ${isAgent ? "items-end" : "items-start"} mb-2`}
    >
      <div
        className={`max-w-[420px] px-4 py-3 rounded-2xl text-[14px] leading-[21px] ${
          isAgent
            ? "bg-[#e3f0ff] dark:bg-[#1e3a5f] text-[#212121] dark:text-[#e4e4e4] rounded-br-md"
            : "bg-white dark:bg-[#262b35] text-[#212121] dark:text-[#e4e4e4] shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] rounded-bl-md"
        }`}
        style={{ fontWeight: 400 }}
      >
        {msg.text}
      </div>
      <div className="flex items-center gap-2 mt-1.5 px-1">
        {msg.sentVia && (
          <span
            className="text-[11px] text-[#b0b0b0] dark:text-[#5a6170] italic"
            style={{ fontWeight: 400 }}
          >
            {msg.sentVia}
          </span>
        )}
        <span
          className="text-[11px] text-[#999] dark:text-[#5a6170]"
          style={{ fontWeight: 400 }}
        >
          {msg.time}
        </span>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   Composer Bar
   ═════════════════════════════════════ */
function Composer({ textareaRef }: { textareaRef: RefObject<HTMLTextAreaElement | null> }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [message, textareaRef]);

  return (
    <div className="border-t border-[#eaeaea] dark:border-[#333a47] bg-white dark:bg-[#1e2229] px-5 py-3 transition-colors duration-300">
      {/* Channel selector */}
      <div className="flex items-center gap-1 mb-2">
        <button className="flex items-center gap-1 text-[13px] text-[#2552ED] hover:text-[#1E44CC] transition-colors">
          <span style={{ fontWeight: 400 }}>Text</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Input area */}
      <div className="bg-[#f8f9fa] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-xl px-4 py-2.5 transition-colors duration-300 focus-within:border-[#2552ED] dark:focus-within:border-[#2552ED]">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message or use a template"
          rows={1}
          className="w-full bg-transparent text-[14px] text-[#212121] dark:text-[#e4e4e4] placeholder:text-[#b0b0b0] dark:placeholder:text-[#4d5568] outline-none resize-none"
          style={{ fontWeight: 400 }}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex items-center gap-1">
          {[
            { Icon: AlignLeft, label: "Templates" },
            { Icon: Smile, label: "Emoji" },
            { Icon: Paperclip, label: "Attach" },
            { Icon: Smile, label: "Sticker" },
            { Icon: ImageIcon, label: "Image" },
          ].map(({ Icon, label }, i) => (
            <Button
              key={i}
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-lg hover:bg-[#f0f0f0] dark:hover:bg-[#2e3340]"
              title={label}
            >
              <Icon className="w-[14px] h-[14px] text-[#212121] dark:text-[#c0c6d4]" />
            </Button>
          ))}
        </div>

        <Button
          type="button"
          className={`gap-1.5 rounded-lg pl-4 pr-1 text-[13px] font-normal text-white ${
            message.trim()
              ? "bg-[#2552ED] hover:bg-[#1E44CC]"
              : "bg-[#2552ED]/70 hover:bg-[#2552ED]/75 dark:bg-[#2552ED]/50 dark:hover:bg-[#2552ED]/55"
          }`}
          style={{ fontWeight: 400 }}
        >
          Send
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15">
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </Button>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   Inbox Left Nav Panel
   ═════════════════════════════════════ */
function InboxNav() {
  const [activeItem, setActiveItem] = useState("All messages");
  const [assignmentOpen, setAssignmentOpen] = useState(true);
  const [leadsOpen, setLeadsOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const assignmentItems = [
    "Assigned to me",
    "Assigned to AI agents",
    "Assigned to others",
    "Unassigned",
  ];

  return (
    <div className="w-[220px] bg-[#f0f1f5] dark:bg-[#1e2229] border-r border-[#f0f1f5] dark:border-[#2e3340] rounded-tl-lg flex flex-col h-full overflow-hidden shrink-0 transition-colors duration-300">
      <div className="flex-1 overflow-y-auto px-2 pt-4 pb-2">
        <div className="flex flex-col gap-0.5">
          {/* New message */}
          <button className="flex items-center justify-between px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]">
            <span>New message</span>
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <MessageSquarePlus className="w-[15px] h-[15px] text-[#2552ED]" />
            </div>
          </button>

          {/* All messages */}
          <button
            onClick={() => setActiveItem("All messages")}
            className={`flex items-center gap-2.5 px-2 py-1.5 w-full text-[14px] rounded-[4px] transition-colors tracking-[-0.28px] ${
              activeItem === "All messages"
                ? "text-[#2552ED] bg-[#e4e6ea] dark:bg-[#252a3a] dark:text-[#6b9bff]"
                : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340]"
            }`}
          >
            
            All messages
          </button>

          {/* Assignment section */}
          <div>
            <button
              onClick={() => setAssignmentOpen(!assignmentOpen)}
              className="flex items-center justify-between px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]"
            >
              <span>Assignment</span>
              <div className="w-[20px] h-[20px] flex items-center justify-center">
                {assignmentOpen ? (
                  <ChevronDown className="w-3 h-3 text-[#303030] dark:text-[#8b92a5]" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-[#303030] dark:text-[#8b92a5]" />
                )}
              </div>
            </button>
            {assignmentOpen && (
              <div className="flex flex-col gap-0.5 mt-0.5">
                {assignmentItems.map((label) => (
                  <button
                    key={label}
                    onClick={() => setActiveItem(label)}
                    className={`text-left px-2 py-1.5 text-[13px] rounded-[4px] transition-colors tracking-[-0.26px] ${
                      activeItem === label
                        ? "text-[#2552ED] bg-[#e4e6ea] dark:bg-[#252a3a] dark:text-[#6b9bff]"
                        : "text-[#555] dark:text-[#9ba2b0] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Spam */}
          <button
            onClick={() => setActiveItem("Spam")}
            className={`text-left px-2 py-1.5 text-[14px] rounded-[4px] transition-colors tracking-[-0.28px] ${
              activeItem === "Spam"
                ? "text-[#2552ED] bg-[#e4e6ea] dark:bg-[#252a3a] dark:text-[#6b9bff]"
                : "text-[#212121] dark:text-[#e4e4e4] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340]"
            }`}
          >
            Spam
          </button>

          {/* Leads */}
          <button
            onClick={() => setLeadsOpen(!leadsOpen)}
            className="flex items-center justify-between px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]"
          >
            <span>Leads</span>
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <ChevronRight className="w-3 h-3 text-[#303030] dark:text-[#8b92a5]" />
            </div>
          </button>

          {/* Feedback */}
          <button
            onClick={() => setFeedbackOpen(!feedbackOpen)}
            className="flex items-center justify-between px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]"
          >
            <span>Feedback</span>
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <ChevronRight className="w-3 h-3 text-[#303030] dark:text-[#8b92a5]" />
            </div>
          </button>

          {/* Saved filters */}
          <button className="text-left px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]">
            Saved filters
          </button>

          {/* Agents */}
          <button className="flex items-center justify-between px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]">
            <span>Agents</span>
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <ChevronRight className="w-3 h-3 text-[#303030] dark:text-[#8b92a5]" />
            </div>
          </button>

          {/* Lead generation agents */}
          <button className="text-left px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]">
            Lead generation agents
          </button>

          {/* Settings */}
          <button className="flex items-center justify-between px-2 py-1.5 w-full text-[14px] text-[#212121] dark:text-[#e4e4e4] rounded-[4px] hover:bg-[#e4e6ea] dark:hover:bg-[#2e3340] transition-colors tracking-[-0.28px]">
            <span>Settings</span>
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              <ChevronRight className="w-3 h-3 text-[#303030] dark:text-[#8b92a5]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   Main Inbox View
   ═════════════════════════════════════ */
export function InboxView() {
  const [selectedId, setSelectedId] = useState("3");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const detail = getDetail(selectedId);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const conversationSearchRef = useRef<HTMLInputElement>(null);
  const composeTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onShortcut = (e: Event) => {
      const detail = (e as CustomEvent<{ action: InboxShortcutAction }>).detail;
      if (!detail) return;
      if (detail.action === "focus-compose") {
        composeTextareaRef.current?.focus();
      }
      if (detail.action === "focus-search") {
        conversationSearchRef.current?.focus();
        conversationSearchRef.current?.select();
      }
    };
    window.addEventListener(INBOX_SHORTCUT_EVENT, onShortcut);
    return () => window.removeEventListener(INBOX_SHORTCUT_EVENT, onShortcut);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedId]);

  const filteredConversations = searchQuery
    ? conversations.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden bg-[#f8f9fa] dark:bg-[#13161b] transition-colors duration-300 ">
      {/* ═══ CENTER-LEFT: Conversation list ═══ */}
      <div className="w-[360px] flex flex-col bg-white dark:bg-[#1e2229] border-r border-[#eaeaea] dark:border-[#333a47] shrink-0 transition-colors duration-300">
        {/* List header */}
        <div className="px-4 pt-4 pb-3 shrink-0">
          <div className="flex items-center justify-between mb-3">
            {/* Status dropdown */}
            <div className="relative min-w-0 flex-1">
              <button
                onClick={() => setStatusOpen(!statusOpen)}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-1">
                  <span
                    className="text-[12px] text-[#212121] dark:text-[#e4e4e4] uppercase tracking-[0.5px]"
                    style={{ fontWeight: 400 }}
                  >
                    Open
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#555] dark:text-[#8b92a5]" />
                </div>
                <span
                  className="text-[12px] text-[#999] dark:text-[#6b7280] whitespace-nowrap"
                  style={{ fontWeight: 400 }}
                >
                  19.2K total messages • 2.4K unread
                </span>
              </button>

              {statusOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white dark:bg-[#262b35] rounded-lg shadow-lg border border-[#e5e9f0] dark:border-[#333a47] py-1 z-50 min-w-[140px]">
                  {["Open", "Closed", "Snoozed", "All"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusOpen(false)}
                      className="w-full text-left px-3 py-1.5 text-[13px] text-[#212121] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                      style={{ fontWeight: 400 }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-0.5 shrink-0">
              {[
                { Icon: Search, label: "Search" },
                { Icon: SlidersHorizontal, label: "Filter" },
                { Icon: ArrowUpDown, label: "Sort" },
                { Icon: MoreVertical, label: "More" },
              ].map(({ Icon, label }) => (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                  title={label}
                >
                  <Icon className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" />
                </Button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-[14px] -translate-y-1/2 text-[#555] dark:text-[#8b92a5]" aria-hidden />
            <input
              ref={conversationSearchRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations"
              className="h-9 w-full rounded-lg border border-[#e5e9f0] bg-[#f8f9fa] py-0 pr-2 pl-8 text-[14px] text-[#212121] outline-none transition-colors placeholder:text-[#999] focus:border-[#2552ED] focus:ring-1 focus:ring-[#2552ED] dark:border-[#333a47] dark:bg-[#262b35] dark:text-[#e4e4e4] dark:placeholder:text-[#6b7280]"
              aria-label="Search conversations"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f0f0f0] dark:divide-[#2e3340]">
          {filteredConversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conv={conv}
              isSelected={conv.id === selectedId}
              onClick={() => setSelectedId(conv.id)}
            />
          ))}
        </div>
      </div>

      {/* ═══ RIGHT: Conversation detail ═══ */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f5f6f8] dark:bg-[#13161b] transition-colors duration-300">
        {/* Chat header */}
        <div className="h-[60px] px-5 flex items-center justify-between border-b border-[#eaeaea] dark:border-[#333a47] bg-white dark:bg-[#1e2229] shrink-0 transition-colors duration-300">
          <h2
            className="text-[16px] text-[#212121] dark:text-[#e4e4e4]"
            style={{ fontWeight: 400 }}
          >
            {detail.contactName}
          </h2>

          <div className="flex items-center gap-3">
            {/* Assigned agent */}
            <button className="flex items-center gap-2 px-2 py-1 rounded-[8px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors">
              <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-[#e8eaed] dark:ring-[#3d4555]">
                <img
                  src={detail.assignedAvatar}
                  alt={detail.assignedTo}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="text-[13px] text-[#212121] dark:text-[#e4e4e4]"
                style={{ fontWeight: 400 }}
              >
                {detail.assignedTo}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#999] dark:text-[#6b7280]" />
            </button>

            {/* More */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-[8px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
              aria-label="More options"
            >
              <MoreVertical className="w-[14px] h-[14px] text-[#212121] dark:text-[#c0c6d4]" />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Date separator */}
          <div className="flex items-center justify-center mb-6">
            <span
              className="text-[12px] text-[#999] dark:text-[#6b7280] bg-[#f5f6f8] dark:bg-[#13161b] px-3 relative z-10"
              style={{ fontWeight: 400 }}
            >
              {detail.dateSeparator}
            </span>
          </div>

          {/* Messages */}
          {detail.messages.map((msg) => (
            <ChatBubble key={msg.id} msg={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Composer */}
        <Composer textareaRef={composeTextareaRef} />
      </div>
    </div>
  );
}