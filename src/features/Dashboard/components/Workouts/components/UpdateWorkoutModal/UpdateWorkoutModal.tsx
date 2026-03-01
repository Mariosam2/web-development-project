import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import "./UpdateWorkoutModal.css";
interface UpdateWorkoutModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export const UpdateWorkoutModal = ({ isOpen, onOpenChange }: UpdateWorkoutModalProps) => {
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
        <ModalHeader>Modify Workout</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </ModalContent>
    </Modal>
  );
};
