import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    https: false,
    host: true,
    port: 5173,
  },

  preview: {
    https: false,
    host: true,
    port: 5173,
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
    deps: {
      inline: ["react", "react-dom"]
    }
  },

  esbuild: { jsx: "automatic", },
})
