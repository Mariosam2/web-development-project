import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import type { IBodyPart } from "@src/shared/interfaces/exerciseDb/IBodyPart";
import type { ITargetMuscle } from "@src/shared/interfaces/exerciseDb/ITargetMuscle";
import { FiltersIcon } from "@src/shared/ui/FiltersIcon";
import { MultiSelect } from "@src/shared/ui/MultiSelect/MultiSelect";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import type { Selection } from "@heroui/react";
import { setBodyPartsSelected, setTargetMusclesSelected } from "@src/store/slices/exerciseSlice";
import type { IExerciseQuery } from "@src/shared/interfaces/query/IExercisesQuery";

interface FiltersModalProps {
  bodyParts?: IBodyPart[];
  targetMuscles?: ITargetMuscle[];
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}
export const FiltersModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  bodyParts,
  targetMuscles,
}: FiltersModalProps) => {
  const dispatch = useAppDispatch();
  const { selectedBodyParts, selectedTargetMuscles } = useAppSelector((state) => state.exercise);

  const onItemsChange = (keys: Selection | "all", field: keyof IExerciseQuery) => {
    if (keys === "all") return;
    const selected = Array.from(keys) as string[];
    if (field === "targetMuscles") dispatch(setTargetMusclesSelected(selected));
    if (field === "bodyParts") dispatch(setBodyPartsSelected(selected));
  };

  const onClearItems = (field: keyof IExerciseQuery) => {
    if (field === "targetMuscles") dispatch(setTargetMusclesSelected([]));
    if (field === "bodyParts") dispatch(setBodyPartsSelected([]));
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
