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
        <div className="w-screen h-screen grid grid-cols-7">
          <div className="col-span-4 h-full grid place-items-center">
            <div className="auth-form container-xs">
              <AuthDock />
              <Outlet />
            </div>
          </div>
          <div className="col-span-3 relative">
            <img className="w-full h-full object-cover relative z-10" src={Hero} alt="" />
            <div className="layover z-20"></div>
          </div>
        </div>
        <NavLink to="/">
          <img
            id="logo-icon"
            className="fixed right-4 top-4 z-30"
            width={120}
            height={120}
            src={LogoIcon}
            alt="logo icon"
          />
        </NavLink>
        <NavLink to="/">
          <img id="logo" className="fixed left-4 top-4 z-30" width={200} height={120} src={Logo} alt="logo" />
        </NavLink>
      </>
    </NoAuthGuard>
  );
};
