import Logo from "@assets/logo.svg";
import LogoIcon from "@assets/logo-icon.svg";
import Hero from "@assets/hero.jpg";
import { NavLink, Outlet } from "react-router";
import { AuthDock } from "../AuthDock/AuthDock";
import "./AuthLayout.css";
import { NoAuthGuard } from "@src/shared/guards/NoAuthGuard";

export const AuthLayout = () => {
  return (
    <NoAuthGuard>
      <>
        <div className="w-screen min-h-screen grid grid-cols-7">
          <div className="col-span-7 lg:col-span-4 h-full grid ">
            <NavLink className="hidden lg:block justify-self-start p-3 mb-8" to="/">
              <img id="logo" className="mb-h" width={200} height={120} src={Logo} alt="logo" />
            </NavLink>
            <div className="auth-form container-xs p-4  lg:p-0  lg:pb-4">
              <NavLink to="/">
                <img
                  id="logo-icon"
                  className="relative py-4 mb-6 mx-auto lg:hidden"
                  width={120}
                  height={120}
                  src={LogoIcon}
                  alt="logo icon"
                />
              </NavLink>
              <AuthDock />
              <Outlet />
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-3 relative">
            <NavLink to="/">
              <img
                id="logo-icon"
                className="hiddem lg:block py-4 mb-6 absolute top-4 right-4 z-30"
                width={120}
                height={120}
                src={LogoIcon}
                alt="logo icon"
              />
            </NavLink>
            <img className="w-full h-full object-cover relative z-10" src={Hero} alt="" />
            <div className="layover z-20"></div>
          </div>
        </div>
      </>
    </NoAuthGuard>
  );
};
