"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight } from "lucide-react";
import { markVideoAsCompleted } from "@/services/course-actions";

interface Props {
  userId: string;
  courseSlug: string;
  videoSlug: string;
  nextVideoSlug?: string | null;
  defaultCompleted: boolean;
}

export default function CourseActions({
  userId,
  courseSlug,
  videoSlug,
  nextVideoSlug,
  defaultCompleted,
}: Props) {
  const [isCompleted, setIsCompleted] = useState(defaultCompleted);
  const [loading, setLoading] = useState(false);

  const handleMarkCompleted = async () => {
    setLoading(true);
    try {
      await markVideoAsCompleted(userId, courseSlug, videoSlug, true);
      setIsCompleted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
      <Button
        variant={isCompleted ? "outline" : "default"}
        size="lg"
        onClick={handleMarkCompleted}
        disabled={loading || isCompleted}
        className="flex-1 min-h-11 px-4 py-2.5"
      >
        {isCompleted ? (
          <>
            <CheckCircle className="w-5 h-5 mr-2 shrink-0" />
            <span className="truncate">Просмотрено</span>
          </>
        ) : (
          <span className="truncate">Отметить как просмотренное</span>
        )}
      </Button>

      {nextVideoSlug && (
        <Link href={`/my-courses/${courseSlug}/${nextVideoSlug}`} className="flex-1">
          <Button variant="outline" size="lg" className="w-full min-h-11 px-4 py-2.5">
            <span className="truncate">Следующий урок</span>
            <ChevronRight className="w-5 h-5 ml-2 shrink-0" />
          </Button>
        </Link>
      )}
    </div>
  );
}
