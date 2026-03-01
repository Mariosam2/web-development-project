import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import type { RootState } from "@src/store/store";
import { useSelector } from "react-redux";
import { NumberInput } from "@heroui/number-input";
import { useAppDispatch } from "@src/store/hooks";
import { setSelectedExercises, updateExercise } from "@src/store/slices/exerciseSlice";
import { useAddWorkoutMutation } from "@src/store/api/workoutApi";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";
import { useEffect, useState } from "react";
import { capitalize, showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import "./NewWorkoutModal.css";
import { ImageDrop } from "@src/shared/components/ImageDrop/ImageDrop";

interface NewWorkoutModalProps {
  action: "create" | "update";
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const NewWorkoutModal = ({ isOpen, onOpenChange, action }: NewWorkoutModalProps) => {
  const MIN_DURATION = 18000;
  const dispatch = useAppDispatch();
  const { selectedExercises } = useSelector((state: RootState) => state.exercise);
  const { selectedWorkout } = useSelector((state: RootState) => state.workout);
  const [addWorkout, { isLoading }] = useAddWorkoutMutation();
  const [workoutTitle, setWorkoutTitle] = useState(selectedWorkout?.title ?? "");
  const [workoutTitleError, setWorkoutTitleError] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const exercises = selectedExercises.length > 0 ? selectedExercises : (selectedWorkout?.exercises ?? []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleWorkoutTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkoutTitleError("");
    setWorkoutTitle(event.target.value);
  };

  const addWorkoutHandler = async () => {
    try {
      if (!workoutTitle) return setWorkoutTitleError("Workout title is required");
      const newWorkout: IWorkout = {
        title: workoutTitle,
        estimatedDuration: Math.floor((calculateEstimatedDuration() ?? MIN_DURATION) / 60),
        exercises: exercises,
      };
      await addWorkout(newWorkout).unwrap();
      showToast("Success", "Workout created successfully", ToastType.SUCCESS);
      onOpenChange(false);
      dispatch(setSelectedExercises([]));
    } catch (err) {
      console.error("error", err);
    }
  };

  const calculateEstimatedDuration = (): number => {
    return exercises.reduce((total, exercise) => {
      const sets = exercise.sets ?? 1;
      const reps = exercise.reps ?? 1;
      const secondsPerRep = 3;
      const restBetweenSets = 60;
      const timePerSet = reps * secondsPerRep + restBetweenSets;
      return total + sets * timePerSet;
    }, 0);
  };
  const onUpdateExercise = (exerciseId: string | undefined, field: string, value: number) => {
    dispatch(updateExercise({ exerciseId: exerciseId as string, field, value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      size="md"
      onOpenChange={onOpenChange}
      backdrop="opaque"
      classNames={{
        base: "!outline-none",
        closeButton: "outline-none focus:outline-none",
      }}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">{capitalize(action)} Workout</ModalHeader>
        <ModalBody>
          <>
            <div className="form-group mb-2.5">
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium">
                Workout Title
              </label>
              <input
                type="text"
                id="first_name"
                maxLength={50}
                value={workoutTitle}
                onChange={handleWorkoutTitleChange}
                className={`bg-c-light-gray border w-full border-c-dark-gray c-shadow-md text-c-dark text-base rounded-xl p-3 focus:outline-none ${workoutTitleError ? "border-red-500" : ""}`}
                placeholder="My workout #1"
              />
              {workoutTitleError && <span className="text-red-500">{workoutTitleError}</span>}
            </div>
            <ImageDrop onImageSelect={(file) => console.log(file)} />
            <div className="h-60 overflow-y-auto">
              {exercises.map((exercise) => (
                <div
                  key={exercise.exerciseId}
                  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 items-center gap-x-3 border-b border-c-gray">
                  <img className="size-24" src={exercise.imageUrl} alt={exercise.name} />
                  <span>{exercise.name}</span>

                  <div className="max-w-1/3 flex items-center max-h-7 ms-auto pe-2.5 gap-x-3">
                    <NumberInput
                      defaultValue={1}
                      minValue={1}
                      maxValue={100}
                      onValueChange={(v) => onUpdateExercise(exercise.exerciseId, "sets", v)}
                      classNames={{
                        inputWrapper: "!ring-0 !ring-transparent !shadow-none group-data-[focus-visible=true]:!ring-0",
                      }}
                      label="Sets"
                      variant={"faded"}
                    />
                    <NumberInput
                      defaultValue={1}
                      minValue={1}
                      maxValue={100}
                      onValueChange={(v) => onUpdateExercise(exercise.exerciseId, "sets", v)}
                      classNames={{
                        inputWrapper: "!ring-0 !ring-transparent !shadow-none group-data-[focus-visible=true]:!ring-0",
                      }}
                      label="Reps"
                      variant={"faded"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-x-3 pt-4">
            <button
              disabled={isLoading || showLoading}
              className="btn-primary rounded-xl px-4 py-3"
              onClick={() => onOpenChange(false)}>
              Close
            </button>
            <button
              className={`btn-secondary rounded-xl px-4 py-3 ${isLoading || showLoading ? "loading pe-12" : ""}`}
              onClick={() => {
                addWorkoutHandler();
              }}>
              {isLoading || showLoading ? "Loading..." : capitalize(action)}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
