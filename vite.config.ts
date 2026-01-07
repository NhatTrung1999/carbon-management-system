import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5175,
    proxy: {
      '/api': {
        target: 'http://192.168.77.228',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/bpmplus/api/v1'),
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
