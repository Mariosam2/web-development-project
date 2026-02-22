import { Clock } from "../../../../shared/ui/Clock";
import { Fire } from "../../../../shared/ui/Fire";
import { Muscle } from "../../../../shared/ui/Muscle";
import { RangeCalendar } from "@heroui/calendar";
import "./Activity.css";

export const Activity = () => {
  const workouts = [1, 1, 5, 8, 1, 1, 6];
  const getPastWeekDays = (): { date: Date; label: string }[] => {
    const today = new Date();
    const days: { date: Date; label: string }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const label = date.toLocaleDateString("it-IT", { weekday: "short" }).charAt(0).toUpperCase();
      days.push({ date, label });
    }

    return days;
  };

  return (
    <div className="activity">
      <div className="container-xl flex flex-col">
        <div className="statistic grid grid-cols-6 grid-rows-6 gap-4 h-180">
          <div className="col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2">
            <Fire size={24} />
            <span className="text-lg font-semibold">6 days streak</span>
          </div>
          <div className="col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2">
            <Muscle size={24} />
            <span className="text-lg font-semibold">12 workouts</span>
          </div>
          <div className="col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2">
            <Clock size={24} />
            <span className="text-lg font-semibold">32 hrs total</span>
          </div>
          <div className="calendar col-span-3 border border-c-gray  rounded-2xl c-shadow-md  row-span-4 ">
            <RangeCalendar
              classNames={{
                base: "w-full h-full",
                gridWrapper: "w-full h-full",
                grid: "w-full h-full",
                cell: "w-full",
              }}
              isReadOnly
              aria-label="Date (Read Only)"
            />
          </div>
          <div className="bars-chart col-span-3 border border-c-gray  rounded-2xl c-shadow-md p-4 row-span-4 flex flex-col">
            <div className="header flex items-center justify-between gap-x-12 w-full px-8 py-4">
              <h3 className="font-xl font-medium">Activity</h3>
              <div className="bg-c-yellow p-3 rounded-xl">Week</div>
            </div>
            <div className="chart w-full grow flex flex-col p-8 pb-6">
              <div className="bars grow flex items-end gap-x-4 w-full justify-between mb-2">
                {workouts.map((num, index) => (
                  <div
                    key={index}
                    className="bar flex items-center  bg-c-yellow w-10 rounded-xl"
                    style={{ height: `${num * 30}px` }}></div>
                ))}
              </div>
              <div className="week-days flex items-center gap-x-4 w-full justify-between mt-auto">
                {getPastWeekDays().map((day, index) => (
                  <span key={index} className="text-c-dark-gray font-light text-2xl w-10 text-center">
                    {day.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
