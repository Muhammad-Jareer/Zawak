import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Adjust this path as needed
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://31.97.145.126:3202',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});