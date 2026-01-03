"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Language } from "@/lib/translations/language";
import { IBlog } from "@/models/blog.model";
import { formatDate } from "@/utils/formater";

type BlogPostsProps = {
  lang: Language;
  posts: IBlog[];
};

const POSTS_PER_PAGE = 5;

export default function BlogPosts({ lang, posts }: BlogPostsProps) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="max-w-4xl mx-auto px-4 mb-20">
       <h2 className="text-2xl font-bold mb-6">
        {lang === "ru" ? "Все статьи" : "Усi статті"}
      </h2>
      <div className="space-y-4">
        {visiblePosts.map((post) => {
          const imageBlock = post.blocks?.find(
            (b) => b.type === "image"
          );

          const imageUrl =
            imageBlock?.imageUrl ??
            "https://with-chicasol.b-cdn.net/yoga_main.webp";

          return (
            <Link
              key={post._id.toString()}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="flex overflow-hidden rounded-xl border bg-card hover:shadow-md transition">
                <div className="relative w-[20%] min-w-[120px] aspect-4/3">
                  <Image
                    src={imageUrl}
                    alt={post.title?.[lang]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-center p-5 w-[80%]">
                  <h2 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2">
                    {post.title?.[lang]}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-2">
                    {formatDate(new Date(post.createdAt), lang)}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
            className="rounded-lg border px-6 py-3 text-sm font-medium hover:bg-muted transition"
          >
            {lang === "ru" ? "Загрузить ещё" : "Завантажити ще"}
          </button>
        </div>
      )}
    </section>
  );
}
