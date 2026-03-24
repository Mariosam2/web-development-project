import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import "./DeleteAccountModal.css";
import { useDeleteProfileMutation } from "@src/store/api/profileApi";
import { showToast } from "@src/shared/helpers";
import { ToastType } from "@src/shared/enums/ToastType.enum";
import { useNavigate } from "react-router";
interface DeleteAccountModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const CONFIRMATION_TEXT = "delete account";

const DeleteAccountModal = ({ isOpen, onOpenChange }: DeleteAccountModalProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [deleteAccount, { isLoading }] = useDeleteProfileMutation();
  const isConfirmed = inputValue.toLowerCase() === CONFIRMATION_TEXT;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleDelete = async () => {
    try {
      if (!isConfirmed) return;
      await deleteAccount().unwrap();
      showToast("Success", "Account deleted successfully", ToastType.SUCCESS);
      onOpenChange(false);
      navigate("/home");
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) setInputValue("");
        onOpenChange(open);
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete Account</ModalHeader>
            <ModalBody>
              <p className="text-sm text-default-500">
                This action is <strong>irreversible</strong>. All your data, workouts, and settings will be permanently
                deleted.
              </p>
              <p className="text-sm text-default-500 mt-2">
                Type <strong>{CONFIRMATION_TEXT}</strong> to confirm.
              </p>
              <Input
                value={inputValue}
                onValueChange={setInputValue}
                placeholder={CONFIRMATION_TEXT}
                variant="bordered"
                autoFocus
              />
            </ModalBody>
            <ModalFooter>
              <button className="btn-primary rounded-xl px-4 py-3" onClick={onClose}>
                Cancel
              </button>
              <button
                className={`btn-danger rounded-xl px-4 py-3  ${showLoading ? "loading pe-12" : ""}`}
                disabled={!isConfirmed}
                onClick={handleDelete}>
                {showLoading ? "Deleting..." : "Delete"}
              </button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteAccountModal;
