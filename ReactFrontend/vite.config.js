import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  build: {
    rollupOptions: {
      input: {
        app: 'upload.html', // default
      },
    },
  },  
  server: {
    open: 'upload.html',
  },
})
