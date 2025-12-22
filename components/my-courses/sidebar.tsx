"use client";

import { VideoDTO } from "@/types/video.dto";
import CourseVideoItem from "./video-item";
import { Language } from "@/lib/translations/language";
import ProgressBar from "./progress";

interface CourseSidebarProps {
  courseSlug: string;
  videos: VideoDTO[];
  activeVideoSlug: string;
  completedLessons: string[];
  lang: Language;
}

export default function CourseSidebar({
  courseSlug,
  videos,
  activeVideoSlug,
  completedLessons,
  lang,
}: CourseSidebarProps) {
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
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <ProgressBar courseSlug={courseSlug} />
      </div>
    </aside>
  );
}
