import { useQuery } from "@tanstack/react-query";

interface CourseProgress {
  completedLessons: string[];
  totalLessons: number;
}

export function useCourseProgress(courseSlug: string) {
  return useQuery<CourseProgress>({
    queryKey: ["course-progress", courseSlug],
    queryFn: async () => {
      const res = await fetch(`/api/user-course/${courseSlug}/progress`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to load progress");

      return res.json();
    },
  });
}
