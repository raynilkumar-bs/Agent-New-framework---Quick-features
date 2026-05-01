import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const { default: tailwindcss } = await import("@tailwindcss/vite");

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

    return mergeConfig(config, {
      plugins: [tailwindcss(), figmaAssetStubPlugin()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
  },
};

export default config;
