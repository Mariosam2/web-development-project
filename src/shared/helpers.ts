import { addToast } from "@heroui/toast";
import { ToastType } from "./enums/ToastType.enum";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

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

export const formatDuration = (duration: number | undefined) => {
  if (!duration) return "n.d.";
  if (duration < 60) return `${duration} min`;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}min`;
};
