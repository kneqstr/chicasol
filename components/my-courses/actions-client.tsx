"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  courseSlug: string;
  videoSlug: string;
  nextVideoSlug?: string | null;
  previousVideoSlug?: string | null;
}

export default function CourseActions({ courseSlug, previousVideoSlug, nextVideoSlug }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full">
      {previousVideoSlug && (
        <Link href={`/my-courses/${courseSlug}/${previousVideoSlug}`} className="flex-1">
          <Button
            variant="outline"
            size="lg"
            className="w-full min-h-11 flex items-center justify-center gap-2 px-4 py-2.5"
          >
            <ChevronLeft className="w-5 h-5 shrink-0" />
            <span className="truncate text-center">Предыдущий урок</span>
          </Button>
        </Link>
      )}
      {nextVideoSlug && (
        <Link href={`/my-courses/${courseSlug}/${nextVideoSlug}`} className="flex-1">
          <Button
            variant="outline"
            size="lg"
            className="w-full min-h-11 flex items-center justify-center gap-2 px-4 py-2.5"
          >
            <span className="truncate text-center">Следующий урок</span>
            <ChevronRight className="w-5 h-5 shrink-0" />
          </Button>
        </Link>
      )}
    </div>
  );
}
