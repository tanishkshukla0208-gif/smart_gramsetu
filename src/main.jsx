import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/responsive.css";
import "./styles/cinematic.css";
import "./styles/voiceAssistant.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/search.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </React.StrictMode>,
);
