// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// --- register service worker (no index.html changes needed) ---
(async function registerSW() {
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("Service worker registered with scope:", reg.scope);
    } else {
      console.warn("Service workers are not supported in this browser.");
    }
  } catch (err) {
    console.error("Service worker registration failed:", err);
  }
})();
