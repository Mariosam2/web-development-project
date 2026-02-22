import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router";
import "./ErrorPage.css";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const getErrorInfo = () => {
    if (isRouteErrorResponse(error)) {
      console.log("router error", error);
      return { status: error.status, message: error.statusText };
    }

    if (error && typeof error === "object" && "status" in error) {
      const fetchError = error as FetchBaseQueryError;

      if (fetchError.status === "PARSING_ERROR") {
        return { status: fetchError.originalStatus, message: fetchError.error };
      }
      if (fetchError.status === "FETCH_ERROR") {
        return { status: 503, message: fetchError.error };
      }
      if (typeof fetchError.status === "number") {
        return { status: fetchError.status, message: "Something went wrong" };
      }
    }

    if (error instanceof Error) {
      return { status: 500, message: error.message };
    }

    return { status: 500, message: "Unknown error" };
  };

  const { status, message } = getErrorInfo();

  return (
    <div className="error-page">
      <span className="error-page__code mb-4">{status}</span>
      <h1 className="error-page__title mb-2.5">Oops! An error occured</h1>
      <p className="error-page__subtitle">{message}</p>
      <button className="error-page__btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};
