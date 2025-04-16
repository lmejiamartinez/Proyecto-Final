import React from "react";
import { Route, Routes } from "react-router-dom"; // si no existe créalo vacío
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
