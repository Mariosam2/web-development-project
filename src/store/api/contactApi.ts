import { apiSlice } from "./apiSlice";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";
import type { ContactFormType } from "@src/shared/types";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation<IApiResponse<void>, ContactFormType>({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useContactMutation } = contactApi;
