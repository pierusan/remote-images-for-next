import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import Inspect from 'vite-plugin-inspect';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    // To debug what Vite is doing an how it's transforming code
    // Go to http://localhost:PORT/__inspect to view inspector
    Inspect(),
  ],
  server: {
    open: '/sandbox/',
  },
  css: {
    postcss: 'sandbox',
  },
  build: {
    // View sourcemap in browser devtools when using the library
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        'lib/index.ts'
      ),
      name: 'RemoteImagesForNext',
      // the proper extensions will be added
      fileName: 'remote-images-for-next',
    },
    rollupOptions: {
      // Since this is a modern component library, we can rely on the fact that
      // the application using it will itself install and bundle the 3rd party
      // dependency. This will avoid duplicates.
      // https://github.com/vitejs/vite/discussions/6198
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(pkg.dependencies || {}),
        // We also add 'react/jsx-runtime' here because it will be used by Vite
        // React plugin (for the automatic JSX runtime), but since react is a
        // peer dependency the app will have access to it so we don't need it in
        // the bundle
        'react/jsx-runtime',
      ],
      output: {
        // Provide global variables to use in the UMD build for externalized
        // deps. This will avoid Rollup warnings when bundling the UMD modules,
        // but in practice it shouldn't really matter because these globals
        // would only be used if someone were to import our library as an iife
        // module and rely on react and react-dom to be provided as properties
        // of our global object (in our case global.React and global.ReactDOM)
        globals: {
          react: 'react',
        },
      },
    },
  },
});
