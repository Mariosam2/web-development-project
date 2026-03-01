import { useGetExercisesQuery } from "@src/store/api/exerciseApi";
import "./Exercises.css";
import { useRef } from "react";
import type { RootState } from "@src/store/store";
import { useSelector } from "react-redux";
import { useDisclosure } from "@heroui/modal";
import { NewWorkoutModal } from "../Workouts/components/NewWorkoutModal/NewWorkoutModal";
import { ExerciseList } from "../../../../shared/components/ExerciseList/ExerciseList";

export const Exercises = () => {
  const { data, isLoading } = useGetExercisesQuery({ name: "" });
  const { selectedExercises } = useSelector((state: RootState) => state.exercise);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const exercises = data?.data ?? [];
  //TODO: infinite scroll
  /* 
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isLoading && hasMore) {
        loadNextPage();
      }
    },
    { threshold: 0.1 }
  );
 */

  return (
    <div className="container-xl mx-auto  pb-8">
      <div className="h-12 flex justify-end mb-2.5">
        <button
          className={`btn-primary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          onClick={onOpen}>
          Create Workout
        </button>
      </div>

      <ExerciseList exercises={exercises} isLoading={isLoading} sentinelRef={sentinelRef} fetch={true} />

      <NewWorkoutModal isOpen={isOpen} onOpenChange={onOpenChange} action="create" />
    </div>
  );
};
