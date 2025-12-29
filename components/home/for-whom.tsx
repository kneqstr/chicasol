"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

type ForWhomProps = {
  heading: string;
  items: string[];
};

export function ForWhom({ content }: { content: ForWhomProps }) {
  const { heading, items } = content;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">{heading}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index}>
              <Card className="rounded-xl border bg-card backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="px-6 flex items-center gap-4">
                  <CircleCheck className="text-muted-foreground" />
                  <p className="text-left text-sm md:text-base text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
