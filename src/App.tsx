import { Outlet, useLocation } from "react-router";
import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setSelectedExercises, updateExerciseSearchParam } from "./store/slices/exerciseSlice";
import { setSelectedWorkout } from "./store/slices/workoutSlice";
import type { IWorkout } from "./shared/interfaces/workout/IWorkout";
export const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setSelectedExercises([]));
    dispatch(setSelectedWorkout({} as IWorkout));
    dispatch(updateExerciseSearchParam({ field: "before", value: null }));
    dispatch(updateExerciseSearchParam({ field: "after", value: null }));
  }, [pathname, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};
