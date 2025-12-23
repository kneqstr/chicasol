"use client";

import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressBarProps {
  courseSlug: string;
}

export default function ProgressBar({ courseSlug }: ProgressBarProps) {
  const { data, isPending } = useCourseProgress(courseSlug);

  if (isPending) {
    return (
      <div className="space-y-2">
        <div className="flex">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-1 w-full" />
      </div>
    );
  }

  if (!data) return null;

  const completed = data.completedLessons.length;
  const total = data.totalLessons;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Пройдено {completed} из {total}
        </span>
        <span>{percentage}%</span>
      </div>

      <Progress value={percentage} className="h-1" />
    </div>
  );
}
