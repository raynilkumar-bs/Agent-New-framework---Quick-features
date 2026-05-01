/**
 * Search AI — Recommendations 2.0 (prototype)
 *
 * Design reference: Figma **Recommendations 2.0** — node `86-40295`
 * https://www.figma.com/design/h2UBW91Ecj9rwQHMJfZHE4/Recommendations-2.0?node-id=86-40295
 *
 * Engineering notes (audit placeholder until design signs off pixel-perfect):
 * - Variants: default list, priority filters, per-card impact + actions.
 * - Tokens: semantic Tailwind only on this surface (`bg-card`, `border-border`, …).
 * - Badges / chips: sentence case per product UI rules.
 */
import { Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { L1_STRIP_ICON_STROKE_PX } from "@/app/components/l1StripIconTokens";

export type SearchAIRecommendation = {
  id: string;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  category: string;
  platforms: string;
};

const MOCK_RECOMMENDATIONS: SearchAIRecommendation[] = [
  {
    id: "r1",
    title: "Expand answers for “emergency dentist near me”",
    description:
      "Your brand appears in 42% of AI answers for this theme on ChatGPT. Adding structured FAQs on key locations could lift visibility within two weeks.",
    impact: "High",
    category: "Themes",
    platforms: "ChatGPT, Google AI Overviews",
  },
  {
    id: "r2",
    title: "Clarify services on the downtown location page",
    description:
      "Competitors are cited more often for overlapping services. Align copy with how models summarize “walk-in” vs “scheduled” care.",
    impact: "Medium",
    category: "Listings",
    platforms: "Gemini, Perplexity",
  },
  {
    id: "r3",
    title: "Refresh review response tone for sentiment lift",
    description:
      "Sentiment on follow-up prompts trails the industry benchmark. Shorter, empathetic replies correlate with higher positive mentions in test data.",
    impact: "Low",
    category: "Reputation",
    platforms: "All sites",
  },
];

const FILTER_CHIPS = ["All", "High impact", "Medium impact", "Low impact"] as const;

function impactVariant(impact: SearchAIRecommendation["impact"]): "default" | "secondary" | "outline" {
  if (impact === "High") return "default";
  if (impact === "Medium") return "secondary";
  return "outline";
}

export function SearchAIRecommendationsPanel() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background">
      <div className="flex shrink-0 flex-col gap-1 border-b border-border px-4 py-4 sm:px-6 sm:py-4">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">Recommendations</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Prioritized actions to improve how often and how positively AI assistants mention your brand across
          platforms.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8 pt-4 sm:px-6 sm:pt-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-border shadow-none">
              <CardHeader className="gap-2 pb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Sparkles className="size-4 shrink-0" strokeWidth={L1_STRIP_ICON_STROKE_PX} absoluteStrokeWidth aria-hidden />
                  <CardDescription>Open recommendations</CardDescription>
                </div>
                <CardTitle className="text-2xl font-semibold tabular-nums text-foreground">12</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">Across all platforms</CardContent>
            </Card>
            <Card className="border-border shadow-none">
              <CardHeader className="gap-2 pb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="size-4 shrink-0" strokeWidth={L1_STRIP_ICON_STROKE_PX} absoluteStrokeWidth aria-hidden />
                  <CardDescription>High impact</CardDescription>
                </div>
                <CardTitle className="text-2xl font-semibold tabular-nums text-foreground">4</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">Suggested this week</CardContent>
            </Card>
            <Card className="border-border shadow-none">
              <CardHeader className="gap-2 pb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lightbulb className="size-4 shrink-0" strokeWidth={L1_STRIP_ICON_STROKE_PX} absoluteStrokeWidth aria-hidden />
                  <CardDescription>Est. lift</CardDescription>
                </div>
                <CardTitle className="text-2xl font-semibold tabular-nums text-foreground">+6–9%</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">Visibility if applied (mock)</CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter by impact">
            {FILTER_CHIPS.map((label) => (
              <Button
                key={label}
                type="button"
                size="sm"
                variant={label === "All" ? "default" : "outline"}
                className="rounded-full"
              >
                {label}
              </Button>
            ))}
          </div>

          <ul className="flex flex-col gap-4" aria-label="Recommendation list">
            {MOCK_RECOMMENDATIONS.map((rec) => (
              <li key={rec.id}>
                <Card className="border-border shadow-none">
                  <CardHeader className="gap-2 pb-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={impactVariant(rec.impact)}>{rec.impact}</Badge>
                        <Badge variant="outline">{rec.category}</Badge>
                      </div>
                      <CardTitle className="text-base font-semibold leading-snug text-foreground">{rec.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                        {rec.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Platforms: </span>
                      {rec.platforms}
                    </p>
                    <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                      <Button type="button" variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button type="button" size="sm">
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
