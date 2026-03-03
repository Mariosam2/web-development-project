import { useMatch } from "react-router";
import { MagnifyingGlass } from "../../../../shared/ui/MagnifyingGlass";
import "./Searchbar.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { updateExerciseSearchParam } from "@src/store/slices/exerciseSlice";
import { FiltersIcon } from "@src/shared/ui/FiltersIcon";
import { useDisclosure } from "@heroui/modal";
import { ExerciseFiltersModal } from "@src/features/Dashboard/components/Exercises/components/ExerciseFiltersModal/ExerciseFiltersModal";
import { useGetBodyPartsQuery, useGetTargetMusclesQuery } from "@src/store/api/exerciseApi";
import { WorkoutFiltersModal } from "../Workouts/components/WorkoutFiltersModal/WorkoutFiltersModal";
import { updateWorkoutSearchParam } from "@src/store/slices/workoutSlice";
import { setFiltering, setSearching } from "@src/store/slices/searchSlice";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";
import type { IWorkoutQuery } from "@src/shared/interfaces/query/IWorkoutQuery";
import { isValid } from "@src/shared/helpers";
export const Searchbar = () => {
  const EXCLUDE_KEYS_FROM_COUNT = ["name", "limit", "after", "before", "query"];
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const exerciseFiltersModal = useDisclosure();
  const workoutFiltersModal = useDisclosure();
  const {
    selectedBodyParts,
    selectedTargetMuscles,
    searchParams: exercisesSearchParams,
  } = useAppSelector((state) => state.exercise);
  const {
    isCompleted,
    startDate,
    endDate,
    searchParams: workoutsSearchParams,
  } = useAppSelector((state) => state.workout);
  const { data: bodyParts, isLoading: isBodyPartsLoading } = useGetBodyPartsQuery();
  const { data: targetMuscles, isLoading: isTargetMusclesLoading } = useGetTargetMusclesQuery();
  const searchWorkouts = useMatch("/dashboard/workouts");
  const searchExercises = useMatch("/dashboard/exercises");
  const searchParams = searchWorkouts ? workoutsSearchParams : exercisesSearchParams;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchWorkouts) dispatch(updateWorkoutSearchParam({ field: "query", value: query.trim() }));
      if (searchExercises) dispatch(updateExerciseSearchParam({ field: "name", value: query.trim() }));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, searchWorkouts, searchExercises, dispatch]);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    dispatch(setSearching(true));
  };

  const onApplyFilters = () => {
    if (filtersChanged()) {
      dispatch(setFiltering(true));
      if (searchExercises) {
        dispatch(updateExerciseSearchParam({ field: "bodyParts", value: selectedBodyParts.join(",") }));
        dispatch(updateExerciseSearchParam({ field: "targetMuscles", value: selectedTargetMuscles.join(",") }));
      }
      if (searchWorkouts) {
        dispatch(updateWorkoutSearchParam({ field: "isCompleted", value: isCompleted }));
        dispatch(updateWorkoutSearchParam({ field: "startDate", value: startDate }));
        dispatch(updateWorkoutSearchParam({ field: "endDate", value: endDate }));
      }
    }
    const filtersModal = searchWorkouts ? workoutFiltersModal : exerciseFiltersModal;
    filtersModal.onClose();
  };

  const openFiltersModal = () => {
    if (searchWorkouts) workoutFiltersModal.onOpen();
    if (searchExercises && !isBodyPartsLoading && !isTargetMusclesLoading) exerciseFiltersModal.onOpen();
  };

  const filtersChanged = () => {
    if (searchWorkouts) {
      const newParams = { isCompleted, startDate, endDate };
      const oldParams = {
        isCompleted: workoutsSearchParams.isCompleted,
        startDate: workoutsSearchParams.startDate,
        endDate: workoutsSearchParams.endDate,
      };
      return JSON.stringify(newParams) !== JSON.stringify(oldParams);
    }

    const newParams = {
      bodyParts: selectedBodyParts.join(","),
      targetMuscles: selectedTargetMuscles.join(","),
    };
    const oldParams = {
      bodyParts: exercisesSearchParams.bodyParts,
      targetMuscles: exercisesSearchParams.targetMuscles,
    };
    console.log(oldParams, newParams);
    return JSON.stringify(newParams) !== JSON.stringify(oldParams);
  };

  const activeFiltersCount = <T extends IExerciseQuery | IWorkoutQuery>(searchParams: T) => {
    const activeFilters = Object.keys(searchParams).filter(
      (key) => !EXCLUDE_KEYS_FROM_COUNT.includes(key) && isValid(searchParams[key as keyof T]),
    );

    return activeFilters.length;
  };

  return (
    <>
      <div className="flex items-center w-max  mx-auto mt-8 h-12">
        <div className="searchbar w-xs h-full bg-c-light-gray flex items-center  rounded-2xl border border-c-dark-gray c-shadow-md ps-3">
          <MagnifyingGlass className="me-2 size-6" />
          <input
            className="text-c-dark placeholder:text-c-dark-gray p-3  w-full focus:outline-none"
            type="text"
            value={query}
            onChange={onChangeQuery}
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <FiltersIcon
          count={activeFiltersCount(searchParams)}
          className="size-10 cursor-pointer ms-2.5 bg-c-light-gray border border-c-dark-gray c-shadow-md rounded-2xl p-1.5"
          onClick={openFiltersModal}
        />
      </div>
      {exerciseFiltersModal.isOpen && (
        <ExerciseFiltersModal
          isOpen={exerciseFiltersModal.isOpen}
          onOpenChange={exerciseFiltersModal.onOpenChange}
          title="Filters"
          onConfirm={onApplyFilters}
          bodyParts={bodyParts?.data ?? []}
          targetMuscles={targetMuscles?.data ?? []}
        />
      )}
      {workoutFiltersModal.isOpen && (
        <WorkoutFiltersModal
          isOpen={workoutFiltersModal.isOpen}
          onOpenChange={workoutFiltersModal.onOpenChange}
          title="Filters"
          onConfirm={onApplyFilters}
        />
      )}
    </>
  );
};
