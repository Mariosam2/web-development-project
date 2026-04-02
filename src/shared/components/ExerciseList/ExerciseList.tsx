import { ExerciseCardSkeleton } from "../../../features/Dashboard/components/Exercises/components/ExerciseCardSkeleton/ExerciseCardSkeleton";
import { ExerciseCard } from "../../../features/Dashboard/components/Exercises/components/ExerciseCard/ExerciseCard";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import type { IExerciseOverview } from "@src/shared/interfaces/exerciseDb/IExerciseOverview";
import "./ExerciseList.css";
import { motion } from "framer-motion";

interface ExerciseListProps {
  exercises: IExerciseOverview[];
  isLoading: boolean;
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
}

export const ExerciseList = ({ exercises, isLoading, sentinelRef }: ExerciseListProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 c-md:grid-cols-2 gap-6 c-md:gap-3 lg:gap-6 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => <ExerciseCardSkeleton key={i} />)
        ) : exercises.length > 0 ? (
          <>
            {exercises.map((ex, i) => (
              <motion.div
                key={ex.exerciseId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3), ease: "easeOut" }}
              >
                <ExerciseCard exercise={ex} />
              </motion.div>
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
