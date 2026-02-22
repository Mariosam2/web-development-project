import PreviewPNG from "@assets/preview.png";
import ClockSVG from "@assets/clock.svg";
import "./WorkoutCard.css";
import type { ICardProps } from "@src/shared/interfaces/props/ICardProps";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";
import { Skeleton } from "@heroui/skeleton";

interface WorkoutCardProps extends ICardProps {
  workout: IWorkout;
}

export const WorkoutCard = ({ isLoading, workout }: WorkoutCardProps) => {
  return (
    <>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="rounded-lg w-48 h-8 mx-auto" />

          <div className="flex items-center gap-x-2 justify-center">
            <Skeleton className="rounded-2xl w-24 h-8" />
            <Skeleton className="rounded-2xl w-20 h-8" />
          </div>

          <Skeleton className="rounded-2xl w-full h-48" />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">{workout.title}</h2>
          <div className="badges flex items-center gap-x-2 justify-center mt-3">
            <span className="exercises-num bg-c-gray text-xs rounded-4xl p-2 flex">
              {workout.exercises.length} exercises
            </span>
            <span className="time bg-c-gray text-xs rounded-2xl p-2 flex items-center gap-x-2">
              <img className="size-4" src={ClockSVG} alt="clock icon" />
              {workout.estimatedDuration}
            </span>
          </div>
          <div className="preview rounded-2xl overflow-hidden p-1 bg-c-gray">
            <img className="w-full block object-cover" src={PreviewPNG} alt="workout preview" />
          </div>
        </>
      )}
    </>
  );
};
