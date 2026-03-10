import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import "./GenerateWorkoutModal.css";
import type { GenerateWorkoutForm } from "@src/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { GenerateWorkoutSchema } from "@src/shared/schema/GenerateWorkoutSchema";
import { Select, SelectItem } from "@heroui/react";
import { Trash } from "@src/shared/ui/Trash";
import { useGetEquipmentsQuery, useGetTargetMusclesQuery } from "@src/store/api/exerciseApi";
import { capitalize } from "@src/shared/helpers";
interface GenerateWorkoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export const GenerateWorkoutModal = ({ isOpen, onOpenChange }: GenerateWorkoutModalProps) => {
  const userLevels = [{ value: "beginner" }, { value: "intermediate" }, { value: "advanced" }];
  const { data: targetMuscles } = useGetTargetMusclesQuery();
  const { data: equipments } = useGetEquipmentsQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GenerateWorkoutForm>({
    resolver: zodResolver(GenerateWorkoutSchema),
  });

  const generateWorkoutHandler = handleSubmit(async (data) => {
    // await generateWorkout(data).unwrap();
    console.log(data);
  });

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
        <ModalHeader className="flex flex-col gap-1 text-2xl">Generate Workout</ModalHeader>
        <ModalBody>
          <form id="generate-form" className="flex flex-col gap-4" onSubmit={generateWorkoutHandler}>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm text-c-dark-gray">Weight (kg)</label>
                <input
                  {...register("weight", { valueAsNumber: true })}
                  type="number"
                  placeholder="70"
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
                  placeholder="175"
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
                  placeholder="25"
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
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Select
                      className="max-w-xs"
                      classNames={{
                        base: "max-w-xs !ring-0 !outline-none !shadow-none focus:!ring-0",
                        trigger: "min-h-12 py-2 !ring-0 !outline-none !shadow-none focus:!ring-0",
                        listboxWrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                      }}
                      variant="bordered"
                      items={userLevels}
                      label="Level"
                      labelPlacement="outside"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) => field.onChange(Array.from(value)[0] as string)}
                      placeholder="Select level"
                      isInvalid={!!errors.level}>
                      {(l) => (
                        <SelectItem
                          classNames={{
                            base: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                            wrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                          }}
                          key={l.value}
                          textValue={capitalize(l.value)}>
                          <div className="flex gap-2 items-center">
                            <span className="text-small">{capitalize(l.value)}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <Trash
                      className="size-6 mt-6 ms-1 cursor-pointer text-c-dark-gray"
                      onClick={() => field.onChange("")}
                    />
                  </div>
                  <span
                    className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.level ? "opacity-100" : "opacity-0"}`}>
                    {errors.level?.message ?? "\u00A0"}
                  </span>
                </div>
              )}
            />

            <Controller
              name="targetMuscles"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Select
                      className="max-w-xs"
                      classNames={{
                        base: "max-w-xs !ring-0 !outline-none !shadow-none focus:!ring-0",
                        trigger: "min-h-12 py-2 !ring-0 !outline-none !shadow-none focus:!ring-0",
                        listboxWrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                      }}
                      variant="bordered"
                      selectionMode="multiple"
                      items={targetMuscles?.data ?? []}
                      label="Target Muscles"
                      labelPlacement="outside"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) => field.onChange(Array.from(value)[0] as string)}
                      placeholder="Select target muscles"
                      isInvalid={!!errors.targeMuscles}>
                      {(tm) => (
                        <SelectItem
                          classNames={{
                            base: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                            wrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                          }}
                          key={tm.name}
                          textValue={tm.name}>
                          <div className="flex gap-2 items-center">
                            <span className="text-small">{tm.name}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <Trash
                      className="size-6 mt-6 ms-1 cursor-pointer text-c-dark-gray"
                      onClick={() => field.onChange([])}
                    />
                  </div>
                  <span
                    className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.level ? "opacity-100" : "opacity-0"}`}>
                    {errors.level?.message ?? "\u00A0"}
                  </span>
                </div>
              )}
            />

            <Controller
              name="equipments"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Select
                      className="max-w-xs"
                      classNames={{
                        base: "max-w-xs !ring-0 !outline-none !shadow-none focus:!ring-0",
                        trigger: "min-h-12 py-2 !ring-0 !outline-none !shadow-none focus:!ring-0",
                        listboxWrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                      }}
                      variant="bordered"
                      selectionMode="multiple"
                      items={equipments?.data ?? []}
                      label="Equipments"
                      labelPlacement="outside"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) => field.onChange(Array.from(value)[0] as string)}
                      placeholder="Select equipments"
                      isInvalid={!!errors.targeMuscles}>
                      {(eq) => (
                        <SelectItem
                          classNames={{
                            base: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                            wrapper: "!ring-0 !outline-none !shadow-none focus:!ring-0",
                          }}
                          key={eq.name}
                          textValue={eq.name}>
                          <div className="flex gap-2 items-center">
                            <span className="text-small">{eq.name}</span>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <Trash
                      className="size-6 mt-6 ms-1 cursor-pointer text-c-dark-gray"
                      onClick={() => field.onChange([])}
                    />
                  </div>
                  <span
                    className={`block h-4 text-red-500 text-xs transition-opacity duration-200 ${errors.level ? "opacity-100" : "opacity-0"}`}>
                    {errors.level?.message ?? "\u00A0"}
                  </span>
                </div>
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
            <button className="btn-primary rounded-xl px-4 py-3" onClick={() => onOpenChange(false)}>
              Close
            </button>
            <button className="btn-secondary rounded-xl px-4 py-3" onClick={generateWorkoutHandler}>
              Generate
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
