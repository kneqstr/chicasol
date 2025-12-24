"use client";

import { useCourseProgress } from "@/hooks/use-course-progress";
import { useToggleLesson } from "@/hooks/use-toggle-lesson-mutation";
import { Language } from "@/lib/translations/language";
import { activeVideoDTO } from "@/types/video.dto";
import { CheckCircle, Circle, Eye, Heart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUpdateVideoInteraction, useVideoInteractions } from "@/hooks/use-video-interactions";
import { useEffect } from "react";

interface VideoMetaProps {
  video: activeVideoDTO;
  lang: Language;
  courseSlug: string;
}

export default function VideoMeta({ video, lang, courseSlug }: VideoMetaProps) {
  const { data: progressData, isPending: isProgressPending } = useCourseProgress(courseSlug);
  const { data: interactionsData } = useVideoInteractions(courseSlug, video.slug);
  const updateInteraction = useUpdateVideoInteraction(courseSlug, video.slug);
  const toggle = useToggleLesson(courseSlug);
  const completed = progressData?.completedLessons.includes(video.slug);

  const likes = interactionsData?.video.likes ?? video.likes;
  const views = interactionsData?.video.views ?? video.views;
  const hasLiked = interactionsData?.userInteractions.hasLiked ?? false;
  const hasViewed = interactionsData?.userInteractions.hasViewed ?? false;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle.mutate({ videoSlug: video.slug, completed: !completed });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    updateInteraction.mutate({ action: "like" });
  };

  const handleTrackView = (watchedTime: number, duration: number) => {
    updateInteraction.mutate({
      action: "view",
      watchedTime,
      duration,
    });
  };

  useEffect(() => {
    if (hasViewed) return;

    const durationSeconds = video.durationMinutes * 60;
    const thresholdSeconds = durationSeconds * 0.7;

    const timeoutId = setTimeout(() => {
      handleTrackView(thresholdSeconds, durationSeconds);
    }, thresholdSeconds * 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [video.slug, hasViewed]);

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

        <StatItem icon={<Eye className="w-5 h-5 text-muted-foreground" />} label={`${views}`} />

        <StatItem
          icon={
            <Heart
              className={cn(
                "w-5 h-5",
                hasLiked ? "text-muted-foreground fill-muted-foreground" : "text-muted-foreground",
              )}
            />
          }
          label={`${likes}`}
          clickable={true}
          disabled={updateInteraction.isPending}
          onClick={handleLike}
        />

        <StatItem
          icon={
            completed ? (
              <CheckCircle className="w-5 h-5 text-blue-600" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )
          }
          label={completed ? "Просмотрено" : "Отметить как просмотренное"}
          clickable={true}
          disabled={isProgressPending}
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
      "px-3 py-1.5 rounded-full border ",
      "bg-muted/50 border-border font-medium text-foreground",
      clickable && !disabled ? "cursor-pointer hover:bg-muted/70 transition" : "",
      disabled ? "opacity-60 cursor-pointer" : "",
    )}
  >
    {icon}
    <span>{label}</span>
  </div>
);
