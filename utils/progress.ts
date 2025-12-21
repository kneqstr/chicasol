import { IVideo } from "@/models/video.model";
import { VideoDTO } from "@/types/video.dto";

export function getProgress(videos: VideoDTO[] | IVideo[], completedLessons: string[]) {
  return videos.length > 0 ? Math.round((completedLessons.length / videos.length) * 100) : 0;
}
