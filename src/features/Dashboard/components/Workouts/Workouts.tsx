import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WorkoutCard } from "./components/WorkoutCard/WorkoutCard";
import "./Workouts.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import { useEffect, useRef, useState } from "react";
import { WorkoutCardSkeleton } from "./components/WorkoutCardSkeleton/WorkoutCardSkeleton";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { setFiltering, setSearching } from "@src/store/slices/searchSlice";

export const Workouts = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.workout);
  console.log(searchParams);
  const { searching, filtering } = useAppSelector((state) => state.search);
  const { data, isLoading, isFetching } = useGetWorkoutsQuery({ ...searchParams });
  const mountRef = useRef(true);
  const prevFetchingRef = useRef(false);
  const [showInitialSkeleton, setShowInitialSkeleton] = useState(true);

  const workouts = data?.data ?? [];

  useEffect(() => {
    if (!mountRef.current) return;

    if (!isFetching && !isLoading) {
      const timer = setTimeout(() => {
        setShowInitialSkeleton(false);
        mountRef.current = false;
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (isFetching) {
      prevFetchingRef.current = true;
    }

    if (!isFetching && prevFetchingRef.current) {
      const timer = setTimeout(() => {
        dispatch(setSearching(false));
        dispatch(setFiltering(false));
        prevFetchingRef.current = false;
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isFetching, dispatch]);

  return (
    <>
      <div className="container-xl mx-auto  pb-8 px-3">
        <div className="grid grid-cols-3 gap-4">
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
