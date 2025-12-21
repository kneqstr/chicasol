import { IVideo } from "@/models/video.model";

export default function VideoMeta({ video, lang }: { video: IVideo; lang: "ru" | "uk" }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{video.title[lang]}</h1>

      <p className="text-gray-600">{video.description[lang]}</p>

      <div className="text-sm text-gray-500 flex gap-4">
        <span>{video.durationMinutes} min</span>
        <span>{video.views} views</span>
        <span>{video.likes} likes</span>
      </div>
    </div>
  );
}
