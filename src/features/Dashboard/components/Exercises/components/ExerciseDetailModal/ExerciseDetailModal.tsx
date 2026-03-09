import { Modal, ModalContent } from "@heroui/modal";
import { ExerciseDetailContent } from "../ExerciseDetailContent/ExerciseDetailContent";
import { ExerciseDetailSkeleton } from "../ExerciseDetailSkeleton/ExerciseDetailSkeleton";
import "./ExerciseDetailModal.css";
import type { IExerciseDetail } from "@src/shared/interfaces/exerciseDb/IExerciseDetail";

interface ExerciseDetailModalProps {
  exerciseDetail?: IExerciseDetail;
  isLoading: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ExerciseDetailModal = ({ isOpen, onOpenChange, exerciseDetail, isLoading }: ExerciseDetailModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
      classNames={{
        base: "exercise-modal p-1 xs:p-2 sm:p-4",
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            {isLoading || !exerciseDetail ? (
              <ExerciseDetailSkeleton />
            ) : (
              <ExerciseDetailContent exerciseDetail={exerciseDetail} onClose={onClose} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
