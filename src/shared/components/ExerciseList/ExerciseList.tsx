import { ExerciseCardSkeleton } from "../../../features/Dashboard/components/Exercises/components/ExerciseCardSkeleton/ExerciseCardSkeleton";
import { ExerciseCard } from "../../../features/Dashboard/components/Exercises/components/ExerciseCard/ExerciseCard";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import type { IExerciseOverview } from "@src/shared/interfaces/exerciseDb/IExerciseOverview";
import "./ExerciseList.css";

interface ExerciseListProps {
  exercises: IExerciseOverview[];
  isLoading: boolean;
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
}

export const ExerciseList = ({ exercises, isLoading, sentinelRef }: ExerciseListProps) => {
  return (
    <div className="container-xl mx-auto ">
      <div className="grid grid-cols-1 c-md:grid-cols-2 gap-6 c-md:gap-3 lg:gap-6  px-3 c-md:px-3 lg:px-8 xl:px-3">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <ExerciseCardSkeleton key={i} />)
        ) : exercises.length > 0 ? (
          <>
            {exercises.map((ex) => (
              <ExerciseCard key={ex.exerciseId} exercise={ex} />
            ))}
            {sentinelRef && <div ref={sentinelRef} />}
          </>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};
