"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

type FinalCTAProps = {
  title: string;
  cta: { label: string; href: string };
  guarantee: string;
};

export function FinalCTA({ content }: { content: FinalCTAProps }) {
  const { title, cta } = content;

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-4 text-center"
      >
        <Card className="p-10 rounded-3xl shadow-lg bg-card border hover:border-primary/30 transition-all duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{title}</h2>

          <Link href={cta.href}>
            <Button size="lg" className="px-10 cursor-pointer">
              {cta.label}
            </Button>
          </Link>
        </Card>
      </motion.div>
    </section>
  );
}
