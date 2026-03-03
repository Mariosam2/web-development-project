import { Chip } from "@heroui/react";
import { Check } from "@src/shared/ui/Check";
import { Clock } from "@src/shared/ui/Clock";
import "./CompletedChip.css";

interface CompletedChipProps {
  onClick?: () => void;
  className?: string;
  isCompleted?: boolean;
  iconClassName: string;
}

export const CompletedChip = ({ onClick, isCompleted, iconClassName, className }: CompletedChipProps) => {
  return (
    <Chip
      startContent={
        <span className={`transition-transform duration-300 ${isCompleted ? "text-success-600" : "text-warning-600"}`}>
          {isCompleted ? <Check className={iconClassName} /> : <Clock className={iconClassName} />}
        </span>
      }
      variant="flat"
      classNames={{
        base: `cursor-pointer transition-colors duration-300 py-4 px-3 ${
          isCompleted ? "bg-success-50" : "bg-warning-50"
        } ${className}`,
        content: `transition-colors duration-300 text-sm font-semibold ${
          isCompleted ? "text-success-600" : "text-warning-600"
        }`,
      }}
      onClick={onClick}>
      {isCompleted ? "Completed" : "Pending"}
    </Chip>
  );
};
