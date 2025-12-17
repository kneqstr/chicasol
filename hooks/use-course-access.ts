"use client";

import { useEffect, useState } from "react";

interface CourseAccessData {
  hasAccess: boolean;
  isPurchased: boolean;
  isLoading: boolean;
}

export function useCourseAccess(courseId: string): CourseAccessData {
  const [accessData, setAccessData] = useState<CourseAccessData>({
    hasAccess: false,
    isPurchased: false,
    isLoading: true,
  });

  useEffect(() => {
    async function checkAccess() {
      try {
        const response = await fetch(`/api/courses/${courseId}/access`);

        if (response.ok) {
          const data = await response.json();
          setAccessData({
            hasAccess: data.hasAccess,
            isPurchased: data.isPurchased,
            isLoading: false,
          });
        } else {
          setAccessData({
            hasAccess: false,
            isPurchased: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Error checking course access:", error);
        setAccessData({
          hasAccess: false,
          isPurchased: false,
          isLoading: false,
        });
      }
    }

    if (courseId) {
      checkAccess();
    }
  }, [courseId]);

  return accessData;
}
