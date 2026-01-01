"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-pulse mt-10">
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-4/6 rounded" />
              </div>
            </div>

            <div>
              <Skeleton className="rounded-2xl shadow-xl aspect-square w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-48 mx-auto mb-4 rounded" />
            <Skeleton className="h-4 w-32 mx-auto rounded" />
          </div>

          <div className="rounded-2xl border p-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative pl-8 mb-8 last:mb-0">
                <Skeleton className="absolute left-0 top-1 w-3 h-3 rounded-full" />
                <Skeleton className="h-4 w-20 mb-3 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                </div>
                {index !== 2 && <Skeleton className="h-px w-full mt-6" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
