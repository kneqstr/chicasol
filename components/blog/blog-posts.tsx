import { Language } from "@/lib/translations/language";
import { IBlog } from "@/models/blog.model";

type BlogPostsProps = {
  lang: Language;
  posts: IBlog[];
};

export default function BlogPosts({ lang, posts }: BlogPostsProps) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4">
      {posts.map((post: IBlog) => (
        <a
          key={post._id.toString()}
          href={`/blog/${post.slug[lang]}`}
          className="block border p-6 rounded-xl transition "
        >
          <h2 className="text-2xl font-semibold">{post.title[lang]}</h2>

          <p className="text-gray-500 text-sm mt-2">
            {new Date(post.createdAt).toLocaleDateString(lang === "ru" ? "ru-RU" : "uk-UA")}
          </p>
        </a>
      ))}
    </div>
  );
}
