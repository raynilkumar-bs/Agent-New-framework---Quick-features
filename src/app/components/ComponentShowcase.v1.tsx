import { useState } from "react";
import {
  Eye, EyeOff, Check, X, Copy, Link2, ChevronDown, ChevronRight,
  Sun, Moon, Monitor, Sparkles, Settings, Share2, Download,
  Plus, Minus, Search, Bell, Trash2, Edit3, MoreHorizontal,
  ArrowLeft, ArrowRight, Loader2, Info, AlertTriangle, CheckCircle2,
  XCircle,
} from "lucide-react";
import { useTheme } from "./useTheme";

/* ══════════════════════════════════════════════════
   Design token palette
   ══════════════════════════════════════════════════ */
const darkPalette = [
  { token: "--bg-body",       hex: "#13161b", label: "Body background" },
  { token: "--bg-sidebar",    hex: "#181b22", label: "Sidebar / TopBar" },
  { token: "--bg-surface-1",  hex: "#1e2229", label: "Surface 1 (cards)" },
  { token: "--bg-surface-2",  hex: "#22262f", label: "Surface 2 (popover)" },
  { token: "--bg-surface-3",  hex: "#262b35", label: "Surface 3 (inputs)" },
  { token: "--bg-hover",      hex: "#2e3340", label: "Hover state" },
  { token: "--border-subtle",  hex: "#333a47", label: "Border subtle" },
  { token: "--border-strong",  hex: "#3d4555", label: "Border strong" },
  { token: "--text-muted",    hex: "#8b92a5", label: "Muted text" },
];

const lightPalette = [
  { token: "--bg-body",       hex: "#e0e5eb", label: "Body background" },
  { token: "--bg-sidebar",    hex: "#ffffff", label: "Card / sidebar" },
  { token: "--bg-surface-1",  hex: "#f8f9fa", label: "Surface 1" },
  { token: "--bg-surface-2",  hex: "#f2f4f7", label: "Surface 2 (canvas)" },
  { token: "--bg-hover",      hex: "#f5f5f5", label: "Hover state" },
  { token: "--border-subtle",  hex: "#e5e9f0", label: "Border subtle" },
  { token: "--border-strong",  hex: "#d0d5dc", label: "Border strong" },
  { token: "--text-primary",  hex: "#212121", label: "Primary text" },
  { token: "--text-muted",    hex: "#999999", label: "Muted text" },
];

const accentColor = "#2552ED";

