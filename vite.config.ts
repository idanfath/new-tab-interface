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
          target: `${env.VITE_WAKAPI_BASE_URL}/api/compat/wakatime/v1`,
          changeOrigin: true,
          headers: {
            Authorization: `Basic ${btoa(env.VITE_WAKAPI_API_KEY)}`,
          },
          rewrite: (path) => path.replace(/^\/api\/wakapi/, ""),
        },
        "/api/cobalt": {
          target: env.VITE_COBALT_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/cobalt/, ""),
        },
      },
    },
  };
});
