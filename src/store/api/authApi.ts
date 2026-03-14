import { ToastType } from "@src/shared/enums/ToastType.enum";
import { getErrorMessage, showToast } from "../../shared/helpers";
import { apiSlice } from "./apiSlice";
import { router } from "@src/router";
import * as z from "zod";
import type { LoginSchema } from "@src/shared/schema/LoginSchema";
import type { RegisterSchema } from "@src/shared/schema/RegisterSchema";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, z.infer<typeof LoginSchema>>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          router.navigate("/dashboard");
        } catch (error) {
          console.log(error);
          const message = getErrorMessage(error);
          showToast("Login Failed", message, ToastType.DANGER);
        }
      },
    }),

    register: builder.mutation<{ accessToken: string }, z.infer<typeof RegisterSchema>>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
          router.navigate("/dashboard");
        } catch (error) {
          console.log(error);
          const message = getErrorMessage(error);
          showToast("Registration Failed", message, ToastType.DANGER);
        }
      },
    }),

    checkAuth: builder.mutation<IApiResponse<void>, void>({
      query: (payload) => ({
        url: "/auth/check-auth",
        method: "GET",
        body: payload,
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
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("accessToken");
          router.navigate("/login");
        } catch (error) {
          const message = getErrorMessage(error);
          showToast("Logout Failed", message, ToastType.DANGER);
        }
      },
    }),
    forgotPassword: builder.mutation<IApiResponse<void>, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast("Email Sent", "Please check your inbox", ToastType.SUCCESS);
        } catch (error) {
          const message = getErrorMessage(error);
          showToast("Error while sending email", message, ToastType.DANGER);
        }
      },
    }),
    resetPassword: builder.mutation<IApiResponse<void>, { token: string; password: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          showToast("Password Reset", "Your password was reset successfully", ToastType.SUCCESS);
        } catch (error) {
          const message = getErrorMessage(error);
          showToast("Error while resetting your password", message, ToastType.DANGER);
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
  useCheckAuthMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
