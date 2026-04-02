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
import DeleteAccountModal from "../ProfileSettings/DeleteAccountModal/DeleteAccountModal";

interface SidebarContentProps {
  onClose?: () => void;
}

export const SidebarContent = ({ onClose }: SidebarContentProps) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const profileSettingsModal = useDisclosure();
  const deleteAccountModal = useDisclosure();
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
      {/* Avatar section */}
      <div className="flex flex-col items-center pt-5 pb-4 border-b border-c-gray/15 px-3">
        <img
          className="w-10 h-10 rounded-full border-2 border-c-yellow/60 shadow-[0_0_12px_rgba(243,255,150,0.15)] shrink-0"
          src={profile?.data.imageUrl ?? fallbaAvatarUrl}
          alt="avatar"
        />
        <div className="user-details mt-2 text-center whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200">
          <div className="text-sm text-c-dark font-semibold truncate max-w-44">{profile?.data.username}</div>
          {profile?.data.level && (
            <div
              className={`mt-1 tracking-wide uppercase text-[10px] border px-2 py-0.5 rounded-full text-center inline-block ${levelBadges[profile.data.level].bg} ${levelBadges[profile.data.level].text} ${levelBadges[profile.data.level].border}`}>
              {profile?.data.level}
            </div>
          )}
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex flex-col gap-1 pt-4 px-2.5 grow">
        <NavLink
          onClick={onClose}
          to="/dashboard/activity"
          className="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-c-light-gray transition-all duration-200 text-c-dark/70 hover:text-c-dark">
          <img className="size-5 shrink-0" src={BoltSVG} alt="activity" />
          <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200">Activity</span>
        </NavLink>
        <button
          onClick={generateWorkoutModal.onOpen}
          className="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-c-light-gray transition-all duration-200 text-c-dark/70 hover:text-c-dark cursor-pointer">
          <img className="size-5 shrink-0" src={RobotSVG} alt="ai coach" />
          <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200">Ask the coach</span>
        </button>

        {/* Bottom section */}
        <div className="mt-auto flex flex-col gap-1 pb-6">
          <button
            onClick={profileSettingsModal.onOpen}
            className="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-c-light-gray transition-all duration-200 text-c-dark/70 hover:text-c-dark cursor-pointer">
            <img className="size-5 shrink-0" src={ProfileSVG} alt="profile" />
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200">Profile</span>
          </button>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className="sidebar-item group/logout flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer disabled:opacity-50">
            <img className="size-5 shrink-0 opacity-40 transition-all duration-200 group-hover/logout:opacity-100 group-hover/logout:filter-[brightness(0)_saturate(100%)_invert(28%)_sepia(95%)_saturate(5735%)_hue-rotate(352deg)_brightness(99%)_contrast(94%)]" src={LogoutSVG} alt="logout" />
            <span className="text-sm font-medium whitespace-nowrap text-c-dark-gray group-hover/logout:text-red-500 transition-colors duration-200 opacity-0 group-hover/sidebar:opacity-100">Logout</span>
          </button>
        </div>
      </nav>

      <ProfileSettingsModal
        isOpen={profileSettingsModal.isOpen}
        onOpenDeletAccountModal={deleteAccountModal.onOpenChange}
        onOpenChange={profileSettingsModal.onOpenChange}
      />
      <DeleteAccountModal isOpen={deleteAccountModal.isOpen} onOpenChange={deleteAccountModal.onOpenChange} />
      <GenerateWorkoutModal
        isOpen={generateWorkoutModal.isOpen}
        onOpenChange={generateWorkoutModal.onOpenChange}
        closeSidebar={onClose}
      />
    </>
  );
};
