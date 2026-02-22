import type { IApiResponse } from "../../shared/interfaces/api/IApiResponse";
import type { IExercise } from "../../shared/interfaces/exercise/IExercise";
import type { IWorkout } from "../../shared/interfaces/workout/IWorkout";
import { apiSlice } from "./apiSlice";

export const workoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query<IApiResponse<IWorkout[]>, void>({
      query: () => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts`,
        method: "GET",
      }),
      providesTags: ["Workouts"],
    }),
    getWorkoutExercises: builder.query<IApiResponse<IExercise[]>, { workoutId: string }>({
      query: ({ workoutId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/exercises/${workoutId}`,
        method: "GET",
      }),
      providesTags: ["WorkoutExercises"],
    }),

    addWorkout: builder.mutation<IApiResponse<IExercise[]>, IWorkout>({
      query: (body) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/add-workout`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Workouts", "WorkoutExercises"],
    }),
    updateWorkout: builder.mutation<IApiResponse<IExercise[]>, IWorkout>({
      query: (body) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/update-workout/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Workouts", "WorkoutExercises"],
    }),
    deleteWorkout: builder.mutation<IApiResponse<IExercise[]>, { workoutId: string }>({
      query: ({ workoutId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/delete-workout/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workouts", "WorkoutExercises"],
    }),

    importExercises: builder.mutation<IApiResponse<IExercise[]>, { workoutId: string }>({
      query: ({ workoutId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/workouts/delete-workout/${workoutId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WorkoutExercises"],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetWorkoutExercisesQuery,
  useAddWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useImportExercisesMutation,
} = workoutApi;
