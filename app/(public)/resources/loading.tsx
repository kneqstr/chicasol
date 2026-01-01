import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-16 mt-20">
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full h-full p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="relative h-24 sm:h-32 rounded-xl overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
      </section>

      <section className="container mx-auto py-16">
        <div className="grid gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-muted/0 border-0 overflow-hidden">
              <div className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
                  <div className="relative w-full h-[300px] md:h-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="flex flex-col justify-between p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-2/3" />
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Skeleton className="h-10 w-40" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
