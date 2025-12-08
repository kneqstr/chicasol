"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type TeachingItem = {
  icon: string;
  text: string;
};

type TeachingPhilosophyContent = {
  title: string;
  principles: TeachingItem[];
};

export function TeachingPhilosophy({ content }: { content: TeachingPhilosophyContent }) {
  const { title, principles } = content;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
            >
              <Card className="p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-base text-muted-foreground">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
