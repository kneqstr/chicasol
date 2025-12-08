"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

type Blocks = {
  heading: string;
  text: string;
};

type VideoProps = {
  title: string;
  videoUrl: string;
  blocks: Blocks[];
};

export function AuthorVideoMessage({ content }: { content: VideoProps }) {
  const { title, blocks, videoUrl } = content;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">{title}</h2>

            <div className="space-y-6">
              {blocks.map((section, idx) => (
                <div key={idx} className="bg-muted/30 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{section.heading}</h3>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={videoUrl}
                className="absolute inset-0 h-full w-full border-0 rounded-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                title="Авторское видео-обращение"
              />
            </AspectRatio>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
