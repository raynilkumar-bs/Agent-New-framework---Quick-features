import { useState, useRef, useEffect } from "react";

/* ─── Contacts app bridge types (consumed by App.tsx shell) ─── */
export const CONTACTS_L2_KEY_ALL = "all" as const;
export type ContactsSheetMode = "none" | "addContact" | "editContact";
export interface ContactsAppBridge {
  l2ActiveItem: string;
  onL2ActiveItemChange: (key: string) => void;
  sheetMode: ContactsSheetMode;
  onSheetModeChange: (mode: ContactsSheetMode) => void;
  detailContactId: number | null;
  onDetailContactIdChange: (id: number | null) => void;
  quickViewContactId: number | null;
  onQuickViewContactIdChange: (id: number | null) => void;
}
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Mail,
  Phone,
  MessageSquare,
  Eye,
  Send,
  Pencil,
  ListPlus,
  Route,
  Trash2,
  Flame,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

/* ─── Types ─── */
type ScoreLevel = "green" | "yellow" | "red";

interface Contact {
  id: number;
  name: string;
  score: number;
  scoreLevel: ScoreLevel;
  hasPhone: boolean;
  hasEmail: boolean;
  isLead: boolean;
  location: string;
  locationCount?: number;
  lastActivity: string;
}

/* ─── Mock data matching Figma ─── */
const mockContacts: Contact[] = [
  { id: 1, name: "Emma Reynolds", score: 4, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: false, location: "Atlanta, GA", lastActivity: "Jul 05, 2024" },
  { id: 2, name: "Liam Mitchell", score: 1, scoreLevel: "yellow", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 2, lastActivity: "Jul 05, 2024" },
  { id: 3, name: "Ava Simmons", score: 6, scoreLevel: "red", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
  { id: 4, name: "Noah Hayes", score: 6, scoreLevel: "red", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
  { id: 5, name: "Isabella Cooper", score: 4, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: false, location: "New York City, NY", lastActivity: "Jul 05, 2024" },
  { id: 6, name: "Ethan Brooks", score: 6, scoreLevel: "red", hasPhone: false, hasEmail: false, isLead: true, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
  { id: 7, name: "Mia Campbell", score: 4, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: false, location: "Chicago, IL", lastActivity: "Jul 05, 2024" },
  { id: 8, name: "Jackson Rivera", score: 4, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: true, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
  { id: 9, name: "Harper Lewis", score: 6, scoreLevel: "red", hasPhone: true, hasEmail: true, isLead: true, location: "San Diego, CA", lastActivity: "Jul 05, 2024" },
  { id: 10, name: "Benjamin Foster", score: 8, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
  { id: 11, name: "Chloe Bennett", score: 1, scoreLevel: "yellow", hasPhone: false, hasEmail: false, isLead: true, location: "", locationCount: 2, lastActivity: "Jul 05, 2024" },
  { id: 12, name: "Caleb Morris", score: 6, scoreLevel: "red", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 8, lastActivity: "Jul 05, 2024" },
  { id: 13, name: "Zoey Parker", score: 4, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
  { id: 14, name: "Harper Lewis", score: 1, scoreLevel: "yellow", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 10, lastActivity: "Jul 05, 2024" },
  { id: 15, name: "Sophia Carter", score: 4, scoreLevel: "green", hasPhone: true, hasEmail: true, isLead: false, location: "", locationCount: 3, lastActivity: "Jul 05, 2024" },
];

/* ─── Score chip component ─── */
function ScoreChip({ score, level }: { score: number; level: ScoreLevel }) {
  const colors: Record<ScoreLevel, { bg: string; text: string; darkBg: string; darkText: string }> = {
    green: { bg: "bg-[#e3f4e0]", text: "text-[#377e2c]", darkBg: "dark:bg-[#1a3328]", darkText: "dark:text-[#4ade80]" },
    yellow: { bg: "bg-[#fef6e0]", text: "text-[#c69204]", darkBg: "dark:bg-[#3d2e14]", darkText: "dark:text-[#fbbf24]" },
    red: { bg: "bg-[#fddad7]", text: "text-[#de1b0c]", darkBg: "dark:bg-[#3d1a1a]", darkText: "dark:text-[#f87171]" },
  };
  const c = colors[level];
  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[4px] text-[10px] ${c.bg} ${c.text} ${c.darkBg} ${c.darkText}`} style={{ fontWeight: 400 }}>
      {score}
    </span>
  );
}

/* ─── Context menu ─── */
function ContextMenu({ x, y, onClose, onAction }: { x: number; y: number; onClose: () => void; onAction: (action: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const items = [
    { icon: <Eye className="w-[14px] h-[14px]" />, label: "View details", action: "view" },
    { icon: <Send className="w-[14px] h-[14px]" />, label: "Quick send", action: "send" },
    { icon: <Pencil className="w-[14px] h-[14px]" />, label: "Edit", action: "edit" },
    { icon: <ListPlus className="w-[14px] h-[14px]" />, label: "Add to list", action: "addList" },
    { icon: <Route className="w-[14px] h-[14px]" />, label: "Contact journey", action: "journey" },
    { icon: <Trash2 className="w-[14px] h-[14px] text-[#dc2626]" />, label: "Delete", action: "delete", danger: true },
  ];

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#333a47] rounded-[8px] py-1 min-w-[180px]"
      style={{ top: y, left: x, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
    >
      {items.map((item) => (
        <button
          key={item.action}
          onClick={() => { onAction(item.action); onClose(); }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] ${
            (item as { danger?: boolean }).danger
              ? "text-[#dc2626] dark:text-[#f87171]"
              : "text-[#212121] dark:text-[#e4e4e4]"
          }`}
          style={{ fontWeight: 400 }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Contacts View – Main export
   ═══════════════════════════════════════════ */
export function ContactsView(_props?: { app?: ContactsAppBridge }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>("lastActivity");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRow, setSelectedRow] = useState<number | null>(4); // Noah Hayes selected by default
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; contactId: number } | null>(null);
  const totalContacts = 45867;
  const pageSize = 15;
  const totalPages = Math.ceil(totalContacts / pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleContextMenu = (e: React.MouseEvent, contactId: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, contactId });
  };

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300">
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e9f0] dark:border-[#333a47] shrink-0 h-[68px]">
          <div className="flex items-center gap-3">
            <h1
              className="text-[20px] text-[#212121] dark:text-[#e4e4e4]"
              style={{ fontWeight: 400 }}
            >
              {totalContacts.toLocaleString()} contacts
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* More options */}
            <Button variant="outline" size="icon">
              <MoreVertical className="w-[14px] h-[14px]" />
            </Button>
          </div>
        </div>

        {/* ─── Table ─── */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#f9fafb] dark:bg-[#1e2229] border-b border-[#e5e9f0] dark:border-[#333a47]">
                {/* Score column */}
                <th className="w-[52px] px-3 py-2.5" />
                {/* Name */}
                <th className="text-left px-1 py-2.5 min-w-[200px]">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-0.5 text-[12px] text-[#555] dark:text-[#8b92a5]"
                    style={{ fontWeight: 400 }}
                  >
                    Name
                    <ChevronDown className={`w-[12px] h-[12px] transition-transform ${sortColumn === "name" && sortDirection === "desc" ? "rotate-180" : ""}`} />
                  </button>
                </th>
                {/* Phone/email */}
                <th className="text-left px-1 py-2.5">
                  <span className="text-[12px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>
                    Phone/email
                  </span>
                </th>
                {/* Locations */}
                <th className="text-left px-1 py-2.5">
                  <span className="text-[12px] text-[#555] dark:text-[#8b92a5]" style={{ fontWeight: 400 }}>
                    Locations
                  </span>
                </th>
                {/* Last activity */}
                <th className="text-left px-1 py-2.5">
                  <button
                    onClick={() => handleSort("lastActivity")}
                    className="flex items-center gap-0.5 text-[12px] text-[#212121] dark:text-[#e4e4e4]"
                    style={{ fontWeight: 400 }}
                  >
                    Last activity
                    <ChevronDown className={`w-[12px] h-[12px] transition-transform ${sortColumn === "lastActivity" && sortDirection === "asc" ? "rotate-180" : ""}`} />
                  </button>
                </th>
                {/* Actions */}
                <th className="w-[80px]" />
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact) => {
                const isSelected = selectedRow === contact.id;
                const isHovered = hoveredRow === contact.id;
                return (
                  <tr
                    key={contact.id}
                    className={`border-b border-[#e5e9f0] dark:border-[#333a47] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#f2f4f7] dark:bg-[#1e2229]"
                        : "hover:bg-[#f9fafb] dark:hover:bg-[#1a1e26]"
                    }`}
                    onClick={() => setSelectedRow(contact.id)}
                    onMouseEnter={() => setHoveredRow(contact.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onContextMenu={(e) => handleContextMenu(e, contact.id)}
                  >
                    {/* Score chip */}
                    <td className="px-3 py-0 h-[48px]">
                      <ScoreChip score={contact.score} level={contact.scoreLevel} />
                    </td>
                    {/* Name */}
                    <td className="px-1 py-0 h-[48px]">
                      <div className="flex items-center gap-0.5">
                        <span
                          className={`text-[14px] ${
                            isSelected
                              ? "text-[#2552ED] dark:text-[#6b9bff]"
                              : "text-[#212121] dark:text-[#e4e4e4]"
                          }`}
                          style={{ fontWeight: 400 }}
                        >
                          {contact.name}
                        </span>
                        {contact.isLead && (
                          <Flame className="w-[16px] h-[16px] text-[#4CAE3D] shrink-0" fill="#4CAE3D" />
                        )}
                      </div>
                    </td>
                    {/* Phone/email icons */}
                    <td className="px-1 py-0 h-[48px]">
                      <div className="flex items-center gap-1">
                        <Phone
                          className={`w-[16px] h-[16px] ${
                            contact.hasPhone
                              ? "text-[#303030] dark:text-[#bbb]"
                              : "text-[#ccc] dark:text-[#555]"
                          }`}
                        />
                        <Mail
                          className={`w-[16px] h-[16px] ${
                            contact.hasEmail
                              ? "text-[#303030] dark:text-[#bbb]"
                              : "text-[#ccc] dark:text-[#555]"
                          }`}
                        />
                      </div>
                    </td>
                    {/* Locations */}
                    <td className="px-1 py-0 h-[48px]">
                      <div className="flex items-center gap-0.5">
                        <span
                          className="text-[14px] text-[#212121] dark:text-[#e4e4e4]"
                          style={{ fontWeight: 400 }}
                        >
                          {contact.location
                            ? contact.location
                            : contact.locationCount !== undefined
                            ? contact.locationCount
                            : "—"}
                        </span>
                        {/* Show expand chevron on selected/hovered location count rows */}
                        {isSelected && contact.locationCount !== undefined && !contact.location && (
                          <ChevronDown className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" />
                        )}
                      </div>
                    </td>
                    {/* Last activity */}
                    <td className="px-1 py-0 h-[48px]">
                      <span
                        className="text-[14px] text-[#212121] dark:text-[#e4e4e4]"
                        style={{ fontWeight: 400 }}
                      >
                        {contact.lastActivity}
                      </span>
                    </td>
                    {/* Actions (show on hover/selected) */}
                    <td className="px-1 py-0 h-[48px]">
                      {(isSelected || isHovered) && (
                        <div className="flex items-center gap-1 justify-end pr-1">
                          <button
                            className="w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border border-[#e5e9f0] dark:border-[#333a47] bg-white dark:bg-[#262b35] hover:bg-[#f0f0f0] dark:hover:bg-[#2e3340] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageSquare className="w-[14px] h-[14px] text-[#303030] dark:text-[#bbb]" />
                          </button>
                          <button
                            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[4px] border border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f0f0f0] dark:hover:bg-[#2e3340] transition-colors ${
                              isSelected
                                ? "bg-[#eaeaea] dark:bg-[#333a47]"
                                : "bg-white dark:bg-[#262b35]"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContextMenu(e, contact.id);
                            }}
                          >
                            <MoreVertical className="w-[14px] h-[14px] text-[#303030] dark:text-[#bbb]" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ─── Pagination ─── */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#e5e9f0] dark:border-[#333a47] bg-white dark:bg-[#13161b] shrink-0">
          <span className="text-[13px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalContacts)} of{" "}
            {totalContacts.toLocaleString()} contacts
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] border border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" />
            </button>

            {[1, 2, 3].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-[30px] h-[30px] flex items-center justify-center rounded-[8px] text-[13px] transition-colors ${
                  currentPage === p
                    ? "bg-[#2552ED] text-white"
                    : "border border-[#e5e9f0] dark:border-[#333a47] text-[#555] dark:text-[#8b92a5] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
                style={{ fontWeight: 400 }}
              >
                {p}
              </button>
            ))}

            <span className="text-[13px] text-[#999] dark:text-[#6b7280] px-1">...</span>

            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`w-[30px] h-[30px] flex items-center justify-center rounded-[8px] text-[13px] transition-colors ${
                currentPage === totalPages
                  ? "bg-[#2552ED] text-white"
                  : "border border-[#e5e9f0] dark:border-[#333a47] text-[#555] dark:text-[#8b92a5] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
              }`}
              style={{ fontWeight: 400 }}
            >
              {totalPages.toLocaleString().slice(-3)}
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] border border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-[14px] h-[14px] text-[#555] dark:text-[#8b92a5]" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Context menu ─── */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={(action) => {
            console.log(`Action: ${action} on contact ${contextMenu.contactId}`);
          }}
        />
      )}
    </div>
  );
}