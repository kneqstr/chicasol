"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type AuthorHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  primaryCta?: { label: string; href: string };
};

export function AuthorHero({ content }: { content: AuthorHeroProps }) {
  const { title, subtitle, image, primaryCta } = content;

  return (
    <section className="pt-16 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">{title}</h1>

            <p className="text-base sm:text-lg text-muted-foreground">{subtitle}</p>

            {primaryCta ? (
              <Link href={primaryCta.href}>
                <Button size="lg">{primaryCta.label}</Button>
              </Link>
            ) : null}
          </div>

          <div>
            <AspectRatio ratio={4 / 5} className="rounded-2xl overflow-hidden shadow-xl">
              <Image src={image} alt={title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
