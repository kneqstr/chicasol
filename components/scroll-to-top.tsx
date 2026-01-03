"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current && prevPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    prevPath.current = pathname;
  }, [pathname]);

  return null;
}
