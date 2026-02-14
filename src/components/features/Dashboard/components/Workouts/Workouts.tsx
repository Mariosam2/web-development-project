import { WorkoutCard } from "./components/WorkoutCard";
import "./Workouts.css";

export const Workouts = () => {
  return (
    <div className="container-xl mx-auto  pb-8 ">
      <div className="grid grid-cols-3 gap-4 ">
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
        <WorkoutCard />
      </div>
    </div>
  );
};
