import { Language } from "@/lib/translations/language";
import { IVideo } from "@/models/video.model";
import { cn } from "@/lib/utils";

export default function VideoMeta({ video, lang }: { video: IVideo; lang: Language }) {
  return (
    <div className="space-y-3 lg:space-y-4">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
        {video.title[lang]}
      </h1>

      <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
        {video.description[lang]}
      </p>

      <div className="flex flex-wrap gap-3 lg:gap-4 pt-2">
        <div className={statItemStyle}>
          <span className="font-medium text-foreground">{video.durationMinutes}</span>
          <span className="text-muted-foreground"> мин</span>
        </div>
        <div className={statItemStyle}>
          <span className="font-medium text-foreground">{video.views}</span>
          <span className="text-muted-foreground"> просмотров</span>
        </div>
        <div className={statItemStyle}>
          <span className="font-medium text-foreground">{video.likes}</span>
          <span className="text-muted-foreground"> лайков</span>
        </div>
      </div>
    </div>
  );
}

const statItemStyle = cn(
  "inline-flex items-center text-sm lg:text-base",
  "px-3 py-1.5 rounded-full",
  "bg-muted/50 border border-border",
);
