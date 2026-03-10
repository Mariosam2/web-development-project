import { Skeleton } from "@heroui/skeleton";

export const ExerciseCardSkeleton = () => (
  <div className="col-span-1 c-shadow-md border border-c-dark-gray rounded-2xl flex flex-wrap xs:flex-nowrap h-120 xs:h-60 c-md:h-44 bg-c-light-gray relative overflow-hidden">
    <Skeleton className="w-full xs:w-2/5 c-md:w-1/3 max-h-60 xs:max-h-none rounded-t-2xl xs:rounded-t-none xs:rounded-l-2xl" />

    <div className="w-full xs:w-3/5 c-md:w-2/3 p-4 flex flex-col gap-y-2.5 pe-10">
      <div>
        <Skeleton className="h-5 w-3/4 rounded-lg" />

        <div className="flex flex-wrap gap-1 mt-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-18 rounded-full" />
      </div>
    </div>

    <Skeleton className="absolute right-3 bottom-3 size-6 rounded-full" />

    <Skeleton className="absolute top-3 right-3 size-5 rounded-md" />
  </div>
);
