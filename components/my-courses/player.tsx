import ProtectedVideo from "../protected-component";
import VideoMeta from "./meta";
import { Language } from "@/lib/translations/language";
import CourseActions from "./actions-client";
import { IVideo } from "@/models/video.model";

interface CoursePlayerProps {
  video: IVideo;
  lang: Language;
  userId: string;
  courseSlug: string;
  nextVideoSlug?: string | null;
  completedLessons: string[];
}

export default function CoursePlayer({
  video,
  lang,
  userId,
  courseSlug,
  nextVideoSlug,
  completedLessons,
}: CoursePlayerProps) {
  const isCompleted = completedLessons.includes(video.slug);

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
        <div className="aspect-video">
          <ProtectedVideo videoId={video.videoId} />
        </div>
      </div>

      <div className="flex-1 lg:max-w-2xl">
        <VideoMeta video={video} lang={lang} />
      </div>

      <div className="lg:hidden">
        <CourseActions
          userId={userId}
          courseSlug={courseSlug}
          videoSlug={video.slug}
          nextVideoSlug={nextVideoSlug}
          defaultCompleted={isCompleted}
        />
      </div>
    </div>
  );
}
