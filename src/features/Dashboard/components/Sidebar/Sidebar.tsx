import RobotSVG from "@assets/robot.svg";
import BoltSVG from "@assets/bolt.svg";
import ProfileSVG from "@assets/profile.svg";
import LogoutSVG from "@assets/logout.svg";
import "./Sidebar.css";
import { useLogoutMutation } from "@src/store/api/authApi";
import { NavLink } from "react-router";
import { ProfileSettingsModal } from "../ProfileSettings/ProfileSettingsModal/ProfileSettingsModal";
import { useDisclosure } from "@heroui/react";
import { useGetProfileQuery } from "@src/store/api/profileApi";
import { UserLevel } from "@src/shared/enums/UserLevel.enum";

export const Sidebar = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: profile } = useGetProfileQuery();
  const fallbaAvatarUrl = `https://ui-avatars.com/api/?name=${profile?.data.firstname + " " + profile?.data.lastname}&background=f3ff96&color=1e1e1e`;

  const levelColor = {
    [UserLevel.BEGINNER]: "#4ade80", // green
    [UserLevel.INTERMEDIATE]: "#f3ff96", // yellow
    [UserLevel.ADVANCED]: "#f97316", // orange
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <aside className="sidebar col-span-2 bg-c-dark h-screen flex flex-col">
        <div className="avatar w-88 mx-auto py-6 flex items-center">
          <img
            className="w-20 aspect-square rounded-full border border-c-dark-gray"
            src={profile?.data.imageUrl ?? fallbaAvatarUrl}
            alt="avatar"
          />
          <div className="user-info p-3">
            <div className="username text-lg text-c-light-gray font-semibold">{profile?.data.username}</div>
            {profile?.data.level && (
              <div
                className="level mt-1.5 tracking-wide uppercase text-sm "
                style={{ color: levelColor[profile?.data.level] ?? "#f3ff96" }}>
                {profile?.data.level}
              </div>
            )}
          </div>
        </div>

        <div className="actions flex flex-col items-center grow pt-12 pb-8">
          <div className="cta w-72">
            <NavLink
              to="/dashboard/activity"
              className="btn-primary w-full  rounded-2xl px-4 py-3 flex items-center justify-center">
              Activity <img className="size-6 ms-2" src={BoltSVG} alt="bolt" />
            </NavLink>
            <button className="btn-primary w-full mt-6  rounded-2xl px-4 py-3 flex items-center justify-center">
              Ask the coach <img className="size-6 ms-2" src={RobotSVG} alt="ai coach" />
            </button>
          </div>

          <div className="profile w-72 mt-auto">
            <button
              onClick={onOpen}
              className="btn-primary w-full mt-6 rounded-2xl px-4 py-3 flex items-center justify-center">
              Profile settings <img className="size-6 ms-2" src={ProfileSVG} alt="bolt" />
            </button>
            <button
              disabled={isLoading}
              onClick={handleLogout}
              className="btn-secondary w-full mt-6 rounded-2xl px-4 py-3 flex items-center justify-center">
              Logout <img className="size-6 ms-2" src={LogoutSVG} alt="ai coach" />
            </button>
          </div>
        </div>
      </aside>
      <ProfileSettingsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
