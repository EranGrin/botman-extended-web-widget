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
  build: {
    rollupOptions: {
      input: {
        // main: resolve(__dirname, 'index.html'),
        // Assuming 'widget' and 'chat' are the names of your entry points for HTML files
        widget: resolve(__dirname, 'src/widget/index.html'),
        chat: resolve(__dirname, 'src/chat/index.html'),
      },
      output: {
        // Set output structure and naming convention here
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
