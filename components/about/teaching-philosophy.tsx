"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";

type TeachingItem = {
  description: string;
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
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-3xl md:text-4xl font-bold">{title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
            >
              <Card className="h-full flex justify-between p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-2xl text-primary">{item.text}</p>
                <div className="text-base text-left text-muted-foreground mb-2">
                  {item.description}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
