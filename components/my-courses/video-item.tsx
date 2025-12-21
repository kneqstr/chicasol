"use client";

import Link from "next/link";
import { useState } from "react";
import { markVideoAsCompleted } from "@/services/course-actions";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseVideoItemProps {
  href: string;
  title: string;
  duration: number;
  isActive: boolean;
  isCompleted: boolean;
  videoSlug: string;
  courseSlug: string;
  userId?: string;
}

export default function CourseVideoItem({
  href,
  title,
  duration,
  isActive,
  isCompleted,
  videoSlug,
  courseSlug,
  userId,
}: CourseVideoItemProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [loading, setLoading] = useState(false);

  const handleMarkCompleted = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!loading && userId) {
      const newCompleted = !completed;
      setLoading(true);
      try {
        await markVideoAsCompleted(userId, courseSlug, videoSlug, newCompleted);
        setCompleted(newCompleted);
      } catch (error) {
        console.error("Failed to update video completion:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
          onClick={handleMarkCompleted}
          disabled={loading}
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
