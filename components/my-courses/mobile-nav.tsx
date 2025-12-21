"use client";

import { VideoDTO } from "@/types/video.dto";
import { Language } from "@/lib/translations/language";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import CourseVideoItem from "./video-item";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getProgress } from "@/utils/progress";

interface MobileCourseNavProps {
  courseSlug: string;
  videos: VideoDTO[];
  activeVideoSlug: string;
  completedLessons: string[];
  lang: Language;
  userId?: string;
}

export default function MobileCourseNav({
  courseSlug,
  videos,
  activeVideoSlug,
  completedLessons,
  lang,
  userId,
}: MobileCourseNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const progress = getProgress(videos, completedLessons);

  return (
    <>
      <div className="lg:hidden top-0 left-0 right-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-3 flex items-center justify-between">
        <div className="text-left">
          <div className="text-sm font-semibold text-accent-foreground">Прогресс: {progress}%</div>
          <div className="text-xs text-gray-500">
            Урок {videos.findIndex((v) => v.slug === activeVideoSlug) + 1}/{videos.length}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="p-2 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 overflow-hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>

          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Содержание курса</h3>
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Ваш прогресс</div>
              <div className="text-sm font-semibold text-blue-600">{progress}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
            {videos.map((video) => (
              <div key={video.id} className="relative">
                <CourseVideoItem
                  href={`/my-courses/${courseSlug}/${video.slug}`}
                  title={video.title[lang]}
                  duration={video.durationMinutes}
                  isActive={video.slug === activeVideoSlug}
                  isCompleted={completedLessons.includes(video.slug)}
                  videoSlug={video.slug}
                  courseSlug={courseSlug}
                  userId={userId}
                />
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <Button onClick={() => setIsOpen(false)} className="w-full" variant="outline">
              Закрыть меню
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
