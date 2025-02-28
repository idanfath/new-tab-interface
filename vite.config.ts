import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/wakapi": {
          target: env.VITE_WAKAPI_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wakapi/, ""),
        },
      },
    },
  };
});
