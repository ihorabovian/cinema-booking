import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

// Next reads .env for the app; Storybook runs outside Next and needs it loaded here.
process.loadEnvFile();

const config: StorybookConfig = {
  framework: "@storybook/nextjs-vite",
  stories: ["../components/**/*.stories.tsx"],
  viteFinal: (config) => ({
    ...config,
    // The app loads Tailwind through Turbopack; Storybook builds with Vite.
    plugins: [...(config.plugins ?? []), tailwindcss()],
    // Posters and actor photos come from the cinema API, as in the app.
    define: {
      ...config.define,
      "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL ?? ""),
    },
  }),
};

export default config;
