import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Paperclip, Palette, FileEdit, Send, Sparkles, X, Check, ChevronDown, ChevronRight, Image, Type, Maximize, AlignLeft, AlignCenter, AlignRight, BookOpen, Info, Link, Download, Mail, Minus, Plus, Upload, Search, Globe, Trash2, Loader2, Mic, ArrowUp, Square, Printer, Save, Eye, EyeOff, GripVertical } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ShareModal } from "./ShareModal";
import { ScheduleModal } from "./ScheduleModal";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "./ui/prompt-input";
import { Button } from "@/app/components/ui/button";

import imgCover from "figma:asset/cf41ec9f747e1d47078180a05f5f2ca35443cb9a.png";
import reportSvg from "../../imports/svg-ps6vzxz3zm";
import { reportPages, type ReportPageProps } from "./ReportPages";
import { saveDraft, type DraftReport } from "./draftStore";

// Static Figma report images for Default theme
import imgChart from "figma:asset/65e6c1159ecfae396cecb0e51b02f35873df9382.png";
import imgTable1 from "figma:asset/9d7bbfabce716475e8ebcd1c7b1a4ff09512ada8.png";
import imgTable2 from "figma:asset/dee5cbfe496c36c8c0519ab93c24d583a84dc3ff.png";
import imgTable3 from "figma:asset/0d916df5fe5f193444d1fcc37d6230fcfd59f017.png";
import imgTable4 from "figma:asset/a354c9b2dcc9e1469f80aa5994f146789051ac86.png";
import imgTable5 from "figma:asset/eaa0bbbefd8412f19964e9a78e78861f678c55c6.png";
import imgTable6 from "figma:asset/0c57f8a87a947e60bf7b9dca32d63cafe2e4cac2.png";
import imgTable7 from "figma:asset/97f52431a736eef2a6aa441bd1f1043481e35b77.png";

const defaultStaticImages = [imgChart, imgTable1, imgTable2, imgTable3, imgTable4, imgTable5, imgTable6, imgTable7];

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  colorSuggestions?: string[];
}

interface AICustomizePanelProps {
  onClose: () => void;
  themeColor: string;
  onThemeColorChange: (color: string) => void;
  showSummaryPage: boolean;
  onToggleSummaryPage: (show: boolean) => void;
  editingDraft?: DraftReport | null;
  entryMode?: "share" | "schedule";
}

/* ─── Drag & Drop Types ─── */
const DRAG_TYPE_PAGE = "REPORT_PAGE";

interface DragItem {
  type: string;
  posIdx: number;
  origIdx: number;
}

interface DraggableReportThumbProps {
  origIdx: number;
  posIdx: number;
  totalCount: number;
  children: React.ReactNode;
  onMove: (fromPos: number, toPos: number) => void;
}

function DraggableReportThumb({ origIdx, posIdx, totalCount, children, onMove }: DraggableReportThumbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dropIndicator, setDropIndicator] = useState<"above" | "below" | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE_PAGE,
    item: { type: DRAG_TYPE_PAGE, posIdx, origIdx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: DRAG_TYPE_PAGE,
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.posIdx;
      const hoverIndex = posIdx;
      if (dragIndex === hoverIndex) {
        setDropIndicator(null);
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      setDropIndicator(hoverClientY < hoverMiddleY ? "above" : "below");
    },
    drop: (item: DragItem) => {
      const dragIdx = item.posIdx;
      const hoverIdx = posIdx;
      if (dragIdx === hoverIdx) return;
      let insertIdx: number;
      if (dragIdx < hoverIdx) {
        insertIdx = dropIndicator === "above" ? hoverIdx - 1 : hoverIdx;
      } else {
        insertIdx = dropIndicator === "above" ? hoverIdx : hoverIdx + 1;
      }
      onMove(dragIdx, Math.max(0, insertIdx));
      setDropIndicator(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Clear indicator when not hovering
  useEffect(() => {
    if (!isOver) setDropIndicator(null);
  }, [isOver]);

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: isDragging ? 0.35 : 1,
        transition: "opacity 0.2s cubic-bezier(0.2, 0, 0, 1), transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
        transform: isDragging ? "scale(0.97)" : "scale(1)",
      }}
    >
      {/* Drop indicator — above */}
      {isOver && dropIndicator === "above" && (
        <div className="absolute -top-[5px] left-1 right-1 flex items-center z-20 pointer-events-none">
          <div className="w-[5px] h-[5px] rounded-full bg-[#2552ED] shrink-0" />
          <div className="flex-1 h-[2px] bg-[#2552ED] rounded-full" />
          <div className="w-[5px] h-[5px] rounded-full bg-[#2552ED] shrink-0" />
        </div>
      )}
      {children}
      {/* Drop indicator — below */}
      {isOver && dropIndicator === "below" && (
        <div className="absolute -bottom-[5px] left-1 right-1 flex items-center z-20 pointer-events-none">
          <div className="w-[5px] h-[5px] rounded-full bg-[#2552ED] shrink-0" />
          <div className="flex-1 h-[2px] bg-[#2552ED] rounded-full" />
          <div className="w-[5px] h-[5px] rounded-full bg-[#2552ED] shrink-0" />
        </div>
      )}
    </div>
  );
}

const colorPresets = [
  { name: "Blue", color: "#2552ED" },
  { name: "Purple", color: "#7B1FA2" },
  { name: "Teal", color: "#00897B" },
  { name: "Orange", color: "#E65100" },
  { name: "Red", color: "#C62828" },
  { name: "Green", color: "#2E7D32" },
  { name: "Indigo", color: "#283593" },
  { name: "Pink", color: "#AD1457" },
];

const themePresets = [
  { name: "Professional blue", primary: "#2552ED", secondary: "#e3f2fd", accent: "#0d47a1" },
  { name: "Bold purple", primary: "#7B1FA2", secondary: "#f3e5f5", accent: "#4a148c" },
  { name: "Nature green", primary: "#2E7D32", secondary: "#e8f5e9", accent: "#1b5e20" },
  { name: "Warm orange", primary: "#E65100", secondary: "#fff3e0", accent: "#bf360c" },
  { name: "Elegant dark", primary: "#37474f", secondary: "#eceff1", accent: "#263238" },
  { name: "Vibrant pink", primary: "#AD1457", secondary: "#fce4ec", accent: "#880e4f" },
];

const fontOptions = [
  { name: "Roboto", family: "'Roboto', sans-serif", style: "Modern & clean" },
  { name: "Inter", family: "'Inter', sans-serif", style: "Neutral & readable" },
  { name: "Georgia", family: "Georgia, serif", style: "Classic & formal" },
  { name: "Playfair Display", family: "'Playfair Display', serif", style: "Elegant & editorial" },
  { name: "Montserrat", family: "'Montserrat', sans-serif", style: "Geometric & bold" },
  { name: "Source Sans 3", family: "'Source Sans 3', sans-serif", style: "Professional & crisp" },
];

const layoutOptions = [
  { id: "portrait-a4", label: "A4 portrait", ratio: 1.4142, icon: "▯", desc: "Standard document" },
  { id: "landscape-16-9", label: "16:9 landscape", ratio: 0.5625, icon: "▭", desc: "Widescreen slides" },
  { id: "portrait-4-3", label: "4:3 portrait", ratio: 1.333, icon: "□", desc: "Classic presentation" },
  { id: "letter", label: "US letter", ratio: 1.2941, icon: "▯", desc: "8.5 x 11 inches" },
];

type ManualSection = "cover" | "layout" | "theme" | "font" | "padding" | "header" | "style" | null;

const stylePresets = [
  {
    id: "default",
    name: "Default",
    bg: "#ffffff",
    cardBg: "#f5f5f5",
    titleColor: "#1a1a1a",
    bodyColor: "#666666",
    linkColor: "#2552ED",
    borderColor: "#e0e0e0",
    headerBg: "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
    preview: "default" as const,
  },
  {
    id: "executive",
    name: "Executive",
    bg: "#ffffff",
    cardBg: "#f8f9fb",
    titleColor: "#1a1f36",
    bodyColor: "#4f566b",
    linkColor: "#635bff",
    borderColor: "#e3e8ee",
    headerBg: "linear-gradient(135deg, #f0f2f8 0%, #e8ecf4 100%)",
    preview: "executive" as const,
  },
  {
    id: "presentation",
    name: "Presentation",
    bg: "#ffffff",
    cardBg: "#f7f8fc",
    titleColor: "#0d1b3e",
    bodyColor: "#5a6478",
    linkColor: "#3b82f6",
    borderColor: "#e2e6f0",
    headerBg: "linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)",
    preview: "presentation" as const,
  },
  {
    id: "insight",
    name: "Insight",
    bg: "#ffffff",
    cardBg: "#fafbfc",
    titleColor: "#1e293b",
    bodyColor: "#64748b",
    linkColor: "#0ea5e9",
    borderColor: "#e2e8f0",
    headerBg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    preview: "insight" as const,
  },
  {
    id: "minimal",
    name: "Minimal",
    bg: "#ffffff",
    cardBg: "#fafafa",
    titleColor: "#171717",
    bodyColor: "#737373",
    linkColor: "#18181b",
    borderColor: "#e5e5e5",
    headerBg: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
    preview: "minimal" as const,
  },
  {
    id: "dark-analytics",
    name: "Dark analytics",
    bg: "#0f172a",
    cardBg: "#1e293b",
    titleColor: "#f1f5f9",
    bodyColor: "#94a3b8",
    linkColor: "#38bdf8",
    borderColor: "#334155",
    headerBg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    preview: "dark-analytics" as const,
  },
];





