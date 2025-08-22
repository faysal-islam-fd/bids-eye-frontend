
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="flex gap-2 overflow-x-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 flex-shrink-0 rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-16" />
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10" />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Skeleton className="h-12 w-full max-w-[200px]" />

          {/* Description */}
          <div className="space-y-3 pt-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full aspect-[3/4]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="w-4 h-4" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

