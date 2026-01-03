import Blog, { IBlog, IBlogBlock } from "@/models/blog.model";
import { getLanguage } from "@/lib/translations/language";
import { connectDB } from "@/lib/db";
import Image from "next/image";
import { BlogViewTracker } from "@/components/blog/view-handler";
import { Eye } from "lucide-react";
import { formatDate, formatViews } from "@/utils/formater";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();

  const lang = await getLanguage();
  const { slug } = await params;

  const post: IBlog | null = await Blog.findOne({ slug }).lean();

  if (!post) {
    return <div className="p-10 text-center">Пост не найден</div>;
  }

  const sortedBlocks = [...post.blocks].sort((a, b) => a.order - b.order);



  return (
    <article className="max-w-3xl mx-auto my-20 px-4">

      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-12">
        {post.title[lang]}
      </h1>

      <div className="space-y-10">
        {sortedBlocks.map((block: IBlogBlock, index: number) => {
          switch (block.type) {
            case "h2":
              return (
                <h2
                  key={index}
                  className="mt-16 text-3xl font-bold tracking-tight border-l-4 pl-4"
                >
                  {block.content?.[lang]}
                </h2>
              );

            case "h3":
              return (
                <h3
                  key={index}
                  className="mt-10 text-2xl font-semibold tracking-tight"
                >
                  {block.content?.[lang]}
                </h3>
              );

            case "h4":
              return (
                <h4
                  key={index}
                  className="mt-6 text-lg font-semibold uppercase tracking-wide"
                >
                  {block.content?.[lang]}
                </h4>
              );

            case "text":
              return (
                <p
                  key={index}
                  className="
                text-base md:text-lg
                leading-relaxed md:leading-loose
                [&_strong]:font-semibold
                [&_em]:italic
                [&_em]:opacity-80
              "
                  dangerouslySetInnerHTML={{
                    __html: block.content?.[lang] || "",
                  }}
                />
              );

            case "image":
              if (!block.imageUrl) return null;

              return (
                <figure key={index} className="my-12">
                  <Image
                    src={block.imageUrl}
                    alt=""
                    width={1200}
                    height={700}
                    className="rounded-2xl shadow-lg object-cover"
                  />
                </figure>
              );

            case "tags":
              return (
                <div key={index} className="mt-12 flex flex-wrap gap-3">
                  {block.tags?.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
      <BlogViewTracker slug={slug} />

      <div className="flex w-full items-center mt-20 py-5 border-t justify-between">
        <div className="flex items-center gap-2 text-sm opacity-80">
          <Eye className="h-4 w-4" />
          <span>{formatViews(post.views)}</span>
        </div>

        <p className="text-sm opacity-70">
          {formatDate(new Date(post.createdAt), lang)}
        </p>
      </div>
    </article>

  );
}
