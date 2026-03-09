import "./Dashboard.css";
import { Dock } from "./components/Dock/Dock";
import { Outlet, useMatch } from "react-router";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Loader } from "@src/shared/ui/Loader/Loader";
import { useRef, useState } from "react";
import { AuthGuard } from "@src/shared/guards/AuthGuard";

const Dashboard = () => {
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const isWorkoutDetail = useMatch("/dashboard/workouts/:workoutId");
  const isActivity = useMatch("/dashboard/activity");
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <AuthGuard>
      <>
        <div className="grid grid-cols-8 w-screen">
          <Sidebar />
          <div className="content col-span-8  xl:col-span-6 h-screen flex flex-col relative">
            <div className="bg-white pb-8 px-3">
              <Dock />
              {!isWorkoutDetail && !isActivity && <Searchbar />}
            </div>

            <div ref={scrollRef} className={`h-full overflow-y-auto ${isWorkoutDetail ? "mt-48" : "mt-12"}`}>
              <Outlet context={{ scrollRef }} />
            </div>
          </div>
        </div>
        {!initialLoadDone && <Loader onDone={() => setInitialLoadDone(true)} />}
      </>
    </AuthGuard>
  );
};

export default Dashboard;
