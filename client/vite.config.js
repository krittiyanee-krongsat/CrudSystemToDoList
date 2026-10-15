import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/posts": {
        target: "https://crudsystemtodolist.onrender.com",
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
