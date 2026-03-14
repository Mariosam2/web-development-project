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
      <div className="flex items-center mt-8">
        <div className="max-w-96  dock w-full rounded-3xl lg:rounded-4xl bg-c-light-gray   text-c-dark  mx-auto flex items-center  ps-3 md:ps-5  border border-c-dark-gray c-shadow-md">
          <BurgerIcon onClick={openMobileSidebar} className="size-6 xs:size-8 block xl:hidden me-4 cursor-pointer" />
          <img className="size-8 me-2.5 xl:me-0 " src={LogoIconSVG} alt="logo icon" />
          <div className="relative w-72 ms-auto h-14 flex items-center">
            <div
              className={`absolute h-full w-1/2 bg-c-gray rounded-3xl lg:rounded-4xl  transition-all duration-300  z-10 ease-elastic ${
                location.pathname === "/dashboard/exercises"
                  ? "translate-x-full opacity-100"
                  : location.pathname.includes("workouts") || location.pathname === "/dashboard"
                    ? "translate-x-0 opacity-100"
                    : "opacity-0"
              }`}
            />
            <NavLink
              to="/dashboard/workouts"
              className="sign-in relative text-sm xs:text-base  w-1/2 z-20 p-2  xs:p-3  text-center rounded-xl xs:rounded-2xl cursor-pointer">
              My Workouts
            </NavLink>
            <NavLink
              to="/dashboard/exercises"
              className="sign-up  relative text-sm xs:text-base   w-1/2  z-20 p-2 xs:p-3   text-center rounded-xl xs:rounded-2xl cursor-pointer">
              Exercises
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
