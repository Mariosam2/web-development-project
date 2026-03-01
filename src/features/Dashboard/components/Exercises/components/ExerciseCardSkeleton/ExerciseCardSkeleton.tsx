import { Skeleton } from "@heroui/skeleton";
import "./ExerciseCardSkeleton.css";

export const ExerciseCardSkeleton = () => (
  <div className="col-span-1 c-shadow-md border border-c-dark-gray rounded-4xl cursor-pointer flex h-44 bg-c-light-gray relative overflow-hidden">
    <Skeleton className="w-1/3 rounded-l-4xl rounded-r-none h-full" />
    <div className="content w-2/3 p-4">
      <div className="heading flex">
        <Skeleton className="h-7 w-32 rounded-2xl" />
        <div className="flex items-center gap-x-3 ps-8">
          <Skeleton className="size-9 rounded-xl" />
          <Skeleton className="h-9 w-16 rounded-xl" />
          <Skeleton className="h-9 w-12 rounded-xl" />
        </div>
      </div>
      <div className="mt-2.5 pe-12 space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
      <div className="flex flex-col gap-2 absolute right-4 bottom-4">
        <Skeleton className="size-10 rounded-xl" />
        <Skeleton className="size-10 rounded-xl" />
      </div>
    </div>
  </div>
);
