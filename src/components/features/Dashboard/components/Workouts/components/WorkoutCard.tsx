import WorkoutPreviewPNG from "@assets/workout-preview.png";
import ClockSVG from "@assets/clock.svg";
import "./WorkoutCard.css";

export const WorkoutCard = () => {
  return (
    <div className="col-span-1 c-shadow-md border border-c-dark-gray  p-4 rounded-4xl cursor-pointer">
      <div className="heading mb-4 text-center">
        <h2 className="text-2xl font-semibold">Workout Plan #1</h2>
        <div className="badges flex items-center gap-x-2 justify-center mt-3">
          <span className="exercises-num bg-c-gray text-xs  rounded-4xl p-2 flex">5 exercises</span>
          <span className="time bg-c-gray text-xs  rounded-2xl p-2 flex items-center gap-x-2">
            <img className="size-4" src={ClockSVG} alt="clock icon" />
            1h 30
          </span>
        </div>
      </div>
      <div className="preview rounded-2xl overflow-hidden  p-1 bg-c-gray">
        <img className="w-full block object-cover" src={WorkoutPreviewPNG} alt="workout preview" />
      </div>
    </div>
  );
};
