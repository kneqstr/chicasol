import { Skeleton } from "@/components/ui/skeleton";

export default function CourseVideoPageSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen pt-16 lg:pt-20">
      <div className="lg:w-2/3 xl:w-3/4">
        <div className="p-4 mt-14 lg:p-6 lg:mt-0 space-y-6">
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
            <div className="aspect-video w-full">
              <Skeleton className="absolute inset-0 h-full w-full" />
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4 lg:max-w-2xl">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />

            <div className="flex flex-wrap gap-3 pt-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/3 xl:w-1/4">
        <aside className="h-[calc(100vh-5rem)] sticky top-20 bg-background/95">
          <div className="p-4 border-b space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="h-[calc(100%-7rem)] overflow-y-auto p-2 space-y-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-1 w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
