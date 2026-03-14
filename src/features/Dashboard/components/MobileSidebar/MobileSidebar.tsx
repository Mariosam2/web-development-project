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
        className={`fixed inset-0  z-40 bg-c-dark/40 transition-opacity xl:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 h-screen w-80 sidebar bg-white  z-50 flex flex-col
          transition-transform duration-300 xl:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <AnimatedCloseButton
          isActive={isOpen}
          onClick={onClose}
          className="absolute text-c-dark top-2 left-2 w-8 h-8"
        />

        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
};
