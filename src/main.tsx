import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from "./components/features/Landing/Home/Home";
import { AuthLayout } from "./components/features/Auth/AuthLayout/AuthLayout";
import { LoginForm } from "./components/features/Auth/LoginForm/LoginForm";
import { SignupForm } from "./components/features/Auth/SignupForm/SignupForm";
import { Dashboard } from "./components/features/Dashboard/Dashboard";
import { Workouts } from "./components/features/Dashboard/components/Workouts/Workouts";
import { Exercises } from "./components/features/Dashboard/components/Exercises/Exercises";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
            path: "my-workouts",
            element: <Workouts />,
          },
          {
            path: "exercises",
            element: <Exercises />,
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
