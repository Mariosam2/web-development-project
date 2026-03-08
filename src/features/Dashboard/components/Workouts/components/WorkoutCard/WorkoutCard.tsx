import ClockSVG from "@assets/clock.svg";
import "./WorkoutCard.css";
import type { ICardProps } from "@src/shared/interfaces/props/ICardProps";
import type { IWorkout } from "@src/shared/interfaces/workout/IWorkout";
import { useNavigate } from "react-router";
import { CompletedChip } from "../CompletedChip/CompletedChip";
import { formatDuration } from "@src/shared/helpers";

interface WorkoutCardProps extends ICardProps {
  workout: IWorkout;
}

export const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const navigate = useNavigate();

  const goToDetail = (workoutId: string) => {
    navigate(`/dashboard/workouts/${workoutId}`);
  };

  return (
    <div
      className="space-y-4 col-span-1 p-3 c-shadow-md border h-full border-c-dark-gray rounded-2xl cursor-pointer flex flex-col bg-c-light-gray relative"
      onClick={() => goToDetail(workout.id as string)}>
      <h2 className="text-2xl font-semibold text-center wrap-break-word max-w-[calc(100%-5rem)] mx-auto line-clamp-2">
        {workout?.title}
      </h2>
      <div className="badges flex items-center gap-x-2 justify-center">
        <span className="exercises-num bg-c-gray text-xs rounded-4xl p-2 flex">{workout?.exerciseCount} exercises</span>
        <span className="time bg-c-gray text-xs rounded-2xl p-2 flex items-center gap-x-2">
          <img className="size-4" src={ClockSVG} alt="clock icon" />
          {formatDuration(workout?.estimatedDuration)}
        </span>
        <CompletedChip isCompleted={workout.completed} iconClassName="size-6" />
      </div>
      <div className="preview rounded-4xl overflow-hidden p-1 bg-c-gray h-57 mt-auto">
        <img className="w-full block object-cover h-full rounded-4xl" src={workout.imageUrl} alt="workout preview" />
      </div>
    </div>
  );
};
