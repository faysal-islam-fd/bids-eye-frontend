import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 mr-1" />
            ))}
          </div>
          <Skeleton className="w-8 h-4" />
        </div>
        <Skeleton className="h-6 w-1/4" />
      </div>
    </div>
  )
}

