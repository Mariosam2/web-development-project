import { addToast } from "@heroui/toast";
import { ToastType } from "./enums/ToastType.enum";

export const showToast = (title: string, message: string, color: ToastType = ToastType.SUCCESS) => {
  addToast({
    title,
    description: message,
    color,
    timeout: 3000,
    variant: "flat",
  });
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getErrorMessage = (error: unknown): string => {
  let message = "Unknown Error";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error != null) {
    if ("error" in error) {
      const inner = (error as { error: { data?: { message?: string } } }).error;
      message = inner?.data?.message ?? "Something went wrong";
    } else if ("data" in error) {
      message = (error as { data: { message?: string } }).data?.message ?? "Something went wrong";
    }
  }

  return message;
};

export const isValid = (value: unknown) => {
  return value !== null && value !== undefined && value !== 0 && value !== "";
};
