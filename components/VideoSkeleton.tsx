import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-min">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
