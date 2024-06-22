import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ajusta esto si tu aplicación está en un subdirectorio
  build: {
    outDir: 'dist', // Cambia esto si necesitas una carpeta de salida diferente
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      }
    }
  },
  server: {
    // Configuraciones para el entorno de desarrollo
    port: 3000,
    open: true, // Abre el navegador automáticamente
    proxy: {
      // '/api': 'http://localhost:5000', // Ejemplo de configuración de proxy
    },
  }
});
