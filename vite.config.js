import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macrosPlugin()],
});
