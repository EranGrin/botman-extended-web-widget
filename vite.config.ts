import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  // root: 'src',
  server: {
    open: '/src/chat.html'
    
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
})
