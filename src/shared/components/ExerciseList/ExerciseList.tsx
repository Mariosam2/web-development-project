import { ExerciseCardSkeleton } from "../../../features/Dashboard/components/Exercises/components/ExerciseCardSkeleton/ExerciseCardSkeleton";
import { ExerciseCard } from "../../../features/Dashboard/components/Exercises/components/ExerciseCard/ExerciseCard";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import type { IExerciseOverview } from "@src/shared/interfaces/exerciseDb/IExerciseOverview";
import "./ExerciseList.css";
import type { IExercise } from "@src/shared/interfaces/exercise/IExercise";

interface ExerciseListProps {
  exercises: IExercise[] | IExerciseOverview[];
  isLoading: boolean;
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
  fetch: boolean;
}

export const ExerciseList = ({ exercises, isLoading, sentinelRef, fetch }: ExerciseListProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 px-3">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => <ExerciseCardSkeleton key={i} />)
      ) : exercises.length > 0 ? (
        <>
          {exercises.map((ex) => (
            <ExerciseCard
              key={ex.exerciseId}
              {...(fetch
                ? { exerciseId: ex.exerciseId as string }
                : { exerciseId: ex.exerciseId as string, exerciseProp: ex as IExercise })}
            />
          ))}
          {sentinelRef && <div ref={sentinelRef} />}
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};
