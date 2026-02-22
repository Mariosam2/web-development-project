import type { ICardProps } from "@src/shared/interfaces/props/ICardProps";
import { Skeleton } from "@heroui/skeleton";
import { Plus } from "@src/shared/ui/Plus";
import { Camera } from "@src/shared/ui/Camera";
import { useGetSingleExerciseQuery } from "@src/store/api/exerciseApi";

interface ExerciseCardProps extends ICardProps {
  exerciseId: string;
}

export const ExerciseCard = ({ isLoading, exerciseId }: ExerciseCardProps) => {
  const { data, isLoading: isLoadingSingle } = useGetSingleExerciseQuery({ exerciseId });
  const exercise = data?.data;
  console.log("exerciseId:", exerciseId);

  return (
    <div className="col-span-1 c-shadow-md border border-c-dark-gray rounded-4xl cursor-pointer flex max-h-48 bg-c-light-gray relative">
      {isLoading || isLoadingSingle ? (
        <>
          <Skeleton className="w-1/3 rounded-l-2xl rounded-r-none h-full" />
          <div className="content w-2/3 p-4">
            <div className="heading flex">
              <Skeleton className="h-7 w-32 rounded-xl" />
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
          <div className="preview w-1/3 rounded-l-2xl overflow-hidden">
            <img className="w-full block object-cover" src={exercise?.imageUrls?.["720p"]} alt="workout preview" />
          </div>
          <div className="content w-2/3 p-4">
            <div className="heading flex">
              <h2 className="title text-2xl font-light">{exercise?.name}</h2>
              <div className="badges flex items-center gap-x-3 ps-8">
                <div className="badge bg-c-gray rounded-xl p-1.5">
                  {/* <img className="size-6" src={BodyPartPNG} alt="body part" /> */}
                </div>
                {/*  <div className="badge bg-c-gray rounded-xl p-1.5">
                  <span>{exercise.}</span>
                </div>
                <div className="badge bg-c-gray rounded-xl p-1.5">
                  <span>4x</span>
                </div> */}
              </div>
            </div>
            <p className="text-c-dark-gray mt-2.5 pe-12">{exercise?.overview}</p>
            <div className="actions flex flex-col gap-2 absolute right-4 bottom-4">
              <Plus className="text-c-yellow bg-c-dark rounded-xl p-2" size={10} />
              <Camera className="text-c-yellow bg-c-dark rounded-xl p-2" size={10} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
