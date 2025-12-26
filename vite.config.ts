import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Avoid Windows file-lock issues when Vite updates optimized deps in node_modules/.vite
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Enable minification using esbuild (faster) or terser (smaller)
    minify: 'esbuild', // Change to 'terser' for more aggressive minification
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'mui-core': [
            '@mui/material',
            '@mui/system',
            '@emotion/react',
            '@emotion/styled',
          ],
          'mui-icons': ['@mui/icons-material'],
          'mui-date-pickers': ['@mui/x-date-pickers'],
          'query-vendor': ['@tanstack/react-query'],
          'utils-vendor': [
            'axios',
            'date-fns',
            'formik',
            'yup',
            'lodash',
            'jwt-decode',
          ],
          'map-vendor': ['leaflet', 'react-leaflet'],
          'ui-utils': ['tailwind-merge', 'clsx', 'class-variance-authority'],
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit (if needed)
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps for production debugging (set to false for smaller builds)
    sourcemap: false,
  },
  // Optimize deps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      '@tanstack/react-query',
    ],
  },
})