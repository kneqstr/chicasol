import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface CourseHeroProps {
  title: string;
  subtitle: string;
  previewVideo: string;
}

export default function CourseHero({ title, subtitle, previewVideo }: CourseHeroProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="space-y-8 ">
        <Badge variant="secondary" className="w-fit">
          Онлайн курс
        </Badge>

        <h1 className="scroll-m-20 text-start text-4xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>
      </div>
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-lg">
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={previewVideo}
            className="absolute inset-0 h-full w-full border-0 rounded-3xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            title="Авторское видео-обращение"
          />
        </AspectRatio>
      </div>
    </section>
  );
}
