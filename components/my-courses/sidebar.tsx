"use client";

import { VideoDTO } from "@/types/video.dto";
import CourseVideoItem from "./video-item";
import { Language } from "@/lib/translations/language";
import { getProgress } from "@/utils/progress";

interface CourseSidebarProps {
  courseSlug: string;
  videos: VideoDTO[];
  activeVideoSlug: string;
  completedLessons: string[];
  lang: Language;
  userId?: string;
}

export default function CourseSidebar({
  courseSlug,
  videos,
  activeVideoSlug,
  completedLessons,
  lang,
  userId,
}: CourseSidebarProps) {
  const progress = getProgress(videos, completedLessons);

  return (
    <aside className="hidden lg:block h-[calc(100vh-5rem)] sticky top-20  bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg text-accent-foreground">Содержание курса</h2>
        <div className="text-sm text-gray-600">
          {videos.length} уроков •{" "}
          {Math.round(videos.reduce((acc, v) => acc + v.durationMinutes, 0) / 60)} часов
        </div>
      </div>

      <div className="h-[calc(100%-7rem)] overflow-y-auto">
        <div className="p-2">
          {videos.map((video, index) => {
            const isCompleted = completedLessons.includes(video.slug);
            const isActive = video.slug === activeVideoSlug;

            return (
              <div key={video.id} className="mb-1">
                <CourseVideoItem
                  href={`/my-courses/${courseSlug}/${video.slug}`}
                  title={`${index + 1}. ${video.title[lang]}`}
                  duration={video.durationMinutes}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  videoSlug={video.slug}
                  courseSlug={courseSlug}
                  userId={userId}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Прогресс курса</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-medium">
            {completedLessons.length} из {videos.length} уроков завершено
          </div>
        </div>
      </div>
    </aside>
  );
}
