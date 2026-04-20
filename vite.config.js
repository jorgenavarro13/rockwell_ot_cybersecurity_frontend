import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rockwell_ot_cybersecurity_frontend/',
  test:{
    environment: 'jsdom',
    globals:true,
    setupFiles: './src/test/setup.js'
  }
})
