import { Check } from "@src/shared/ui/Check";
import { Clock } from "@src/shared/ui/Clock";
import "./CompletedChip.css";
import { Minus } from "@src/shared/ui/Minus";

interface CompletedChipProps {
  onClick?: () => void;
  className?: string;
  isCompleted: boolean | null;
  iconClassName: string;
}

export const CompletedChip = ({ onClick, isCompleted, iconClassName, className }: CompletedChipProps) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-colors duration-300 flex items-center gap-1 px-3 py-1 max-w-fit rounded-full ${
        isCompleted === null
          ? "bg-purple-50 text-purple-600"
          : isCompleted
            ? "bg-success-50 text-success-600"
            : "bg-warning-50 text-warning-600"
      } ${className}`}>
      {isCompleted === null ? (
        <Minus className={iconClassName} />
      ) : isCompleted ? (
        <Check className={iconClassName} />
      ) : (
        <Clock className={iconClassName} />
      )}
      <span className="text-sm font-semibold">
        {isCompleted === null ? "All" : isCompleted ? "Completed" : "Pending"}
      </span>
    </div>
  );
};
