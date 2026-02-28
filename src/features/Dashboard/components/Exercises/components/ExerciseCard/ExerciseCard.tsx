import type { ICardProps } from "@src/shared/interfaces/props/ICardProps";
import { Skeleton } from "@heroui/skeleton";
import { Plus } from "@src/shared/ui/Plus";
import { Camera } from "@src/shared/ui/Camera";
import { useGetSingleExerciseQuery } from "@src/store/api/exerciseApi";
import { useEffect, useState } from "react";
import { BodyPart } from "@src/shared/enums/BodyPart.enum";
import { BodyPartBadge } from "../BodyPartBadge/BodyPartBadge";

interface ExerciseCardProps extends ICardProps {
  exerciseId: string;
}

export const ExerciseCard = ({ isLoading, exerciseId }: ExerciseCardProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { data, isLoading: isLoadingSingle } = useGetSingleExerciseQuery({ exerciseId });
  const exercise = data?.data;

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 500);

    return () => clearTimeout(timer);
  }, [isLoading, isLoadingSingle]);

  const truncateDescription = (description: string | undefined) => {
    //console.log(description.substring(0, 20));
    if (!description) return "No description";
    return description.length > 150 ? `${description.substring(0, 150)}...` : description;
  };

  return (
    <div className="col-span-1 c-shadow-md border border-c-dark-gray rounded-4xl cursor-pointer flex h-44 bg-c-light-gray relative overflow-hidden">
      {isLoading || isLoadingSingle || showSkeleton ? (
        <>
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
        </>
      ) : (
        <>
          <div className="preview w-1/3 rounded-l-4xl ">
            <img
              className="w-full block object-cover rounded-l-4xl max-h-full"
              src={exercise?.imageUrls?.["720p"]}
              alt="workout preview"
            />
          </div>
          <div className="content w-2/3 p-4">
            <div className="heading flex">
              <h2 className="title text-lg font-light">{exercise?.name}</h2>
              <div className="badges flex items-center gap-x-3 ps-8">
                {/*  <div className="badge bg-c-gray rounded-xl p-1.5">
                  <span>{exercise.}</span>
                </div>
                <div className="badge bg-c-gray rounded-xl p-1.5">
                  <span>4x</span>
                </div> */}
              </div>
            </div>
            <p className="text-c-dark-gray text-sm mt-2.5 pe-12">{truncateDescription(exercise?.overview)}</p>
            <div className="actions flex flex-col gap-2.5 absolute right-4 bottom-4">
              <BodyPartBadge bodyPart={exercise?.bodyParts[0] as BodyPart} />
              <Plus className="text-c-yellow bg-c-dark rounded-xl p-1.5 size-6 md:size-8" />
              <a href={exercise?.videoUrl} target="_blank">
                <Camera className="text-c-yellow bg-c-dark rounded-xl p-1.5 size-6 md:size-8" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
