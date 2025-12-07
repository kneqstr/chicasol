"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
  title?: string;
};

export function FAQ({ content }: { content: FAQProps }) {
  const { title, items } = content;
  return (
    <section className="py-16" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>}

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border rounded-xl px-4 last:border-b"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