/* ══════════════════════════════════════════════════
   Section wrapper
   ══════════════════════════════════════════════════ */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#e5e9f0] dark:border-[#333a47] rounded-xl bg-white dark:bg-[#1e2229] transition-colors duration-300 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#f8f9fa] dark:hover:bg-[#22262f] transition-colors"
      >
        <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>{title}</span>
        <ChevronRight
          className={`w-4 h-4 text-[#999] dark:text-[#6b7280] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-[#f0f0f0] dark:border-[#333a47]">
          {children}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Row helper
   ══════════════════════════════════════════════════ */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-2.5">
      <span className="w-[120px] shrink-0 text-[11px] text-[#999] dark:text-[#6b7280] pt-1.5">{label}</span>
      <div className="flex-1 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Component Showcase
   ══════════════════════════════════════════════════ */
export function ComponentShowcase() {
  const { isDark } = useTheme();
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);
  const [activeTab, setActiveTab] = useState("share");
  const [radio, setRadio] = useState("light");
  const [checked, setChecked] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [sliderVal, setSliderVal] = useState(75);
  const palette = isDark ? darkPalette : lightPalette;

  return (
    <div className="flex-1 overflow-y-auto bg-[#f2f4f7] dark:bg-[#13161b] transition-colors duration-300">
      <div className="max-w-[860px] mx-auto px-6 py-8 space-y-4">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-[18px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>
            Component showcase
          </h1>
          <p className="text-[13px] text-[#999] dark:text-[#6b7280] mt-1" style={{ fontWeight: 300 }}>
            Design system primitives with full light / dark mode parity. All interaction states shown.
          </p>
        </div>

        {/* ── Color Tokens ── */}
        <Section title="Color tokens">
          <p className="text-[11px] text-[#999] dark:text-[#6b7280] mb-3">{isDark ? "Dark" : "Light"} mode palette (bluish-grey, not pure black)</p>
          <div className="grid grid-cols-3 gap-2">
            {palette.map(c => (
              <div key={c.token} className="flex items-center gap-2.5 bg-[#f8f9fa] dark:bg-[#262b35] rounded-lg px-3 py-2 border border-[#f0f0f0] dark:border-[#333a47]">
                <div className="w-7 h-7 rounded-md border border-[#e5e9f0] dark:border-[#3d4555] shrink-0" style={{ backgroundColor: c.hex }} />
                <div className="min-w-0">
                  <p className="text-[11px] text-[#212121] dark:text-[#e4e4e4] truncate" style={{ fontWeight: 400 }}>{c.hex}</p>
                  <p className="text-[9px] text-[#999] dark:text-[#6b7280] truncate">{c.label}</p>
                </div>
              </div>
            ))}
            {/* Accent */}
            <div className="flex items-center gap-2.5 bg-[#f8f9fa] dark:bg-[#262b35] rounded-lg px-3 py-2 border border-[#f0f0f0] dark:border-[#333a47]">
              <div className="w-7 h-7 rounded-md border border-[#e5e9f0] dark:border-[#3d4555] shrink-0" style={{ backgroundColor: accentColor }} />
              <div className="min-w-0">
                <p className="text-[11px] text-[#212121] dark:text-[#e4e4e4] truncate" style={{ fontWeight: 400 }}>{accentColor}</p>
                <p className="text-[9px] text-[#999] dark:text-[#6b7280] truncate">Accent / primary</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography">
          <p className="text-[11px] text-[#999] dark:text-[#6b7280] mb-3">Inter only &middot; weight 400 (medium) + 300 (light) &middot; sentence case everywhere</p>
          <div className="space-y-3">
            <div>
              <span className="text-[18px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Heading large &mdash; 18px / 400</span>
            </div>
            <div>
              <span className="text-[15px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Heading medium &mdash; 15px / 400</span>
            </div>
            <div>
              <span className="text-[13px] text-[#212121] dark:text-[#e4e4e4]" style={{ fontWeight: 400 }}>Body text &mdash; 13px / 400</span>
            </div>
            <div>
              <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 300 }}>Secondary text &mdash; 12px / 300</span>
            </div>
            <div>
              <span className="text-[11px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Caption / label &mdash; 11px / 300</span>
            </div>
            <div>
              <span className="text-[10px] text-[#bbb] dark:text-[#4d5568]" style={{ fontWeight: 300 }}>Micro &mdash; 10px / 300</span>
            </div>
          </div>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <Row label="Primary">
            <button className="px-4 py-[6px] text-[12px] text-white rounded-[8px] transition-all shadow-sm hover:shadow" style={{ fontWeight: 400, backgroundColor: accentColor }}>
              Default
            </button>
            <button className="px-4 py-[6px] text-[12px] text-white rounded-[8px] transition-all shadow-sm" style={{ fontWeight: 400, backgroundColor: accentColor, filter: "brightness(0.92)" }}>
              Hover
            </button>
            <button className="px-4 py-[6px] text-[12px] text-white rounded-[8px] transition-all shadow-sm" style={{ fontWeight: 400, backgroundColor: accentColor, filter: "brightness(0.85)" }}>
              Active
            </button>
            <button className="px-4 py-[6px] text-[12px] text-white rounded-[8px] opacity-50 cursor-not-allowed" style={{ fontWeight: 400, backgroundColor: accentColor }}>
              Disabled
            </button>
            <button className="px-4 py-[6px] text-[12px] text-white rounded-[8px] flex items-center gap-1.5" style={{ fontWeight: 400, backgroundColor: accentColor }}>
              <Loader2 className="w-3 h-3 animate-spin" /> Loading
            </button>
          </Row>
          <Row label="Secondary">
            <button className="px-3 py-[6px] text-[12px] text-[#666] dark:text-[#9ba2b0] rounded-[8px] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] border border-[#e5e9f0] dark:border-[#333a47] transition-colors" style={{ fontWeight: 400 }}>
              Cancel
            </button>
            <button className="px-3 py-[6px] text-[12px] text-[#666] dark:text-[#9ba2b0] rounded-[8px] bg-[#f5f5f5] dark:bg-[#2e3340] border border-[#e5e9f0] dark:border-[#333a47]" style={{ fontWeight: 400 }}>
              Hover
            </button>
            <button className="px-3 py-[6px] text-[12px] text-[#666] dark:text-[#9ba2b0] rounded-[8px] opacity-50 cursor-not-allowed border border-[#e5e9f0] dark:border-[#333a47]" style={{ fontWeight: 400 }}>
              Disabled
            </button>
          </Row>
          <Row label="Ghost / icon">
            <button className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0] transition-colors">
              <Settings className="w-[14px] h-[14px]" />
            </button>
            <button className="p-1.5 rounded-full bg-[#f5f5f5] dark:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0] transition-colors">
              <Edit3 className="w-[14px] h-[14px]" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-[#fee2e2] dark:hover:bg-[#3b1c1c] text-[#ef4444] transition-colors">
              <Trash2 className="w-[14px] h-[14px]" />
            </button>
            <button className="p-1.5 rounded-full text-[#ccc] dark:text-[#4d5568] cursor-not-allowed">
              <MoreHorizontal className="w-[14px] h-[14px]" />
            </button>
          </Row>
          <Row label="AI / gradient">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] hover:bg-[#f5f3ff] dark:hover:bg-[#1e2d5e] transition-colors group border border-[#e8def6] dark:border-[#2d2d50]">
              <Sparkles className="w-3.5 h-3.5 text-[#9970D7]" />
              <span className="text-[11px] bg-gradient-to-r from-[#9970D7] to-[#2552ED] bg-clip-text text-transparent" style={{ fontWeight: 400 }}>
                Customise with BirdAI
              </span>
            </button>
          </Row>
        </Section>

        {/* ── Inputs ── */}
        <Section title="Inputs">
          <Row label="Text input">
            <div className="flex-1 max-w-[280px]">
              <input
                type="text"
                placeholder="Placeholder text..."
                className="w-full h-[36px] px-3 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#bbb] dark:placeholder:text-[#4d5568] border border-[#eceef2] dark:border-[#333a47] rounded-lg bg-white dark:bg-[#262b35] outline-none focus:border-[#7BA3F5] dark:focus:border-[#5580e0] focus:shadow-[0_0_0_3px_rgba(37,82,237,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(37,82,237,0.2)] transition-all"
              />
            </div>
          </Row>
          <Row label="Search">
            <div className="flex items-center gap-2 px-3 py-[7px] bg-[#f8f9fa] dark:bg-[#262b35] border border-[#e5e9f0] dark:border-[#333a47] rounded-lg w-[280px]">
              <Search className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#6b7280]" />
              <input
                type="text"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-[12px] text-[#333] dark:text-[#e4e4e4] placeholder:text-[#b0b0b0] dark:placeholder:text-[#6b7280] bg-transparent outline-none"
              />
            </div>
          </Row>
          <Row label="Link field">
            <div className="flex items-center gap-2 bg-[#f8f9fb] dark:bg-[#262b35] border border-[#eceef2] dark:border-[#333a47] rounded-lg px-3 h-[36px] w-[320px]">
              <Link2 className="w-3.5 h-3.5 text-[#b0b0b0] dark:text-[#4d5568] shrink-0" />
              <span className="flex-1 text-[12px] text-[#2552ED] dark:text-[#6b9bff] truncate select-all">
                share.birdeye.com/view/cc6fe16f
              </span>
              <button className="shrink-0 h-[26px] px-2.5 rounded-md text-[11px] flex items-center gap-1 bg-white dark:bg-[#262b35] border border-[#e5e7eb] dark:border-[#3d4555] text-[#555] dark:text-[#9ba2b0] hover:bg-[#f3f4f6] dark:hover:bg-[#2e3340] shadow-sm transition-colors" style={{ fontWeight: 400 }}>
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
          </Row>
          <Row label="Slider">
            <div className="flex items-center gap-3 w-[280px]">
              <span className="text-[10px] text-[#999] dark:text-[#6b7280]">0</span>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderVal}
                onChange={e => setSliderVal(+e.target.value)}
                className="flex-1 accent-[#2552ED] h-1"
              />
              <span className="text-[11px] text-[#555] dark:text-[#9ba2b0] tabular-nums w-[30px] text-right">{sliderVal}%</span>
            </div>
          </Row>
        </Section>

        {/* ── Toggles & Selection ── */}
        <Section title="Toggles and selection">
          <Row label="Toggle switch">
            <ToggleSwitch checked={toggleA} onChange={setToggleA} label="Enabled" />
            <ToggleSwitch checked={toggleB} onChange={setToggleB} label="Disabled look" />
          </Row>
          <Row label="Radio buttons">
            {(["light", "dark", "auto"] as const).map(v => (
              <button
                key={v}
                onClick={() => setRadio(v)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-colors ${
                  radio === v
                    ? "text-[#2552ED] bg-[#e8effe] dark:bg-[#1e2d5e]"
                    : "text-[#555] dark:text-[#9ba2b0] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340]"
                }`}
                style={{ fontWeight: 400 }}
              >
                <span className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${
                  radio === v ? "border-[#2552ED]" : "border-[#ccc] dark:border-[#4d5568]"
                }`}>
                  {radio === v && <span className="w-[8px] h-[8px] rounded-full bg-[#2552ED]" />}
                </span>
                <span className="capitalize">{v}</span>
              </button>
            ))}
          </Row>
          <Row label="Checkbox">
            <button
              onClick={() => setChecked(!checked)}
              className="flex items-center gap-2 text-[12px] text-[#555] dark:text-[#9ba2b0]"
              style={{ fontWeight: 400 }}
            >
              <span className={`w-[16px] h-[16px] rounded border-2 flex items-center justify-center transition-colors ${
                checked ? "border-[#2552ED] bg-[#2552ED]" : "border-[#ccc] dark:border-[#4d5568]"
              }`}>
                {checked && <Check className="w-3 h-3 text-white" />}
              </span>
              Remember me
            </button>
          </Row>
          <Row label="Segmented control">
            <div className="flex bg-[#f0f1f5] dark:bg-[#262b35] rounded-md p-0.5">
              {["compact", "normal", "spacious"].map(s => (
                <button
                  key={s}
                  className={`px-3 py-1.5 rounded text-[12px] capitalize transition-colors ${
                    s === "normal"
                      ? "bg-white dark:bg-[#333a47] shadow-sm text-[#212121] dark:text-[#e4e4e4]"
                      : "text-[#999] dark:text-[#6b7280]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {s}
                </button>
              ))}
            </div>
          </Row>
        </Section>

        {/* ── Pills & Tabs ── */}
        <Section title="Pills and tabs">
          <Row label="Pill tabs">
            <div className="flex items-center gap-0.5">
              {["share", "export", "email"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-[5px] rounded-lg text-[12px] capitalize transition-all ${
                    activeTab === tab
                      ? "bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] dark:text-[#6b9bff]"
                      : "text-[#888] dark:text-[#6b7280] hover:text-[#555] dark:hover:text-[#c0c6d4] hover:bg-[#f9fafb] dark:hover:bg-[#2e3340]"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Badge / chip">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] dark:text-[#6b9bff]" style={{ fontWeight: 400 }}>
              Active
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[#d4edda] dark:bg-[#1a3328] text-[#28a745] dark:text-[#6fcf73]" style={{ fontWeight: 400 }}>
              Success
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[#fff3cd] dark:bg-[#3a3020] text-[#856404] dark:text-[#ffd45e]" style={{ fontWeight: 400 }}>
              Warning
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[#fce4ec] dark:bg-[#3b1c1c] text-[#c62828] dark:text-[#ef9a9a]" style={{ fontWeight: 400 }}>
              Error
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-[#f0f1f5] dark:bg-[#262b35] text-[#666] dark:text-[#9ba2b0]" style={{ fontWeight: 400 }}>
              Neutral
            </span>
          </Row>
        </Section>

        {/* ── Alerts ── */}
        <Section title="Alerts and feedback">
          <div className="space-y-2">
            <AlertBox icon={<Info className="w-3.5 h-3.5" />} variant="info" message="This is an informational message about the current action." />
            <AlertBox icon={<CheckCircle2 className="w-3.5 h-3.5" />} variant="success" message="Report has been shared successfully with 3 team members." />
            <AlertBox icon={<AlertTriangle className="w-3.5 h-3.5" />} variant="warning" message="Your session will expire in 5 minutes. Save your work." />
            <AlertBox icon={<XCircle className="w-3.5 h-3.5" />} variant="error" message="Failed to export report. Please check your connection and try again." />
          </div>
        </Section>

        {/* ── Cards & Surfaces ── */}
        <Section title="Cards and surfaces">
          <div className="grid grid-cols-3 gap-3">
            {/* Default card */}
            <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#333a47] rounded-xl p-4 transition-colors">
              <p className="text-[12px] text-[#212121] dark:text-[#e4e4e4] mb-1" style={{ fontWeight: 400 }}>Default card</p>
              <p className="text-[11px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Standard surface with subtle border</p>
            </div>
            {/* Elevated card */}
            <div className="bg-white dark:bg-[#22262f] rounded-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-colors">
              <p className="text-[12px] text-[#212121] dark:text-[#e4e4e4] mb-1" style={{ fontWeight: 400 }}>Elevated card</p>
              <p className="text-[11px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Shadow elevation, no border</p>
            </div>
            {/* Interactive card */}
            <div className="bg-white dark:bg-[#1e2229] border border-[#e5e9f0] dark:border-[#333a47] rounded-xl p-4 hover:border-[#2552ED]/40 dark:hover:border-[#2552ED]/40 hover:shadow-[0_2px_8px_rgba(37,82,237,0.08)] transition-all cursor-pointer">
              <p className="text-[12px] text-[#212121] dark:text-[#e4e4e4] mb-1" style={{ fontWeight: 400 }}>Interactive card</p>
              <p className="text-[11px] text-[#999] dark:text-[#6b7280]" style={{ fontWeight: 300 }}>Hover to see accent border</p>
            </div>
          </div>
        </Section>

        {/* ── Dropdowns & Menus ── */}
        <Section title="Dropdown menu (static preview)">
          <div className="flex gap-4">
            <div className="bg-white dark:bg-[#22262f] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.14)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.35)] border border-[#e8eaed] dark:border-[#333a47] py-1 w-[200px]">
              <button className="w-full text-left px-3 py-2 text-[12px] text-[#333] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors flex items-center gap-2.5">
                <Eye className="w-3.5 h-3.5 text-[#555] dark:text-[#9ba2b0]" /> View report
              </button>
              <button className="w-full text-left px-3 py-2 text-[12px] bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED] flex items-center gap-2.5">
                <Share2 className="w-3.5 h-3.5" /> Share (selected)
              </button>
              <button className="w-full text-left px-3 py-2 text-[12px] text-[#333] dark:text-[#e4e4e4] hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] transition-colors flex items-center gap-2.5">
                <Download className="w-3.5 h-3.5 text-[#555] dark:text-[#9ba2b0]" /> Export
              </button>
              <div className="h-px bg-[#e8eaed] dark:bg-[#333a47] my-1" />
              <button className="w-full text-left px-3 py-2 text-[12px] text-[#ef4444] hover:bg-[#fee2e2] dark:hover:bg-[#3b1c1c] transition-colors flex items-center gap-2.5">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        </Section>

        {/* ── Toolbar (floating) ── */}
        <Section title="Floating toolbar">
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-0.5 bg-white dark:bg-[#22262f] rounded-full shadow-[0px_2px_12px_rgba(0,0,0,0.12)] dark:shadow-[0px_2px_12px_rgba(0,0,0,0.35)] px-2 py-1.5">
              <button className="p-1.5 rounded-full bg-[#e8effe] dark:bg-[#1e2d5e] text-[#2552ED]">
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0] transition-colors">
                <EyeOff className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-[#ddd] dark:bg-[#3d4555] mx-0.5" />
              <button className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0] transition-colors">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-[12px] text-[#555] dark:text-[#9ba2b0] px-1.5 tabular-nums min-w-[40px] text-center">100%</span>
              <button className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0] transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-[#ddd] dark:bg-[#3d4555] mx-0.5" />
              <button className="p-1.5 rounded-full hover:bg-[#f5f5f5] dark:hover:bg-[#2e3340] text-[#555] dark:text-[#9ba2b0] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-full text-[#ccc] dark:text-[#4d5568] cursor-not-allowed">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Section>

        {/* ── Icon gallery ── */}
        <Section title="Icon gallery">
          <p className="text-[11px] text-[#999] dark:text-[#6b7280] mb-3">lucide-react &middot; 16px default &middot; text color inheritance</p>
          <div className="flex flex-wrap gap-3">
            {[
              { Icon: Eye, label: "Eye" }, { Icon: EyeOff, label: "EyeOff" }, { Icon: Check, label: "Check" },
              { Icon: X, label: "X" }, { Icon: Copy, label: "Copy" }, { Icon: Link2, label: "Link2" },
              { Icon: ChevronDown, label: "ChevronDown" }, { Icon: Sun, label: "Sun" }, { Icon: Moon, label: "Moon" },
              { Icon: Monitor, label: "Monitor" }, { Icon: Sparkles, label: "Sparkles" }, { Icon: Settings, label: "Settings" },
              { Icon: Share2, label: "Share2" }, { Icon: Download, label: "Download" }, { Icon: Plus, label: "Plus" },
              { Icon: Minus, label: "Minus" }, { Icon: Search, label: "Search" }, { Icon: Bell, label: "Bell" },
              { Icon: Trash2, label: "Trash2" }, { Icon: Edit3, label: "Edit3" }, { Icon: MoreHorizontal, label: "More" },
              { Icon: Loader2, label: "Loader2" }, { Icon: Info, label: "Info" }, { Icon: AlertTriangle, label: "Warning" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 w-[56px]">
                <div className="w-9 h-9 rounded-lg bg-[#f8f9fa] dark:bg-[#262b35] border border-[#f0f0f0] dark:border-[#333a47] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#555] dark:text-[#9ba2b0]" />
                </div>
                <span className="text-[9px] text-[#999] dark:text-[#6b7280] truncate w-full text-center">{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Spacing / Padding visual ── */}
        <Section title="Spacing scale">
          <div className="space-y-2">
            {[
              { px: 4, label: "4px — micro" },
              { px: 8, label: "8px — tight" },
              { px: 12, label: "12px — compact" },
              { px: 16, label: "16px — normal" },
              { px: 24, label: "24px — relaxed" },
              { px: 32, label: "32px — spacious" },
            ].map(s => (
              <div key={s.px} className="flex items-center gap-3">
                <div className="rounded" style={{ width: s.px, height: 12, backgroundColor: accentColor, opacity: 0.6 }} />
                <span className="text-[11px] text-[#555] dark:text-[#9ba2b0]">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

/* ── Sub-components ── */

function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2"
    >
      <div className={`w-[36px] h-[20px] rounded-full relative transition-colors duration-200 ${
        checked ? "bg-[#2552ED]" : "bg-[#ccc] dark:bg-[#4d5568]"
      }`}>
        <div className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "left-[18px]" : "left-[2px]"
        }`} />
      </div>
      <span className="text-[12px] text-[#555] dark:text-[#9ba2b0]" style={{ fontWeight: 400 }}>{label}</span>
    </button>
  );
}

function AlertBox({ icon, variant, message }: { icon: React.ReactNode; variant: "info" | "success" | "warning" | "error"; message: string }) {
  const styles = {
    info: "bg-[#e8effe] dark:bg-[#1e2d5e]/50 border-[#bcd0ff] dark:border-[#2552ED]/30 text-[#2552ED] dark:text-[#6b9bff]",
    success: "bg-[#d4edda] dark:bg-[#1a3328]/50 border-[#b7dfbf] dark:border-[#28a745]/30 text-[#28a745] dark:text-[#6fcf73]",
    warning: "bg-[#fff3cd] dark:bg-[#3a3020]/50 border-[#ffe69c] dark:border-[#856404]/30 text-[#856404] dark:text-[#ffd45e]",
    error: "bg-[#fce4ec] dark:bg-[#3b1c1c]/50 border-[#f5c6cb] dark:border-[#c62828]/30 text-[#c62828] dark:text-[#ef9a9a]",
  };
  return (
    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border ${styles[variant]} transition-colors`}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <span className="text-[12px]" style={{ fontWeight: 300 }}>{message}</span>
    </div>
  );
}