"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Loading() {
  return (
    <div className="mx-auto mt-20 px-4 pb-8 sm:px-6 max-w-7xl animate-pulse">
      <section className="pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 bg-linear-to-t rounded-4xl lg:bg-none from-background to-card">
            <AspectRatio ratio={16 / 9} className="overflow-hidden">
              <Skeleton className="w-full h-full rounded-4xl" />
            </AspectRatio>
          </div>

          <div className="lg:col-span-6 bg-primary-foreground px-6 py-12 rounded-4xl bg-linear-to-b lg:bg-linear-to-r from-background to-card">
            <div className="w-full">
              <Skeleton className="h-8 sm:h-9 md:h-20 w-3/4 mb-4" />

              <Skeleton className="h-6 w-full mt-4" />
              <Skeleton className="h-6 w-2/3 mt-2" />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Skeleton className="w-full sm:w-1/2 h-14 rounded-lg my-8" />
                <Skeleton className="w-full sm:w-1/2 h-14 rounded-lg my-8" />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2 my-0.5">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="border rounded-xl px-4 py-6 bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col w-full text-left gap-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <div className="mt-4 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
