import { useDisclosure } from "@heroui/react";
import { UserLevel } from "@src/shared/enums/UserLevel.enum";
import { useLogoutMutation } from "@src/store/api/authApi";
import { useGetProfileQuery } from "@src/store/api/profileApi";
import { NavLink } from "react-router";
import RobotSVG from "@assets/robot.svg";
import BoltSVG from "@assets/bolt.svg";
import ProfileSVG from "@assets/profile.svg";
import LogoutSVG from "@assets/logout.svg";
import { ProfileSettingsModal } from "../ProfileSettings/ProfileSettingsModal/ProfileSettingsModal";
import "./SidebarContent.css";
import { GenerateWorkoutModal } from "../Workouts/components/GenerateWorkoutModal/GenerateWorkoutModal";

interface SidebarContentProps {
  onClose?: () => void;
}

export const SidebarContent = ({ onClose }: SidebarContentProps) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const profileSettingsModal = useDisclosure();
  const generateWorkoutModal = useDisclosure();
  const { data: profile } = useGetProfileQuery();
  const fallbaAvatarUrl = `https://ui-avatars.com/api/?name=${profile?.data.firstname + " " + profile?.data.lastname}&background=f3ff96&color=1e1e1e`;

  const levelColor = {
    [UserLevel.BEGINNER]: "#4ade80",
    [UserLevel.INTERMEDIATE]: "#f3ff96",
    [UserLevel.ADVANCED]: "#f97316",
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="avatar w-72 mx-auto py-3 xl:py-6 flex items-center mt-12 xl:mt-0">
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
            onClick={onClose}
            to="/dashboard/activity"
            className="btn-primary w-full  rounded-2xl px-4 py-3 flex items-center justify-center">
            Activity <img className="size-6 ms-2" src={BoltSVG} alt="bolt" />
          </NavLink>
          <button
            onClick={generateWorkoutModal.onOpen}
            className="btn-primary w-full mt-6  rounded-2xl px-4 py-3 flex items-center justify-center">
            Ask the coach <img className="size-6 ms-2" src={RobotSVG} alt="ai coach" />
          </button>
        </div>

        <div className="profile w-72 mt-auto">
          <button
            onClick={profileSettingsModal.onOpen}
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
      <ProfileSettingsModal isOpen={profileSettingsModal.isOpen} onOpenChange={profileSettingsModal.onOpenChange} />
      <GenerateWorkoutModal isOpen={generateWorkoutModal.isOpen} onOpenChange={generateWorkoutModal.onOpenChange} />
    </>
  );
};
