import type { IExerciseDetail } from "@src/shared/interfaces/exerciseDb/IExerciseDetail";
import type { IApiResponse } from "../../shared/interfaces/api/IApiResponse";
import type { IBodyPart } from "../../shared/interfaces/exerciseDb/IBodyPart";
import type { IExerciseOverview } from "../../shared/interfaces/exerciseDb/IExerciseOverview";
import type { IExerciseType } from "../../shared/interfaces/exerciseDb/IExerciseType";
import type { ITargetMuscle } from "../../shared/interfaces/exerciseDb/ITargetMuscle";
import type { IExerciseQuery } from "../../shared/interfaces/query/IExercisesQuery";
import { apiSlice } from "./apiSlice";

export const exerciseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<IApiResponse<IExerciseOverview[]>, IExerciseQuery>({
      query: (params) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/exercises`,
        method: "GET",
        params,
      }),
      providesTags: ["Exercises"],
    }),
    getSingleExercise: builder.query<IApiResponse<IExerciseDetail>, { exerciseId: string }>({
      query: ({ exerciseId }) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/exercises/${exerciseId}`,
        method: "GET",
      }),
      providesTags: ["Exercises"],
    }),
    getBodyParts: builder.query<IApiResponse<IBodyPart[]>, void>({
      query: () => ({
        url: `${import.meta.env.VITE_API_PREFIX}/exercises/body-parts`,
        method: "GET",
      }),
      providesTags: ["BodyParts"],
    }),
    getTargetMuscles: builder.query<IApiResponse<ITargetMuscle[]>, void>({
      query: () => ({
        url: `${import.meta.env.VITE_API_PREFIX}/exercises/target-muscles`,
        method: "GET",
      }),
      providesTags: ["TargetMuscles"],
    }),
    getExerciseTypes: builder.query<IApiResponse<IExerciseType[]>, void>({
      query: () => ({
        url: `${import.meta.env.VITE_API_PREFIX}/exercises/types`,
        method: "GET",
      }),
      providesTags: ["ExerciseTypes"],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useGetSingleExerciseQuery,
  useGetBodyPartsQuery,
  useGetTargetMusclesQuery,
  useGetExerciseTypesQuery,
} = exerciseApi;
