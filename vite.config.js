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
