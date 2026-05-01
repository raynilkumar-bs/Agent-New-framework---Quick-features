import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Stub out Figma asset imports used in some components (e.g. figma:asset/...)
function figmaAssetStubPlugin() {
  return {
    name: "figma-asset-stub",
    enforce: "pre" as const,
    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) return id;
    },
    load(id: string) {
      if (id.startsWith("figma:asset/")) return 'export default ""';
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), figmaAssetStubPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
