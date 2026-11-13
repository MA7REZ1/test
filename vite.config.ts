import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss(), viteTsconfigPaths(), nitro()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
