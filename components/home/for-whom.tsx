"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="rounded-2xl border border-muted bg-card/50 backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <span className="text-primary text-xl mt-1">•</span>
                  <p className="text-left text-sm md:text-base text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
