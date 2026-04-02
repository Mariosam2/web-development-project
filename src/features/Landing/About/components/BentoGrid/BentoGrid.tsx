import WorkoutSVG from "@assets/workout.svg";
import MuscleSVG from "@assets/muscle.svg";
import MagnifyingGlassSVG from "@assets/magnifying-glass.svg";
import ClipboardSVG from "@assets/clipboard.svg";
import RobotSVG from "@assets/robot.svg";
import "./BentoGrid.css";

export const BentoGrid = () => {
  return (
    <div className="container-lg p-4 lg:p-0 mb-32">
      <h1 className="font-gibed text-2xl sm:text-4xl lg:text-5xl pb-12 tracking-tight">Built for your workout</h1>

      <div className="bento-grid grid grid-cols-6 grid-rows-3 lg:grid-rows-2 gap-6">
        <div className="col-span-6 lg:col-span-4 row-span-1 h-full relative bg-c-dark-gray rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,30,30,0.15)] hover:-translate-y-1">
          <h3 className="text-xl">Customize your training experience</h3>
          <div className="flex flex-col sm:flex-row mt-4">
            <p className="caption sm:max-w-3/4 text-sm py-2">
              Build workouts tailored to your goals, choose from hundreds of exercises and organize them into your own
              routines. Whether you're training for strength, endurance or just staying active, ManMot adapts to your
              style and keeps everything in one place.
            </p>
            <img className="self-end sm:ms-6 lg:ms-12 size-15 lg:size-20" src={WorkoutSVG} alt="dumbell" />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1 h-full relative bg-c-dark rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,30,30,0.2)] hover:-translate-y-1">
          <h3 className="text-xl text-c-yellow">Every rep starts here</h3>
          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Log sets, reps and weights as you go. Track your completed workouts and watch your streaks grow over time.
            </p>
            <img className="ms-auto size-15 self-end" src={MuscleSVG} alt="muscle" />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1 h-full relative bg-c-dark rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,30,30,0.2)] hover:-translate-y-1">
          <h3 className="text-xl text-c-yellow">Smart search</h3>
          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Explore a vast library of exercises. Filter by muscle group, equipment or name and find exactly what you
              need in seconds.
            </p>
            <img className="ms-auto size-15 self-end" src={MagnifyingGlassSVG} alt="magnifying glass" />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1 h-full relative bg-c-dark rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,30,30,0.2)] hover:-translate-y-1">
          <h3 className="text-xl text-c-yellow">Custom plans</h3>
          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-light-gray">
              Organize your exercises into structured plans. Create weekly splits, save templates and keep your training
              consistent.
            </p>
            <img className="ms-auto size-15 self-end" src={ClipboardSVG} alt="clipboard" />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 row-span-1 h-full relative bg-c-dark-gray rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,30,30,0.15)] hover:-translate-y-1">
          <h3 className="text-xl text-c-dark">AI Coach</h3>
          <div className="flex mt-4">
            <p className="caption max-w-4/6 text-sm py-2 text-c-dark">
              Let AI generate a personalized workout for you. Tell it your goals and available equipment and get a
              ready-to-go routine in seconds.
            </p>
            <img className="ms-auto size-15 self-end" src={RobotSVG} alt="robot" />
          </div>
        </div>
      </div>
    </div>
  );
};
