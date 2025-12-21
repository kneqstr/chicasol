"use client";

import { VideoDTO } from "@/types/video.dto";
import CourseVideoItem from "./video-item";

export default function CourseSidebar({
  courseSlug,
  videos,
  activeVideoSlug,
  completedLessons,
  lang,
}: {
  courseSlug: string;
  videos: VideoDTO[];
  activeVideoSlug: string;
  completedLessons: string[];
  lang: "ru" | "uk";
}) {
  return (
    <aside className="w-[380px] border-l  overflow-y-auto">
      <div className="p-4 border-b font-semibold text-lg">Содержание курса</div>

      <div className="divide-y">
        {videos.map((video) => (
          <CourseVideoItem
            key={video.id}
            href={`/my-courses/${courseSlug}/${video.slug}`}
            title={video.title[lang]}
            duration={video.durationMinutes}
            isActive={video.slug === activeVideoSlug}
            isCompleted={completedLessons.includes(video.slug)}
          />
        ))}
      </div>
    </aside>
  );
}
