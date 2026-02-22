import "./Dashboard.css";
import { Dock } from "./components/Dock/Dock";
import { Outlet, useLocation } from "react-router";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Loader } from "@src/shared/ui/Loader/Loader";
import { useState } from "react";

const Dashboard = () => {
  const location = useLocation();
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  return (
    <>
      <div className="grid grid-cols-8 w-screen">
        <Sidebar />
        <div className="content col-span-6 h-screen flex flex-col">
          <div className="bg-white pb-8">
            <Dock />
            {location.pathname !== "/dashboard/activity" && <Searchbar />}
          </div>
          <div className="h-full overflow-y-auto pt-12">
            <Outlet />
          </div>
        </div>
      </div>
      {!initialLoadDone && <Loader onDone={() => setInitialLoadDone(true)} />}
    </>
  );
};

export default Dashboard;
