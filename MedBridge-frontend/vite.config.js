import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-node-polyfills";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global: "globalThis", // <-- Key part for fixing 'global is not defined'
  },
  optimizeDeps: {
    include: ["sockjs-client"], // Ensures Vite pre-bundles with polyfills
  },
});
