import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bind to all interfaces so the dev/preview server is reachable inside the Cloud Agent VM.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
