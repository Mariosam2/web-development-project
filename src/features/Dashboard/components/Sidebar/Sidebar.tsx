import RobotSVG from "@assets/robot.svg";
import BoltSVG from "@assets/bolt.svg";
import ProfileSVG from "@assets/profile.svg";
import LogoutSVG from "@assets/logout.svg";
import AvatarPNG from "@assets/avatar.png";
import "./Sidebar.css";
import { useLogoutMutation } from "@src/store/api/authApi";
import { NavLink } from "react-router";

export const Sidebar = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="sidebar col-span-2 bg-c-dark h-screen flex flex-col">
      <div className="avatar py-6 ps-8 flex items-center">
        <img className="w-32 aspect-square" src={AvatarPNG} alt="avatar" />
        <div className="user-info p-3 space-y-1.5">
          <div className="username text-2xl text-c-light-gray font-semibold">Mariosam</div>
          <div className="level text-c-yellow">Intermediate</div>
        </div>
      </div>

      <div className="actions flex flex-col items-center grow pt-12 pb-8">
        <div className="cta w-72">
          <NavLink
            to="/dashboard/activity"
            className="btn-primary w-full  rounded-2xl px-4 py-3 flex items-center justify-center">
            Activity <img className="size-6 ms-2" src={BoltSVG} alt="bolt" />
          </NavLink>
          <div className="btn-primary w-full mt-6  rounded-2xl px-4 py-3 flex items-center justify-center">
            Ask the coach <img className="size-6 ms-2" src={RobotSVG} alt="ai coach" />
          </div>
        </div>

        <div className="profile w-72 mt-auto">
          <div className="btn-primary w-full mt-6 rounded-2xl px-4 py-3 flex items-center justify-center">
            Profile settings <img className="size-6 ms-2" src={ProfileSVG} alt="bolt" />
          </div>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className="btn-secondary w-full mt-6 rounded-2xl px-4 py-3 flex items-center justify-center">
            Logout <img className="size-6 ms-2" src={LogoutSVG} alt="ai coach" />
          </button>
        </div>
      </div>
    </aside>
  );
};
