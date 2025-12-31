"use client";

import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";
import { motion } from "framer-motion";

type AuthorSectionProps = {
  title: string;
  points: string[];
  videoUrl?: string;
  cta: { label: string; href: string };
};

export function AuthorSection({ content }: { content: AuthorSectionProps }) {
  const { title, points, videoUrl, cta } = content;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="p-8 ">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              {title}
            </motion.h2>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-3 text-base leading-relaxed"
            >
              {points.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <CircleDashed className="shrink-0 w-5 h-5" />
                  <span>{p}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex mt-8"
            >
              <Link href={cta.href}>
                <Button size="lg" className="w-full md:w-auto cursor-pointer">
                  {cta.label}
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={videoUrl}
                className="absolute inset-0 h-full w-full border-0 rounded-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                title="Author Intro"
              />
            </AspectRatio>
            <div className="p-8 md:hidden">
              <Link href={cta.href}>
                <Button size="lg" className="w-full md:w-auto cursor-pointer">
                  {cta.label}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
