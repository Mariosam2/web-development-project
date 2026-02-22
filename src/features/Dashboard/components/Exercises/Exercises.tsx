import { useGetExercisesQuery } from "@src/store/api/exerciseApi";
import { ExerciseCard } from "./components/ExerciseCard";
import "./Exercises.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";

export const Exercises = () => {
  const { data, isLoading } = useGetExercisesQuery({ name: "" });
  const exercises = data?.data ?? [];

  return (
    <div className="container-xl mx-auto  pb-8 ">
      <div className="grid grid-cols-2 gap-6 ">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseCard exerciseId={exercise.exerciseId} isLoading={isLoading} key={exercise.exerciseId} />
          ))
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};
