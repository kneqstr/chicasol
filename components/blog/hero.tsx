"use client";

import Image from "next/image";

export function BlogHero({
  content,
}: {
  content: { title: string; subtitle: string; image: string };
}) {
  content;

  return (
    <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center text-center">
      <Image src={content?.image} alt="Blog hero" fill className="object-cover opacity-40" />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{content?.title}</h1>
        <p className="text-lg text-muted-foreground">{content?.subtitle}</p>
      </div>
    </section>
  );
}
