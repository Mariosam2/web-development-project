import { NavLink, useLocation } from "react-router";
import LogoIconSVG from "@assets/logo-icon.svg";
import "./Dock.css";
import { BurgerIcon } from "@src/shared/ui/BurgerIcon";

interface DockProps {
  openMobileSidebar: () => void;
}

export const Dock = ({ openMobileSidebar }: DockProps) => {
  const location = useLocation();
  return (
    <>
      <div className="flex items-center shrink-0">
        <div className="dock w-auto rounded-2xl bg-white/80 backdrop-blur-xl text-c-dark flex items-center ps-3 md:ps-4 border border-c-gray/15 c-shadow-premium">
          <button
            onClick={openMobileSidebar}
            onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
            onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            className="grid place-items-center xl:hidden me-4 cursor-pointer transition-transform duration-150 ease-c-elastic">
            <BurgerIcon className="size-6 xs:size-8" />
          </button>
          <img className="size-8 me-2.5" src={LogoIconSVG} alt="logo icon me-1.5" />
          <div className="relative w-48 xs:w-56 sm:w-64 ms-auto h-11 flex items-center">
            <div
              className={`absolute h-full w-1/2 bg-c-yellow/30 rounded-2xl transition-all duration-300 z-10 ease-elastic ${
                location.pathname === "/dashboard/exercises"
                  ? "translate-x-full opacity-100"
                  : location.pathname.includes("workouts") || location.pathname === "/dashboard"
                    ? "translate-x-0 opacity-100"
                    : "opacity-0"
              }`}
            />
            <NavLink
              to="/dashboard/workouts"
              className="relative text-xs xs:text-sm w-1/2 z-20 p-1.5 xs:p-2 sm:p-3 text-center rounded-xl cursor-pointer text-c-dark/60 hover:text-c-dark transition-colors duration-200 font-medium whitespace-nowrap">
              My Workouts
            </NavLink>
            <NavLink
              to="/dashboard/exercises"
              className="relative text-xs xs:text-sm w-1/2 z-20 p-1.5 xs:p-2 sm:p-3 text-center rounded-xl cursor-pointer text-c-dark/60 hover:text-c-dark transition-colors duration-200 font-medium whitespace-nowrap">
              Exercises
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
