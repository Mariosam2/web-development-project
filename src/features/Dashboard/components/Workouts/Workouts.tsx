import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WorkoutCard } from "./components/WorkoutCard/WorkoutCard";
import "./Workouts.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import { useEffect, useState } from "react";
import { WorkoutCardSkeleton } from "./components/WorkoutCardSkeleton/WorkoutCardSkeleton";

export const Workouts = () => {
  const { data, isLoading, isFetching } = useGetWorkoutsQuery();
  const [showSkeleton, setShowSkeleton] = useState(true);

  const workouts = data?.data ?? [];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isFetching || isLoading) {
      timer = setTimeout(() => setShowSkeleton(true), 0);
    } else {
      timer = setTimeout(() => setShowSkeleton(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isFetching, isLoading]);

  return (
    <>
      <div className="container-xl mx-auto  pb-8 px-3">
        <div className="grid grid-cols-3 gap-4">
          {showSkeleton ? (
            Array.from({ length: 6 }).map((_, i) => <WorkoutCardSkeleton key={i} />)
          ) : workouts.length > 0 ? (
            workouts.map((workout) => <WorkoutCard workout={workout} key={workout.id} />)
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </>
  );
};
