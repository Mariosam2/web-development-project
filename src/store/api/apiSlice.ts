import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { router } from "../../router";

interface RefreshResponse {
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const url = typeof args === "string" ? args : args.url;
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !url.startsWith("/auth")) {
    const refreshResult = await baseQuery("/auth/refresh-token", api, extraOptions);
    if (refreshResult.meta?.response?.status === 200) {
      localStorage.setItem("accessToken", (refreshResult.data as RefreshResponse).accessToken);
      return baseQuery(args, api, extraOptions);
    }
    localStorage.removeItem("accessToken");
    router.navigate("/login");

    return result;
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryAuth,
  endpoints: () => ({}),
  tagTypes: ["Workouts", "WorkoutExercises", "Exercises", "BodyParts", "TargetMuscles", "ExerciseTypes"],
});
