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

  return (
    <AuthGuard>
      <>
        <div className="w-full min-h-screen bg-[#fafafa]">
          <Sidebar />
          <MobileSidebar isOpen={mobileSidebar.isOpen} onClose={mobileSidebar.onClose} />
          <div className="content xl:ml-18 h-screen flex flex-col relative overflow-y-auto">
            <div className="bg-white/90 backdrop-blur-md py-3 px-4 sm:px-6 sticky top-0 z-30 border-b border-c-gray/15 flex flex-wrap items-center gap-3">
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
