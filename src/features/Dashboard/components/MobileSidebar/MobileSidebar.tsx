import { AnimatedCloseButton } from "@src/shared/ui/AnimatedCloseButton";
import { SidebarContent } from "../SidebarContent/SidebarContent";
import "./MobileSidebar.css";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-c-dark/30 backdrop-blur-sm transition-opacity xl:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-screen w-72 sidebar bg-white/95 backdrop-blur-xl z-50 flex flex-col
          transition-transform duration-300 xl:hidden shadow-[4px_0_30px_rgba(0,0,0,0.08)] group/sidebar sidebar-mobile
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <AnimatedCloseButton
          isActive={isOpen}
          onClick={onClose}
          className="absolute text-c-dark-gray hover:text-c-dark transition-colors top-2 left-2 w-8 h-8"
        />

        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
};
