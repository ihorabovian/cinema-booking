import { defineConfig } from "vitest/config";

export default defineConfig({
  // "@/..." imports, as in tsconfig.json.
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["{components,lib}/**/*.test.{ts,tsx}"],
  },
});
