import type { IMutation } from "@src/shared/interfaces/api/IMutation";
import type { IApiResponse } from "../../shared/interfaces/api/IApiResponse";
import type { IExercise } from "../../shared/interfaces/exercise/IExercise";
import type { IWorkout } from "../../shared/interfaces/workout/IWorkout";
import { apiSlice } from "./apiSlice";
import type { IWorkoutQuery } from "@src/shared/interfaces/query/IWorkoutQuery";

export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query<IApiResponse<IWorkout[]>, IWorkoutQuery>({
      query: (params) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts`,
        method: "GET",
        params: Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== null)),
      }),
      forceRefetch: () => true,
      providesTags: ["Workouts"],
    }),
    getSingleWorkout: builder.query<IApiResponse<IWorkout>, { workoutId: string }>({
      query: (params) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/${params.workoutId}`,
        method: "GET",
      }),
      providesTags: ["SingleWorkout"],
    }),

    getWorkoutExercises: builder.query<IApiResponse<IExercise[]>, { workoutId: string }>({
      query: ({ workoutId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/exercises/${workoutId}`,
        method: "GET",
      }),
      providesTags: ["WorkoutExercises"],
    }),

    addWorkout: builder.mutation<IApiResponse<IMutation>, FormData>({
      query: (formData) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/add-workout`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Workouts", "WorkoutExercises"],
    }),
    updateWorkout: builder.mutation<IApiResponse<IMutation>, FormData>({
      query: (formData) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/update-workout/${formData.get("workoutId")}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Workouts", "WorkoutExercises"],
    }),
    deleteWorkout: builder.mutation<IApiResponse<IMutation>, { workoutId: string }>({
      query: ({ workoutId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/delete-workout/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workouts", "WorkoutExercises"],
    }),

    importExercises: builder.mutation<IApiResponse<IMutation>, { workoutId: string }>({
      query: ({ workoutId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/delete-workout/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkoutExercises"],
    }),

    removeExercises: builder.mutation<IApiResponse<IMutation>, { workoutId: string; exercisesIds: string[] }>({
      query: (body) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/remove-exercises`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["WorkoutExercises", "Workouts"],
    }),
    completeWorkout: builder.mutation<IApiResponse<IMutation>, { workoutId: string }>({
      query: (params) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/complete-workout/${params.workoutId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["SingleWorkout", "Workouts"],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetSingleWorkoutQuery,
  useGetWorkoutExercisesQuery,
  useAddWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useImportExercisesMutation,
  useRemoveExercisesMutation,
  useCompleteWorkoutMutation,
} = workoutApi;
