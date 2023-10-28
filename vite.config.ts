import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    open: '/sandbox/',
  },
  css: {
    postcss: 'sandbox',
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'lib/main.ts'
      ),
      name: 'RemoteImagesForNext',
      // the proper extensions will be added
      fileName: 'remote-images-for-next',
    },
    rollupOptions: {
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'react',
        },
      },
    },
  },
});
