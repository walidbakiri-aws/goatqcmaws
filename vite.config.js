import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  server: {
    historyApiFallback: true, // SPA fallback on refresh
    fs: {
      strict: false, // allow serving outside root if needed
    },
    proxy: {
      "/api": {
        target: "https://goatqcm-instance.com",
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  optimizeDeps: {
    include: ["buffer", "process"],
  },
});
// assetsInclude: ["**/*.pdf"], // ✅ let Vite treat PDFs as assets
