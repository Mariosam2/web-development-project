import { useGetWorkoutsQuery } from "@src/store/api/workoutApi";
import "./WorkoutDetail.css";
import { useParams } from "react-router";
import { useDisclosure } from "@heroui/modal";
import { ExerciseList } from "../../../../../../shared/components/ExerciseList/ExerciseList";
import { useSelector } from "react-redux";
import type { RootState } from "@src/store/store";
import { NewWorkoutModal } from "../NewWorkoutModal/NewWorkoutModal";
import { useEffect } from "react";
import { useAppDispatch } from "@src/store/hooks";
import { setSelectedWorkout } from "@src/store/slices/workoutSlice";

export const WorkoutDetail = () => {
  const { workoutId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetWorkoutsQuery();
  const { selectedExercises } = useSelector((state: RootState) => state.exercise);
  const updateWorkout = useDisclosure();
  const deleteWorkout = useDisclosure();
  const removeExercises = useDisclosure();
  const workout = data?.data.find((workout) => workout.id === workoutId);

  useEffect(() => {
    if (!workout) return;
    dispatch(setSelectedWorkout(workout));
  }, [workout, dispatch]);

  return (
    <>
      <div>
        <h1 className="text-center text-4xl font-semibold mb-12 max-w-md mx-auto wrap-break-word">{workout?.title}</h1>
        <div className="actions flex items-center gap-x-3 mb-3 px-3">
          <button
            className="btn-secondary rounded-2xl px-4 py-3 transition-all duration-300"
            onClick={deleteWorkout.onOpen}>
            Delete Workout
          </button>
          <button
            className="btn-primary rounded-2xl px-4 py-3 transition-all duration-300"
            onClick={updateWorkout.onOpen}>
            Update Workout
          </button>

          <button
            className={`btn-secondary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
            onClick={removeExercises.onOpen}>
            Remove Selected Exercises
          </button>
        </div>

        <ExerciseList exercises={workout?.exercises ?? []} isLoading={isLoading} fetch={false} />
      </div>
      {updateWorkout.isOpen && (
        <NewWorkoutModal isOpen={updateWorkout.isOpen} onOpenChange={updateWorkout.onOpenChange} action="update" />
      )}
    </>
  );
};
