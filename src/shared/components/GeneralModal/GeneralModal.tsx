import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import "./GeneralModal.css";
import { capitalize } from "@src/shared/helpers";
import { useEffect, useState } from "react";
import type { ModalAction } from "@src/shared/enums/ModalActions.enum";
interface GeneralModalProps {
  action: ModalAction;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}
export const GeneralModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading,
  title,
  message,
  action,
}: GeneralModalProps) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowLoading(true), 0);
    } else {
      timer = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <Modal isOpen={isOpen} size="xs" backdrop="opaque" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">{title}</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>

            <ModalFooter>
              <div className="flex items-center gap-x-3 pt-2.5">
                <button disabled={showLoading} className="btn-primary rounded-xl px-4 py-3" onClick={onClose}>
                  Close
                </button>
                <button
                  className={`btn-secondary rounded-xl px-4 py-3 ${showLoading ? "loading pe-12" : ""}`}
                  onClick={onConfirm}>
                  {showLoading ? "Loading..." : capitalize(action)}
                </button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
