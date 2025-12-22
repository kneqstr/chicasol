import ProtectedVideo from "../protected-component";
import VideoMeta from "./meta";
import { Language } from "@/lib/translations/language";
import CourseActions from "./actions-client";
import { activeVideoDTO } from "@/types/video.dto";

interface CoursePlayerProps {
  video: activeVideoDTO;
  lang: Language;
  courseSlug: string;
  nextVideoSlug?: string | null;
  previousVideoSlug?: string | null;
}

export default function CoursePlayer({
  video,
  lang,
  courseSlug,
  nextVideoSlug,
  previousVideoSlug,
}: CoursePlayerProps) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
        <div className="aspect-video">
          <ProtectedVideo videoId={video.videoId} />
        </div>
      </div>

      <div className="flex-1 lg:max-w-2xl">
        <VideoMeta video={video} lang={lang} courseSlug={courseSlug} />
      </div>

      <div className="lg:hidden">
        <CourseActions
          courseSlug={courseSlug}
          videoSlug={video.slug}
          nextVideoSlug={nextVideoSlug}
          previousVideoSlug={previousVideoSlug}
        />
      </div>
    </div>
  );
}
