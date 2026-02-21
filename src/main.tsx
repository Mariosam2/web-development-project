import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { ToastProvider } from "@heroui/toast";
import { Provider } from "react-redux";
import { HeroUIProvider } from "@heroui/system";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <ToastProvider placement="top-right" />
        <RouterProvider router={router} />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
);
