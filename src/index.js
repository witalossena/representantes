import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

import { AuthProvider } from "./hooks/useAuth";

import { BrowserRouter, HashRouter } from "react-router-dom";
import AppClientCounter from "./components/AppClientCounter";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter> 
  </>
);
