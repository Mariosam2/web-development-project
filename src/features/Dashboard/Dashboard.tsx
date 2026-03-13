import "./Dashboard.css";
import { Dock } from "./components/Dock/Dock";
import { Outlet, useMatch } from "react-router";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Loader } from "@src/shared/ui/Loader/Loader";
import { useRef, useState } from "react";
import { AuthGuard } from "@src/shared/guards/AuthGuard";
import { useDisclosure } from "@heroui/react";
import { MobileSidebar } from "./components/MobileSidebar/MobileSidebar";

const Dashboard = () => {
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const isWorkoutDetail = useMatch("/dashboard/workouts/:workoutId");
  const isActivity = useMatch("/dashboard/activity");
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileSidebar = useDisclosure();
  //${isWorkoutDetail ? "mt-95 c-sm-2:mt-105 c-tablet:mt-66 lg:mt-48" : isExercises ? "mt-26 c-sm:mt-12" : "mt-4"}
  return (
    <AuthGuard>
      <>
        <div className="grid grid-cols-8 w-full">
          <Sidebar />
          <MobileSidebar isOpen={mobileSidebar.isOpen} onClose={mobileSidebar.onClose} />
          <div className="content col-span-8  xl:col-span-6 h-screen flex flex-col relative overflow-y-auto">
            <div className="bg-white pb-4 px-2.5 sticky top-0 z-30 ">
              <Dock openMobileSidebar={mobileSidebar.onOpen} />
              {!isWorkoutDetail && !isActivity && <Searchbar />}
            </div>

            <Outlet context={{ scrollRef }} />
          </div>
        </div>
        {!initialLoadDone && <Loader onDone={() => setInitialLoadDone(true)} />}
      </>
    </AuthGuard>
  );
};

export default Dashboard;
