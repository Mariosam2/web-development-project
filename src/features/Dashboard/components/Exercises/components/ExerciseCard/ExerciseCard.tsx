import type { ICardProps } from "@src/shared/interfaces/props/ICardProps";
import { Checkbox } from "@heroui/checkbox";
import { useLazyGetSingleExerciseQuery } from "@src/store/api/exerciseApi";
import { deselectExercise, selectExercise } from "@src/store/slices/exerciseSlice";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { Chip, Tooltip, useDisclosure } from "@heroui/react";
import { Info } from "@src/shared/ui/Info";
import { ExerciseDetailModal } from "../ExerciseDetailModal/ExerciseDetailModal";
import { showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { useEffect, useState } from "react";
import type { IExerciseOverview } from "@src/shared/interfaces/exerciseDb/IExerciseOverview";

interface ExerciseCardProps extends ICardProps {
  exercise: IExerciseOverview;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const MAX_SELECTABLE_EXERCISES = 20;
  const dispatch = useAppDispatch();
  const { selectedExercises } = useAppSelector((state) => state.exercise);
  const [showLoading, setShowLoading] = useState(false);
  const [triggerGetDetail, { data: singleExercise, isLoading: isDetailLoading, isFetching: isDetailFetching }] =
    useLazyGetSingleExerciseQuery();
  const isSelected = selectedExercises.some((e) => e.exerciseId === exercise?.exerciseId);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isDetailLoading || isDetailFetching) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isDetailLoading, isDetailFetching]);

  const onSelectExercise = (isSelected: boolean) => {
    if (selectedExercises.length >= MAX_SELECTABLE_EXERCISES && isSelected) return;

    if (exercise) {
      if (!isSelected) {
        dispatch(deselectExercise(exercise.exerciseId as string));
      } else {
        dispatch(selectExercise({ ...exercise, sets: 1, reps: 1 }));
      }
    }
  };

  const onViewMore = (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      if (!exercise || !exercise.exerciseId) {
        showToast("Error", "Unable to retrieve exercise data", ToastType.DANGER);
        return;
      }

      triggerGetDetail({ exerciseId: exercise.exerciseId });
      onOpen();
    } catch (error) {
      showToast("Error", "Unable to retrieve exercise data", ToastType.DANGER);
      console.error("error", error);
    }
  };

  return (
    <>
      <div
        className={`col-span-1 c-shadow-md border border-c-dark-gray rounded-4xl cursor-pointer flex h-44 bg-c-light-gray relative overflow-hidden ${isSelected ? "bg-c-yellow-light" : ""}`}
        onClick={() => onSelectExercise(!isSelected)}>
        <div className="preview w-1/3 rounded-l-4xl">
          <img
            className="w-full block object-cover rounded-l-4xl h-full"
            src={exercise.imageUrl}
            alt="workout preview"
          />
        </div>
        <div className="content w-2/3 p-4 flex flex-col gap-y-2.5 overflow-hidden pe-10">
          <div>
            <h2 className="title text-lg font-light leading-tight line-clamp-2">{exercise.name}</h2>

            {exercise.targetMuscles?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {exercise.targetMuscles?.slice(0, 2).map((m) => (
                  <Chip
                    key={m}
                    size="sm"
                    variant="flat"
                    classNames={{ base: "bg-c-yellow", content: "text-[10px] font-semibold px-1 text-c-dark" }}>
                    {m}
                  </Chip>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {exercise.bodyParts?.slice(0, 2).map((bp) => (
              <Chip
                key={bp}
                size="sm"
                variant="bordered"
                classNames={{ base: "border-c-dark-gray", content: "text-[10px] px-0.5" }}>
                {bp}
              </Chip>
            ))}
            {exercise.equipments?.slice(0, 1).map((eq) => (
              <Chip
                key={eq}
                size="sm"
                variant="bordered"
                classNames={{
                  base: "bg-transparent border-c-dark-gray",
                  content: "text-[10px] px-0.5 flex items-center gap-1 ",
                }}>
                <span className="w-2 h-2 rounded-full bg-c-yellow inline-block border border-c-dark" />
                {eq}
              </Chip>
            ))}
            {exercise.exerciseType && (
              <Chip
                size="sm"
                variant="flat"
                classNames={{ base: "bg-default-200", content: "text-[10px] px-0.5 text-default-600" }}>
                {exercise.exerciseType}
              </Chip>
            )}
          </div>
          <button
            onClick={onViewMore}
            className="actions flex flex-col gap-2.5 absolute right-0 bottom-0 p-5 cursor-pointer">
            <Tooltip content="View More">
              <Info className="size-6 text-c-dark" />
            </Tooltip>
          </button>
        </div>
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          onValueChange={(checked) => onSelectExercise(checked)}
          className="absolute top-3 right-3"
          classNames={{
            wrapper: "after:bg-c-dark border-c-dark-gray  transition-all duration-250 ease-c-elastic",
            icon: "text-c-yellow ",
          }}
          isSelected={isSelected}
        />
      </div>
      <ExerciseDetailModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        exerciseDetail={singleExercise?.data}
        isLoading={showLoading}
      />
    </>
  );
};
