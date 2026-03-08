import {
  useCompleteWorkoutMutation,
  useDeleteWorkoutMutation,
  useGetSingleWorkoutQuery,
  useGetWorkoutExercisesQuery,
  useRemoveExercisesMutation,
  useUpdateWorkoutMutation,
} from "@src/store/api/workoutApi";
import "./WorkoutDetail.css";
import { useNavigate, useParams } from "react-router";
import { useDisclosure } from "@heroui/modal";
import { ExerciseList } from "../../../../../../shared/components/ExerciseList/ExerciseList";
import { NewWorkoutModal } from "../NewWorkoutModal/NewWorkoutModal";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { setSelectedWorkout } from "@src/store/slices/workoutSlice";
import { Skeleton } from "@heroui/skeleton";
import { GeneralModal } from "../../../../../../shared/components/GeneralModal/GeneralModal";
import { showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { ModalAction } from "@src/shared/enums/ModalActions.enum";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";
import { CompletedChip } from "../CompletedChip/CompletedChip";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setSelectedExercises } from "@src/store/slices/exerciseSlice";

export const WorkoutDetail = () => {
  const { workoutId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedWorkout } = useAppSelector((state) => state.workout);
  const { selectedExercises } = useAppSelector((state) => state.exercise);
  const [, { isSuccess: updateSuccess, reset }] = useUpdateWorkoutMutation({ fixedCacheKey: "update-workout" });
  const [deleteWorkout, { isLoading: isDeletingWorkout }] = useDeleteWorkoutMutation();
  const [completeWorkout, { isLoading: isCompletingWorkout }] = useCompleteWorkoutMutation();
  const [removeExercises, { isLoading: isRemovingExercises }] = useRemoveExercisesMutation();
  const {
    data: workoutData,
    isLoading: isLoadingWorkout,
    isFetching: isFetchingWorkout,
    isError: workoutError,
  } = useGetSingleWorkoutQuery({ workoutId: workoutId as string }, { skip: !workoutId });
  const {
    data: workoutExercises,
    isLoading: isLoadingExercises,
    isFetching: isFetchingExercises,
  } = useGetWorkoutExercisesQuery({ workoutId: workoutId ?? "" }, { skip: !workoutId });

  const updateWorkoutModal = useDisclosure();
  const deleteWorkoutModal = useDisclosure();
  const completeWorkoutModal = useDisclosure();
  const removeSelectedExercisesModal = useDisclosure();
  const workout = workoutData?.data;

  useEffect(() => {
    if (isLoadingWorkout || isFetchingWorkout) return;

    const status = (workoutError as unknown as FetchBaseQueryError)?.status;
    if (typeof status === "number" && status === 404) {
      navigate("/not-found");
      return;
    }

    if (!workoutError && !workout) {
      navigate("/not-found");
    }
  }, [workout, isLoadingWorkout, isFetchingWorkout, workoutError, navigate]);

  useEffect(() => {
    if (!workout) return;
    console.log("SELECT WORKOUT", workout);
    dispatch(setSelectedWorkout(workout));
  }, [workout, dispatch]);

  const initialLoading = isLoadingExercises || isLoadingWorkout;
  const showSkeleton = initialLoading || updateSuccess;

  useEffect(() => {
    if (updateSuccess && !isFetchingExercises && !isFetchingWorkout) {
      const timer = setTimeout(() => reset(), 500);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess, isFetchingExercises, isFetchingWorkout, reset]);
  const deleteWorkoutHandler = async () => {
    try {
      await deleteWorkout({ workoutId: selectedWorkout?.id ?? "" }).unwrap();
      showToast("Success", "Workout created successfully", ToastType.SUCCESS);
      dispatch(setSelectedWorkout({} as IWorkout));
      navigate("/dashboard/workouts");
    } catch (err) {
      console.error("error", err);
    }
    deleteWorkoutModal.onClose();
  };

  const removeSelectedExercisesHandler = async () => {
    try {
      const exercisesIds = selectedExercises.map((exercise) => exercise.id).filter((id): id is string => !!id);
      await removeExercises({
        exercisesIds,
        workoutId: selectedWorkout?.id ?? "",
      }).unwrap();
      showToast("Success", "Exercises removed successfully", ToastType.SUCCESS);
      dispatch(setSelectedExercises([]));
    } catch (err) {
      console.error("error", err);
    }
    removeSelectedExercisesModal.onClose();
  };

  const completeWorkoutHandler = async () => {
    try {
      await completeWorkout({ workoutId: selectedWorkout?.id ?? "" }).unwrap();
      showToast("Success", "Workout completed successfully", ToastType.SUCCESS);
    } catch (err) {
      console.error("error", err);
    }
    completeWorkoutModal.onClose();
  };

  return (
    <>
      <div className=" flex flex-col  justify-start mb-2.5  absolute left-0 right-0 top-32 container-xl mx-auto px-3">
        <div className=" w-full max-w-md mx-auto mb-12  h-20 self-center">
          {!showSkeleton ? (
            <h1 className="text-center text-4xl h-full font-semibold wrap-break-word">{workout?.title}</h1>
          ) : (
            <Skeleton className=" w-full h-full rounded-lg" />
          )}
        </div>
        <div className="actions h-12 self-start flex items-center gap-x-3 w-full px-3">
          <button
            disabled={showSkeleton}
            className="btn-secondary rounded-2xl px-4 py-3 transition-all duration-300"
            onClick={deleteWorkoutModal.onOpen}>
            Delete Workout
          </button>
          <button
            disabled={showSkeleton}
            className="btn-primary rounded-2xl px-4 py-3 transition-all duration-300"
            onClick={updateWorkoutModal.onOpen}>
            Update Workout
          </button>
          {!workout?.completed && (
            <button
              disabled={showSkeleton}
              className="btn-outline rounded-2xl px-4 py-3 transition-all duration-300"
              onClick={completeWorkoutModal.onOpen}>
              Mark as Completed
            </button>
          )}

          <button
            disabled={showSkeleton}
            className={`btn-secondary rounded-2xl px-4 py-3 transition-all duration-300
          ${selectedExercises.length > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"}`}
            onClick={removeSelectedExercisesModal.onOpen}>
            Remove Selected Exercises
          </button>
          {showSkeleton ? (
            <Skeleton className="ms-auto me-4 h-9 w-28 rounded-full" />
          ) : (
            <CompletedChip
              isCompleted={workout?.completed ?? null}
              className="ms-auto me-4 py-1.5 px-4"
              iconClassName="size-8"
            />
          )}
        </div>
      </div>
      <div className="pb-8">
        <ExerciseList exercises={workoutExercises?.data ?? []} isLoading={showSkeleton} fetch={false} />
      </div>

      {updateWorkoutModal.isOpen && (
        <NewWorkoutModal
          isOpen={updateWorkoutModal.isOpen}
          onOpenChange={updateWorkoutModal.onOpenChange}
          action="update"
        />
      )}

      {completeWorkoutModal.isOpen && (
        <GeneralModal
          isOpen={completeWorkoutModal.isOpen}
          onOpenChange={completeWorkoutModal.onOpenChange}
          onConfirm={completeWorkoutHandler}
          isLoading={isCompletingWorkout}
          title="Complete Workout"
          message="Are you sure you want to mark this workout as complete?"
          action={ModalAction.COMPLETE}
        />
      )}

      {deleteWorkoutModal.isOpen && (
        <GeneralModal
          isOpen={deleteWorkoutModal.isOpen}
          onOpenChange={deleteWorkoutModal.onOpenChange}
          onConfirm={deleteWorkoutHandler}
          isLoading={isDeletingWorkout}
          title="Delete Workout"
          message="Are you sure you want to delete this workout?"
          action={ModalAction.DELETE}
        />
      )}
      {removeSelectedExercisesModal.isOpen && (
        <GeneralModal
          isOpen={removeSelectedExercisesModal.isOpen}
          onOpenChange={removeSelectedExercisesModal.onOpenChange}
          onConfirm={removeSelectedExercisesHandler}
          isLoading={isRemovingExercises}
          title="Remove selected exercises"
          message="Are you sure you want to remove the selected exercises from this workout?"
          action={ModalAction.REMOVE}
        />
      )}
    </>
  );
};
