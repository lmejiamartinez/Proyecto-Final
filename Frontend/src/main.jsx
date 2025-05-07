import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import DynamicToast from "./Components/DynamicToast.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only 1 retry when a fetch fails.
      // staleTime: 1000 * 60 * 30, // 30 minutes'

      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <DynamicToast />
      <App />
    </StrictMode>
  </QueryClientProvider>
);
