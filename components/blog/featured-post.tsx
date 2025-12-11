"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Language } from "@/lib/translations/language";
import { IBlog } from "@/models/blog.model";

type BlogPostsProps = {
  lang: Language;
  posts: IBlog[];
};

export function FeaturedPosts({ lang, posts }: BlogPostsProps) {
  return (
    <section className="py-12 max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">
        {lang === "ru" ? "Популярные статьи" : "Популярні статті"}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post: IBlog) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="overflow-hidden">
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{post.title?.[lang]}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
