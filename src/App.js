import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";

// import { useAuth } from "./hooks/useAuth";
import { RequireAuth } from "./hooks/useAuth";
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
              <DashboardPage />
            </RequireAuth>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
