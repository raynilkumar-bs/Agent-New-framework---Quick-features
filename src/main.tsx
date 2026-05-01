import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { DESIGN_VERSION } from "./config/designVersion";

// Base design tokens (fonts, tailwind base, theme vars)
import "./tokens/index.css";

// Version-specific colour/spacing tokens — driven by src/config/designVersion.ts
// Vite resolves this statically at build time; update DESIGN_VERSION to switch themes.
const versionTokens: Record<string, () => Promise<unknown>> = {
  v1: () => import("./themes/v1/tokens.css"),
  v2: () => import("./themes/v2/tokens.css"),
  v3: () => import("./themes/v3/tokens.css"),
  v4: () => import("./themes/v4/tokens.css"),
};

void versionTokens[DESIGN_VERSION]?.();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
