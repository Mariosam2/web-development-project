import { Clock } from "../../../../shared/ui/Clock";
import { Fire } from "../../../../shared/ui/Fire";
import { Muscle } from "../../../../shared/ui/Muscle";
import { RangeCalendar, type DateValue } from "@heroui/calendar";
import "./Activity.css";
import { useGetCompletedWorkoutsQuery, useGetStatisticsQuery } from "@src/store/api/activityApi";
import { ActivitySkeleton } from "./ActivitySkeleton/ActivitySkeleton";
import { useEffect, useState } from "react";
import { formatDuration, getLocalDate } from "@src/shared/helpers";

export const Activity = () => {
  const { data: completedWorkouts, isLoading: isCompletedWorkoutsLoading } = useGetCompletedWorkoutsQuery();
  const { data: statistics, isLoading: isStatisticsLoading } = useGetStatisticsQuery({ today: getLocalDate() });
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    document.querySelector(".content")?.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isCompletedWorkoutsLoading && !isStatisticsLoading) {
      setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
    }
  }, [isCompletedWorkoutsLoading, isStatisticsLoading]);

  const normalizeDate = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const getPastWeekDays = (): { date: Date; label: string; count: number }[] => {
    const today = new Date();
    const days: { date: Date; label: string; count: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = normalizeDate(new Date(today));
      date.setDate(today.getDate() - i);
      const count =
        completedWorkouts?.data.find((w) => normalizeDate(new Date(w.date)).getTime() === date.getTime())?.count ?? 0;

      const label = date.toLocaleDateString("it-IT", { weekday: "short" }).charAt(0).toUpperCase();
      days.push({ date, label, count });
    }

    console.log(days);

    return days;
  };

  const maxCount = Math.max(...getPastWeekDays().map((d) => d.count));

  const completedDates = new Set(
    completedWorkouts?.data.map((completedWorkout) => {
      const d = new Date(completedWorkout.date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }),
  );

  const hasCompletedAWorkout = (date: DateValue) => {
    return completedDates.has(`${date.year}-${date.month}-${date.day}`);
  };

  return (
    <>
      {showSkeleton ? (
        <ActivitySkeleton />
      ) : (
        <div className="activity pt-4">
          <div className="container-xl flex flex-col px-3">
            <div className="statistic  pb-12 xl:pb-0 xl:px-0 grid grid-cols-1 sm:grid-cols-6 gap-3 md:grid-cols-6  xl:gap-4 ">
              <div className="col-span-1 sm:col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2">
                <Fire className="size-24 sm:size-20 c-tablet:size-24" />
                <span className="text-sm text-c-dark-gray tracking-wide font-medium mb-1  text-center">Streak</span>
                <span
                  className={`text-lg sm:text-base c-tablet:text-lg font-semibold ${statistics?.data.streak === 0 ? "text-c-dark-gray" : ""}`}>
                  {statistics?.data.streak === 0
                    ? "No active streak"
                    : `${statistics?.data.streak} ${statistics?.data.streak === 1 ? "day" : "days"}`}
                </span>
              </div>
              <div className="col-span-1 sm:col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2">
                <Muscle className="size-24 sm:size-20 c-tablet:size-24" />
                <span className="text-sm text-c-dark-gray tracking-wide font-medium mb-1 text-center">
                  Completed this week
                </span>
                <span
                  className={`text-lg sm:text-base c-tablet:text-lg font-semibold ${statistics?.data.workoutsCount === 0 ? "text-c-dark-gray" : ""}`}>
                  {statistics?.data.workoutsCount === 0
                    ? "No workouts yet"
                    : `${statistics?.data.workoutsCount} ${statistics?.data.workoutsCount === 1 ? "workout" : "workouts"}`}
                </span>
              </div>
              <div className="col-span-1 sm:col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2">
                <Clock className="size-24 sm:size-20 c-tablet:size-24" />
                <span className="text-sm text-c-dark-gray tracking-wide font-medium mb-1  text-center">
                  Training time this week
                </span>
                <span
                  className={`text-lg sm:text-base c-tablet:text-lg font-semibold ${statistics?.data.totalWorkoutsDuration === 0 ? "text-c-dark-gray" : ""}`}>
                  {statistics?.data.totalWorkoutsDuration === 0
                    ? "No training yet"
                    : formatDuration(statistics?.data.totalWorkoutsDuration)}
                </span>
              </div>
              <div className="calendar col-span-1 sm:col-span-6 lg:col-span-3 border border-c-gray  rounded-2xl c-shadow-md  row-span-4 h-110">
                <RangeCalendar
                  isDateUnavailable={(date) => !hasCompletedAWorkout(date)}
                  classNames={{
                    base: "w-full h-full",
                    gridWrapper: "w-full h-full",
                    grid: "w-full h-full",
                    cell: "w-full aria-disabled:[&>span]:opacity-100 [&:not([aria-disabled])>span]:bg-c-yellow [&:not([aria-disabled])>span]:rounded-full",
                  }}
                  isReadOnly
                  aria-label="Workout days"
                />
              </div>
              <div className="bars-chart col-span-1 sm:col-span-6 lg:col-span-3 border border-c-gray  rounded-2xl c-shadow-md p-0 sm:p-4 row-span-4 flex flex-col h-110">
                <div className="header flex items-center justify-between gap-x-12 w-full p-4 xl:px-8 xl:py-4">
                  <h3 className="font-xl font-medium">Activity</h3>
                  <div className="bg-c-yellow p-3 rounded-xl">Week</div>
                </div>
                <div className="chart w-full grow flex flex-col p-4 xl:p-8 pb-6">
                  <div className="bars grow flex items-end gap-x-4 w-full justify-between mb-2">
                    {getPastWeekDays().map((day, index) => (
                      <div
                        key={index}
                        className="bar flex items-center  bg-c-yellow w-10 rounded-xl shadow-sm"
                        style={{ height: day.count === 0 ? "4px" : `${(day.count / maxCount) * 100}%` }}></div>
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
      )}
    </>
  );
};
