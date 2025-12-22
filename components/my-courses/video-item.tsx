"use client";

import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useToggleLesson } from "@/hooks/use-toggle-lesson-mutation";

interface CourseVideoItemProps {
  href: string;
  title: string;
  duration: number;
  isActive: boolean;
  isCompleted: boolean;
  videoSlug: string;
  courseSlug: string;
}

export default function CourseVideoItem({
  href,
  title,
  duration,
  isActive,
  videoSlug,
  courseSlug,
}: CourseVideoItemProps) {
  const { data, isPending } = useCourseProgress(courseSlug);
  const toggle = useToggleLesson(courseSlug);

  const completed = data?.completedLessons.includes(videoSlug);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
        "hover:bg-accent/50 active:bg-accent",
        "border-l-4 border-primary/0",
        isActive && "bg-accent border-l-4 border-primary",
        completed && !isActive && "opacity-70 ",
      )}
    >
      <div className="shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle.mutate({
              videoSlug,
              completed: !completed,
            });
          }}
          disabled={isPending}
          className="p-1 rounded-full text-muted-foreground transition-colors cursor-pointer hover:text-primary "
        >
          {completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 min-w-0">
        <span
          className={cn(
            "block truncate",
            isActive ? "text-primary font-semibold" : "text-foreground",
            completed && !isActive && "text-muted-foreground",
          )}
        >
          {title}
        </span>
      </div>

      <span
        className={cn(
          "text-xs whitespace-nowrap",
          isActive ? "text-primary font-medium" : "text-muted-foreground",
        )}
      >
        {duration} мин
      </span>
    </Link>
  );
}
