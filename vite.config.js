import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {BASE_PATH_NGINX} from "./src/constant/constant.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5173,
      host: true,
    },
    base: mode === 'production' ? BASE_PATH_NGINX : '', // Áp dụng base path cho production
    define: {
      'process.env.MODE': JSON.stringify(mode),
    },
  };
});