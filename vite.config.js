import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
/*
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
}); */

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
});
