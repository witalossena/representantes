import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./hooks/useAuth";

import { BrowserRouter, HashRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
