import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('i18next')) {
              return 'vendor-i18n';
            }
            return 'vendor';
          }
          if (id.includes('ArchivePapers') || id.includes('older_papers_data')) {
            return 'archive-papers';
          }
          if (id.includes('Papers') || id.includes('recent_papers_data')) {
            return 'recent-papers';
          }
        },
      },
    },
  },
})
