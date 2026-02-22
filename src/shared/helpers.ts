import { addToast } from "@heroui/toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ToastType } from "./enums/ToastType.enum";
import type { IApiResponse } from "./interfaces/api/IApiResponse";

interface FetchBaseQueryErrorWrapper {
  error: FetchBaseQueryError;
  meta?: unknown;
  isUnhandledError: boolean;
}

const isFetchBaseQueryErrorWrapper = (err: unknown): err is FetchBaseQueryErrorWrapper => {
  return (
    typeof err === "object" &&
    err != null &&
    "error" in err &&
    typeof (err as FetchBaseQueryErrorWrapper).error === "object" &&
    (err as FetchBaseQueryErrorWrapper).error != null &&
    "status" in (err as FetchBaseQueryErrorWrapper).error
  );
};

export const showToast = (error: unknown, title: string, color: ToastType = ToastType.SUCCESS) => {
  let message = "Connection Error";

  if (error instanceof Error) {
    message = error.message;
  } else if (isFetchBaseQueryErrorWrapper(error)) {
    const { error: fetchBaseError } = error;
    if (typeof fetchBaseError.status === "number") {
      message = (fetchBaseError.data as { message?: string })?.message ?? `Errore ${fetchBaseError.status}`;
    } else if ("error" in fetchBaseError) {
      message = fetchBaseError.error;
    }
  }

  addToast({
    title,
    description: message,
    color,
    timeout: 3000,
    variant: "flat",
  });
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getErrorMessage = (error: FetchBaseQueryError): string => {
  if (error.data && typeof error.data === "object") {
    const data = error.data as IApiResponse<void>;
    return data.message || "Something went wrong";
  }
  return "Something went wrong";
};
