import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WorkoutCard } from "./components/WorkoutCard/WorkoutCard";
import "./Workouts.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import { useEffect, useState } from "react";
import { WorkoutCardSkeleton } from "./components/WorkoutCardSkeleton/WorkoutCardSkeleton";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { setFiltering, setSearching } from "@src/store/slices/searchSlice";

export const Workouts = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.workout);
  const { searching, filtering } = useAppSelector((state) => state.search);
  const { data, isLoading, isFetching } = useGetWorkoutsQuery({ ...searchParams });
  const [showInitialSkeleton, setShowInitialSkeleton] = useState(true);
  const workouts = data?.data ?? [];
  useEffect(() => {
    document.querySelector(".content")?.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowInitialSkeleton(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => {
        setShowInitialSkeleton(false);
        dispatch(setSearching(false));
        dispatch(setFiltering(false));
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isFetching, dispatch]);

  return (
    <>
      <div className="container-xl mx-auto  pb-8 px-3 xs:px-8 xl:px-3">
        <div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-3 gap-4">
          {showInitialSkeleton || searching || filtering ? (
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
