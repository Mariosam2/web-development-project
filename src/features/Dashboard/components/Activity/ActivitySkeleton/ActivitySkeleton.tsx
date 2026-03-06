import "./ActivitySkeleton.css";

export const ActivitySkeleton = () => {
  return (
    <div className="activity">
      <div className="container-xl flex flex-col">
        <div className="statistic grid grid-cols-6 grid-rows-6 gap-4 h-180">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="col-span-2 border border-c-gray grid place-items-center rounded-2xl c-shadow-md p-4 row-span-2 gap-3">
              <div className="size-24 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-5 w-32 rounded-lg bg-gray-200 animate-pulse" />
            </div>
          ))}

          <div className="calendar col-span-3 border border-c-gray rounded-2xl c-shadow-md row-span-4 p-4 flex flex-col gap-3">
            <div className="h-5 w-24 rounded-lg bg-gray-200 animate-pulse" />
            <div className="grid grid-cols-7 gap-2 grow">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>

          <div className="bars-chart col-span-3 border border-c-gray rounded-2xl c-shadow-md p-4 row-span-4 flex flex-col">
            <div className="header flex items-center justify-between gap-x-12 w-full px-8 py-4">
              <div className="h-5 w-20 rounded-lg bg-gray-200 animate-pulse" />
              <div className="h-10 w-16 rounded-xl bg-gray-200 animate-pulse" />
            </div>
            <div className="chart w-full grow flex flex-col p-8 pb-6">
              <div className="bars grow flex items-end gap-x-4 w-full justify-between mb-2">
                {[40, 70, 50, 90, 30, 60, 80].map((h, i) => (
                  <div key={i} className="w-10 rounded-xl bg-gray-200 animate-pulse" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex items-center gap-x-4 w-full justify-between mt-auto">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-6 w-10 rounded-md bg-gray-200 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
