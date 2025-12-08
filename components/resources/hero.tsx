"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ResourcesHeroProps = {
  title: string;
  subtitle: string;
  collage: string[];
  ctas: {
    videos: { label: string; href: string };
    checklists: { label: string; href: string };
    meditations: { label: string; href: string };
  };
};

export function ResourcesHero({ content }: { content: ResourcesHeroProps }) {
  const { title, subtitle, collage, ctas } = content;

  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full h-full p-4">
          {collage.map((img, i) => (
            <div key={i} className="relative h-24 sm:h-32 rounded-xl overflow-hidden">
              <Image src={img} alt="resource preview" fill className="object-cover" quality={80} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{title}</h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground">{subtitle}</p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href={ctas.videos.href}>
            <Button size="lg" className="w-full sm:w-auto">
              {ctas.videos.label}
            </Button>
          </Link>

          <Link href={ctas.checklists.href}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {ctas.checklists.label}
            </Button>
          </Link>

          <Link href={ctas.meditations.href}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              {ctas.meditations.label}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
