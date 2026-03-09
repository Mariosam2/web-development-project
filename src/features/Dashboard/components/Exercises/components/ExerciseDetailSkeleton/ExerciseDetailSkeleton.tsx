import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Skeleton } from "@heroui/skeleton";
import { Divider } from "@heroui/divider";
import "./ExerciseDetailSkeleton.css";

export const ExerciseDetailSkeleton = () => {
  return (
    <>
      <ModalHeader className="flex-col gap-2">
        <Skeleton className="w-3/4 h-7 rounded-lg" />

        <div className="flex items-center gap-2">
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>
      </ModalHeader>

      <ModalBody className="gap-5">
        <Skeleton className="w-full rounded-xl" style={{ aspectRatio: "16 / 10" }} />

        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-3.5 rounded-lg" />
          <Skeleton className="w-full h-3.5 rounded-lg" />
          <Skeleton className="w-4/5 h-3.5 rounded-lg" />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-16 h-3 rounded-lg" />
            <Skeleton className="w-28 h-6 rounded-full" />
          </div>

          <div className="flex items-center gap-2.5">
            <Skeleton className="w-16 h-3 rounded-lg" />
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="w-32 h-6 rounded-full" />
              <Skeleton className="w-28 h-6 rounded-full" />
              <Skeleton className="w-24 h-6 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Skeleton className="w-16 h-3 rounded-lg" />
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
        </div>

        <Divider className="opacity-40" />

        <div className="flex flex-col gap-3">
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="w-28 h-5 rounded-full" />
          <Skeleton className="w-36 h-5 rounded-full" />
          <Skeleton className="w-24 h-5 rounded-full" />
          <Skeleton className="w-32 h-5 rounded-full" />
          <Skeleton className="w-20 h-5 rounded-full" />
        </div>
      </ModalBody>

      <ModalFooter>
        <Skeleton className="w-20 h-10 rounded-xl" />
      </ModalFooter>
    </>
  );
};
