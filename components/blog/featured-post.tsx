"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Language } from "@/lib/translations/language";
import { IBlog } from "@/models/blog.model";
import { Eye } from "lucide-react";
import { formatDate, formatViews } from "@/utils/formater";

type BlogPostsProps = {
  lang: Language;
  posts: IBlog[];
};

export function FeaturedPosts({ lang, posts }: BlogPostsProps) {
  return (
    <section className="py-12 border-b mb-10 max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">
        {lang === "ru" ? "Популярные статьи" : "Популярні статті"}
      </h2>

      <div className="grid gap-6 md:grid-cols-3 auto-rows-fr">
        {posts.map((post) => {
          const imageBlock = post.blocks.find((b) => b.type === "image");
          const imageUrl =
            imageBlock?.imageUrl ??
            "https://with-chicasol.b-cdn.net/yoga_main.webp";

          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="relative h-full overflow-hidden rounded-xl border-none">
                <div className="absolute inset-0">
                  <Image
                    src={imageUrl}
                    alt={post.title?.[lang]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/90 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-5 min-h-[220px]">
                  <h3 className="text-lg font-semibold leading-snug line-clamp-3">
                    {post.title?.[lang]}
                  </h3>

                  <div className="mt-2 w-full flex justify-between text-sm text-accent">
                    <p>
                      {formatDate(new Date(post.createdAt), lang)}
                    </p>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(post.views)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
