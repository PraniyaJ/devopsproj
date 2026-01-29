import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 5173
    },
    proxy: {
      // during local dev (not docker) proxy to localhost backend
      '/api': {
        target: process.env.BACKEND_PROXY || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})

// Development proxy: forward /api requests to backend service.
// When running locally with `npm run dev`, target should be http://localhost:5000.
// When running inside Docker Compose, change target to 'http://backend:5000' or use environment variables.
