import { IVideo } from "@/models/video.model";
import ProtectedVideo from "../protected-component";
import VideoMeta from "./meta";
import { Language } from "@/lib/translations/language";

export default async function CoursePlayer({ video, lang }: { video: IVideo; lang: Language }) {
  return (
    <div className="space-y-6">
      <ProtectedVideo videoId={video.videoId} />

      <VideoMeta video={video} lang={lang} />
    </div>
  );
}
