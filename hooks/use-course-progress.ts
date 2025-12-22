import { useQuery } from "@tanstack/react-query";

export function useCourseProgress(courseSlug: string) {
  return useQuery({
    queryKey: ["course-progress", courseSlug],
    queryFn: async () => {
      const res = await fetch(`/api/user-course/${courseSlug}/progress`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load progress");
      return res.json() as Promise<{ completedLessons: string[] }>;
    },
  });
}
