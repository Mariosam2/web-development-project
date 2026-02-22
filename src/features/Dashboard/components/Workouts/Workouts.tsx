import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WorkoutCard } from "./components/WorkoutCard";
import "./Workouts.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";

export const Workouts = () => {
  const { data, isLoading } = useGetWorkoutsQuery();
  const workouts = data?.data ?? [];

  return (
    <>
      <div className="container-xl mx-auto  pb-8">
        <div className="grid grid-cols-3 gap-4 ">
          {workouts.length > 0 ? (
            workouts.map((workout) => <WorkoutCard workout={workout} isLoading={isLoading} key={workout.id} />)
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </>
  );
};
