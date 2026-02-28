import { useGetExercisesQuery } from "@src/store/api/exerciseApi";
import { ExerciseCard } from "./components/ExerciseCard/ExerciseCard";
import "./Exercises.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import { useRef } from "react";

export const Exercises = () => {
  const { data, isLoading } = useGetExercisesQuery({ name: "" });
  const sentinelRef = useRef<HTMLDivElement>(null);
  const exercises = data?.data ?? [];
  //TODO: infin
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
    <div className="container-xl mx-auto  pb-8 ">
      <div className="grid grid-cols-2 gap-6 ">
        {exercises.length > 0 ? (
          <>
            {exercises.map((exercise) => (
              <ExerciseCard exerciseId={exercise.exerciseId} isLoading={isLoading} key={exercise.exerciseId} />
            ))}
            <div ref={sentinelRef} />
          </>
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};
