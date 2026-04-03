import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>,
);
