import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import "./GenerateWorkoutModal.css";
import type { GenerateWorkoutForm } from "@src/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { GenerateWorkoutSchema } from "@src/shared/schema/GenerateWorkoutSchema";
import { useGetEquipmentsQuery, useGetTargetMusclesQuery } from "@src/store/api/exerciseApi";
import { MultiSelect } from "@src/shared/ui/MultiSelect/MultiSelect";
import { SelectComponent } from "@src/shared/ui/SelectComponent/SelectComponent";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { useGenerateWorkoutMutation } from "@src/store/api/workoutApi";
import { showToast } from "@src/shared/helpers";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { GeneratingOverlay } from "./components/GeneratingOverlay/GeneratingOverlay";
interface GenerateWorkoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  closeSidebar?: () => void;
}
export const GenerateWorkoutModal = ({ isOpen, onOpenChange, closeSidebar }: GenerateWorkoutModalProps) => {
  const userLevels = [{ name: "beginner" }, { name: "intermediate" }, { name: "advanced" }];
  const { data: targetMuscles } = useGetTargetMusclesQuery();
  const { data: equipments } = useGetEquipmentsQuery();
  const [generateWorkout, { isLoading }] = useGenerateWorkoutMutation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GenerateWorkoutForm>({
    resolver: zodResolver(GenerateWorkoutSchema),
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading || isSubmitting) {
      timer = setTimeout(() => setIsGenerating(true), 0);
    } else {
      timer = setTimeout(() => setIsGenerating(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading, isSubmitting]);

  const generateWorkoutHandler = handleSubmit(async (data) => {
    try {
      await generateWorkout(data).unwrap();
      reset();
      onOpenChange(false);
      showToast("Success", "Workout generated successfully", ToastType.SUCCESS);
      navigate("/dashboard/workouts");
      if (closeSidebar) closeSidebar();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <GeneratingOverlay isOpen={isGenerating} />
      <Modal
        isOpen={isOpen}
        size="md"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          base: "!outline-none",
          closeButton: "outline-none focus:outline-none",
        }}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-2xl">Generate Workout</ModalHeader>
          <ModalBody>
            <form id="generate-form" className="flex flex-col gap-4" onSubmit={generateWorkoutHandler}>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-c-dark-gray">Weight (kg)</label>
                  <input
                    {...register("weight", { valueAsNumber: true })}
                    type="number"
                    min={1}
                    placeholder="e.g. 70"
                    className={`border border-c-gray rounded-xl px-3 py-2 text-sm focus:outline-none ${errors.weight ? "border-red-500" : ""}`}
                  />
                  <span
                    className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.weight ? "opacity-100" : "opacity-0"}`}>
                    {errors.weight?.message ?? "\u00A0"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-c-dark-gray">Height (cm)</label>
                  <input
                    {...register("height", { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g. 175"
                    min={40}
                    className={`border border-c-gray rounded-xl px-3 py-2 text-sm focus:outline-none ${errors.height ? "border-red-500" : ""}`}
                  />
                  <span
                    className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.height ? "opacity-100" : "opacity-0"}`}>
                    {errors.height?.message ?? "\u00A0"}
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm text-c-dark-gray">Age</label>
                  <input
                    {...register("age", { valueAsNumber: true })}
                    type="number"
                    placeholder="e.g. 25"
                    min={1}
                    className={`border border-c-gray rounded-xl px-3 py-2 text-sm focus:outline-none ${errors.age ? "border-red-500" : ""}`}
                  />
                  <span
                    className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.age ? "opacity-100" : "opacity-0"}`}>
                    {errors.age?.message ?? "\u00A0"}
                  </span>
                </div>
              </div>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <SelectComponent
                    label="Level"
                    placeholder="Select level"
                    selectedKeys={field.value ? [field.value] : []}
                    items={userLevels}
                    onChange={(value) => field.onChange(Array.from(value)[0] as string)}
                    onClear={() => () => field.onChange("")}
                    isInvalid={!!errors.level}
                  />
                )}
              />

              <Controller
                name="targetMuscles"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label="Target Muscles"
                    placeholder="Select target muscles"
                    selectedKeys={field.value?.length > 0 ? field.value : []}
                    items={targetMuscles?.data ?? []}
                    onChange={(value) => field.onChange(Array.from(value) as string[])}
                    onClear={() => field.onChange([])}
                    isInvalid={!!errors.equipments}
                  />
                )}
              />
              <Controller
                name="equipments"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label="Equipments"
                    placeholder="Select equipments"
                    selectedKeys={field.value?.length > 0 ? field.value : []}
                    items={equipments?.data ?? []}
                    onChange={(value) => field.onChange(Array.from(value) as string[])}
                    onClear={() => field.onChange([])}
                    isInvalid={!!errors.equipments}
                  />
                )}
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm text-c-dark-gray">Goal</label>
                <input
                  {...register("goal")}
                  type="text"
                  placeholder="e.g. Build muscle, lose weight..."
                  className={`border border-c-gray rounded-xl px-3 py-2 text-sm focus:outline-none ${errors.goal ? "border-red-500" : ""}`}
                />
                <span
                  className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.goal ? "opacity-100" : "opacity-0"}`}>
                  {errors.goal?.message ?? "\u00A0"}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-c-dark-gray">Notes</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Any injuries, preferences or additional info..."
                  className={`border border-c-gray rounded-xl px-3 py-2 text-sm focus:outline-none resize-none ${errors.notes ? "border-red-500" : ""}`}
                />
                <span
                  className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.notes ? "opacity-100" : "opacity-0"}`}>
                  {errors.notes?.message ?? "\u00A0"}
                </span>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center gap-x-3 pt-4">
              <button
                disabled={isGenerating}
                className="btn-primary rounded-xl px-4 py-3"
                onClick={() => onOpenChange(false)}>
                Close
              </button>
              <button
                className={`btn-secondary rounded-xl px-4 py-3 ${isGenerating ? "loading pe-12" : ""}`}
                onClick={generateWorkoutHandler}>
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
