import { showToast } from "../../shared/helpers";
import type { ILoginRequest } from "../../shared/interfaces/auth/ILoginRequest";
import type { IRegisterRequest } from "../../shared/interfaces/auth/IRegisterRequest";
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, ILoginRequest>({
      query: (loginPayload) => ({
        url: "/auth/login",
        method: "POST",
        body: loginPayload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
        } catch (error) {
          showToast(error);
        }
      },
    }),

    register: builder.mutation<{ accessToken: string }, IRegisterRequest>({
      query: (registerPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: registerPayload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
        } catch (error) {
          showToast(error);
        }
      },
    }),

    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
        } catch (error) {
          localStorage.removeItem("accessToken");
          showToast(error);
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("accessToken");
        } catch (error) {
          showToast(error);
        }
      },
    }),
  }),
});
