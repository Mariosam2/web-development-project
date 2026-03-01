import { useGetExercisesQuery } from "@src/store/api/exerciseApi";
import "./Exercises.css";
import { useEffect, useRef, useState } from "react";
import type { RootState } from "@src/store/store";
import { useSelector } from "react-redux";
import { useDisclosure } from "@heroui/modal";
import { NewWorkoutModal } from "../Workouts/components/NewWorkoutModal/NewWorkoutModal";
import { ExerciseList } from "../../../../shared/components/ExerciseList/ExerciseList";
import {
  setFiltering,
  setSearching,
  setSelectedExercises,
  updateExerciseSearchParam,
} from "@src/store/slices/exerciseSlice";
import { useAppDispatch } from "@src/store/hooks";
import { useInfiniteScroll } from "@src/shared/hooks/useInfiniteScroll";
import { ExerciseCardSkeleton } from "./components/ExerciseCardSkeleton/ExerciseCardSkeleton";

export const Exercises = () => {
  const dispatch = useAppDispatch();
  const { searchParams, searching, filtering } = useSelector((state: RootState) => state.exercise);
  const { data, isLoading, isFetching } = useGetExercisesQuery({ ...searchParams, limit: 8 });
  const { selectedExercises } = useSelector((state: RootState) => state.exercise);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const mountRef = useRef(true);
  const prevFetchingRef = useRef(false);
  const [showInitialSkeleton, setShowInitialSkeleton] = useState(true);
  const exercises = data?.data ?? [];
  const hasMore = data?.meta?.hasNextPage ?? false;

  const sentinelRef = useInfiniteScroll({
    onLoadMore: () => dispatch(updateExerciseSearchParam({ field: "after", value: data?.meta?.nextCursor })),
    hasMore,
    isLoading: isFetching,
  });

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
    if (!isFetching && prevFetchingRef.current && (searching || filtering)) {
      const timer = setTimeout(() => {
        dispatch(setSearching(false));
        dispatch(setFiltering(false));
        prevFetchingRef.current = false;
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isFetching, searching, filtering, dispatch]);

  const deselectExercises = () => {
    dispatch(setSelectedExercises([]));
  };

  return (
    <>
      <div className="h-12 flex items-center justify-end mb-2.5  absolute left-0 right-0 top-48 container-xl mx-auto px-3 gap-x-3">
        <button
          className={`btn-secondary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          onClick={deselectExercises}>
          Deselect All
        </button>
        <button
          className={`btn-primary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          onClick={onOpen}>
          Create Workout
        </button>
      </div>
      <ExerciseList
        exercises={exercises}
        isLoading={showInitialSkeleton || searching || filtering}
        sentinelRef={sentinelRef}
        fetch={true}
      />
      {isFetching && !showInitialSkeleton && !searching && !filtering && (
        <div className="grid grid-cols-2 gap-6 px-3 container-xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <ExerciseCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isOpen && <NewWorkoutModal isOpen={isOpen} onOpenChange={onOpenChange} action="create" />}
    </>
  );
};
