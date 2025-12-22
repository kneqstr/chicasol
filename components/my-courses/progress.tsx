"use client";

import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "../ui/progress";

interface ProgressProps {
  courseSlug: string;
}

export default function ProgressBar({ courseSlug }: ProgressProps) {
  const { data, isPending } = useCourseProgress(courseSlug);

  if (isPending || !data) return null;

  const completed = data.completedLessons.length;
  const total = data.totalLessons;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Пройдено {completed} из {total}
        </span>
      </div>

      <Progress value={percentage} className="h-1" />
    </div>
  );
}
