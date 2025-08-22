import { Skeleton } from "@/components/ui/skeleton"

export default function CategorySkeleton() {
  return (
    <div className="relative overflow-hidden aspect-[3/4]">
      <Skeleton className="w-full h-96" />
      
    </div>
  )
}
