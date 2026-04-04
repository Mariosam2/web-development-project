import { SidebarContent } from "../SidebarContent/SidebarContent";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar fixed left-0 top-0 h-screen w-18 hidden xl:flex flex-col z-45 bg-white/90 backdrop-blur-xl border-r border-c-gray/15 transition-all duration-300 ease-out hover:w-56 group/sidebar overflow-hidden">
      <SidebarContent />
    </aside>
  );
};
