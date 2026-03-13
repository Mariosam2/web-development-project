import { SidebarContent } from "../SidebarContent/SidebarContent";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <>
      <aside className="sidebar col-span-2 h-screen hidden xl:flex xl:flex-col ">
        <SidebarContent />
      </aside>
    </>
  );
};
