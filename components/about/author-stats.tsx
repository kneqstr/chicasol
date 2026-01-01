"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type Stat = {
  icon: string;
  label: string;
  value: string;
};

type AuthorStatsProps = {
  stats: Stat[];
};

export function AuthorStats({ content }: { content: AuthorStatsProps }) {
  const { stats } = content;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card
                key={i}
                className="flex flex-col shrink-0 items-start justify-start gap-0 p-4 text-center truncate shadow-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-sm ">{item.icon}</div>
                <div className="text-2xl text-primary font-semibold">{item.value}</div>
                <div className="flex items-center shrink-0 gap-2  text-sm text-muted-foreground mt-6">
                  <Check className="h-4 w-4 shrink-0" />
                  {item.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
