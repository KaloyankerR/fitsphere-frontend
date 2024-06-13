import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react(), envCompatible()],
  build: {
    sourcemap: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://tasty.p.rapidapi.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        headers: {
          'X-RapidAPI-Key': '6492da3bd5mshf069992a9a3da3bp1d36b1jsn3d15f50c1022',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      }
    }
  }
})
