import "./Dashboard.css";
import { Dock } from "./components/Dock/Dock";
import { Outlet } from "react-router";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
export const Dashboard = () => {
  return (
    <div className="grid grid-cols-8 w-screen">
      <Sidebar />
      <div className="content col-span-6 h-screen flex flex-col">
        <div className="bg-white pb-8">
          <Dock />
          <Searchbar />
        </div>
        <div className="h-full overflow-y-auto pt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
