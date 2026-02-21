import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { ToastProvider } from "@heroui/toast";

import { HeroUIProvider } from "@heroui/system";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="top-right" />
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>,
);
