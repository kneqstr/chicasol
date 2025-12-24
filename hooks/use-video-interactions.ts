import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface VideoInteractions {
  video: {
    likes: number;
    views: number;
    durationMinutes: number;
  };
  userInteractions: {
    hasLiked: boolean;
    hasViewed: boolean;
  };
}

export interface UpdateVideoInteractionParams {
  action: "like" | "view";
  watchedTime?: number;
  duration?: number;
}

export function useVideoInteractions(courseSlug: string, videoSlug: string) {
  return useQuery<VideoInteractions>({
    queryKey: ["video-interactions", courseSlug, videoSlug],
    queryFn: async () => {
      const res = await fetch(`/api/user-course/${courseSlug}/${videoSlug}`, {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          return {
            video: { likes: 0, views: 0, durationMinutes: 0 },
            userInteractions: { hasLiked: false, hasViewed: false },
          };
        }
        throw new Error("Failed to load video interactions");
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateVideoInteraction(courseSlug: string, videoSlug: string) {
  const qc = useQueryClient();
  const queryKey = ["video-interactions", courseSlug, videoSlug];

  return useMutation<
    { success: boolean; likes: number; views: number },
    Error,
    UpdateVideoInteractionParams,
    { prev?: VideoInteractions }
  >({
    mutationFn: async ({ action, watchedTime, duration }) => {
      const res = await fetch(`/api/user-course/${courseSlug}/${videoSlug}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, watchedTime, duration }),
      });

      return res.json();
    },

    onMutate: async (variables) => {
      await qc.cancelQueries({ queryKey });

      const prev = qc.getQueryData<VideoInteractions>(queryKey);

      if (prev && variables.action === "like") {
        const newHasLiked = !prev.userInteractions.hasLiked;
        const likesDelta = newHasLiked ? 1 : -1;

        qc.setQueryData<VideoInteractions>(queryKey, (old) => {
          if (!old) return old;

          return {
            ...old,
            video: {
              ...old.video,
              likes: Math.max(0, old.video.likes + likesDelta),
            },
            userInteractions: {
              ...old.userInteractions,
              hasLiked: newHasLiked,
            },
          };
        });
      }

      return { prev };
    },

    onError: (err, variables, context) => {
      console.error("Failed to update video interaction:", err);

      if (context?.prev) {
        qc.setQueryData(queryKey, context.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey });
      qc.invalidateQueries({ queryKey: ["course-progress", courseSlug] });
    },
  });
}
