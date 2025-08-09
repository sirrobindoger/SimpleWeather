import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/weather/',
  build: {
    assetsInlineLimit: 0, // Don't inline any assets, keep them as separate files
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original names for icon files
          if (assetInfo.name && assetInfo.name.match(/\.(png|jpe?g|svg|gif|webp|ico)$/i)) {
            return 'assets/icons/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
