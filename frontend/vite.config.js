import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      //프론트에서 /api로 시작하는 요청을 스프링(8080) 으로 보냄
      '/api': 'http://localhost:8080',
    },
  },
})
