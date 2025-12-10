import Blog, { IBlog } from "@/models/blog.model";
import { getLanguage } from "@/lib/translations/language";
import { connectDB } from "@/lib/db";

export default async function BlogPage() {
  await connectDB();
  const lang = await getLanguage();

  const posts: IBlog[] = await Blog.find().sort({ createdAt: -1 }).lean().exec();

  return (
    <div className="max-w-3xl mx-auto mt-20 px-4">
      <h1 className="text-4xl font-bold mb-10">Блог</h1>

      <div className="space-y-6">
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
    </div>
  );
}
