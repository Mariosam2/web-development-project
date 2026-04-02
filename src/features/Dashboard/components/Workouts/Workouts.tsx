import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WorkoutCard } from "./components/WorkoutCard/WorkoutCard";
import "./Workouts.css";
import { EmptyList } from "@src/shared/ui/EmptyList/EmptyList";
import { useEffect, useState } from "react";
import { WorkoutCardSkeleton } from "./components/WorkoutCardSkeleton/WorkoutCardSkeleton";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { setFiltering, setSearching } from "@src/store/slices/searchSlice";
import { motion } from "framer-motion";

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
      <div className="pb-8 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 ">
          {showInitialSkeleton || searching || filtering ? (
            Array.from({ length: 6 }).map((_, i) => <WorkoutCardSkeleton key={i} />)
          ) : workouts.length > 0 ? (
            workouts.map((workout, i) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}>
                <WorkoutCard workout={workout} />
              </motion.div>
            ))
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    </>
  );
};
