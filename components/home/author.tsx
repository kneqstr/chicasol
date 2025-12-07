"use client";

import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>

            <ul className="space-y-3 text-base leading-relaxed">
              {points.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-1 text-primary">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href={cta.href}>
                <Button size="lg" className="w-full md:w-auto">
                  {cta.label}
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <Card className="overflow-hidden rounded-2xl shadow-lg">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 h-full w-full border-0 "
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  loading="lazy"
                  title="Author Intro"
                />
              </AspectRatio>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
