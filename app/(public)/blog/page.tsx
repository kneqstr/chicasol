import Blog, { IBlog } from "@/models/blog.model";
import { getLanguage } from "@/lib/translations/language";
import { connectDB } from "@/lib/db";
import BlogPosts from "@/components/blog/blog-posts";
import { getPageContent } from "@/lib/translations/content";
import { BlogHero } from "@/components/blog/hero";
import { FeaturedPosts } from "@/components/blog/featured-post";

export default async function BlogPage() {
  await connectDB();
  const lang = await getLanguage();
  const content = await getPageContent("blog", lang);

  const postsRaw = await Blog.find().sort({ createdAt: -1 }).lean();
  const popularRaw = await Blog.find().sort({ views: -1 }).limit(3).lean();

  const posts = JSON.parse(JSON.stringify(postsRaw));
  const popular = JSON.parse(JSON.stringify(popularRaw))

  return (
    <div className="mt-16 min-h-screen">
      <BlogHero content={content.blog_page.hero} />
      <FeaturedPosts posts={popular} lang={lang} />
      <BlogPosts lang={lang} posts={posts} />
    </div>
  );
}
