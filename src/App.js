import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import Dash2 from "./pages/dash2";

// import { useAuth } from "./hooks/useAuth";
import { RequireAuth } from "./hooks/useAuth";
import AppClientCounter from "./components/AppClientCounter";
// import { ProtectedRoute } from "./components/ProtectedRoute";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dash2 />
            </RequireAuth>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
