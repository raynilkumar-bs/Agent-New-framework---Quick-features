import { useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FileText,
  Info,
  Link as LinkIcon,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
} from "@/app/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Switch } from "@/app/components/ui/switch";

export type ContextField = {
  id: string;
  name: string;
  description: string;
  source: string;
  sample: string;
};

export type ContextGroup = {
  id: string;
  label: string;
  total: number;
  fields: ContextField[];
};

export type ContextSelection = {
  selected: Set<string>;
  anonymize: Set<string>;
  showInOutput: Set<string>;
};

const DEFAULT_GROUPS: ContextGroup[] = [
  {
    id: "business",
    label: "Business",
    total: 100,
    fields: [
      { id: "biz-1", name: "Provider first name", description: "Name of the business provider", source: "Birdeye", sample: "Raynil" },
      { id: "biz-2", name: "Provider last name", description: "Name of the business provider", source: "Birdeye", sample: "Kumar" },
      { id: "biz-3", name: "Business category", description: "Primary business category", source: "Birdeye", sample: "Food" },
      { id: "biz-4", name: "Service offered", description: "Service the customer received", source: "Zendesk", sample: "Consultation" },
      { id: "biz-5", name: "Business hours", description: "Operating hours of the location", source: "Zendesk", sample: "10.00 AM - 04.00 PM" },
      { id: "biz-6", name: "Location email", description: "Primary business category", source: "Birdeye", sample: "xyz@business.com" },
      { id: "biz-7", name: "Location phone", description: "Service the customer received", source: "Birdeye", sample: "+91 9829199109" },
      { id: "biz-8", name: "Location address", description: "Street address of the location", source: "Birdeye", sample: "1442 Avenida Way" },
      { id: "biz-9", name: "Business name", description: "Registered business name", source: "Birdeye", sample: "Acme Co." },
      { id: "biz-10", name: "Business website", description: "Public website URL", source: "Birdeye", sample: "acme.example" },
      { id: "biz-11", name: "Business tagline", description: "Marketing tagline", source: "Birdeye", sample: "Eat fresh, live well" },
      { id: "biz-12", name: "Year established", description: "Year the business opened", source: "Birdeye", sample: "2014" },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    total: 5,
    fields: [
      { id: "rev-1", name: "Review.comment", description: "Body of the customer review", source: "Birdeye", sample: "Loved the service" },
      { id: "rev-2", name: "Review.rating", description: "Numeric star rating", source: "Birdeye", sample: "4.5" },
      { id: "rev-3", name: "Review.source", description: "Origin platform", source: "Yelp", sample: "Yelp" },
      { id: "rev-4", name: "Review.author", description: "Reviewer display name", source: "Birdeye", sample: "Anita R." },
      { id: "rev-5", name: "Review.date", description: "Date the review was posted", source: "Birdeye", sample: "2026-04-12" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    total: 2,
    fields: [
      { id: "ct-1", name: "Contact.name", description: "Customer full name", source: "Birdeye", sample: "Jane Doe" },
      { id: "ct-2", name: "Contact.email", description: "Primary email address", source: "Birdeye", sample: "jane@example.com" },
    ],
  },
  {
    id: "survey",
    label: "Survey",
    total: 100,
    fields: [
      { id: "srv-1", name: "Survey name", description: "Name of the business provider", source: "Birdeye", sample: "Raynil" },
      { id: "srv-2", name: "Survey response", description: "Name of the business provider", source: "Birdeye", sample: "Kumar" },
      { id: "srv-3", name: "Survey NPS", description: "Primary business category", source: "Birdeye", sample: "Food" },
      { id: "srv-4", name: "Survey CSAT", description: "Customer satisfaction score", source: "Birdeye", sample: "92" },
      { id: "srv-5", name: "Survey channel", description: "Channel used to capture", source: "Birdeye", sample: "Email" },
      { id: "srv-6", name: "Survey question", description: "Question text", source: "Birdeye", sample: "How was your visit?" },
      { id: "srv-7", name: "Survey answer", description: "Free-form answer", source: "Birdeye", sample: "Excellent" },
      { id: "srv-8", name: "Survey sent date", description: "Date the survey was sent", source: "Birdeye", sample: "2026-03-22" },
    ],
  },
  {
    id: "users",
    label: "Users",
    total: 2,
    fields: [
      { id: "usr-1", name: "User name", description: "Logged-in user", source: "Birdeye", sample: "Sam K." },
      { id: "usr-2", name: "User role", description: "Permission role", source: "Birdeye", sample: "Manager" },
    ],
  },
  {
    id: "ticketing",
    label: "Ticketing",
    total: 6,
    fields: [
      { id: "tk-1", name: "Ticket id", description: "Unique ticket identifier", source: "Zendesk", sample: "T-10421" },
      { id: "tk-2", name: "Ticket subject", description: "Short subject line", source: "Zendesk", sample: "Refund request" },
      { id: "tk-3", name: "Ticket status", description: "Current state", source: "Zendesk", sample: "Open" },
      { id: "tk-4", name: "Ticket priority", description: "Priority level", source: "Zendesk", sample: "High" },
      { id: "tk-5", name: "Ticket assignee", description: "Owner of the ticket", source: "Zendesk", sample: "Priya M." },
      { id: "tk-6", name: "Ticket created", description: "Created timestamp", source: "Zendesk", sample: "2026-04-30 09:14" },
    ],
  },
];

const DEFAULT_INITIAL_SELECTED = new Set([
  "biz-1", "biz-2", "biz-3", "biz-4", "biz-5", "biz-6", "biz-7",
  "srv-1", "srv-2", "srv-3", "srv-4", "srv-5",
]);
const DEFAULT_INITIAL_ANONYMIZE = new Set([
  "biz-1", "biz-2", "biz-4", "biz-5", "biz-6", "biz-7",
  "srv-1", "srv-2",
]);
const DEFAULT_INITIAL_OUTPUT = new Set([
  "biz-1", "biz-3", "biz-4", "biz-5", "biz-6", "biz-7",
  "srv-1", "srv-3",
]);
const DEFAULT_EXPANDED = new Set(["business", "survey"]);
const TRUNCATE_AT = 7;

const TABS = ["Fields", "Knowledge", "Brand", "Industry"] as const;
type Tab = (typeof TABS)[number];

const BRAND_ITEMS: { id: string; title: string; description: string }[] = [
  {
    id: "brand-profile",
    title: "Brand Profile",
    description:
      "Everything about your business including description, mission statement, slogans, market positioning, products & services, competitors, and marketing goals",
  },
  {
    id: "brand-customers",
    title: "Target Customers",
    description:
      "Information about your customers including audience overview, buying triggers, value propositions, and key segments",
  },
  {
    id: "brand-style",
    title: "Style and Voice",
    description:
      "Visual and writing style of your business including colors, fonts, imagery style, brand personality, tone of writing, and voice guidelines for emails, social posts, blogs, and reviews",
  },
  {
    id: "brand-media",
    title: "Media",
    description:
      "Media assets including logos, favicons, social images, and other key graphics pulled from the website",
  },
  {
    id: "brand-guardrails",
    title: "Guardrails",
    description:
      "Boundaries for AI including what it should and shouldn't say, topics to avoid, preferred phrases, and any other do's and don'ts to keep content on-brand",
  },
];

type SortKey = "name" | "source" | "anonymize" | "output";
type SortDir = "asc" | "desc";

interface ContextPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (selection: ContextSelection) => void;
  groups?: ContextGroup[];
}

export function ContextPickerDialog({
  open,
  onOpenChange,
  onSave,
  groups = DEFAULT_GROUPS,
}: ContextPickerDialogProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Fields");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set(DEFAULT_EXPANDED));
  const [viewAll, setViewAll] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set(DEFAULT_INITIAL_SELECTED));
  const [anonymize, setAnonymize] = useState<Set<string>>(new Set(DEFAULT_INITIAL_ANONYMIZE));
  const [showInOutput, setShowInOutput] = useState<Set<string>>(new Set(DEFAULT_INITIAL_OUTPUT));
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "name", dir: "asc" });
  const [files, setFiles] = useState<{ id: string; name: string }[]>([
    { id: "kf-1", name: "Product list.PDF" },
  ]);
  const [links, setLinks] = useState<{ id: string; url: string }[]>([
    { id: "kl-1", url: "https://www.aspendental.com/productsandservices" },
  ]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [brandSelected, setBrandSelected] = useState<Set<string>>(
    new Set(["brand-profile", "brand-style"]),
  );
  const [industryContext, setIndustryContext] = useState(true);

  const sortedGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const dir = sort.dir === "asc" ? 1 : -1;
    return groups
      .map((g) => {
        const fields = q
          ? g.fields.filter(
              (f) =>
                f.name.toLowerCase().includes(q) ||
                f.description.toLowerCase().includes(q) ||
                f.source.toLowerCase().includes(q),
            )
          : g.fields;
        const sorted = [...fields].sort((a, b) => {
          switch (sort.key) {
            case "name":
              return a.name.localeCompare(b.name) * dir;
            case "source":
              return a.source.localeCompare(b.source) * dir;
            case "anonymize":
              return (Number(anonymize.has(a.id)) - Number(anonymize.has(b.id))) * dir;
            case "output":
              return (Number(showInOutput.has(a.id)) - Number(showInOutput.has(b.id))) * dir;
          }
        });
        return { ...g, fields: sorted };
      })
      .filter((g) => g.fields.length > 0 || !q);
  }, [groups, query, sort, anonymize, showInOutput]);

  function toggleId(set: Set<string>, id: string) {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  }

  function toggleGroup(id: string) {
    setExpanded((s) => toggleId(s, id));
  }

  function toggleViewAll(id: string) {
    setViewAll((s) => toggleId(s, id));
  }

  function handleSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  function handleGroupSelectAll(group: ContextGroup, allSelected: boolean) {
    setSelected((s) => {
      const next = new Set(s);
      if (allSelected) group.fields.forEach((f) => next.delete(f.id));
      else group.fields.forEach((f) => next.add(f.id));
      return next;
    });
  }

  function handleSave() {
    onSave?.({ selected, anonymize, showInOutput });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-[1024px] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] gap-0 rounded-lg bg-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-[#1e2229]"
          style={{ height: "min(720px, calc(100vh - 4rem))" }}
        >
          <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
            <div className="flex flex-col gap-1">
              <DialogPrimitive.Title className="text-base font-medium text-[#212121] dark:text-[#f3f4f6]">
                Context
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">
                This is sent to the LLM to improve the accuracy and quality of responses.
              </DialogPrimitive.Description>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" className="h-8 px-4" onClick={handleSave}>
                Save
              </Button>
              <DialogPrimitive.Close
                aria-label="Close"
                className="flex h-7 w-7 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#262b35] dark:hover:text-[#f3f4f6]"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>
          </header>

          <div className="flex min-h-0 flex-col">
            <div className="flex items-center gap-6 border-b border-[#e5e9f0] px-6 dark:border-[#252b35]">
              {TABS.map((t) => {
                const active = t === activeTab;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTab(t)}
                    className={`relative -mb-px py-3 text-sm transition-colors ${
                      active
                        ? "text-[#1976d2] dark:text-[#5b9bf5]"
                        : "text-[#6b7280] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:text-[#f3f4f6]"
                    }`}
                  >
                    {t}
                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#1976d2] dark:bg-[#5b9bf5]" />
                    )}
                  </button>
                );
              })}
            </div>

            {activeTab === "Fields" ? (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="px-6 pt-4 pb-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search fields"
                      className="h-10 pl-9"
                    />
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                  {sortedGroups.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center px-6 py-12 text-sm text-[#6b7280] dark:text-[#9ba2b0]">
                      No fields match "{query}".
                    </div>
                  ) : (
                    sortedGroups.map((group) => {
                      const isOpen = expanded.has(group.id);
                      const showAll = viewAll.has(group.id);
                      const visible = showAll ? group.fields : group.fields.slice(0, TRUNCATE_AT);
                      const groupSelected = group.fields.filter((f) => selected.has(f.id)).length;
                      const allSelected = group.fields.length > 0 && groupSelected === group.fields.length;
                      const someSelected = groupSelected > 0 && !allSelected;
                      const showViewMore = group.fields.length > TRUNCATE_AT;

                      return (
                        <div key={group.id} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => toggleGroup(group.id)}
                            className="sticky top-0 z-20 flex h-10 items-center gap-2 bg-[#f4f6f7] px-6 text-sm text-[#212121] transition-colors hover:bg-[#eceff3] dark:bg-[#262b35] dark:text-[#f3f4f6] dark:hover:bg-[#2c333f]"
                          >
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4 text-[#6b7280]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-[#6b7280]" />
                            )}
                            <span>
                              {group.label} ({groupSelected}/{group.total})
                            </span>
                          </button>

                          {isOpen && (
                            <>
                              <div className="sticky top-10 z-10 grid grid-cols-[40px_minmax(220px,2fr)_minmax(120px,1fr)_minmax(140px,1fr)_140px_140px] items-center gap-3 border-b border-[#e5e9f0] bg-white px-6 py-3 text-xs font-medium text-[#6b7280] dark:border-[#252b35] dark:bg-[#1e2229] dark:text-[#9ba2b0]">
                                <div className="flex items-center">
                                  <Checkbox
                                    checked={allSelected ? true : someSelected ? "indeterminate" : false}
                                    onCheckedChange={() => handleGroupSelectAll(group, allSelected)}
                                    aria-label={`Select all in ${group.label}`}
                                  />
                                </div>
                                <SortHeader label="Name" active={sort.key === "name"} dir={sort.dir} onClick={() => handleSort("name")} />
                                <SortHeader label="Source" active={sort.key === "source"} dir={sort.dir} onClick={() => handleSort("source")} />
                                <div>Sample data</div>
                                <SortHeader
                                  label="Anonymize"
                                  info
                                  active={sort.key === "anonymize"}
                                  dir={sort.dir}
                                  onClick={() => handleSort("anonymize")}
                                />
                                <SortHeader
                                  label="Show in output"
                                  info
                                  active={sort.key === "output"}
                                  dir={sort.dir}
                                  onClick={() => handleSort("output")}
                                />
                              </div>

                              {visible.map((f) => (
                                <div
                                  key={f.id}
                                  className="grid grid-cols-[40px_minmax(220px,2fr)_minmax(120px,1fr)_minmax(140px,1fr)_140px_140px] items-center gap-3 border-b border-[#e5e9f0] px-6 py-3 text-sm text-[#212121] transition-colors hover:bg-[#f8fafc] dark:border-[#252b35] dark:text-[#e4e4e4] dark:hover:bg-[#262b35]"
                                >
                                  <div className="flex items-center">
                                    <Checkbox
                                      checked={selected.has(f.id)}
                                      onCheckedChange={() => setSelected((s) => toggleId(s, f.id))}
                                      aria-label={`Select ${f.name}`}
                                    />
                                  </div>
                                  <div className="flex flex-col gap-0.5">
                                    <span className="font-medium leading-5">{f.name}</span>
                                    <span className="text-xs text-[#6b7280] dark:text-[#9ba2b0]">{f.description}</span>
                                  </div>
                                  <div className="text-[#212121] dark:text-[#e4e4e4]">{f.source}</div>
                                  <div className="truncate text-[#212121] dark:text-[#e4e4e4]">{f.sample}</div>
                                  <div className="flex items-center pl-1">
                                    <Checkbox
                                      checked={anonymize.has(f.id)}
                                      onCheckedChange={() => setAnonymize((s) => toggleId(s, f.id))}
                                      aria-label={`Anonymize ${f.name}`}
                                    />
                                  </div>
                                  <div className="flex items-center pl-1">
                                    <Checkbox
                                      checked={showInOutput.has(f.id)}
                                      onCheckedChange={() => setShowInOutput((s) => toggleId(s, f.id))}
                                      aria-label={`Show ${f.name} in output`}
                                    />
                                  </div>
                                </div>
                              ))}

                              {showViewMore && (
                                <button
                                  type="button"
                                  onClick={() => toggleViewAll(group.id)}
                                  className="self-start px-6 py-3 text-xs font-medium text-[#1976d2] hover:underline dark:text-[#5b9bf5]"
                                >
                                  {showAll ? "View less" : "View more"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : activeTab === "Knowledge" ? (
              <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-5">
                <section className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">
                    Files
                    <Info className="h-3.5 w-3.5 text-[#9ca3af]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {files.map((f) => (
                      <div
                        key={f.id}
                        className="flex h-10 items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 dark:border-[#333a47] dark:bg-[#262b35]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#e7f5ec] text-[#16a34a] dark:bg-[#143020] dark:text-[#4ade80]">
                          <FileText className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex-1 truncate text-sm text-[#212121] dark:text-[#e4e4e4]">
                          {f.name}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${f.name}`}
                          onClick={() => setFiles((s) => s.filter((x) => x.id !== f.id))}
                          className="flex h-6 w-6 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#2c333f] dark:hover:text-[#f3f4f6]"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const picked = Array.from(e.target.files ?? []);
                      if (picked.length === 0) return;
                      setFiles((s) => [
                        ...s,
                        ...picked.map((p, i) => ({
                          id: `kf-${Date.now()}-${i}`,
                          name: p.name,
                        })),
                      ]);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 self-start text-sm font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </section>

                <section className="flex flex-col gap-2">
                  <div className="text-sm font-medium text-[#212121] dark:text-[#f3f4f6]">Links</div>
                  <div className="flex flex-col gap-2">
                    {links.map((l) => (
                      <div
                        key={l.id}
                        className="flex h-10 items-center gap-2 rounded-md border border-[#e5e9f0] bg-white px-3 transition-colors focus-within:border-[#c4d5e9] dark:border-[#333a47] dark:bg-[#262b35] dark:focus-within:border-[#5580e0]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#f3e8ff] text-[#9333ea] dark:bg-[#2b1f3b] dark:text-[#c084fc]">
                          <LinkIcon className="h-3.5 w-3.5" />
                        </span>
                        <input
                          type="url"
                          value={l.url}
                          placeholder="https://"
                          onChange={(e) =>
                            setLinks((s) =>
                              s.map((x) => (x.id === l.id ? { ...x, url: e.target.value } : x)),
                            )
                          }
                          className="flex-1 bg-transparent text-sm text-[#212121] outline-none placeholder:text-[#9ca3af] dark:text-[#e4e4e4] dark:placeholder:text-[#6b7280]"
                        />
                        <button
                          type="button"
                          aria-label="Remove link"
                          onClick={() => setLinks((s) => s.filter((x) => x.id !== l.id))}
                          className="flex h-6 w-6 items-center justify-center rounded text-[#6b7280] transition-colors hover:bg-[#f4f6f7] hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:bg-[#2c333f] dark:hover:text-[#f3f4f6]"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLinks((s) => [...s, { id: `kl-${Date.now()}`, url: "" }])
                    }
                    className="inline-flex items-center gap-1 self-start text-sm font-medium text-[#1976d2] transition-colors hover:underline dark:text-[#5b9bf5]"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </section>
              </div>
            ) : activeTab === "Brand" ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-2">
                {BRAND_ITEMS.map((item) => {
                  const checked = brandSelected.has(item.id);
                  return (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-start gap-3 border-b border-[#e5e9f0] py-4 last:border-b-0 dark:border-[#252b35]"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => setBrandSelected((s) => toggleId(s, item.id))}
                        aria-label={item.title}
                        className="mt-0.5"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium leading-5 text-[#212121] dark:text-[#f3f4f6]">
                          {item.title}
                        </span>
                        <span className="text-xs leading-5 text-[#6b7280] dark:text-[#9ba2b0]">
                          {item.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : activeTab === "Industry" ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-4">
                <div className="flex items-start justify-between gap-4 py-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium leading-5 text-[#212121] dark:text-[#f3f4f6]">
                      Industry context
                    </span>
                    <span className="text-xs leading-5 text-[#6b7280] dark:text-[#9ba2b0]">
                      Built-in industry expertise and compliance guidelines created by Birdeye. Enable this to send industry context along with your prompts
                    </span>
                  </div>
                  <Switch
                    checked={industryContext}
                    onCheckedChange={setIndustryContext}
                    aria-label="Industry context"
                    className="mt-0.5"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center px-6 py-16 text-sm text-[#6b7280] dark:text-[#9ba2b0]">
                {activeTab} configuration coming soon.
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

interface SortHeaderProps {
  label: string;
  active?: boolean;
  dir?: SortDir;
  info?: boolean;
  onClick?: () => void;
}

function SortHeader({ label, active, dir, info, onClick }: SortHeaderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-left text-xs font-medium text-[#6b7280] transition-colors hover:text-[#212121] dark:text-[#9ba2b0] dark:hover:text-[#f3f4f6]"
    >
      <span>{label}</span>
      {info && <Info className="h-3.5 w-3.5 text-[#9ca3af]" />}
      {active ? (
        dir === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronDown className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  );
}
