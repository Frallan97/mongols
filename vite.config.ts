import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The basemap topology is ~500KB of JSON imported at module scope. Vite
    // warns about the resulting chunk; it gzips to well under 200KB and is
    // immutable, so splitting it out buys nothing.
    chunkSizeWarningLimit: 1200,
  },
});
