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
      className="group space-y-3 col-span-1 p-4 border h-full border-c-gray/20 rounded-3xl cursor-pointer flex flex-col bg-white/70 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-c-gray/40 hover:shadow-[0_8px_30px_rgba(30,30,30,0.1)] hover:-translate-y-1"
      onClick={() => goToDetail(workout.id as string)}>
      <h2 className="text-xl font-medium text-center wrap-break-word max-w-[calc(100%-3rem)] mx-auto line-clamp-2">
        {workout?.title}
      </h2>
      <div className="badges flex flex-wrap items-center gap-1.5 justify-center mt-auto">
        <span className="bg-c-light-gray border border-c-gray/30 text-c-dark/70 text-[11px] font-medium tracking-wide rounded-full px-3 py-1 flex items-center">
          {workout?.exerciseCount} exercises
        </span>
        <span className="bg-c-light-gray border border-c-gray/30 text-c-dark/70 text-[11px] font-medium tracking-wide rounded-full px-3 py-1 flex items-center gap-x-1.5">
          <img className="size-3.5" src={ClockSVG} alt="clock icon" />
          {formatDuration(workout?.estimatedDuration)}
        </span>
        <CompletedChip isCompleted={workout.completed} iconClassName="size-5" />
      </div>
      <div className="preview rounded-2xl overflow-hidden bg-c-gray/20 h-52 relative">
        <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent rounded-2xl z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img className="w-full block object-cover h-full rounded-2xl" src={workout.imageUrl} alt="workout preview" />
      </div>
    </div>
  );
};
