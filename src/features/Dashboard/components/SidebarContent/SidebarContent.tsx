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

  const levelBadges = {
    [UserLevel.BEGINNER]: {
      bg: "bg-success-50",
      text: "text-success-600",
      border: "border-success-200",
    },
    [UserLevel.INTERMEDIATE]: {
      bg: "bg-c-yellow-100",
      text: "text-c-yellow-950",
      border: "border-c-yellow-600",
    },
    [UserLevel.ADVANCED]: {
      bg: "bg-warning-50",
      text: "text-warning-600",
      border: "border-warning-200",
    },
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="avatar w-full pb-3 pt-8  xl:pb-6 xl:pt-6 flex items-center justify-center  bg-c-light-gray  border border-c-gray">
        <img
          className="w-20 aspect-square rounded-full border border-c-dark-gray"
          src={profile?.data.imageUrl ?? fallbaAvatarUrl}
          alt="avatar"
        />
        <div className="user-info p-3">
          <div className="username text-lg text-c-dark font-semibold">{profile?.data.username}</div>
          {profile?.data.level && (
            <div
              className={`level mt-1.5 tracking-wide uppercase text-sm border px-3 py-1.5 rounded-2xl text-center ${levelBadges[profile.data.level].bg} ${levelBadges[profile.data.level].text} ${levelBadges[profile.data.level].border}`}>
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
            className="btn-secondary w-full mt-6 mb-22 sm:mb:0 rounded-2xl px-4 py-3 flex items-center justify-center">
            Logout <img className="size-6 ms-2" src={LogoutSVG} alt="ai coach" />
          </button>
        </div>
      </div>
      <ProfileSettingsModal isOpen={profileSettingsModal.isOpen} onOpenChange={profileSettingsModal.onOpenChange} />
      <GenerateWorkoutModal
        isOpen={generateWorkoutModal.isOpen}
        onOpenChange={generateWorkoutModal.onOpenChange}
        closeSidebar={onClose}
      />
    </>
  );
};
