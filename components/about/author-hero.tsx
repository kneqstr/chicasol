"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type AuthorHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  primaryCta?: { label: string; href: string };
};

export function AuthorHero({ content }: { content: AuthorHeroProps }) {
  const { title, subtitle, image } = content;

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
            <p className="text-base sm:text-lg text-muted-foreground">{subtitle}</p>
          </div>
          <div>
            <AspectRatio ratio={1 / 1} className="rounded-2xl overflow-hidden shadow-xl">
              <Image src={image} alt={title} fill className="object-cover" priority />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
