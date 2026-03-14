import { apiSlice } from "./apiSlice";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";
import type { ICompletedWorkout } from "@src/shared/interfaces/activity/ICompletedWorkouts";
import type { IStatistics } from "@src/shared/interfaces/activity/IStatistics";

export const activityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedWorkouts: builder.query<IApiResponse<ICompletedWorkout[]>, void>({
      query: () => ({
        url: `${import.meta.env.VITE_API_PREFIX}/activity/completed-workouts`,
        method: "GET",
      }),
      providesTags: ["Activity"],
    }),
    getStatistics: builder.query<IApiResponse<IStatistics>, { today: string }>({
      query: (params) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/activity/statistics`,
        method: "GET",
        params,
      }),
      providesTags: ["Activity"],
    }),
  }),
});

export const { useGetCompletedWorkoutsQuery, useGetStatisticsQuery } = activityApi;
