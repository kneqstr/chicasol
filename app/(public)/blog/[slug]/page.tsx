import Blog, { IBlog, IBlogBlock } from "@/models/blog.model";
import { getLanguage } from "@/lib/translations/language";
import { connectDB } from "@/lib/db";
import Image from "next/image";

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
    <article className="max-w-3xl mx-auto mt-20 space-y-8 px-4">
      <h1 className="text-4xl font-bold">{post.title[lang]}</h1>

      <div className="space-y-10">
        {sortedBlocks.map((block: IBlogBlock, index: number) => {
          switch (block.type) {
            case "h2":
              return (
                <h2 key={index} className="text-2xl font-bold">
                  {block.content?.[lang]}
                </h2>
              );

            case "h3":
              return (
                <h3 key={index} className="text-xl font-semibold">
                  {block.content?.[lang]}
                </h3>
              );

            case "h4":
              return (
                <h4 key={index} className="text-lg font-medium">
                  {block.content?.[lang]}
                </h4>
              );

            case "text":
              return (
                <p
                  key={index}
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: block.content?.[lang] || "",
                  }}
                />
              );

            case "image":
              if (!block.imageUrl) return null;

              return (
                <div key={index} className="my-6">
                  <Image
                    src={block.imageUrl}
                    alt=""
                    width={1200}
                    height={700}
                    className="rounded-xl shadow-md object-cover"
                  />
                </div>
              );

            case "tags":
              return (
                <div key={index} className="flex flex-wrap gap-2">
                  {block.tags?.map((t: string, i: number) => (
                    <span key={i} className=" px-3 py-1 rounded-full text-sm">
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
    </article>
  );
}
