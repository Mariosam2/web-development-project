import { useGetExercisesQuery } from "@src/store/api/exerciseApi";
import "./Exercises.css";
import { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/modal";
import { NewWorkoutModal } from "../Workouts/components/NewWorkoutModal/NewWorkoutModal";
import { ExerciseList } from "../../../../shared/components/ExerciseList/ExerciseList";
import { setSelectedExercises, updateExerciseSearchParam } from "@src/store/slices/exerciseSlice";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { useInfiniteScroll } from "@src/shared/hooks/useInfiniteScroll";
import { ExerciseCardSkeleton } from "./components/ExerciseCardSkeleton/ExerciseCardSkeleton";
import { setFiltering, setSearching } from "@src/store/slices/searchSlice";
import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import { WORKOUTS_LIMIT } from "@src/store/slices/workoutSlice";
import { ImportExercisesModal } from "../Workouts/components/ImportExercisesModal/ImportExercisesModal";

export const Exercises = () => {
  const dispatch = useAppDispatch();
  const { searchParams } = useAppSelector((state) => state.exercise);
  const { searching, filtering } = useAppSelector((state) => state.search);
  const { data, isLoading, isFetching } = useGetExercisesQuery({ ...searchParams });

  const workoutSearchParams = {
    limit: WORKOUTS_LIMIT,
    query: "",
    isCompleted: null,
    startDate: "",
    endDate: "",
  };
  const { data: workouts } = useGetWorkoutsQuery({ ...workoutSearchParams });

  const { selectedExercises } = useAppSelector((state) => state.exercise);
  const newWorkoutModal = useDisclosure();
  const importExercisesModal = useDisclosure();

  const [showInitialSkeleton, setShowInitialSkeleton] = useState(true);
  const exercises = data?.data ?? [];
  const hasMore = data?.meta?.hasNextPage ?? false;

  const sentinelRef = useInfiniteScroll({
    onLoadMore: () => dispatch(updateExerciseSearchParam({ field: "after", value: data?.meta?.nextCursor ?? null })),
    hasMore,
    isLoading: isFetching,
  });

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowInitialSkeleton(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => {
        dispatch(setSearching(false));
        dispatch(setFiltering(false));
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isFetching, dispatch]);

  const deselectExercises = () => {
    dispatch(setSelectedExercises([]));
  };

  return (
    <>
      <div className="h-12 flex items-center justify-end mb-2.5  absolute left-0 right-0 top-48 container-xl mx-auto px-3 gap-x-3">
        <button
          className={`btn-primary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 && (workouts?.data.length ?? 0) > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          onClick={importExercisesModal.onOpen}>
          Import to existing Workout
        </button>
        <button
          className={`btn-secondary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          onClick={deselectExercises}>
          Deselect All
        </button>
        <button
          className={`btn-primary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
          onClick={newWorkoutModal.onOpen}>
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

      {newWorkoutModal.isOpen && (
        <NewWorkoutModal isOpen={newWorkoutModal.isOpen} onOpenChange={newWorkoutModal.onOpenChange} action="create" />
      )}

      <ImportExercisesModal
        isOpen={importExercisesModal.isOpen}
        onOpenChange={importExercisesModal.onOpenChange}
        action="create"
      />
    </>
  );
};
