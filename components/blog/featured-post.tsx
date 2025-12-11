"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Language } from "@/lib/translations/language";
import { IBlog } from "@/models/blog.model";

import blankImg from "@/public/uploads/blog/1765414186926-49058369-air1.jpg";

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
              {post.blocks.find((b) => b.type === "image")?.imageUrl && (
                <div className="relative w-full h-40">
                  <Image
                    src={post.blocks.find((b) => b.type === "image")?.imageUrl || blankImg}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              )}

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
