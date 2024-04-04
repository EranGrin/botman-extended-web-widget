import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'src',
  server: {
    open: '/src/demo.html'
    
  },
  plugins: [preact()],
  css: {
    // If you use PostCSS or preprocessors, configure them here
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // If you're using Less and need JS in your styles
      },
    },
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       // main: resolve(__dirname, 'index.html'),
  //       // Assuming 'widget' and 'chat' are the names of your entry points for HTML files
  //       widget: resolve(__dirname, 'src/widget/index.tsx'),
  //       chat: resolve(__dirname, 'src/chat/index.tsx'),
  //     },
  //     output: {
  //       // Set output structure and naming convention here
  //       entryFileNames: 'js/[name].js',
  //       chunkFileNames: 'js/[name].js',
  //       assetFileNames: 'assets/[name].[ext]',
  //     },
  //   },
  // },
  // build: {
  //   sourcemap: true,
  //   minify: false,
  //   lib: {
  //     entry: 'src/widget/index.tsx',
  //     name: 'MyPreactLibrary',
  //     formats: ['es', 'umd', 'cjs'],
  //     fileName: (format) => `my-preact-library.${format}.js`
  //   },
  // }
  build: {
    rollupOptions: {
      input: {
        widget: 'src/widget/index.tsx', // Path to widget entry
        chat: 'src/chat/index.tsx', // Path to chat entry
      },
      output: {
        // Define how the output files are named
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    },
    // Keeping source maps for better debugging support
    sourcemap: true,
  }
})
