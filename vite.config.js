import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-proxy': {
        target: 'https://api.drboahemaantim.com/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
      },
    },
  },
})
