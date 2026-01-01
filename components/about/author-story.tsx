"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

type AuthorStoryItem = {
  year: string;
  text: string;
};

type AuthorStoryContent = {
  title: string;
  timeline: AuthorStoryItem[];
};

export function AuthorStory({ content }: { content: AuthorStoryContent }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-3xl md:text-4xl font-bold">
              {content.title}
            </span>
          </div>
        </div>

        <Card className="p-8 rounded-2xl shadow-sm  hover:border-primary/30 transition-all duration-300">
          <div className="relative">
            <div className="space-y-10 ">
              {content.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary shadow ring-4 ring-primary/20" />

                  <div className="text-sm font-semibold text-primary">{item.year}</div>

                  <p className="text-muted-foreground mt-1">{item.text}</p>

                  {index !== content.timeline.length - 1 && (
                    <Separator className="my-6 opacity-40" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
