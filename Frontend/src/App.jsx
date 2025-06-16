import React from "react";
import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRoutes} />
    </AuthProvider>
  );
}

export default App;
