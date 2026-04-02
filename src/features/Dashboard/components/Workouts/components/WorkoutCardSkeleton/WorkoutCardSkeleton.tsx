import { Skeleton } from "@heroui/skeleton";

export const WorkoutCardSkeleton = () => (
  <div className="space-y-4 col-span-1 h-86.5 border border-c-gray/20 rounded-2xl cursor-pointer flex flex-col bg-white/70 backdrop-blur-md c-shadow-premium relative p-3">
    <Skeleton className="rounded-lg w-48 h-8" />

    <div className="flex items-center gap-x-2 justify-center">
      <Skeleton className="rounded-4xl w-24 h-8" />
      <Skeleton className="rounded-2xl w-20 h-8" />
    </div>

    <Skeleton className="rounded-2xl w-full flex-1" />
  </div>
);
