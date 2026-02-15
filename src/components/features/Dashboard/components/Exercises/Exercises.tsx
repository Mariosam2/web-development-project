import { ExerciseCard } from "./components/ExerciseCard";
import "./Exercises.css";

export const Exercises = () => {
  return (
    <div className="container-xl mx-auto  pb-8 ">
      <div className="grid grid-cols-2 gap-6 ">
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
      </div>
    </div>
  );
};
