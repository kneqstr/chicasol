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

  const postsRaw: IBlog[] = await Blog.find().sort({ createdAt: -1 }).lean();

  const posts = JSON.parse(JSON.stringify(postsRaw));

  return (
    <div className="mt-20 min-h-screen">
      <BlogHero content={content.blog_page.hero} />
      <FeaturedPosts posts={posts} lang={lang} />
      <BlogPosts lang={lang} posts={posts} />
    </div>
  );
}
