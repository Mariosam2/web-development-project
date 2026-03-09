import { Outlet, useLocation } from "react-router";
import "./App.css";
import { useLayoutEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { resetExercisesSearch, setSelectedExercises } from "./store/slices/exerciseSlice";
import { setSelectedWorkout } from "./store/slices/workoutSlice";
import type { IWorkout } from "./shared/interfaces/workout/IWorkout";
export const App = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    dispatch(setSelectedExercises([]));
    dispatch(setSelectedWorkout({} as IWorkout));
    dispatch(resetExercisesSearch());
  }, [pathname, dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};
