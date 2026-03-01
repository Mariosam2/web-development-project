import type { ICardProps } from "@src/shared/interfaces/props/ICardProps";
import { Checkbox } from "@heroui/checkbox";
import { Camera } from "@src/shared/ui/Camera";
import { useGetSingleExerciseQuery } from "@src/store/api/exerciseApi";
import { deselectExercise, selectExercise } from "@src/store/slices/exerciseSlice";
import { useAppDispatch } from "@src/store/hooks";
import type { IExercise } from "@src/shared/interfaces/exercise/IExercise";

import type { IExerciseDetail } from "@src/shared/interfaces/exerciseDb/IExerciseDetail";
import type { RootState } from "@src/store/store";
import { useSelector } from "react-redux";
import { ExerciseCardSkeleton } from "../ExerciseCardSkeleton/ExerciseCardSkeleton";

interface ExerciseCardProps extends ICardProps {
  exerciseId: string;
  exerciseProp?: IExercise;
}

export const ExerciseCard = ({ exerciseId, exerciseProp }: ExerciseCardProps) => {
  const MAX_SELECTABLE_EXERCISES = 20;
  const { selectedExercises } = useSelector((state: RootState) => state.exercise);
  const { data, isLoading, isFetching } = useGetSingleExerciseQuery({ exerciseId }, { skip: !!exerciseProp });
  const dispatch = useAppDispatch();
  const exercise = exerciseProp || data?.data;
  const isSelected = selectedExercises.some((e) => e.exerciseId === exercise?.exerciseId);

  const onSelectExercise = (isSelected: boolean) => {
    if (selectedExercises.length >= MAX_SELECTABLE_EXERCISES && isSelected) return;

    if (exercise) {
      const selectedExercise = getSelectedExercise(exercise);

      if (!isSelected) {
        dispatch(deselectExercise(selectedExercise.exerciseId as string));
      } else {
        dispatch(selectExercise({ ...selectedExercise }));
      }
    }
  };

  const getSelectedExercise = (exercise: IExerciseDetail | IExercise) => {
    if (isExerciseDetail(exercise)) {
      return {
        exerciseId: exercise.exerciseId,
        description: exercise.overview,
        name: exercise.name,
        bodyPart: exercise.bodyParts[0],
        targetMuscle: exercise.targetMuscles[0],
        imageUrl: exercise.imageUrl,
        videoUrl: exercise.videoUrl,
        sets: 1,
        reps: 1,
      } as IExercise;
    }
    return exercise;
  };

  const isExerciseDetail = (ex: IExercise | IExerciseDetail): ex is IExerciseDetail => {
    return "overview" in ex;
  };

  const getExerciseImageUrl = (ex: IExercise | IExerciseDetail | undefined) => {
    if (!ex) return "";
    if (isExerciseDetail(ex)) {
      return ex.imageUrls["720p"];
    }
    return ex.imageUrl;
  };

  const getExerciseDescription = (ex: IExercise | IExerciseDetail | undefined) => {
    if (!ex) return "";
    if (isExerciseDetail(ex)) {
      return ex.overview;
    }
    return ex.description;
  };

  if (isLoading || isFetching) return <ExerciseCardSkeleton />;

  return (
    <div
      className={`col-span-1 c-shadow-md border border-c-dark-gray rounded-4xl cursor-pointer flex h-44 bg-c-light-gray relative overflow-hidden ${isSelected ? "bg-c-yellow-light" : ""}`}
      onClick={() => onSelectExercise(!isSelected)}>
      <div className="preview w-1/3 rounded-l-4xl">
        <img
          className="w-full block object-cover rounded-l-4xl h-full"
          src={getExerciseImageUrl(exercise)}
          alt="workout preview"
        />
      </div>
      <div className="content w-2/3 p-4">
        <div className="heading flex">
          <h2 className="title text-lg font-light  max-w-[calc(100%-3rem)]">{exercise?.name}</h2>
        </div>
        <p className="text-c-dark-gray text-sm mt-2.5 pe-10 line-clamp-4">{getExerciseDescription(exercise)}</p>
        <div className="actions flex flex-col gap-2.5 absolute right-4 bottom-4">
          <a href={exercise?.videoUrl} target="_blank">
            <Camera className="text-c-yellow bg-c-dark rounded-xl p-1.5 size-6 md:size-8" />
          </a>
        </div>
      </div>
      <Checkbox
        className="absolute top-3 right-3"
        classNames={{
          wrapper: "after:bg-c-dark border-c-dark-gray  transition-all duration-250 ease-c-elastic",
          icon: "text-c-yellow ",
        }}
        isSelected={isSelected}
      />
    </div>
  );
};
