import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern and is fully keyboard accessible.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content: "Yes. It comes with default styles that match the other components' aesthetic.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div className="w-full max-w-xl">
      <h2 className="text-xl mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {[
          { q: "How do I schedule a report?", a: "Go to Reports and click the Schedule button on any report." },
          { q: "Can I share reports externally?", a: "Yes, use the Share button to generate a shareable link." },
          { q: "How do I customize my dashboard?", a: "Click the Customize button in the top right of the dashboard." },
          { q: "What integrations are supported?", a: "We support Google, Yelp, Facebook, and 50+ other platforms." },
        ].map(({ q, a }, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};
