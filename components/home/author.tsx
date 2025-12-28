"use client";

import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";

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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>

            <ul className="space-y-3 text-base leading-relaxed">
              {points.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <CircleDashed />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex mt-8">
              <Link href={cta.href}>
                <Button size="lg" className="w-full md:w-auto cursor-pointer">
                  {cta.label}
                </Button>
              </Link>
            </div>
          </div>

          <div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
