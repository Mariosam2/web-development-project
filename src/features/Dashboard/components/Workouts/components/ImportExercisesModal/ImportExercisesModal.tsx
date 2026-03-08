import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import "./ImportExercisesModal.css";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { NumberInput } from "@heroui/react";
import { setSelectedExercises } from "@src/store/slices/exerciseSlice";
import { useEffect, useState } from "react";
import {
  useGetSingleWorkoutQuery,
  useGetWorkoutExercisesQuery,
  useImportExercisesMutation,
} from "@src/store/api/workoutApi";
import { showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { WorkoutAutocomplete } from "../WorkoutAutocomplete/WorkoutAutocomplete";
import { setSelectedWorkout } from "@src/store/slices/workoutSlice";
interface ImportExercisesModalProps {
  action: "create" | "update";
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export const ImportExercisesModal = ({ isOpen, onOpenChange }: ImportExercisesModalProps) => {
  const dispatch = useAppDispatch();
  const { selectedExercises } = useAppSelector((state) => state.exercise);
  const [showLoading, setShowLoading] = useState(false);
  const [importExercises, { isLoading }] = useImportExercisesMutation();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [selectedWorkoutError, setSelectedWorkoutError] = useState<string>("");
  const { data: selectedWorkout } = useGetSingleWorkoutQuery(
    { workoutId: selectedWorkoutId! },
    { skip: !selectedWorkoutId },
  );
  const { data: selectedWorkoutExercises } = useGetWorkoutExercisesQuery(
    { workoutId: selectedWorkoutId! },
    { skip: !selectedWorkoutId },
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (selectedWorkout?.data) {
      dispatch(setSelectedWorkout(selectedWorkout.data));
    }
  }, [selectedWorkout, dispatch]);

  const onSelectWorkout = (workoutId: string) => {
    if (!workoutId) {
      setSelectedWorkoutId(null);
      return;
    }
    setSelectedWorkoutError("");
    setSelectedWorkoutId(workoutId);
  };

  const onUpdateExercise = (exerciseId: string | undefined, field: string, value: number) => {
    const updatedExercises = selectedExercises.map((exercise) =>
      exercise.exerciseId === exerciseId ? { ...exercise, [field]: value } : exercise,
    );
    dispatch(setSelectedExercises(updatedExercises));
  };

  const importExercisesHandler = async () => {
    try {
      if (!selectedWorkoutId) {
        setSelectedWorkoutError("Please select a workout to import exercises");
        return;
      }
      await importExercises({
        exercises: [...(selectedWorkoutExercises?.data ?? []), ...selectedExercises],
        workoutId: selectedWorkout?.data.id ?? "",
      }).unwrap();
      onOpenChange(false);
      showToast("Success", "Exercises imported successfully", ToastType.SUCCESS);
      dispatch(setSelectedExercises([]));
      setSelectedWorkoutId(null);
      setSelectedWorkoutError("");
    } catch (err) {
      console.error("error", err);
    }
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
        <ModalHeader className="flex flex-col gap-1 text-2xl">Import Exercises</ModalHeader>
        <ModalBody>
          <>
            <WorkoutAutocomplete onSelect={onSelectWorkout} error={selectedWorkoutError} />
            <div className="h-60 overflow-y-auto">
              {selectedExercises.map((exercise) => (
                <div
                  key={exercise.exerciseId}
                  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 items-center gap-x-3 border-b border-c-gray">
                  <img className="size-24" src={exercise.imageUrl} alt={exercise.name} />
                  <span>{exercise.name}</span>

                  <div className="max-w-1/3 flex items-center max-h-7 ms-auto pe-2.5 gap-x-3">
                    <NumberInput
                      defaultValue={exercise.sets ?? 1}
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
                      defaultValue={exercise.reps ?? 1}
                      minValue={1}
                      maxValue={100}
                      onValueChange={(v) => onUpdateExercise(exercise.exerciseId, "reps", v)}
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
              disabled={showLoading}
              className="btn-primary rounded-xl px-4 py-3"
              onClick={() => onOpenChange(false)}>
              Close
            </button>
            <button
              className={`btn-secondary rounded-xl px-4 py-3 ${showLoading ? "loading pe-12" : ""}`}
              onClick={importExercisesHandler}>
              {showLoading ? "Loading..." : "Import"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
