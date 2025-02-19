import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',  // Redirect API calls to the backend
    },
  },
  plugins: [react()],
});
