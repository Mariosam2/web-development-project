import { addToast } from "@heroui/toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === "object" && error != null && "status" in error;
};

export const showToast = (error: unknown) => {
  let message = "Errore sconosciuto";

  if (isFetchBaseQueryError(error)) {
    message = typeof error.data === "string" ? error.data : JSON.stringify(error.data);
  } else if (error instanceof Error) {
    message = error.message;
  }

  addToast({
    title: "Logout fallito",
    description: message,
    color: "danger",
    timeout: 5000,
    variant: "solid",
  });
};
