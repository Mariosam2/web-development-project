import { ToastType } from "@src/shared/enums/ToastType.enum";
import { showToast } from "../../shared/helpers";
import { apiSlice } from "./apiSlice";
import { router } from "@src/router";
import * as z from "zod";
import type { LoginSchema } from "@src/shared/schema/LoginSchema";
import type { RegisterSchema } from "@src/shared/schema/RegisterSchema";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string },
      z.infer<typeof LoginSchema>
    >({
      query: (loginPayload) => ({
        url: "/auth/login",
        method: "POST",
        body: loginPayload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          router.navigate("/dashboard");
        } catch (error) {
          console.log(error);
          showToast(error, "Login Failed", ToastType.DANGER);
        }
      },
    }),

    register: builder.mutation<
      { accessToken: string },
      z.infer<typeof RegisterSchema>
    >({
      query: (registerPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: registerPayload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          router.navigate("/dashboard");
        } catch (error) {
          console.log(error);
          showToast(error, "Registration Failed", ToastType.DANGER);
        }
      },
    }),

    checkAuth: builder.mutation<IApiResponse<void>, void>({
      query: (registerPayload) => ({
        url: "/auth/chek-auth",
        method: "GET",
        body: registerPayload,
      }),
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
        } catch {
          localStorage.removeItem("accessToken");
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
          router.navigate("/login");
        } catch (error) {
          showToast(error, "Logout Failed", ToastType.DANGER);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useCheckAuthMutation
} = authApi;
