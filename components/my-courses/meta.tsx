"use client";

import { useCourseProgress } from "@/hooks/use-course-progress";
import { useToggleLesson } from "@/hooks/use-toggle-lesson-mutation";
import { Language } from "@/lib/translations/language";
import { activeVideoDTO } from "@/types/video.dto";
import { CheckCircle, Circle, Eye, Heart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoMetaProps {
  video: activeVideoDTO;
  lang: Language;
  courseSlug: string;
}

export default function VideoMeta({ video, lang, courseSlug }: VideoMetaProps) {
  const { data, isPending } = useCourseProgress(courseSlug);
  const toggle = useToggleLesson(courseSlug);
  const completed = data?.completedLessons.includes(video.slug);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle.mutate({ videoSlug: video.slug, completed: !completed });
  };

  return (
    <div className="space-y-3 lg:space-y-4">
      <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
        {video.title[lang]}
      </h1>

      <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
        {video.description[lang]}
      </p>

      <div className="flex flex-wrap gap-3 lg:gap-4 pt-2">
        <StatItem
          icon={<Clock className="w-5 h-5 text-muted-foreground" />}
          label={`${video.durationMinutes} мин`}
        />
        <StatItem
          icon={<Eye className="w-5 h-5 text-muted-foreground" />}
          label={`${video.views}`}
        />
        <StatItem
          icon={<Heart className="w-5 h-5 text-muted-foreground" />}
          label={`${video.likes}`}
        />
        <StatItem
          icon={
            completed ? (
              <CheckCircle className="w-5 h-5 text-blue-600" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )
          }
          label={completed ? "Просмотрено" : "Просмотрено"}
          clickable
          disabled={isPending}
          onClick={handleToggle}
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const StatItem = ({ icon, label, clickable, onClick, disabled }: StatItemProps) => (
  <div
    onClick={clickable && !disabled ? onClick : undefined}
    className={cn(
      "inline-flex items-center gap-1 text-sm lg:text-base",
      "px-3 py-1.5 rounded-full border",
      "bg-muted/50 border-border font-medium text-foreground",
      clickable && !disabled ? "cursor-pointer hover:bg-muted/70 transition" : "",
      disabled ? "opacity-60 cursor-not-allowed" : "",
    )}
  >
    {icon}
    <span>{label}</span>
  </div>
);
