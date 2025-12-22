import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CourseProgress {
  completedLessons: string[];
}

interface ToggleLessonVars {
  videoSlug: string;
  completed: boolean;
}

export function useToggleLesson(courseSlug: string) {
  const qc = useQueryClient();

  return useMutation<void, Error, ToggleLessonVars, { prev?: CourseProgress }>({
    mutationFn: async ({ videoSlug, completed }) => {
      const res = await fetch(`/api/user-course/${courseSlug}/progress`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoSlug, completed }),
      });

      if (!res.ok) throw new Error("Update failed");
    },

    onMutate: async ({ videoSlug, completed }) => {
      await qc.cancelQueries({ queryKey: ["course-progress", courseSlug] });

      const prev = qc.getQueryData<CourseProgress>(["course-progress", courseSlug]);

      qc.setQueryData<CourseProgress>(["course-progress", courseSlug], (old) => {
        if (!old) return { completedLessons: [] };

        return {
          completedLessons: completed
            ? [...old.completedLessons, videoSlug]
            : old.completedLessons.filter((v) => v !== videoSlug),
        };
      });

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(["course-progress", courseSlug], ctx.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({
        queryKey: ["course-progress", courseSlug],
      });
    },
  });
}
