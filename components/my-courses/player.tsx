import { IVideo } from "@/models/video.model";
import ProtectedVideo from "../protected-component";
import VideoMeta from "./meta";

export default async function CoursePlayer({ video, lang }: { video: IVideo; lang: "ru" | "uk" }) {
  return (
    <div className="space-y-6">
      <ProtectedVideo videoId={video.videoId} />

      <VideoMeta video={video} lang={lang} />
    </div>
  );
}
