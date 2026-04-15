import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: [
      "app/**/*.test.ts",
      "components/**/*.test.ts",
      "features/**/*.test.ts",
      "lib/**/*.test.ts",
    ],
    exclude: ["tests/e2e/**", "node_modules/**"],
  },
});
