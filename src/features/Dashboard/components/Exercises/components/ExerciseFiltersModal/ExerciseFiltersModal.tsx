import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import type { IBodyPart } from "@src/shared/interfaces/exerciseDb/IBodyPart";
import type { ITargetMuscle } from "@src/shared/interfaces/exerciseDb/ITargetMuscle";
import { FiltersIcon } from "@src/shared/ui/FiltersIcon";
import { MultiSelect } from "@src/shared/ui/MultiSelect/MultiSelect";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { type Selection } from "@heroui/react";
import {
  setSelectedBodyParts,
  setSelectedExerciseType,
  setSelectedTargetMuscles,
} from "@src/store/slices/exerciseSlice";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";
import "./ExerciseFiltersModal.css";
import type { IExerciseType } from "@src/shared/interfaces/exerciseDb/IExerciseType";
import { SelectComponent } from "@src/shared/ui/SelectComponent/SelectComponent";

interface ExerciseFiltersModalProps {
  bodyParts?: IBodyPart[];
  targetMuscles?: ITargetMuscle[];
  exerciseTypes?: IExerciseType[];
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}
export const ExerciseFiltersModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  bodyParts,
  targetMuscles,
  exerciseTypes,
}: ExerciseFiltersModalProps) => {
  const dispatch = useAppDispatch();
  const { selectedBodyParts, selectedTargetMuscles, selectedExerciseType } = useAppSelector((state) => state.exercise);

  const onItemsChange = (keys: Selection | "all", field: keyof IExerciseQuery) => {
    if (keys === "all") return;
    const selected = Array.from(keys) as string[];
    switch (field) {
      case "targetMuscles":
        dispatch(setSelectedTargetMuscles(selected));
        break;
      case "bodyParts":
        dispatch(setSelectedBodyParts(selected));
        break;
      case "exerciseType":
        dispatch(setSelectedExerciseType(selected[0]));
        break;
    }
  };

  const onClearItems = (field: keyof IExerciseQuery) => {
    switch (field) {
      case "targetMuscles":
        dispatch(setSelectedTargetMuscles([]));
        break;
      case "bodyParts":
        dispatch(setSelectedBodyParts([]));
        break;
      case "exerciseType":
        dispatch(setSelectedExerciseType(null));
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-x-3">
              <h2 className="text-2xl">{title}</h2>
              <FiltersIcon className="size-8" />
            </ModalHeader>
            <ModalBody>
              <MultiSelect
                label="Body Parts"
                placeholder="Select body parts"
                field="bodyParts"
                selectedKeys={selectedBodyParts}
                items={bodyParts ?? []}
                onChange={onItemsChange}
                onClearItems={onClearItems}
              />
              <MultiSelect
                label="Target Muscles"
                placeholder="Select target muscles"
                selectedKeys={selectedTargetMuscles}
                field="targetMuscles"
                items={targetMuscles ?? []}
                onChange={onItemsChange}
                onClearItems={onClearItems}
              />
              <SelectComponent
                label="Exercise Type"
                placeholder="Select exercise type"
                field="exerciseType"
                selectedKeys={selectedExerciseType ? [selectedExerciseType] : []}
                items={exerciseTypes ?? []}
                onChange={onItemsChange}
                onClearItems={onClearItems}
              />
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center gap-x-3 pt-2.5">
                <button className="btn-primary rounded-xl px-4 py-3" onClick={onClose}>
                  Close
                </button>
                <button className="btn-secondary rounded-xl px-4 py-3 " onClick={onConfirm}>
                  Apply
                </button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
