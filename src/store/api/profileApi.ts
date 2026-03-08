import { apiSlice } from "./apiSlice";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";
import type { IMutation } from "@src/shared/interfaces/api/IMutation";
import type { IProfile } from "@src/shared/interfaces/profile/IProfile";

export const profileAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IApiResponse<IProfile>, void>({
      query: () => ({
        url: `${import.meta.env.VITE_API_PREFIX}/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<IApiResponse<IMutation>, FormData>({
      query: (payload) => ({
        url: `${import.meta.env.VITE_API_PREFIX}/profile/update`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileAPi;
