import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { NumberInput } from "@heroui/number-input";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { setSelectedExercises } from "@src/store/slices/exerciseSlice";
import {
  useAddWorkoutMutation,
  useGetWorkoutExercisesQuery,
  useUpdateWorkoutMutation,
} from "@src/store/api/workoutApi";
import { useEffect, useState } from "react";
import { capitalize, MAX_IMAGE_SIZE, showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import "./NewWorkoutModal.css";
import { ImageDrop } from "@src/shared/components/ImageDrop/ImageDrop";
import type { IExercise } from "@src/shared/interfaces/exercise/IExercise";

interface NewWorkoutModalProps {
  action: "create" | "update";
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const NewWorkoutModal = ({ isOpen, onOpenChange, action }: NewWorkoutModalProps) => {
  const dispatch = useAppDispatch();
  const { selectedExercises } = useAppSelector((state) => state.exercise);
  const { selectedWorkout } = useAppSelector((state) => state.workout);
  const [addWorkout, { isLoading: addWorkoutLoading }] = useAddWorkoutMutation();
  const {
    data: workoutExercises,
    isLoading: isLoadingExercises,
    isFetching: isFetchingExercises,
  } = useGetWorkoutExercisesQuery({ workoutId: selectedWorkout?.id ?? "" }, { skip: !selectedWorkout?.id });
  const [updateWorkout, { isLoading: updateWorkoutLoading }] = useUpdateWorkoutMutation({
    fixedCacheKey: "update-workout",
  });
  const [workoutTitle, setWorkoutTitle] = useState(selectedWorkout?.title ?? "");
  const [workoutTitleError, setWorkoutTitleError] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [localExercises, setLocalExercises] = useState<IExercise[]>(
    action === "create" ? (selectedExercises ?? []) : (workoutExercises?.data ?? []),
  );
  const [image, setImage] = useState<File | null>(null);
  const isLoading = addWorkoutLoading || updateWorkoutLoading || isLoadingExercises || isFetchingExercises;

  console.log("SELECTED WORKOUT", selectedWorkout);

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

  const onUpdateExercise = (exerciseId: string | undefined, field: string, value: number) => {
    const updatedExercises = localExercises.map((exercise) =>
      exercise.exerciseId === exerciseId ? { ...exercise, [field]: value } : exercise,
    );
    setLocalExercises(updatedExercises);
  };

  const addWorkoutHandler = async () => {
    try {
      if (!workoutTitle) return setWorkoutTitleError("Workout title is required");

      const formData = new FormData();
      formData.append("title", workoutTitle);
      formData.append("exercises", JSON.stringify(localExercises));
      if (image) {
        formData.append("image", image);
      }
      await addWorkout(formData).unwrap();
      onOpenChange(false);
      showToast("Success", "Workout created successfully", ToastType.SUCCESS);
      setLocalExercises([]);
      dispatch(setSelectedExercises([]));
    } catch (err) {
      console.error("error", err);
    }
  };

  const updateWorkoutHandler = async () => {
    try {
      if (!workoutTitle) return setWorkoutTitleError("Workout title is required");
      const formData = new FormData();
      formData.append("workoutId", selectedWorkout?.id ?? "");
      formData.append("title", workoutTitle);
      formData.append("imageRemoved", String(imageRemoved));
      formData.append("exercises", JSON.stringify(localExercises));
      if (image) {
        formData.append("image", image);
      }

      if (selectedWorkout?.imageId) {
        formData.append("imageId", selectedWorkout.imageId);
      }

      await updateWorkout(formData).unwrap();
      onOpenChange(false);
      showToast("Success", "Workout updated successfully", ToastType.SUCCESS);
      dispatch(setSelectedExercises([]));
    } catch (err) {
      console.error("error", err);
    }
  };

  const newWorkoutHandler = () => {
    if (action === "create") {
      addWorkoutHandler();
    } else {
      updateWorkoutHandler();
    }
  };

  const onImageSelect = (file: File | null, imageRemoved: boolean) => {
    if (file !== null && file.size > MAX_IMAGE_SIZE) {
      showToast("Error", "Image must be under 5MB", ToastType.DANGER);
      return;
    }

    setImageRemoved(imageRemoved);
    setImage(file);
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

            <ImageDrop onImageSelect={onImageSelect} imageUrl={selectedWorkout?.imageUrl} />
            <div className="h-60 overflow-y-auto">
              {localExercises.map((exercise) => (
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
              onClick={newWorkoutHandler}>
              {showLoading ? "Loading..." : capitalize(action)}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
