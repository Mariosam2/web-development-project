import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import type { IBodyPart } from "@src/shared/interfaces/exerciseDb/IBodyPart";
import type { ITargetMuscle } from "@src/shared/interfaces/exerciseDb/ITargetMuscle";
import { FiltersIcon } from "@src/shared/ui/FiltersIcon";
import "./WorkoutFiltersModal.css";
import { RangeCalendar, type DateValue, type RangeValue } from "@heroui/react";
import { CompletedChip } from "../CompletedChip/CompletedChip";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { resetWorkoutFilters, setEndDate, setIsCompletedParam, setStartDate } from "@src/store/slices/workoutSlice";
import { parseDate } from "@internationalized/date";
import { useEffect } from "react";
import { useMediaQuery } from "@src/shared/hooks/useMediaQuery";

interface WorkoutFiltersModalProps {
  bodyParts?: IBodyPart[];
  targetMuscles?: ITargetMuscle[];
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}
export const WorkoutFiltersModal = ({ isOpen, onOpenChange, onConfirm, title }: WorkoutFiltersModalProps) => {
  const dispatch = useAppDispatch();
  const { isCompleted, startDate, endDate } = useAppSelector((state) => state.workout);
  const isMobile = useMediaQuery("(max-width: 586px)");
  const rangeDate = startDate && endDate ? { start: parseDate(startDate), end: parseDate(endDate) } : null;

  useEffect(() => {
    console.log(isCompleted);
  }, [isCompleted]);

  const onCompletedChange = () => {
    switch (isCompleted) {
      case null:
        dispatch(setIsCompletedParam(true));
        break;
      case true:
        dispatch(setIsCompletedParam(false));
        break;
      case false:
        dispatch(setIsCompletedParam(null));
        break;
    }
  };

  const onChangeRangeDate = (value: RangeValue<DateValue>) => {
    if (value.start) {
      dispatch(setStartDate(value.start.toString()));
    }
    if (value.end) {
      dispatch(setEndDate(value.end.toString()));
    }
  };

  const onResetFilters = () => {
    dispatch(resetWorkoutFilters());
  };

  return (
    <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-x-3">
              <h2 className="text-2xl">{title}</h2>
              <FiltersIcon className="size-8" />
            </ModalHeader>
            <ModalBody>
              <div className="mx-auto flex flex-col gap-y-3">
                <CompletedChip isCompleted={isCompleted} onClick={onCompletedChange} iconClassName="size-6" />
                <div className="calendar-wrapper">
                  <RangeCalendar
                    value={rangeDate}
                    classNames={{
                      cellButton: "data-[selected=true]:data-[range-selection=true]:!text-black",
                    }}
                    onChange={onChangeRangeDate}
                    color="primary"
                    aria-label="Date (Visible Month)"
                    visibleMonths={isMobile ? 1 : 2}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-wrap xs:flex-nowrap items-center gap-3 pt-2.5">
                <button className="btn-secondary rounded-xl px-4 py-3" onClick={onResetFilters}>
                  Reset Filters
                </button>
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
