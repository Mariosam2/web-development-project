import { NavLink, useLocation } from "react-router";
import "./AuthDock.css";
export const AuthDock = () => {
  const location = useLocation();

  const isSignup = location.pathname === "/signup";

  return (
    <>
      <div className="container-xs  relative dock w-full rounded-2xl bg-c-gray  c-shadow-md text-c-dark grid grid-cols-2 ">
        <div
          className={`absolute h-full w-1/2 bg-c-light-gray rounded-xl border border-c-dark-gray transition-transform duration-300 ease-in-out z-10 ease-elastic ${
            isSignup ? "translate-x-full" : "translate-x-0"
          }`}
        />
        <NavLink to="/login" className="sign-in relative z-20  p-2.5  text-lg text-center rounded-2xl cursor-pointer">
          Login
        </NavLink>
        <NavLink to="/signup" className="sign-up  relative z-20 p-2.5  text-lg text-center rounded-2xl cursor-pointer">
          Signup
        </NavLink>
      </div>
    </>
  );
};
