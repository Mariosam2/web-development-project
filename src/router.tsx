import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { Home } from "./features/Landing/Home/Home";
import { Workouts } from "./features/Dashboard/components/Workouts/Workouts";
import { Exercises } from "./features/Dashboard/components/Exercises/Exercises";
import { Activity } from "./features/Dashboard/components/Activity/Activity";
import { AuthLayout } from "./features/Auth/AuthLayout/AuthLayout";
import { LoginForm } from "./features/Auth/LoginForm/LoginForm";
import { SignupForm } from "./features/Auth/SignupForm/SignupForm";
import { lazy } from "react";
import { NotFound } from "./shared/ui/NotFound/NotFound";
import { WorkoutDetail } from "./features/Dashboard/components/Workouts/components/WorkoutDetail/WorkoutDetail";

const Dashboard = lazy(() => import("./features/Dashboard/Dashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Workouts />,
          },
          {
            path: "workouts",
            element: <Workouts />,
          },
          {
            path: "workouts/:workoutId",
            element: <WorkoutDetail />,
          },
          {
            path: "exercises",
            element: <Exercises />,
          },
          {
            path: "activity",
            element: <Activity />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginForm /> }],
  },
  {
    path: "/signup",
    element: <AuthLayout />,
    children: [{ index: true, element: <SignupForm /> }],
  },
  { path: "/not-found", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
]);
