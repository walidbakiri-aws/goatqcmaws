/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
 
 
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://goatqcm-instance.com",
      },
    },
  },
  define: {
    global: "window",
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  server: {
    historyApiFallback: true, // 🔥 Enables SPA fallback on refresh
  },
});*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  server: {
    historyApiFallback: true, // 🔥 Enables SPA fallback on refresh
    proxy: {
      "/api": {
        target: "https://goatqcm-instance.com",
      },
    },
  },
});