export function AICustomizePanel({ onClose, themeColor, onThemeColorChange, showSummaryPage, onToggleSummaryPage, editingDraft, entryMode = "share" }: AICustomizePanelProps) {
  // AI Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey there! 👋\nI can help you customize your report before exporting or sharing. Try:\n\n• \"Use dark analytics theme\"\n• \"Make the layout compact\"\n• \"Generate an executive summary\"\n• \"Change the color to teal\"\n• \"Switch to a serif font\"",
      colorSuggestions: undefined,
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"ai" | "manual">("ai");

  // Manual customization state
  const [expandedSection, setExpandedSection] = useState<ManualSection>("style");
  const [showCoverPage, setShowCoverPage] = useState(editingDraft?.showCoverPage ?? true);
  const [coverTitle, setCoverTitle] = useState(editingDraft?.coverTitle ?? "Profile performance report");
  const [coverSubtitle, setCoverSubtitle] = useState(editingDraft?.coverSubtitle ?? "Social media analytics overview");
  const [coverDate, setCoverDate] = useState(editingDraft?.coverDate ?? "July 10, 2025");
  const [showLogo, setShowLogo] = useState(editingDraft?.showLogo ?? true);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoSearchUrl, setLogoSearchUrl] = useState("");
  const [isFetchingLogo, setIsFetchingLogo] = useState(false);
  const [logoSearchError, setLogoSearchError] = useState("");
  const logoFileRef = useRef<HTMLInputElement>(null);
  const [selectedLayout, setSelectedLayout] = useState(editingDraft?.selectedLayout ?? "portrait-a4");
  const [selectedFont, setSelectedFont] = useState(editingDraft?.selectedFont ?? "Roboto");
  const [paddingSize, setPaddingSize] = useState<"compact" | "normal" | "spacious">(editingDraft?.paddingSize ?? "normal");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(editingDraft?.textAlign ?? "left");
  const [showHeader, setShowHeader] = useState(editingDraft?.showHeader ?? true);
  const [showFooter, setShowFooter] = useState(editingDraft?.showFooter ?? true);
  const [showPageNumbers, setShowPageNumbers] = useState(editingDraft?.showPageNumbers ?? true);
  const [headerText, setHeaderText] = useState(editingDraft?.headerText ?? "Profile performance report");

  // Font size scale (percentage, default 100%)
  const [fontScale, setFontScale] = useState(editingDraft?.fontScale ?? 100);

  // Page management: order and visibility for report pages (indices into reportPages/defaultStaticImages)
  const [reportPageOrder, setReportPageOrder] = useState<number[]>(() => Array.from({ length: 8 }, (_, i) => i));
  const [hiddenReportPages, setHiddenReportPages] = useState<Set<number>>(() => new Set());

  const toggleReportPageVisibility = (idx: number) => {
    setHiddenReportPages(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const deleteReportPage = (idx: number) => {
    setReportPageOrder(prev => prev.filter(i => i !== idx));
    setHiddenReportPages(prev => { const next = new Set(prev); next.delete(idx); return next; });
  };

  const moveReportPage = (fromPos: number, direction: "up" | "down") => {
    setReportPageOrder(prev => {
      const arr = [...prev];
      const toPos = direction === "up" ? fromPos - 1 : fromPos + 1;
      if (toPos < 0 || toPos >= arr.length) return arr;
      [arr[fromPos], arr[toPos]] = [arr[toPos], arr[fromPos]];
      return arr;
    });
  };

  const reorderReportPage = useCallback((fromPos: number, insertPos: number) => {
    setReportPageOrder(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(fromPos, 1);
      arr.splice(Math.max(0, Math.min(arr.length, insertPos)), 0, moved);
      return arr;
    });
  }, []);

  // Visible report pages in order
  const visibleReportPages = reportPageOrder.filter(i => !hiddenReportPages.has(i));

  // Inline report-name editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const startEditingName = () => {
    setEditNameValue(coverTitle || (editingDraft ? "Edit draft" : "New share"));
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.select(), 0);
  };

  const commitName = () => {
    const trimmed = editNameValue.trim();
    if (trimmed) {
      setCoverTitle(trimmed);
      setHeaderText(trimmed);
    }
    setIsEditingName(false);
  };

  // Style theme preset
  const [selectedStyle, setSelectedStyle] = useState(editingDraft?.selectedStyle ?? "default");
  const currentStyle = stylePresets.find(s => s.id === selectedStyle) || stylePresets[0];

  // Draft save state
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(editingDraft?.id ?? null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const fs = (base: number) => Math.round(base * 0.5 * fontScale / 100);

  // Logo rendering helper
  const renderLogo = (size: "large" | "small" | "thumb") => {
    const dims = size === "large" ? 80 : size === "small" ? 10 : 28;
    if (customLogoUrl) {
      return <img src={customLogoUrl} alt="Logo" style={{ width: dims, height: "auto", maxHeight: dims, objectFit: "contain" }} />;
    }
    // Default: Birdeye SVG
    if (size === "large") {
      return (
        <svg className="w-[80px] h-auto" viewBox="0 0 199.768 41.4" fill="none">
          <path clipRule="evenodd" d={reportSvg.p2cc68880} fill={themeColor} fillRule="evenodd" />
          <path d={reportSvg.pfe99e80} fill="#212121" />
          <path d={reportSvg.p36edaf80} fill="#212121" />
          <path d={reportSvg.pa24ff80} fill="#212121" />
          <path d={reportSvg.p33cce400} fill="#212121" />
          <path d={reportSvg.p16db6100} fill="#212121" />
          <path d={reportSvg.p2b617580} fill="#212121" />
          <path d={reportSvg.p11bbd0f1} fill="#212121" />
          <path d={reportSvg.p3b3711e0} fill="#212121" />
        </svg>
      );
    }
    if (size === "thumb") {
      return (
        <svg className="w-[28px] h-auto" viewBox="0 0 199.768 41.4" fill="none">
          <path clipRule="evenodd" d={reportSvg.p2cc68880} fill={themeColor} fillRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg width="18" height="17" viewBox="0 0 20 19" fill="none">
        <path d="M10 0C4.48 0 0 4.02 0 8.97C0 12.27 1.93 15.13 4.86 16.72C4.73 17.72 4.13 18.72 3 19C3 19 6.27 18.82 8.18 17.16C8.77 17.26 9.38 17.31 10 17.31C15.52 17.31 20 13.62 20 8.97C20 4.02 15.52 0 10 0Z" fill={themeColor}/>
      </svg>
    );
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomLogoUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoSearch = () => {
    if (!logoSearchUrl.trim()) return;
    setIsFetchingLogo(true);
    setLogoSearchError("");
    let domain = logoSearchUrl.trim();
    // Strip protocol and path
    domain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    // Use Clearbit's logo service
    const logoUrl = `https://logo.clearbit.com/${domain}`;
    // Validate by loading the image (no crossOrigin to avoid CORS block)
    let settled = false;
    const img = new window.Image();
    img.onload = () => {
      if (settled) return;
      settled = true;
      setCustomLogoUrl(logoUrl);
      setIsFetchingLogo(false);
      setLogoSearchUrl("");
    };
    img.onerror = () => {
      if (settled) return;
      // Fallback to Google favicon
      const fallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      const img2 = new window.Image();
      img2.onload = () => {
        if (settled) return;
        settled = true;
        setCustomLogoUrl(fallback);
        setIsFetchingLogo(false);
        setLogoSearchUrl("");
      };
      img2.onerror = () => {
        if (settled) return;
        settled = true;
        setLogoSearchError("Couldn't find a logo for this website");
        setIsFetchingLogo(false);
      };
      img2.src = fallback;
    };
    // Timeout to prevent infinite spinner
    setTimeout(() => {
      if (!settled) {
        settled = true;
        setLogoSearchError("Request timed out. Please try again.");
        setIsFetchingLogo(false);
      }
    }, 8000);
    img.src = logoUrl;
  };

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareModalTab, setShareModalTab] = useState<"share" | "export" | "email">("share");
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const shareDropdownRef = useRef<HTMLDivElement>(null);

  // Schedule modal state (used when entryMode === "schedule")
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Close share dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(e.target as Node)) {
        setShareDropdownOpen(false);
      }
    };
    if (shareDropdownOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shareDropdownOpen]);

  // View state
  const [viewMode, setViewMode] = useState<"single" | "two">("single");
  const [zoomPercent, setZoomPercent] = useState(100);
  const [autoFit, setAutoFit] = useState(true);
  const [showZoomDropdown, setShowZoomDropdown] = useState(false);
  const zoomDropdownRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Close zoom dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (zoomDropdownRef.current && !zoomDropdownRef.current.contains(e.target as Node)) {
        setShowZoomDropdown(false);
      }
    };
    if (showZoomDropdown) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showZoomDropdown]);

  const zoomPresets = [
    { label: "Fit width", value: -1 },
    { label: "Fit page", value: -2 },
    { divider: true },
    { label: "25%", value: 25 },
    { label: "50%", value: 50 },
    { label: "75%", value: 75 },
    { label: "100%", value: 100 },
    { label: "125%", value: 125 },
    { label: "150%", value: 150 },
    { label: "200%", value: 200 },
    { label: "250%", value: 250 },
    { label: "300%", value: 300 },
    { label: "400%", value: 400 },
  ] as const;

  const currentLayout = layoutOptions.find(l => l.id === selectedLayout) || layoutOptions[0];
  const isLandscape = currentLayout.ratio < 1;
  const pageW = isLandscape ? Math.round(240 / currentLayout.ratio) : 240;
  const pageH = isLandscape ? 240 : Math.round(240 * currentLayout.ratio);
  const pagePadding = paddingSize === "compact" ? 8 : paddingSize === "normal" ? 12 : 18;

  // Auto-fit: compute zoom so paper fills available width with margin
  useEffect(() => {
    if (!autoFit) return;
    const container = previewContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const availW = entry.contentRect.width - 48; // 24px margin each side
        const cols = viewMode === "two" ? 2 : 1;
        const targetW = cols === 2 ? pageW * 2 + 24 : pageW; // gap between pages
        const fitZoom = Math.min(400, Math.max(25, Math.round((availW / targetW) * 100)));
        setZoomPercent(fitZoom);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [autoFit, viewMode, pageW]);

  // Mouse wheel zoom on preview canvas
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setAutoFit(false);
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoomPercent(prev => Math.min(400, Math.max(25, prev + delta)));
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Scroll to a specific page in the preview area
  const scrollToPage = (pageIndex: number) => {
    const container = previewContainerRef.current;
    if (!container) return;
    const pages = container.querySelectorAll('[data-page-index]');
    const target = pages[pageIndex];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Undo/Redo history
  type Snapshot = {
    themeColor: string;
    showCoverPage: boolean;
    showSummaryPage: boolean;
    selectedFont: string;
    selectedLayout: string;
    paddingSize: "compact" | "normal" | "spacious";
    coverTitle: string;
    coverSubtitle: string;
    showHeader: boolean;
    showFooter: boolean;
    showPageNumbers: boolean;
    headerText: string;
  };

  const makeSnapshot = (): Snapshot => ({
    themeColor, showCoverPage, showSummaryPage, selectedFont, selectedLayout,
    paddingSize, coverTitle, coverSubtitle, showHeader, showFooter, showPageNumbers, headerText,
  });

  const [history, setHistory] = useState<Snapshot[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const lastSnapshotRef = useRef<string>("");

  // Push to history whenever key customization states change
  useEffect(() => {
    const snap = makeSnapshot();
    const key = JSON.stringify(snap);
    if (key !== lastSnapshotRef.current) {
      lastSnapshotRef.current = key;
      setHistory(prev => {
        const newHist = historyIndex >= 0 ? prev.slice(0, historyIndex + 1) : prev;
        return [...newHist, snap];
      });
      setHistoryIndex(prev => prev + 1);
    }
  }, [themeColor, showCoverPage, showSummaryPage, selectedFont, selectedLayout, paddingSize, coverTitle, coverSubtitle, showHeader, showFooter, showPageNumbers, headerText]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const applySnapshot = (snap: Snapshot) => {
    lastSnapshotRef.current = JSON.stringify(snap);
    if (snap.themeColor !== themeColor) onThemeColorChange(snap.themeColor);
    setShowCoverPage(snap.showCoverPage);
    if (snap.showSummaryPage !== showSummaryPage) onToggleSummaryPage(snap.showSummaryPage);
    setSelectedFont(snap.selectedFont);
    setSelectedLayout(snap.selectedLayout);
    setPaddingSize(snap.paddingSize);
    setCoverTitle(snap.coverTitle);
    setCoverSubtitle(snap.coverSubtitle);
    setShowHeader(snap.showHeader);
    setShowFooter(snap.showFooter);
    setShowPageNumbers(snap.showPageNumbers);
    setHeaderText(snap.headerText);
  };

  const handleUndo = () => {
    if (!canUndo) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    applySnapshot(history[newIndex]);
  };

  const handleRedo = () => {
    if (!canRedo) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    applySnapshot(history[newIndex]);
  };

  // ─── Print handler ────────────────────────────────────────────────────
  const handlePrint = () => {
    const layout = currentLayout;
    let pageSize = "A4";
    if (layout.id === "letter") pageSize = "letter";
    else if (layout.id === "landscape-16-9") pageSize = "A4 landscape";
    else if (layout.id === "portrait-4-3") pageSize = "A4";

    // Inject a dynamic @page rule for correct paper size & orientation
    const printStyleId = "__print-page-size__";
    let styleEl = document.getElementById(printStyleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = printStyleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `@media print { @page { size: ${pageSize}; margin: 0; } }`;

    window.print();
  };

  // ─── Save Draft handler ────────────────────────────────────────────────
  const handleSaveDraft = () => {
    const draftData = {
      reportName: coverTitle || "Untitled report",
      themeColor,
      selectedFont,
      fontScale,
      selectedLayout,
      selectedStyle,
      paddingSize,
      textAlign,
      showHeader,
      showFooter,
      showPageNumbers,
      headerText,
      showCoverPage,
      coverTitle,
      coverSubtitle,
      coverDate,
      showLogo,
      showSummaryPage,
    };
    const saved = saveDraft(draftData, currentDraftId ?? undefined);
    setCurrentDraftId(saved.id);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  // Restore themeColor from draft on mount
  useEffect(() => {
    if (editingDraft) {
      onThemeColorChange(editingDraft.themeColor);
      if (editingDraft.showSummaryPage !== showSummaryPage) {
        onToggleSummaryPage(editingDraft.showSummaryPage);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSection = (section: ManualSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Toggle switch component
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-[36px] h-[20px] rounded-full transition-colors relative shrink-0 ${
        checked ? "bg-[#2552ED]" : "bg-[#ccc] dark:bg-[#3d4555]"
      }`}
    >
      <span
        className="absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform"
        style={{ left: checked ? 18 : 2 }}
      />
    </button>
  );

  // ─── AI intent detection & action processing (V1) ─────────────────────────
  const processCommand = (text: string): { content: string; colorSuggestions?: string[] } => {
    const lower = text.toLowerCase().trim();
    const actions: string[] = [];

    const styleMap: Record<string, string> = {
      default: "default", professional: "default", standard: "default",
      executive: "executive", corporate: "executive", formal: "executive",
      presentation: "presentation", slides: "presentation", slideshow: "presentation",
      insight: "insight", insights: "insight", analytical: "insight",
      minimal: "minimal", minimalist: "minimal", clean: "minimal", simple: "minimal",
      "dark analytics": "dark-analytics", "dark mode": "dark-analytics", dark: "dark-analytics",
    };

    const colorMap: Record<string, string> = {
      blue: "#2552ED", red: "#C62828", green: "#2E7D32", purple: "#7B1FA2",
      orange: "#E65100", teal: "#00897B", pink: "#AD1457", indigo: "#283593",
      black: "#212121", navy: "#0D47A1",
    };

    const spacingKeywords: Record<string, "compact" | "normal" | "spacious"> = {
      compact: "compact", tight: "compact", dense: "compact", tighter: "compact", compressed: "compact", narrow: "compact",
      normal: "normal", medium: "normal", regular: "normal", balanced: "normal",
      spacious: "spacious", loose: "spacious", wide: "spacious", roomy: "spacious", relaxed: "spacious", breathable: "spacious",
    };

    const fontKeywords: Record<string, string> = {
      roboto: "Roboto", inter: "Inter", georgia: "Georgia",
      playfair: "Playfair Display", montserrat: "Montserrat",
      "source sans": "Source Sans 3", serif: "Georgia", "sans-serif": "Roboto", "sans serif": "Roboto",
      modern: "Inter", classic: "Georgia", elegant: "Playfair Display", geometric: "Montserrat",
    };

    // ━━━ 1. Remove summary (check first) ━━━
    if (/\b(remove|hide|delete|drop)\b.*\bsummary\b/.test(lower) || /\bsummary\b.*\b(remove|hide|delete|off)\b/.test(lower)) {
      onToggleSummaryPage(false);
      return { content: "Done! I've removed the summary page from the report.\n\nWould you like to adjust the theme or layout next?" };
    }

    // ━━━ 2. Detect style preset ━━━
    let matchedStyleId: string | null = null;
    for (const [keyword, styleId] of Object.entries(styleMap)) {
      if (lower.includes(keyword)) { matchedStyleId = styleId; break; }
    }

    // ━━━ 3. Detect all intents ━━━
    let detectedColor: { name: string; hex: string } | null = null;
    let detectedSpacing: { label: string; value: "compact" | "normal" | "spacious" } | null = null;
    let detectedFont: { name: string } | null = null;
    let wantsSummary = false;
    let wantsColorPicker = false;

    for (const [name, hex] of Object.entries(colorMap)) {
      if (lower.includes(name)) { detectedColor = { name, hex }; break; }
    }

    for (const [keyword, value] of Object.entries(spacingKeywords)) {
      if (keyword !== "default" && keyword !== "normal" && lower.includes(keyword)) {
        detectedSpacing = { label: keyword, value }; break;
      }
    }
    if (!detectedSpacing && (lower.includes("spacing") || lower.includes("padding") || lower.includes("layout"))) {
      for (const [keyword, value] of Object.entries(spacingKeywords)) {
        if (lower.includes(keyword)) { detectedSpacing = { label: keyword, value }; break; }
      }
    }

    for (const [keyword, fontName] of Object.entries(fontKeywords)) {
      if (lower.includes(keyword)) { detectedFont = { name: fontName }; break; }
    }

    if (/\b(add|generate|create|insert|include|show)\b.*\b(summary|insights|executive)\b/.test(lower) ||
        /\b(summary|insights|executive)\b.*\b(page|section)\b/.test(lower) ||
        (lower.includes("summary") && !lower.includes("remove"))) {
      wantsSummary = true;
    }

    if ((lower.includes("color") || lower.includes("colour")) && !detectedColor && !matchedStyleId) {
      wantsColorPicker = true;
    }

    // ━━━ 4. Apply actions ━━━
    const parts: string[] = [];

    if (matchedStyleId && !wantsColorPicker) {
      const preset = stylePresets.find(s => s.id === matchedStyleId);
      if (preset) {
        setSelectedStyle(matchedStyleId);
        actions.push(`set_theme: ${matchedStyleId}`);
        parts.push(`Switched to the **${preset.name}** theme`);
        if (matchedStyleId === "executive" && !detectedSpacing) {
          detectedSpacing = { label: "compact", value: "compact" };
        }
      }
    }

    if (detectedColor) {
      onThemeColorChange(detectedColor.hex);
      actions.push(`set_color: ${detectedColor.hex}`);
      parts.push(`Updated the accent color to **${detectedColor.name}**`);
    }

    if (detectedSpacing) {
      setPaddingSize(detectedSpacing.value);
      actions.push(`set_spacing: ${detectedSpacing.value}`);
      parts.push(`Set layout spacing to **${detectedSpacing.label}**`);
    }

    if (detectedFont) {
      setSelectedFont(detectedFont.name);
      actions.push(`set_font: ${detectedFont.name}`);
      parts.push(`Changed the font to **${detectedFont.name}**`);
    }

    if (wantsSummary) {
      onToggleSummaryPage(true);
      actions.push("add_summary_page");
      parts.push("Added an **executive summary** page with key metrics and insights");
    }

    if (wantsColorPicker && actions.length === 0) {
      return {
        content: "I can change the accent color for you! Pick one below or tell me a specific color (e.g. \"make it teal\"):",
        colorSuggestions: colorPresets.map(p => p.color),
      };
    }

    // ━━━ 5. Build response with next-step suggestion ━━━
    if (parts.length > 0) {
      const summary = parts.length === 1
        ? `Done! ${parts[0]}.`
        : `Done! Here's what I changed:\n\n${parts.map(p => `• ${p}`).join("\n")}`;

      const suggestions: string[] = [];
      if (!actions.some(a => a.startsWith("set_theme"))) suggestions.push("\"Use the executive theme\"");
      if (!actions.some(a => a.startsWith("set_spacing"))) suggestions.push("\"Make the layout more compact\"");
      if (!actions.includes("add_summary_page") && !showSummaryPage) suggestions.push("\"Add an executive summary\"");
      if (!actions.some(a => a.startsWith("set_color"))) suggestions.push("\"Change the color to teal\"");
      if (!actions.some(a => a.startsWith("set_font"))) suggestions.push("\"Switch to a serif font\"");

      const nextStep = suggestions.length > 0
        ? `\n\nThe preview has been updated. Try ${suggestions[0]} or ask me anything else!`
        : "\n\nThe preview has been updated.";

      const result: { content: string; colorSuggestions?: string[] } = { content: summary + nextStep };
      if (detectedColor) {
        result.colorSuggestions = colorPresets.filter(p => p.color !== detectedColor!.hex).slice(0, 4).map(p => p.color);
      }
      return result;
    }

    // ━━━ 6. Font-only query ━━━
    if (lower.includes("font") || lower.includes("text") || lower.includes("typography")) {
      return { content: `I can adjust the typography! Currently using **${selectedFont}**. Try:\n\n• \"Use Georgia\" — classic serif\n• \"Switch to Montserrat\" — geometric & bold\n• \"Use Playfair Display\" — elegant editorial\n• \"Make it modern\" — clean sans-serif (Inter)` };
    }

    // ━━━ 7. Layout-only query ━━━
    if (lower.includes("layout") || lower.includes("spacing") || lower.includes("padding") || lower.includes("larger") || lower.includes("bigger") || lower.includes("smaller")) {
      return { content: `I can adjust the layout density! Current spacing is **${paddingSize}**. Try:\n\n• \"Make it compact\" — tighter spacing for dense data\n• \"Make it spacious\" — more breathing room\n• \"Reset to normal\" — balanced default layout` };
    }

    // ━━━ 8. Unsupported — graceful fallback ━━━
    return {
      content: "I can't do that just yet, but here's what I can help with:\n\n• **Change theme** — \"Use dark analytics theme\" or \"Make it minimal\"\n• **Change color** — \"Make it purple\" or \"Change color to teal\"\n• **Adjust layout** — \"Make the layout compact\" or \"Increase spacing\"\n• **Add summary** — \"Generate an executive summary\"\n• **Change font** — \"Switch to Georgia\"\n\nWhat would you like to try?",
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = processCommand(input);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", ...response };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  // ─── Section Header for Manual panel ────────────���──────���──────────────────
  const SectionHeader = ({ section, icon, label }: { section: ManualSection; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-3 px-1 hover:bg-[#fafafa] dark:hover:bg-[#2e3340] rounded transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-[#555] dark:text-[#8b92a5]">{icon}</span>
        <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{label}</span>
      </div>
      {expandedSection === section ? (
        <ChevronDown className="w-4 h-4 text-[#999] dark:text-[#6b7280]" />
      ) : (
        <ChevronRight className="w-4 h-4 text-[#999] dark:text-[#6b7280]" />
      )}
    </button>
  );

  // ─── Cover page render ────────────────────────────────────────────────────
  const renderCoverPage = () => (
    <div
      className="shadow-[0px_4px_16px_rgba(0,0,0,0.1)] overflow-hidden shrink-0"
      style={{ width: pageW, height: pageH, borderRadius: 6, backgroundColor: currentStyle.bg }}
    >
      <div className="w-full h-full flex flex-col relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-8">
          <img src={imgCover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center" style={{ padding: pagePadding }}>
          {showLogo && (
            <div className="mb-4">
              {renderLogo("large")}
            </div>
          )}
          <h1
            className="tracking-[-0.6px] mb-1.5"
            style={{ fontSize: fs(28), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, fontWeight: 400, textAlign, color: currentStyle.titleColor }}
          >
            {coverTitle}
          </h1>
          <p
            className="mb-3"
            style={{ fontSize: fs(14), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, color: currentStyle.bodyColor }}
          >
            {coverSubtitle}
          </p>
          <div className="flex flex-col items-center gap-1">
            <span style={{ fontSize: fs(12), fontWeight: 400, color: currentStyle.bodyColor }}>{coverDate}</span>
            <span style={{ fontSize: fs(12), color: currentStyle.bodyColor }}>30 locations</span>
          </div>
        </div>
        {showFooter && (
          <div className="relative z-10 flex justify-between items-center px-3 py-1.5" style={{ borderTop: `1px solid ${currentStyle.borderColor}` }}>
            <span className="text-[5px]" style={{ color: currentStyle.bodyColor, opacity: 0.6 }}>{headerText}</span>
            <span className="text-[5px]" style={{ color: currentStyle.bodyColor, opacity: 0.6 }}>Cover</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#13161b] transition-colors duration-300" data-print-root>
      {/* Page-level header bar */}
      <div className="h-[56px] border-b border-[#e5e9f0] dark:border-[#333a47] flex items-center justify-between px-6 shrink-0 bg-white dark:bg-[#1e2229] transition-colors duration-300" data-no-print>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={onClose} className="rounded-md">
            <ArrowLeft className="w-[14px] h-[14px] text-[#303030] dark:text-[#c0c6d4]" />
          </Button>
          {isEditingName ? (
            <input
              ref={nameInputRef}
              value={editNameValue}
              onChange={e => setEditNameValue(e.target.value)}
              onBlur={commitName}
              onKeyDown={e => {
                if (e.key === "Enter") commitName();
                if (e.key === "Escape") setIsEditingName(false);
              }}
              className="text-[16px] text-[#212121] dark:text-[#e4e4e4] border-b border-[#2552ED] outline-none bg-transparent w-[220px] py-0.5"
              style={{ fontWeight: 400 }}
              autoFocus
            />
          ) : (
            <>
              <span className="text-[16px] text-[#212121] dark:text-[#e4e4e4]">{coverTitle || (editingDraft ? "Edit draft" : "New share")}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={startEditingName}
                className="rounded-md"
                title="Edit report name"
              >
                <FileEdit className="w-[14px] h-[14px] text-[#303030] dark:text-[#c0c6d4]" />
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            title="Print report"
            className="gap-[6px] rounded-[4px] border-[#d0d5dd] px-3 font-normal dark:border-[#3d4555]"
          >
            <Printer className="w-[14px] h-[14px] text-[#555] dark:text-[#9ba2b0]" />
            <span className="font-['Roboto',sans-serif] text-[14px] text-[#555] dark:text-[#9ba2b0] tracking-[-0.28px] whitespace-nowrap leading-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>Print</span>
          </Button>
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              title="Save as draft"
              className="gap-[6px] rounded-[4px] border-[#d0d5dd] px-3 font-normal dark:border-[#3d4555]"
            >
              <Save className="w-[14px] h-[14px] text-[#555] dark:text-[#9ba2b0]" />
              <span className="font-['Roboto',sans-serif] text-[14px] text-[#555] dark:text-[#9ba2b0] tracking-[-0.28px] whitespace-nowrap leading-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {currentDraftId ? "Update draft" : "Save draft"}
              </span>
            </Button>
            {/* Saved confirmation tooltip */}
            {showSavedToast && (
              <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-[#323232] text-white text-[12px] rounded-lg shadow-lg whitespace-nowrap z-50 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#4caf50]" />
                Draft saved
              </div>
            )}
          </div>

          {/* Context-aware primary CTA: Share vs Schedule */}
          {entryMode === "schedule" ? (
            <Button
              type="button"
              onClick={() => setShowScheduleModal(true)}
              className="rounded-[4px] bg-[#2552ED] px-3 font-normal text-white hover:bg-[#1E44CC]"
            >
              <span className="font-['Roboto',sans-serif] text-[16px] tracking-[-0.32px] whitespace-nowrap leading-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>Schedule</span>
            </Button>
          ) : (
            <div className="relative" ref={shareDropdownRef}>
              <Button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="rounded-[4px] bg-[#2552ED] px-3 font-normal text-white hover:bg-[#1E44CC]"
              >
                <span className="font-['Roboto',sans-serif] text-[16px] tracking-[-0.32px] whitespace-nowrap leading-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>Share</span>
              </Button>
              {shareDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-[#22262f] rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.12)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.35)] border border-[#e8eaed] dark:border-[#333a47] py-1.5 w-[210px] z-50">
                  <button
                    onClick={() => { setShareDropdownOpen(false); setShowShareModal(true); setShareModalTab("share"); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                  >
                    <Link className="w-[14px] h-[14px] text-[#5f6368] dark:text-[#8b92a5]" />
                    <span className="text-[14px] text-[#202124] dark:text-[#e4e4e4]">Share link</span>
                  </button>
                  <button
                    onClick={() => { setShareDropdownOpen(false); setShowShareModal(true); setShareModalTab("export"); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                  >
                    <Download className="w-[14px] h-[14px] text-[#5f6368] dark:text-[#8b92a5]" />
                    <span className="text-[14px] text-[#202124] dark:text-[#e4e4e4]">Export</span>
                  </button>
                  <button
                    onClick={() => { setShareDropdownOpen(false); setShowShareModal(true); setShareModalTab("email"); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors"
                  >
                    <Mail className="w-[14px] h-[14px] text-[#5f6368] dark:text-[#8b92a5]" />
                    <span className="text-[14px] text-[#202124] dark:text-[#e4e4e4]">Send via email</span>
                  </button>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>

      {/* Main content: left panel + preview + thumbnails */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left - AI Chat / Manual Panel */}
        <div className="w-[300px] bg-white dark:bg-[#1e2229] flex flex-col border-r border-[#e5e9f0] dark:border-[#333a47] shrink-0 transition-colors duration-300" data-no-print>
          {/* Mode toggle */}
          <div className="px-4 pt-3 pb-2 shrink-0">
            <div className="inline-flex bg-[#f0f1f5] dark:bg-[#262b35] rounded-full p-[2px]">
              <button
                onClick={() => setMode("ai")}
                className={`flex items-center justify-center gap-1 px-3 py-[5px] rounded-full text-[12px] transition-all duration-200 ${
                  mode === "ai" ? "bg-white dark:bg-[#333a47] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#212121] dark:text-[#e4e4e4]" : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4]"
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#6834B7]" />
                AI
              </button>
              <button
                onClick={() => setMode("manual")}
                className={`flex items-center justify-center px-3 py-[5px] rounded-full text-[12px] transition-all duration-200 ${
                  mode === "manual" ? "bg-white dark:bg-[#333a47] shadow-[0_1px_3px_rgba(0,0,0,0.08)] text-[#212121] dark:text-[#e4e4e4]" : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4]"
                }`}
              >
                Manual
              </button>
            </div>
          </div>

          {/* ═══ AI Chat Content ═══ */}
          {mode === "ai" && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id}>
                    {msg.role === "assistant" ? (
                      <div>
                          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4] whitespace-pre-line leading-relaxed">{msg.content}</p>
                          {msg.colorSuggestions && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {msg.colorSuggestions.map(color => (
                                <button
                                  key={color}
                                  onClick={() => {
                                    onThemeColorChange(color);
                                    const name = colorPresets.find(p => p.color === color)?.name || color;
                                    setMessages(prev => [...prev, {
                                      id: Date.now().toString(),
                                      role: "user",
                                      content: `Apply ${name} theme`,
                                    }, {
                                      id: (Date.now() + 1).toString(),
                                      role: "assistant",
                                      content: `Applied ${name} theme! The preview has been updated.`,
                                    }]);
                                  }}
                                  className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#333a47] shadow-md hover:scale-110 transition-transform"
                                  style={{ backgroundColor: color }}
                                >
                                  {themeColor === color && (
                                    <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="bg-[#f5f5f5] dark:bg-[#262b35] rounded-lg px-3 py-2">
                          <p className="text-[13px] text-[#212121] dark:text-[#e4e4e4]">{msg.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-[#ccc] dark:bg-[#4d5568] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-[#ccc] dark:bg-[#4d5568] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-[#ccc] dark:bg-[#4d5568] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="px-4 pb-4">
                <PromptInput
                  isLoading={isTyping}
                  onSubmit={handleSend}
                >
                  <PromptInputTextarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask me to edit, create, or style anything"
                  />
                  <PromptInputActions>
                    <div className="flex items-center gap-0.5">
                      <PromptInputAction tooltip="Attach file">
                        <Paperclip className="w-[14px] h-[14px]" />
                      </PromptInputAction>
                      <PromptInputAction tooltip="Voice input">
                        <Mic className="w-[14px] h-[14px]" />
                      </PromptInputAction>
                    </div>
                    {isTyping ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsTyping(false)}
                        className="rounded-lg bg-[#212121] hover:bg-[#333] dark:bg-[#e4e4e4] dark:hover:bg-[#ccc]"
                        title="Stop generating"
                      >
                        <Square className="w-3 h-3 text-white dark:text-[#1e2229] fill-white dark:fill-[#1e2229]" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={input.trim() ? handleSend : undefined}
                        disabled={!input.trim()}
                        className={`rounded-lg shadow-sm disabled:opacity-100 ${
                          input.trim()
                            ? "bg-[#2552ED] hover:bg-[#1E44CC]"
                            : "bg-[#e8e8e8] dark:bg-[#333a47]"
                        }`}
                        title="Send message"
                      >
                        <ArrowUp className={`w-[14px] h-[14px] ${input.trim() ? "text-white" : "text-[#bbb] dark:text-[#4d5568]"}`} strokeWidth={2.5} />
                      </Button>
                    )}
                  </PromptInputActions>
                </PromptInput>
              </div>
            </>
          )}

          {/* ═══ Manual Customization Content ═══ */}
          {mode === "manual" && (
            <div className="flex-1 overflow-y-auto px-4 py-2">

              {/* ── Theme Style ── */}
              <div className="border-b border-[#f0f0f0] dark:border-[#333a47]">
                <SectionHeader section="style" icon={<Palette className="w-[14px] h-[14px]" />} label="Theme" />
                {expandedSection === "style" && (
                  <div className="pb-4 pl-7">
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-[11px] text-[#777] dark:text-[#6b7280] leading-tight">Use one of our report styles below to change how analytics are visualized.</p>
                      <button className="flex items-center gap-1 text-[11px] text-[#2552ED] hover:underline shrink-0 ml-2">
                        <Sparkles className="w-3 h-3" />
                        View more
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {stylePresets.map(style => {
                        const isSelected = selectedStyle === style.id;
                        const accent = style.linkColor;
                        const isDark = style.preview === "dark-analytics";
                        return (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`rounded-xl border-2 overflow-hidden transition-all text-left cursor-pointer ${
                              isSelected
                                ? "border-[#2552ED] shadow-[0_0_0_1px_#2552ED]"
                                : "border-[#e8eaed] dark:border-[#333a47] hover:border-[#ccc] dark:hover:border-[#3d4555] hover:shadow-sm"
                            }`}
                          >
                            {/* Chart preview illustration */}
                            <div className="p-2.5 pb-2" style={{ background: style.headerBg }}>
                              <div
                                className="rounded-lg overflow-hidden shadow-sm"
                                style={{ backgroundColor: style.cardBg, border: `1px solid ${style.borderColor}`, height: 56 }}
                              >
                                {style.preview === "default" && (
                                  <div className="p-2 h-full flex flex-col justify-between">
                                    <div className="flex gap-2">
                                      <div className="flex-1 rounded px-1 py-0.5" style={{ backgroundColor: style.borderColor }}>
                                        <div className="text-[8px]" style={{ color: style.titleColor, fontWeight: 400 }}>1.1K</div>
                                        <div className="w-full h-[3px] rounded-sm mt-0.5" style={{ backgroundColor: accent, opacity: 0.3 }} />
                                      </div>
                                      <div className="flex-1 rounded px-1 py-0.5" style={{ backgroundColor: style.borderColor }}>
                                        <div className="text-[8px]" style={{ color: style.titleColor, fontWeight: 400 }}>89%</div>
                                        <div className="w-3/4 h-[3px] rounded-sm mt-0.5" style={{ backgroundColor: accent, opacity: 0.3 }} />
                                      </div>
                                    </div>
                                    <svg viewBox="0 0 100 18" className="w-full" style={{ height: 18 }}>
                                      <polyline points="0,14 15,10 30,12 50,6 65,8 80,3 100,5" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6" />
                                      <polyline points="0,14 15,10 30,12 50,6 65,8 80,3 100,5 100,18 0,18" fill={accent} opacity="0.08" />
                                    </svg>
                                  </div>
                                )}
                                {style.preview === "executive" && (
                                  <div className="p-2 h-full flex flex-col justify-between">
                                    <div className="flex gap-2">
                                      <div className="flex-1">
                                        <div className="text-[9px]" style={{ color: style.titleColor, fontWeight: 400 }}>1.1K</div>
                                        <div className="text-[6px] mt-px" style={{ color: style.bodyColor }}>impressions</div>
                                      </div>
                                      <div className="flex-1">
                                        <div className="text-[9px]" style={{ color: style.titleColor, fontWeight: 400 }}>143</div>
                                        <div className="text-[6px] mt-px" style={{ color: style.bodyColor }}>clicks</div>
                                      </div>
                                    </div>
                                    <svg viewBox="0 0 100 20" className="w-full" style={{ height: 16 }}>
                                      <polyline points="0,16 12,14 25,10 38,12 50,4 55,3 60,8 75,10 90,7 100,9" fill="none" stroke={accent} strokeWidth="1.5" />
                                      <polyline points="0,16 12,14 25,10 38,12 50,4 55,3 60,8 75,10 90,7 100,9 100,20 0,20" fill={accent} opacity="0.1" />
                                      <circle cx="50" cy="4" r="2" fill={accent} opacity="0.8" />
                                      <line x1="50" y1="0" x2="50" y2="4" stroke={accent} strokeWidth="0.5" opacity="0.5" strokeDasharray="1,1" />
                                    </svg>
                                  </div>
                                )}
                                {style.preview === "presentation" && (
                                  <div className="p-2 h-full flex flex-col justify-center">
                                    <div className="text-[11px] mb-1" style={{ color: style.titleColor, fontWeight: 400 }}>1.1K</div>
                                    <svg viewBox="0 0 100 22" className="w-full" style={{ height: 22 }}>
                                      <defs>
                                        <linearGradient id={`grad-${style.id}`} x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
                                          <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
                                        </linearGradient>
                                      </defs>
                                      <path d="M0,18 Q20,16 35,12 T60,6 T85,4 T100,8 L100,22 L0,22Z" fill={`url(#grad-${style.id})`} />
                                      <path d="M0,18 Q20,16 35,12 T60,6 T85,4 T100,8" fill="none" stroke={accent} strokeWidth="1.8" />
                                    </svg>
                                  </div>
                                )}
                                {style.preview === "insight" && (
                                  <div className="p-2 h-full flex flex-col justify-between">
                                    <div className="flex gap-1 items-center">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                                      <div className="text-[6px]" style={{ color: style.bodyColor }}>Timeline</div>
                                    </div>
                                    <svg viewBox="0 0 100 24" className="w-full" style={{ height: 24 }}>
                                      <line x1="0" y1="18" x2="100" y2="18" stroke={style.borderColor} strokeWidth="0.5" />
                                      <polyline points="5,16 20,12 35,14 50,6 65,10 80,8 95,12" fill="none" stroke={accent} strokeWidth="1.5" />
                                      {[{x:20,y:12},{x:50,y:6},{x:80,y:8}].map((p,i) => (
                                        <g key={i}>
                                          <circle cx={p.x} cy={p.y} r="2.5" fill="#fff" stroke={accent} strokeWidth="1" />
                                          <circle cx={p.x} cy={p.y} r="1" fill={accent} />
                                        </g>
                                      ))}
                                      <text x="18" y="8" fontSize="4" fill={style.bodyColor}>post</text>
                                      <text x="47" y="2" fontSize="4" fill={accent} fontWeight="400">spike</text>
                                    </svg>
                                  </div>
                                )}
                                {style.preview === "minimal" && (
                                  <div className="p-2 h-full flex flex-col justify-between">
                                    <div className="text-[10px]" style={{ color: style.titleColor, fontWeight: 400 }}>1.1K</div>
                                    <svg viewBox="0 0 100 16" className="w-full" style={{ height: 14 }}>
                                      {[
                                        {x:0,h:4},{x:8,h:6},{x:16,h:9},{x:24,h:7},{x:32,h:12},{x:40,h:8},{x:48,h:6},
                                        {x:56,h:10},{x:64,h:14},{x:72,h:8},{x:80,h:5},{x:88,h:7}
                                      ].map((b,i) => (
                                        <rect key={i} x={b.x} y={16-b.h} width="6" height={b.h} rx="1" fill={accent} opacity={0.15 + (b.h / 14) * 0.5} />
                                      ))}
                                    </svg>
                                  </div>
                                )}
                                {style.preview === "dark-analytics" && (
                                  <div className="p-2 h-full flex flex-col justify-between" style={{ backgroundColor: style.bg }}>
                                    <div className="text-[10px]" style={{ color: style.titleColor, fontWeight: 400 }}>1.1K</div>
                                    <svg viewBox="0 0 100 20" className="w-full" style={{ height: 18 }}>
                                      <defs>
                                        <linearGradient id="glow-dark" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
                                          <stop offset="100%" stopColor={accent} stopOpacity="0" />
                                        </linearGradient>
                                      </defs>
                                      <path d="M0,16 Q15,14 25,10 T50,6 T75,4 T100,8 L100,20 L0,20Z" fill="url(#glow-dark)" />
                                      <path d="M0,16 Q15,14 25,10 T50,6 T75,4 T100,8" fill="none" stroke={accent} strokeWidth="1.5" />
                                      <circle cx="75" cy="4" r="2" fill={accent} opacity="0.9" />
                                      <circle cx="75" cy="4" r="4" fill={accent} opacity="0.15" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="px-2.5 py-1.5 flex items-center gap-1.5 bg-white dark:bg-[#262b35]" style={{ backgroundColor: isDark ? style.bg : undefined }}>
                              {isSelected && <Check className="w-3 h-3 text-[#2552ED]" />}
                              <span
                                className={`text-[11px] ${isSelected ? "text-[#2552ED]" : "text-[#212121] dark:text-[#e4e4e4]"}`}
                                style={{ fontWeight: isSelected ? 400 : 300, color: isSelected ? undefined : (isDark ? style.titleColor : undefined) }}
                              >{style.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ── Layout ── */}
              <div className="border-b border-[#f0f0f0] dark:border-[#333a47]">
                <SectionHeader section="layout" icon={<Maximize className="w-[14px] h-[14px]" />} label="Layout" />
                {expandedSection === "layout" && (
                  <div className="pb-4 space-y-3 pl-7">
                    <div className="grid grid-cols-2 gap-2">
                      {layoutOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedLayout(opt.id)}
                          className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg border transition-colors ${
                            selectedLayout === opt.id
                              ? "border-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e]"
                              : "border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#fafafa] dark:hover:bg-[#2e3340]"
                          }`}
                        >
                          <span className="text-[18px]">{opt.icon}</span>
                          <span className="text-[11px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{opt.label}</span>
                          <span className="text-[9px] text-[#999] dark:text-[#6b7280]">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                    {/* Text alignment */}
                    <div>
                      <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1.5 block">Text alignment</label>
                      <div className="flex bg-[#f0f1f5] dark:bg-[#262b35] rounded-md p-0.5 w-fit">
                        {([
                          { key: "left" as const, icon: <AlignLeft className="w-3.5 h-3.5" /> },
                          { key: "center" as const, icon: <AlignCenter className="w-3.5 h-3.5" /> },
                          { key: "right" as const, icon: <AlignRight className="w-3.5 h-3.5" /> },
                        ]).map(a => (
                          <button
                            key={a.key}
                            onClick={() => setTextAlign(a.key)}
                            className={`p-2 rounded transition-colors ${
                              textAlign === a.key ? "bg-white dark:bg-[#333a47] shadow-sm text-[#212121] dark:text-[#e4e4e4]" : "text-[#999] dark:text-[#6b7280]"
                            }`}
                          >
                            {a.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Page Cover ── */}
              <div className="border-b border-[#f0f0f0] dark:border-[#333a47]">
                <SectionHeader section="cover" icon={<BookOpen className="w-[14px] h-[14px]" />} label="Page cover" />
                {expandedSection === "cover" && (
                  <div className="pb-4 space-y-3 pl-7">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Show cover page</span>
                      <Toggle checked={showCoverPage} onChange={setShowCoverPage} />
                    </div>
                    {showCoverPage && (
                      <>
                        <div>
                          <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1 block">Title</label>
                          <input
                            type="text"
                            value={coverTitle}
                            onChange={e => setCoverTitle(e.target.value)}
                            className="w-full border border-[#e5e9f0] dark:border-[#333a47] rounded px-2.5 py-1.5 text-[12px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] outline-none focus:border-[#2552ED]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1 block">Subtitle</label>
                          <input
                            type="text"
                            value={coverSubtitle}
                            onChange={e => setCoverSubtitle(e.target.value)}
                            className="w-full border border-[#e5e9f0] dark:border-[#333a47] rounded px-2.5 py-1.5 text-[12px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] outline-none focus:border-[#2552ED]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1 block">Date</label>
                          <input
                            type="text"
                            value={coverDate}
                            onChange={e => setCoverDate(e.target.value)}
                            className="w-full border border-[#e5e9f0] dark:border-[#333a47] rounded px-2.5 py-1.5 text-[12px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] outline-none focus:border-[#2552ED]"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Show logo</span>
                          <Toggle checked={showLogo} onChange={setShowLogo} />
                        </div>
                        {showLogo && (
                          <div>
                            <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1.5 block">Change logo</label>
                            <div className="space-y-2.5">
                              {/* Current logo preview */}
                              {customLogoUrl && (
                                <div className="flex items-center gap-2.5 p-2 rounded-lg border border-[#e5e9f0] dark:border-[#333a47] bg-[#fafafa] dark:bg-[#262b35]">
                                  <img src={customLogoUrl} alt="Current logo" className="w-10 h-10 object-contain rounded" />
                                  <span className="text-[11px] text-[#555] dark:text-[#9ba2b0] flex-1 truncate">Custom logo</span>
                                  <button
                                    onClick={() => setCustomLogoUrl(null)}
                                    className="p-1 rounded hover:bg-[#eee] dark:hover:bg-[#2e3340] transition-colors"
                                    title="Remove logo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-[#999]" />
                                  </button>
                                </div>
                              )}
                              {/* Upload button */}
                              <button
                                onClick={() => logoFileRef.current?.click()}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-dashed border-[#ccc] dark:border-[#3d4555] hover:border-[#2552ED] hover:bg-[#f5f8ff] dark:hover:bg-[#1e2d5e] transition-all text-left"
                              >
                                <Upload className="w-[14px] h-[14px] text-[#999] dark:text-[#6b7280] shrink-0" />
                                <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Upload from device</span>
                              </button>
                              {/* Search by website */}
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <div className="flex-1 flex items-center gap-2 border border-[#e5e9f0] dark:border-[#333a47] rounded-lg px-2.5 py-1.5 focus-within:border-[#2552ED] transition-colors bg-white dark:bg-[#262b35]">
                                    <Globe className="w-3.5 h-3.5 text-[#999] dark:text-[#6b7280] shrink-0" />
                                    <input
                                      type="text"
                                      value={logoSearchUrl}
                                      onChange={e => { setLogoSearchUrl(e.target.value); setLogoSearchError(""); }}
                                      onKeyDown={e => e.key === "Enter" && handleLogoSearch()}
                                      placeholder="company.com"
                                      className="flex-1 text-[12px] text-[#212121] dark:text-[#e4e4e4] outline-none bg-transparent placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] min-w-0"
                                    />
                                  </div>
                                  <button
                                    onClick={handleLogoSearch}
                                    disabled={isFetchingLogo || !logoSearchUrl.trim()}
                                    className="px-2.5 py-1.5 rounded-lg bg-[#2552ED] hover:bg-[#1E44CC] disabled:bg-[#ccc] transition-colors shrink-0"
                                  >
                                    {isFetchingLogo ? (
                                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                                    ) : (
                                      <Search className="w-3.5 h-3.5 text-white" />
                                    )}
                                  </button>
                                </div>
                                {logoSearchError && (
                                  <p className="text-[10px] text-[#C62828] mt-1">{logoSearchError}</p>
                                )}
                              </div>
                            </div>
                            <input
                              ref={logoFileRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                handleLogoUpload(e);
                                // Reset so re-uploading the same file works
                                if (logoFileRef.current) logoFileRef.current.value = "";
                              }}
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Summary page</span>
                          <Toggle checked={showSummaryPage} onChange={onToggleSummaryPage} />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* ── Theme ── */}
              <div className="border-b border-[#f0f0f0] dark:border-[#333a47]">
                <SectionHeader section="theme" icon={<Palette className="w-[14px] h-[14px]" />} label="Colors" />
                {expandedSection === "theme" && (
                  <div className="pb-4 space-y-3 pl-7">
                    <label className="text-[11px] text-[#999] dark:text-[#6b7280] block">Accent color</label>
                    <div className="flex flex-wrap gap-2">
                      {colorPresets.map(p => (
                        <button
                          key={p.color}
                          onClick={() => onThemeColorChange(p.color)}
                          className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#333a47] shadow-md hover:scale-110 transition-transform"
                          style={{ backgroundColor: p.color }}
                          title={p.name}
                        >
                          {themeColor === p.color && <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />}
                        </button>
                      ))}
                    </div>

                  </div>
                )}
              </div>

              {/* ── Font Type ── */}
              <div className="border-b border-[#f0f0f0] dark:border-[#333a47]">
                <SectionHeader section="font" icon={<Type className="w-[14px] h-[14px]" />} label="Font type" />
                {expandedSection === "font" && (
                  <div className="pb-4 space-y-3 pl-7">
                    {/* Font size control */}
                    <div>
                      <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1.5 block">Font size</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFontScale(prev => Math.max(75, prev - 5))}
                          disabled={fontScale <= 75}
                          className={`w-7 h-7 rounded-md border border-[#e5e9f0] dark:border-[#333a47] flex items-center justify-center transition-colors ${fontScale <= 75 ? "text-[#ccc] dark:text-[#4d5568] cursor-not-allowed" : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0]"}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex-1">
                          <input
                            type="range"
                            min={75}
                            max={150}
                            step={5}
                            value={fontScale}
                            onChange={e => setFontScale(Number(e.target.value))}
                            className="w-full h-1 bg-[#e5e9f0] dark:bg-[#333a47] rounded-full appearance-none cursor-pointer accent-[#2552ED]"
                          />
                        </div>
                        <button
                          onClick={() => setFontScale(prev => Math.min(150, prev + 5))}
                          disabled={fontScale >= 150}
                          className={`w-7 h-7 rounded-md border border-[#e5e9f0] dark:border-[#333a47] flex items-center justify-center transition-colors ${fontScale >= 150 ? "text-[#ccc] dark:text-[#4d5568] cursor-not-allowed" : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0]"}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-[#999] dark:text-[#6b7280]">75%</span>
                        <button
                          onClick={() => setFontScale(100)}
                          className={`text-[11px] transition-colors ${fontScale !== 100 ? "text-[#2552ED] hover:underline cursor-pointer" : "text-[#999] dark:text-[#6b7280]"}`}
                        >
                          {fontScale}%{fontScale !== 100 ? " — Reset" : ""}
                        </button>
                        <span className="text-[10px] text-[#999] dark:text-[#6b7280]">150%</span>
                      </div>
                    </div>

                    {/* Font family selection */}
                    <div>
                      <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1.5 block">Font family</label>
                      <div className="space-y-1.5">
                        {fontOptions.map(f => (
                          <button
                            key={f.name}
                            onClick={() => setSelectedFont(f.name)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${
                              selectedFont === f.name ? "border-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e]" : "border-[#e5e9f0] dark:border-[#333a47] hover:bg-[#fafafa] dark:hover:bg-[#2e3340]"
                            }`}
                          >
                            <div>
                              <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4] block" style={{ fontFamily: f.family, fontWeight: 400 }}>
                                {f.name}
                              </span>
                              <span className="text-[10px] text-[#999] dark:text-[#6b7280]">{f.style}</span>
                            </div>
                            {selectedFont === f.name && <Check className="w-4 h-4 text-[#2552ED]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Padding & Spacing ── */}
              <div className="border-b border-[#f0f0f0] dark:border-[#333a47]">
                <SectionHeader section="padding" icon={<Maximize className="w-[14px] h-[14px]" />} label="Padding & spacing" />
                {expandedSection === "padding" && (
                  <div className="pb-4 space-y-3 pl-7">
                    <label className="text-[11px] text-[#999] dark:text-[#6b7280] block">Page padding</label>
                    <div className="flex bg-[#f0f1f5] dark:bg-[#262b35] rounded-md p-0.5">
                      {(["compact", "normal", "spacious"] as const).map(s => (
                        <button
                          key={s}
                          onClick={() => setPaddingSize(s)}
                          className={`flex-1 py-1.5 rounded text-[12px] capitalize transition-colors ${
                            paddingSize === s ? "bg-white dark:bg-[#333a47] shadow-sm text-[#212121] dark:text-[#e4e4e4]" : "text-[#999] dark:text-[#6b7280]"
                          }`}
                          style={{ fontWeight: paddingSize === s ? 400 : 300 }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#fafafa] dark:bg-[#262b35] rounded-md px-3 py-2 mt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#555] dark:text-[#9ba2b0]">Inner padding</span>
                        <span className="text-[11px] text-[#2552ED]" style={{ fontWeight: 400 }}>{pagePadding}px</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Headers & Footers ── */}
              <div>
                <SectionHeader section="header" icon={<FileEdit className="w-[14px] h-[14px]" />} label="Headers & footers" />
                {expandedSection === "header" && (
                  <div className="pb-4 space-y-3 pl-7">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Show header</span>
                      <Toggle checked={showHeader} onChange={setShowHeader} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Show footer</span>
                      <Toggle checked={showFooter} onChange={setShowFooter} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]">Page numbers</span>
                      <Toggle checked={showPageNumbers} onChange={setShowPageNumbers} />
                    </div>
                    {showHeader && (
                      <div>
                        <label className="text-[11px] text-[#999] dark:text-[#6b7280] mb-1 block">Footer text</label>
                        <input
                          type="text"
                          value={headerText}
                          onChange={e => setHeaderText(e.target.value)}
                          className="w-full border border-[#e5e9f0] dark:border-[#333a47] rounded px-2.5 py-1.5 text-[12px] text-[#212121] dark:text-[#e4e4e4] bg-white dark:bg-[#262b35] outline-none focus:border-[#2552ED]"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right - Preview + Thumbnails */}
        <div className="flex-1 bg-[#f2f4f7] dark:bg-[#13161b] flex flex-col min-w-0 relative transition-colors duration-300">
          {/* Toolbar */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20" data-no-print>
            <div className="flex items-center gap-0.5 bg-white dark:bg-[#22262f] rounded-full shadow-[0px_2px_12px_rgba(0,0,0,0.12)] dark:shadow-[0px_2px_12px_rgba(0,0,0,0.35)] px-1.5 py-1">
              {/* Group 1: Page view */}
              <button onClick={() => setViewMode("single")} title="Single-page view" className={`p-1.5 rounded-full transition-colors ${viewMode === "single" ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED]" : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0]"}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="0.8"/><line x1="5" y1="7.5" x2="11" y2="7.5" stroke="currentColor" strokeWidth="0.8"/><line x1="5" y1="10" x2="9" y2="10" stroke="currentColor" strokeWidth="0.8"/></svg>
              </button>
              <button onClick={() => setViewMode("two")} title="Two-page view" className={`p-1.5 rounded-full transition-colors ${viewMode === "two" ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED]" : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0]"}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="9" y="2" width="6" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/></svg>
              </button>

              <div className="w-px h-4 bg-[#ddd] dark:bg-[#3d4555] mx-0.5 shrink-0" />

              {/* Group 2: Zoom controls — Acrobat-style */}
              <button onClick={() => { setAutoFit(false); setZoomPercent(p => Math.max(25, p - 10)); }} title="Zoom out (−)" className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors text-[#555] dark:text-[#9ba2b0]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="4.5" y1="7" x2="9.5" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>
              <div className="relative" ref={zoomDropdownRef}>
                <button
                  onClick={() => setShowZoomDropdown(!showZoomDropdown)}
                  title="Zoom level"
                  className={`text-[12px] min-w-[46px] text-center tabular-nums select-none cursor-pointer rounded-full px-1.5 py-0.5 transition-colors flex items-center gap-0.5 justify-center ${autoFit ? "text-[#2552ED]" : "text-[#555] dark:text-[#9ba2b0] hover:text-[#2552ED]"}`}
                >
                  {zoomPercent}%
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
                {showZoomDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white dark:bg-[#22262f] rounded-lg shadow-[0px_4px_16px_rgba(0,0,0,0.14)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.35)] border border-[#e8eaed] dark:border-[#333a47] py-1 w-[140px] z-50">
                    {zoomPresets.map((item, i) => {
                      if ('divider' in item) return <div key={i} className="h-px bg-[#e8eaed] dark:bg-[#333a47] my-1" />;
                      const isActive = item.value === -1 ? autoFit : item.value === -2 ? false : (!autoFit && zoomPercent === item.value);
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (item.value === -1) {
                              setAutoFit(true);
                            } else if (item.value === -2) {
                              // Fit page: calculate zoom to fit full page height
                              const container = previewContainerRef.current;
                              if (container) {
                                const availH = container.clientHeight - 48;
                                const fitZoom = Math.min(400, Math.max(25, Math.round((availH / pageH) * 100)));
                                setAutoFit(false);
                                setZoomPercent(fitZoom);
                              }
                            } else {
                              setAutoFit(false);
                              setZoomPercent(item.value);
                            }
                            setShowZoomDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 text-[12px] transition-colors ${isActive ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED]" : "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#333] dark:text-[#e4e4e4]"}`}
                          style={{ fontWeight: isActive ? 400 : 300 }}
                        >
                          <span>{item.label}</span>
                          {isActive && <Check className="w-3 h-3 text-[#2552ED]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <button onClick={() => { setAutoFit(false); setZoomPercent(p => Math.min(400, p + 10)); }} title="Zoom in (+)" className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors text-[#555] dark:text-[#9ba2b0]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="4.5" y1="7" x2="9.5" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="7" y1="4.5" x2="7" y2="9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              </button>

              <div className="w-px h-4 bg-[#ddd] dark:bg-[#3d4555] mx-0.5 shrink-0" />

              {/* Group 3: Undo / Redo */}
              <button onClick={handleUndo} title="Undo" className={`p-1.5 rounded-full transition-colors ${canUndo ? "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0]" : "text-[#ccc] dark:text-[#4d5568] cursor-not-allowed"}`} disabled={!canUndo}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 7L2 4L5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 4H10C12.2091 4 14 5.79086 14 8V8C14 10.2091 12.2091 12 10 12H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </button>
              <button onClick={handleRedo} title="Redo" className={`p-1.5 rounded-full transition-colors ${canRedo ? "hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0]" : "text-[#ccc] dark:text-[#4d5568] cursor-not-allowed"}`} disabled={!canRedo}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 7L14 4L11 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4H6C3.79086 4 2 5.79086 2 8V8C2 10.2091 3.79086 12 6 12H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </button>
            </div>
          </div>

          {/* Preview area with A4 cards + right thumbnail strip */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Scrollable page cards */}
            <div className="flex-1 overflow-auto p-6" ref={previewContainerRef}>
              <div
                data-print-pages-container
                className={`${viewMode === "two" ? "flex flex-wrap justify-center gap-6" : "flex flex-col items-center gap-6"}`}
                style={{
                  transform: `scale(${zoomPercent / 100})`,
                  transformOrigin: "top center",
                  minHeight: `${100 / (zoomPercent / 100)}%`,
                  paddingBottom: `${Math.max(24, 24 * (zoomPercent / 100))}px`,
                }}
              >

                {/* Cover page card */}
                {showCoverPage && <div data-page-index="0" data-print-page>{renderCoverPage()}</div>}

                {/* Summary page card */}
                {showSummaryPage && (
                  <div
                    data-page-index={showCoverPage ? 1 : 0}
                    data-print-page
                    className="shadow-[0px_4px_16px_rgba(0,0,0,0.1)] overflow-hidden shrink-0"
                    style={{ width: pageW, height: pageH, borderRadius: 6, backgroundColor: currentStyle.bg, borderTop: `2px solid ${themeColor}` }}
                  >
                    <div className="w-full h-full flex flex-col" style={{ padding: pagePadding }}>
                      <div className="flex items-center gap-1 mb-2">
                        {renderLogo("small")}
                        {!customLogoUrl && (
                          <span className="text-[7px]" style={{ fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, fontWeight: 400, color: themeColor }}>Birdeye</span>
                        )}
                      </div>
                      <h3 className="mb-1.5" style={{ fontSize: fs(20), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, fontWeight: 400, color: currentStyle.titleColor }}>Executive Summary</h3>
                      <p className="mb-2 leading-[1.5]" style={{ fontSize: fs(12), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, color: currentStyle.bodyColor }}>
                        Comprehensive overview of your social media profile performance over the last 30 days with positive growth trends across all platforms.
                      </p>
                      <div className="grid grid-cols-2 gap-1.5 mb-2">
                        {[
                          { label: "Impressions", value: "1.1K", change: "+4.8%" },
                          { label: "Engagement", value: "143", change: "+98.6%" },
                          { label: "Eng. Rate", value: "13.2%", change: "+6.3%" },
                          { label: "Link Clicks", value: "0", change: "" },
                        ].map(m => (
                          <div key={m.label} className="rounded p-1.5" style={{ backgroundColor: currentStyle.cardBg, border: `1px solid ${currentStyle.borderColor}` }}>
                            <p className="mb-0.5" style={{ fontSize: fs(10), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, color: currentStyle.bodyColor, opacity: 0.7 }}>{m.label}</p>
                            <p style={{ fontSize: fs(20), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, fontWeight: 400, color: currentStyle.titleColor }}>{m.value}</p>
                            {m.change && <span style={{ fontSize: fs(10), color: currentStyle.linkColor }}>{m.change}</span>}
                          </div>
                        ))}
                      </div>
                      <p className="mb-1.5" style={{ fontSize: fs(12), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, fontWeight: 400, color: currentStyle.titleColor }}>Key Insights</p>
                      <div className="space-y-1 flex-1">
                        {[
                          "Engagement saw a significant increase of 98.6%, indicating strong audience interaction.",
                          "Total audience grew by 4.5% to 92 members across all connected platforms.",
                          "Impressions increased by 4.8%, reflecting improved content reach and visibility.",
                        ].map((insight, i) => (
                          <div key={i} className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full mt-[3px] shrink-0" style={{ backgroundColor: themeColor }} />
                            <span className="leading-[1.4]" style={{ fontSize: fs(11), fontFamily: fontOptions.find(f => f.name === selectedFont)?.family, color: currentStyle.bodyColor }}>{insight}</span>
                          </div>
                        ))}
                      </div>
                      {showFooter && (
                        <div className="flex justify-between items-center pt-2 mt-auto" style={{ borderTop: `1px solid ${currentStyle.borderColor}` }}>
                          <span className="text-[5px]" style={{ color: currentStyle.bodyColor, opacity: 0.6 }}>{headerText}</span>
                          {showPageNumbers && <span className="text-[5px]" style={{ color: currentStyle.bodyColor, opacity: 0.6 }}>Page {showCoverPage ? 2 : 1}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Report pages — filtered by visibility & ordered */}
                {selectedStyle === "default" ? (
                  /* Default theme: original Figma static images */
                  visibleReportPages.map((origIdx, seqIdx) => {
                    const pageNum = (showCoverPage ? 1 : 0) + (showSummaryPage ? 1 : 0) + seqIdx + 1;
                    const pageIndex = (showCoverPage ? 1 : 0) + (showSummaryPage ? 1 : 0) + seqIdx;
                    return (
                      <div
                        key={origIdx}
                        data-page-index={pageIndex}
                        data-print-page
                        className="shadow-[0px_4px_16px_rgba(0,0,0,0.1)] overflow-hidden shrink-0 flex flex-col"
                        style={{ width: pageW, height: pageH, borderRadius: 6, backgroundColor: "#fff" }}
                      >
                        <div className="flex-1 min-h-0 overflow-hidden flex items-start" style={{ padding: pagePadding }}>
                          <img src={defaultStaticImages[origIdx]} alt={`Report page ${seqIdx + 1}`} className="w-full" />
                        </div>
                        {showFooter && (
                          <div className="flex justify-between items-center px-3 py-1.5" style={{ borderTop: "1px solid #e0e0e0" }}>
                            <span className="text-[5px]" style={{ color: "#666", opacity: 0.6 }}>{headerText}</span>
                            {showPageNumbers && <span className="text-[5px]" style={{ color: "#666", opacity: 0.6 }}>Page {pageNum}</span>}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  /* Other themes: live Recharts components */
                  visibleReportPages.map((origIdx, seqIdx) => {
                    const page = reportPages[origIdx];
                    const pageNum = (showCoverPage ? 1 : 0) + (showSummaryPage ? 1 : 0) + seqIdx + 1;
                    const pageIndex = (showCoverPage ? 1 : 0) + (showSummaryPage ? 1 : 0) + seqIdx;
                    const rpProps: ReportPageProps = {
                      themeColor,
                      selectedFont,
                      fontScale,
                      pagePadding,
                      textAlign,
                      showHeader,
                      showFooter,
                      showPageNumbers,
                      headerText,
                      pageNumber: pageNum,
                      pageW,
                      pageH,
                      titleColor: currentStyle.titleColor,
                      bodyColor: currentStyle.bodyColor,
                      borderColor: currentStyle.borderColor,
                      cardBg: currentStyle.cardBg,
                      bg: currentStyle.bg,
                    };
                    return (
                      <div
                        key={origIdx}
                        data-page-index={pageIndex}
                        data-print-page
                        className="shadow-[0px_4px_16px_rgba(0,0,0,0.1)] overflow-hidden shrink-0"
                        style={{ width: pageW, height: pageH, borderRadius: 6, backgroundColor: currentStyle.bg, borderTop: `2px solid ${themeColor}` }}
                      >
                        <page.Component {...rpProps} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right thumbnail strip */}
            {/* Right page navigation panel — Gamma-style */}
            <div className="w-[120px] bg-white dark:bg-[#1e2229] border-l border-[#e5e9f0] dark:border-[#333a47] shrink-0 flex flex-col transition-colors duration-300" data-no-print>
              {/* Panel header */}
              <div className="px-2.5 pt-2.5 pb-1.5 border-b border-[#f0f0f0] dark:border-[#333a47]">
                <p className="text-[10px] text-[#999] dark:text-[#6b7280] tracking-wide uppercase">Pages</p>
              </div>
              {/* Scrollable thumbnails */}
              <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2.5">
                {/* Cover thumbnail */}
                {(() => {
                  const pageNum = 1;
                  return (
                    <div className="w-full group relative">
                      <button onClick={() => showCoverPage && scrollToPage(0)} className={`w-full cursor-pointer text-left ${!showCoverPage ? "opacity-40" : ""}`} disabled={!showCoverPage}>
                        <div
                          className="w-full rounded-lg overflow-hidden border-2 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] group-hover:border-[#2552ED]/40"
                          style={{ aspectRatio: `1/${currentLayout.ratio}`, backgroundColor: currentStyle.bg, borderColor: 'var(--thumb-border, #e5e9f0)' }}
                        >
                          <div className="w-full h-full flex flex-col items-center justify-center p-1.5 relative [--thumb-border:#e5e9f0] dark:[--thumb-border:#333a47]">
                            <div className="absolute inset-0 opacity-5">
                              <img src={imgCover} alt="" className="w-full h-full object-cover" />
                            </div>
                            {showLogo && (
                              <div className="relative z-10 mb-0.5">{renderLogo("thumb")}</div>
                            )}
                            <div className="w-3/4 h-[2px] rounded mt-1 relative z-10" style={{ backgroundColor: currentStyle.borderColor }} />
                            <div className="w-1/2 h-[1px] rounded mt-0.5 relative z-10" style={{ backgroundColor: currentStyle.borderColor }} />
                            {showCoverPage && (
                              <div className="absolute bottom-1 left-1 w-4 h-4 rounded flex items-center justify-center bg-white/90 dark:bg-[#22262f]/90 shadow-sm border border-[#e5e9f0] dark:border-[#333a47]">
                                <span className="text-[8px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 400 }}>{pageNum}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[9px] text-[#777] dark:text-[#6b7280] mt-1 px-0.5 truncate">{coverTitle || "Cover"}</p>
                      </button>
                      <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-0.5 z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowCoverPage(!showCoverPage); }}
                          title={showCoverPage ? "Hide cover page" : "Show cover page"}
                          className="w-5 h-5 rounded bg-white/95 dark:bg-[#22262f]/95 shadow-sm border border-[#e0e0e0] dark:border-[#3d4555] flex items-center justify-center hover:bg-[#f0f0f0] dark:hover:bg-[#2e3340] transition-colors"
                        >
                          {showCoverPage ? <Eye className="w-2.5 h-2.5 text-[#555] dark:text-[#9ba2b0]" /> : <EyeOff className="w-2.5 h-2.5 text-[#999] dark:text-[#6b7280]" />}
                        </button>
                      </div>
                    </div>
                  );
                })()}
                {/* Summary thumbnail */}
                {(() => {
                  const pageNum = (showCoverPage ? 1 : 0) + 1;
                  return (
                    <div className="w-full group relative">
                      <button onClick={() => showSummaryPage && scrollToPage(showCoverPage ? 1 : 0)} className={`w-full cursor-pointer text-left ${!showSummaryPage ? "opacity-40" : ""}`} disabled={!showSummaryPage}>
                        <div
                          className="w-full rounded-lg overflow-hidden border-2 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] group-hover:border-[#2552ED]/40"
                          style={{ aspectRatio: `1/${currentLayout.ratio}`, backgroundColor: currentStyle.bg, borderColor: '#e5e9f0' }}
                        >
                          <div className="w-full h-full p-1.5 relative" style={{ borderTop: `2px solid ${themeColor}` }}>
                            <div className="w-6 h-0.5 rounded mb-0.5" style={{ backgroundColor: themeColor }} />
                            <div className="w-full h-0.5 rounded mb-0.5" style={{ backgroundColor: currentStyle.borderColor }} />
                            <div className="w-3/4 h-0.5 rounded mb-1" style={{ backgroundColor: currentStyle.borderColor }} />
                            <div className="grid grid-cols-2 gap-0.5">
                              {[1,2,3,4].map(n => (
                                <div key={n} className="rounded-sm p-0.5" style={{ backgroundColor: currentStyle.cardBg }}>
                                  <div className="w-full h-[2px] rounded" style={{ backgroundColor: currentStyle.borderColor }} />
                                </div>
                              ))}
                            </div>
                            {showSummaryPage && (
                              <div className="absolute bottom-1 left-1 w-4 h-4 rounded flex items-center justify-center bg-white/90 dark:bg-[#22262f]/90 shadow-sm border border-[#e5e9f0] dark:border-[#333a47]">
                                <span className="text-[8px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 400 }}>{pageNum}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-[9px] text-[#777] dark:text-[#6b7280] mt-1 px-0.5 truncate">Summary</p>
                      </button>
                      <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-0.5 z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); onToggleSummaryPage(!showSummaryPage); }}
                          title={showSummaryPage ? "Hide summary page" : "Show summary page"}
                          className="w-5 h-5 rounded bg-white/95 dark:bg-[#22262f]/95 shadow-sm border border-[#e0e0e0] dark:border-[#3d4555] flex items-center justify-center hover:bg-[#f0f0f0] dark:hover:bg-[#2e3340] transition-colors"
                        >
                          {showSummaryPage ? <Eye className="w-2.5 h-2.5 text-[#555] dark:text-[#9ba2b0]" /> : <EyeOff className="w-2.5 h-2.5 text-[#999] dark:text-[#6b7280]" />}
                        </button>
                      </div>
                    </div>
                  );
                })()}
                {/* Report page thumbnails — drag to reorder */}
                <DndProvider backend={HTML5Backend}>
                {reportPageOrder.map((origIdx, posIdx) => {
                  const isHidden = hiddenReportPages.has(origIdx);
                  const visibleBefore = reportPageOrder.slice(0, posIdx).filter(i => !hiddenReportPages.has(i)).length;
                  const scrollIdx = (showCoverPage ? 1 : 0) + (showSummaryPage ? 1 : 0) + visibleBefore;
                  const displayNum = scrollIdx + 1;
                  const page = reportPages[origIdx];
                  const isChart = [0, 1, 2, 4, 5, 7].includes(origIdx);
                  const isTable = [3, 6].includes(origIdx);
                  return (
                    <DraggableReportThumb
                      key={origIdx}
                      origIdx={origIdx}
                      posIdx={posIdx}
                      totalCount={reportPageOrder.length}
                      onMove={reorderReportPage}
                    >
                      <div className="w-full group relative">
                        {/* Drag handle — appears on hover, Apple-style subtle grip */}
                        <div
                          className="absolute -left-0.5 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-grab active:cursor-grabbing"
                          style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
                        >
                          <div className="w-[14px] h-[24px] rounded-[4px] bg-white/95 dark:bg-[#22262f]/95 shadow-[0_1px_4px_rgba(0,0,0,0.12)] border border-[#e0e0e0]/60 dark:border-[#3d4555]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-150">
                            <GripVertical className="w-[9px] h-[9px] text-[#999] dark:text-[#6b7280]" />
                          </div>
                        </div>
                        <button
                          onClick={() => !isHidden && scrollToPage(scrollIdx)}
                          className={`w-full cursor-pointer text-left ${isHidden ? "opacity-40" : ""}`}
                          disabled={isHidden}
                        >
                          {selectedStyle === "default" ? (
                            <div
                              className="w-full rounded-lg overflow-hidden border-2 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] relative"
                              style={{ aspectRatio: `1/${currentLayout.ratio}`, backgroundColor: "#fff", borderColor: '#e5e9f0' }}
                            >
                              <img src={defaultStaticImages[origIdx]} alt="" className="w-full h-full object-cover object-top" />
                              {!isHidden && (
                                <div className="absolute bottom-1 left-1 w-4 h-4 rounded flex items-center justify-center bg-white/90 dark:bg-[#22262f]/90 shadow-sm border border-[#e5e9f0] dark:border-[#333a47]">
                                  <span className="text-[8px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 400 }}>{displayNum}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div
                              className="w-full rounded-lg overflow-hidden border-2 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.08)] relative"
                              style={{ aspectRatio: `1/${currentLayout.ratio}`, backgroundColor: currentStyle.bg, borderColor: '#e5e9f0' }}
                            >
                              <div className="w-full h-full p-2" style={{ borderTop: `2px solid ${themeColor}` }}>
                                <div className="w-3/4 h-[2px] rounded mb-1" style={{ backgroundColor: themeColor }} />
                                <div className="w-1/2 h-[1px] rounded mb-1.5" style={{ backgroundColor: currentStyle.borderColor }} />
                                {isChart ? (
                                  <div className="flex items-end gap-[2px] h-[40%] px-0.5">
                                    {[35, 55, 45, 70, 60, 80].map((h, i) => (
                                      <div key={i} className="flex-1 rounded-t-[1px]" style={{ height: `${h}%`, backgroundColor: themeColor, opacity: 0.35 + i * 0.1 }} />
                                    ))}
                                  </div>
                                ) : isTable ? (
                                  <div className="space-y-[2px]">
                                    <div className="w-full h-[2px] rounded" style={{ backgroundColor: themeColor, opacity: 0.5 }} />
                                    {[1,2,3,4].map(n => (
                                      <div key={n} className="w-full h-[1px] rounded" style={{ backgroundColor: currentStyle.borderColor }} />
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex gap-1">
                                    <div className="flex-1 rounded-sm" style={{ backgroundColor: themeColor, opacity: 0.15, height: 14 }} />
                                    <div className="flex-1 space-y-[2px] pt-0.5">
                                      <div className="w-full h-[1px] rounded" style={{ backgroundColor: currentStyle.borderColor }} />
                                      <div className="w-3/4 h-[1px] rounded" style={{ backgroundColor: currentStyle.borderColor }} />
                                    </div>
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-0.5 mt-1.5">
                                  {[1,2].map(n => (
                                    <div key={n} className="rounded-sm p-0.5" style={{ backgroundColor: currentStyle.cardBg }}>
                                      <div className="w-full h-[1px] rounded" style={{ backgroundColor: currentStyle.borderColor }} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {!isHidden && (
                                <div className="absolute bottom-1 left-1 w-4 h-4 rounded flex items-center justify-center bg-white/90 dark:bg-[#22262f]/90 shadow-sm border border-[#e5e9f0] dark:border-[#333a47]">
                                  <span className="text-[8px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 400 }}>{displayNum}</span>
                                </div>
                              )}
                            </div>
                          )}
                          <p className="text-[9px] text-[#777] dark:text-[#6b7280] mt-1 px-0.5 truncate">{page?.title || `Page ${displayNum}`}</p>
                        </button>
                        {/* Hover action bar — streamlined (drag replaces move up/down) */}
                        <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col gap-0.5 z-10" style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleReportPageVisibility(origIdx); }}
                            title={isHidden ? "Show page" : "Hide page"}
                            className="w-5 h-5 rounded-[5px] bg-white/95 dark:bg-[#22262f]/95 shadow-[0_1px_4px_rgba(0,0,0,0.1)] border border-[#e0e0e0]/60 dark:border-[#3d4555]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] hover:shadow-[0_2px_6px_rgba(0,0,0,0.14)] transition-all duration-150"
                          >
                            {isHidden ? <EyeOff className="w-2.5 h-2.5 text-[#999] dark:text-[#6b7280]" /> : <Eye className="w-2.5 h-2.5 text-[#555] dark:text-[#9ba2b0]" />}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteReportPage(origIdx); }}
                            title="Delete page"
                            className="w-5 h-5 rounded-[5px] bg-white/95 dark:bg-[#22262f]/95 shadow-[0_1px_4px_rgba(0,0,0,0.1)] border border-[#e0e0e0]/60 dark:border-[#3d4555]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#fee2e2] dark:hover:bg-[#3b1c1c] hover:shadow-[0_2px_6px_rgba(0,0,0,0.14)] transition-all duration-150"
                          >
                            <Trash2 className="w-2.5 h-2.5 text-[#dc2626]" />
                          </button>
                        </div>
                      </div>
                    </DraggableReportThumb>
                  );
                })}
                </DndProvider>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        onCustomize={() => setShowShareModal(false)}
        themeColor={themeColor}
        showSummaryPage={showSummaryPage}
        initialTab={shareModalTab}
        hidePreview
      />

      {/* Schedule Modal (opened from schedule entry mode) */}
      <ScheduleModal
        open={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onCustomize={() => setShowScheduleModal(false)}
        themeColor={themeColor}
        showSummaryPage={showSummaryPage}
      />
    </div>
  );
}