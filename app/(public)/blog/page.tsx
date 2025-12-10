import Blog, { IBlog } from "@/models/blog.model";
import { getLanguage } from "@/lib/translations/language";
import { connectDB } from "@/lib/db";
import BlogPosts from "@/components/blog/blog-posts";

export default async function BlogPage() {
  await connectDB();
  const lang = await getLanguage();
  const posts: IBlog[] = await Blog.find().sort({ createdAt: -1 }).lean().exec();

  return (
    <div className="mt-20">
      <BlogPosts lang={lang} posts={posts} />
    </div>
  );
}
